"use client"

import { Mail, Linkedin, Github, Phone } from "lucide-react"
import Link from "next/link"
import { useLanguage, type Lang } from "@/lib/i18n"
import { Reveal } from "@/components/portfolio/reveal"

const EMAIL = "martin.nomdedeu@gmail.com"
const PHONE_DISPLAY = "***REMOVED***"
const WHATSAPP_URL = "https://wa.me/***REMOVED***"

const copy: Record<
  Lang,
  {
    index: string
    title: string
    subtitle: string
    emailCta: string
    linkedinCta: string
    whatsappCta: string
  }
> = {
  es: {
    index: "06. Contacto",
    title: "Hablemos de tu proyecto",
    subtitle:
      "Disponible para roles y proyectos en Data Science, Machine Learning, IA aplicada y automatización.",
    emailCta: "Enviar email",
    linkedinCta: "Conectar en LinkedIn",
    whatsappCta: "WhatsApp",
  },
  en: {
    index: "06. Contact",
    title: "Let's talk about your project",
    subtitle:
      "Available for roles and projects in Data Science, Machine Learning, applied AI and automation.",
    emailCta: "Send email",
    linkedinCta: "Connect on LinkedIn",
    whatsappCta: "WhatsApp",
  },
}

export function Contact() {
  const { lang } = useLanguage()
  const t = copy[lang]

  return (
    <section
      id="contact"
      className="py-24 px-6 md:px-12 lg:px-24 max-w-2xl mx-auto text-center"
    >
      <Reveal>
        <p className="text-primary font-mono text-sm mb-4">{t.index}</p>
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
          {t.title}
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-12 max-w-lg mx-auto">
          {t.subtitle}
        </p>
      </Reveal>

      <Reveal delay={120}>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 mb-12">
          <Link
            href={`mailto:${EMAIL}`}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            <Mail className="w-5 h-5" aria-hidden="true" />
            <span className="text-sm">{EMAIL}</span>
          </Link>
          <Link
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            <Phone className="w-5 h-5" aria-hidden="true" />
            <span className="text-sm">{PHONE_DISPLAY}</span>
          </Link>
          <Link
            href="https://linkedin.com/in/martin-nomdedeu"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            <Linkedin className="w-5 h-5" aria-hidden="true" />
            <span className="text-sm">LinkedIn</span>
          </Link>
          <Link
            href="https://github.com/nomdedev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            <Github className="w-5 h-5" aria-hidden="true" />
            <span className="text-sm">GitHub</span>
          </Link>
        </div>
      </Reveal>

      <Reveal delay={220}>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-md font-mono text-sm hover:bg-primary/90 hover:-translate-y-0.5 transition-all duration-300"
          >
            <Mail className="w-5 h-5" aria-hidden="true" />
            {t.emailCta}
          </Link>
          <Link
            href="https://linkedin.com/in/martin-nomdedeu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-primary text-primary px-8 py-4 rounded-md font-mono text-sm hover:bg-primary/10 hover:-translate-y-0.5 transition-all duration-300"
          >
            <Linkedin className="w-5 h-5" aria-hidden="true" />
            {t.linkedinCta}
          </Link>
          <Link
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-border text-muted-foreground px-8 py-4 rounded-md font-mono text-sm hover:border-primary hover:text-primary hover:-translate-y-0.5 transition-all duration-300"
          >
            <Phone className="w-5 h-5" aria-hidden="true" />
            {t.whatsappCta}
          </Link>
        </div>
      </Reveal>
    </section>
  )
}
