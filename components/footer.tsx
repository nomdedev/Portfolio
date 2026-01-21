import { Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"

const socialLinks = [
  { name: "GitHub", href: "https://github.com/nomdedev", icon: Github },
  { name: "LinkedIn", href: "https://linkedin.com/in/martin-nomdedeu", icon: Linkedin },
  { name: "Email", href: "mailto:contacto@martinnomdedeu.com", icon: Mail },
]

export function Footer() {
  return (
    <footer className="py-8 px-6 md:px-12 lg:px-24 border-t border-border">
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
          Diseñado y desarrollado por{" "}
          <Link
            href="https://github.com/nomdedev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Martin Nomdedeu
          </Link>
        </p>
        <p className="text-muted-foreground/60 text-xs">
          Copyright 2024 Martin Nomdedeu. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
