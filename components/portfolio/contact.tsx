"use client"

import { Mail, Linkedin, Github } from "lucide-react"
import Link from "next/link"
import { useLanguage, type Lang } from "@/lib/i18n"
import { Reveal } from "@/components/portfolio/reveal"
import { Magnetic } from "@/components/portfolio/motion"

const EMAIL = "martin.nomdedeu.dev@gmail.com"

const copy: Record<
  Lang,
  {
    index: string
    title: string
    subtitle: string
    emailCta: string
    githubCta: string
    linkedinCta: string
  }
> = {
  es: {
    index: "06. Contacto",
    title: "Hablemos de tu proyecto",
    subtitle:
      "Disponible para roles y proyectos en Data Science, Machine Learning, IA aplicada y automatización.",
    emailCta: "Enviar email",
    githubCta: "GitHub",
    linkedinCta: "LinkedIn",
  },
  en: {
    index: "06. Contact",
    title: "Let's talk about your project",
    subtitle:
      "Available for roles and projects in Data Science, Machine Learning, applied AI and automation.",
    emailCta: "Send email",
    githubCta: "GitHub",
    linkedinCta: "LinkedIn",
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
        <p className="text-primary font-mono text-sm uppercase tracking-wider mb-4">
          {t.index}
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
          {t.title}
        </h2>
        <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto mb-12">
          {t.subtitle}
        </p>
      </Reveal>

      {/* Un único CTA sólido: el acento esmeralda marca acción, no decora (DESIGN.md §2) */}
      <Reveal delay={120}>
        <div className="flex justify-center mb-6">
          <Magnetic>
            <Link
              href={`mailto:${EMAIL}`}
              className="inline-flex min-h-[44px] items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-md font-mono text-sm hover:bg-primary/90 transition-colors duration-300"
            >
              <Mail className="w-5 h-5" aria-hidden="true" />
              {t.emailCta}
            </Link>
          </Magnetic>
        </div>
        <p className="mb-12">
          <Link
            href={`mailto:${EMAIL}`}
            className="inline-flex min-h-[44px] items-center font-mono text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            {EMAIL}
          </Link>
        </p>
      </Reveal>

      <Reveal delay={220}>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          <Link
            href="https://github.com/nomdedev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            <Github className="w-5 h-5" aria-hidden="true" />
            {t.githubCta}
          </Link>
          <Link
            href="https://linkedin.com/in/martin-nomdedeu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            <Linkedin className="w-5 h-5" aria-hidden="true" />
            {t.linkedinCta}
          </Link>
        </div>
      </Reveal>
    </section>
  )
}
