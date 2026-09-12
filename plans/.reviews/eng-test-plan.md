# Plan de tests — responsive (Fase 3, /autoplan)

Artefacto de la revisión de ingeniería sobre `plans/responsive-plan.md`.
Adaptación: el path de gstack (`~/.gstack/projects/$SLUG/`) no existe en esta máquina;
se guarda junto al plan.

## Matriz de viewports

| Viewport | Qué representa | Aserciones que corren |
|----------|----------------|-----------------------|
| 320×640 | piso histórica (iPhone SE 1ª gen) | a, e |
| 360×640 | Android chico (más común en AR) | a, b, e |
| 390×844 | iPhone moderno | a, b, e |
| 844×390 | landscape de teléfono | a, b |
| 768×1024 | tablet vertical | a, c, d |
| 1024×768 | tablet horizontal / laptop chica | a, c, d |
| 1280×800 | laptop | a, c, e |
| 1440×900 | desktop | a, e |
| 1920×1080 | desktop ancho | a, e |

Todos corren en **ES y EN** (el nav en EN mide 50px menos de holgura; un corte que pasa en
ES puede romper en EN o al revés).

## Aserciones

- **a · Sin overflow:** `document.documentElement.scrollWidth <= clientWidth + 1`.
- **b · CTA en el primer pantallazo (móvil/landscape):** el rect del CTA primario del hero
  está dentro de `[0, innerHeight]`.
- **c · Nav:** en `≥1024` la `ul` desktop es visible y su `scrollWidth <= clientWidth`;
  por debajo de 1024 la hamburguesa está presente y la `ul` oculta.
- **d · Sin solapes:** ningún rect de contenido (h1/p/CTA/stats) intersecta el rect de un
  riel lateral.
- **e · Contrato del fondo:** `getComputedStyle(main).backgroundColor` transparente y el
  rect del canvas cubre el viewport (regresión del bug que dejaba el fondo invisible).
- **f · Reflow a 200%:** viewport de 640 de ancho en el detalle de proyecto sin overflow
  (sustituto ejecutable del zoom de navegador).

## Mapeo codepath → test

| Codepath | Test |
|----------|------|
| `navigation.tsx` (breakpoint 1024, índices, gap) | c |
| `navigation.tsx` (menú móvil, foco, scroll lock) | nuevo: foco contenido + `Tab` no escapa |
| `side-elements.tsx` (rieles desde 1024) | d |
| `hero.tsx` (espaciado móvil) | b |
| `project-detail.tsx` (columnas desde 1024) | a + ancho de columna ≥560px a 768 |
| secciones (overflow) | a |
| `app/page.tsx`, `app/projects/[slug]/page.tsx` (sin fondo) + `animated-background.tsx` | e |
| `lib/scroll-driver.ts` | sin test unitario: se verifica midiendo `--scroll-progress` en navegador real (ya hecho: 0 → 0.97 cubriendo la página) |

## Brechas conocidas (declaradas, no escondidas)

1. `scroll-driver.ts` no tiene test unitario; su verificación es de integración manual.
2. No hay medición de performance (fps/memoria) en la matriz: la verificación de 61fps bajo
   scroll+mouse en movimiento se hizo a mano esta sesión.
3. Los datos de uso real (P2 de las premisas) no se consultaron: si el tráfico móvil fuera
   marginal, la prioridad de R3 cambiaría sin que ningún test lo detecte.
