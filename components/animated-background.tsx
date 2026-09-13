"use client"

import { useEffect, useRef } from "react"
import { subscribeScroll } from "@/lib/scroll-driver"

/**
 * Fondo vivo: actividad neuronal sobre la que se apoya el contenido.
 *
 * Dos capas:
 *
 * 1) RED AMBIENTE (pre-generada, siempre ahí pero casi invisible): neuronas chicas
 *    con dendritas curvas que se afinan, de tamaño y forma distintos, distribuidas
 *    en la pantalla. Fuera del radio del cursor se dibuja a `AMBIENT_GAIN` (16%),
 *    o sea se intuye pero no se ve. Cada neurona dispara cada tanto y su región
 *    late, así que de fondo hay vida tenue.
 *
 * 2) RED DEL CURSOR (lo que el usuario mira): al pasar el mouse se GENERA una red
 *    efímera dentro de un radio chico (~2 cm). Cada neurona que aparece es distinta
 *    (tamaño, cantidad y largo de dendritas aleatorios), dispara su impulso al nacer
 *    —el axón se enciende mientras lo recorre— y al llegar a la punta contagia a
 *    otra vecina. Cada una vive 1,4-2,6 s y se desvanece. Nunca se ve dos veces lo
 *    mismo. Dentro del radio, además, la red ambiente se enciende a full.
 *
 * 3) BARRIDO "AGENTE IA": cada 5 minutos un frente cruza la pantalla y dispara
 *    cientos de neuronas a la vez (parámetros ejecutándose en paralelo). Es el único
 *    momento en que se ve la red completa.
 *
 * Rendimiento (DESIGN.md §4): capa fija, ~30fps, DPR ≤1.5, malla ambiente en un solo
 * path, tope de neuronas vivas/disparando, pausa con la pestaña oculta y con
 * `prefers-reduced-motion` se pinta un único frame estático.
 */

// Acento del sistema (DESIGN.md §2): un solo tinte, distintos alfas/luminancias.
const ACCENT = "52,211,153"
const HOT = "196,255,226" // "blanco caliente" del soma activo (mismo tinte, más luz)
const FRAME_MS = 33 // ~30fps
const TAU = Math.PI * 2

// --- Radio del cursor -------------------------------------------------------
// ≈2 cm en un monitor típico. Todo lo que queda fuera se dibuja a AMBIENT_GAIN.
const CURSOR_RADIUS = 110
const AMBIENT_GAIN = 0.16

// --- Red ambiente -----------------------------------------------------------
const AMBIENT_SPACING_MIN = 110
const AMBIENT_MIN = 60
const AMBIENT_MAX = 180
const AMBIENT_DECAY = 0.03
const AMBIENT_FIRE_MIN = 900 // frames entre disparos espontáneos (por región)
const AMBIENT_FIRE_VAR = 2600
const AMBIENT_REFRACTORY = 320
const AMBIENT_MAX_FIRING = 130

// --- Red del cursor (efímera) ----------------------------------------------
const LIVE_MAX = 22
const LIVE_LIFE_MIN = 1400
const LIVE_LIFE_VAR = 1200
const LIVE_SPAWN_MOVING = 0.22 // probabilidad por frame con el mouse moviéndose
const LIVE_SPAWN_IDLE = 0.035 // con el mouse quieto
const LIVE_LINK_DIST = 86
const LIVE_CASCADE = 0.5

// --- Impulso y barrido ------------------------------------------------------
const IMPULSE_SPEED = 0.16 // px por ms: se ve el axón encenderse al paso
const SYNAPSE_DELAY = 60 // ms entre llegar a la punta y activar la vecina
const BURST_INTERVAL = 300000 // 5 minutos: el único momento en que se ve toda la red
const BURST_DUR = 1800

type Branch = {
  x1: number
  y1: number
  cx: number
  cy: number
  x2: number
  y2: number
  depth: number
  w0: number
  w1: number
  dist: number
  len: number
  mx: number
  my: number
  reveal: number
  head: number
}

type Neuron = {
  x: number
  y: number
  e: number
  seed: number
  region: number
  next: number
  firedAt: number
  propagated: boolean
  burstFired: boolean
  total: number
}

type Live = {
  x: number
  y: number
  born: number
  life: number
  firedAt: number
  propagated: boolean
  total: number
  tree: Branch[]
  links: number[]
}

