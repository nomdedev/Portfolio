"use client"

import { Navigation } from "@/components/portfolio/navigation"
import { Hero } from "@/components/portfolio/hero"
import { About } from "@/components/portfolio/about"
import { Projects } from "@/components/portfolio/projects"
import { Experience } from "@/components/portfolio/experience"
import { Teaching } from "@/components/portfolio/teaching"
import { Skills } from "@/components/portfolio/skills"
import { Contact } from "@/components/portfolio/contact"
import { Footer } from "@/components/portfolio/footer"
import { SideElements } from "@/components/portfolio/side-elements"
import { LanguageProvider } from "@/lib/i18n"

export default function HomePage() {
  return (
    <LanguageProvider>
      <main className="min-h-screen bg-background">
        <Navigation />
        <SideElements />
        <Hero />
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
