import { Github, Linkedin } from "lucide-react"
import Link from "next/link"

const socialLinks = [
  { name: "GitHub", href: "https://github.com/nomdedev", icon: Github },
  { name: "LinkedIn", href: "https://linkedin.com/in/martin-nomdedeu", icon: Linkedin },
]

export function SideElements() {
  return (
    <>
      {/* Left Side - Social Links */}
      <div className="hidden md:flex fixed left-6 lg:left-12 bottom-0 flex-col items-center gap-6">
        {socialLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary hover:-translate-y-1 transition-all duration-300"
            aria-label={link.name}
          >
            <link.icon className="w-5 h-5" />
          </Link>
        ))}
        <div className="w-px h-24 bg-muted-foreground" />
      </div>

      {/* Right Side - Email */}
      <div className="hidden md:flex fixed right-6 lg:right-12 bottom-0 flex-col items-center gap-6">
        <Link
          href="mailto:martin.nomdedeu@gmail.com"
          className="text-muted-foreground hover:text-primary hover:-translate-y-1 transition-all duration-300 font-mono text-sm"
          style={{ writingMode: "vertical-rl" }}
        >
          martin.nomdedeu@gmail.com
        </Link>
        <div className="w-px h-24 bg-muted-foreground" />
      </div>
    </>
  )
}
