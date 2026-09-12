# Plan — Responsive de punta a punta (360px → 2560px)

Estado: **revisado con /autoplan** (Fases 1-4, voz única degradada — ver §A0) · **ejecutado**
Fecha: 2026-09-12 · Rama: `main` · HEAD revisado: `3c4fcf2` · Repo: Portfolio (Next.js 16 + React 19 + Tailwind 4)
Punto de restauración previo: `plans/.reviews/main-autoplan-restore-20260912-192531.md`

## Estado de ejecución (2026-09-12)

| Tarea | Estado | Verificación (medida, no estimada) |
|-------|--------|------------------------------------|
| R3 · Hero móvil | Hecho | CTA en el primer pantallazo: 320×640 `y=388/640` · 360×640 `388/640` · 390×844 `356/844` · 768×1024 `524/1024` · 1024×768 `686/768` · 1440×900 `696/900` · 1920×1080 `786/1080`. Antes: 811 en 360×640. Incluye reordenamiento `<lg` (el recorte de espaciado solo daba ~112px de los 171 que faltaban) |
| R1 · Nav desde 1024 | Hecho | 1024: necesario 727px (ES) / 677px (EN) vs 824 disponibles → aire 97px / 148px, `nav.scrollWidth - clientWidth = 0`, índices ocultos hasta `xl` |
| R1b · Menú móvil | Hecho | Abre → `body.overflow = hidden`, foco dentro del panel; `Tab` ×12 no escapa; `Esc` cierra, libera el scroll y devuelve el foco al botón |
| R2 · Rieles desde 1024 | Hecho | 1024/1280/1440/1920: riel `24→68`, contenido desde 96 → 0 colisiones sobre `#hero h1/p/dl/a` y `h2` de secciones. 768 y 390: rieles ocultos |
| R4 · Ficha en 1 columna hasta 1023 | Hecho | 768: 1 columna, lectura 672px (≥560), `aside` estático. 1024: `600px 280px`, sticky |
| R5 · Tier `2xl` | Hecho | 1535 → sección 1152px · 1920 → 1280px (ratio 0.67) · 2560 → 1280px |
| R6 · Matriz de tests | Hecho | `pnpm run test`: **31/31** en build de producción (11 existentes + 20 nuevos: 9 viewports × ES/EN + menú móvil + ficha) |
| R7 · `clamp()` en gutters | Postergada | Sin problema medido (decisión T5 del gate) |
| R8 · Ancho del canvas | Hecho | `canvas.width == documentElement.clientWidth` en 320/390/768/1024/1440/1920 (antes: +8px por la barra de scroll) |
| Documentación | Hecho | DESIGN.md: tiers + mapa de anchos + contrato del menú móvil + checklist pre-merge |

Verificación global: `pnpm exec tsc --noEmit` limpio · `pnpm run lint` limpio · `pnpm run build` OK · `pnpm run test` 31/31.


## Contexto

Tres tiers de ancho (`max-w-6xl`, `5xl`, `2xl`) y tres gutters (`px-6 → md:px-12 → lg:px-24`).
Medición real (Chrome + CDP, dev server): **no hay overflow horizontal en ningún ancho**
(320…1920 medidos), pero hay cuatro zonas donde el layout no está pensado para todos los
anchos, más un agujero de verificación (una sola matriz de tests a 1280×720).

### Evidencia (medida, no estimada)

