"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X, Github, Linkedin } from "lucide-react"

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "Sobre Mí", href: "#about" },
  { name: "Proyectos", href: "#projects" },
  { name: "Skills", href: "#about" },
  { name: "Experiencia", href: "#experience" },
  { name: "Contacto", href: "#contact" },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="#hero"
            className="text-primary font-bold text-xl hover:text-primary/80 transition-colors"
          >
            Martín Nomdedeu
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 font-mono text-sm"
                >
                  <span className="text-primary">0{index + 1}.</span> {item.name}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-primary text-primary px-4 py-2 rounded font-mono text-sm hover:bg-primary/10 transition-colors duration-300"
              >
                Descargar CV
              </a>
            </li>
            <li className="flex items-center gap-4 ml-4">
              <a
                href="https://github.com/nomdedev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/martin-nomdedeu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-primary p-2"
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border">
            <ul className="flex flex-col items-center py-8 gap-6">
              {navItems.map((item, index) => (
                <li key={item.name}>
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
              <li>
                <a
                  href="/cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-primary text-primary px-6 py-3 rounded font-mono text-sm hover:bg-primary/10 transition-colors duration-300"
                >
                  Descargar CV
                </a>
              </li>
              <li className="flex items-center gap-6 mt-2">
                <a
                  href="https://github.com/nomdedev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  aria-label="GitHub"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href="https://linkedin.com/in/martin-nomdedeu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  )
}
