import { categories } from "./categories"
import { projects } from "./projects"

/**
 * Cifras citables del portfolio — fuente única.
 *
 * Regla (DESIGN.md §7 / BRAND.md): ningún número se escribe a mano en un
 * componente. Si una cifra cambia, cambia acá y se propaga a hero, about y
 * cualquier otro lugar que la muestre.
 *
 * NOTA: `yearsInData` es un dato declarado (no derivable del repo). Está en un
 * solo lugar a propósito: el CV dice "más de 6 años" y el sitio dice "+5".
 * Cuando se defina el valor correcto, se corrige únicamente acá.
 */
export const yearsInData = 5

/** Cantidad real de proyectos listados en el sitio. */
export const projectCount = projects.length

/** Cantidad de áreas/categorías reales (excluye el filtro "Todos"). */
export const areaCount = categories.filter((category) => category.id !== "all").length
