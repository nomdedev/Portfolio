"use client"

import { useEffect, useRef, useState } from "react"
import { ExternalLink } from "lucide-react"
import Link from "next/link"

const experiences = [
  {
    title: "Founder & Product Lead",
    company: "FinTech Products",
    companyUrl: "https://linkedin.com/in/martin-nomdedeu",
    date: "2025 — Presente",
    description:
      "Desarrollé múltiples productos B2C desde discovery hasta MVP. Proyectos: Portfolio Tracker, ERP, Arbitrajes, Vecino Simple.",
    skills: ["Product Discovery", "MVP", "B2C", "FinTech", "Strategy"],
  },
  {
    title: "Coordinador General Producción & Tecnología",
    company: "MPS",
    companyUrl: "https://linkedin.com/in/martin-nomdedeu",
    date: "2023 — 2025",
    description:
      "Lideré transformación digital para 60+ personas. Resultados: Cycle time ↓70%, Eficiencia ↑25%, KPIs en Power BI.",
    skills: ["Digital Transformation", "Power BI", "KPIs", "Lean", "Leadership"],
  },
  {
    title: "Project Analyst",
    company: "Centro Tecnológico Aeroespacial (CTA)",
    companyUrl: "https://linkedin.com/in/martin-nomdedeu",
    date: "2019 — 2023",
    description:
      "Primer colectivo eléctrico funcional de Argentina. Coordinación UNLP-CTA-Nueve de Julio, integración técnica completa.",
    skills: ["Project Management", "Aeroespacial", "Coordinación", "Innovación", "R&D"],
  },
  {
    title: "Jefe de Mantenimiento",
    company: "Nueve de Julio SAT",
    companyUrl: "https://linkedin.com/in/martin-nomdedeu",
    date: "2022 — 2023",
    description:
      "Reorganización completa de almacén con 5S + digitalización. Implementación Lean Manufacturing, auditorías ISO/IRAM.",
    skills: ["Lean Manufacturing", "5S", "ISO", "IRAM", "Gestión"],
  },
]

export function Experience() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-24 px-6 md:px-12 lg:px-24 max-w-4xl mx-auto"
    >
      <div
        className={`transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <h2 className="flex items-center gap-4 text-2xl md:text-3xl font-bold text-foreground mb-12">
          <span className="text-primary font-mono text-xl">02.</span>
          Experiencia
          <span className="h-px bg-border flex-1 max-w-xs" />
        </h2>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div
              key={exp.company}
              className={`group relative grid md:grid-cols-[200px_1fr] gap-4 p-6 rounded-lg hover:bg-card/50 transition-all duration-300 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-muted-foreground font-mono text-sm">
                {exp.date}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {exp.title} ·{" "}
                  <Link
                    href={exp.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary inline-flex items-center gap-1 hover:underline"
                  >
                    {exp.company}
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {exp.description}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {exp.skills.map((skill) => (
                    <li
                      key={skill}
                      className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-mono"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
