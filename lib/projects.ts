import type { CategoryId } from "./categories"

export { categories, categoryLabel } from "./categories"
export type { CategoryId } from "./categories"

export type ProjectImage = {
  /** Ruta pública, ej: /projects/<slug>/01-cover.webp */
  src: string
  altEs: string
  altEn: string
  captionEs?: string
  captionEn?: string
}

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
  /** URL de demo en vivo (opcional) */
  demo?: string
  /** Año o período (opcional, ej: "2024 — presente") */
  year?: string
  /** Descripción larga para la página de detalle (fallback: description) */
  longDescriptionEs?: string
  longDescriptionEn?: string
  /** Pasos de "Cómo funciona" para la página de detalle */
  howItWorksEs?: string[]
  howItWorksEn?: string[]
  /** Lista de features / qué hace */
  featuresEs?: string[]
  featuresEn?: string[]
  /** Imágenes para la galería del detalle (si falta, se usa el placeholder del slug) */
  images?: ProjectImage[]
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
    stack: ["Python", "scikit-learn", "XGBoost", "pandas"],
    longDescriptionEs:
      "Sistema end-to-end que convierte datos históricos del circuito ATP en probabilidades accionables por partido y por torneo. Combina feature engineering tenístico (ranking, superficie, forma reciente, head-to-head) con modelos de clasificación calibrados y un pipeline de reportes automáticos que distribuye las predicciones vía bots.",
    longDescriptionEn:
      "End-to-end system turning historical ATP data into actionable per-match and per-tournament probabilities. It combines tennis-specific feature engineering (ranking, surface, recent form, head-to-head) with calibrated classification models and an automated reporting pipeline that distributes predictions via bots.",
    howItWorksEs: [
      "Ingesta y limpieza de datos históricos ATP: resultados, rankings, superficie y contexto del torneo.",
      "Feature engineering: diferencia de ranking, forma en últimos N partidos, historial H2H y performance por superficie.",
      "Entrenamiento de Random Forest y XGBoost con validación walk-forward para evitar look-ahead bias (~78% accuracy).",
      "Calibración de probabilidades y simulación de cuadros de torneo para estimar chances por ronda.",
      "Publicación automática de reportes y picks vía bots.",
    ],
    howItWorksEn: [
      "Ingestion and cleaning of historical ATP data: results, rankings, surface and tournament context.",
      "Feature engineering: ranking gap, last-N form, H2H history and per-surface performance.",
      "Random Forest and XGBoost training with walk-forward validation to avoid look-ahead bias (~78% accuracy).",
      "Probability calibration and bracket simulation to estimate round-by-round chances.",
      "Automatic publishing of reports and picks via bots.",
    ],
    featuresEs: [
      "Probabilidad de victoria por partido con intervalos de confianza",
      "Simulación de torneos completos y chances por ronda",
      "Features tenísticas: superficie, forma, H2H y ranking",
      "Reportes automáticos vía bots",
    ],
    featuresEn: [
      "Per-match win probability with confidence intervals",
      "Full-tournament simulation with round-by-round chances",
      "Tennis features: surface, form, H2H and ranking",
      "Automated bot reports",
    ],
  },
  {
    slug: "mondial-xboost",
    category: "ml",
    title: "Mondial-Xboost",
    descriptionEs:
      "Sistema de predicción de partidos de fútbol con XGBoost optimizado con Optuna sobre ~49.000 partidos, simulación Monte Carlo de 10.000 torneos y app con dashboard en vivo.",
    descriptionEn:
      "Football match prediction system with Optuna-tuned XGBoost over ~49,000 matches, 10,000-tournament Monte Carlo simulation and a live dashboard app.",
    stack: ["Python", "XGBoost", "Optuna", "HTML"],
    github: "https://github.com/nomdedev/Mondial-Xboost",
    longDescriptionEs:
      "Predictor de partidos de fútbol entrenado sobre ~49.000 partidos históricos. Usa XGBoost optimizado con Optuna y una simulación Monte Carlo de 10.000 torneos para pasar de probabilidades por partido a chances de campeón, con una app y dashboard en vivo para explorar los resultados.",
    longDescriptionEn:
      "Football match predictor trained on ~49,000 historical matches. It uses Optuna-tuned XGBoost plus a 10,000-tournament Monte Carlo simulation to go from per-match probabilities to title chances, with a live app and dashboard to explore results.",
    howItWorksEs: [
      "Dataset de ~49.000 partidos con features de equipos, contexto y forma.",
      "Optimización de hiperparámetros de XGBoost con Optuna y validación temporal.",
      "Predicción de resultado por partido (1X2 / goles esperados).",
      "Simulación Monte Carlo de 10.000 torneos para chances de avance y título.",
      "App con dashboard en vivo para visualizar predicciones.",
    ],
    howItWorksEn: [
      "Dataset of ~49,000 matches with team, context and form features.",
      "Optuna hyperparameter tuning for XGBoost with temporal validation.",
      "Per-match outcome prediction (1X2 / expected goals).",
      "10,000-tournament Monte Carlo simulation for advancement and title odds.",
      "Live dashboard app to explore predictions.",
    ],
    featuresEs: [
      "XGBoost optimizado con Optuna",
      "Simulación Monte Carlo de 10.000 torneos",
      "Dashboard en vivo con predicciones",
      "Dataset de ~49.000 partidos",
    ],
    featuresEn: [
      "Optuna-tuned XGBoost",
      "10,000-tournament Monte Carlo simulation",
      "Live prediction dashboard",
      "~49,000-match dataset",
    ],
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
    stack: ["Python", "PyTorch", "Hugging Face", "LoRA/QLoRA", "Unsloth"],
    longDescriptionEs:
      "Pipeline de adaptación de LLMs open-source a tareas concretas: clasificación, extracción de información y análisis de documentos en español. Usa adaptadores LoRA/QLoRA con cuantización 4-bit para entrenar en GPUs de consumo, datasets en formato de instrucciones y benchmarking sistemático base vs. ajustado para medir la ganancia real.",
    longDescriptionEn:
      "Pipeline for adapting open-source LLMs to concrete tasks: classification, information extraction and document analysis in Spanish. It uses LoRA/QLoRA adapters with 4-bit quantization to train on consumer GPUs, instruction-format datasets and systematic base-vs-tuned benchmarking to measure real gains.",
    howItWorksEs: [
      "Selección del modelo base open-source según tamaño, idioma y licencia.",
      "Curaduría de datasets en formato de instrucciones para la tarea objetivo.",
      "Entrenamiento eficiente con LoRA/QLoRA + cuantización 4-bit (Unsloth).",
      "Evaluación base vs. ajustado en un set held-out con métricas de tarea.",
      "Export del adaptador listo para inferencia de bajo costo.",
    ],
    howItWorksEn: [
      "Open-source base model selection by size, language and license.",
      "Instruction-format dataset curation for the target task.",
      "Efficient training with LoRA/QLoRA + 4-bit quantization (Unsloth).",
      "Base vs. tuned evaluation on a held-out set with task metrics.",
      "Export of the adapter ready for low-cost inference.",
    ],
    featuresEs: [
      "Adaptadores LoRA/QLoRA entrenables en GPU de consumo",
      "Datasets en formato de instrucciones",
      "Benchmarking base vs. ajustado",
      "Casos: clasificación, extracción y análisis documental",
    ],
    featuresEn: [
      "LoRA/QLoRA adapters trainable on consumer GPUs",
      "Instruction-format datasets",
      "Base vs. tuned benchmarking",
      "Use cases: classification, extraction and document analysis",
    ],
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
    stack: ["JavaScript", "MCP", "LLMs", "Claude Code"],
    github: "https://github.com/nomdedev/tradingview-mcp",
    longDescriptionEs:
      "Servidor del Model Context Protocol que le da a un asistente de IA (Claude Code) ojos sobre TradingView Desktop: captura gráficos, expone herramientas de análisis técnico y automatiza el workflow personal de lectura de charts — del screenshot a la tesis escrita.",
    longDescriptionEn:
      "Model Context Protocol server that gives an AI assistant (Claude Code) eyes on TradingView Desktop: it captures charts, exposes technical-analysis tools and automates the personal chart-reading workflow — from screenshot to written thesis.",
    howItWorksEs: [
      "El servidor MCP expone herramientas (tools) para capturar y consultar gráficos de TradingView Desktop.",
      "Claude Code invoca esas tools durante la conversación de análisis.",
      "El asistente combina la imagen del chart con indicadores y contexto para generar lectura técnica.",
      "El workflow guarda la tesis y niveles clave para seguimiento posterior.",
    ],
    howItWorksEn: [
      "The MCP server exposes tools to capture and query TradingView Desktop charts.",
      "Claude Code invokes those tools during the analysis conversation.",
      "The assistant combines the chart image with indicators and context to produce a technical read.",
      "The workflow saves the thesis and key levels for later follow-up.",
    ],
    featuresEs: [
      "Servidor MCP con tools de captura de charts",
      "Análisis técnico asistido por IA",
      "Workflow automatizado de lectura de gráficos",
      "Integración Claude Code + TradingView Desktop",
    ],
    featuresEn: [
      "MCP server with chart-capture tools",
      "AI-assisted technical analysis",
      "Automated chart-reading workflow",
      "Claude Code + TradingView Desktop integration",
    ],
  },
  {
    slug: "tradingia",
    category: "quant",
    title: "tradingIA",
    descriptionEs:
      "Plataforma de trading algorítmico con 5+ estrategias, walk-forward optimization, simulación Monte Carlo, dashboard de riesgo VaR/CVaR y paper trading en vivo.",
    descriptionEn:
      "Algorithmic trading platform with 5+ strategies, walk-forward optimization, Monte Carlo simulation, VaR/CVaR risk dashboard and live paper trading.",
    stack: ["Python", "pandas", "Backtesting"],
    github: "https://github.com/nomdedev/tradingIA",
    longDescriptionEs:
      "Plataforma modular de trading algorítmico: 5+ estrategias intercambiables, optimización walk-forward, simulación Monte Carlo de curvas de capital, dashboard de riesgo con VaR/CVaR y modo paper trading en vivo para validar antes de arriesgar capital.",
    longDescriptionEn:
      "Modular algorithmic trading platform: 5+ swappable strategies, walk-forward optimization, Monte Carlo equity-curve simulation, VaR/CVaR risk dashboard and live paper-trading mode to validate before risking capital.",
    howItWorksEs: [
      "Definición de estrategias como módulos con señales de entrada/salida.",
      "Backtesting con costos y walk-forward optimization para evitar overfitting.",
      "Simulación Monte Carlo sobre la curva de capital para rango de drawdowns.",
      "Dashboard de riesgo: VaR/CVaR, Sharpe, exposición y rachas.",
      "Paper trading en vivo para validación en tiempo real.",
    ],
    howItWorksEn: [
      "Strategies defined as modules with entry/exit signals.",
      "Backtesting with costs plus walk-forward optimization to avoid overfitting.",
      "Monte Carlo simulation over the equity curve for drawdown ranges.",
      "Risk dashboard: VaR/CVaR, Sharpe, exposure and streaks.",
      "Live paper trading for real-time validation.",
    ],
    featuresEs: [
      "5+ estrategias modulares",
      "Walk-forward optimization",
      "Dashboard de riesgo VaR/CVaR",
      "Paper trading en vivo",
    ],
    featuresEn: [
      "5+ modular strategies",
      "Walk-forward optimization",
      "VaR/CVaR risk dashboard",
      "Live paper trading",
    ],
  },
  {
    slug: "ifvg-trading-strategy",
    category: "quant",
    title: "IFVG Trading Strategy",
    descriptionEs:
      "Estrategia de trading basada en Imbalance/Fair Value Gaps, con backtesting y análisis de performance sobre datos históricos.",
    descriptionEn:
      "Trading strategy based on Imbalance/Fair Value Gaps, with backtesting and performance analysis over historical data.",
    stack: ["Python", "pandas", "Backtesting"],
    github: "https://github.com/nomdedev/IFVG-Trading-Strategy",
    longDescriptionEs:
      "Implementación sistemática de una estrategia basada en Imbalances / Fair Value Gaps (zonas de ineficiencia entre velas): detección de gaps, reglas de entrada, stops y targets, con backtesting completo y análisis de performance sobre datos históricos.",
    longDescriptionEn:
      "Systematic implementation of an Imbalance / Fair Value Gap strategy (inefficiency zones between candles): gap detection, entry rules, stops and targets, with full backtesting and performance analysis over historical data.",
    howItWorksEs: [
      "Detección de Fair Value Gaps en datos OHLC históricos.",
      "Reglas de entrada cuando el precio retorna a la zona de imbalance.",
      "Stops y targets definidos por estructura y ATR.",
      "Backtesting con métricas: win rate, profit factor, drawdown.",
    ],
    howItWorksEn: [
      "Fair Value Gap detection on historical OHLC data.",
      "Entry rules when price returns to the imbalance zone.",
      "Structure- and ATR-based stops and targets.",
      "Backtesting with win rate, profit factor and drawdown metrics.",
    ],
    featuresEs: [
      "Detección automática de FVG",
      "Reglas sistemáticas de entrada/salida",
      "Backtesting con métricas de performance",
      "Análisis sobre datos históricos",
    ],
    featuresEn: [
      "Automatic FVG detection",
      "Systematic entry/exit rules",
      "Backtesting with performance metrics",
      "Historical-data analysis",
    ],
  },
  {
    slug: "modelos-cuantitativos",
    category: "quant",
    title: "Modelos Cuantitativos",
    descriptionEs:
      "Feature engineering sobre precios, volumen, retornos y volatilidad. Backtesting walk-forward con control de look-ahead bias y data leakage. Métricas: accuracy, F1, retorno acumulado, drawdown y Sharpe ratio.",
    descriptionEn:
      "Feature engineering over prices, volume, returns and volatility. Walk-forward backtesting with look-ahead bias and data leakage control. Metrics: accuracy, F1, cumulative return, drawdown and Sharpe ratio.",
    stack: ["Python", "pandas", "scikit-learn", "Backtesting"],
    longDescriptionEs:
      "Toolkit de investigación cuantitativa: features sobre precios, volumen, retornos y volatilidad, con un harness de backtesting walk-forward que controla look-ahead bias y data leakage. Evaluación doble —métricas de ML (accuracy, F1) y de trading (retorno, drawdown, Sharpe)— para separar modelos que predicen de modelos que ganan.",
    longDescriptionEn:
      "Quantitative research toolkit: features over prices, volume, returns and volatility, with a walk-forward backtesting harness controlling look-ahead bias and data leakage. Dual evaluation — ML metrics (accuracy, F1) and trading metrics (return, drawdown, Sharpe) — to separate models that predict from models that profit.",
    howItWorksEs: [
      "Construcción de features: retornos, volatilidad, volumen y microestructura.",
      "Etiquetado de régimen/dirección sin usar información futura.",
      "Backtesting walk-forward con ventanas de train/test deslizantes.",
      "Reporte dual: accuracy/F1 + retorno acumulado, drawdown y Sharpe.",
    ],
    howItWorksEn: [
      "Feature building: returns, volatility, volume and microstructure.",
      "Regime/direction labelling without future information.",
      "Walk-forward backtesting with rolling train/test windows.",
      "Dual report: accuracy/F1 + cumulative return, drawdown and Sharpe.",
    ],
    featuresEs: [
      "Features de precio, volumen y volatilidad",
      "Walk-forward sin look-ahead bias",
      "Métricas ML + métricas de trading",
      "Control de data leakage",
    ],
    featuresEn: [
      "Price, volume and volatility features",
      "Look-ahead-bias-free walk-forward",
      "ML + trading metrics",
      "Data-leakage control",
    ],
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
    longDescriptionEs:
      "Extensión de Chrome que monitorea cotizaciones del dólar oficial y USDT en más de 30 exchanges argentinos para detectar ventanas de arbitraje. Incluye simulador de ganancias con comisiones, notificaciones inteligentes cuando el spread supera umbrales y una suite de 47 tests. Pasó por auditoría de código en 2026 (score 5.9 → 8.1).",
    longDescriptionEn:
      "Chrome extension monitoring official USD and USDT quotes across 30+ Argentine exchanges to spot arbitrage windows. Includes a fee-aware profit simulator, smart notifications when spreads cross thresholds and a 47-test suite. Audited in 2026 (score 5.9 → 8.1).",
    howItWorksEs: [
      "Scraping/API polling de cotizaciones en 30+ exchanges.",
      "Cálculo de spread Oficial ↔ USDT neto de comisiones.",
      "Simulador de ganancias con monto y costos configurables.",
      "Notificaciones inteligentes cuando el spread supera el umbral.",
    ],
    howItWorksEn: [
      "Quote scraping/API polling across 30+ exchanges.",
      "Official ↔ USDT spread calculation net of fees.",
      "Profit simulator with configurable amount and costs.",
      "Smart notifications when spread crosses the threshold.",
    ],
    featuresEs: [
      "Monitoreo de 30+ exchanges",
      "Simulador de ganancias con comisiones",
      "Notificaciones inteligentes de spread",
      "47 tests + auditoría 2026 (8.1/10)",
    ],
    featuresEn: [
      "30+ exchange monitoring",
      "Fee-aware profit simulator",
      "Smart spread notifications",
      "47 tests + 2026 audit (8.1/10)",
    ],
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
    stack: ["C#", ".NET", "Bots", "FinTech"],
    longDescriptionEs:
      "Bot privado de arbitraje para operar spreads en pesos argentinos. Monitorea cotizaciones en continuo, ejecuta reglas de entrada/salida configurables y emite alertas en tiempo real cuando aparecen oportunidades.",
    longDescriptionEn:
      "Private arbitrage bot for trading Argentine-peso spreads. It monitors quotes continuously, executes configurable entry/exit rules and fires real-time alerts when opportunities appear.",
    howItWorksEs: [
      "Monitoreo continuo de cotizaciones y spreads.",
      "Motor de reglas de entrada/salida con umbrales configurables.",
      "Alertas en tiempo real ante oportunidades.",
      "Log de operaciones para revisión posterior.",
    ],
    howItWorksEn: [
      "Continuous quote and spread monitoring.",
      "Entry/exit rule engine with configurable thresholds.",
      "Real-time opportunity alerts.",
      "Trade log for later review.",
    ],
    featuresEs: [
      "Monitoreo continuo de spreads",
      "Reglas de ejecución configurables",
      "Alertas en tiempo real",
    ],
    featuresEn: [
      "Continuous spread monitoring",
      "Configurable execution rules",
      "Real-time alerts",
    ],
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
    longDescriptionEs:
      "Extensión privada de visualización de la matriz económica argentina: reúne indicadores clave y muestra las relaciones entre variables (dólar, inflación, tasas, actividad) en una vista interactiva para lectura rápida del contexto macro.",
    longDescriptionEn:
      "Private extension visualizing the Argentine economic matrix: it gathers key indicators and shows relationships between variables (FX, inflation, rates, activity) in an interactive view for quick macro reads.",
    howItWorksEs: [
      "Recolección de indicadores económicos clave.",
      "Modelado de relaciones entre variables macro.",
      "Vista interactiva con gráficos y comparativas.",
    ],
    howItWorksEn: [
      "Collection of key economic indicators.",
      "Modelling of macro-variable relationships.",
      "Interactive view with charts and comparisons.",
    ],
    featuresEs: [
      "Indicadores macro argentinos",
      "Vista interactiva de relaciones",
      "Lectura rápida de contexto",
    ],
    featuresEn: [
      "Argentine macro indicators",
      "Interactive relationship view",
      "Quick context reads",
    ],
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
    stack: ["TypeScript", "Next.js", "FinTech"],
    longDescriptionEs:
      "Sitio privado de educación financiera y herramientas para el inversor minorista argentino: guías paso a paso, comparadores de instrumentos y calculadoras (interés compuesto, dólar, plazos) en lenguaje simple.",
    longDescriptionEn:
      "Private financial-education and tools site for Argentine retail investors: step-by-step guides, instrument comparators and calculators (compound interest, FX, fixed-term) in plain language.",
    howItWorksEs: [
      "Guías educativas por nivel e instrumento.",
      "Comparadores de opciones de inversión.",
      "Calculadoras interactivas de retornos y costos.",
    ],
    howItWorksEn: [
      "Educational guides by level and instrument.",
      "Investment-option comparators.",
      "Interactive return and cost calculators.",
    ],
    featuresEs: ["Guías para minoristas", "Comparadores", "Calculadoras interactivas"],
    featuresEn: ["Retail guides", "Comparators", "Interactive calculators"],
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
    longDescriptionEs:
      "Template para arrancar proyectos con Claude Code con estándar profesional desde el día uno: 12 reglas de trabajo, pipeline de 7 fases (de exploración a deploy), hooks de calidad, agentes especializados, skills y commands reutilizables.",
    longDescriptionEn:
      "Starter template for Claude Code projects with a professional standard from day one: 12 working rules, 7-phase pipeline (exploration to deploy), quality hooks, specialized agents, and reusable skills and commands.",
    howItWorksEs: [
      "Clonás el template como base del repo.",
      "Las 12 reglas definen cómo el agente explora, planifica y ejecuta.",
      "El pipeline de 7 fases guía cada feature hasta producción.",
      "Hooks, agentes y commands automatizan calidad y repetición.",
    ],
    howItWorksEn: [
      "Clone the template as the repo base.",
      "The 12 rules define how the agent explores, plans and executes.",
      "The 7-phase pipeline guides each feature to production.",
      "Hooks, agents and commands automate quality and repetition.",
    ],
    featuresEs: [
      "Estándar de 12 reglas",
      "Pipeline de 7 fases",
      "Agentes, skills y commands incluidos",
      "Producción lista día uno",
    ],
    featuresEn: [
      "12-rule standard",
      "7-phase pipeline",
      "Agents, skills and commands included",
      "Production-ready day one",
    ],
  },
  {
    slug: "bots-sumed",
    category: "automation",
    title: "Bots Conversacionales",
    descriptionEs:
      "Bot de carga de comprobantes integrado a SAP (~90% de la carga automatizada) y app de cotizaciones con ML + GenAI integrada a SAP y Tango (+60% precisión). Canales: Telegram, WhatsApp, Chatwoot y Teams.",
    descriptionEn:
      "Receipt-upload bot integrated with SAP (~90% of uploads automated) and quoting app with ML + GenAI integrated with SAP and Tango (+60% accuracy). Channels: Telegram, WhatsApp, Chatwoot and Teams.",
    stack: ["n8n", "APIs REST", "SQL", "LLMs", "SAP"],
    longDescriptionEs:
      "Automatización de negocio en producción: un bot que recibe comprobantes por canales conversacionales y los carga en SAP (~90% de la carga automatizada), más una app de cotizaciones potenciada con ML + GenAI integrada a SAP y Tango (+60% de precisión). Opera en Telegram, WhatsApp, Chatwoot y Teams.",
    longDescriptionEn:
      "Business automation in production: a bot receiving receipts over conversational channels and posting them to SAP (~90% automated), plus an ML + GenAI quoting app integrated with SAP and Tango (+60% accuracy). Live on Telegram, WhatsApp, Chatwoot and Teams.",
    howItWorksEs: [
      "El usuario envía el comprobante por Telegram/WhatsApp/Chatwoot/Teams.",
      "El bot valida, extrae datos (OCR + LLM) y pide confirmación.",
      "Integración vía API con SAP para el alta del comprobante.",
      "La app de cotizaciones combina ML + GenAI con datos de SAP/Tango.",
      "Tablero de seguimiento y excepciones con intervención humana.",
    ],
    howItWorksEn: [
      "User sends the receipt via Telegram/WhatsApp/Chatwoot/Teams.",
      "The bot validates, extracts data (OCR + LLM) and asks for confirmation.",
      "API integration with SAP posts the receipt.",
      "The quoting app blends ML + GenAI with SAP/Tango data.",
      "Tracking dashboard with human-in-the-loop exceptions.",
    ],
    featuresEs: [
      "~90% de carga de comprobantes automatizada",
      "+60% de precisión en cotizaciones",
      "Multicanal: Telegram, WhatsApp, Chatwoot, Teams",
      "Integración SAP + Tango",
    ],
    featuresEn: [
      "~90% automated receipt uploads",
      "+60% quoting accuracy",
      "Multichannel: Telegram, WhatsApp, Chatwoot, Teams",
      "SAP + Tango integration",
    ],
  },
  {
    slug: "agentes-mcp",
    category: "automation",
    title: "Agentes IA + MCP",
    descriptionEs:
      "Agentes con acceso a datos de mercado, análisis técnico y herramientas externas vía MCP y TradingView para decisiones automatizadas.",
    descriptionEn:
      "Agents with access to market data, technical analysis and external tools via MCP and TradingView for automated decisions.",
    stack: ["Python", "MCP", "TradingView", "LLMs"],
    longDescriptionEs:
      "Capa de agentes que combina LLMs con herramientas externas vía MCP: datos de mercado en vivo, análisis técnico sobre TradingView y utilidades propias. Los agentes razonan con datos frescos y ejecutan workflows de decisión automatizados con trazabilidad.",
    longDescriptionEn:
      "Agent layer combining LLMs with external tools via MCP: live market data, TradingView technical analysis and custom utilities. Agents reason over fresh data and run automated decision workflows with traceability.",
    howItWorksEs: [
      "Servidores MCP exponen datos de mercado y análisis técnico como tools.",
      "El agente planifica: qué datos necesita para la decisión.",
      "Invoca tools, combina resultados y genera tesis con niveles.",
      "Workflows automatizados con log auditable de cada paso.",
    ],
    howItWorksEn: [
      "MCP servers expose market data and technical analysis as tools.",
      "The agent plans which data the decision needs.",
      "It invokes tools, combines results and writes a thesis with levels.",
      "Automated workflows with an auditable step log.",
    ],
    featuresEs: [
      "Tools MCP de mercado y análisis técnico",
      "Decisiones con datos en vivo",
      "Workflows automatizados trazables",
    ],
    featuresEn: [
      "MCP market and TA tools",
      "Live-data decisions",
      "Traceable automated workflows",
    ],
  },

  {
    slug: "cotizador-sumed",
    category: "automation",
    isPrivate: true,
    title: "Cotizador Sumed",
    descriptionEs:
      "Cotizador que integra bots conversacionales, modelado de datos y procesos en Microsoft Fabric para crear y gestionar cotizaciones de punta a punta, con observabilidad completa de la aplicación.",
    descriptionEn:
      "Quoting system integrating conversational bots, data modeling and Microsoft Fabric processes to create and manage quotes end to end, with full application observability.",
    stack: ["Bots conversacionales", "Microsoft Fabric", "Modelado de datos", "LLMs", "Observabilidad"],
    longDescriptionEs:
      "Cotizador interno para Sumed que digitaliza el ciclo completo de una cotización: el pedido entra por un bot conversacional, los datos se modelan y validan, las cotizaciones se generan sobre procesos en Microsoft Fabric y se gestiona su seguimiento y estado. Incluye observabilidad de la aplicación para monitorear cada etapa del flujo.",
    longDescriptionEn:
      "Internal quoting tool for Sumed that digitalizes the full quote lifecycle: requests arrive through a conversational bot, data is modeled and validated, quotes are generated over Microsoft Fabric processes, and their tracking and status are managed. It includes application observability to monitor every stage of the flow.",
    howItWorksEs: [
      "La solicitud de cotización entra por un bot conversacional.",
      "Los datos se normalizan y modelan (productos, precios, condiciones).",
      "Procesos en Microsoft Fabric generan y persisten la cotización.",
      "Se gestiona el ciclo de vida de la cotización: estados, versiones y seguimiento.",
      "Observabilidad de la app: métricas, logs y alertas por etapa del proceso.",
    ],
    howItWorksEn: [
      "The quote request arrives through a conversational bot.",
      "Data is normalized and modeled (products, prices, conditions).",
      "Microsoft Fabric processes generate and persist the quote.",
      "The quote lifecycle is managed: states, versions and tracking.",
      "App observability: metrics, logs and alerts per process stage.",
    ],
    featuresEs: [
      "Bots conversacionales para alta y consulta de cotizaciones",
      "Modelado y normalización de datos",
      "Procesos en Microsoft Fabric",
      "Gestión del ciclo de vida de la cotización",
      "Observabilidad end-to-end de la aplicación",
    ],
    featuresEn: [
      "Conversational bots for creating and querying quotes",
      "Data modeling and normalization",
      "Microsoft Fabric processes",
      "Quote lifecycle management",
      "End-to-end application observability",
    ],
  },
  {
    slug: "pagos-recibidos",
    category: "automation",
    isPrivate: true,
    title: "CobroKai",
    descriptionEs:
      "App de cobros que centraliza comprobantes (transferencias y cheques), extrae los datos con IA, los valida y los carga a SAP con imputación automática FICO y gestión de retenciones, con trazabilidad y observabilidad de todo el proceso.",
    descriptionEn:
      "Collection app that centralizes receipts (bank transfers and checks), extracts the data with AI, validates it and posts it to SAP with automatic FICO imputation and withholding management, with traceability and observability across the whole flow.",
    stack: ["OCR / IA", "SAP (FICO)", "Microsoft Fabric", "Automatización", "Observabilidad"],
    longDescriptionEs:
      "CobroKai ordena el circuito de cobros de punta a punta: los comprobantes entran al panel con su imagen y estado, un motor de OCR/IA extrae banco, cuenta, importe, fechas, CUIT y CVU, y el operador valida o corrige. Desde ahí se cargan a SAP, se imputan automáticamente a las facturas abiertas por FIFO (FICO) y se gestionan las retenciones, con bandeja de comprobantes, KPIs y registro de cada acción.",
    longDescriptionEn:
      "CobroKai streamlines the collections workflow end to end: receipts enter the panel with their image and status, an OCR/AI engine extracts bank, account, amount, dates, tax ID and CVU, and the operator validates or corrects them. From there they are posted to SAP, automatically imputed to open invoices by FIFO (FICO) and withholdings are managed, with a receipt inbox, KPIs and a log of every action.",
    howItWorksEs: [
      "Los comprobantes (transferencias y cheques) ingresan y se digitalizan.",
      "Un motor de OCR/IA extrae los datos: banco, cuenta, importe, fechas, CUIT y CVU destino.",
      "El operador valida o corrige y el comprobante avanza de estado (pago recibido, cargado, pendiente SAP).",
      "Se carga a SAP y se imputa automáticamente a las facturas abiertas (FICO, FIFO).",
      "Se gestionan las retenciones de SAP con sus códigos activos.",
      "Panel de cobro con KPIs, búsqueda y observabilidad de cada acción.",
    ],
    howItWorksEn: [
      "Receipts (bank transfers and checks) come in and are digitized.",
      "An OCR/AI engine extracts the data: bank, account, amount, dates, tax ID and destination CVU.",
      "The operator validates or corrects it and the receipt advances through statuses (payment received, posted, pending SAP).",
      "It is posted to SAP and automatically imputed to open invoices (FICO, FIFO).",
      "SAP withholdings are managed with their active codes.",
      "Collection panel with KPIs, search and observability of every action.",
    ],
    featuresEs: [
      "Panel de cobro con KPIs y estados",
      "Extracción de datos por OCR/IA (transferencias y cheques)",
      "Carga e imputación automática a SAP (FICO, FIFO)",
      "Gestión de retenciones de SAP",
      "Bandeja de comprobantes con búsqueda y filtros",
      "Trazabilidad y observabilidad del proceso",
    ],
    featuresEn: [
      "Collection panel with KPIs and statuses",
      "OCR/AI data extraction (transfers and checks)",
      "SAP posting and automatic imputation (FICO, FIFO)",
      "SAP withholding management",
      "Receipt inbox with search and filters",
      "Process traceability and observability",
    ],
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
    stack: ["TypeScript", "Next.js", "PostgreSQL"],
    github: "https://github.com/nomdedev/Admin-consorcios",
    longDescriptionEs:
      "Plataforma SaaS B2B2C para administración de consorcios: 28 módulos (expensas, reclamos, reservas, comunicaciones), más de 195 endpoints, 3 apps por perfil y RBAC de 8 roles. La liquidación automática de expensas elimina el trabajo manual más costoso de las administraciones.",
    longDescriptionEn:
      "B2B2C SaaS for building management: 28 modules (fees, claims, bookings, comms), 195+ endpoints, 3 profile-based apps and 8-role RBAC. Automatic expense settlement removes the most expensive manual work for managers.",
    howItWorksEs: [
      "La administración configura edificios, unidades y roles (8 perfiles RBAC).",
      "Liquidación automática de expensas con prorrateo y mora.",
      "Vecinos pagan, reclaman y reservan desde su app.",
      "3 apps separadas por perfil con 195+ endpoints compartidos.",
    ],
    howItWorksEn: [
      "Managers configure buildings, units and roles (8-profile RBAC).",
      "Automatic expense settlement with proration and late fees.",
      "Residents pay, file claims and book amenities from their app.",
      "3 profile-based apps over 195+ shared endpoints.",
    ],
    featuresEs: [
      "28 módulos de gestión",
      "Liquidación automática de expensas",
      "RBAC de 8 roles + 3 apps",
      "195+ endpoints",
    ],
    featuresEn: [
      "28 management modules",
      "Automatic expense settlement",
      "8-role RBAC + 3 apps",
      "195+ endpoints",
    ],
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
    stack: ["TypeScript", "Next.js", "FinTech"],
    longDescriptionEs:
      "App privada de finanzas compartidas para parejas: registra gastos comunes, calcula quién le debe a quién, lleva balances por categoría y presupuestos mensuales en una experiencia deliberadamente simple.",
    longDescriptionEn:
      "Private shared-finances app for couples: tracks common expenses, settles who owes whom, keeps per-category balances and monthly budgets in a deliberately simple experience.",
    howItWorksEs: [
      "Cada integrante carga gastos comunes en segundos.",
      "Cálculo automático de balances y deudas entre ambos.",
      "Presupuestos mensuales por categoría con alertas.",
    ],
    howItWorksEn: [
      "Each partner logs common expenses in seconds.",
      "Automatic balance and debt settlement.",
      "Monthly per-category budgets with alerts.",
    ],
    featuresEs: ["Gastos comunes", "Balances automáticos", "Presupuestos por categoría"],
    featuresEn: ["Common expenses", "Automatic balances", "Per-category budgets"],
  },
  {
    slug: "portofolio-app",
    category: "products",
    title: "Portofolio.app",
    descriptionEs:
      "Portfolio manager para tracking de finanzas personales: visibilidad integral de carteras, analytics de performance y alertas.",
    descriptionEn:
      "Portfolio manager for personal finance tracking: full portfolio visibility, performance analytics and alerts.",
    stack: ["TypeScript", "Next.js"],
    github: "https://github.com/nomdedev/Portofolio.app",
    longDescriptionEs:
      "Portfolio manager para finanzas personales: agrega posiciones de distintas fuentes en una vista integral, calcula performance (retornos, asignación, evolución) y emite alertas ante movimientos relevantes.",
    longDescriptionEn:
      "Personal-finance portfolio manager: aggregates positions from multiple sources into one view, computes performance (returns, allocation, evolution) and fires alerts on relevant moves.",
    howItWorksEs: [
      "Carga de posiciones manual o importada.",
      "Agregación por activo, moneda y clase.",
      "Analytics de performance y asignación.",
      "Alertas ante umbrales y movimientos.",
    ],
    howItWorksEn: [
      "Manual or imported position loading.",
      "Aggregation by asset, currency and class.",
      "Performance and allocation analytics.",
      "Threshold and movement alerts.",
    ],
    featuresEs: ["Vista integral de carteras", "Analytics de performance", "Alertas"],
    featuresEn: ["Full portfolio view", "Performance analytics", "Alerts"],
  },
  {
    slug: "dentaldesignpanel",
    category: "products",
    isPrivate: true,
    title: "DentalCare — Gestión Clínica",
    descriptionEs:
      "Plataforma de gestión para clínicas odontológicas: bot de admisión omnicanal, CRM de leads, presupuestos, seguimiento, recaptación y automatizaciones, con dashboard ejecutivo y roles y permisos.",
    descriptionEn:
      "Management platform for dental clinics: omnichannel admission bot, lead CRM, quotes, follow-up, recapture and automations, with an executive dashboard and roles and permissions.",
    stack: ["TypeScript", "Next.js", "Bot omnicanal", "Automatizaciones", "Dashboards"],
    longDescriptionEs:
      "Suite de gestión para clínicas odontológicas que cubre todo el recorrido del paciente: la conversación entra por canales como WhatsApp, Instagram, Facebook, Web Chat o Email; un bot de admisión con árbol conversacional la califica y crea el lead en el CRM; se generan presupuestos con pipeline y estados; el equipo da seguimiento y las automatizaciones y campañas de recaptación sostienen el contacto. Todo se mide en un dashboard ejecutivo y se gobierna con roles y permisos por área.",
    longDescriptionEn:
      "Management suite for dental clinics covering the whole patient journey: conversations arrive from channels such as WhatsApp, Instagram, Facebook, Web Chat or Email; an admission bot with a conversation tree qualifies them and creates the lead in the CRM; quotes are generated with a pipeline and statuses; the team follows up and automations and recapture campaigns keep contact alive. Everything is measured in an executive dashboard and governed with roles and permissions per area.",
    howItWorksEs: [
      "El paciente escribe por WhatsApp, Instagram, Facebook, Web Chat o Email.",
      "El bot de admisión lo califica con un árbol conversacional (saludo, consentimiento, datos, motivo y urgencia).",
      "Se crea el lead en el CRM y se asigna por reglas al área correspondiente.",
      "Se genera el presupuesto y se hace seguimiento hasta el cierre.",
      "Automatizaciones y campañas de recaptación sostienen el contacto (recordatorios y reactivación).",
      "Dashboard ejecutivo y configuración de usuarios, roles y permisos.",
    ],
    howItWorksEn: [
      "The patient writes via WhatsApp, Instagram, Facebook, Web Chat or Email.",
      "The admission bot qualifies them with a conversation tree (greeting, consent, details, reason and urgency).",
      "A lead is created in the CRM and assigned by rules to the right area.",
      "A quote is generated and tracked through to closing.",
      "Automations and recapture campaigns sustain contact (reminders and reactivation).",
      "Executive dashboard plus user, role and permission settings.",
    ],
    featuresEs: [
      "Bot de admisión con árbol conversacional configurable",
      "Bandeja omnicanal con ficha del paciente y score",
      "CRM de leads con asignación por reglas",
      "Presupuestos con pipeline y estados",
      "Recaptación y fidelización por campañas",
      "Centro de automatizaciones con disparadores",
      "Dashboard ejecutivo con KPIs",
      "Roles y permisos por área",
    ],
    featuresEn: [
      "Admission bot with configurable conversation tree",
      "Omnichannel inbox with patient profile and score",
      "Lead CRM with rule-based assignment",
      "Quotes with pipeline and statuses",
      "Recapture and loyalty campaigns",
      "Automation center with triggers",
      "Executive dashboard with KPIs",
      "Roles and permissions per area",
    ],
  },
  {
    slug: "fabric-sumed",
    category: "products",
    title: "Datos en Fabric",
    descriptionEs:
      "Pipeline end-to-end en Microsoft Fabric con capas Bronze/Silver/Gold sobre Lakehouse y Data Warehouse e ingesta diaria automática desde SAP: −80% en tiempos de información crítica.",
    descriptionEn:
      "End-to-end pipeline in Microsoft Fabric with Bronze/Silver/Gold layers over Lakehouse and Data Warehouse with daily automatic SAP ingestion: −80% in critical reporting times.",
    stack: ["Microsoft Fabric", "Lakehouse", "SQL", "SAP"],
    longDescriptionEs:
      "Plataforma de datos corporativa en Microsoft Fabric: ingesta diaria automática desde SAP, arquitectura medallion Bronze/Silver/Gold sobre Lakehouse + Data Warehouse y modelos listos para reporting. Redujo 80% los tiempos de información crítica del negocio.",
    longDescriptionEn:
      "Corporate data platform on Microsoft Fabric: daily automatic SAP ingestion, Bronze/Silver/Gold medallion architecture over Lakehouse + Data Warehouse and reporting-ready models. Cut critical business reporting times by 80%.",
    howItWorksEs: [
      "Ingesta diaria automática desde SAP (Bronze).",
      "Limpieza y modelado en capas Silver/Gold.",
      "Lakehouse + Data Warehouse según caso de uso.",
      "Datasets curados para reportes y decisiones (−80% tiempos).",
    ],
    howItWorksEn: [
      "Daily automatic SAP ingestion (Bronze).",
      "Cleaning and modelling in Silver/Gold layers.",
      "Lakehouse + Data Warehouse per use case.",
      "Curated datasets for reporting (−80% times).",
    ],
    featuresEs: [
      "Ingesta SAP diaria automática",
      "Arquitectura Bronze/Silver/Gold",
      "Lakehouse + Data Warehouse",
      "−80% en tiempos críticos",
    ],
    featuresEn: [
      "Automatic daily SAP ingestion",
      "Bronze/Silver/Gold architecture",
      "Lakehouse + Data Warehouse",
      "−80% critical times",
    ],
  },
]

export const featuredProjects = projects.filter((p) => p.featured)

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getAdjacentProjects(slug: string): { prev?: Project; next?: Project } {
  const idx = projects.findIndex((p) => p.slug === slug)
  if (idx === -1) return {}
  return {
    prev: idx > 0 ? projects[idx - 1] : projects[projects.length - 1],
    next: idx < projects.length - 1 ? projects[idx + 1] : projects[0],
  }
}
