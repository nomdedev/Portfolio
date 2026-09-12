"use client"

import { useEffect, useRef } from "react"
import { subscribeScroll } from "@/lib/scroll-driver"

/**
 * Fondo vivo: red neuronal sutil sobre la que se apoya el contenido.
 *
 * Modelo (no es un sistema de partículas: es una red):
 * - Neuronas en retícula con jitter (geometría estable, se reconstruye en resize).
 * - Sinapsis entre vecinas (grado acotado, sin hubs) + unos pocos enlaces largos.
 * - Activación: recibir un pulso sube la energía, dispara y propaga a las
 *   sinapsis vecinas (cascada). La energía decae sola.
 * - Entradas: el cursor (pincel de excitación con estela según su velocidad),
 *   el tap en táctil, y la velocidad de scroll (scroll rápido ilumina la red;
 *   al frenar se apaga).
 * - Sin cursor: disparo ambiente de baja tasa para que la red no muera.
 *
 * Rendimiento (DESIGN.md §4): capa fija, ~30fps, DPR tope 1.5, geometría sin
 * drift, sin `will-change` permanente, pausa con la pestaña oculta y con
 * `prefers-reduced-motion` se pinta un único frame estático.
 */

// Acento del sistema (DESIGN.md §2): un solo tinte, distintos alfas.
const ACCENT = "52,211,153"
const FRAME_MS = 33 // ~30fps: el fondo es textura, no compite con el contenido
const DECAY = 0.05 // caída de energía por frame (normalizada por dt)
const MAX_PULSES = 70
const POINTER_BRUSH = 190
const MIN_SPACING = 135
const NODE_MIN = 48
const NODE_MAX = 180
const PULSE_TAIL_PX = 16
// Sinapsis en reposo y umbral de "caliente": son las líneas las que dan masa
// visual (los puntos solos no se ven sobre negro). El reposo tiene que quedar
// por debajo del texto para no ensuciarlo: el contraste lo da la activación.
const SYNAPSE_REST = 0.05
const SYNAPSE_HOT = 0.18

type Neuron = { x: number; y: number; e: number; seed: number; next: number }
type Synapse = { a: number; b: number; xa: number; ya: number; xb: number; yb: number; len: number }
type Pulse = { s: number; t: number; speed: number; dir: 1 | -1 }

