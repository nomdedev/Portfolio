"use client"

import { useEffect, useRef, useState } from "react"
import { useLanguage, type Lang } from "@/lib/i18n"

const copy: Record<
  Lang,
  {
    index: string
    title: string
    paragraphs: string[]
    metrics: { value: string; label: string }[]
  }
> = {
  es: {
    index: "01.",
    title: "Sobre mí",
    paragraphs: [
      "Soy ingeniero electromecánico especializado en datos, machine learning e IA generativa. Diseño soluciones end-to-end que conectan modelos con decisiones de negocio: desde pipelines de datos y predictive modeling hasta agentes de IA y automatización.",
      "Trabajo en producción con Microsoft Fabric, SAP Business One, APIs REST y n8n, y enseño Inteligencia Artificial en el posgrado de la Facultad de Ciencias Económicas (UNLP).",
    ],
    metrics: [
      { value: "+5", label: "Años en datos e IA" },
      { value: "80%", label: "Reducción en tiempos de información crítica" },
      { value: "UNLP", label: "Docente universitario de IA" },
    ],
  },
  en: {
    index: "01.",
    title: "About me",
    paragraphs: [
      "I'm an electromechanical engineer specialized in data, machine learning and generative AI. I design end-to-end solutions connecting models to business decisions: from data pipelines and predictive modeling to AI agents and automation.",
      "I work in production with Microsoft Fabric, SAP Business One, REST APIs and n8n, and I teach Artificial Intelligence in the postgraduate program at Facultad de Ciencias Económicas (UNLP).",
    ],
    metrics: [
      { value: "+5", label: "Years in data & AI" },
      { value: "80%", label: "Reduction in critical reporting times" },
      { value: "UNLP", label: "University AI lecturer" },
    ],
  },
}

export function About() {
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
      id="about"
      ref={sectionRef}
      className="py-24 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto"
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

        <div className="max-w-3xl space-y-4 mb-12">
          {t.paragraphs.map((p) => (
            <p key={p.slice(0, 24)} className="text-muted-foreground leading-relaxed text-base md:text-lg">
              {p}
            </p>
          ))}
        </div>

        <dl className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl">
          {t.metrics.map((metric) => (
            <div
              key={metric.label}
              className="border border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors"
            >
              <dd className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {metric.value}
              </dd>
              <dt className="text-sm text-muted-foreground">{metric.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