| # | Hallazgo | Medición |
|---|-----------|----------|
| E1 | Rieles laterales pisan el contenido entre 768 y 1023 | 768: riel izq. `24→68`, contenido (`h1`/stats/CTA) empieza en `48` → **20px de solape**; a 1024: riel `48→92`, contenido `96` (4px de aire) |
| E2 | **Corregido durante la revisión:** el nav desktop NO entra a 1024 | forzando la `ul` desktop a `display:flex` a 1024: disponible `824px` vs necesario `935px` (ES) / `885px` (EN). El `xl` actual está justificado (comentario en `navigation.tsx:139`) |
| E2-bis | Pero sí entra ocultando los índices `0N.` | cada índice mide `25px` → 5×25 = `125px`. Ocultándolos: ES `+15px`, EN `+65px` de margen; sumando `gap-6` en lugar de `gap-8`: ES `+47px` |
| E3 | Ficha de proyecto a dos columnas desde `md` (768) | 768: `gridTemplateColumns: 344px 280px` → columna de lectura de **344px**, igual que en un teléfono de 390 |
| E4 | Hero móvil no entra en el primer pantallazo | 360×640: contenido 869px; CTA "Ver proyectos" en `y=783` (pliegue 640), redes `937`, cue "Desplázate" `987` (invisible) |
| E5 | Ultraancho desbalanceado | 1920: columna `max-w-5xl` centrada, gutter fijo `px-24`; rieles a ~450px del contenido |
| E6 | Matriz de tests única | `playwright.config.ts`: sólo `devices['Desktop Chrome']` (1280×720) |
| E7 | Comportamiento móvil del menú sin contención | `navigation.tsx:190`: panel `absolute top-full` sin focus trap ni scroll lock; `Esc` sí está |

Ya resuelto y verificado en la sesión previa (parte del mismo esfuerzo): `main` sin fondo
opaco (tapaba el fondo animado por completo — bug de visibilidad, no de layout),
`min-h-screen → min-h-svh`, y el acople de scroll reescrito (`lib/scroll-driver.ts`).

## Objetivo

Que la web se lea y se use bien en cualquier ancho real (360 → 2560), sin solapes, sin
columnas de lectura ridículas, con la navegación disponible donde corresponde y con una
matriz de tests que lo verifique en ES y EN.

## Fuera de alcance

- Rediseño visual, copy o estructura de secciones. Tema claro (DESIGN.md: no se diseña).
- Cambios en el fondo animado más allá de R8 (ya implementado y verificado).

---

## Tareas

### R1 · Nav: llevar el tier desktop a 1024, compactando (no sólo moviendo el corte)
`components/portfolio/navigation.tsx:141` (`hidden xl:flex`), `:149-153` (índices), `:170`, `:190`.
Cambio: los índices `0N.` quedan `hidden xl:inline` y la lista usa `gap-6 xl:gap-8`.
Medido: a 1024 el nav entra con `+47px` (ES) y `+97px` (EN) de margen; por debajo de 1024
sigue la hamburguesa. Alternativa conservadora: dejar el corte en 1280 y documentarlo
(TASTE T1).
Criterio: a 1024/1152/1280 el nav desktop se ve completo **en ES y EN** sin desbordar el
gutter; `aria-current`, `Esc` y foco intactos.

### R1b · Menú móvil: contención de foco y scroll
`components/portfolio/navigation.tsx:190-230` (radio de impacto de R1, P2).
Falta focus trap, scroll lock del body y devolución de foco al cerrar. Hoy sólo hay `Esc`.
Criterio: con el menú abierto, `Tab` no sale del panel, el fondo no scrollea, al cerrar
el foco vuelve al botón. TASTE T6.

### R2 · Rieles laterales: mostrarlos desde 1024 con offset fijo de 24px
`components/portfolio/side-elements.tsx:13,30` (`hidden md:flex fixed left-6 lg:left-12`).
Cambio: `hidden lg:flex` y sacar el `lg:left-12` (queda `left-6`). Medido a 1024: riel
`24→68` vs contenido `96` → 28px de aire (hoy 4px con `left-12`).
Rechazado: subir el gutter del contenido a `md:px-20` (rompe la simetría de gutters de
DESIGN.md §1); rieles desde `xl` (pierde la firma visual en laptops 1024-1279).
Criterio: en ningún ancho un riel cruza texto o CTA (verificado por medición de rects).

### R3 · Hero móvil: CTA primario dentro del primer pantallazo
`components/portfolio/hero.tsx`: `pt-28`, `mb-10/12`, `text-4xl`, stats de 3 líneas.
Cambio: `pt-24 sm:pt-28`, reducir a `mb-8` los bloques de copy/stats/CTA y bajar el
`gap-y` de los stats.
Criterio: a 360×640, 390×844 y 844×390 (landscape) el CTA primario y las redes entran sin
scroll, y el cue "Desplázate para explorar" es visible o se reemplaza por una señal que sí
lo sea (TASTE T4/T7). Sin perder la jerarquía tipográfica de DESIGN.md §3.

