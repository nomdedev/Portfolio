"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { Menu, X, Github, Linkedin } from "lucide-react"
import { useLanguage, type Lang } from "@/lib/i18n"

const navItems: Record<Lang, { name: string; href: string }[]> = {
  es: [
    { name: "Sobre Mí", href: "#about" },
    { name: "Proyectos", href: "#projects" },
    { name: "Experiencia", href: "#experience" },
    { name: "Docencia", href: "#teaching" },
    { name: "Contacto", href: "#contact" },
  ],
  en: [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Teaching", href: "#teaching" },
    { name: "Contact", href: "#contact" },
  ],
}

const labels: Record<Lang, { openMenu: string; closeMenu: string; language: string }> = {
  es: { openMenu: "Abrir menú", closeMenu: "Cerrar menú", language: "Idioma" },
  en: { openMenu: "Open menu", closeMenu: "Close menu", language: "Language" },
}

function LanguageToggle() {
  const { lang, setLang } = useLanguage()
  return (
    <div
      className="flex items-center rounded-full border border-border p-0.5 font-mono text-xs"
      role="group"
      aria-label={labels[lang].language}
    >
      {(["es", "en"] as Lang[]).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`rounded-full px-2.5 py-1 uppercase transition-colors duration-300 ${
            lang === l
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-primary"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  )
}

export function Navigation() {
  const { lang } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("#hero")
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame = 0
    const paint = () => {
      frame = 0
      const y = window.scrollY
      setIsScrolled(y > 50)
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`
      }
    }
    const handleScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(paint)
    }
    paint()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  // Scrollspy: resalta la sección visible
  useEffect(() => {
    const ids = ["hero", "about", "projects", "experience", "teaching", "contact"]
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(`#${entry.target.id}`)
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isMobileMenuOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false)
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [isMobileMenuOpen])

  const items = navItems[lang]
  const t = labels[lang]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav aria-label="Principal" className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="#hero"
            className="text-primary font-bold text-xl hover:text-primary/80 transition-colors"
          >
            Martin Nomdedeu
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {items.map((item, index) => {
              const active = activeSection === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "location" : undefined}
                    className={`transition-colors duration-300 font-mono text-sm ${
                      active ? "text-primary" : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    <span className="text-primary">0{index + 1}.</span> {item.name}
                  </Link>
                </li>
              )
            })}
            <li className="flex items-center gap-4 ml-4">
              <a
                href="https://github.com/nomdedev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
                aria-label="GitHub de Martin Nomdedeu"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/martin-nomdedeu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
                aria-label="LinkedIn de Martin Nomdedeu"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <LanguageToggle />
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <LanguageToggle />
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-primary p-2 min-w-[44px] min-h-[44px] grid place-items-center"
              aria-label={isMobileMenuOpen ? t.closeMenu : t.openMenu}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border"
          >
            <ul className="flex flex-col items-center py-8 gap-6">
              {items.map((item, index) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 font-mono text-base"
                  >
                    <span className="text-primary">0{index + 1}.</span>{" "}
                    {item.name}
                  </Link>
                </li>
              ))}
              <li className="flex items-center gap-6 mt-2">
                <a
                  href="https://github.com/nomdedev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 min-w-[44px] min-h-[44px] grid place-items-center"
                  aria-label="GitHub de Martin Nomdedeu"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href="https://linkedin.com/in/martin-nomdedeu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 min-w-[44px] min-h-[44px] grid place-items-center"
                  aria-label="LinkedIn de Martin Nomdedeu"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>
      {/* Barra de progreso de scroll */}
      <div
        ref={progressRef}
        aria-hidden="true"
        className="h-px origin-left scale-x-0 bg-primary"
      />
    </header>
  )
}
