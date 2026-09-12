export type CategoryId = "ml" | "quant" | "automation" | "products"

export const categories: { id: CategoryId | "all"; labelEs: string; labelEn: string }[] = [
  { id: "all", labelEs: "Todos", labelEn: "All" },
  { id: "ml", labelEs: "Machine Learning & IA", labelEn: "Machine Learning & AI" },
  { id: "quant", labelEs: "Trading & Quant", labelEn: "Trading & Quant" },
  { id: "automation", labelEs: "Automatización & Agentes", labelEn: "Automation & Agents" },
  { id: "products", labelEs: "Productos & Software", labelEn: "Products & Software" },
]

export function categoryLabel(id: CategoryId, lang: "es" | "en"): string {
  const labels: Record<CategoryId, { es: string; en: string }> = {
    ml: { es: "Machine Learning & IA", en: "Machine Learning & AI" },
    quant: { es: "Trading & Quant", en: "Trading & Quant" },
    automation: { es: "Automatización & Agentes", en: "Automation & Agents" },
    products: { es: "Productos & Software", en: "Products & Software" },
  }
  return labels[id][lang]
}
