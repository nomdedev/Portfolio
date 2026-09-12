"use client"

import { useLanguage, type Lang } from "@/lib/i18n"
import { Reveal } from "@/components/portfolio/reveal"
import { Spotlight } from "@/components/portfolio/motion"

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

  return (
    <section
      id="about"
      className="py-24 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto"
    >
      <Reveal>
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
      </Reveal>

      <dl className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl">
        {t.metrics.map((metric, i) => (
          <Reveal key={metric.label} delay={i * 100}>
            <Spotlight className="h-full rounded-lg">
            <div className="border border-border rounded-lg p-6 text-center hover:border-primary/50 hover:-translate-y-1 transition-[transform,border-color,box-shadow] duration-300 h-full">
              <dd className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {metric.value}
              </dd>
              <dt className="text-sm text-muted-foreground">{metric.label}</dt>
            </div>
            </Spotlight>
          </Reveal>
        ))}
      </dl>
    </section>
  )
}
