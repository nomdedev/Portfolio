/**
 * Driver de scroll único de la web.
 *
 * Un solo listener `scroll` (passive) + rAF calcula el estado y lo publica de dos
 * formas:
 *   1. Variables CSS en `document.documentElement` (para capas que solo necesitan
 *      CSS: rejilla de fondo, glow).
 *   2. Suscriptores JS (para el canvas, que redibuja activación).
 *
 * Reglas (DESIGN.md §4):
 * - No `getBoundingClientRect()` ni lecturas que fuercen layout dentro del scroll:
 *   `max` se cachea y se recalcula en resize / cambio de alto del documento.
 * - No hay loop permanente: los frames corren mientras hay scroll y mientras la
 *   velocidad decae (unos cientos de ms) y después se detienen.
 * - Variables publicadas: `--scroll-progress` (0..1), `--scroll-vel` (0..1, ya
 *   normalizada y con decaimiento).
 */

export type ScrollState = {
  /** Posición vertical actual en px. */
  y: number
  /** Progreso del documento 0..1. */
  progress: number
  /** Velocidad normalizada 0..1, decae sola al frenar. */
  velocity: number
}

const INITIAL: ScrollState = { y: 0, progress: 0, velocity: 0 }

const subscribers = new Set<(state: ScrollState) => void>()
let state: ScrollState = INITIAL
let maxScroll = 1
let frame = 0
let installed = false
let observer: ResizeObserver | null = null

function measureBounds() {
  const doc = document.documentElement
  maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight)
}

function schedule() {
  if (frame) return
  frame = window.requestAnimationFrame(emit)
}

function emit() {
  frame = 0
  const y = window.scrollY
  const progress = Math.min(1, Math.max(0, y / maxScroll))
  // delta por frame (~2 frames de 60fps = recorrido de referencia) suavizado con
  // la velocidad previa para que los saltos de inercia no parpadeen.
  const raw = Math.min(1, Math.abs(y - state.y) / 34)
  const velocity = Math.min(1, state.velocity * 0.72 + raw * 0.28)
  const next: ScrollState = { y, progress, velocity }

  const root = document.documentElement
  root.style.setProperty("--scroll-progress", progress.toFixed(4))
  root.style.setProperty("--scroll-vel", velocity.toFixed(3))

  state = next
  subscribers.forEach((fn) => fn(state))

  // Sigue animando mientras la velocidad no se extinga (colchón para que las
  // capas "se apaguen" en vez de quedar congeladas excitadas).
  if (velocity > 0.01) schedule()
}

function onScroll() {
  schedule()
}

function onResize() {
  measureBounds()
  schedule()
}

function install() {
  if (installed || typeof window === "undefined") return
  installed = true
  measureBounds()
  window.addEventListener("scroll", onScroll, { passive: true })
  window.addEventListener("resize", onResize)
  if (typeof ResizeObserver !== "undefined") {
    observer = new ResizeObserver(measureBounds)
    observer.observe(document.body)
  }
  emit()
}

function uninstall() {
  if (!installed) return
  installed = false
  window.removeEventListener("scroll", onScroll)
  window.removeEventListener("resize", onResize)
  observer?.disconnect()
  observer = null
  if (frame) window.cancelAnimationFrame(frame)
  frame = 0
}

/** Estado actual sin suscribirse. */
export function getScrollState(): ScrollState {
  return state
}

/**
 * Suscribe un callback al estado de scroll. Devuelve la función de baja.
 * El callback se invoca una vez al suscribirse para inicializar.
 */
export function subscribeScroll(fn: (state: ScrollState) => void): () => void {
  if (typeof window === "undefined") return () => {}
  install()
  subscribers.add(fn)
  fn(state)
  return () => {
    subscribers.delete(fn)
    if (subscribers.size === 0) uninstall()
  }
}
