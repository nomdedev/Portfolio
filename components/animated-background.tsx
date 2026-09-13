"use client"

import { useEffect, useRef } from "react"
import { subscribeScroll } from "@/lib/scroll-driver"

/**
 * Fondo "deep space": un cielo estelar vivo sobre el que se apoya el contenido.
 *
 * Tres sistemas:
 *
 * 1) CAMPO ESTELAR (3 capas de profundidad): estrellas blancas/azuladas (neutro
 *    slate) con unas pocas esmeralda. Cada una parpadea (twinkle) con fase,
 *    velocidad y amplitud propias. Las capas derivan muy despacio (rotación
 *    celeste) a velocidades distintas y tienen parallax distinto con el cursor:
 *    la cercana se mueve ~13px, la lejana ~3px → profundidad real. Las
 *    destacadas ("hot") llevan halo y cruz de difracción.
 *
 * 2) CONSTELACIONES DEL CURSOR: dentro de un radio (~170px) las estrellas de
 *    las capas cercanas se conectan con trazos esmeralda finos que SE DIBUJAN
 *    progresivamente (como si el cursor trazara la figura a mano) y se apagan
 *    con un fade corto al alejarse. Las 4 más cercanas se enlazan con el propio
 *    cursor. Alrededor del cursor las estrellas brillan un poco más.
 *
 * 3) ESTRELLAS FUGACES: cada 8-20s cruza una, con estela blanco→esmeralda.
 *    Reemplaza al viejo "barrido": es el único evento global y es natural.
 *    En táctil, un tap lanza una desde el punto tocado.
 *
 * Scroll: la velocidad acelera la deriva (lib/scroll-driver.ts). El aura
 * esmeralda CSS (`.scroll-glow`) actúa de nebulosa tenue.
 *
 * Rendimiento (DESIGN.md §4): capa fija, ~30fps, DPR ≤1.5, sprites de halo
 * pre-renderizados, pausa con la pestaña oculta y con `prefers-reduced-motion`
 * se pinta un único frame estático (sin loop ni listeners de puntero).
 */

// 2 tintes, nada más (DESIGN.md §2): neutro slate claro + acento esmeralda.
const STAR_RGB = "224,234,242" // blanco frío (foreground)
const ACCENT_RGB = "52,211,153" // esmeralda
const HOT_RGB = "244,250,255" // cabezas de fugaz / núcleos calientes
const FRAME_MS = 33 // ~30fps
const TAU = Math.PI * 2

// --- Campo estelar ----------------------------------------------------------
const DENSITY = 6500 // px² por estrella
const STAR_MIN = 110
const STAR_MAX = 320
const WRAP_M = 26 // margen de wrap (> parallax máx para que no aparezcan a la vista)
const HOT_CHANCE = 0.09 // % de estrellas con halo + cruz (capas 1 y 2)
const ACCENT_CHANCE = 0.12 // % de estrellas esmeralda

// Capa: [drift px/s, parallax máx px, proporción acumulada]
const LAYERS = [
  { drift: 1.1, parallax: 3, acc: 0.55, rMin: 0.4, rMax: 0.85, aMin: 0.28, aMax: 0.5 },
  { drift: 2.4, parallax: 7, acc: 0.87, rMin: 0.7, rMax: 1.3, aMin: 0.35, aMax: 0.62 },
  { drift: 4.2, parallax: 13, acc: 1, rMin: 1.1, rMax: 1.9, aMin: 0.5, aMax: 0.85 },
] as const
// Dirección común de la deriva (el cielo "cae" apenas hacia la izquierda).
const DRIFT_X = -0.987
const DRIFT_Y = 0.16
const SCROLL_DRIFT_BOOST = 5

// --- Constelaciones del cursor ----------------------------------------------
const CONST_RADIUS = 170
const LINK_DIST = 100
const CURSOR_LINK_DIST = 120
const CURSOR_LINKS_MAX = 4
const TRACE_MS = 320 // la línea se dibuja en este tiempo
const RELEASE_MS = 380 // fade al romperse la conexión

// --- Estrellas fugaces -------------------------------------------------------
const METEOR_FIRST_MS: [number, number] = [3500, 6000]
const METEOR_EVERY_MS: [number, number] = [8000, 20000]
const METEOR_MAX = 2

