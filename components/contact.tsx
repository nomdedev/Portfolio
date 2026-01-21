"use client"

import { useEffect, useRef, useState } from "react"
import { Mail } from "lucide-react"
import Link from "next/link"

export function Contact() {
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
      id="contact"
      ref={sectionRef}
      className="py-24 px-6 md:px-12 lg:px-24 max-w-2xl mx-auto text-center"
    >
      <div
        className={`transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <p className="text-primary font-mono text-sm mb-4">04. ¿Qué sigue?</p>
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
          Hablemos de tu Proyecto
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-12 max-w-lg mx-auto">
          ¿Interesado en trabajar juntos? Ya sea que tengas un proyecto de 
          transformación digital, necesites optimizar procesos industriales o 
          quieras desarrollar una solución de software personalizada, estoy aquí 
          para ayudarte. ¡Respondo en menos de 24 horas!
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="https://linkedin.com/in/martin-nomdedeu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded font-mono hover:bg-primary/90 transition-colors duration-300"
          >
            Conectar en LinkedIn
          </Link>
          <Link
            href="mailto:contacto@martinnomdedeu.com"
            className="inline-flex items-center gap-2 border border-primary text-primary px-8 py-4 rounded font-mono hover:bg-primary/10 transition-colors duration-300"
          >
            <Mail className="w-5 h-5" />
            Enviar Email
          </Link>
        </div>
      </div>
    </section>
  )
}
