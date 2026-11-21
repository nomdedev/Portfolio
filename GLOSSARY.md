# Portfolio de Martín Nomdedeu

Sitio público bilingüe que presenta el perfil profesional, los proyectos, la experiencia y la docencia de Martín Nomdedeu, con una ficha propia por proyecto. Este glosario fija el vocabulario del sitio y del contenido que publica.

## El sitio y su navegación

**Portfolio**:
El sitio público completo: una home con secciones fijas y una ficha por proyecto.
_Vive en_: `app/page.tsx`, `app/projects/[slug]/page.tsx`.
_Evitar_: web, sitio personal, página.

**Sección**:
Cada bloque numerado de la home, con `id` de ancla y una cabecera común (índice, título y línea).
_Vive en_: `components/portfolio/section-header.tsx`.
_Evitar_: bloque, módulo, apartado.

**Hero**:
La apertura de la home: identidad, posicionamiento, CTAs, redes y las tres cifras citables.
_Vive en_: `components/portfolio/hero.tsx`.
_Evitar_: portada (reservado a medios), banner, cabecera.

**Ticker**:
La cinta horizontal de keywords técnicos que separa el Hero de Sobre mí.
_Vive en_: `components/portfolio/ticker.tsx`.
_Evitar_: marquee, carrusel, cinta.

**Sobre mí**:
La sección 01: relato profesional, datos generales y tres cifras destacadas.
_Vive en_: `components/portfolio/about.tsx`.
_Evitar_: About, biografía, bio.

**Experiencia**:
La sección 03: timeline de puestos con empresa, período, responsabilidades y skills.
_Vive en_: `components/portfolio/experience.tsx`.
_Evitar_: trayectoria, CV.

**Docencia**:
La sección 04: actividad docente con rol, institución, período y descripción.
_Vive en_: `components/portfolio/teaching.tsx`.
_Evitar_: Teaching, cursos.

**Skills**:
La sección 05: competencias agrupadas en cuatro disciplinas (Machine Learning, LLMs & GenAI, Data Engineering, Automatización & Integración).
_Vive en_: `components/portfolio/skills.tsx`.
_Evitar_: competencias (es el texto visible), stack (reservado al proyecto).

**Contacto**:
La sección 06: solo enlaces directos a email, GitHub y LinkedIn; no hay formulario.
_Vive en_: `components/portfolio/contact.tsx`.
_Evitar_: formulario de contacto.

**Rieles laterales**:
Los dos rieles fijos con redes a la izquierda y email vertical a la derecha, visibles desde 1024 px.
_Vive en_: `components/portfolio/side-elements.tsx`.
_Evitar_: sidebar, side elements.

**Ficha de proyecto**:
La página propia de un proyecto (`/projects/<slug>`) con galería, flujo, qué hace, cómo funciona y qué incluye.
_Vive en_: `app/projects/[slug]/page.tsx`, `components/portfolio/project-detail.tsx`.
_Evitar_: detalle, página de proyecto, caso.

**Índice de la ficha**:
La navegación lateral de la ficha que marca la sección visible.
_Vive en_: `components/portfolio/project-detail.tsx` (`tocItems`).
_Evitar_: TOC, menú lateral, tabla de contenidos.

**Flujo del proceso**:
La sección opcional de la ficha que embebe el diagrama interactivo del proyecto.
_Vive en_: `components/portfolio/project-detail.tsx`.
_Evitar_: workflow, diagrama (para la sección).

**Proyecto adyacente**:
El proyecto anterior o siguiente en el orden de `projects`, en ciclo cerrado: el primero sucede al último.
_Vive en_: `lib/projects.ts` (`getAdjacentProjects`).
_Evitar_: relacionado, recomendado, similar.

## Modelo de contenido

**Proyecto**:
La unidad de contenido del portfolio: un trabajo con categoría, descripción, stack, enlaces y medios.
_Vive en_: `lib/projects.ts` (`type Project`).
_Evitar_: trabajo, caso, ítem.

**Slug**:
El identificador estable de un proyecto; se usa en la URL `/projects/<slug>` y como nombre de su carpeta de medios.
_Vive en_: `lib/projects.ts`, `public/projects/<slug>/`.
_Evitar_: id, key, nombre de carpeta.

**Categoría**:
Una de las cuatro áreas fijas del portfolio: Machine Learning & IA (`ml`), Trading & Quant (`quant`), Automatización & Agentes (`automation`) y Productos & Software (`products`).
_Vive en_: `lib/categories.ts`.
_Evitar_: área (para la entidad), tag, tema.

**Todos**:
El filtro inicial de Proyectos que quita el filtro por categoría; no es una categoría.
_Vive en_: `lib/categories.ts`.
_Evitar_: All (en español).

**Área de trabajo**:
La cifra del Hero que cuenta las categorías reales, excluyendo "Todos".
_Vive en_: `lib/stats.ts` (`areaCount`).
_Evitar_: categoría (cuando se habla de la cifra).

**Destacado**:
El proyecto marcado como `featured`: se muestra arriba de los filtros, más grande y con badge. Hoy son tres.
_Vive en_: `lib/projects.ts`, `components/portfolio/projects.tsx`.
_Evitar_: principal, top, favorito.

**Proyecto privado**:
El proyecto con `isPrivate` cuyo código no es público; muestra badge "Privado" y ningún enlace de código.
_Vive en_: `lib/projects.ts`, `components/portfolio/projects.tsx`.
_Evitar_: cerrado, confidencial, sin repo.