### R4 · Ficha de proyecto: dos columnas desde 1024, no desde 768
`components/portfolio/project-detail.tsx:221` (`grid md:grid-cols-[1fr_280px]` → `lg:`).
Criterio: a 768 la columna de lectura mide ≥560px (o el `aside` va abajo); a 1024+ sticky intacto.

### R5 · Ultraancho (≥1536): composición, no aire
Hoy el contenido no escala arriba de 1024–1152 y el gutter queda fijo en 96px.
Cambio propuesto: tier `2xl` (`max-w-7xl` en secciones de ancho `layout`) manteniendo los
rieles anclados al viewport. Rechazado: gutter fluido con `clamp()` en todas las secciones
(R7, se posterga: cambia 12 archivos sin resolver un problema medido).
Criterio: a 1920/2560 la relación contenido/aire no supera ~1/3; los rieles siguen lejos
del contenido sin quedar huérfanos (TASTE T3).

### R6 · Matriz de tests responsive (Playwright)
`playwright.config.ts` + nuevo `tests/responsive.spec.ts`. Viewports: 320×640, 360×640,
390×844, 844×390, 768×1024, 1024×768, 1280×800, 1440×900, 1920×1080. **En ES y EN.**
Aserciones: (a) `scrollWidth <= clientWidth + 1`; (b) CTA primario del hero dentro del
viewport en móvil; (c) nav desktop en `≥1024` y hamburguesa por debajo; (d) ningún
elemento de contenido solapa un riel lateral; (e) **contrato del fondo**: `background-color`
de `<main>` transparente y canvas cubriendo el viewport (regresión del bug de visibilidad);
(f) refuerzo de zoom 200% (viewport de 640 de ancho) sin overflow.
Criterio: la suite falla si se rompe cualquiera de las seis.

### R7 · Gutter fluido con `clamp()` — **postergada**
No hay problema medido que lo justifique (los saltos 24→48→96 no producen artefactos en
ninguna captura). Queda en `plans/TODOS.md` si aparece.

### R8 · Canvas: ancho del área de contenido, no de la ventana
`components/animated-background.tsx`: usa `window.innerWidth` (incluye la barra de scroll:
8px medidos a 768). Cambio: `document.documentElement.clientWidth`.
Criterio: `canvas.getBoundingClientRect().width === documentElement.clientWidth`.

---

# Revisión /autoplan

## A0 · Matriz de degradación (voz doble)

| Voz | Estado | Efecto |
|-----|--------|--------|
| Claude subagente (Agent/delegate) | **No disponible** — el subagente murió con `HTTP 404: model: deepseek-flash` (5 reintentos) | Sin segunda voz |
| Codex (`codex exec`) | **No instalado** (`command -v codex` → vacío) | Sin voz adversarial |
| Claude CLI (`claude -p`) como sustituto | **No autenticado** — `401 OAuth access token has been revoked` | Sin voz externa |

**Modo resultante: `single-reviewer` (una voz).** Todo lo que sigue es la fase ejecutada a
profundidad por el reviewer principal. Los recuadros "CONSENSUS" se llenan con `N/A` y no
cuentan como CONFIRMED. Riesgo declarado: sin voz adversarial, los puntos ciegos
estructurales que dependen de un lector independiente quedan sin cubrir.

---

## Fase 1 — CEO (estrategia y alcance)

### 0A · Premisas (NO auto-decididas)

| # | Premisa | Estado | Cómo se verificó / qué falta |
|---|---------|--------|------------------------------|
| P1 | El problema es de layout, no de contenido ni de fondo | Verificada | E1-E5 medidos; el fondo ya se arregló aparte |
| P2 | El tráfico móvil justifica el esfuerzo | **Sin verificar** | Hay `@vercel/analytics` instalado; el plan no consultó datos reales de uso |
| P3 | Los 3 tiers de ancho y 3 gutters de DESIGN.md son contrato, no se rehacen | Asumida | Si esto se cae, el plan entero cambia de forma |
| P4 | Los breakpoints de Tailwind alcanzan (sin container queries) | Verificada por lectura | 20 componentes usan `md`/`lg`; ninguna necesidad de container queries |

### 0B · Qué ya existe (sub-problema → código)

