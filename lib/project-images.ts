import fs from "node:fs"
import path from "node:path"
import type { Project, ProjectImage } from "@/lib/projects"

/**
 * Auto-descubrimiento de medios por carpeta (solo servidor / build time).
 *
 * Convención: public/projects/<slug>/*.webp|jpg|jpeg|png|avif (imágenes) y
 * *.mp4|webm|ogg|mov (videos). El orden es por nombre (prefijo numérico).
 * - `meta.json` opcional aporta alt/caption bilingües y `poster` para videos.
 * - Si hay un video `03-demo.mp4`, una imagen `03-demo.webp` se usa como poster
 *   y NO se muestra como imagen suelta.
 * - Si no hay medios raster, cae al placeholder 01-cover.svg.
 * - `project.images` (en lib/projects.ts) sigue siendo un override manual.
 */

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ""
const IMAGE_EXT = /\.(webp|avif|jpe?g|png)$/i
const VIDEO_EXT = /\.(mp4|webm|ogg|mov)$/i
const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" })

type ImageMeta = {
  altEs?: string
  altEn?: string
  captionEs?: string
  captionEn?: string
  /** Nombre de archivo de la imagen poster (solo videos) */
  poster?: string
}

type ImageMetaMap = Record<string, ImageMeta>

function readDir(dir: string): string[] {
  try {
    return fs.readdirSync(dir)
  } catch {
    return []
  }
}

function readMeta(dir: string): ImageMetaMap {
  try {
    return JSON.parse(fs.readFileSync(path.join(dir, "meta.json"), "utf8")) as ImageMetaMap
  } catch {
    return {}
  }
}

export function getProjectImages(project: Project): ProjectImage[] {
  if (project.images && project.images.length > 0) return project.images

  const dir = path.join(process.cwd(), "public", "projects", project.slug)
  const files = readDir(dir)

  const raster = files.filter((file) => IMAGE_EXT.test(file))
  const videos = files.filter((file) => VIDEO_EXT.test(file))
  const videoStems = new Set(videos.map((file) => file.replace(VIDEO_EXT, "")))
  const standaloneImages = raster.filter((file) => !videoStems.has(file.replace(IMAGE_EXT, "")))

  const entries = [...standaloneImages, ...videos].sort(collator.compare)

  if (entries.length === 0) {
    return [
      {
        src: `${BASE_PATH}/projects/${project.slug}/01-cover.svg`,
        altEs: `Portada del proyecto ${project.title}`,
        altEn: `${project.title} project cover`,
        kind: "image",
      },
    ]
  }

  const meta = readMeta(dir)

  return entries.map((file, index) => {
    const isVideo = VIDEO_EXT.test(file)
    const stem = file.replace(IMAGE_EXT, "").replace(VIDEO_EXT, "")
    const entry = meta[file] ?? meta[stem] ?? {}

    let poster: string | undefined
    if (isVideo) {
      const posterFile =
        (entry.poster && raster.includes(entry.poster) ? entry.poster : undefined) ??
        raster.find((candidate) => candidate.replace(IMAGE_EXT, "") === stem)
      if (posterFile) poster = `${BASE_PATH}/projects/${project.slug}/${posterFile}`
    }

    return {
      src: `${BASE_PATH}/projects/${project.slug}/${file}`,
      altEs: entry.altEs ?? `${project.title} — medio ${index + 1}`,
      altEn: entry.altEn ?? `${project.title} — media ${index + 1}`,
      captionEs: entry.captionEs,
      captionEn: entry.captionEn,
      kind: isVideo ? "video" : "image",
      poster,
    }
  })
}

/**
 * Diagrama de flujo opcional por proyecto (HTML interactivo de archify).
 * Fuente: public/diagrams/<slug>.html → se embebe en la ficha si existe.
 * Devuelve también la relación de aspecto del viewBox para que el iframe
 * no deje espacio muerto.
 */
export function getProjectDiagram(
  slug: string
): { src: string; aspect: number } | null {
  const file = path.join(process.cwd(), "public", "diagrams", `${slug}.html`)
  let html = ""
  try {
    html = fs.readFileSync(file, "utf8")
  } catch {
    return null
  }
  const match = html.match(/<svg[^>]*viewBox="0 0 ([\d.]+) ([\d.]+)"/)
  const aspect = match ? Number(match[1]) / Number(match[2]) : 2
  return {
    src: `${BASE_PATH}/diagrams/${slug}.html?embed=1&theme=dark`,
    aspect: Number.isFinite(aspect) && aspect > 0 ? aspect : 2,
  }
}