**Stack**:
La lista de tecnologías de un proyecto, mostrada como chips.
_Vive en_: `Project.stack` en `lib/projects.ts`.
_Evitar_: tecnologías (es el label de la ficha), herramientas.

**Descripción corta**:
El resumen de una frase que aparece en la card y bajo el título de la ficha (`descriptionEs` / `descriptionEn`).
_Vive en_: `lib/projects.ts`.
_Evitar_: resumen, intro.

**Descripción larga**:
El texto de "Qué hace" en la ficha; si falta, se usa la descripción corta (`longDescriptionEs` / `longDescriptionEn`).
_Vive en_: `lib/projects.ts`, `components/portfolio/project-detail.tsx`.
_Evitar_: overview, detalle.

**Cómo funciona**:
La lista ordenada de pasos que explica el proceso del proyecto (`howItWorksEs` / `howItWorksEn`).
_Vive en_: `lib/projects.ts`.
_Evitar_: pasos, proceso, metodología.

**Qué incluye**:
La lista de capacidades del proyecto (`featuresEs` / `featuresEn`).
_Vive en_: `lib/projects.ts`.
_Evitar_: features, características, funcionalidades.

## Medios del proyecto

**Portada**:
La primera imagen de un proyecto, por convención `01-cover.webp`, o el SVG genérico si no hay medios.
_Vive en_: `public/projects/<slug>/`.
_Evitar_: cover, imagen principal, hero image.

**Galería**:
El carrusel de medios de la ficha, con miniaturas, contador y apertura en lightbox.
_Vive en_: `components/portfolio/project-gallery.tsx`.
_Evitar_: carrusel (es la UI), slider.

**Lightbox**:
El visor ampliado de la galería, con teclado y foco gestionado.
_Vive en_: `components/portfolio/project-lightbox.tsx`.
_Evitar_: modal, popup, zoom.

**Póster**:
La imagen que hace de tapa de un video de la galería; se declara en `meta.json` o comparte el nombre del video.
_Vive en_: `lib/project-images.ts`.
_Evitar_: thumbnail del video, portada del video.

**meta.json**:
El archivo opcional por proyecto con alt y caption bilingües de cada medio, y el póster de los videos.
_Vive en_: `public/projects/<slug>/meta.json`.
_Evitar_: manifiesto, metadata.

**Placeholder**:
La portada SVG genérica (`01-cover.svg`) que se usa cuando la carpeta no tiene medios raster.
_Vive en_: `lib/project-images.ts`, `public/projects/README.md`.
_Evitar_: imagen por defecto, fallback.

**Diagrama de flujo**:
El HTML autocontenido e interactivo que explica el proceso de un proyecto y se embebe en su ficha.
_Vive en_: `public/diagrams/<slug>.html`, `lib/project-images.ts` (`getProjectDiagram`).
_Evitar_: archify (herramienta), workflow, infografía.

**Fuente del diagrama**:
El spec `workflow.json` desde el que se genera el diagrama; vive aparte del artefacto publicado.
_Vive en_: `diagrams-src/<slug>.workflow.json`.
_Evitar_: diagrama (para la fuente), JSON.

**Reporte de medios**:
La tabla de estado por proyecto que indica imágenes, videos y `meta.json`, o si sigue en placeholder.
_Vive en_: `scripts/media-report.mjs` (`pnpm media:report`).
_Evitar_: auditoría de imágenes.

## Identidad y presentación

**Marca MN**:
El monograma de la marca personal: la M y la N unidas por el trazo vertical central, en monocromo.
_Vive en_: `components/brand-mark.tsx`, `public/brand/`, `BRAND.md`.
_Evitar_: logo, isotipo.

**Lockup**:
La combinación de la marca MN con el wordmark NOMDEDEU y la bajada opcional `DATA · ML · AI`.
_Vive en_: `BRAND.md`.
_Evitar_: logotipo completo, firma.

**Acento esmeralda**:
El único color de acento del sitio; se reserva para acción y estado, nunca para decoración.
_Vive en_: `app/globals.css`, `DESIGN.md` §2.
_Evitar_: verde, color primario, acento secundario.

**Tema oscuro único**:
El sitio se diseña solo en oscuro; el tema claro existe como token, no como diseño.
_Vive en_: `app/globals.css`, `components/theme-provider.tsx`.
_Evitar_: modo claro opcional, dark mode.

**Cifras citables**:
Los números públicos del sitio, con fuente única y sin escribirse a mano en los componentes.
_Vive en_: `lib/stats.ts`.
_Evitar_: métricas (reservado a los highlights de Sobre mí), números.

**Bilingüe ES/EN**:
Todo el copy existe en español e inglés y se elige con un toggle persistente.
_Vive en_: `lib/i18n.tsx`, `components/portfolio/navigation.tsx`.
_Evitar_: i18n (nombre del módulo), multilenguaje.

**Imagen OG de proyecto**:
La tarjeta social 1200×630 que se genera por proyecto con la marca, el título y la categoría.
_Vive en_: `app/projects/[slug]/opengraph-image.tsx`.
_Evitar_: thumbnail social, portada para redes.

## Operación y contenido externo

**CV**:
El PDF externo (Google Drive) que se descarga desde el Hero; no se guarda en el repo.
_Vive en_: `components/portfolio/hero.tsx` (`CV_URL`), `tests/cv-link.spec.ts`.
_Evitar_: resume, currículum, `cv.pdf`.

**Sitio estático**:
El sitio se pre-genera en build; las fichas existen solo para los slugs listados y un slug desconocido da 404.
_Vive en_: `app/projects/[slug]/page.tsx`, `next.config.mjs`.
_Evitar_: SPA, app dinámica.
