import fs from "node:fs"
import path from "node:path"
import type { Project, ProjectImage } from "@/lib/projects"

/**
 * Auto-descubrimiento de imágenes por carpeta (solo servidor / build time).
 *
 * Convención: public/projects/<slug>/*.webp | .jpg | .jpeg | .png | .avif
 * - El orden es por nombre (prefijo numérico: 01-cover, 02-bot, ...).
 * - `meta.json` opcional dentro de la carpeta aporta alt/caption bilingües.
 * - Si no hay imágenes raster, cae al placeholder 01-cover.svg.
 * - `project.images` (en lib/projects.ts) sigue siendo un override manual.
 */

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ""
const IMAGE_EXT = /\.(webp|avif|jpe?g|png)$/i
const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" })

type ImageMeta = {
  altEs?: string
  altEn?: string
  captionEs?: string
  captionEn?: string
}

type ImageMetaMap = Record<string, ImageMeta>

export function getProjectImages(project: Project): ProjectImage[] {
  if (project.images && project.images.length > 0) return project.images

  const dir = path.join(process.cwd(), "public", "projects", project.slug)

  let files: string[] = []
  try {
    files = fs.readdirSync(dir).filter((file) => IMAGE_EXT.test(file)).sort(collator.compare)
  } catch {
    files = []
  }

  if (files.length === 0) {
    return [
      {
        src: `${BASE_PATH}/projects/${project.slug}/01-cover.svg`,
        altEs: `Portada del proyecto ${project.title}`,
        altEn: `${project.title} project cover`,
      },
    ]
  }

  let meta: ImageMetaMap = {}
  try {
    meta = JSON.parse(
      fs.readFileSync(path.join(dir, "meta.json"), "utf8")
    ) as ImageMetaMap
  } catch {
    meta = {}
  }

  return files.map((file, index) => {
    const stem = file.replace(IMAGE_EXT, "")
    const entry = meta[file] ?? meta[stem] ?? {}
    return {
      src: `${BASE_PATH}/projects/${project.slug}/${file}`,
      altEs: entry.altEs ?? `${project.title} — imagen ${index + 1}`,
      altEn: entry.altEn ?? `${project.title} — image ${index + 1}`,
      captionEs: entry.captionEs,
      captionEn: entry.captionEn,
    }
  })
}

/**
 * Diagrama de flujo opcional por proyecto (HTML interactivo de archify).
 * Fuente: public/diagrams/<slug>.html → se embebe en la ficha si existe.
 */
export function getProjectDiagram(slug: string): string | null {
  const file = path.join(process.cwd(), "public", "diagrams", `${slug}.html`)
  try {
    if (!fs.statSync(file).isFile()) return null
  } catch {
    return null
  }
  return `${BASE_PATH}/diagrams/${slug}.html?embed=1&theme=dark`
}