| Sub-problema | Ya existe | Se reutiliza |
|--------------|-----------|--------------|
| Scrollspy de secciones | `navigation.tsx:89-104` (IntersectionObserver) | Sí, sin cambios |
| Barra de progreso de scroll | `navigation.tsx:65-86` + `:233-237` | Sí, sin cambios |
| Reveals por sección | `components/portfolio/reveal.tsx` | Sí |
| Cabecera de sección única | `section-header.tsx` | Sí (evita duplicar paddings) |
| Driver de scroll compartido | `lib/scroll-driver.ts` (nuevo esta semana) | Sí: lo consume el fondo; la nav mantiene el suyo |
| Máximo de ancho por tier | DESIGN.md §1 | Sí, es el contrato de R5 |

Evita duplicar: no se crea un segundo listener de scroll, no se crea un sistema de layout
nuevo, no se agregan dependencias.

### 0C · Estado soñado

```
CURRENT (hoy)                      ESTE PLAN (R1-R8)                12-MESES IDEAL
─────────────────────────────────  ───────────────────────────────  ─────────────────────────────
· Desktop real desde 1280          · Desktop desde 1024 (nav+rieles)  · 3 tiers fluidos
· Rieles pisan el texto 768-1023   · Sin solapes, medido              · Sistema de layout con tests
· Hero móvil: CTA bajo el pliegue  · CTA en el primer pantallazo      · Métricas de conversión móvil
· Ficha: columna de 344px a 768    · Columna ≥560px o aside abajo     · Lectura óptima verificada
· 1 viewport de test (1280×720)    · 9 viewports × 2 idiomas          · Matriz + presupuesto de perf
· Fondo animado invisible          · Fondo visible + reactivo         · (hecho)
```

Delta: el plan cierra los tres huecos que hoy se ven a ojo desnudo y crea la red de
seguridad (R6) sin la cual los siguientes cambios de UI vuelven a romperse en silencio.

### 0C-bis · Alternativas de implementación

| Enfoque | Esfuerzo | Riesgo | Pros | Contras |
|---------|----------|--------|------|---------|
| A) Arreglos puntuales por breakpoint (plan actual) | 1-1.5 d | Bajo | Cambios chicos, cada uno verificable con medición | Deja el sistema escalonado (R7 postergado) |
| B) Reescribir el layout con container queries + clamp global | 3-4 d | Alto | Sistema moderno, fluido de verdad | Toca 20 componentes, sin problema medido que lo justifique, rompe la simetría de gutters |
| C) Rediseñar la home mobile-first desde cero | 5+ d | Alto | Podría mejorar conversión real | Fuera de alcance; riesgo de perder la firma visual (magnetic/spotlight/red del fondo) |

Elegida: **A** (P3 pragmático + P6 sesgo a la acción). B se rechaza por P4/P5: duplica un
sistema que funciona y no hay medición que lo pida. C es otra iniciativa, no este plan.

### 0D · Modo: SELECTIVE EXPANSION — decisiones de alcance

- **Aprobado dentro del radio de impacto (P2):** R1b (menú móvil con foco/scroll lock) —
  `navigation.tsx` ya se toca en R1, es <1 día, y hoy el panel deja el foco suelto.
- **Aprobado (P1, completitud):** R6 gana `844×390` (landscape), idioma EN, zoom 200% y la
  aserción E del contrato del fondo (regresión del bug que tapaba el fondo).
- **Rechazado (P3):** `clamp()` global en gutters (R7) → a TODO.
- **Rechazado (P4):** cualquier "sistema de breakpoints" nuevo.

### 0E · Interrogatorio temporal

- **HORA 1** (R1+R2+medición): el nav y los rieles quedan coherentes en 1024; riesgo: romper
  `aria-current`/scrollspy → cubierto por los tests existentes + R6c.
- **HORA 2-3** (R3+R4): el hero móvil y la ficha dejan de verse rotos; riesgo de "afinar de
  más" la tipografía → el criterio de aceptación es que el CTA entre, no un número de px.
- **HORA 4** (R5+R8): ultraancho y el ancho del canvas; riesgo bajo.
- **HORA 6+** (R6): la matriz de tests es la que paga el resto: cualquier regresión posterior
  se detecta sola. Si se corta el tiempo, R6 no se posterga, se posterga R5.

