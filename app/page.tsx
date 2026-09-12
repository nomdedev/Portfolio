"use client"

import { Navigation } from "@/components/portfolio/navigation"
import { Hero } from "@/components/portfolio/hero"
import { About } from "@/components/portfolio/about"
import { Projects } from "@/components/portfolio/projects"
import { Experience } from "@/components/portfolio/experience"
import { Teaching } from "@/components/portfolio/teaching"
import { Skills } from "@/components/portfolio/skills"
import { Ticker } from "@/components/portfolio/ticker"
import { Contact } from "@/components/portfolio/contact"
import { Footer } from "@/components/portfolio/footer"
import { SideElements } from "@/components/portfolio/side-elements"
import { LanguageProvider } from "@/lib/i18n"

export default function HomePage() {
  return (
    <LanguageProvider>
      {/* Fondo transparente a propósito: la capa `AnimatedBackground` (fixed, -z-10)
          se pinta DEBAJO de los fondos de bloques en flujo. Cualquier `bg-background`
          acá taparía el fondo animado por completo. */}
      <main className="min-h-svh">
        <Navigation />
        <SideElements />
        <Hero />
        <Ticker />
        <About />
        <Projects />
        <Experience />
        <Teaching />
        <Skills />
        <Contact />
        <Footer />
      </main>
    </LanguageProvider>
  )
}
