import { ImageResponse } from "next/og"
import { categoryLabel } from "@/lib/categories"
import { getProject, projects } from "@/lib/projects"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = "Portada del proyecto"

const MARK_SVG =
  "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' fill='none'>" +
  "<path d='M11 46V18L22 32L33 18V46' stroke='%23F1F5F9' stroke-width='6' stroke-linecap='round' stroke-linejoin='round'/>" +
  "<path d='M33 18L53 46V18' stroke='%23F1F5F9' stroke-width='6' stroke-linecap='round' stroke-linejoin='round'/>" +
  "</svg>"
const MARK_DATA_URI = `data:image/svg+xml,${MARK_SVG}`

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
          <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- satori (ImageResponse) requires a plain img */}
            <img src={MARK_DATA_URI} width={64} height={64} alt="" />
            <span style={{ display: "flex", color: "#34d399", fontSize: 24, letterSpacing: 6 }}>
              {category}
            </span>
          </div>
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
