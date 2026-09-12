"use client"

import { Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import { useLanguage, type Lang } from "@/lib/i18n"

const EMAIL = "martin.nomdedeu.dev@gmail.com"

const socialLinks = [
  { name: "GitHub", href: "https://github.com/nomdedev", icon: Github, external: true },
  { name: "LinkedIn", href: "https://linkedin.com/in/martin-nomdedeu", icon: Linkedin, external: true },
  { name: "Email", href: `mailto:${EMAIL}`, icon: Mail, external: false },
]

const quickLinks: Record<Lang, { name: string; href: string }[]> = {
  es: [
    { name: "Sobre mí", href: "/#about" },
    { name: "Proyectos", href: "/#projects" },
    { name: "Experiencia", href: "/#experience" },
    { name: "Docencia", href: "/#teaching" },
    { name: "Contacto", href: "/#contact" },
  ],
  en: [
    { name: "About", href: "/#about" },
    { name: "Projects", href: "/#projects" },
    { name: "Experience", href: "/#experience" },
    { name: "Teaching", href: "/#teaching" },
    { name: "Contact", href: "/#contact" },
  ],
}

const copy: Record<Lang, { credit: string; rights: string }> = {
  es: {
    credit: "Diseñado y desarrollado por Martin Nomdedeu",
    rights: "Todos los derechos reservados.",
  },
  en: {
    credit: "Designed and built by Martin Nomdedeu",
    rights: "All rights reserved.",
  },
}

export function Footer() {
  const { lang } = useLanguage()
  const t = copy[lang]
  const year = new Date().getFullYear()

  return (
    <footer className="py-8 px-6 md:px-12 lg:px-24 border-t border-border">
      <nav aria-label="Secundaria" className="flex flex-wrap justify-center gap-6 mb-6">
        {quickLinks[lang].map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
          >
            {link.name}
          </Link>
        ))}
      </nav>

      {/* Mobile Social Links */}
      <div className="flex justify-center gap-6 mb-6 md:hidden">
        {socialLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="text-muted-foreground hover:text-primary transition-colors duration-300 min-w-[44px] min-h-[44px] grid place-items-center"
            aria-label={link.name}
          >
            <link.icon className="w-5 h-5" />
          </Link>
        ))}
      </div>

      <div className="text-center space-y-2">
        <p className="text-muted-foreground text-sm font-mono">{t.credit}</p>
        <p className="text-muted-foreground text-xs">
          © {year} Martin Nomdedeu. {t.rights}
        </p>
      </div>
    </footer>
  )
}
