# Imágenes de proyectos

Cada proyecto tiene su propia carpeta. El código **descubre las imágenes automáticamente**: no hace falta tocar nada para agregar, quitar o reordenar.

## Estructura

```
public/projects/<slug>/
  01-cover.webp
  02-<detalle>.webp
  03-<detalle>.webp
  meta.json          ← opcional (alt y caption bilingües)
```

El `<slug>` es el mismo de `lib/projects.ts` (ej: `tradingview-mcp`, `cotizador-sumed`).

## Reglas

- **Orden**: por nombre de archivo. Usá prefijo numérico (`01-`, `02-`, …) para controlar el orden.
- **Formatos soportados**: `webp`, `avif`, `jpg`, `jpeg`, `png`.
- **Recomendado**: `webp` q75-80, portada 1600×1000 (relación 16:10), < 300 KB por imagen.
- **Portada**: nombrá `01-cover.webp` la imagen principal (se muestra primero).
- Si la carpeta **no tiene** imágenes raster, se usa el placeholder `01-cover.svg`.
- La imagen OG de cada ficha se **genera automáticamente** (no hace falta subirla).

## `meta.json` (opcional)

Describe cada archivo para accesibilidad (alt) y leyenda (caption). Si falta una entrada, se usa un alt genérico.

```json
{
  "02-bot.webp": {
    "altEs": "Bot recibiendo una consulta de cotización",
    "altEn": "Bot receiving a quote request",
    "captionEs": "Alta de cotización por chat",
    "captionEn": "Quote intake via chat"
  }
}
```

## Cómo se muestran

La ficha del proyecto (`/projects/<slug>`) arma una **galería con carrusel, miniaturas y lightbox**:

- 1 imagen → se muestra sola (sin controles de carrusel).
- 2 o más → carrusel con flechas, miniaturas y contador, más lightbox accesible (teclado `←/→`, `Esc`, foco gestionado).

## Nota sobre el deploy

El sitio es estático: agregar imágenes requiere un nuevo build/deploy para verse en producción (el build las detecta y las publica).