type Star = {
  x: number
  y: number
  r: number
  layer: number
  base: number
  amp: number
  twPhase: number
  twSpeed: number
  hot: boolean
  accent: boolean
}

type Meteor = {
  x: number
  y: number
  vx: number
  vy: number
  born: number
  life: number
  len: number
}

/** Conexión viva de constelación: nace (trazado), vive y se apaga (release). */
type Conn = { born: number; rel: number }

const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const easeOut = (t: number) => 1 - (1 - t) * (1 - t) * (1 - t)
const rand = (min: number, max: number) => min + Math.random() * (max - min)

/** Sprite de halo pre-renderizado por tinte (drawImage es GPU, gradients no). */
function makeGlowSprite(rgb: string): HTMLCanvasElement {
  const c = document.createElement("canvas")
  c.width = 96
  c.height = 96
  const g = c.getContext("2d")
  if (g) {
    const grad = g.createRadialGradient(48, 48, 0, 48, 48, 48)
    grad.addColorStop(0, `rgba(${rgb},0.9)`)
    grad.addColorStop(0.22, `rgba(${rgb},0.3)`)
    grad.addColorStop(1, `rgba(${rgb},0)`)
    g.fillStyle = grad
    g.fillRect(0, 0, 96, 96)
  }
  return c
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
    let stars: Star[] = []
    let meteors: Meteor[] = []
    let conns = new Map<number, Conn>()
    let nextMeteorAt = 0
    let raf = 0
    let last = 0
    let stepTime = 0
    let resizeTimer = 0
    let running = true
    let intensity = 1
    let scrollVel = 0
    let pointerHeat = 0
    let constellationGain = 0
    // Parallax suavizado por capa.
    const ox = [0, 0, 0]
    const oy = [0, 0, 0]

    const pointer = { x: -9999, y: -9999, px: -9999, py: -9999, active: false }

    const glowWhite = makeGlowSprite(STAR_RGB)
    const glowAccent = makeGlowSprite(ACCENT_RGB)

    /** Campo estelar: distribución uniforme, cada estrella con su carácter. */
    const buildSky = () => {
      const area = w * h
      const count = Math.max(STAR_MIN, Math.min(STAR_MAX, Math.round(area / DENSITY)))
      stars = []
      for (let k = 0; k < count; k++) {
        const pick = Math.random()
        const layer = pick < LAYERS[0].acc ? 0 : pick < LAYERS[1].acc ? 1 : 2
        const L = LAYERS[layer]
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: rand(L.rMin, L.rMax),
          layer,
          base: rand(L.aMin, L.aMax),
          amp: rand(0.12, 0.45),
          twPhase: Math.random() * TAU,
          twSpeed: rand(0.0005, 0.0021), // período ~3-12,5s
          hot: layer > 0 && Math.random() < HOT_CHANCE,
          accent: Math.random() < ACCENT_CHANCE,
        })
      }
      conns.clear()
      meteors = []
      nextMeteorAt = performance.now() + rand(...METEOR_FIRST_MS)
    }

    const spawnMeteor = (now: number, fromX?: number, fromY?: number) => {
      if (meteors.length >= METEOR_MAX) return
      let x: number
      let y: number
      let vx: number
      let vy: number
      if (fromX !== undefined && fromY !== undefined) {
        // Tap táctil: la fugaz sale del dedo hacia arriba.
        const a = rand((-2 * Math.PI) / 3, -Math.PI / 3)
        const spd = rand(650, 950)
        x = fromX
        y = fromY
        vx = Math.cos(a) * spd
        vy = Math.sin(a) * spd
      } else {
        // Natural: nace fuera del borde superior o en un lateral alto, cae en
        // diagonal (~30-45°) hacia la izquierda o la derecha.
        const dir = Math.random() < 0.5 ? 1 : -1
        const a = rand(Math.PI * 0.16, Math.PI * 0.26)
        const spd = rand(800, 1300)
        if (Math.random() < 0.7) {
          x = Math.random() * w
          y = -WRAP_M
        } else {
          x = dir === 1 ? -WRAP_M : w + WRAP_M
          y = Math.random() * h * 0.35
        }
        vx = Math.cos(a) * spd * dir
        vy = Math.sin(a) * spd
      }
      meteors.push({ x, y, vx, vy, born: now, life: rand(1100, 1600), len: rand(90, 200) })
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
      buildSky()
      if (reduced) paint(performance.now())
    }

    /** Posición en pantalla de una estrella (deriva ya aplicada + parallax). */
    const posX = (s: Star) => s.x + ox[s.layer]
    const posY = (s: Star) => s.y + oy[s.layer]

    const advance = (dt: number, now: number) => {
      const ms = dt * 16.67
      const driftBoost = 1 + scrollVel * SCROLL_DRIFT_BOOST

      // Deriva celeste con wrap en bordes.
      for (const s of stars) {
        const v = LAYERS[s.layer].drift * driftBoost
        s.x += DRIFT_X * v * (ms / 1000)
        s.y += DRIFT_Y * v * (ms / 1000)
        if (s.x < -WRAP_M) s.x += w + WRAP_M * 2
        else if (s.x > w + WRAP_M) s.x -= w + WRAP_M * 2
        if (s.y < -WRAP_M) s.y += h + WRAP_M * 2
        else if (s.y > h + WRAP_M) s.y -= h + WRAP_M * 2
      }

      // Parallax del cursor (objetivo 0 sin puntero; lerp por capa).
      const tx = pointer.active && !coarse ? (pointer.x - w / 2) / (w / 2) : 0
      const ty = pointer.active && !coarse ? (pointer.y - h / 2) / (h / 2) : 0
      const k = Math.min(1, 0.055 * dt)
      for (let i = 0; i < 3; i++) {
        ox[i] += (tx * LAYERS[i].parallax - ox[i]) * k
        oy[i] += (ty * LAYERS[i].parallax - oy[i]) * k
      }

      // Calor del cursor (velocidad del mouse) y ganancia del grupo constelación.
      if (pointer.active && !coarse) {
        const speed = Math.hypot(pointer.x - pointer.px, pointer.y - pointer.py)
        pointerHeat = Math.min(1, pointerHeat * 0.88 + speed / 100)
        pointer.px = pointer.x
        pointer.py = pointer.y
      } else {
        pointerHeat *= 0.9
      }
      constellationGain += ((pointer.active && !coarse ? 1 : 0) - constellationGain) * Math.min(1, 0.08 * dt)
      if (constellationGain < 0.01) constellationGain = 0

      // Fugaces naturales.
      if (now >= nextMeteorAt) {
        spawnMeteor(now)
        nextMeteorAt = now + rand(...METEOR_EVERY_MS)
      }
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i]
        m.x += m.vx * (ms / 1000)
        m.y += m.vy * (ms / 1000)
        if (now - m.born > m.life || m.x < -120 || m.x > w + 120 || m.y < -120 || m.y > h + 120) {
          meteors.splice(i, 1)
        }
      }

      // Constelaciones: candidatas = capas 1-2 dentro del radio del cursor.
      if (constellationGain > 0) {
        const near: number[] = []
        for (let i = 0; i < stars.length; i++) {
          const s = stars[i]
          if (s.layer === 0) continue
          if (Math.hypot(posX(s) - pointer.x, posY(s) - pointer.y) < CONST_RADIUS) near.push(i)
        }
        const n = stars.length
        const touch = (key: number) => {
          const c = conns.get(key)
          if (c) {
            if (c.rel) c.rel = 0 // volvió a cumplirse: revive sin re-trazarse
          } else {
            conns.set(key, { born: now, rel: 0 })
          }
        }
        // Pares entre candidatas.
        for (let a = 0; a < near.length; a++) {
          for (let b = a + 1; b < near.length; b++) {
            const i = near[a]
            const j = near[b]
            if (Math.hypot(posX(stars[i]) - posX(stars[j]), posY(stars[i]) - posY(stars[j])) < LINK_DIST) {
              touch(i * n + j)
            }
          }
        }
        // Las 4 más cercanas enlazan con el cursor.
        near.sort((a, b) => {
          const da = Math.hypot(posX(stars[a]) - pointer.x, posY(stars[a]) - pointer.y)
          const db = Math.hypot(posX(stars[b]) - pointer.x, posY(stars[b]) - pointer.y)
          return da - db
        })
        for (let a = 0; a < Math.min(CURSOR_LINKS_MAX, near.length); a++) {
          const i = near[a]
          if (Math.hypot(posX(stars[i]) - pointer.x, posY(stars[i]) - pointer.y) < CURSOR_LINK_DIST) {
            touch(-(i + 1))
          }
        }
      }
      // Las conexiones en release que terminaron de apagarse mueren.
      // (El flag `rel` lo marca `releaseStale` en paint: la condición de cercanía
      // se evalúa sobre posiciones ya dibujadas.)
      for (const [key, c] of conns) {
        if (c.rel > 0 && now - c.rel > RELEASE_MS) conns.delete(key)
      }
    }

    /** Marca release en las conexiones que ya no cumplen la condición. */
    const releaseStale = (now: number) => {
      const n = stars.length
      for (const [key, c] of conns) {
        if (c.rel > 0) continue
        let alive = constellationGain > 0
        if (alive) {
          if (key < 0) {
            const s = stars[-key - 1]
            alive = Math.hypot(posX(s) - pointer.x, posY(s) - pointer.y) < CURSOR_LINK_DIST * 1.15
          } else {
            const i = Math.floor(key / n)
            const j = key % n
            const si = stars[i]
            const sj = stars[j]
            alive =
              Math.hypot(posX(si) - posX(sj), posY(si) - posY(sj)) < LINK_DIST * 1.1 &&
              (Math.hypot(posX(si) - pointer.x, posY(si) - pointer.y) < CONST_RADIUS * 1.1 ||
                Math.hypot(posX(sj) - pointer.x, posY(sj) - pointer.y) < CONST_RADIUS * 1.1)
          }
        }
        if (!alive) c.rel = now
      }
    }

    const paint = (time: number) => {
      const now = time
      ctx.clearRect(0, 0, w, h)
      releaseStale(now)

      // 1) Estrellas base (source-over: alpha exacto por estrella).
      for (const s of stars) {
        let alpha = s.base * (1 - s.amp) + s.base * s.amp * (0.5 + 0.5 * Math.sin(now * s.twSpeed + s.twPhase))
        if (constellationGain > 0 && s.layer > 0) {
          const d = Math.hypot(posX(s) - pointer.x, posY(s) - pointer.y)
          if (d < CONST_RADIUS) alpha *= 1 + 0.55 * (1 - d / CONST_RADIUS) * constellationGain
        }
        alpha *= intensity
        if (alpha < 0.03) continue
        ctx.fillStyle = `rgba(${s.accent ? ACCENT_RGB : STAR_RGB},${alpha.toFixed(3)})`
        ctx.beginPath()
        ctx.arc(posX(s), posY(s), s.r, 0, TAU)
        ctx.fill()
      }

      ctx.globalCompositeOperation = "lighter"

      // 2) Destacadas: halo (sprite) + cruz de difracción.
      for (const s of stars) {
        if (!s.hot) continue
        const tw = (1 - s.amp) + s.amp * (0.5 + 0.5 * Math.sin(now * s.twSpeed + s.twPhase))
        const px = posX(s)
        const py = posY(s)
        const size = s.r * 11
        ctx.globalAlpha = tw * 0.5 * intensity
        ctx.drawImage(s.accent ? glowAccent : glowWhite, px - size / 2, py - size / 2, size, size)
        const arm = s.r * 7
        ctx.globalAlpha = 1
        ctx.lineWidth = 0.6
        ctx.strokeStyle = `rgba(${s.accent ? ACCENT_RGB : STAR_RGB},${(0.09 * tw * intensity).toFixed(3)})`
        ctx.beginPath()
        ctx.moveTo(px - arm, py)
        ctx.lineTo(px + arm, py)
        ctx.moveTo(px, py - arm)
        ctx.lineTo(px, py + arm)
        ctx.stroke()
      }
      ctx.globalAlpha = 1

      // 3) Constelaciones: trazos que se dibujan y se apagan.
      if (conns.size > 0) {
        const n = stars.length
        ctx.lineWidth = 0.7
        for (const [key, c] of conns) {
          const prog = easeOut(Math.min(1, (now - c.born) / TRACE_MS))
          let alpha = prog * constellationGain * intensity
          if (c.rel > 0) alpha *= Math.max(0, 1 - (now - c.rel) / RELEASE_MS)
          if (alpha < 0.015) continue
          let x1: number
          let y1: number
          let x2: number
          let y2: number
          let maxAlpha: number
          if (key < 0) {
            const s = stars[-key - 1]
            x1 = posX(s)
            y1 = posY(s)
            x2 = pointer.x
            y2 = pointer.y
            const d = Math.hypot(x2 - x1, y2 - y1)
            maxAlpha = 0.22 * Math.max(0, 1 - d / CURSOR_LINK_DIST)
          } else {
            const i = Math.floor(key / n)
            const j = key % n
            const si = stars[i]
            const sj = stars[j]
            x1 = posX(si)
            y1 = posY(si)
            x2 = posX(sj)
            y2 = posY(sj)
            const d = Math.hypot(x2 - x1, y2 - y1)
            const layerFactor =
              si.layer + sj.layer === 4 ? 1 : si.layer + sj.layer === 3 ? 0.8 : 0.55
            maxAlpha = 0.3 * Math.max(0, 1 - d / LINK_DIST) * layerFactor
          }
          ctx.strokeStyle = `rgba(${ACCENT_RGB},${(alpha * maxAlpha).toFixed(3)})`
          ctx.beginPath()
          ctx.moveTo(x1, y1)
          ctx.lineTo(lerp(x1, x2, prog), lerp(y1, y2, prog))
          ctx.stroke()
        }
      }

      // 4) Fugaces: estela con gradiente + cabeza caliente.
      for (const m of meteors) {
        const age = now - m.born
        const kd = age / m.life
        const fade = Math.min(1, kd * 12) * (kd > 0.82 ? Math.max(0, 1 - (kd - 0.82) / 0.18) : 1)
        if (fade <= 0) continue
        const spd = Math.hypot(m.vx, m.vy)
        const nx = m.vx / spd
        const ny = m.vy / spd
        const tx = m.x - nx * m.len
        const ty = m.y - ny * m.len
        const trail = ctx.createLinearGradient(m.x, m.y, tx, ty)
        trail.addColorStop(0, `rgba(${HOT_RGB},${(0.85 * fade).toFixed(3)})`)
        trail.addColorStop(0.35, `rgba(${ACCENT_RGB},${(0.28 * fade).toFixed(3)})`)
        trail.addColorStop(1, `rgba(${ACCENT_RGB},0)`)
        ctx.lineWidth = 1.6
        ctx.lineCap = "round"
        ctx.strokeStyle = trail
        ctx.beginPath()
        ctx.moveTo(m.x, m.y)
        ctx.lineTo(tx, ty)
        ctx.stroke()
        ctx.globalAlpha = 0.8 * fade
        ctx.drawImage(glowWhite, m.x - 11, m.y - 11, 22, 22)
        ctx.globalAlpha = 1
        ctx.fillStyle = `rgba(${HOT_RGB},${(0.9 * fade).toFixed(3)})`
        ctx.beginPath()
        ctx.arc(m.x, m.y, 1.3, 0, TAU)
        ctx.fill()
      }

      // 5) El cursor: solo un halo esmeralda tenue (el radio se lee solo).
      if (pointer.active && !coarse && pointerHeat > 0.08) {
        const glow = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 46)
        glow.addColorStop(0, `rgba(${ACCENT_RGB},${(0.06 + pointerHeat * 0.08).toFixed(3)})`)
        glow.addColorStop(1, `rgba(${ACCENT_RGB},0)`)
        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(pointer.x, pointer.y, 46, 0, TAU)
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
    /** Tap (táctil): lanza una fugaz desde el punto tocado. */
    const onDown = (event: PointerEvent) => {
      if (event.pointerType !== "touch") return
      spawnMeteor(performance.now(), event.clientX, event.clientY)
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
      <div className="absolute inset-0 scroll-glow" />
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
    </div>
  )
}
