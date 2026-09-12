"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Cpu,
  ExternalLink,
  Github,
  ListOrdered,
  Lock,
  Sparkles,
} from "lucide-react"
import { categoryLabel } from "@/lib/categories"
import type { Project, ProjectImage } from "@/lib/projects"
import { ProjectGallery } from "@/components/portfolio/project-gallery"
import { Reveal } from "@/components/portfolio/reveal"
import { useLanguage, type Lang } from "@/lib/i18n"

const copy: Record<
  Lang,
  {
    back: string
    overview: string
    howItWorks: string
    features: string
    stackTitle: string
    categoryTitle: string
    linksTitle: string
    viewCode: string
    liveDemo: string
    privateNote: string
    prev: string
    next: string
    moreProjects: string
    tocTitle: string
    galleryLabel: string
  }
> = {
  es: {
    back: "Volver a proyectos",
    overview: "Qué hace",
    howItWorks: "Cómo funciona",
    features: "Qué incluye",
    stackTitle: "Tecnologías",
    categoryTitle: "Categoría",
    linksTitle: "Enlaces",
    viewCode: "Ver código",
    liveDemo: "Ver demo",
    privateNote: "Proyecto privado: el código no es público, pero puedo contarte cómo está construido.",
    prev: "Anterior",
    next: "Siguiente",
    moreProjects: "Seguir explorando",
    tocTitle: "En esta página",
    galleryLabel: "Galería",
  },
  en: {
    back: "Back to projects",
    overview: "What it does",
    howItWorks: "How it works",
    features: "What's included",
    stackTitle: "Tech stack",
    categoryTitle: "Category",
    linksTitle: "Links",
    viewCode: "View code",
    liveDemo: "Live demo",
    privateNote: "Private project: code isn't public, but I can walk you through how it's built.",
    prev: "Previous",
    next: "Next",
    moreProjects: "Keep exploring",
    tocTitle: "On this page",
    galleryLabel: "Gallery",
  },
}

