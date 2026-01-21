"use client"

import { useEffect, useRef, useState } from "react"

const expertiseAreas = [
  {
    title: "Ingeniería Industrial",
    skills: ["Diseño de Producto", "Optimización de Procesos", "Industria 4.0", "Normas ISO"],
  },
  {
    title: "IA & Machine Learning",
    skills: ["Computer Vision", "NLP", "Análisis Predictivo", "Automatización IA"],
  },
  {
    title: "Full-Stack Development",
    skills: ["Python", "React", "Next.js", "FastAPI", "PostgreSQL"],
  },
  {
    title: "Data Science & BI",
    skills: ["Pandas", "Power BI", "Analytics", "Dashboards"],
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
              Ingeniero Mecánico, Analista de Datos y Project Manager
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Apasionado por la convergencia entre la operación industrial y la tecnología digital. 
              Me especializo en liderar proyectos complejos mediante el desarrollo de software, 
              optimización de procesos y gestión estratégica de equipos multidisciplinarios.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Combino formación técnica en ingeniería con habilidades en{" "}
              <span className="text-primary">Python</span>,{" "}
              <span className="text-primary">Inteligencia Artificial</span>,{" "}
              <span className="text-primary">automatización</span> y metodologías de gestión 
              (PMBOK, Agile, Scrum, Kanban).
            </p>
            <p className="text-muted-foreground leading-relaxed">
              En mi trayectoria profesional, he liderado equipos de hasta{" "}
              <span className="text-primary">60 personas</span> en proyectos de mantenimiento, 
              producción e innovación tecnológica, diseñando herramientas de gestión que 
              transforman datos en decisiones rentables.
            </p>
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
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {expertiseAreas.map((area) => (
            <div
              key={area.title}
              className="bg-card p-6 rounded-lg border border-border hover:border-primary/50 transition-colors"
            >
              <h4 className="text-primary font-semibold mb-4">{area.title}</h4>
              <ul className="space-y-2">
                {area.skills.map((skill) => (
                  <li
                    key={skill}
                    className="flex items-center gap-2 text-muted-foreground text-sm"
                  >
                    <span className="text-primary">▹</span>
                    {skill}
                  </li>
                ))}
              </ul>
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
