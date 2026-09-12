"use client"

import { useLanguage, type Lang } from "@/lib/i18n"
import { Reveal } from "@/components/portfolio/reveal"

type Experience = {
  title: string
  company: string
  dateEs: string
  dateEn: string
  descriptionEs: string
  descriptionEn: string
  skills: string[]
}

const experiences: Experience[] = [
  {
    title: "Data Scientist · IA & Automatización",
    company: "Sumed",
    dateEs: "2026 — Presente",
    dateEn: "2026 — Present",
    descriptionEs:
      "Soluciones de IA y datos en producción: bots conversacionales integrados a SAP, app de cotizaciones con ML + GenAI y arquitectura de datos en Microsoft Fabric.",
    descriptionEn:
      "Production AI and data solutions: conversational bots integrated with SAP, quoting app with ML + GenAI and data architecture on Microsoft Fabric.",
    skills: ["LLMs", "n8n", "Microsoft Fabric", "SAP Business One", "Python"],
  },
  {
    title: "Coordinador General de Producción & Tecnología",
    company: "MPS",
    dateEs: "2023 — 2025",
    dateEn: "2023 — 2025",
    descriptionEs:
      "Lideré la transformación digital para 60+ personas. Resultados: cycle time −70%, eficiencia +25% y KPIs en Power BI.",
    descriptionEn:
      "Led digital transformation for 60+ people. Results: cycle time −70%, efficiency +25% and KPIs in Power BI.",
    skills: ["Digital Transformation", "Power BI", "KPIs", "Lean", "Leadership"],
  },
  {
    title: "Jefe de Mantenimiento",
    company: "Nueve de Julio SAT",
    dateEs: "2021 — 2023",
    dateEn: "2021 — 2023",
    descriptionEs:
      "Reorganización completa de almacén con 5S + digitalización. Implementación de Lean Manufacturing y auditorías ISO/IRAM.",
    descriptionEn:
      "Full warehouse reorganization with 5S + digitization. Lean Manufacturing implementation and ISO/IRAM audits.",
    skills: ["Lean Manufacturing", "5S", "ISO", "IRAM"],
  },
  {
    title: "Project Analyst",
    company: "Centro Tecnológico Aeroespacial (CTA)",
    dateEs: "2019 — 2023",
    dateEn: "2019 — 2023",
    descriptionEs:
      "Primer colectivo eléctrico funcional de Argentina. Coordinación UNLP–CTA–Nueve de Julio e integración técnica completa.",
    descriptionEn:
      "Argentina's first functional electric bus. UNLP–CTA–Nueve de Julio coordination and full technical integration.",
    skills: ["Project Management", "R&D", "Innovation"],
  },
]

const copy: Record<Lang, { index: string; title: string }> = {
  es: { index: "03.", title: "Experiencia" },
  en: { index: "03.", title: "Experience" },
}

export function Experience() {
  const { lang } = useLanguage()
  const t = copy[lang]

  return (
    <section
      id="experience"
      className="py-24 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto"
    >
      <Reveal>
        <h2 className="flex items-center gap-4 text-2xl md:text-3xl font-bold text-foreground mb-12">
          <span className="text-primary font-mono text-xl">{t.index}</span>
          {t.title}
          <span className="h-px bg-border flex-1 max-w-xs" />
        </h2>
      </Reveal>

      <ol className="relative ml-2 md:ml-4 border-l border-border space-y-10">
        {experiences.map((exp, index) => (
          <Reveal key={`${exp.company}-${exp.title}`} delay={Math.min(index, 3) * 80}>
            <li className="relative pl-8 md:pl-10">
              <span
                aria-hidden="true"
                className="absolute -left-[37px] md:-left-[45px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-primary/15"
              />
              <p className="font-mono text-sm text-primary mb-1">
                {lang === "es" ? exp.dateEs : exp.dateEn}
              </p>
              <h3 className="text-lg font-semibold text-foreground mb-1">
                {exp.title} · <span className="text-muted-foreground">{exp.company}</span>
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4 max-w-2xl">
                {lang === "es" ? exp.descriptionEs : exp.descriptionEn}
              </p>
              <ul className="flex flex-wrap gap-2">
                {exp.skills.map((skill) => (
                  <li
                    key={skill}
                    className="font-mono text-xs px-3 py-1 rounded-full bg-primary/10 text-primary"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}
