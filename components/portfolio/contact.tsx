"use client"

import { useEffect, useRef, useState } from "react"
import { Mail, Linkedin, Github, MessageCircle } from "lucide-react"
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
        <p className="text-primary font-mono text-sm mb-4">04. Contacto</p>
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
          Hablemos de tu Proyecto
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-12 max-w-lg mx-auto">
          Disponible para oportunidades en FinTech, Logística, Optimización Operativa
        </p>

        {/* Contact Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
          <Link
            href="mailto:martin.nomdedeu@gmail.com"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            <Mail className="w-5 h-5" />
            <span className="text-sm">martin.nomdedeu@gmail.com</span>
          </Link>
          <Link
            href="https://linkedin.com/in/martin-nomdedeu"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            <Linkedin className="w-5 h-5" />
            <span className="text-sm">LinkedIn</span>
          </Link>
          <Link
            href="https://github.com/nomdedev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            <Github className="w-5 h-5" />
            <span className="text-sm">GitHub</span>
          </Link>
          <Link
            href="https://wa.me/542216497571"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm">WhatsApp</span>
          </Link>
        </div>

        {/* Contact Form */}
        <form className="max-w-md mx-auto mb-12 text-left">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-3 bg-background border border-input rounded focus:outline-none focus:border-primary transition-colors duration-300"
              placeholder="Tu nombre"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-3 bg-background border border-input rounded focus:outline-none focus:border-primary transition-colors duration-300"
              placeholder="tu@email.com"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
              Mensaje
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="w-full px-4 py-3 bg-background border border-input rounded focus:outline-none focus:border-primary transition-colors duration-300 resize-none"
              placeholder="Cuéntame sobre tu proyecto..."
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground px-8 py-4 rounded font-mono hover:bg-primary/90 transition-colors duration-300"
          >
            Enviar
          </button>
        </form>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="mailto:martin.nomdedeu@gmail.com"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded font-mono hover:bg-primary/90 transition-colors duration-300"
          >
            <Mail className="w-5 h-5" />
            Enviar Email
          </Link>
          <Link
            href="https://linkedin.com/in/martin-nomdedeu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-primary text-primary px-8 py-4 rounded font-mono hover:bg-primary/10 transition-colors duration-300"
          >
            <Linkedin className="w-5 h-5" />
            Conectar en LinkedIn
          </Link>
        </div>
      </div>
    </section>
  )
}
