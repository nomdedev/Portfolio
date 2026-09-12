export type CategoryId = "ml" | "quant" | "automation" | "products"

export type Project = {
  slug: string
  category: CategoryId
  /** Los 3 destacados se muestran grandes arriba del filtro */
  featured?: boolean
  /** Sin link público: se muestra badge "Privado" y sin icono de código */
  isPrivate?: boolean
  title: string
  descriptionEs: string
  descriptionEn: string
  stack: string[]
  github?: string
}

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

export const projects: Project[] = [
  // ── A. Machine Learning & IA ──────────────────────────────────────────
  {
    slug: "tenis-atp",
    category: "ml",
    featured: true,
    title: "Predicción de Tenis ATP",
    descriptionEs:
      "Modelos de clasificación (Random Forest, XGBoost) sobre datos históricos ATP para estimar probabilidades de victoria por partido y torneo. Feature engineering de ranking, superficie, forma y H2H con validación walk-forward (~78% accuracy) y reportes automáticos vía bots.",
    descriptionEn:
      "Classification models (Random Forest, XGBoost) over historical ATP data to estimate win probabilities per match and tournament. Feature engineering on ranking, surface, form and H2H with walk-forward validation (~78% accuracy) and automated bot reports.",
    stack: ["Python", "scikit-learn", "XGBoost"],
  },
  {
    slug: "mondial-xboost",
    category: "ml",
    title: "Mondial-Xboost",
    descriptionEs:
      "Sistema de predicción de partidos de fútbol con XGBoost optimizado con Optuna sobre ~49.000 partidos, simulación Monte Carlo de 10.000 torneos y app con dashboard en vivo.",
    descriptionEn:
      "Football match prediction system with Optuna-tuned XGBoost over ~49,000 matches, 10,000-tournament Monte Carlo simulation and a live dashboard app.",
    stack: ["Python", "Machine Learning", "HTML"],
    github: "https://github.com/nomdedev/Mondial-Xboost",
  },
  {
    slug: "llm-finetuning",
    category: "ml",
    featured: true,
    title: "Fine-tuning de LLMs",
    descriptionEs:
      "Fine-tuning de modelos de lenguaje (Hugging Face/Transformers) para clasificación, extracción de información y análisis de documentos. Adaptadores LoRA/QLoRA con cuantización 4-bit para GPUs de consumo, datasets en formato de instrucciones y benchmarking base vs. ajustado.",
    descriptionEn:
      "Fine-tuning of language models (Hugging Face/Transformers) for classification, information extraction and document analysis. LoRA/QLoRA adapters with 4-bit quantization for consumer GPUs, instruction-format datasets and base vs. tuned benchmarking.",
    stack: ["PyTorch", "Hugging Face", "LoRA/QLoRA", "Unsloth"],
  },

  // ── B. Trading & Quant ────────────────────────────────────────────────
  {
    slug: "tradingview-mcp",
    category: "quant",
    featured: true,
    title: "tradingview-mcp",
    descriptionEs:
      "Servidor MCP para análisis de gráficos de TradingView asistido por IA: conecta Claude Code con TradingView Desktop y automatiza workflows personales de análisis técnico.",
    descriptionEn:
      "MCP server for AI-assisted TradingView chart analysis: connects Claude Code with TradingView Desktop and automates personal technical-analysis workflows.",
    stack: ["JavaScript", "MCP", "LLMs"],
    github: "https://github.com/nomdedev/tradingview-mcp",
  },
  {
    slug: "tradingia",
    category: "quant",
    title: "tradingIA",
    descriptionEs:
      "Plataforma de trading algorítmico con 5+ estrategias, walk-forward optimization, simulación Monte Carlo, dashboard de riesgo VaR/CVaR y paper trading en vivo.",
    descriptionEn:
      "Algorithmic trading platform with 5+ strategies, walk-forward optimization, Monte Carlo simulation, VaR/CVaR risk dashboard and live paper trading.",
    stack: ["Python"],
    github: "https://github.com/nomdedev/tradingIA",
  },
  {
    slug: "ifvg-trading-strategy",
    category: "quant",
    title: "IFVG Trading Strategy",
    descriptionEs:
      "Estrategia de trading basada en Imbalance/Fair Value Gaps, con backtesting y análisis de performance sobre datos históricos.",
    descriptionEn:
      "Trading strategy based on Imbalance/Fair Value Gaps, with backtesting and performance analysis over historical data.",
    stack: ["Python"],
    github: "https://github.com/nomdedev/IFVG-Trading-Strategy",
  },
  {
    slug: "modelos-cuantitativos",
    category: "quant",
    title: "Modelos Cuantitativos",
    descriptionEs:
      "Feature engineering sobre precios, volumen, retornos y volatilidad. Backtesting walk-forward con control de look-ahead bias y data leakage. Métricas: accuracy, F1, retorno acumulado, drawdown y Sharpe ratio.",
    descriptionEn:
      "Feature engineering over prices, volume, returns and volatility. Walk-forward backtesting with look-ahead bias and data leakage control. Metrics: accuracy, F1, cumulative return, drawdown and Sharpe ratio.",
    stack: ["Python", "pandas", "Backtesting"],
  },
  {
    slug: "arbitragear-usdt",
    category: "quant",
    title: "ArbitrageAR-USDT",
    descriptionEs:
      "Extensión Chrome que detecta arbitraje Dólar Oficial ↔ USDT en 30+ exchanges, con simulador de ganancias, notificaciones inteligentes y 47 tests. Auditoría 2026: score 5.9 → 8.1.",
    descriptionEn:
      "Chrome extension detecting Official USD ↔ USDT arbitrage across 30+ exchanges, with profit simulator, smart notifications and 47 tests. 2026 audit: score 5.9 → 8.1.",
    stack: ["JavaScript", "Chrome Extension", "FinTech"],
    github: "https://github.com/nomdedev/ArbitrageAR-USDT",
  },
  {
    slug: "arbitrars-bot",
    category: "quant",
    isPrivate: true,
    title: "arbitrARS-bot",
    descriptionEs:
      "Bot de arbitraje con pesos argentinos: monitoreo continuo de spreads, ejecución de reglas y alertas en tiempo real.",
    descriptionEn:
      "Arbitrage bot for Argentine pesos: continuous spread monitoring, rule execution and real-time alerts.",
    stack: ["C#", "Bots", "FinTech"],
  },
  {
    slug: "matriz-arg",
    category: "quant",
    isPrivate: true,
    title: "Extensión Matriz ARG",
    descriptionEs:
      "Extensión para visualizar la matriz económica argentina: indicadores y relaciones entre variables en una vista interactiva.",
    descriptionEn:
      "Extension to visualize the Argentine economic matrix: indicators and variable relationships in an interactive view.",
    stack: ["JavaScript", "Data Viz"],
  },
  {
    slug: "comoinvertironline",
    category: "quant",
    isPrivate: true,
    title: "ComoInvertirOnline",
    descriptionEs:
      "Sitio de contenido y herramientas para invertir online: guías, comparadores y calculadoras para el inversor minorista.",
    descriptionEn:
      "Content and tools site for online investing: guides, comparators and calculators for retail investors.",
    stack: ["TypeScript", "FinTech", "Content"],
  },

  // ── C. Automatización, Agentes & Bots ─────────────────────────────────
  {
    slug: "agent-manager-template",
    category: "automation",
    title: "agent-manager-template",
    descriptionEs:
      "Template reutilizable de Claude Code: estándar de 12 reglas, pipeline de 7 fases, hooks, agentes, skills y commands. Producción lista desde el día uno.",
    descriptionEn:
      "Reusable Claude Code template: 12-rule standard, 7-phase pipeline, hooks, agents, skills and commands. Production-ready from day one.",
    stack: ["JavaScript", "Claude Code", "AI Agents"],
    github: "https://github.com/nomdedev/agent-manager-template",
  },
  {
    slug: "bots-sumed",
    category: "automation",
    title: "Bots Conversacionales",
    descriptionEs:
      "Bot de carga de comprobantes integrado a SAP (~90% de la carga automatizada) y app de cotizaciones con ML + GenAI integrada a SAP y Tango (+60% precisión). Canales: Telegram, WhatsApp, Chatwoot y Teams.",
    descriptionEn:
      "Receipt-upload bot integrated with SAP (~90% of uploads automated) and quoting app with ML + GenAI integrated with SAP and Tango (+60% accuracy). Channels: Telegram, WhatsApp, Chatwoot and Teams.",
    stack: ["n8n", "APIs REST", "SQL", "LLMs"],
  },
  {
    slug: "agentes-mcp",
    category: "automation",
    title: "Agentes IA + MCP",
    descriptionEs:
      "Agentes con acceso a datos de mercado, análisis técnico y herramientas externas vía MCP y TradingView para decisiones automatizadas.",
    descriptionEn:
      "Agents with access to market data, technical analysis and external tools via MCP and TradingView for automated decisions.",
    stack: ["MCP", "TradingView", "LLMs", "Python"],
  },

  // ── D. Productos & Software ───────────────────────────────────────────
  {
    slug: "vecinosimple",
    category: "products",
    title: "VecinoSimple",
    descriptionEs:
      "SaaS B2B2C para administración de consorcios: 28 módulos, 195+ endpoints, 3 apps y RBAC de 8 roles con liquidación automática de expensas.",
    descriptionEn:
      "B2B2C SaaS for building management: 28 modules, 195+ endpoints, 3 apps and 8-role RBAC with automatic expense settlement.",
    stack: ["TypeScript"],
    github: "https://github.com/nomdedev/Admin-consorcios",
  },
  {
    slug: "couple-finance",
    category: "products",
    isPrivate: true,
    title: "couple-finance",
    descriptionEs:
      "App de finanzas compartidas para parejas: gastos comunes, balances y presupuestos en una experiencia simple.",
    descriptionEn:
      "Shared finances app for couples: common expenses, balances and budgets in a simple experience.",
    stack: ["TypeScript", "FinTech"],
  },
  {
    slug: "portofolio-app",
    category: "products",
    title: "Portofolio.app",
    descriptionEs:
      "Portfolio manager para tracking de finanzas personales: visibilidad integral de carteras, analytics de performance y alertas.",
    descriptionEn:
      "Portfolio manager for personal finance tracking: full portfolio visibility, performance analytics and alerts.",
    stack: ["TypeScript"],
    github: "https://github.com/nomdedev/Portofolio.app",
  },
  {
    slug: "dentaldesignpanel",
    category: "products",
    isPrivate: true,
    title: "DentalDesignPanel",
    descriptionEs:
      "Panel de gestión para diseño dental: seguimiento de casos, estados de producción y coordinación del laboratorio.",
    descriptionEn:
      "Management panel for dental design: case tracking, production states and lab coordination.",
    stack: ["TypeScript", "Dashboards"],
  },
  {
    slug: "fabric-sumed",
    category: "products",
    title: "Datos en Fabric",
    descriptionEs:
      "Pipeline end-to-end en Microsoft Fabric con capas Bronze/Silver/Gold sobre Lakehouse y Data Warehouse e ingesta diaria automática desde SAP: −80% en tiempos de información crítica.",
    descriptionEn:
      "End-to-end pipeline in Microsoft Fabric with Bronze/Silver/Gold layers over Lakehouse and Data Warehouse with daily automatic SAP ingestion: −80% in critical reporting times.",
    stack: ["Microsoft Fabric", "Lakehouse", "SAP"],
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
