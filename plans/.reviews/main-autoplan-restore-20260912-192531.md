# Plan — Responsive de punta a punta (de 320px a 2560px)

Estado: borrador para revisión (`/autoplan`)
Fecha: 2026-09-12 · Rama: `main` · Repo: Portfolio (Next.js 16 + React 19 + Tailwind 4)

## Contexto

La web está construida con tres tiers de ancho (`max-w-6xl`, `5xl`, `2xl`) y tres
gutters (`px-6 → md:px-12 → lg:px-24`). La verificación real (Chrome, emulación
por CDP) muestra que **no hay overflow horizontal en ningún ancho** (320…1920),
pero sí hay cuatro zonas donde el layout no está pensado para todos los anchos,
más un agujero de verificación: la única matriz de tests corre a 1280×720.

Medido en la web (dev server, `getBoundingClientRect` + capturas):

| # | Evidencia | Medición |
|---|-----------|----------|
| E1 | Rieles laterales pisan el contenido entre 768 y 1023 | 768: riel izq. `24→68`, contenido `h1/stats/CTA` empieza en `48` → **20px de solape**; a 1024 el riel queda `48→92` vs contenido `96` (4px) |
| E2 | Nav desktop recién desde `xl` (1280) | 768/900/1024: `display:none` en la `ul` desktop → hamburguesa con 5 ítems que sí entran |
| E3 | Ficha de proyecto a dos columnas desde `md` (768) | 768: `gridTemplateColumns: 344px 280px` → columna de lectura de **344px**, igual que en un teléfono de 390 |
| E4 | Hero móvil no entra en el primer pantallazo | 360×640: contenido 869px, CTA "Ver proyectos" en `y=783` (bajo el pliegue de 640), redes en `937`, cue "Desplázate" en `987` (invisible) |
| E5 | Ultraancho desbalanceado | 1920: columna `max-w-5xl` centrada con gutter fijo `px-24`; los rieles quedan a 450px del contenido |
| E6 | Matriz de tests única | `playwright.config.ts`: sólo `devices['Desktop Chrome']` (1280×720), justo donde aparece el nav desktop |

Ya resuelto en la sesión anterior (parte del mismo esfuerzo responsive/motion):
`main` sin fondo opaco (tapaba el fondo animado), `min-h-screen → min-h-svh`,
y el acople de scroll reescrito (`lib/scroll-driver.ts`).

## Objetivo

Que la web se vea y se lea bien, sin adivinar, en cualquier ancho real de uso
(320 → 2560): sin solapes, sin columnas de lectura ridículas, con la navegación
disponible donde corresponde y con una matriz de tests que lo verifique.

## Fuera de alcance

- Rediseño visual del contenido, copy o estructura de secciones.
- Tema claro (DESIGN.md: no se diseña).
- Cambios en el fondo animado más allá de R8 (ya implementado y verificado).

## Tareas

### R1 · Nav: bajar el corte de desktop de 1280 a 1024
`components/portfolio/navigation.tsx:141` (`hidden xl:flex`), `:170`, `:190`
(`xl:hidden`). A 1024 el lockup + 5 ítems + iconos + toggle ya entran.
Criterio: a 1024/1280 el nav desktop se ve completo sin desbordar el gutter;
por debajo de 1024 sigue la hamburguesa; `aria-current`, `Esc` y foco intactos.

### R2 · Rieles laterales: sacarlos de la zona donde pisan contenido
`components/portfolio/side-elements.tsx:13,30` (`hidden md:flex fixed left-6 lg:left-12`).
Opción A: mostrarlos recién desde `lg`/`xl`. Opción B: dejarlos desde `md` pero
correr el gutter del contenido (`px-6 → md:px-20`) para que no haya solape.
Criterio: en ningún ancho un riel cruza texto o CTA; verificado por medición,
no a ojo.

### R3 · Hero móvil: CTA y redes en el primer pantallazo
`components/portfolio/hero.tsx`: `pt-28`, `mb-10/12`, `text-4xl` y el bloque de
stats de 3 líneas hacen que el hero mida 869px a 360 de ancho.
Criterio: a 360×640 y 390×844 el CTA primario y las redes entran sin scroll, y
el cue "Desplázate para explorar" es visible (o se reemplaza por una señal que
sí lo sea en móvil). Sin perder jerarquía tipográfica de DESIGN.md §3.

### R4 · Ficha de proyecto: dos columnas desde 1024, no desde 768
`components/portfolio/project-detail.tsx:221` (`grid md:grid-cols-[1fr_280px]`).
Criterio: a 768 la columna de lectura mide ≥ 560px (o el `aside` pasa abajo);
a 1024+ se mantiene el sticky del índice.

### R5 · Ultraancho (≥1536): composición, no aire
Hoy el contenido no escala arriba de 1024–1152 y el gutter queda fijo en 96px.
Definir una regla (`2xl`: tier de ancho + gutter mayor, o gutter fluido con
`clamp()`), y decidir qué pasa con los rieles a 1920+.
Criterio: a 1920/2560 la relación contenido/aire no supera ~1/3 y los rieles
siguen lejos del contenido sin quedar huérfanos.

### R6 · Matriz de tests responsive (Playwright)
`playwright.config.ts` + nuevo `tests/responsive.spec.ts`. Viewports:
360×640, 390×844, 768×1024, 1024×768, 1280×800, 1440×900, 1920×1080.
Aserciones: (a) `documentElement.scrollWidth <= clientWidth + 1`; (b) CTA
primario del hero dentro del viewport en móvil; (c) el nav desktop aparece en
`≥1024` y la hamburguesa por debajo; (d) ningún elemento de contenido solapa un
riel lateral. Criterio: la suite falla si se rompe cualquiera de los cuatro.

### R7 · Gutter y escala tipográfica fluida (a decidir)
`px-6 md:px-12 lg:px-24` produce saltos de 24→48→96. Evaluar `clamp()` en la
variable del gutter (y sólo el gutter) manteniendo los 3 tiers de ancho.
Criterio si se aprueba: mismo espaciado a 375/768/1440 que hoy (±2px) y
transición sin saltos entre breakpoints.

### R8 · Canvas: ancho del área de contenido, no de la ventana
`components/animated-background.tsx` usa `window.innerWidth` (incluye la barra
de scroll: 8px a 768). Usar `document.documentElement.clientWidth`.
Criterio: `canvas.getBoundingClientRect().width === documentElement.clientWidth`.

## Riesgos

- Tocar `navigation.tsx` puede romper scrollspy/`aria-current` (cubierto por R6c
  y por los tests existentes de homepage).
- Mover el corte del nav a 1024 deja 768–1023 sin nav visible salvo hamburguesa
  (decisión explícita, no accidente).
- `clamp()` en gutters puede desalinear paddings entre secciones si se aplica a
  medias.

## Criterio de aceptación global

`pnpm exec tsc --noEmit`, `pnpm run lint`, `pnpm run build`, `pnpm run test`
(incluida la matriz de R6) en verde, más captura medida en 360/768/1024/1440/1920
sin solapes ni overflow.
