"use client"

import type { RefObject } from "react"
import Image from "next/image"
import * as Dialog from "@radix-ui/react-dialog"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import type { ProjectImage } from "@/lib/projects"
import type { Lang } from "@/lib/i18n"

const copy: Record<
  Lang,
  {
    viewer: string
    close: string
    prev: string
    next: string
    counter: (i: number, n: number) => string
  }
> = {
  es: {
    viewer: "Visor de imágenes",
    close: "Cerrar",
    prev: "Imagen anterior",
    next: "Imagen siguiente",
    counter: (i, n) => `Imagen ${i} de ${n}`,
  },
  en: {
    viewer: "Image viewer",
    close: "Close",
    prev: "Previous image",
    next: "Next image",
    counter: (i, n) => `Image ${i} of ${n}`,
  },
}

const iconButton =
  "grid place-items-center w-11 h-11 rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors duration-300"

export function ProjectLightbox({
  images,
  index,
  open,
  onOpenChange,
  onNavigate,
  returnFocusTo,
  lang,
}: {
  images: ProjectImage[]
  index: number
  open: boolean
  onOpenChange: (open: boolean) => void
  onNavigate: (index: number) => void
  returnFocusTo?: RefObject<HTMLButtonElement | null>
  lang: Lang
}) {
  const t = copy[lang]
  const multiple = images.length > 1
  const current = images[index] ?? images[0]
  const currentAlt = lang === "es" ? current.altEs : current.altEn

  const step = (dir: 1 | -1) => onNavigate((index + dir + images.length) % images.length)

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-background/90 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 duration-200" />
        <Dialog.Content
          onKeyDown={(e) => {
            if (!multiple) return
            if (e.key === "ArrowLeft") step(-1)
            if (e.key === "ArrowRight") step(1)
          }}
          onCloseAutoFocus={(e) => {
            e.preventDefault()
            returnFocusTo?.current?.focus()
          }}
          className="fixed inset-0 z-[70] flex flex-col p-4 md:p-8 focus:outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 duration-200"
        >
          <Dialog.Title className="sr-only">{`${t.viewer}: ${currentAlt}`}</Dialog.Title>
          <Dialog.Description className="sr-only">
            {t.counter(index + 1, images.length)}
          </Dialog.Description>
          <p role="status" aria-live="polite" className="sr-only">
            {t.counter(index + 1, images.length)}
          </p>

          <div className="flex items-center justify-between gap-4 mb-4">
            <p className="font-mono text-xs text-muted-foreground" aria-hidden="true">
              {t.counter(index + 1, images.length)}
            </p>
            <Dialog.Close aria-label={t.close} className={iconButton}>
              <X className="w-5 h-5" aria-hidden="true" />
            </Dialog.Close>
          </div>

          <div className="relative flex-1 min-h-0">
            <Image
              src={current.src}
              alt={currentAlt}
              fill
              unoptimized={current.src.endsWith(".svg")}
              sizes="100vw"
              className="object-contain"
            />
          </div>

          {multiple && (
            <div className="flex items-center justify-center gap-4 mt-4">
              <button type="button" onClick={() => step(-1)} aria-label={t.prev} className={iconButton}>
                <ChevronLeft className="w-5 h-5" aria-hidden="true" />
              </button>
              <button type="button" onClick={() => step(1)} aria-label={t.next} className={iconButton}>
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
