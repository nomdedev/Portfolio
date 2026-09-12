# DESIGN.md — Constitución visual del portfolio

Fuente de verdad para toda decisión de UI. Los agentes deben consultarla antes de
crear o modificar componentes. Stack: Next.js 16 + React 19 + Tailwind CSS 4.
Idiomas: ES/EN (todo copy y `aria-label` vía `copy[lang]`, nada hardcodeado).

Filosofía: **rigor de movimiento Apple + estética de portfolio técnico**.
Minimalismo oscuro, un solo acento, la ingeniería a la vista
(stack, métricas, código) porque el público son reclutadores y clientes técnicos.

---

## 1. Espaciado

Base 4px (Tailwind). Gutters laterales **idénticos en toda la web**:

```
px-6 → md:px-12 → lg:px-24
```

### Ritmo vertical de sección

| Nivel            | Clase          | Uso                                            |
|------------------|----------------|------------------------------------------------|
| Apertura de acto | `py-28 md:py-32` | Hero de detalle, home hero (`pt-28 pb-16`)   |
| Base             | `py-24`          | Secciones home (about, projects, skills…)    |
| Bloque denso     | `py-16`          | Grillas internas, bloques de seguimiento      |
| Cierre           | `py-8`           | Footer                                         |

 Cabecera de sección estándar: título `mb-4` (o `mb-8/10/12` con línea),
 subtítulo `max-w-2xl mb-10`, bloque header total `mb-12`.

### Anchos máximos (3 tiers, sin excepciones nuevas)

| Tier      | Clase      | Uso                                     |
|-----------|------------|-----------------------------------------|
| `layout`  | `max-w-6xl` | Secciones home, nav                    |
| `content` | `max-w-5xl` | Ficha de proyecto, timelines           |
| `read`    | `max-w-2xl/3xl` | Párrafos, contact, subtítulos       |

 Migraciones pendientes: nav `7xl→6xl`; experience/teaching `4xl→5xl`.

### Gaps y cards

- Grillas: `gap-6`. Columna principal + sidebar: `gap-10`. Interior: `gap-2/4`.
- Cards: `p-6` (`md:p-8` solo destacados), `rounded-lg`, `border-border`.
- Píldoras/badges: `rounded-full`.

---

## 2. Color

**2 tintes, nada más:** neutro slate + **1 acento esmeralda**.
Fondo siempre oscuro (el tema claro no se diseña, solo existe el token).

```css
--background: oklch(0.14 0.01 240);   /* base */
--card:       oklch(0.17 0.01 240);   /* superficies */
--foreground: oklch(0.93 0.01 240);   /* texto principal */
--muted-foreground: oklch(0.68 0.02 240); /* texto secundario/datos */
--border:     oklch(0.28 0.01 240);   /* bordes sutiles */
--primary / --accent / --ring: oklch(0.78 0.17 160); /* esmeralda */
--secondary / --muted: oklch(0.22 0.01 240); /* chips, fondos internos */
--destructive: oklch(0.577 0.245 27.325);
```

### Roles (regla dura)

- **Esmeralda = acción y estado únicamente**: CTAs, link activo, foco,
  scrollspy, badge "destacado", contador, selección de texto (`/30`).
- **Metadata y datos = `muted-foreground`**: descripciones, captions, fechas.
- Hover de texto: `muted-foreground → primary`. Hover de card:
  `border-primary/50` + lift + sombra `var(--ring)`.
- Prohibido introducir un tercer tinte sin actualizar este doc.
  A futuro: un acento secundario por categoría de proyecto (ML/quant/agentes).

---

## 3. Tipografía

- Sans: **Geist Sans**. Mono (labels, badges, CTAs, código): **Geist Mono**.
- Display/H1: `text-3xl md:text-5xl font-bold text-balance`.
- H2 sección: `text-2xl md:text-3xl` con índice mono esmeralda (`02.`) + línea.
- H3 card: `text-lg` (`text-2xl` destacados). Cuerpo: `text-sm/base/lg muted`.
- Labels: `font-mono text-xs uppercase tracking-wider/widest muted`.
- Copy de lectura: `leading-relaxed`, ancho `read`.

---

## 4. Movimiento

**Solo `transform + opacity`.** Easing global y duraciones alineadas a Tailwind:

```css
--ease-out-expo: cubic-bezier(0.22, 1, 0.36, 1);
/* duration-150 (micro) · duration-300 (hover/lift) · duration-500 (medios) · 700ms (reveal, CSS) */
```