export function ProjectDetail({
  project,
  images,
  prev,
  next,
}: {
  project: Project
  images: ProjectImage[]
  prev?: Project
  next?: Project
}) {
  const { lang } = useLanguage()
  const t = copy[lang]
  const [active, setActive] = useState("galeria")

  const longDesc = lang === "es"
    ? project.longDescriptionEs ?? project.descriptionEs
    : project.longDescriptionEn ?? project.descriptionEn
  const steps = lang === "es" ? project.howItWorksEs : project.howItWorksEn
  const features = lang === "es" ? project.featuresEs : project.featuresEn

  const tocItems = [
    { id: "galeria", label: t.galleryLabel },
    { id: "resumen", label: t.overview },
    ...(steps && steps.length > 0 ? [{ id: "construccion", label: t.howItWorks }] : []),
    ...(features && features.length > 0 ? [{ id: "detalles", label: t.features }] : []),
  ]
  const tocKey = tocItems.map((item) => item.id).join(",")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: "-20% 0px -70% 0px" }
    )
    for (const id of tocKey.split(",")) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [tocKey])

  return (
    <article className="max-w-5xl mx-auto px-6 md:px-12 py-28 md:py-32">
      {/* Breadcrumb */}
      <Link
        href="/#projects"
        className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        {t.back}
      </Link>

      {/* Header */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="font-mono text-xs text-primary">
          {categoryLabel(project.category, lang)}
        </span>
        {project.featured && (
          <span className="inline-flex items-center gap-1 font-mono text-xs px-2 py-0.5 rounded-full bg-primary text-primary-foreground">
            <Sparkles className="w-3 h-3" aria-hidden="true" />
            {lang === "es" ? "Destacado" : "Featured"}
          </span>
        )}
        {project.isPrivate && (
          <span className="inline-flex items-center gap-1 font-mono text-xs px-2 py-0.5 rounded-full border border-border text-muted-foreground">
            <Lock className="w-3 h-3" aria-hidden="true" />
            {lang === "es" ? "Privado" : "Private"}
          </span>
        )}
      </div>

      <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">
        {project.title}
      </h1>
      <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-3xl mb-8">
        {lang === "es" ? project.descriptionEs : project.descriptionEn}
      </p>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 mb-12">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm px-5 py-2.5 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <Github className="w-4 h-4" />
            {t.viewCode}
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm px-5 py-2.5 rounded-full border border-border text-foreground hover:border-primary hover:text-primary transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            {t.liveDemo}
          </a>
        )}
      </div>

      {/* Galería */}
      <Reveal>
        <div id="galeria" className="mb-12 scroll-mt-24">
          <ProjectGallery images={images} />
        </div>
      </Reveal>

      <div className="grid md:grid-cols-[1fr_280px] gap-10">
        {/* Main column */}
        <div className="space-y-12 min-w-0">
          <section id="resumen" className="scroll-mt-24">
            <h2 className="flex items-center gap-2 text-xl font-bold text-foreground mb-4">
              <Sparkles className="w-5 h-5 text-primary" aria-hidden="true" />
              {t.overview}
            </h2>
            <p className="text-muted-foreground leading-relaxed">{longDesc}</p>
            {project.isPrivate && !project.github && (
              <p className="mt-4 text-sm text-muted-foreground border-l-2 border-primary/50 pl-4">
                {t.privateNote}
              </p>
            )}
          </section>

          {steps && steps.length > 0 && (
            <section id="construccion" className="scroll-mt-24">
              <h2 className="flex items-center gap-2 text-xl font-bold text-foreground mb-5">
                <ListOrdered className="w-5 h-5 text-primary" aria-hidden="true" />
                {t.howItWorks}
              </h2>
              <ol className="space-y-4">
                {steps.map((step, i) => (
                  <li key={i} className="flex gap-4 bg-card border border-border rounded-lg p-4">
                    <span className="shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary font-mono text-sm grid place-items-center">
                      {i + 1}
                    </span>
                    <p className="text-sm text-muted-foreground leading-relaxed pt-1">{step}</p>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {features && features.length > 0 && (
            <section id="detalles" className="scroll-mt-24">
              <h2 className="flex items-center gap-2 text-xl font-bold text-foreground mb-5">
                <Check className="w-5 h-5 text-primary" aria-hidden="true" />
                {t.features}
              </h2>
              <ul className="grid sm:grid-cols-2 gap-3">
                {features.map((f, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 bg-card border border-border rounded-lg p-4 text-sm text-muted-foreground leading-relaxed"
                  >
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6 md:sticky md:top-24 h-fit">
          <nav aria-label={t.tocTitle} className="bg-card border border-border rounded-lg p-5">
            <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3">
              {t.tocTitle}
            </h3>
            <ul className="space-y-2">
              {tocItems.map((item) => {
                const isActive = active === item.id
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      aria-current={isActive ? "true" : undefined}
                      className={`text-sm transition-colors duration-200 ${
                        isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="bg-card border border-border rounded-lg p-5">
            <h3 className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3">
              <Cpu className="w-4 h-4 text-primary" aria-hidden="true" />
              {t.stackTitle}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="font-mono text-xs px-2.5 py-1 rounded bg-secondary text-secondary-foreground"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-card border border-border rounded-lg p-5 space-y-4">
            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-1.5">
                {t.categoryTitle}
              </h3>
              <p className="text-sm text-foreground">{categoryLabel(project.category, lang)}</p>
            </div>
            {(project.github || project.demo) && (
              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  {t.linksTitle}
                </h3>
                <div className="flex flex-col gap-2">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      GitHub
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Demo
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* Prev / Next */}
      <nav
        aria-label={t.moreProjects}
        className="grid sm:grid-cols-2 gap-4 mt-16 pt-8 border-t border-border"
      >
        {prev && (
          <Link
            href={`/projects/${prev.slug}`}
            className="group bg-card border border-border rounded-lg p-5 hover:border-primary/50 transition-colors"
          >
            <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground mb-2">
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              {t.prev}
            </span>
            <span className="font-bold text-foreground group-hover:text-primary transition-colors">
              {prev.title}
            </span>
          </Link>
        )}
        {next && (
          <Link
            href={`/projects/${next.slug}`}
            className="group bg-card border border-border rounded-lg p-5 text-right hover:border-primary/50 transition-colors sm:col-start-2"
          >
            <span className="flex items-center justify-end gap-1.5 font-mono text-xs text-muted-foreground mb-2">
              {t.next}
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
            <span className="font-bold text-foreground group-hover:text-primary transition-colors">
              {next.title}
            </span>
          </Link>
        )}
      </nav>
    </article>
  )
}
