# Imágenes de proyectos

Cada proyecto tiene su propia carpeta. El código **descubre las imágenes automáticamente**: no hace falta tocar nada para agregar, quitar o reordenar.

Para ver el estado de carga de cada proyecto:

```bash
npm run media:report
```

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
- **Formatos de imagen**: `webp`, `avif`, `jpg`, `jpeg`, `png`.
- **Formatos de video**: `mp4`, `webm`, `ogg`, `mov`.
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

## Videos

Podés mezclar videos con las imágenes. El orden sigue siendo por nombre.

- Ej: `05-demo.mp4` se reproduce en la galería (con controles) y en el lightbox.
- Si ponés una imagen con el **mismo nombre** (`05-demo.webp`), se usa como **poster** del video y no se muestra como imagen suelta.
- También podés indicar el poster en `meta.json` con `"poster": "05-demo.webp"`.
- Recomendado: 10-20 s, `mp4` H.264 o `webm`, muteado, < 5 MB.

## Cómo se muestran

La ficha del proyecto (`/projects/<slug>`) arma una **galería con carrusel, miniaturas y lightbox**:

- 1 imagen → se muestra sola (sin controles de carrusel).
- 2 o más → carrusel con flechas, miniaturas y contador, más lightbox accesible (teclado `←/→`, `Esc`, foco gestionado).

## Nota sobre el deploy

El sitio es estático: agregar imágenes requiere un nuevo build/deploy para verse en producción (el build las detecta y las publica).