| Animación        | Dónde                                      | Spec                                    |
|------------------|--------------------------------------------|-----------------------------------------|
| `page-enter`     | Header de `/projects/[slug]`               | 500ms expo, stagger 0/80/160/240ms      |
| `reveal`         | Secciones, cards, pasos, features          | 700ms expo, `translateY(28px)→0`, 1 vez |
| stagger grids    | Grillas filtrables                         | `(i%6)*60ms`, tope 360ms                |
| `card-lift`      | Cards, prev/next                           | `-translate-y-1` 300ms + borde + sombra |
| `btn-press`      | Filtros, CTAs                              | `active:scale-[0.97]` 150ms             |
| `link-arrow`     | Ver detalle/código, prev/next              | Flecha `translateX(±2px)` 300ms (nunca animar `gap`) |
| `gallery`        | Lightbox overlay/contenido                 | fade 200ms / `scale(.96→1)` 250ms expo  |
| `img-blur-up`    | Imágenes (`next/image` + `onLoad`)         | `blur(12px)→0 + scale(1.04→1)` 500ms    |
| `shimmer`        | Skeleton hasta `onLoad/onError`            | 1.4s linear, se remueve al cargar       |
| `ticker`         | Cinta keywords                             | 36s linear infinite, pausa solo `pointer:fine` |
| `spotlight`      | Glow cursor en cards                       | opacity 400ms, radial 320px fijo        |
| `magnetic`       | Solo CTA primario del hero                 | rAF lerp 0.18, máx ±6px, solo `pointer:fine` |

### Prohibiciones

1. No `transition-all` en hot paths → `transition-[transform,border-color,color,box-shadow]`.
2. No animar `gap`, `width/height`, `blur` ni `backdrop-filter`.
3. No stagger sin tope ni `delay > 400ms`.
4. No `will-change` permanente; no `getBoundingClientRect` en scroll.
5. No agregar motion/GSAP donde CSS alcance (GSAP solo para scrub scrollytelling).
6. `prefers-reduced-motion`: cero movimiento, contenido siempre visible,
   ticker envuelto, scroll `auto`.

---

## 5. Interacción

Dos lenguajes, cada uno en su zona:

- **Hero = firma**: magnetic + spotlight + role-rotator. Único lugar con delight.
- **Resto = Apple puro**: press sutil, transiciones reversibles,
  **el scroll como interacción principal** (scrollspy, barra de progreso,
  reveals, scrub para lo grande).

Reglas transversales:

- Targets táctiles ≥ 44px. `:focus-visible`: outline 2px `var(--ring)` offset 3px.
- Navegación con anclas absolutas (`/#about`) para funcionar desde subrutas.
- Lightbox: Radix Dialog (trap de foco + `Esc` + retorno de foco nativos),
  flechas `←/→`, contador con `aria-live`, captions bilingües.
- Filtros: `aria-pressed` + contador `aria-live="polite"`.
- Mobile (`pointer:coarse`): sin magnetic/spotlight/lift, grid 1 col, sin overflow-x.
- Demo externa: facade click-to-load, nunca iframe autoplay.

---

## 6. Medios y máscaras

- Convención: `public/projects/<slug>/01-cover.svg` (placeholder) →
  `01-cover.webp, 02-*.webp…` + `00-og.jpg` (1200×630).
- Hero 1600×1000 <200KB webp q75-80; thumbs <80KB; `aspect-[16/10]` fijo (cero CLS);
  `priority` solo cover, resto `lazy`; presupuesto **<1MB por página**.
- Máscaras (`app/globals.css`): `mask-fade-y` (scrolly-video),
  `mask-fade-x`, `mask-fade-b/t` (empalmes), `mask-spot`,
  `mask-reveal-y` (progresiva vía `--reveal` 0→1 con GSAP scrub; default 1 sin JS).
- Privados sin capturas: 1 diagrama abstracto + badge "Privado".

---

## 7. Checklist pre-merge (10 min)

- [ ] Performance 6x CPU: scroll home + detalle sin barras rojas de Layout.
- [ ] Stagger ≤360ms; page-enter sin flash (key por `slug`).
- [ ] Imágenes: shimmer <1s → blur-up nítido, sin layout shift.
- [ ] Lightbox: `Esc`/flechas/foco/swipe OK.
- [ ] Reduced-motion activado: todo estático y visible.
- [ ] Mobile 360px: sin overflow-x, CTAs ≥44px.
- [ ] `tsc --noEmit` + `npm run build` verdes.
- [ ] Este doc actualizado si se agregó un patrón nuevo.

Última actualización: Septiembre 2026.
