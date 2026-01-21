"use client"

import { useEffect, useRef, useState } from "react"
import { ExternalLink } from "lucide-react"
import Link from "next/link"

const experiences = [
  {
    title: "Product Owner & Project Manager",
    company: "Transformación Digital Industrial",
    companyUrl: "https://linkedin.com/in/martin-nomdedeu",
    date: "2022 — Presente",
    description:
      "Liderazgo de proyectos de transformación digital con enfoque data-driven. Convertir necesidades de negocio y usuarios en entregables claros (user stories, criterios de aceptación). Gestión de equipos multidisciplinarios de hasta 60 personas.",
    skills: ["PMBOK", "Agile", "Scrum", "Kanban", "Power BI"],
  },
  {
    title: "Ingeniero Mecánico Senior",
    company: "Industria 4.0",
    companyUrl: "https://linkedin.com/in/martin-nomdedeu",
    date: "2020 — 2022",
    description:
      "Diseño de producto y manufactura, optimización de procesos industriales. Implementación de soluciones de automatización que lograron 75% de reducción en tiempo operativo y +300% ROI en proyectos industriales.",
    skills: ["CAD 3D", "SolidWorks", "Normas ISO", "Automatización"],
  },
  {
    title: "Desarrollador Full-Stack & IA",
    company: "Proyectos Independientes",
    companyUrl: "https://github.com/nomdedev",
    date: "2021 — Presente",
    description:
      "Desarrollo de aplicaciones web, APIs y sistemas con Python, JavaScript. Implementación de soluciones de Machine Learning y Computer Vision. Formación de +200 profesionales en IA aplicada.",
    skills: ["Python", "FastAPI", "React", "TensorFlow", "PostgreSQL"],
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
