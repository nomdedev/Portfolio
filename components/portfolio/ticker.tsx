"use client"

import { useLanguage, type Lang } from "@/lib/i18n"

const items: Record<Lang, string[]> = {
  es: [
    "Machine Learning",
    "XGBoost",
    "LLMs",
    "LoRA / QLoRA",
    "RAG",
    "Agentes IA",
    "MCP",
    "Microsoft Fabric",
    "n8n",
    "SAP Business One",
    "Power BI",
    "Python",
  ],
  en: [
    "Machine Learning",
    "XGBoost",
    "LLMs",
    "LoRA / QLoRA",
    "RAG",
    "AI Agents",
    "MCP",
    "Microsoft Fabric",
    "n8n",
    "SAP Business One",
    "Power BI",
    "Python",
  ],
}

/** Cinta mono con keywords; deriva continua, se pausa en hover y con reduced-motion. */
export function Ticker() {
  const { lang } = useLanguage()
  const row = (hidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items[lang].map((item) => (
        <span key={`${item}-${hidden ? "b" : "a"}`} className="flex items-center">
          <span className="px-6 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {item}
          </span>
          <span className="text-primary" aria-hidden="true">
            •
          </span>
        </span>
      ))}
    </div>
  )

  return (
    <div className="ticker overflow-hidden border-y border-border py-4" role="presentation">
      <div className="ticker-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}
