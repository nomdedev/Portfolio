"use client"

import { useEffect, useRef } from "react"

const LINK_DIST = 140
const MOUSE_DIST = 180
const ACCENT = "52,211,153" // esmeralda del sistema

type Particle = { x: number; y: number; vx: number; vy: number; r: number; tw: number }

export function AnimatedBackground() {
  const parallaxRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Parallax sutil: solo transform, rAF + passive, desactivado con reduced-motion
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        const el = parallaxRef.current
        if (el) el.style.transform = `translateY(${window.scrollY * 0.12}px)`
      })
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  // Constellation: red de partículas con conexiones, reactiva al cursor
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    let w = 0
    let h = 0
    let pts: Particle[] = []
    let raf = 0
    let running = true
    const mouse = { x: -9999, y: -9999 }

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.max(45, Math.min(140, Math.floor((w * h) / 9000)))
      pts = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.8,
        tw: Math.random() * Math.PI * 2,
      }))
    }

    const step = () => {
      if (!running) return
      ctx.clearRect(0, 0, w, h)

      for (const p of pts) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
      }

      ctx.lineWidth = 1
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i]
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 < LINK_DIST * LINK_DIST) {
            const alpha = (1 - Math.sqrt(d2) / LINK_DIST) * 0.22
            ctx.strokeStyle = `rgba(${ACCENT},${alpha.toFixed(3)})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
        // Conexión al cursor dentro del radio
        const mdx = a.x - mouse.x
        const mdy = a.y - mouse.y
        const md2 = mdx * mdx + mdy * mdy
        if (md2 < MOUSE_DIST * MOUSE_DIST) {
          const alpha = (1 - Math.sqrt(md2) / MOUSE_DIST) * 0.5
          ctx.strokeStyle = `rgba(${ACCENT},${alpha.toFixed(3)})`
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.stroke()
        }
      }

      ctx.fillStyle = `rgba(${ACCENT},0.5)`
      const now = performance.now() / 1000
      for (const p of pts) {
        ctx.fillStyle = `rgba(${ACCENT},${(0.45 + 0.3 * Math.sin(now * 1.2 + p.tw)).toFixed(3)})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      raf = window.requestAnimationFrame(step)
    }

    let resizeTimer = 0
    const onResize = () => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(resize, 150)
    }
    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }
    const onVisibility = () => {
      running = document.visibilityState === "visible"
      if (running) raf = window.requestAnimationFrame(step)
      else window.cancelAnimationFrame(raf)
    }

    resize()
    raf = window.requestAnimationFrame(step)
    window.addEventListener("resize", onResize)
    window.addEventListener("pointermove", onMove, { passive: true })
    document.documentElement.addEventListener("pointerleave", onLeave)
    document.addEventListener("visibilitychange", onVisibility)
    return () => {
      running = false
      window.cancelAnimationFrame(raf)
      window.clearTimeout(resizeTimer)
      window.removeEventListener("resize", onResize)
      window.removeEventListener("pointermove", onMove)
      document.documentElement.removeEventListener("pointerleave", onLeave)
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-background" />
      <div ref={parallaxRef} className="absolute -inset-y-1/4 inset-x-0 will-change-transform">
        <div className="absolute inset-0 bg-grid" />
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
        <div className="absolute inset-0 hero-glow" />
      </div>
    </div>
  )
}
