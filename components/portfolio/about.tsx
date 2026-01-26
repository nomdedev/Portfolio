"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Download } from "lucide-react"

const expertiseAreas = [
  {
    title: "PRODUCTO & ESTRATEGÍA",
    skills: ["Product Vision", "Roadmap", "Product-Market Fit", "Market Analysis", "GTM", "Discovery", "User Research", "MVP"],
  },
  {
    title: "OPERACIONES",
    skills: ["Lean Manufacturing", "Six Sigma", "5S", "PDCA", "Kaizen", "Process Optimization", "Continuous Improvement"],
  },
  {
    title: "LIDERAZGO",
    skills: ["Agile/Scrum", "Kanban", "Team Leadership (60+ personas)", "Stakeholder Alignment", "Cross-Functional Coordination"],
  },
  {
    title: "DATOS & ANALÍTICA",
    skills: ["OKRs/KPIs", "Power BI", "Excel Avanzado", "SQL", "Python", "Data-Driven Decision Making", "Product Analytics"],
  },
  {
    title: "TÉCNICO",
    skills: ["Python", "Full-Stack", "APIs REST", "WMS/ERP", "Jira", "Confluence", "Electrical/Mechanical Systems"],
  },
  {
    title: "CUMPLIMIENTO",
    skills: ["ISO 9001", "ISO 14001", "IRAM 3810", "Safety Standards", "Quality Management"],
  },
]

const metrics = [
  { value: "200+", label: "Profesionales Formados en IA" },
  { value: "60%", label: "Reducción Tiempo Gestión" },
  { value: "13", label: "Proyectos Completados" },
  { value: "4+", label: "Años Experiencia Industrial" },
]

export function About() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

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
          <span className="text-primary font-mono text-xl">01.</span>
          Sobre mí
          <span className="h-px bg-border flex-1 max-w-xs" />
        </h2>

        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Ingeniero Electromecánico
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Ingeniero electromecánico con expertise en transformación digital, gestión de producto, liderazgo técnico y optimización operativa. Experiencia definiendo estrategias end-to-end, liderando equipos (60+ personas), análisis data-driven (Power BI, SQL, Python) y entrega de proyectos complejos. Especialista en convertir desafíos operativos en soluciones medibles (Lean, Six Sigma, Agile).
            </p>
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="text-primary">✉️</span>
                <a href="mailto:martin.nomdedeu.dev@gmail.com" className="hover:text-primary transition-colors">
                  martin.nomdedeu.dev@gmail.com
                </a>
              </div>
              <div className="pt-4">
                <a
                  href="https://drive.google.com/file/d/1Gi8OMUOUrH3r_HSuqGlF4Gbxm-by_oM8/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  <Download className="w-4 h-4" />
                  Ver CV
                </a>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="relative w-full aspect-square max-w-[280px] mx-auto">
              <div className="absolute inset-0 bg-primary/20 rounded transition-transform duration-300 group-hover:translate-x-2 group-hover:translate-y-2" />
              <div className="absolute inset-0 border-2 border-primary rounded translate-x-4 translate-y-4 transition-transform duration-300 group-hover:translate-x-2 group-hover:translate-y-2" />
              <div className="relative w-full h-full bg-secondary rounded overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-primary/30 to-secondary flex items-center justify-center">
                  <span className="text-6xl font-bold text-primary/50">MN</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Expertise Areas */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {expertiseAreas.map((area) => (
            <div
              key={area.title}
              className="bg-card p-6 rounded-lg border border-border hover:border-primary/50 transition-colors"
            >
              <h4 className="text-primary font-semibold mb-4 text-sm">{area.title}</h4>
              <div className="flex flex-wrap gap-2">
                {area.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full hover:bg-primary/20 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {metrics.map((metric) => (
            <div key={metric.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {metric.value}
              </div>
              <div className="text-sm text-muted-foreground">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
