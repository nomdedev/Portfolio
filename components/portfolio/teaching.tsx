"use client"

import { useEffect, useRef, useState } from "react"
import { GraduationCap } from "lucide-react"
import { useLanguage, type Lang } from "@/lib/i18n"

const copy: Record<
  Lang,
  { index: string; title: string; role: string; org: string; date: string; description: string }
> = {
  es: {
    index: "04.",
    title: "Docencia",
    role: "Docente de Inteligencia Artificial",
    org: "Posgrado · Facultad de Ciencias Económicas (UNLP)",
    date: "2026 — Presente",
    description:
      "Formación de posgrado en IA aplicada a negocios: fundamentos de machine learning, IA generativa, prompt engineering y automatización de decisiones con casos reales.",
  },
  en: {
    index: "04.",
    title: "Teaching",
    role: "Artificial Intelligence Lecturer",
    org: "Postgraduate program · Facultad de Ciencias Económicas (UNLP)",
    date: "2026 — Present",
    description:
      "Postgraduate training in business-applied AI: machine learning fundamentals, generative AI, prompt engineering and decision automation with real cases.",
  },
}

export function Teaching() {
  const { lang } = useLanguage()
  const t = copy[lang]
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="teaching"
      ref={sectionRef}
      className="py-24 px-6 md:px-12 lg:px-24 max-w-4xl mx-auto"
    >
      <div
        className={`transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <h2 className="flex items-center gap-4 text-2xl md:text-3xl font-bold text-foreground mb-8">
          <span className="text-primary font-mono text-xl">{t.index}</span>
          {t.title}
          <span className="h-px bg-border flex-1 max-w-xs" />
        </h2>

        <div className="flex gap-5 border border-border rounded-lg p-6 md:p-8 hover:border-primary/50 transition-colors">
          <div className="hidden sm:flex w-12 h-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <GraduationCap className="w-6 h-6 text-primary" aria-hidden="true" />
          </div>
          <div>
            <p className="font-mono text-sm text-primary mb-1">{t.date}</p>
            <h3 className="text-lg font-semibold text-foreground">{t.role}</h3>
            <p className="text-muted-foreground text-sm mb-3">{t.org}</p>
            <p className="text-muted-foreground leading-relaxed max-w-2xl">
              {t.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
