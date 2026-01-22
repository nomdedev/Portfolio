"use client"

import { Github, Linkedin, Mail, ArrowDown, Trophy, Zap, Bot } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

const highlights = [
  { icon: Trophy, text: "+300% ROI en proyectos industriales" },
  { icon: Zap, text: "75% reducción tiempo operativo" },
  { icon: Bot, text: "IA aplicada a procesos reales" },
]

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24"
    >
      <div
        className={`max-w-4xl transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="text-primary font-mono text-sm md:text-base mb-4 tracking-wide">
          Hola, soy
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 text-balance">
          Martin Nomdedeu
        </h1>
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-muted-foreground mb-6 text-balance">
          Transformación Digital Industrial & Project Management
        </h2>
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed mb-8">
          Ingeniero Mecánico especializado en la convergencia entre operación industrial y tecnología digital. 
          Desarrollo soluciones que optimizan procesos, automatizan tareas y transforman datos en decisiones estratégicas.
        </p>

        <div className="flex flex-wrap gap-4 mb-8">
          {highlights.map((item) => (
            <div
              key={item.text}
              className="flex items-center gap-2 bg-card/50 border border-border px-4 py-2 rounded-lg"
            >
              <item.icon className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">{item.text}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-6 mb-12">
          <Link
            href="https://github.com/nomdedev/Portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors duration-300"
            aria-label="GitHub"
          >
            <Github className="w-6 h-6" />
          </Link>
          <Link
            href="https://linkedin.com/in/martin-nomdedeu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-6 h-6" />
          </Link>
          <Link
            href="mailto:contacto@martinnomdedeu.com"
            className="text-muted-foreground hover:text-primary transition-colors duration-300"
            aria-label="Email"
          >
            <Mail className="w-6 h-6" />
          </Link>
        </div>

        <div className="flex flex-wrap gap-4">
          <Link
            href="#projects"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded font-mono text-sm hover:bg-primary/90 transition-colors duration-300"
          >
            Ver Proyectos Destacados
          </Link>
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 border border-primary text-primary px-6 py-3 rounded font-mono text-sm hover:bg-primary/10 transition-colors duration-300"
          >
            Hablemos de tu Proyecto
            <ArrowDown className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-muted-foreground" />
      </div>
    </section>
  )
}
