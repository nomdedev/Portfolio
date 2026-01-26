"use client"

import { useEffect, useRef, useState } from "react"
import { Github, ExternalLink, Folder } from "lucide-react"
import Link from "next/link"

const featuredProjects = [
  {
    title: "Portfolio Tracker",
    description:
      "Retail investors & advisors sin visibilidad integral de carteras → Plataforma FinTech con dashboard de inversiones, analytics de performance, alertas automáticas → MVP lanzado con beta users, validación de producto-mercado.",
    image: null,
    tech: ["Python", "APIs REST", "Power BI", "SQL", "Cumplimiento normativo"],
    github: "https://github.com/nomdedev",
    external: "#",
  },
  {
    title: "ERP for SMEs",
    description:
      "PyMEs sin integración de operaciones, inventario y finanzas → Sistema ERP full-stack (inventory, CRM, reporting) desarrollado en Python → 10+ empresas en user research, MVP released iterativamente.",
    image: null,
    tech: ["Python", "Full-Stack", "SQL", "Power BI", "Dashboards"],
    github: "https://github.com/nomdedev",
    external: "#",
  },
  {
    title: "Vecino Simple",
    description:
      "Administradores de consorcios sin herramientas integradas → Plataforma para gestión de expensas, comunicación residente, tickets de soporte → MVP validado con property managers, roadmap en ejecución.",
    image: "/img/vecinosimple/vecinosimple.svg",
    tech: ["Python", "Full-Stack", "APIs"],
    github: "https://github.com/nomdedev",
    external: "#",
  },
  {
    title: "Financial Arbitrage Tools",
    description:
      "Traders sin automatización para detectar oportunidades de arbitraje → Herramientas automáticas de scanning + análisis de trading inefficiencies → Herramientas operacionales para detección en tiempo real.",
    image: null,
    tech: ["Python", "Data Analysis", "APIs financieras"],
    github: "https://github.com/nomdedev",
    external: "#",
  },
]

const otherProjects = []

export function Projects() {
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
      id="projects"
      ref={sectionRef}
      className="py-24 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto"
    >
      <div
        className={`transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <h2 className="flex items-center gap-4 text-2xl md:text-3xl font-bold text-foreground mb-12">
          <span className="text-primary font-mono text-xl">03.</span>
          Proyectos Destacados
          <span className="h-px bg-border flex-1 max-w-xs" />
        </h2>

        {/* Featured Projects - Grid 2 Columnas */}
        <div className="grid md:grid-cols-2 gap-6">
          {featuredProjects.map((project, index) => (
            <div
              key={project.title}
              className={`group bg-card rounded-lg overflow-hidden hover:-translate-y-2 transition-all duration-300 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Project Image */}
              <div className="relative aspect-video bg-secondary overflow-hidden">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary flex items-center justify-center">
                    <Folder className="w-16 h-16 text-primary/40" />
                  </div>
                )}
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-300" />
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
                <ul className="flex flex-wrap gap-2 mb-4 font-mono text-xs text-muted-foreground">
                  {project.tech.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
                <div className="flex gap-4">
                  <Link
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-primary transition-colors"
                    aria-label="Ver código en GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </Link>
                  {project.external && project.external !== "#" && (
                    <Link
                      href={project.external}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-primary transition-colors"
                      aria-label="Ver proyecto en vivo"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