### 0F · Confirmación de modo

SELECTIVE EXPANSION confirmado: se expande sólo dentro del radio de impacto (nav, tests) y
se rechaza todo lo que implique reescribir el sistema de layout.

### Registro de errores y rescates (sección 2)

| Fallo | Cómo se detecta | Rescate |
|-------|------------------|---------|
| Nav desborda el contenedor en EN | R6c a 1024 en EN | `gap-6` + índices ocultos (medido: +97px) |
| Riel solapa texto | R6d (rects) | `hidden lg:flex` + `left-6` |
| CTA fuera del pliegue | R6b | R3 |
| Columna de lectura < 560px | R6 (medida de ancho) | R4 (`lg:`) |
| Fondo tapado por un `bg-background` | R6e (`main` transparente + canvas cubriendo) | Quitar el fondo del ancestro (ya hecho) |
| Overflow horizontal por texto largo | R6a en 9 viewports y 2 idiomas | `whitespace-nowrap` puntual / `break-words` |

### Registro de modos de fallo (sección de riesgos)

| Modo | Severidad | Mitigación en el plan |
|------|-----------|------------------------|
| Subagentes/voces no disponibles → revisión ciega | Alta (proceso) | Declarado en §A0; el usuario decide si quiere otra pasada |
| Cambiar el corte del nav rompe scrollspy | Media | R6c + tests existentes de homepage |
| Hero "optimizado" pierde la firma visual | Media | Criterio explícito: sólo entran CTA/redes; el resto no se toca |
| `min-h-svh` en navegadores viejos | Baja | Fallback natural (sin min-height) — no rompe, sólo no limita |
| Tocar `main` (sin fondo) y volver a romper el fondo animado | Media | R6e lo detecta automáticamente |

### Fase 1 — Resumen de completitud

| Sección | Estado |
|---------|--------|
| Premisas | 4 nombradas, 1 sin verificar (P2), 1 asumida (P3) |
| Problema correcto | Sí, con reencuadre: el ítem de mayor valor es R3, no los breakpoints |
| Calibración de alcance | Correcta; se sumó R1b, se postergó R7 |
| Alternativas | 3 evaluadas con esfuerzo/riesgo; elegida la más chica que cubre el problema |
| Riesgos de mercado/competencia | N/A (portfolio personal, no producto competitivo) |
| Trayectoria a 6 meses | Sin deuda nueva: todo cambio viene con su aserción en R6 |

**CONSENSUS (CEO): N/A — voz única.** 2 desacuerdos con el plan original, detectados por
medición: (1) R1 decía "a 1024 ya entran" → **falso**, hacen falta 111px; (2) la matriz de
tests no contemplaba EN ni landscape.

---

## Fase 2 — Diseño (UI scope: sí)

Completitud del diseño: **6/10** → el plan describe dónde está roto pero no cómo se ve
arreglado (falta especificar el comportamiento del cue y la jerarquía en landscape).
DESIGN.md consultado: sí (§1 espaciado/gutters/tiers, §3 tipografía, §4 movimiento,
§5 interacción mobile, §8 checklist pre-merge).

| Pass | Dimensión | Nota | Hallazgos |
|------|-----------|------|-----------|
| 1 | Jerarquía de información | 7/10 | El CTA del hero queda debajo de los stats en móvil; el orden actual (copy → bio → stats → CTA → redes) es correcto en desktop, pero en 360×640 empuja el CTA fuera. Fix en R3 sin reordenar |
| 2 | Estados (vacío/carga/error) | 7/10 | Los estados del menú móvil (abierto/cerrado) no tienen contención de foco ni scroll lock → R1b |
| 3 | Estados de breakpoint | 4/10 | **La zona 768-1023 es la peor: nav hamburguesa + rieles que pisan texto + ficha a dos columnas con 344px.** Los tres problemas coinciden en el mismo rango. Fix: 768-1023 = "tablet": sin rieles, nav hamburguesa, una columna en la ficha |
| 4 | Specificity | 5/10 | El plan dice "CTA visible" pero no fija qué se sacrifica (interlineado, tamaño de stats). Decisión explícita para el implementador (TASTE T4) |
| 5 | Responsive strategy | 6/10 | Intencional (tiers + gutters), pero sin un mapa de "qué ancho es qué dispositivo". Se agrega aquí: **<640 teléfono · 640-1023 tablet · 1024-1535 laptop · ≥1536 escritorio ancho** |
| 6 | Accesibilidad | 6/10 | Targets ≥44px ya están; falta foco contenido en el menú, y verificar contraste del texto sobre la red activada (la activación sube el brillo local: alpha máx 0.94 en nodos, 0.5 en halos → contraste del blanco se mantiene) |
| 7 | Movimiento y máscaras | 8/10 | Fondo y scroll ya alineados a DESIGN.md §4; el plan no introduce motion nuevo (correcto: R1-R8 son layout) |