/**
 * Período medio entre disparos espontáneos de una neurona, en frames (~30fps).
 * Decorrelacionado por neurona: la red titila en vez de hervir en bloque.
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
    let pulses: Pulse[] = []
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
    // Radio del "pincel" de excitación: acompaña la separación de la retícula para
    // que el cursor encienda siempre un grupo comparable de neuronas.
    let brushRadius = POINTER_BRUSH

    const pointer = { x: -9999, y: -9999, px: -9999, py: -9999, active: false }

    /** Retícula con jitter: lee como red, no como nube aleatoria. */
    const build = () => {
      const area = w * h
      const count = Math.max(NODE_MIN, Math.min(NODE_MAX, Math.round(area / 11000)))
      // La densidad se define por separación mínima, no por cantidad: en una
      // pantalla chica la misma cantidad de neuronas se ve como una maraña.
      const step = Math.max(MIN_SPACING, Math.sqrt(area / count))
      const cols = Math.max(2, Math.round(w / step))
      const rows = Math.max(2, Math.round(h / step))
      const stepX = w / cols
      const stepY = h / rows
      brushRadius = Math.max(POINTER_BRUSH, step * 1.6)

      neurons = []
      for (let r = 0; r < rows && neurons.length < count; r++) {
        for (let c = 0; c < cols && neurons.length < count; c++) {
          neurons.push({
            x: (c + 0.5 + (Math.random() - 0.5) * 0.7) * stepX,
            y: (r + 0.5 + (Math.random() - 0.5) * 0.7) * stepY,
            e: 0.03 + Math.random() * 0.05,
            seed: Math.random() * Math.PI * 2,
            // Timer propio (proceso de Poisson): sin esto toda la red dispara
            // sincronizada y el fondo "parpadea" entero en vez de titilar.
            next: Math.random() * ambientPeriod(coarse),
          })
        }
      }

      // Sinapsis: entre 2 y 4 vecinas cercanas. El tope de largo es lo que evita
      // que el dibujo lea como telaraña geométrica en vez de red.
      const maxEdge = step * 1.75
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
        for (const candidate of candidates.slice(0, 4)) {
          if (seen.has(key(i, candidate.j))) continue
          seen.add(key(i, candidate.j))
          const b = neurons[candidate.j]
          synapses.push({
            a: i,
            b: candidate.j,
            xa: a.x,
            ya: a.y,
            xb: b.x,
            yb: b.y,
            len: candidate.d,
          })
        }
      }
      // Unos pocos enlaces largos (acotados): dejan que la activación salte de un
      // racimo a otro en vez de morir en el vecindario donde nació.
      for (let k = 0; k < Math.round(neurons.length * 0.1); k++) {
        const i = Math.floor(Math.random() * neurons.length)
        const j = Math.floor(Math.random() * neurons.length)
        if (i === j || seen.has(key(i, j))) continue
        const a = neurons[i]
        const b = neurons[j]
        const len = Math.hypot(a.x - b.x, a.y - b.y)
        if (len > step * 2.1) continue
        seen.add(key(i, j))
        synapses.push({ a: i, b: j, xa: a.x, ya: a.y, xb: b.x, yb: b.y, len })
      }

      adjacency = neurons.map(() => [])
      synapses.forEach((s, index) => {
        adjacency[s.a].push(index)
        adjacency[s.b].push(index)
      })
      pulses = []
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

    /** Dispara una neurona: la enciende y emite pulsos por sus sinapsis. */
    const fire = (i: number) => {
      const neuron = neurons[i]
      if (neuron.e > 0.85) return // refractaria: ya está disparando
      neuron.e = 1
      for (const index of adjacency[i]) {
        if (pulses.length >= MAX_PULSES) return
        const s = synapses[index]
        // ~0.7s de viaje real, independiente del largo de la sinapsis.
        pulses.push({ s: index, t: 0, speed: 0.022 + Math.random() * 0.012, dir: s.a === i ? 1 : -1 })
      }
    }

    /** Excitación por cursor (pincel) y por velocidad de scroll. */
    const excite = (dt: number) => {
      if (pointer.active && !coarse) {
        const speed = Math.hypot(pointer.x - pointer.px, pointer.y - pointer.py)
        pointerHeat = Math.min(1, pointerHeat * 0.85 + speed / 24)
        const gain = (0.012 + 0.05 * pointerHeat) * dt
        const ax = pointer.px
        const ay = pointer.py
        const dx = pointer.x - ax
        const dy = pointer.y - ay
        const segLen2 = dx * dx + dy * dy
        for (let i = 0; i < neurons.length; i++) {
          const n = neurons[i]
          let t = segLen2 > 1 ? ((n.x - ax) * dx + (n.y - ay) * dy) / segLen2 : 1
          t = t < 0 ? 0 : t > 1 ? 1 : t
          const d = Math.hypot(n.x - (ax + dx * t), n.y - (ay + dy * t))
          if (d >= brushRadius) continue
          n.e = Math.min(1, n.e + (1 - d / brushRadius) * gain)
          if (n.e > 0.7 && Math.random() < 0.14 * (0.4 + pointerHeat)) fire(i)
        }
        pointer.px = pointer.x
        pointer.py = pointer.y
      } else {
        pointerHeat *= 0.9
      }

      // Scroll rápido: excitación global que se apaga sola al frenar.
      if (scrollBoost > 0.05) {
        let fired = 0
        for (let i = 0; i < neurons.length && fired < 3; i++) {
          if (Math.random() < scrollBoost * 0.01) {
            fire(i)
            fired++
          }
        }
      }
    }

    const advance = (dt: number) => {
      // Ambiente: cada neurona dispara por su cuenta cada unos segundos, así la
      // red late despacio sin cursor. El scroll acelera esos timers.
      for (let i = 0; i < neurons.length; i++) {
        const n = neurons[i]
        n.e *= 1 - DECAY * dt
        if (n.e < 0.001) n.e = 0
        n.next -= dt * (1 + scrollBoost * 2.5)
        if (n.next <= 0) {
          if (n.e < 0.5) fire(i)
          n.next = ambientPeriod(coarse)
        }
      }

      for (let k = pulses.length - 1; k >= 0; k--) {
        const p = pulses[k]
        p.t += p.speed * dt
        if (p.t < 1) continue
        const s = synapses[p.s]
        pulses.splice(k, 1)
        const target = p.dir === 1 ? s.b : s.a
        const n = neurons[target]
        n.e = Math.min(1, n.e + 0.8)
        if (n.e > 0.62 && Math.random() < 0.5) fire(target)
      }
    }

    const paint = (time: number) => {
      const now = time / 1000
      ctx.clearRect(0, 0, w, h)
      ctx.lineWidth = 1

      // Sinapsis frías: un solo path → un solo stroke (lo barato del frame).
      ctx.beginPath()
      for (const s of synapses) {
        if (Math.max(neurons[s.a].e, neurons[s.b].e) >= SYNAPSE_HOT) continue
        ctx.moveTo(s.xa, s.ya)
        ctx.lineTo(s.xb, s.yb)
      }
      ctx.strokeStyle = `rgba(${ACCENT},${(SYNAPSE_REST * intensity).toFixed(3)})`
      ctx.stroke()

      // Sinapsis calientes: brillo proporcional a la energía del par.
      for (const s of synapses) {
        const energy = Math.max(neurons[s.a].e, neurons[s.b].e)
        if (energy < SYNAPSE_HOT) continue
        ctx.strokeStyle = `rgba(${ACCENT},${(SYNAPSE_REST * intensity + energy * 0.34).toFixed(3)})`
        ctx.beginPath()
        ctx.moveTo(s.xa, s.ya)
        ctx.lineTo(s.xb, s.yb)
        ctx.stroke()
      }

      // Pulsos en viaje: el movimiento real de la red.
      ctx.globalCompositeOperation = "lighter"
      for (const p of pulses) {
        const s = synapses[p.s]
        const x1 = p.dir === 1 ? s.xa : s.xb
        const y1 = p.dir === 1 ? s.ya : s.yb
        const x2 = p.dir === 1 ? s.xb : s.xa
        const y2 = p.dir === 1 ? s.yb : s.ya
        const t = p.t
        const back = Math.max(0, t - Math.min(1, PULSE_TAIL_PX / s.len))
        const hx = x1 + (x2 - x1) * t
        const hy = y1 + (y2 - y1) * t
        ctx.strokeStyle = `rgba(${ACCENT},0.7)`
        ctx.beginPath()
        ctx.moveTo(x1 + (x2 - x1) * back, y1 + (y2 - y1) * back)
        ctx.lineTo(hx, hy)
        ctx.stroke()
        ctx.fillStyle = `rgba(${ACCENT},0.9)`
        ctx.beginPath()
        ctx.arc(hx, hy, 0.9, 0, Math.PI * 2)
        ctx.fill()
      }

      // Neuronas: cuerpo + halo cuando están disparando.
      for (const n of neurons) {
        const e = Math.min(1, n.e * (0.92 + 0.08 * Math.sin(now * 1.4 + n.seed)))
        ctx.fillStyle = `rgba(${ACCENT},${((0.34 + e * 0.6) * intensity).toFixed(3)})`
        ctx.beginPath()
        ctx.arc(n.x, n.y, 1.2 + e * 2.4, 0, Math.PI * 2)
        ctx.fill()
        if (e > 0.45) {
          ctx.strokeStyle = `rgba(${ACCENT},${((e - 0.45) * 0.55).toFixed(3)})`
          ctx.beginPath()
          ctx.arc(n.x, n.y, 3.5 + e * 5, 0, Math.PI * 2)
          ctx.stroke()
        }
      }

      // Dendritas del cursor: unas pocas neuronas activas convergen al puntero.
      if (pointer.active && pointerHeat > 0.25 && !coarse) {
        let linked = 0
        ctx.strokeStyle = `rgba(${ACCENT},${(0.1 + pointerHeat * 0.22).toFixed(3)})`
        ctx.beginPath()
        for (const n of neurons) {
          if (n.e < 0.3) continue
          if (Math.hypot(n.x - pointer.x, n.y - pointer.y) > brushRadius * 0.85) continue
          ctx.moveTo(n.x, n.y)
          ctx.lineTo(pointer.x, pointer.y)
          if (++linked >= 5) break
        }
        ctx.stroke()
        ctx.fillStyle = `rgba(${ACCENT},0.5)`
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
      excite(dt)
      advance(dt)
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
      pointer.px = -9999
      pointer.py = -9999
    }
    /** Tap (móvil) o click: destello local, la red responde al toque. */
    const onDown = (event: PointerEvent) => {
      const { clientX: x, clientY: y } = event
      for (let i = 0; i < neurons.length; i++) {
        const n = neurons[i]
        if (Math.hypot(n.x - x, n.y - y) > brushRadius) continue
        fire(i)
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
