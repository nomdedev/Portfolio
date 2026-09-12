"use client"

import { useEffect, useRef } from "react"
import { subscribeScroll } from "@/lib/scroll-driver"

/**
 * Fondo vivo: red neuronal sutil y curva sobre la que se apoya el contenido.
 *
 * Reglas del diseño (pedido explícito):
 * - Las conexiones son curvas (axones/dendritas), nunca rectas de retícula.
 * - En reposo NO se ven conexiones: sólo los somas. Las sinapsis se revelan
 *   únicamente por donde pasa el cursor, y la traza se desvanece sola.
 * - Fuera de eso, la red "chispea": luces aleatorias que viajan por una sinapsis
 *   y hacen destellar la neurona que tocan (como una conexión eléctrica).
 * - Todo muy sutil: alfas bajas, trazo fino, nada compite con el texto.
 *
 * Rendimiento (DESIGN.md §4): capa fija, ~30fps, DPR ≤1.5, sin drift de
 * partículas, pausa con la pestaña oculta y con `prefers-reduced-motion` se
 * pinta un único frame estático (sólo somas).
 */

// Acento del sistema (DESIGN.md §2): un solo tinte, distintos alfas.
const ACCENT = "52,211,153"
const FRAME_MS = 33 // ~30fps
const DECAY = 0.05 // caída de energía por frame (normalizada por dt)
const MAX_SPARKS = 48
const MIN_SPACING = 135
const NODE_MIN = 48
const NODE_MAX = 180
const BRUSH_MIN = 190
const REVEAL_RISE = 0.3 // qué tan rápido aparece la sinapsis bajo el cursor
const REVEAL_FADE = 0.025 // qué tan lento se borra la traza (~0.6s)
const SPARK_RATE = 0.06 // chispas por frame (× dt)
const SPARK_CASCADE = 0.35 // probabilidad de que la chispa siga viaje al llegar
const CURVE_MIN = 0.13 // curvatura mínima (fracción del largo)
const CURVE_MAX = 0.32

type Neuron = { x: number; y: number; e: number; seed: number; next: number }
type Synapse = {
  a: number
  b: number
  xa: number
  ya: number
  xb: number
  yb: number
  cx: number
  cy: number
  mx: number
  my: number
  len: number
  reveal: number
}
type Spark = { s: number; t: number; speed: number; dir: 1 | -1 }

/** Punto de una cuadrática (A → C → B) en t ∈ [0,1]; se usa para x y para y. */
const curveAt = (a: number, c: number, b: number, t: number) =>
  (1 - t) * (1 - t) * a + 2 * (1 - t) * t * c + t * t * b

/**
 * Período medio entre descargas espontáneas de una neurona, en frames (~30fps).
 * Decorrelacionado por neurona: la red titila, no parpadea en bloque.
 */