**Litmus scorecard (Diseño): N/A — voz única.**
Deuda de diseño declarada: el plan define criterios medibles pero no mockups; en un
portfolio de una sola persona eso es aceptable (P3), y a cambio la verificación es por
medición en navegador real, no por opinión.

---

## Fase 3 — Ingeniería

### Scope challenge (con lectura de código)

No se reduce alcance (P2). Se corrige R1 con medición y se confirma R4 con medición
(344px vs 560px objetivo). Punto más fuerte del plan: R6 convierte cada criterio en una
aserción ejecutable; sin eso, cuatro de las ocho tareas son "arreglos sin red".

### Arquitectura (ASCII)

```
                      app/layout.tsx
                            │
        ┌───────────────────┴────────────────────┐
        │                                        │
  AnimatedBackground (fixe, -z-10)          <main> (SIN fondo: contrato R6e)
        │                                        │
   ┌────┴─────┬──────────────┐            Navigation (nav / hamburguesa / progreso)
   │          │              │                   │
 bg-background bg-grid   canvas (red)      SectionHeader + secciones
   │                       │                   │
   │             subscribeScroll ◄────── lib/scroll-driver.ts (1 listener scroll + rAF)
   │                                        │  escribe --scroll-progress / --scroll-vel
   └──────────► .scroll-glow (CSS) ◄────────┘
```

Acoplamientos: el canvas depende del driver (una sola vía); ninguna sección conoce al
fondo. R1/R2/R3/R4/R5 tocan componentes de sección, sin acoplarse entre sí.

### Mapa de tests (codepath → cobertura)

```
codepath                                          test que lo cubre
────────────────────────────────────────────────  ──────────────────────────────────────────
navigation.tsx: breakpoint 1024 + índices         R6c (nav visible ≥1024, hamburguesa <1024, ES/EN)
navigation.tsx: menú móvil (R1b)                  R6 nuevo: foco contenido + scroll lock
side-elements.tsx: rieles (R2)                    R6d (rects de riel vs contenido)
hero.tsx: hero móvil (R3)                         R6b (CTA dentro del viewport, 3 tamaños)
project-detail.tsx: columnas (R4)                 R6 (ancho de columna de lectura a 768)
secciones: overflow                              R6a (9 viewports × 2 idiomas)
main/sin fondo + canvas (contrato del fondo)      R6e (regresión del bug de visibilidad)
animated-background.tsx: ancho del canvas (R8)    R6e (rect del canvas == clientWidth)
scroll-driver.ts                                  (sin test directo: verificación por medición
                                                   de --scroll-progress en navegador, ya hecha)
homepage/detail/cv-link (existentes)              11 tests Playwright actuales (verdes hoy)
```

Artefacto de plan de tests: `plans/.reviews/eng-test-plan.md`.

### Modos de fallo con evaluación de brecha crítica

| Modo | Impacto | ¿Cubierto? |
|------|---------|-----------|
| Un `bg-background` vuelve a tapar el fondo | Fondo invisible (ya pasó) | Sí: R6e |
| Cambio de idioma altera anchos y rompe el nav | Falla de layout silenciosa | Sí: R6 en EN |
| Landscape mobile (altura 390) | CTA inalcanzable en el primera pantalla | Sí: 844×390 en la matriz |
| Zoom 200% del usuario | Reflow roto | Sí: R6f |
| Datos de analytics (P2) que contradigan el foco en móvil | Esfuerzo mal priorizado | **No**: requiere que el usuario mire `/analytics` |

