import { Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"

const socialLinks = [
  { name: "GitHub", href: "https://github.com/nomdedev", icon: Github },
  { name: "LinkedIn", href: "https://linkedin.com/in/martin-nomdedeu", icon: Linkedin },
  { name: "Email", href: "mailto:martin.nomdedeu.dev@gmail.com", icon: Mail },
]

const quickLinks = [
  { name: "Home", href: "#hero" },
  { name: "Sobre Mí", href: "#about" },
  { name: "Proyectos", href: "#projects" },
  { name: "Experiencia", href: "#experience" },
  { name: "Contacto", href: "#contact" },
]

export function Footer() {
  return (
    <footer className="py-8 px-6 md:px-12 lg:px-24 border-t border-border">
      {/* Quick Links */}
      <div className="flex flex-wrap justify-center gap-6 mb-6">
        {quickLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Mobile Social Links */}
      <div className="flex justify-center gap-6 mb-6 md:hidden">
        {socialLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors duration-300"
            aria-label={link.name}
          >
            <link.icon className="w-5 h-5" />
          </Link>
        ))}
      </div>

      <div className="text-center space-y-2">
        <p className="text-muted-foreground text-sm font-mono">
          Diseñado y desarrollado por Martín Nomdedeu
        </p>
        <p className="text-muted-foreground/60 text-xs">
          © 2025 Martín Nomdedeu. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