type Region = { phase: number; freq: number; heat: number }
type Pending = { j: number; at: number }

/** Punto de una cuadrática (A → C → B) en t ∈ [0,1]; se usa para x y para y. */
const curveAt = (a: number, c: number, b: number, t: number) =>
  (1 - t) * (1 - t) * a + 2 * (1 - t) * t * c + t * t * b

type TreeOpts = {
  dendrites: number
  lenMin: number
  lenMax: number
  maxDepth: number
  baseWidth: number
  spread: number
}

/** Árbol dendrítico: troncos curvos que se afinan, con ramas hijas en ruta. */
function makeTree(x: number, y: number, opts: TreeOpts): { tree: Branch[]; total: number } {
  const tree: Branch[] = []
  let total = 1
  const base = Math.random() * TAU
  const grow = (px: number, py: number, angle: number, len: number, depth: number, dist: number) => {
    const ex = px + Math.cos(angle) * len
    const ey = py + Math.sin(angle) * len
    const nx = (ey - py) / len
    const ny = -(ex - px) / len
    const bow = len * (0.18 + Math.random() * 0.34) * (Math.random() < 0.5 ? -1 : 1)
    const cxp = (px + ex) / 2 + nx * bow
    const cyp = (py + ey) / 2 + ny * bow
    const w0 = Math.max(0.6, opts.baseWidth - depth * 0.5)
    tree.push({
      x1: px,
      y1: py,
      cx: cxp,
      cy: cyp,
      x2: ex,
      y2: ey,
      depth,
      w0,
      w1: Math.max(0.25, w0 - 0.45),
      dist: dist + len,
      len,
      mx: (px + ex) / 2 + nx * bow * 0.5,
      my: (py + ey) / 2 + ny * bow * 0.5,
      reveal: 0,
      head: 0,
    })
    if (dist + len > total) total = dist + len
    if (depth >= opts.maxDepth || len < 8) return
    const kids = depth === 0 ? (Math.random() < 0.7 ? 2 : 1) : Math.random() < 0.4 ? 1 : 0
    for (let k = 0; k < kids; k++) {
      const at = 0.5 + Math.random() * 0.4
      const spread = (0.3 + Math.random() * opts.spread) * (Math.random() < 0.5 ? -1 : 1)
      grow(
        curveAt(px, cxp, ex, at),
        curveAt(py, cyp, ey, at),
        angle + spread,
        len * (0.45 + Math.random() * 0.3),
        depth + 1,
        dist + len * at
      )
    }
  }
  for (let k = 0; k < opts.dendrites; k++) {
    const angle = base + (k / opts.dendrites) * TAU + (Math.random() - 0.5) * 0.8
    const len = opts.lenMin + Math.random() * (opts.lenMax - opts.lenMin)
    grow(x, y, angle, len, 0, 0)
  }
  return { tree, total }
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const coarse = window.matchMedia("(pointer: coarse)").matches
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)

    let w = 0
    let h = 0
    let neurons: Neuron[] = []
    let branches: Branch[] = []
    let branchOwner: number[] = [] // neurona dueña de cada rama ambiente
    let owned: number[][] = []
    let links: number[][] = []
    let regions: Region[] = []
    let pending: Pending[] = []
    let live: Live[] = []
    let regionSize = 400
    let regionCols = 1
    let firingCount = 0
    let raf = 0
    let last = 0
    let stepTime = 0
    let resizeTimer = 0
    let running = true
    let scrollVel = 0
    let scrollBoost = 0
    let pointerHeat = 0
    let intensity = 1
    let dtSafe = 1 // dt del último frame (lo usa el desvanecido de la red efímera)
    let burstActive = false
    let burstT = 0
    let burstTimer = BURST_INTERVAL
    const burst = { axisX: true, from: 0 }

    const pointer = { x: -9999, y: -9999, px: -9999, py: -9999, active: false }

    /** Red ambiente: neuronas chicas, cada una con tamaño y forma propios. */
    const buildAmbient = () => {
      const area = w * h
      const count = Math.max(AMBIENT_MIN, Math.min(AMBIENT_MAX, Math.round(area / 9000)))
      const spacing = Math.max(AMBIENT_SPACING_MIN, Math.sqrt(area / count))
      const minDist = spacing * 0.9
      const cell = minDist / Math.SQRT2
      const gw = Math.max(1, Math.ceil(w / cell))
      const gh = Math.max(1, Math.ceil(h / cell))
      const grid = new Int32Array(gw * gh).fill(-1)

      const tooClose = (x: number, y: number) => {
        const gx = Math.floor(x / cell)
        const gy = Math.floor(y / cell)
        for (let j = Math.max(0, gy - 2); j <= Math.min(gh - 1, gy + 2); j++) {
          for (let i = Math.max(0, gx - 2); i <= Math.min(gw - 1, gx + 2); i++) {
            const idx = grid[j * gw + i]
            if (idx < 0) continue
            const s = neurons[idx]
            if (Math.hypot(s.x - x, s.y - y) < minDist) return true
          }
        }
        return false
      }

      regionSize = Math.max(320, spacing * 2.2)
      regionCols = Math.max(1, Math.ceil(w / regionSize))
      const regionRows = Math.max(1, Math.ceil(h / regionSize))
      regions = Array.from({ length: regionCols * regionRows }, () => ({
        phase: Math.random() * TAU,
        freq: 0.01 + Math.random() * 0.014,
        heat: 0,
      }))

      neurons = []
      branches = []
      branchOwner = []
      owned = []
      for (let k = 0; k < count * 30 && neurons.length < count; k++) {
        const x = Math.random() * w
        const y = Math.random() * h
        if (tooClose(x, y)) continue
        grid[Math.floor(y / cell) * gw + Math.floor(x / cell)] = neurons.length
        const rx = Math.min(regionCols - 1, Math.floor(x / regionSize))
        const ry = Math.min(regionRows - 1, Math.floor(y / regionSize))
        const scale = 0.6 + Math.random() * 0.9
        const { tree, total } = makeTree(x, y, {
          dendrites: 3 + Math.floor(Math.random() * 4),
          lenMin: spacing * 0.09 * scale,
          lenMax: spacing * 0.24 * scale,
          maxDepth: 1,
          baseWidth: 0.9 + Math.random() * 0.6,
          spread: 0.55,
        })
        const owner = neurons.length
        const indices: number[] = []
        for (const b of tree) {
          branches.push(b)
          branchOwner.push(owner)
          indices.push(branches.length - 1)
        }
        owned.push(indices)
        neurons.push({
          x,
          y,
          e: 0.03 + Math.random() * 0.05,
          seed: Math.random() * TAU,
          region: ry * regionCols + rx,
          next: 300 + Math.random() * 2400,
          firedAt: -1e9,
          propagated: true,
          burstFired: false,
          total,
        })
      }

      links = neurons.map(() => [])
      const linkDist = spacing * 1.5
      for (let i = 0; i < neurons.length; i++) {
        const a = neurons[i]
        const near: { j: number; d: number }[] = []
        for (let j = 0; j < neurons.length; j++) {
          if (j === i) continue
          const d = Math.hypot(a.x - neurons[j].x, a.y - neurons[j].y)
          if (d < linkDist) near.push({ j, d })
        }
        near.sort((p, q) => p.d - q.d)
        links[i] = near.slice(0, 3).map((n) => n.j)
      }
      pending = []
      live = []
    }

    /** Neurona efímera: nace donde está el cursor, distinta cada vez. */
    const spawnLive = (now: number, x: number, y: number) => {
      // Distribución sesgada al centro del radio (aparecen más cerca del puntero).
      const r = CURSOR_RADIUS * 0.85 * Math.sqrt(Math.random())
      const a = Math.random() * TAU
      const nx = x + Math.cos(a) * r
      const ny = y + Math.sin(a) * r
      if (nx < 0 || ny < 0 || nx > w || ny > h) return
      const scale = 0.55 + Math.random() * 0.9
      const { tree, total } = makeTree(nx, ny, {
        dendrites: 3 + Math.floor(Math.random() * 3),
        lenMin: 8 * scale,
        lenMax: 26 * scale,
        maxDepth: Math.random() < 0.5 ? 1 : 0,
        baseWidth: 0.85 + Math.random() * 0.5,
        spread: 0.7,
      })
      const item: Live = {
        x: nx,
        y: ny,
        born: now,
        life: LIVE_LIFE_MIN + Math.random() * LIVE_LIFE_VAR,
        firedAt: now,
        propagated: false,
        total,
        tree,
        links: [],
      }
      // Contagio: se enlaza con las efímeras más cercanas.
      for (let i = live.length - 1, n = 0; i >= 0 && n < 2; i--) {
        const o = live[i]
        const d = Math.hypot(o.x - nx, o.y - ny)
        if (d > LIVE_LINK_DIST) continue
        item.links.push(i)
        o.links.push(live.length)
        n++
      }
      live.push(item)
      if (live.length > LIVE_MAX) live.shift()
    }

    const resize = () => {
      // clientWidth/Height excluyen la barra de scroll; window.innerWidth la
      // incluye y el canvas quedaba 8px más ancho que el área visible (medido).
      const doc = document.documentElement
      w = doc.clientWidth
      h = doc.clientHeight
      intensity = w < 768 ? 0.85 : 1
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      buildAmbient()
      if (reduced) paint(performance.now())
    }

    const fireAmbient = (i: number, now: number) => {
      const s = neurons[i]
      if (now - s.firedAt < AMBIENT_REFRACTORY) return
      if (firingCount >= AMBIENT_MAX_FIRING) return
      s.firedAt = now
      s.propagated = false
      s.e = 1
      firingCount++
      const r = regions[s.region]
      if (r) r.heat = Math.min(0.8, r.heat + 0.1)
    }

    const inRadius = (x: number, y: number) => Math.hypot(x - pointer.x, y - pointer.y) < CURSOR_RADIUS

    const advance = (dt: number, now: number) => {
      for (const r of regions) {
        r.phase += r.freq * dt
        r.heat *= 1 - 0.012 * dt
      }

      // Red ambiente: dispara poco y suave (queda tenue salvo en el radio o en el barrido).
      for (let i = 0; i < neurons.length; i++) {
        const s = neurons[i]
        s.e *= 1 - AMBIENT_DECAY * dt
        if (s.e < 0.001) s.e = 0
        const r = regions[s.region]
        const ex =
          (r ? 0.25 + 0.75 * (0.5 + 0.5 * Math.sin(r.phase)) + r.heat * 0.3 : 0.4) *
          (1 + scrollBoost * 2.5)
        s.next -= dt * ex
        if (s.next <= 0) {
          fireAmbient(i, now)
          s.next = AMBIENT_FIRE_MIN + Math.random() * AMBIENT_FIRE_VAR
        }
        if (!s.propagated && now - s.firedAt > (s.total / IMPULSE_SPEED) * 0.75) {
          s.propagated = true
          for (const j of links[i]) {
            if (Math.random() < 0.16) pending.push({ j, at: now + SYNAPSE_DELAY })
          }
        }
      }
      for (let k = pending.length - 1; k >= 0; k--) {
        if (pending[k].at > now) continue
        fireAmbient(pending[k].j, now)
        pending.splice(k, 1)
      }

      // Barrido "agente IA" (cada 5 minutos): el único momento en que se ve toda la red.
      burstTimer -= dt * 16.67
      if (!burstActive && burstTimer <= 0) {
        burstActive = true
        burstT = 0
        burst.axisX = Math.random() < 0.5
        burst.from = Math.random() < 0.5 ? 0 : 1
        for (const s of neurons) s.burstFired = false
        burstTimer = BURST_INTERVAL
      }
      if (burstActive) {
        burstT += dt * 16.67
        const p = burstT / BURST_DUR
        const line = burst.from === 0 ? p : 1 - p
        for (let i = 0; i < neurons.length; i++) {
          const s = neurons[i]
          if (s.burstFired) continue
          if (now - s.firedAt < 400) continue
          const coord = burst.axisX ? s.x / w : s.y / h
          if (burst.from === 0 ? coord <= line : coord >= line) {
            s.burstFired = true
            fireAmbient(i, now)
          }
        }
        if (p >= 1) burstActive = false
      }

      // Red del cursor: se genera al paso del mouse y se desvanece sola.
      if (pointer.active && !coarse) {
        const speed = Math.hypot(pointer.x - pointer.px, pointer.y - pointer.py)
        pointerHeat = Math.min(1, pointerHeat * 0.86 + speed / 90)
        const chance = (speed > 4 ? LIVE_SPAWN_MOVING : LIVE_SPAWN_IDLE) * (0.5 + pointerHeat)
        if (Math.random() < chance * dt) spawnLive(now, pointer.x, pointer.y)
        pointer.px = pointer.x
        pointer.py = pointer.y
      } else {
        pointerHeat *= 0.9
      }

      for (let k = live.length - 1; k >= 0; k--) {
        const l = live[k]
        if (now - l.born > l.life) {
          live.splice(k, 1)
          continue
        }
        // Al llegar a las puntas, contagia a una vecina (sigue la activación).
        if (!l.propagated && now - l.firedAt > l.total / IMPULSE_SPEED + 40) {
          l.propagated = true
          if (l.links.length > 0 && Math.random() < LIVE_CASCADE) {
            const j = l.links[Math.floor(Math.random() * l.links.length)]
            const o = live[j]
            if (o && now - o.firedAt > 220) {
              o.firedAt = now
              o.propagated = false
              o.life = Math.max(o.life, now - o.born + 900)
            }
          }
        }
      }

      // Revelado: impulso (y cursor dentro del radio) para la red ambiente.
      for (let bi = 0; bi < branches.length; bi++) {
        const b = branches[bi]
        const s = neurons[branchOwner[bi]]
        const travelled = (now - s.firedAt) * IMPULSE_SPEED
        let target = 0
        if (travelled > 0 && travelled < s.total + 60) {
          const from = b.dist - b.len
          if (travelled >= b.dist) target = 0.5 * Math.max(0, 1 - (travelled - b.dist) / 160)
          else if (travelled > from) {
            target = 0.9
            b.head = (travelled - from) / b.len
          }
        }
        if (target === 0) b.head = 0
        // Fuera del radio del cursor casi no se ve; adentro se enciende a full.
        const gain = inRadius(b.mx, b.my) ? 1 : AMBIENT_GAIN
        const boosted = burstActive && s.burstFired ? 1 : gain
        target *= boosted
        b.reveal =
          target > b.reveal
            ? Math.min(target, b.reveal + 0.3 * dt)
            : Math.max(target, b.reveal - 0.03 * dt)
      }
    }

    /** Traza una rama: grosor parejo (barato) o polígono que se afina (caliente). */
    const drawBranch = (b: Branch, alpha: number, tapered: boolean) => {
      if (!tapered) {
        ctx.lineWidth = (b.w0 + b.w1) / 2
        ctx.strokeStyle = `rgba(${ACCENT},${alpha.toFixed(3)})`
        ctx.beginPath()
        ctx.moveTo(b.x1, b.y1)
        ctx.quadraticCurveTo(b.cx, b.cy, b.x2, b.y2)
        ctx.stroke()
        return
      }
      const steps = 4
      ctx.fillStyle = `rgba(${ACCENT},${alpha.toFixed(3)})`
      ctx.beginPath()
      for (let k = 0; k <= steps; k++) {
        const t = k / steps
        const x = curveAt(b.x1, b.cx, b.x2, t)
        const y = curveAt(b.y1, b.cy, b.y2, t)
        const dx = 2 * (1 - t) * (b.cx - b.x1) + 2 * t * (b.x2 - b.cx)
        const dy = 2 * (1 - t) * (b.cy - b.y1) + 2 * t * (b.y2 - b.cy)
        const n = Math.hypot(dx, dy) || 1
        const half = ((b.w0 + (b.w1 - b.w0) * t) / 2) * (k === 0 ? 0.25 : 1)
        if (k === 0) ctx.moveTo(x + (-dy / n) * half, y + (dx / n) * half)
        else ctx.lineTo(x + (-dy / n) * half, y + (dx / n) * half)
      }
      for (let k = steps; k >= 0; k--) {
        const t = k / steps
        const x = curveAt(b.x1, b.cx, b.x2, t)
        const y = curveAt(b.y1, b.cy, b.y2, t)
        const dx = 2 * (1 - t) * (b.cx - b.x1) + 2 * t * (b.x2 - b.cx)
        const dy = 2 * (1 - t) * (b.cy - b.y1) + 2 * t * (b.y2 - b.cy)
        const n = Math.hypot(dx, dy) || 1
        const half = ((b.w0 + (b.w1 - b.w0) * t) / 2) * (k === 0 ? 0.25 : 1)
        ctx.lineTo(x - (-dy / n) * half, y - (dx / n) * half)
      }
      ctx.closePath()
      ctx.fill()
    }

    /** Cabeza del impulso: punto caliente con halo sobre el axón. */
    const drawHead = (x: number, y: number, alpha: number) => {
      const glow = ctx.createRadialGradient(x, y, 0, x, y, 7)
      glow.addColorStop(0, `rgba(${HOT},${alpha.toFixed(3)})`)
      glow.addColorStop(1, `rgba(${ACCENT},0)`)
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(x, y, 7, 0, TAU)
      ctx.fill()
      ctx.fillStyle = `rgba(${HOT},${Math.min(1, alpha * 1.6).toFixed(3)})`
      ctx.beginPath()
      ctx.arc(x, y, 1.1, 0, TAU)
      ctx.fill()
    }

    const paint = (time: number) => {
      const now = time
      ctx.clearRect(0, 0, w, h)

      // 1) Malla ambiente en reposo: apenas visible, un solo path.
      ctx.lineWidth = 0.6
      ctx.strokeStyle = `rgba(${ACCENT},${(0.018 * intensity).toFixed(3)})`
      ctx.beginPath()
      for (const b of branches) {
        ctx.moveTo(b.x1, b.y1)
        ctx.quadraticCurveTo(b.cx, b.cy, b.x2, b.y2)
      }
      ctx.stroke()

      ctx.globalCompositeOperation = "lighter"

      // 2) Ramas ambiente activas (tenues fuera del radio, llenas adentro / en barrido).
      for (const b of branches) {
        if (b.reveal < 0.02) continue
        const alpha = (0.05 + b.reveal * 0.4) * intensity
        drawBranch(b, alpha, b.reveal > 0.4 && b.depth < 1)
      }
      for (const b of branches) {
        if (b.head <= 0 || b.head >= 1 || b.reveal < 0.12) continue
        drawHead(
          curveAt(b.x1, b.cx, b.x2, b.head),
          curveAt(b.y1, b.cy, b.y2, b.head),
          0.4 * intensity
        )
      }

      // 3) Somas ambiente.
      for (const s of neurons) {
        const e = Math.min(1, s.e * (0.92 + 0.08 * Math.sin(now / 700 + s.seed)))
        if (e < 0.2) continue
        const gain = inRadius(s.x, s.y) ? 1 : AMBIENT_GAIN
        const boosted = burstActive && s.burstFired ? 1 : gain
        if (boosted < 0.3) continue
        ctx.fillStyle = `rgba(${ACCENT},${(0.5 * e * boosted * intensity).toFixed(3)})`
        ctx.beginPath()
        ctx.arc(s.x, s.y, 0.9 + e * 1.1, 0, TAU)
        ctx.fill()
        ctx.fillStyle = `rgba(${HOT},${(0.4 * e * boosted * intensity).toFixed(3)})`
        ctx.beginPath()
        ctx.arc(s.x, s.y, 0.5 + e * 0.6, 0, TAU)
        ctx.fill()
      }

      // 4) Red del cursor: aparece, dispara y se desvanece.
      for (const l of live) {
        const age = now - l.born
        const k = age / l.life
        const fade = k < 0.12 ? k / 0.12 : k > 0.6 ? Math.max(0, 1 - (k - 0.6) / 0.4) : 1
        if (fade <= 0.01) continue
        const travelled = (now - l.firedAt) * IMPULSE_SPEED
        for (const b of l.tree) {
          const from = b.dist - b.len
          let target = 0
          if (travelled >= b.dist) target = 0.55 * Math.max(0, 1 - (travelled - b.dist) / 130)
          else if (travelled > from) {
            target = 0.95
            b.head = (travelled - from) / b.len
          } else b.head = 0
          b.reveal = Math.max(target * fade, b.reveal - 0.035 * dtSafe)
          if (b.reveal > 0.02) {
            drawBranch(b, (0.13 + b.reveal * 0.4) * fade * intensity, b.reveal > 0.45)
          }
          if (b.head > 0 && b.head < 1) {
            drawHead(
              curveAt(b.x1, b.cx, b.x2, b.head),
              curveAt(b.y1, b.cy, b.y2, b.head),
              0.42 * fade * intensity
            )
          }
        }
        const e = fade
        ctx.fillStyle = `rgba(${ACCENT},${(0.42 * e * intensity).toFixed(3)})`
        ctx.beginPath()
        ctx.arc(l.x, l.y, 1 + e * 1.1, 0, TAU)
        ctx.fill()
        ctx.fillStyle = `rgba(${HOT},${(0.6 * e * intensity).toFixed(3)})`
        ctx.beginPath()
        ctx.arc(l.x, l.y, 0.6 + e * 0.5, 0, TAU)
        ctx.fill()
      }

      // 5) Barrido IA: frente fino que cruza la pantalla.
      if (burstActive) {
        const p = burstT / BURST_DUR
        const line = burst.from === 0 ? p : 1 - p
        const fade = Math.sin(Math.PI * Math.min(1, Math.max(0, p)))
        ctx.lineWidth = 1
        ctx.strokeStyle = `rgba(${ACCENT},${(0.07 * fade * intensity).toFixed(3)})`
        ctx.beginPath()
        if (burst.axisX) {
          ctx.moveTo(line * w, 0)
          ctx.lineTo(line * w, h)
        } else {
          ctx.moveTo(0, line * h)
          ctx.lineTo(w, line * h)
        }
        ctx.stroke()
      }

      // 6) El cursor: sólo un punto caliente con un halo chico (el radio se lee solo).
      if (pointer.active && !coarse && pointerHeat > 0.08) {
        const glow = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 34)
        glow.addColorStop(0, `rgba(${HOT},${(0.1 + pointerHeat * 0.14).toFixed(3)})`)
        glow.addColorStop(1, `rgba(${ACCENT},0)`)
        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(pointer.x, pointer.y, 34, 0, TAU)
        ctx.fill()
      }
      ctx.globalCompositeOperation = "source-over"
    }

    const step = (ts: number) => {
      if (!running) return
      raf = window.requestAnimationFrame(step)
      if (ts - stepTime < FRAME_MS) return
      const dt = last ? Math.min((ts - last) / 16.67, 3) : 1
      last = ts
      stepTime = ts
      dtSafe = dt
      scrollBoost = Math.min(1, scrollBoost * 0.9 + scrollVel * 1.5)
      firingCount = 0
      for (const s of neurons) if (ts - s.firedAt < s.total / IMPULSE_SPEED) firingCount++
      advance(dt, ts)
      paint(ts)
    }

    const onResize = () => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(resize, 150)
    }
    const onMove = (event: PointerEvent) => {
      if (!pointer.active) {
        pointer.px = event.clientX
        pointer.py = event.clientY
      }
      pointer.x = event.clientX
      pointer.y = event.clientY
      pointer.active = true
    }
    const onLeave = () => {
      pointer.active = false
      pointer.x = -9999
      pointer.y = -9999
    }
    /** Tap (móvil): genera un racimo de neuronas en el punto tocado. */
    const onDown = (event: PointerEvent) => {
      const now = performance.now()
      for (let k = 0; k < 6; k++) spawnLive(now, event.clientX, event.clientY)
      for (let i = 0; i < neurons.length; i++) {
        const s = neurons[i]
        if (Math.hypot(s.x - event.clientX, s.y - event.clientY) < CURSOR_RADIUS) fireAmbient(i, now)
      }
    }
    const onVisibility = () => {
      running = document.visibilityState === "visible"
      last = 0
      if (running) raf = window.requestAnimationFrame(step)
      else window.cancelAnimationFrame(raf)
    }

    resize()
    if (reduced) return () => window.clearTimeout(resizeTimer)

    raf = window.requestAnimationFrame(step)
    window.addEventListener("resize", onResize)
    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("pointerdown", onDown, { passive: true })
    document.documentElement.addEventListener("pointerleave", onLeave)
    document.addEventListener("visibilitychange", onVisibility)
    const unsubscribe = subscribeScroll((state) => {
      scrollVel = state.velocity
    })

    return () => {
      running = false
      window.cancelAnimationFrame(raf)
      window.clearTimeout(resizeTimer)
      window.removeEventListener("resize", onResize)
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerdown", onDown)
      document.documentElement.removeEventListener("pointerleave", onLeave)
      document.removeEventListener("visibilitychange", onVisibility)
      unsubscribe()
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute inset-0 scroll-glow" />
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
    </div>
  )
}