**Fase 3 — Resumen de completitud:** arquitectura ✓, mapa de tests ✓, modos de fallo ✓,
"no en alcance" ✓, "qué ya existe" ✓. Voz doble: **N/A (single-reviewer)**.

---

## Fase 3.5 — DX: **saltada**

Motivo: en Fase 0 el detector de DX no disparó. Términos de DX en el plan: sólo
"Playwright"/"viewport" (herramientas internas, no superficie para terceros). El producto
es un portfolio personal: no expone API, CLI, SDK ni paquete instalable. No hay usuario
desarrollador externo cuya experiencia mejorar.

## Temas cruzados entre fases

1. **La franja 768-1023 es el agujero compartido:** diseño (pass 3), ingeniería (R2/R4) y
   CEO (reencuadre) apuntan al mismo lugar. Un solo concepto la ordena: 768-1023 = tablet,
   sin rieles, una columna, hamburguesa.
2. **Verificación > opinión:** las dos correcciones del review (nav y columna de lectura)
   salieron de medir, no de leer. La lección entra al repo como R6.
3. **El fondo se arregló sin estar en el plan:** la regresión de visibilidad se documenta
   como contrato (DESIGN.md §4.7) y como test (R6e), para que no vuelva.

---

## Decision Audit Trail

<!-- AUTONOMOUS DECISION LOG -->

| # | Fase | Decisión | Clasificación | Principio | Rationale | Rechazado |
|---|------|----------|---------------|-----------|-----------|-----------|
| 1 | 0 | Correr Fase 2 (Diseño) | Mechanical | P1 | UI scope detectado (componentes, layout, nav, grilla) | Saltarla |
| 2 | 0 | Saltar Fase 3.5 (DX) | Mechanical | P3 | Sin superficie para desarrolladores externos | Correrla "por completitud" |
| 3 | 1 | Corregir R1: no bajar el corte sin compactar | User Challenge | — | Medición: hacen falta 111px (ES)/61px (EN) para entrar a 1024 | Bajar el corte sin medir |
| 4 | 1 | Agregar R1b (foco/scroll lock del menú móvil) | Taste | P2 | Está en el radio de impacto de R1 y hoy el foco queda suelto | Dejarlo a otro PR |
| 5 | 1 | Agregar landscape 844×390 a la matriz | Mechanical | P1 | Un viewport más, costo cero | Ignorarlo |
| 6 | 1 | Correr los tests en ES y EN | Mechanical | P1 | EN mide 50px menos de holgura en el nav | Sólo ES |
| 7 | 1 | Agregar R6e (contrato del fondo) | Mechanical | P2 | Regresión real ocurrida; <1 día | Confiar en que no vuelve |
| 8 | 1 | Postergar R7 (`clamp()` en gutters) | Taste | P3 | No hay problema medido; toca 12 archivos | Hacerlo ahora |
| 9 | 2 | Fijar el mapa de anchos (<640 / 640-1023 / 1024-1535 / ≥1536) | Taste | P1 | Da un marco explícito al 768-1023 hoy indefinido | Dejar la franja sin nombre |
| 10 | 2 | No tocar el brillo del fondo por contraste | Mechanical | P5 | La activación local no baja el contraste del texto (verificado en capturas) | Oscurecer la red |
| 11 | 3 | Mantener 9 viewports (no 12) | Mechanical | P3 | 9 cubren los cortes reales; más viewports = suite lenta sin señal nueva | Agregar 2560/3840 |
| 12 | 3 | R8 se implementa con R5, no antes | Mechanical | P5 | Un solo ciclo de verificación para los dos cambios de fondo | Meterlo en este mismo commit |

Nada de esto reemplaza la decisión del usuario en T1-T7 (gate).

---

## Verificación pre-gate

- [x] Premisas nombradas (4) y marcadas las no verificadas
- [x] Fases ejecutadas: CEO, Diseño (UI scope), Ingeniería; DX saltada con motivo escrito
- [x] Registro de errores y rescates + registro de modos de fallo
- [x] "No en alcance" y "qué ya existe" escritos
- [x] Delta de estado soñado
- [x] Diagrama ASCII de arquitectura + mapa de tests → codepath
- [x] Plan de tests en disco (`plans/.reviews/eng-test-plan.md`)
- [x] Temas cruzados
- [x] Audit trail con una fila por decisión (12)
- [ ] Voces dobles: **no disponibles** (§A0) — se declara, no se finge

