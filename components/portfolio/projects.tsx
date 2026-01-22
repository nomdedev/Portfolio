"use client"

import { useEffect, useRef, useState } from "react"
import { Github, ExternalLink, Folder } from "lucide-react"
import Link from "next/link"

const featuredProjects = [
  {
    title: "Rexus.app - Plataforma SaaS",
    description:
      "Plataforma web completa para gestión empresarial con autenticación, dashboards interactivos, análisis de datos en tiempo real y reportes automatizados. Arquitectura escalable con Python backend.",
    image: "/img/Rexxus/rexus.svg",
    tech: ["Python", "FastAPI", "React", "PostgreSQL", "Docker"],
    github: "https://github.com/nomdedev/Rexus.app",
    external: "https://rexus.app",
  },
  {
    title: "Vecino Simple - Gestión de Consorcios",
    description:
      "Sistema integral para administración de consorcios con 80% de mejora en comunicación. Gestión de expensas, reclamos, reservas de amenities y comunicación entre vecinos.",
    image: "/img/vecinosimple/vecinosimple.svg",
    tech: ["Next.js", "Supabase", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/nomdedev",
    external: "#",
  },
  {
    title: "Tanques Solares - Ingeniería Industrial",
    description:
      "Diseño completo de producto para tanques de agua con calentamiento solar. Desde conceptualización hasta fabricación, incluyendo documentación técnica y normas ISO.",
    image: "/img/tsolares/tsolares.svg",
    tech: ["CAD 3D", "SolidWorks", "Ingeniería Mecánica", "Normas ISO"],
    github: "#",
    external: "https://drive.google.com",
  },
]

const otherProjects = [
  {
    title: "ArbitrageAR-USDT",
    description:
      "Extensión Chrome para arbitraje Dólar Oficial USDT en Argentina con UI/UX moderna y actualizaciones en tiempo real.",
    tech: ["JavaScript", "Chrome API", "REST APIs"],
    github: "https://github.com/nomdedev/ArbitrageAR-USDT",
    external: "#",
  },
  {
    title: "IFVG Trading Strategy",
    description:
      "Sistema de análisis técnico y estrategias de trading automatizado con indicadores personalizados.",
    tech: ["Python", "Pandas", "Technical Analysis"],
    github: "https://github.com/nomdedev/IFVG-Trading-Strategy",
  },
  {
    title: "Trading IA",
    description:
      "Plataforma de trading con inteligencia artificial para análisis predictivo y automatización de operaciones.",
    tech: ["Python", "TensorFlow", "FastAPI", "ML"],
    github: "https://github.com/nomdedev/tradingIA",
  },
  {
    title: "Máquina Cosechadora",
    description:
      "Diseño mecánico de máquina cosechadora industrial siguiendo normas ISO y estándares de calidad.",
    tech: ["CAD", "Ingeniería Mecánica", "Normas ISO"],
    github: "#",
    external: "https://drive.google.com",
  },
  {
    title: "Tanque de Gas Industrial",
    description:
      "Diseño y documentación técnica de tanque industrial para almacenamiento de gas con certificaciones de seguridad.",
    tech: ["CAD 3D", "Ingeniería Industrial", "Seguridad"],
    github: "#",
    external: "https://drive.google.com",
  },
  {
    title: "Dashboard Power BI",
    description:
      "Dashboards interactivos para toma de decisiones basada en datos con KPIs y métricas de negocio.",
    tech: ["Power BI", "SQL", "DAX", "Analytics"],
    github: "#",
  },
]

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

        {/* Featured Projects */}
        <div className="space-y-24 mb-24">
          {featuredProjects.map((project, index) => (
            <div
              key={project.title}
              className={`relative grid md:grid-cols-12 gap-4 items-center ${
                index % 2 === 0 ? "" : "md:text-right"
              }`}
            >
              {/* Project Image */}
              <div
                className={`md:col-span-7 relative aspect-video rounded-lg overflow-hidden bg-secondary group ${
                  index % 2 === 0
                    ? "md:col-start-1"
                    : "md:col-start-6 md:row-start-1"
                }`}
              >
                <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-300" />
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary flex items-center justify-center">
                  <Folder className="w-16 h-16 text-primary/40" />
                </div>
              </div>

              {/* Project Info */}
              <div
                className={`md:col-span-6 md:row-start-1 relative z-10 ${
                  index % 2 === 0
                    ? "md:col-start-6 md:text-right"
                    : "md:col-start-1 md:text-left"
                }`}
              >
                <p className="text-primary font-mono text-sm mb-2">
                  Proyecto Destacado
                </p>
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                  {project.title}
                </h3>
                <div className="bg-card p-6 rounded-lg shadow-lg mb-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>
                <ul
                  className={`flex flex-wrap gap-3 mb-4 font-mono text-sm text-muted-foreground ${
                    index % 2 === 0 ? "md:justify-end" : "md:justify-start"
                  }`}
                >
                  {project.tech.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
                <div
                  className={`flex gap-4 ${
                    index % 2 === 0 ? "md:justify-end" : "md:justify-start"
                  }`}
                >
                  <Link
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-primary transition-colors"
                    aria-label="Ver código en GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </Link>
                  <Link
                    href={project.external}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-primary transition-colors"
                    aria-label="Ver proyecto en vivo"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other Projects */}
        <h3 className="text-xl md:text-2xl font-bold text-foreground text-center mb-12">
          Otros Proyectos
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {otherProjects.map((project, index) => (
            <div
              key={project.title}
              className={`group bg-card p-6 rounded-lg hover:-translate-y-2 transition-all duration-300 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-6">
                <Folder className="w-10 h-10 text-primary" />
                <div className="flex gap-4">
                  {project.github && (
                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label="Ver código en GitHub"
                    >
                      <Github className="w-5 h-5" />
                    </Link>
                  )}
                  {project.external && (
                    <Link
                      href={project.external}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label="Ver proyecto en vivo"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </Link>
                  )}
                </div>
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {project.title}
              </h4>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {project.description}
              </p>
              <ul className="flex flex-wrap gap-2 font-mono text-xs text-muted-foreground">
                {project.tech.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
