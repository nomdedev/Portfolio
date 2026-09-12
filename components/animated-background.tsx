"use client"

import { useEffect, useRef } from "react"

export function AnimatedBackground() {
  const ref = useRef<HTMLDivElement>(null)

  // Parallax sutil: solo transform, rAF + passive, desactivado con reduced-motion
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        const el = ref.current
        if (el) el.style.transform = `translateY(${window.scrollY * 0.12}px)`
      })
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-background" />
      <div ref={ref} className="absolute -inset-y-1/4 inset-x-0 will-change-transform">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute inset-0 hero-glow" />
      </div>
    </div>
  )
}
