import type { ReactNode } from "react"

/**
 * Cabecera de sección estándar (DESIGN.md §1).
 *
 * Una sola implementación para todas las secciones: índice mono esmeralda,
 * título, línea hairline a todo el ancho del contenedor y subtítulo opcional.
 * El bloque completo lleva `mb-12`; no duplicar este markup por sección.
 */
export function SectionHeader({
  index,
  title,
  subtitle,
  children,
}: {
  index: string
  title: string
  subtitle?: string
  children?: ReactNode
}) {
  return (
    <div className="mb-12">
      <h2 className="flex items-center gap-4 text-2xl md:text-3xl font-bold text-foreground mb-4">
        <span className="text-primary font-mono text-xl">{index}</span>
        <span className="text-balance">{title}</span>
        <span className="h-px bg-border flex-1" aria-hidden="true" />
      </h2>
      {subtitle ? (
        <p className="text-muted-foreground max-w-2xl text-balance">{subtitle}</p>
      ) : null}
      {children}
    </div>
  )
}
