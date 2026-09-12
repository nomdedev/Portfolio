"use client"

import { Github, Linkedin, Mail, ArrowDown, Download, MapPin } from "lucide-react"
import Link from "next/link"
import { useLanguage, type Lang } from "@/lib/i18n"
import { Reveal } from "@/components/portfolio/reveal"
import { Magnetic } from "@/components/portfolio/motion"

const content: Record<
  Lang,
  {
    greeting: string
    title: string
    positioning: string
    bio: string
    projectsCta: string
    cvCta: string
    contactCta: string
    location: string
    scrollLabel: string
    emailLabel: string
  }
> = {
  es: {
    greeting: "Hola, soy",
    title: "Data Scientist | Machine Learning Engineer | AI & Automation",
    positioning: "Convierto datos y modelos de IA en decisiones de negocio.",
    bio: "Ingeniero electromecánico con +5 años en datos, machine learning, IA generativa y automatización aplicada a negocios. Diseño soluciones end-to-end: data engineering, predictive modeling, fine-tuning de LLMs, agentes de IA y automatización de decisiones.",
    projectsCta: "Ver proyectos",
    cvCta: "Descargar CV",
    contactCta: "Contacto",
    location: "La Plata, Buenos Aires, Argentina",
    scrollLabel: "Desplázate para explorar",
    emailLabel: "Enviar correo a Martin Nomdedeu",
  },
  en: {
    greeting: "Hi, I'm",
    title: "Data Scientist | ML Engineer | AI & Automation",
    positioning: "I turn data and AI models into business decisions.",
    bio: "Electromechanical engineer with 5+ years in data, machine learning, generative AI and business-applied automation. I design end-to-end solutions: data engineering, predictive modeling, LLM fine-tuning, AI agents and decision automation.",
    projectsCta: "View projects",
    cvCta: "Download resume",
    contactCta: "Contact",
    location: "La Plata, Buenos Aires, Argentina",
    scrollLabel: "Scroll to explore",
    emailLabel: "Email Martin Nomdedeu",
  },
}

const CV_URL =
  "https://drive.google.com/file/d/1Gi8OMUOUrH3r_HSuqGlF4Gbxm-by_oM8/view?usp=sharing"

export function Hero() {
  const { lang } = useLanguage()
  const t = content[lang]

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col px-6 md:px-12 lg:px-24 pt-28 pb-16"
    >
      <div className="max-w-4xl m-auto w-full">
        <Reveal>
          <p className="text-primary font-mono text-sm md:text-base mb-4 tracking-wide">
            {t.greeting}
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 text-balance">
            Martin Nomdedeu
          </h1>
          <p className="text-lg md:text-2xl font-semibold text-foreground/90 mb-3">
            {t.title}
          </p>
          <p
            key={lang}
            className="role-enter text-xl md:text-3xl font-bold text-primary mb-6 text-balance"
          >
            {t.positioning}
          </p>
        </Reveal>

        <Reveal delay={120}>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed mb-4">
            {t.bio}
          </p>
          <p className="flex items-center gap-2 font-mono text-sm text-muted-foreground mb-10">
            <MapPin className="w-4 h-4 text-primary" aria-hidden="true" />
            {t.location}
          </p>
        </Reveal>

        <Reveal delay={220}>
          <div className="flex flex-wrap gap-4 mb-12">
            <Magnetic>
              <Link
                href="#projects"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-mono text-sm hover:bg-primary/90 transition-colors duration-300"
              >
                {t.projectsCta}
              </Link>
            </Magnetic>
            <a
              href={CV_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-border text-foreground px-6 py-3 rounded-md font-mono text-sm hover:border-primary hover:text-primary transition-all duration-300 hover:-translate-y-0.5"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              {t.cvCta}
            </a>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 text-muted-foreground px-6 py-3 rounded-md font-mono text-sm hover:text-primary transition-colors duration-300"
            >
              {t.contactCta}
            </Link>
          </div>
        </Reveal>

        <Reveal delay={320}>
          <div className="flex items-center gap-6">
            <Link
              href="https://github.com/nomdedev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary hover:-translate-y-1 transition-all duration-300"
              aria-label="GitHub de Martin Nomdedeu"
            >
              <Github className="w-6 h-6" />
            </Link>
            <Link
              href="https://linkedin.com/in/martin-nomdedeu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary hover:-translate-y-1 transition-all duration-300"
              aria-label="LinkedIn de Martin Nomdedeu"
            >
              <Linkedin className="w-6 h-6" />
            </Link>
            <Link
              href="mailto:martin.nomdedeu.dev@gmail.com"
              className="text-muted-foreground hover:text-primary hover:-translate-y-1 transition-all duration-300"
              aria-label={t.emailLabel}
            >
              <Mail className="w-6 h-6" />
            </Link>
          </div>
        </Reveal>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-muted-foreground" aria-hidden="true" />
        <span className="sr-only">{t.scrollLabel}</span>
      </div>
    </section>
  )
}