---

## Fase 4 — Gate de aprobación

### Decisiones de gusto (las tenés que elegir vos)

| # | Decisión | Opción A (recomendada) | Opción B | Costo de equivocarse |
|---|----------|------------------------|----------|----------------------|
| T1 | Corte del nav | Compactar (ocultar índices + `gap-6`) y mostrar el nav desde 1024 | Dejarlo en 1280 y documentarlo | Bajo: 1024-1279 sigue con hamburguesa |
| T2 | Rieles laterales | Desde 1024 con offset 24px | Eliminarlos (sólo redes en el footer) | Bajo: es decoración |
| T3 | Ultraancho | Tier `2xl` (max-w-7xl) desde 1536 | No tocar (queda aire) | Bajo |
| T4 | Hero móvil | Reducir espaciado para que entre el CTA (sin tocar el copy) | Reordenar: CTA antes de los stats | Medio: cambia el orden de lectura |
| T5 | `clamp()` en gutters (R7) | Postergar | Hacerlo ahora | Medio: 12 archivos, sistema duplicado |
| T6 | Menú móvil (R1b) | Foco contenido + scroll lock ahora | Dejarlo para otro PR | Bajo |
| T7 | Cue "Desplázate" en móvil | Ocultarlo bajo `md` (hoy queda bajo el pliegue) | Convertirlo en botón real (44px) a `#about` | Bajo |

### Desafíos al usuario (una sola voz, sin segunda opinión)

**UC1 — "a 1024 ya entran" era falso.** Vos pediste "adaptarse a todos los anchos"; el
plan original asumía gratis el corte a 1024. Medición: sobran -111px (ES) / -61px (EN).
Recomiendo la opción A de T1 (compactar). Qué contexto puedo estar perdiendo: si preferís
la hamburguesa abajo de 1280 porque es lo habitual en portfolios, la "A" es trabajo
innecesario. Si me equivoco: 1 archivo, 3 líneas de diff.

**UC2 — el ítem de mayor valor no es un breakpoint.** Hoy, en 360×640, el CTA primario está
a 143px por debajo del pliegue: un reclutador en móvil ve la bio antes de ver un botón.
Recomiendo ejecutar R3 primero, antes de R1/R2/R5. Costo de equivocarme: se hace primero un
ajuste de espaciado que a lo sumo no cambia nada.

**UC3 — premisa sin verificar (P2).** El plan asume que el móvil importa. Se verifica con
`@vercel/analytics` en 30 segundos. Si el tráfico móvil es marginal, R3 baja de prioridad.

### Tareas de implementación (agregadas)

| # | Tarea | Archivo principal | Depende de |
|---|-------|-------------------|------------|
| R3 | Hero móvil: CTA dentro del primer pantallazo | `components/portfolio/hero.tsx` | T4, T7 |
| R1 | Nav desde 1024 compactando índices + `gap` | `components/portfolio/navigation.tsx` | T1 |
| R2 | Rieles desde 1024 con offset 24px | `components/portfolio/side-elements.tsx` | T2 |
| R4 | Ficha de proyecto a dos columnas desde 1024 | `components/portfolio/project-detail.tsx` | — |
| R1b | Menú móvil: foco + scroll lock | `components/portfolio/navigation.tsx` | T6 |
| R6 | Matriz de tests responsive (6 aserciones) | `playwright.config.ts`, `tests/responsive.spec.ts` | R1-R4 |
| R5 | Tier `2xl` para ultraancho | secciones de ancho `layout`, DESIGN.md §1 | T3 |
| R8 | Canvas: `clientWidth` en vez de `innerWidth` | `components/animated-background.tsx` | R5 |

Orden recomendado: **R3 → R1+R2+R4 (+R1b) → R6 → R5+R8.**

## Criterio de aceptación global

`pnpm exec tsc --noEmit`, `pnpm run lint`, `pnpm run build` y `pnpm run test` (incluida la
matriz de R6, con lo que la suite pasa de 11 a ~30 casos) en verde, más capturas medidas en
360/768/1024/1440/1920 en ES y EN sin solapes ni overflow.
