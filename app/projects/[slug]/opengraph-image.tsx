import { ImageResponse } from "next/og"
import { categoryLabel } from "@/lib/categories"
import { getProject, projects } from "@/lib/projects"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = "Portada del proyecto"

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProject(slug)
  const title = project?.title ?? "Proyecto"
  const category = project ? categoryLabel(project.category, "es").toUpperCase() : ""
  const stack = project ? project.stack.slice(0, 4).join("  ·  ") : ""

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          backgroundColor: "#0b1220",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ display: "flex", color: "#34d399", fontSize: 24, letterSpacing: 6 }}>
            {category}
          </span>
          <span style={{ display: "flex", color: "#34d399", fontSize: 28 }}>●</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              color: "#f1f5f9",
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.1,
            }}
          >
            {title}
          </div>
          <div style={{ display: "flex", marginTop: 28, color: "#94a3b8", fontSize: 30 }}>
            {stack}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#64748b",
            fontSize: 26,
          }}
        >
          <span style={{ display: "flex" }}>Martin Nomdedeu</span>
          <span style={{ display: "flex" }}>martinnomdedeu.com</span>
        </div>
      </div>
    ),
    { ...size }
  )
}
