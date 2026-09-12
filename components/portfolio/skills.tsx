"use client"

import { useEffect, useRef, useState } from "react"
import { useLanguage, type Lang } from "@/lib/i18n"

const groups: Record<Lang, { title: string; skills: string[] }[]> = {
  es: [
    {
      title: "Machine Learning",
      skills: ["Python", "pandas", "NumPy", "scikit-learn", "XGBoost", "Random Forest", "Forecasting", "Time Series", "Feature Engineering", "Walk-forward Validation", "Backtesting"],
    },
    {
      title: "LLMs & GenAI",
      skills: ["PyTorch", "Hugging Face", "Transformers", "LoRA", "QLoRA", "Unsloth", "RAG", "Embeddings", "Prompt Engineering", "Agentes de IA", "MCP", "NLP"],
    },
    {
      title: "Data Engineering",
      skills: ["Microsoft Fabric", "Lakehouse", "Data Warehouse", "Medallion", "ETL/ELT", "PostgreSQL", "SQL Server", "Data Modeling"],
    },
    {
      title: "Automatización & Integración",
      skills: ["n8n", "APIs REST", "Webhooks", "SAP Business One", "Tango", "Bots Telegram/WhatsApp", "Docker", "VS Code", "Git"],
    },
  ],
  en: [
    {
      title: "Machine Learning",
      skills: ["Python", "pandas", "NumPy", "scikit-learn", "XGBoost", "Random Forest", "Forecasting", "Time Series", "Feature Engineering", "Walk-forward Validation", "Backtesting"],
    },
    {
      title: "LLMs & GenAI",
      skills: ["PyTorch", "Hugging Face", "Transformers", "LoRA", "QLoRA", "Unsloth", "RAG", "Embeddings", "Prompt Engineering", "AI Agents", "MCP", "NLP"],
    },
    {
      title: "Data Engineering",
      skills: ["Microsoft Fabric", "Lakehouse", "Data Warehouse", "Medallion", "ETL/ELT", "PostgreSQL", "SQL Server", "Data Modeling"],
    },
    {
      title: "Automation & Integration",
      skills: ["n8n", "REST APIs", "Webhooks", "SAP Business One", "Tango", "Telegram/WhatsApp Bots", "Docker", "VS Code", "Git"],
    },
  ],
}

const copy: Record<Lang, { index: string; title: string }> = {
  es: { index: "05.", title: "Skills" },
  en: { index: "05.", title: "Skills" },
}

export function Skills() {
  const { lang } = useLanguage()
  const t = copy[lang]
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-24 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto"
    >
      <div
        className={`transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <h2 className="flex items-center gap-4 text-2xl md:text-3xl font-bold text-foreground mb-10">
          <span className="text-primary font-mono text-xl">{t.index}</span>
          {t.title}
          <span className="h-px bg-border flex-1 max-w-xs" />
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {groups[lang].map((group) => (
            <div
              key={group.title}
              className="border border-border rounded-lg p-6 hover:border-primary/50 transition-colors"
            >
              <h3 className="font-semibold text-foreground mb-4">{group.title}</h3>
              <ul className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="font-mono text-xs px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground hover:bg-primary/15 hover:text-primary transition-colors"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
