"use client"

import { useState } from "react"
import { ArrowRight, Github, Lock } from "lucide-react"
import Link from "next/link"
import {
  categories,
  categoryLabel,
  featuredProjects,
  projects,
  type CategoryId,
} from "@/lib/projects"
import { useLanguage, type Lang } from "@/lib/i18n"
import { Reveal } from "@/components/portfolio/reveal"
import { Spotlight } from "@/components/portfolio/motion"

const copy: Record<
  Lang,
  {
    index: string
    title: string
    subtitle: string
    featuredLabel: string
    privateLabel: string
    viewCode: string
    viewDetails: string
    results: (n: number) => string
  }
> = {
  es: {
    index: "02.",
    title: "Proyectos",
    subtitle:
      "Del ML aplicado a los agentes y la automatización de negocio. Tres destacados arriba, el resto filtrable por categoría.",
    featuredLabel: "Destacado",
    privateLabel: "Privado",
    viewCode: "Ver código",
    viewDetails: "Ver detalle",
    results: (n) => `${n} proyecto${n === 1 ? "" : "s"}`,
  },
  en: {
    index: "02.",
    title: "Projects",
    subtitle:
      "From applied ML to agents and business automation. Three featured on top, the rest filterable by category.",
    featuredLabel: "Featured",
    privateLabel: "Private",
    viewCode: "View code",
    viewDetails: "View details",
    results: (n) => `${n} project${n === 1 ? "" : "s"}`,
  },
}

function ProjectCard({
  slug,
  title,
  description,
  stack,
  github,
  isPrivate,
  category,
  lang,
  featured,
}: {
  slug: string
  title: string
  description: string
  stack: string[]
  github?: string
  isPrivate?: boolean
  category: CategoryId
  lang: Lang
  featured?: boolean
}) {
  const t = copy[lang]
  return (
    <Spotlight className="h-full rounded-lg">
    <article
      className={`group flex flex-col h-full bg-card rounded-lg border p-6 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_12px_40px_-16px_var(--ring)] ${
        featured ? "border-primary/40 md:p-8" : "border-border"
      }`}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="font-mono text-xs text-primary">
          {categoryLabel(category, lang)}
        </span>
        {featured && (
          <span className="font-mono text-xs px-2 py-0.5 rounded-full bg-primary text-primary-foreground">
            {t.featuredLabel}
          </span>
        )}
        {isPrivate && (
          <span className="inline-flex items-center gap-1 font-mono text-xs px-2 py-0.5 rounded-full border border-border text-muted-foreground">
            <Lock className="w-3 h-3" aria-hidden="true" />
            {t.privateLabel}
          </span>
        )}
      </div>
      <h3
        className={`font-bold text-foreground mb-2 group-hover:text-primary transition-colors ${
          featured ? "text-2xl" : "text-lg"
        }`}
      >
        <Link href={`/projects/${slug}`} aria-label={`${t.viewDetails}: ${title}`}>
          {title}
        </Link>
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-4">
        {description}
      </p>
      <ul className="flex flex-wrap gap-2 mb-5">
        {stack.map((tech) => (
          <li
            key={`${slug}-${tech}`}
            className="font-mono text-xs px-2 py-1 rounded bg-secondary text-secondary-foreground"
          >
            {tech}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-auto">
        <Link
          href={`/projects/${slug}`}
          className="inline-flex items-center gap-1.5 font-mono text-sm text-primary"
          aria-label={`${t.viewDetails}: ${title}`}
        >
          {t.viewDetails}
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
        {github && (
          <Link
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
            aria-label={`${t.viewCode}: ${title}`}
          >
            <Github className="w-4 h-4" />
            {t.viewCode}
          </Link>
        )}
      </div>
    </article>
    </Spotlight>
  )
}

export function Projects() {
  const { lang } = useLanguage()
  const t = copy[lang]
  const [filter, setFilter] = useState<CategoryId | "all">("all")

  const rest = projects.filter((p) => !p.featured && (filter === "all" || p.category === filter))

  return (
    <section
      id="projects"
      className="py-24 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto"
    >
      <Reveal>
        <h2 className="flex items-center gap-4 text-2xl md:text-3xl font-bold text-foreground mb-4">
          <span className="text-primary font-mono text-xl">{t.index}</span>
          {t.title}
          <span className="h-px bg-border flex-1 max-w-xs" />
        </h2>
        <p className="text-muted-foreground max-w-2xl mb-10">{t.subtitle}</p>
      </Reveal>

      {/* Destacados */}
      <div className="grid md:grid-cols-3 gap-6 mb-14">
        {featuredProjects.map((p, i) => (
          <Reveal key={p.slug} delay={i * 100}>
            <ProjectCard
              slug={p.slug}
              title={p.title}
              description={lang === "es" ? p.descriptionEs : p.descriptionEn}
              stack={p.stack}
              github={p.github}
              isPrivate={p.isPrivate}
              category={p.category}
              lang={lang}
              featured
            />
          </Reveal>
        ))}
      </div>

      {/* Filtros */}
      <Reveal>
        <div className="flex flex-wrap gap-2 mb-4" role="group" aria-label={t.title}>
          {categories.map((c) => {
            const active = filter === c.id
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setFilter(c.id)}
                aria-pressed={active}
                className={`font-mono text-sm px-4 py-2 rounded-full border transition-[transform,border-color,background-color,color] duration-150 active:scale-[0.97] ${
                  active
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {lang === "es" ? c.labelEs : c.labelEn}
              </button>
            )
          })}
        </div>
        <p className="font-mono text-xs text-muted-foreground mb-6" aria-live="polite">
          {t.results(rest.length)}
        </p>
      </Reveal>

      {/* Grilla filtrable con stagger */}
      <div key={`${lang}-${filter}`} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rest.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 6) * 60}>
            <ProjectCard
              slug={p.slug}
              title={p.title}
              description={lang === "es" ? p.descriptionEs : p.descriptionEn}
              stack={p.stack}
              github={p.github}
              isPrivate={p.isPrivate}
              category={p.category}
              lang={lang}
            />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
