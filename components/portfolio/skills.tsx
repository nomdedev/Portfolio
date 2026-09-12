"use client"

import { useLanguage, type Lang } from "@/lib/i18n"
import { Reveal } from "@/components/portfolio/reveal"
import { SectionHeader } from "@/components/portfolio/section-header"
import { Spotlight } from "@/components/portfolio/motion"

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

const copy: Record<Lang, { index: string; title: string; subtitle: string }> = {
  es: {
    index: "05.",
    title: "Skills",
    subtitle: "Competencias y stack que uso en producción, agrupados por disciplina.",
  },
  en: {
    index: "05.",
    title: "Skills",
    subtitle: "Skills and stack I use in production, grouped by discipline.",
  },
}

export function Skills() {
  const { lang } = useLanguage()
  const t = copy[lang]

  return (
    <section
      id="skills"
      className="py-24 px-6 md:px-12 lg:px-24 max-w-6xl 2xl:max-w-7xl mx-auto"
    >
      <Reveal>
        <SectionHeader index={t.index} title={t.title} subtitle={t.subtitle} />
      </Reveal>

      <div className="grid md:grid-cols-2 gap-6">
        {groups[lang].map((group, i) => (
          <Reveal key={group.title} delay={(i % 2) * 100}>
            <Spotlight className="h-full rounded-lg">
            <div className="border border-border rounded-lg p-6 hover:border-primary/50 transition-colors h-full">
              <div className="flex items-baseline justify-between gap-4 mb-4">
                <h3 className="font-mono text-xs uppercase tracking-wider text-foreground">
                  {group.title}
                </h3>
                <span className="font-mono text-xs text-muted-foreground">
                  [{String(i + 1).padStart(2, "0")}]
                </span>
              </div>
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
            </Spotlight>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