function ambientPeriod(coarse: boolean): number {
  return (coarse ? 260 : 420) * (0.4 + Math.random() * 1.2)
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
    let synapses: Synapse[] = []
    let adjacency: number[][] = []
    let sparks: Spark[] = []
    let raf = 0
    let last = 0
    let stepTime = 0
    let resizeTimer = 0
    let running = true
    let scrollVel = 0
    let scrollBoost = 0
    let pointerHeat = 0
    // Presupuesto de contraste: en pantallas chicas el texto ocupa casi todo el
    // ancho, así que la red baja un escalón para no competir con la lectura.
    let intensity = 1
    let brushRadius = BRUSH_MIN

    const pointer = { x: -9999, y: -9999, active: false }

    /**
     * Neuronas por muestreo tipo "dart throwing": dispersión orgánica, sin la
     * regularidad de retícula que se nota cuando no hay líneas dibujadas.
     */
    const build = () => {
      const area = w * h
      const count = Math.max(NODE_MIN, Math.min(NODE_MAX, Math.round(area / 11000)))
      const spacing = Math.max(MIN_SPACING, Math.sqrt(area / count))
      brushRadius = Math.max(BRUSH_MIN, spacing * 1.6)
      const minDist = spacing * 0.92
      const cellSize = minDist / Math.SQRT2
      const gw = Math.max(1, Math.ceil(w / cellSize))
      const gh = Math.max(1, Math.ceil(h / cellSize))
      const grid = new Int32Array(gw * gh).fill(-1)

      const tooClose = (x: number, y: number) => {
        const gx = Math.floor(x / cellSize)
        const gy = Math.floor(y / cellSize)
        for (let j = Math.max(0, gy - 2); j <= Math.min(gh - 1, gy + 2); j++) {
          for (let i = Math.max(0, gx - 2); i <= Math.min(gw - 1, gx + 2); i++) {
            const idx = grid[j * gw + i]
            if (idx < 0) continue
            const n = neurons[idx]
            if (Math.hypot(n.x - x, n.y - y) < minDist) return true
          }
        }
        return false
      }

      neurons = []
      const attempts = count * 30
      for (let k = 0; k < attempts && neurons.length < count; k++) {
        const x = Math.random() * w
        const y = Math.random() * h
        if (tooClose(x, y)) continue
        grid[Math.floor(y / cellSize) * gw + Math.floor(x / cellSize)] = neurons.length
        neurons.push({
          x,
          y,
          e: 0.02 + Math.random() * 0.05,
          seed: Math.random() * Math.PI * 2,
          // Timer propio (proceso de Poisson) para el destello espontáneo.
          next: Math.random() * ambientPeriod(coarse),
        })
      }

      // Sinapsis CURVAS entre vecinas cercanas: el punto de control se corre
      // perpendicular al segmento, con signo y magnitud aleatorios.
      const maxEdge = spacing * 1.75
      synapses = []
      const seen = new Set<number>()
      const key = (i: number, j: number) => (i < j ? i * 100000 + j : j * 100000 + i)
      for (let i = 0; i < neurons.length; i++) {
        const a = neurons[i]
        const candidates: { j: number; d: number }[] = []
        for (let j = 0; j < neurons.length; j++) {
          if (j === i) continue
          const d = Math.hypot(a.x - neurons[j].x, a.y - neurons[j].y)
          if (d < maxEdge) candidates.push({ j, d })
        }
        candidates.sort((p, q) => p.d - q.d)
        for (const candidate of candidates.slice(0, 3)) {
          if (seen.has(key(i, candidate.j))) continue
          seen.add(key(i, candidate.j))
          const b = neurons[candidate.j]
          const len = candidate.d
          const nx = (b.y - a.y) / len
          const ny = -(b.x - a.x) / len
          const bend = len * (CURVE_MIN + Math.random() * (CURVE_MAX - CURVE_MIN))
          const sign = Math.random() < 0.5 ? -1 : 1
          const mx = (a.x + b.x) / 2
          const my = (a.y + b.y) / 2
          synapses.push({
            a: i,
            b: candidate.j,
            xa: a.x,
            ya: a.y,
            xb: b.x,
            yb: b.y,
            cx: mx + nx * bend * sign,
            cy: my + ny * bend * sign,
            mx: mx + nx * bend * sign * 0.5,
            my: my + ny * bend * sign * 0.5,
            len,
            reveal: 0,
          })
        }
      }

      adjacency = neurons.map(() => [])
      synapses.forEach((s, index) => {
        adjacency[s.a].push(index)
        adjacency[s.b].push(index)
      })
      sparks = []
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
      if (reduced) paint(0)
    }

    /** Chispa eléctrica: viaja por una sinapsis y hace destellar la neurona. */
    const sparkOn = (index: number) => {
      if (sparks.length >= MAX_SPARKS) return
      sparks.push({
        s: index,
        t: 0,
        speed: 0.028 + Math.random() * 0.016,
        dir: Math.random() < 0.5 ? 1 : -1,
      })
    }

    const spawnRandom = () => {
      if (synapses.length === 0) return
      sparkOn(Math.floor(Math.random() * synapses.length))
    }

    /** Excitación por cursor: revela sinapsis y enciende somas cercanos. */
    const excitePointer = (dt: number) => {
      if (!pointer.active || coarse) {
        pointerHeat *= 0.9
        return
      }
      pointerHeat = Math.min(1, pointerHeat * 0.9 + 0.22)
      const gain = (0.01 + 0.05 * pointerHeat) * dt
      for (let i = 0; i < neurons.length; i++) {
        const n = neurons[i]
        const d = Math.hypot(n.x - pointer.x, n.y - pointer.y)
        if (d >= brushRadius) continue
        n.e = Math.min(1, n.e + (1 - d / brushRadius) * gain)
      }
    }

    const advance = (dt: number) => {
      // Somas: decaimiento + destello espontáneo de baja tasa.
      for (let i = 0; i < neurons.length; i++) {
        const n = neurons[i]
        n.e *= 1 - DECAY * dt
        if (n.e < 0.001) n.e = 0
        n.next -= dt * (1 + scrollBoost * 2.5)
        if (n.next <= 0) {
          if (n.e < 0.5) n.e = 0.85
          n.next = ambientPeriod(coarse)
        }
      }

      // Revelado de sinapsis: rise rápido bajo el cursor, fade lento (traza).
      const revealRate = (strong: boolean) => (strong ? REVEAL_RISE : REVEAL_FADE) * dt
      for (const s of synapses) {
        let target = 0
        if (pointer.active && !coarse) {
          const d = Math.hypot(s.mx - pointer.x, s.my - pointer.y)
          if (d < brushRadius) target = 1 - d / brushRadius
        }
        if (target > s.reveal) s.reveal = Math.min(target, s.reveal + revealRate(true))
        else s.reveal = Math.max(target, s.reveal - revealRate(false))
      }

      // Chispas aleatorias (más frecuentes al scrollear).
      if (Math.random() < SPARK_RATE * dt * (1 + scrollBoost * 4)) spawnRandom()

      for (let k = sparks.length - 1; k >= 0; k--) {
        const sp = sparks[k]
        sp.t += sp.speed * dt
        const s = synapses[sp.s]
        // Una chispa deja la sinapsis apenas visible mientras viaja.
        if (s.reveal < 0.22) s.reveal = Math.min(0.22, s.reveal + 0.05 * dt)
        if (sp.t < 1) continue
        sparks.splice(k, 1)
        const target = sp.dir === 1 ? s.b : s.a
        neurons[target].e = 1
        if (Math.random() < SPARK_CASCADE) {
          const links = adjacency[target]
          const next = links[Math.floor(Math.random() * links.length)]
          if (next !== undefined) sparkOn(next)
        }
      }
    }

    const paint = (time: number) => {
      const now = time / 1000
      ctx.clearRect(0, 0, w, h)
      ctx.lineWidth = 1

      // 1) Sinapsis reveladas por el cursor (curvas, nunca rectas).
      for (const s of synapses) {
        if (s.reveal < 0.015) continue
        const heat = 0.4 + 0.6 * pointerHeat
        const alpha = (0.04 + s.reveal * 0.3) * heat * intensity
        if (alpha < 0.012) continue
        ctx.strokeStyle = `rgba(${ACCENT},${alpha.toFixed(3)})`
        ctx.beginPath()
        ctx.moveTo(s.xa, s.ya)
        ctx.quadraticCurveTo(s.cx, s.cy, s.xb, s.yb)
        ctx.stroke()
      }

      // 2) Chispas: cola curva + cabeza brillante (composite aditivo).
      ctx.globalCompositeOperation = "lighter"
      for (const sp of sparks) {
        const s = synapses[sp.s]
        // La misma cuadrática, recorrida en el sentido de la chispa.
        const x1 = sp.dir === 1 ? s.xa : s.xb
        const y1 = sp.dir === 1 ? s.ya : s.yb
        const x2 = sp.dir === 1 ? s.xb : s.xa
        const y2 = sp.dir === 1 ? s.yb : s.ya
        const t = sp.t
        const tailT = Math.max(0, t - 0.22)
        ctx.strokeStyle = `rgba(${ACCENT},0.3)`
        ctx.beginPath()
        ctx.moveTo(curveAt(x1, s.cx, x2, tailT), curveAt(y1, s.cy, y2, tailT))
        for (let k = 1; k <= 4; k++) {
          const tt = tailT + ((t - tailT) * k) / 4
          ctx.lineTo(curveAt(x1, s.cx, x2, tt), curveAt(y1, s.cy, y2, tt))
        }
        ctx.stroke()
        const hx = curveAt(x1, s.cx, x2, t)
        const hy = curveAt(y1, s.cy, y2, t)
        ctx.fillStyle = `rgba(${ACCENT},0.65)`
        ctx.beginPath()
        ctx.arc(hx, hy, 1, 0, Math.PI * 2)
        ctx.fill()
      }

      // 3) Somas: punto + halo cuando están activos.
      for (const n of neurons) {
        const e = Math.min(1, n.e * (0.92 + 0.08 * Math.sin(now * 1.4 + n.seed)))
        ctx.fillStyle = `rgba(${ACCENT},${((0.16 + e * 0.7) * intensity).toFixed(3)})`
        ctx.beginPath()
        ctx.arc(n.x, n.y, 1 + e * 2, 0, Math.PI * 2)
        ctx.fill()
        if (e > 0.5) {
          ctx.strokeStyle = `rgba(${ACCENT},${((e - 0.5) * 0.5 * intensity).toFixed(3)})`
          ctx.beginPath()
          ctx.arc(n.x, n.y, 3 + e * 5, 0, Math.PI * 2)
          ctx.stroke()
        }
      }

      // 4) Puntero: soma propio, apenas un punto.
      if (pointer.active && !coarse && pointerHeat > 0.15) {
        ctx.fillStyle = `rgba(${ACCENT},${(0.25 + pointerHeat * 0.25).toFixed(3)})`
        ctx.beginPath()
        ctx.arc(pointer.x, pointer.y, 1.6, 0, Math.PI * 2)
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
      excitePointer(dt)
      advance(dt)
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
    /** Tap (móvil) o click: revela y chispea la zona tocada. */
    const onDown = (event: PointerEvent) => {
      const { clientX: x, clientY: y } = event
      for (const s of synapses) {
        const d = Math.hypot(s.mx - x, s.my - y)
        if (d < brushRadius) s.reveal = Math.max(s.reveal, 1 - d / brushRadius)
      }
      for (let k = 0; k < 3; k++) spawnRandom()
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
