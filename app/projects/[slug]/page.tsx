import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Navigation } from "@/components/portfolio/navigation"
import { Footer } from "@/components/portfolio/footer"
import { ProjectDetail } from "@/components/portfolio/project-detail"
import { LanguageProvider } from "@/lib/i18n"
import { getAdjacentProjects, getProject, getProjectImages, projects } from "@/lib/projects"

export const dynamicParams = false

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return { title: "Proyecto no encontrado — Martin Nomdedeu" }

  const description = `${project.descriptionEs} Stack: ${project.stack.join(", ")}.`
  return {
    title: `${project.title} — Martin Nomdedeu`,
    description,
    alternates: { canonical: `https://martinnomdedeu.com/projects/${project.slug}` },
    openGraph: {
      type: "article",
      url: `https://martinnomdedeu.com/projects/${project.slug}`,
      title: `${project.title} — Martin Nomdedeu`,
      description,
      siteName: "Martin Nomdedeu Portfolio",
    },
    twitter: {
      card: "summary",
      title: `${project.title} — Martin Nomdedeu`,
      description,
    },
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const { prev, next } = getAdjacentProjects(slug)
  const images = getProjectImages(project)

  return (
    <LanguageProvider>
      <main className="min-h-screen bg-background">
        <Navigation />
        <ProjectDetail project={project} images={images} prev={prev} next={next} />
        <Footer />
      </main>
    </LanguageProvider>
  )
}
