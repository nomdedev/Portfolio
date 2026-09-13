"use client"

import { useEffect, useRef } from "react"
import { subscribeScroll } from "@/lib/scroll-driver"

/**
 * Fondo vivo: actividad neuronal sobre la que se apoya el contenido.
 *
 * Inspirado en la referencia "Actividad neuronal en el cerebro":
 * - Cada neurona es una ESTRELLA: 4-7 dendritas gruesas en la base que se afinan
 *   hacia las puntas, curvadas, y con ramas hijas que nacen a lo largo del tronco
 *   (no todas en la punta). Largos distintos por neurona.
 * - La red en reposo se ve, pero tenue (es la "malla" de fondo). Lo que resalta es
 *   la ACTIVIDAD: un impulso eléctrico sale del soma, recorre el axón iluminando el
 *   tramo que va pasando, llega a la punta, destella la sinapsis y activa la
 *   neurona vecina (que dispara su propio impulso). Así se forma una red de
 *   actividad que se propaga por zonas.
 * - CEREBRO + AGENTE IA: además de la actividad orgánica, cada tanto un BARRIDO
 *   sincronizado cruza la pantalla y dispara cientos de neuronas a la vez
 *   (parámetros ejecutándose en paralelo).
 * - El cursor es un hotspot: acelera los disparos de la zona y dibuja excitación
 *   eléctrica alrededor del puntero.
 *
 * Rendimiento (DESIGN.md §4): capa fija, ~30fps, DPR ≤1.5, malla de reposo en un
 * solo path, tope de neuronas disparando a la vez, pausa con la pestaña oculta y
 * con `prefers-reduced-motion` se pinta un único frame estático.
 */

// Acento del sistema (DESIGN.md §2): un solo tinte, distintos alfas/luminancias.
const ACCENT = "52,211,153"
const HOT = "196,255,226" // "blanco caliente" del soma activo (mismo tinte, más luz)
const FRAME_MS = 33 // ~30fps
const MIN_SPACING = 175
const NODE_MIN = 30
const NODE_MAX = 110
const BRUSH_MIN = 230
const MAX_DEPTH = 2
const WAVE_DUR = 1100 // ms que tarda el impulso en recorrer el árbol
const IMPULSE_SPEED = 0.42 // px por ms (~420 px/s: el axón se recorre en ~0.7s)
const DECAY = 0.03
const REVEAL_RISE = 0.3
const REVEAL_FADE = 0.022
const REFRACTORY = 320 // ms entre disparos de la misma neurona
const MAX_FIRING = 130
const SYNAPSE_DELAY = 70 // ms entre llegar a la punta y activar la vecina
const BURST_MIN = 16000
const BURST_MAX = 26000
const BURST_DUR = 1700

