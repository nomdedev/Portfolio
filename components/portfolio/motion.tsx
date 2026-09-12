"use client"

import { useEffect, useRef, type ReactNode } from "react"

/**
 * Atracción magnética sutil hacia el cursor (solo puntero fino, respeta reduced-motion).
 * Aplicar en el wrapper externo para no pelearse con hovers del hijo.
 */
export function Magnetic({
  children,
  strength = 0.22,
  className = "",
}: {
  children: ReactNode
  strength?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    if (window.matchMedia("(pointer: coarse)").matches) return
    const el = ref.current
    if (!el) return
    let raf = 0
    let tx = 0
    let ty = 0
    let cx = 0
    let cy = 0
    const loop = () => {
      cx += (tx - cx) * 0.18
      cy += (ty - cy) * 0.18
      if (Math.abs(tx - cx) < 0.05 && Math.abs(ty - cy) < 0.05) {
        el.style.transform = ""
        raf = 0
        return
      }
      el.style.transform = `translate(${cx.toFixed(2)}px,${cy.toFixed(2)}px)`
      raf = window.requestAnimationFrame(loop)
    }
    const kick = () => {
      if (!raf) raf = window.requestAnimationFrame(loop)
    }
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      tx = (e.clientX - (r.left + r.width / 2)) * strength
      ty = (e.clientY - (r.top + r.height / 2)) * strength
      kick()
    }
    const onLeave = () => {
      tx = 0
      ty = 0
      kick()
    }
    el.addEventListener("pointermove", onMove)
    el.addEventListener("pointerleave", onLeave)
    return () => {
      el.removeEventListener("pointermove", onMove)
      el.removeEventListener("pointerleave", onLeave)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [strength])

  return (
    <div ref={ref} className={`inline-block will-change-transform ${className}`}>
      {children}
    </div>
  )
}

/**
 * Glow radial que sigue al cursor dentro de la card (solo puntero fino).
 */
export function Spotlight({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(pointer: coarse)").matches) return
    let raf = 0
    let mx = 0
    let my = 0
    const paint = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      el.style.setProperty("--mx", `${Math.round(mx - r.left)}px`)
      el.style.setProperty("--my", `${Math.round(my - r.top)}px`)
    }
    const onMove = (e: PointerEvent) => {
      mx = e.clientX
      my = e.clientY
      if (!raf) raf = window.requestAnimationFrame(paint)
    }
    el.addEventListener("pointermove", onMove)
    return () => {
      el.removeEventListener("pointermove", onMove)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={ref} className={`spotlight ${className}`}>
      {children}
    </div>
  )
}
