"use client"

import { useLanguage, type Lang } from "@/lib/i18n"
import { Reveal } from "@/components/portfolio/reveal"
import { SectionHeader } from "@/components/portfolio/section-header"
import { Spotlight } from "@/components/portfolio/motion"
import { yearsInData } from "@/lib/stats"

const copy: Record<
  Lang,
  {
    index: string
    title: string
    subtitle: string
    paragraphs: string[]
    factsLabel: string
    facts: { term: string; value: string; live?: boolean }[]
    metrics: { value: string; label: string }[]
  }
> = {
  es: {
    index: "01.",
    title: "Sobre mí",
    subtitle: "Trayectoria, enfoque de ingeniería y criterios de trabajo.",
    paragraphs: [
      "Soy ingeniero electromecánico especializado en datos, machine learning e IA generativa. Diseño soluciones end-to-end que conectan modelos con decisiones de negocio: desde pipelines de datos y predictive modeling hasta agentes de IA y automatización.",
      "Trabajo en producción con Microsoft Fabric, SAP Business One, APIs REST y n8n, y enseño Inteligencia Artificial en el posgrado de la Facultad de Ciencias Económicas (UNLP).",
    ],
    factsLabel: "Datos generales",
    facts: [
      { term: "Ubicación", value: "La Plata, Buenos Aires, Argentina (UTC-3)" },
      { term: "Foco", value: "Machine Learning, fine-tuning de LLMs y agentes de IA" },
      { term: "Idiomas", value: "Español nativo · Inglés avanzado" },
      { term: "Disponibilidad", value: "Abierto a roles y proyectos", live: true },
    ],
    metrics: [
      { value: `+${yearsInData}`, label: "Años en datos e IA" },
      { value: "80%", label: "Reducción en tiempos de información crítica" },
      { value: "UNLP", label: "Docente universitario de IA" },
    ],
  },
  en: {
    index: "01.",
    title: "About me",
    subtitle: "Background, engineering approach and how I work.",
    paragraphs: [
      "I'm an electromechanical engineer specialized in data, machine learning and generative AI. I design end-to-end solutions connecting models to business decisions: from data pipelines and predictive modeling to AI agents and automation.",
      "I work in production with Microsoft Fabric, SAP Business One, REST APIs and n8n, and I teach Artificial Intelligence in the postgraduate program at Facultad de Ciencias Economicas (UNLP).",
    ],
    factsLabel: "General facts",
    facts: [
      { term: "Location", value: "La Plata, Buenos Aires, Argentina (UTC-3)" },
      { term: "Focus", value: "Machine Learning, LLM fine-tuning and AI agents" },
      { term: "Languages", value: "Spanish native · English advanced" },
      { term: "Availability", value: "Open to roles and projects", live: true },
    ],
    metrics: [
      { value: `+${yearsInData}`, label: "Years in data & AI" },
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
      className="py-24 px-6 md:px-12 lg:px-24 max-w-6xl 2xl:max-w-7xl mx-auto"
    >
      <Reveal>
        <SectionHeader index={t.index} title={t.title} subtitle={t.subtitle} />

        <div className="grid lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] gap-10 mb-12">
          <div className="space-y-4">
            {t.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="text-muted-foreground leading-relaxed text-base md:text-lg">
                {p}
              </p>
            ))}
          </div>

          <dl className="border border-border rounded-lg p-6 h-fit">
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-5">
              {t.factsLabel}
            </p>
            <div className="space-y-4">
              {t.facts.map((fact) => (
                <div key={fact.term} className="grid gap-1">
                  <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    {fact.term}
                  </dt>
                  <dd className="text-foreground text-sm flex items-center gap-2">
                    {fact.live ? (
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"
                        aria-hidden="true"
                      />
                    ) : null}
                    {fact.value}
                  </dd>
                </div>
              ))}
            </div>
          </dl>
        </div>
      </Reveal>

      <dl className="grid grid-cols-1 sm:grid-cols-3 gap-6">
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