type Soma = {
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

type Branch = {
  o: number
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
  head: number // 0..1: porción del axón que ya quedó encendida por el impulso
}

type Region = { phase: number; freq: number; heat: number }
type Pending = { j: number; at: number }

/** Punto de una cuadrática (A → C → B) en t ∈ [0,1]; se usa para x y para y. */
const curveAt = (a: number, c: number, b: number, t: number) =>
  (1 - t) * (1 - t) * a + 2 * (1 - t) * t * c + t * t * b

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
    let somas: Soma[] = []
    let branches: Branch[] = []
    let owned: number[][] = []
    let links: number[][] = []
    let regions: Region[] = []
    let pending: Pending[] = []
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
    let brushRadius = BRUSH_MIN
    let burstActive = false
    let burstT = 0
    let burstTimer = 6000
    const burst = { axisX: true, from: 0 }

    const pointer = { x: -9999, y: -9999, active: false }

    /** Somas por muestreo tipo dart-throwing: dispersión orgánica, sin retícula. */
    const buildSomas = () => {
      const area = w * h
      const count = Math.max(NODE_MIN, Math.min(NODE_MAX, Math.round(area / 22000)))
      const spacing = Math.max(MIN_SPACING, Math.sqrt(area / count))
      brushRadius = Math.max(BRUSH_MIN, spacing * 1.4)
      const minDist = spacing * 0.95
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
            const s = somas[idx]
            if (Math.hypot(s.x - x, s.y - y) < minDist) return true
          }
        }
        return false
      }

      regionSize = Math.max(360, spacing * 2.2)
      regionCols = Math.max(1, Math.ceil(w / regionSize))
      const regionRows = Math.max(1, Math.ceil(h / regionSize))
      regions = Array.from({ length: regionCols * regionRows }, () => ({
        phase: Math.random() * Math.PI * 2,
        freq: 0.01 + Math.random() * 0.014,
        heat: 0,
      }))

      somas = []
      for (let k = 0; k < count * 30 && somas.length < count; k++) {
        const x = Math.random() * w
        const y = Math.random() * h
        if (tooClose(x, y)) continue
        grid[Math.floor(y / cell) * gw + Math.floor(x / cell)] = somas.length
        const rx = Math.min(regionCols - 1, Math.floor(x / regionSize))
        const ry = Math.min(regionRows - 1, Math.floor(y / regionSize))
        somas.push({
          x,
          y,
          e: 0.03 + Math.random() * 0.05,
          seed: Math.random() * Math.PI * 2,
          region: ry * regionCols + rx,
          next: 300 + Math.random() * 1400,
          firedAt: -1e9,
          propagated: true,
          burstFired: false,
          total: 1,
        })
      }
      return spacing
    }

    /**
     * Dendrita: tronco grueso que se afina, curvo, con ramas hijas que nacen a lo
     * largo del tronco (55-90%) y no en la punta. Distinta longitud cada una.
     */
    const grow = (
      o: number,
      x: number,
      y: number,
      angle: number,
      len: number,
      depth: number,
      dist: number
    ) => {
      const ex = x + Math.cos(angle) * len
      const ey = y + Math.sin(angle) * len
      const nx = (ey - y) / len
      const ny = -(ex - x) / len
      const bow = len * (0.18 + Math.random() * 0.3) * (Math.random() < 0.5 ? -1 : 1)
      const cx = (x + ex) / 2 + nx * bow
      const cy = (y + ey) / 2 + ny * bow
      const w0 = 2.3 - depth * 0.7
      const w1 = Math.max(0.35, w0 - 0.55)
      branches.push({
        o,
        x1: x,
        y1: y,
        cx,
        cy,
        x2: ex,
        y2: ey,
        depth,
        w0,
        w1,
        dist: dist + len,
        len,
        mx: (x + ex) / 2 + nx * bow * 0.5,
        my: (y + ey) / 2 + ny * bow * 0.5,
        reveal: 0,
        head: 0,
      })
      if (dist + len > somas[o].total) somas[o].total = dist + len
      if (depth >= MAX_DEPTH || len < 14) return
      const kids = depth === 0 ? 2 : Math.random() < 0.5 ? 2 : 1
      for (let k = 0; k < kids; k++) {
        const at = 0.55 + Math.random() * 0.35
        const bx = curveAt(x, cx, ex, at)
        const by = curveAt(y, cy, ey, at)
        const spread = (0.35 + Math.random() * 0.5) * (Math.random() < 0.5 ? -1 : 1)
        grow(o, bx, by, angle + spread, len * (0.45 + Math.random() * 0.25), depth + 1, dist + len * at)
      }
    }

    const build = () => {
      const spacing = buildSomas()
      branches = []
      owned = somas.map(() => [])
      for (let i = 0; i < somas.length; i++) {
        const s = somas[i]
        // Estrella: 4-7 dendritas alrededor del soma, largos bien distintos.
        const dendrites = 4 + Math.floor(Math.random() * 4)
        const base = (Math.random() * Math.PI * 2) / dendrites
        for (let k = 0; k < dendrites; k++) {
          const angle = base + (k / dendrites) * Math.PI * 2 + (Math.random() - 0.5) * 0.5
          const len = spacing * (0.25 + Math.random() * 0.4)
          const before = branches.length
          grow(i, s.x, s.y, angle, len, 0, 0)
          for (let b = before; b < branches.length; b++) owned[i].push(b)
        }
      }
      // Sinapsis: adyacencia por cercanía (por dónde salta la activación).
      links = somas.map(() => [])
      const linkDist = spacing * 1.6
      for (let i = 0; i < somas.length; i++) {
        const a = somas[i]
        const near: { j: number; d: number }[] = []
        for (let j = 0; j < somas.length; j++) {
          if (j === i) continue
          const d = Math.hypot(a.x - somas[j].x, a.y - somas[j].y)
          if (d < linkDist) near.push({ j, d })
        }
        near.sort((p, q) => p.d - q.d)
        links[i] = near.slice(0, 3).map((n) => n.j)
      }
      pending = []
    }

    const resize = () => {
      // clientWidth/Height excluyen la barra de scroll; window.innerWidth la
      // incluye y el canvas quedaba 8px más ancho que el área visible (medido).
      const doc = document.documentElement
      w = doc.clientWidth
      h = doc.clientHeight
      intensity = w < 768 ? 0.8 : 1
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      build()
      if (reduced) paint(performance.now())
    }

    /** Dispara una neurona: arranca su impulso y calienta su región. */
    const fire = (i: number, now: number) => {
      const s = somas[i]
      if (now - s.firedAt < REFRACTORY) return
      if (firingCount >= MAX_FIRING) return
      s.firedAt = now
      s.propagated = false
      s.e = 1
      s.total = Math.max(1, s.total)
      firingCount++
      const r = regions[s.region]
      if (r) r.heat = Math.min(0.8, r.heat + 0.1)
    }

    /** Hotspot del cursor: cuanta más cercanía, más probabilidad de disparo. */
    const excitePointer = (dt: number, now: number) => {
      if (!pointer.active || coarse) {
        pointerHeat *= 0.9
        return
      }
      pointerHeat = Math.min(1, pointerHeat * 0.9 + 0.24)
      for (let i = 0; i < somas.length; i++) {
        const s = somas[i]
        const d = Math.hypot(s.x - pointer.x, s.y - pointer.y)
        if (d >= brushRadius) continue
        const prox = 1 - d / brushRadius
        s.e = Math.min(1, s.e + prox * 0.14 * dt)
        if (Math.random() < prox * 0.14 * dt) fire(i, now)
      }
    }

    const advance = (dt: number, now: number) => {
      // Regiones: cada una late con su fase; las que dispararon quedan calientes.
      for (const r of regions) {
        r.phase += r.freq * dt
        r.heat *= 1 - 0.012 * dt
      }

      for (let i = 0; i < somas.length; i++) {
        const s = somas[i]
        s.e *= 1 - DECAY * dt
        if (s.e < 0.001) s.e = 0
        const r = regions[s.region]
        const ex =
          (r ? 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(r.phase)) + r.heat * 0.3 : 0.5) * (1 + scrollBoost * 3)
        s.next -= dt * ex
        if (s.next <= 0) {
          fire(i, now)
          s.next = 1600 + Math.random() * 3200
        }
        // Al llegar el impulso a las puntas, el soma avisa a sus vecinos.
        if (!s.propagated && now - s.firedAt > WAVE_DUR * 0.7) {
          s.propagated = true
          for (const j of links[i]) if (Math.random() < 0.18) pending.push({ j, at: now + SYNAPSE_DELAY })
        }
      }

      // Sinapsis pendientes: la neurona vecina arranca su propio impulso.
      for (let k = pending.length - 1; k >= 0; k--) {
        if (pending[k].at > now) continue
        fire(pending[k].j, now)
        pending.splice(k, 1)
      }

      // Barrido "agente IA": un frente cruza la pantalla y dispara en paralelo.
      burstTimer -= dt * 16.67
      if (!burstActive && burstTimer <= 0) {
        burstActive = true
        burstT = 0
        burst.axisX = Math.random() < 0.5
        burst.from = Math.random() < 0.5 ? 0 : 1
        for (const s of somas) s.burstFired = false
        burstTimer = BURST_MIN + Math.random() * (BURST_MAX - BURST_MIN)
      }
      if (burstActive) {
        burstT += dt * 16.67
        const p = burstT / BURST_DUR
        const line = burst.from === 0 ? p : 1 - p
        for (let i = 0; i < somas.length; i++) {
          const s = somas[i]
          if (s.burstFired) continue
          if (now - s.firedAt < WAVE_DUR * 0.6) continue
          const coord = burst.axisX ? s.x / w : s.y / h
          if (burst.from === 0 ? coord <= line : coord >= line) {
            s.burstFired = true
            fire(i, now)
          }
        }
        if (p >= 1) burstActive = false
      }

      // Impulso: recorre el árbol por distancia; el tramo recorrido queda encendido.
      for (const b of branches) {
        const s = somas[b.o]
        const travelled = (now - s.firedAt) * IMPULSE_SPEED
        let target = 0
        let head = 0
        if (travelled > 0 && travelled < s.total + 90) {
          const from = b.dist - b.len
          if (travelled >= b.dist) {
            // Ya pasó: queda encendido y se va apagando detrás del impulso.
            const behind = travelled - b.dist
            target = 0.5 * Math.max(0, 1 - behind / 180)
            head = 1
          } else if (travelled > from) {
            // Lo está recorriendo: se enciende el tramo que ya pasó.
            head = (travelled - from) / b.len
            target = 0.9
          }
        }
        if (pointer.active && !coarse) {
          const d = Math.hypot(b.mx - pointer.x, b.my - pointer.y)
          if (d < brushRadius) target = Math.max(target, (1 - d / brushRadius) * 0.8)
        }
        b.head = head
        b.reveal =
          target > b.reveal
            ? Math.min(target, b.reveal + REVEAL_RISE * dt)
            : Math.max(target, b.reveal - REVEAL_FADE * dt)
      }
    }

    /** Traza una rama; si está "caliente" la dibuja con grosor que se afina. */
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
      // Polígono: ancho w0 en la base → w1 en la punta (axón que se afina).
      const steps = 5
      ctx.fillStyle = `rgba(${ACCENT},${alpha.toFixed(3)})`
      ctx.beginPath()
      for (let k = 0; k <= steps; k++) {
        const t = k / steps
        const x = curveAt(b.x1, b.cx, b.x2, t)
        const y = curveAt(b.y1, b.cy, b.y2, t)
        const dx = 2 * (1 - t) * (b.cx - b.x1) + 2 * t * (b.x2 - b.cx)
        const dy = 2 * (1 - t) * (b.cy - b.y1) + 2 * t * (b.y2 - b.cy)
        const n = Math.hypot(dx, dy) || 1
        const half = ((b.w0 + (b.w1 - b.w0) * t) / 2) * (k === 0 ? 0.2 : 1)
        const ox = (-dy / n) * half
        const oy = (dx / n) * half
        if (k === 0) ctx.moveTo(x - ox, y - oy)
        else ctx.lineTo(x - ox, y - oy)
      }
      for (let k = steps; k >= 0; k--) {
        const t = k / steps
        const x = curveAt(b.x1, b.cx, b.x2, t)
        const y = curveAt(b.y1, b.cy, b.y2, t)
        const dx = 2 * (1 - t) * (b.cx - b.x1) + 2 * t * (b.x2 - b.cx)
        const dy = 2 * (1 - t) * (b.cy - b.y1) + 2 * t * (b.y2 - b.cy)
        const n = Math.hypot(dx, dy) || 1
        const half = ((b.w0 + (b.w1 - b.w0) * t) / 2) * (k === 0 ? 0.2 : 1)
        ctx.lineTo(x + (-dy / n) * half, y + (dx / n) * half)
      }
      ctx.closePath()
      ctx.fill()
    }

    const paint = (time: number) => {
      const now = time
      ctx.clearRect(0, 0, w, h)

      // 1) Malla en reposo: toda la red apenas visible, en UN solo path.
      ctx.lineWidth = 0.7
      ctx.strokeStyle = `rgba(${ACCENT},${(0.03 * intensity).toFixed(3)})`
      ctx.beginPath()
      for (const b of branches) {
        ctx.moveTo(b.x1, b.y1)
        ctx.quadraticCurveTo(b.cx, b.cy, b.x2, b.y2)
      }
      ctx.stroke()

      // 2) Ramas activas: encendidas por el impulso o por el cursor.
      ctx.globalCompositeOperation = "lighter"
      for (const b of branches) {
        if (b.reveal < 0.03) continue
        const alpha = (0.06 + b.reveal * 0.42) * intensity
        drawBranch(b, alpha, b.reveal > 0.35 && b.depth < 2)
      }

      // 3) Cabeza del impulso: punto brillante + halo sobre el axón.
      for (const b of branches) {
        if (b.head <= 0 || b.head >= 1 || b.reveal < 0.2) continue
        const x = curveAt(b.x1, b.cx, b.x2, b.head)
        const y = curveAt(b.y1, b.cy, b.y2, b.head)
        const glow = ctx.createRadialGradient(x, y, 0, x, y, 14)
        glow.addColorStop(0, `rgba(${HOT},${(0.5 * intensity).toFixed(3)})`)
        glow.addColorStop(1, `rgba(${ACCENT},0)`)
        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(x, y, 14, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = `rgba(${HOT},${(0.85 * intensity).toFixed(3)})`
        ctx.beginPath()
        ctx.arc(x, y, 1.4, 0, Math.PI * 2)
        ctx.fill()
      }

      // 4) Somas: en reposo tenue; activos con núcleo caliente y halo.
      for (const s of somas) {
        const e = Math.min(1, s.e * (0.92 + 0.08 * Math.sin(now / 700 + s.seed)))
        if (e > 0.5) {
          const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 22 + e * 16)
          glow.addColorStop(0, `rgba(${HOT},${((e - 0.5) * 0.55 * intensity).toFixed(3)})`)
          glow.addColorStop(0.45, `rgba(${ACCENT},${((e - 0.5) * 0.3 * intensity).toFixed(3)})`)
          glow.addColorStop(1, `rgba(${ACCENT},0)`)
          ctx.fillStyle = glow
          ctx.beginPath()
          ctx.arc(s.x, s.y, 22 + e * 16, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.fillStyle = `rgba(${ACCENT},${((0.1 + e * 0.35) * intensity).toFixed(3)})`
        ctx.beginPath()
        ctx.arc(s.x, s.y, 1.2 + e * 1.8, 0, Math.PI * 2)
        ctx.fill()
        if (e > 0.45) {
          ctx.fillStyle = `rgba(${HOT},${((e - 0.45) * 0.7 * intensity).toFixed(3)})`
          ctx.beginPath()
          ctx.arc(s.x, s.y, 0.7 + e * 0.9, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // 5) Barrido IA: frente fino que cruza la pantalla.
      if (burstActive) {
        const p = burstT / BURST_DUR
        const line = burst.from === 0 ? p : 1 - p
        const fade = Math.sin(Math.PI * Math.min(1, Math.max(0, p)))
        ctx.lineWidth = 1
        ctx.strokeStyle = `rgba(${ACCENT},${(0.08 * fade * intensity).toFixed(3)})`
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

      // 6) Excitación eléctrica en el cursor: filamentos cortos que tiemblan.
      if (pointer.active && !coarse && pointerHeat > 0.15) {
        ctx.lineWidth = 1
        for (let k = 0; k < 9; k++) {
          const angle = Math.random() * Math.PI * 2
          const len = 14 + Math.random() * 54
          const x2 = pointer.x + Math.cos(angle) * len
          const y2 = pointer.y + Math.sin(angle) * len
          const bow = (Math.random() - 0.5) * len * 0.7
          ctx.strokeStyle = `rgba(${ACCENT},${(0.1 + pointerHeat * 0.24).toFixed(3)})`
          ctx.beginPath()
          ctx.moveTo(pointer.x, pointer.y)
          ctx.quadraticCurveTo(
            pointer.x + (x2 - pointer.x) / 2 - Math.sin(angle) * bow,
            pointer.y + (y2 - pointer.y) / 2 + Math.cos(angle) * bow,
            x2,
            y2
          )
          ctx.stroke()
        }
        const glow = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 46)
        glow.addColorStop(0, `rgba(${HOT},${(0.16 + pointerHeat * 0.16).toFixed(3)})`)
        glow.addColorStop(1, `rgba(${ACCENT},0)`)
        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(pointer.x, pointer.y, 46, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = `rgba(${HOT},${(0.4 + pointerHeat * 0.35).toFixed(3)})`
        ctx.beginPath()
        ctx.arc(pointer.x, pointer.y, 1.8, 0, Math.PI * 2)
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
      scrollBoost = Math.min(1, scrollBoost * 0.9 + scrollVel * 1.5)
      firingCount = 0
      for (const s of somas) if (ts - s.firedAt < WAVE_DUR) firingCount++
      excitePointer(dt, ts)
      advance(dt, ts)
      paint(ts)
    }

    const onResize = () => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(resize, 150)
    }
    const onMove = (event: PointerEvent) => {
      pointer.x = event.clientX
      pointer.y = event.clientY
      pointer.active = true
    }
    const onLeave = () => {
      pointer.active = false
      pointer.x = -9999
      pointer.y = -9999
    }
    /** Tap (móvil): dispara las neuronas de la zona tocada. */
    const onDown = (event: PointerEvent) => {
      const now = performance.now()
      for (let i = 0; i < somas.length; i++) {
        const s = somas[i]
        if (Math.hypot(s.x - event.clientX, s.y - event.clientY) < brushRadius) fire(i, now)
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
