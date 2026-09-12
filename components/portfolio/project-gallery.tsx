"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react"
import type { ProjectImage } from "@/lib/projects"
import { useLanguage, type Lang } from "@/lib/i18n"

const ProjectLightbox = dynamic(
  () => import("@/components/portfolio/project-lightbox").then((m) => m.ProjectLightbox),
  { ssr: false }
)

const copy: Record<
  Lang,
  {
    carousel: string
    thumbnails: string
    open: string
    prev: string
    next: string
    counter: (i: number, n: number) => string
  }
> = {
  es: {
    carousel: "Galería del proyecto",
    thumbnails: "Miniaturas",
    open: "Ampliar imagen",
    prev: "Imagen anterior",
    next: "Imagen siguiente",
    counter: (i, n) => `Imagen ${i} de ${n}`,
  },
  en: {
    carousel: "Project gallery",
    thumbnails: "Thumbnails",
    open: "Expand image",
    prev: "Previous image",
    next: "Next image",
    counter: (i, n) => `Image ${i} of ${n}`,
  },
}

function GalleryImage({
  image,
  alt,
  priority,
  sizes,
  className = "object-cover",
}: {
  image: ProjectImage
  alt: string
  priority?: boolean
  sizes: string
  className?: string
}) {
  return (
    <Image
      src={image.src}
      alt={alt}
      fill
      priority={priority}
      unoptimized={image.src.endsWith(".svg")}
      sizes={sizes}
      className={className}
    />
  )
}

const iconButton =
  "grid place-items-center w-11 h-11 rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors duration-300"

export function ProjectGallery({ images }: { images: ProjectImage[] }) {
  const { lang } = useLanguage()
  const t = copy[lang]
  const multiple = images.length > 1

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" })
  const [selected, setSelected] = useState(0)
  const [open, setOpen] = useState(false)
  const [lightboxMounted, setLightboxMounted] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap())
    onSelect()
    emblaApi.on("select", onSelect)
    return () => {
      emblaApi.off("select", onSelect)
    }
  }, [emblaApi])

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index)
      setSelected(index)
    },
    [emblaApi]
  )

  const step = useCallback(
    (dir: 1 | -1) => {
      scrollTo((selected + dir + images.length) % images.length)
    },
    [images.length, scrollTo, selected]
  )

  if (images.length === 0) return null

  const current = images[selected] ?? images[0]
  const currentAlt = lang === "es" ? current.altEs : current.altEn

  return (
    <div className="space-y-4">
      {/* Imagen principal */}
      <div className="relative group">
        <div
          ref={multiple ? emblaRef : undefined}
          className="relative aspect-[16/10] overflow-hidden rounded-lg border border-border bg-card"
          {...(multiple
            ? {
                role: "group",
                "aria-roledescription": "carousel",
                "aria-label": t.carousel,
              }
            : {})}
        >
          {multiple ? (
            <div className="flex h-full">
              {images.map((image, i) => (
                <div
                  key={image.src}
                  className="relative shrink-0 grow-0 basis-full"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={t.counter(i + 1, images.length)}
                  aria-hidden={i !== selected}
                >
                  <GalleryImage
                    image={image}
                    alt={lang === "es" ? image.altEs : image.altEn}
                    priority={i === 0}
                    sizes="(max-width: 768px) 100vw, 1024px"
                  />
                </div>
              ))}
            </div>
          ) : (
            <GalleryImage
              image={current}
              alt={currentAlt}
              priority
              sizes="(max-width: 768px) 100vw, 1024px"
            />
          )}

          <span className="pointer-events-none absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-300" />
        </div>

        <button
          ref={triggerRef}
          type="button"
          onClick={() => {
            setLightboxMounted(true)
            setOpen(true)
          }}
          aria-label={`${t.open}: ${currentAlt}`}
          className={`absolute top-3 right-3 bg-background/80 ${iconButton}`}
        >
          <Maximize2 className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>

      {/* Flechas + contador (solo si hay varias) */}
      {multiple && (
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => step(-1)} aria-label={t.prev} className={iconButton}>
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>
            <button type="button" onClick={() => step(1)} aria-label={t.next} className={iconButton}>
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          <p className="font-mono text-xs text-muted-foreground" aria-hidden="true">
            {t.counter(selected + 1, images.length)}
          </p>
        </div>
      )}

      {/* Miniaturas */}
      {multiple && (
        <ul aria-label={t.thumbnails} className="grid grid-cols-4 sm:grid-cols-5 gap-3">
          {images.map((image, i) => (
            <li key={`thumb-${image.src}`}>
              <button
                type="button"
                onClick={() => scrollTo(i)}
                aria-label={t.counter(i + 1, images.length)}
                aria-current={i === selected ? "true" : undefined}
                className={`relative block w-full aspect-video overflow-hidden rounded border transition-[border-color,opacity] duration-200 ${
                  i === selected
                    ? "border-primary ring-2 ring-primary/40 opacity-100"
                    : "border-border opacity-60 hover:opacity-100"
                }`}
              >
                <GalleryImage image={image} alt="" sizes="200px" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Lightbox (se descarga recién al primer click) */}
      {lightboxMounted && (
        <ProjectLightbox
          images={images}
          index={selected}
          open={open}
          onOpenChange={setOpen}
          onNavigate={scrollTo}
          returnFocusTo={triggerRef}
          lang={lang}
        />
      )}
    </div>
  )
}
