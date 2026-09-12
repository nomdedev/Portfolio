import { Github, Linkedin } from "lucide-react"
import Link from "next/link"

const socialLinks = [
  { name: "GitHub", href: "https://github.com/nomdedev", icon: Github },
  { name: "LinkedIn", href: "https://linkedin.com/in/martin-nomdedeu", icon: Linkedin },
]

export function SideElements() {
  return (
    <>
      {/* Left Side - Social Links — desde lg: entre 768 y 1023 el riel (24→68)
          pisaba el contenido, que arranca en 48. A 1024 el contenido arranca en
          96 y con offset 24px quedan 28px de aire (antes 4px con left-12). */}
      <div
        data-rail="left"
        className="hidden lg:flex fixed left-6 bottom-0 flex-col items-center gap-6"
      >
        {socialLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary hover:-translate-y-1 transition-[transform,color] duration-300 min-w-[44px] min-h-[44px] grid place-items-center"
            aria-label={`${link.name} de Martin Nomdedeu`}
          >
            <link.icon className="w-5 h-5" />
          </Link>
        ))}
        <div className="w-px h-24 bg-muted-foreground" aria-hidden="true" />
      </div>

      {/* Right Side - Email — misma regla que el riel izquierdo (desde lg). */}
      <div
        data-rail="right"
        className="hidden lg:flex fixed right-6 bottom-0 flex-col items-center gap-6"
      >
        <Link
          href="mailto:martin.nomdedeu.dev@gmail.com"
          aria-label="Enviar correo a Martin Nomdedeu"
          className="text-muted-foreground hover:text-primary hover:-translate-y-1 transition-[transform,color] duration-300 font-mono text-sm [writing-mode:vertical-rl]"
        >
          martin.nomdedeu.dev@gmail.com
        </Link>
        <div className="w-px h-24 bg-muted-foreground" aria-hidden="true" />
      </div>
    </>
  )
}
