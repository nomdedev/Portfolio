# BRAND.md — Marca personal

## El símbolo

Monograma **MN** en una **ligadura**: la M y la N comparten el trazo vertical central.
Geometría limpia, trazo uniforme y terminaciones redondeadas. Sin color: **monocromo primero**
(si funciona en una tinta, funciona siempre).

- Construcción: 64×64. Altura 18→46. Trazo 6, `stroke-linecap/linejoin: round`.
- Trazo A (M): `M11 46V18L22 32L33 18V46`
- Trazo B (N, comparte el vértice en x=33): `M33 18L53 46V18`

## Archivos

| Archivo | Uso |
|---|---|
| `public/brand/mark.svg` | Símbolo sobre fondo oscuro |
| `public/brand/mark-dark.svg` | Símbolo sobre fondo claro |
| `public/brand/badge.svg` | Badge (rounded square) para app/favicon |
| `app/icon.svg` | Favicon (badge) |
| `app/apple-icon.tsx` | Apple touch icon (180×180, generado en build) |
| `components/brand-mark.tsx` | Versión inline para la nav |
| `app/projects/[slug]/opengraph-image.tsx` | OG image (marca + título + categoría) |

## Paleta

- Fondo: `#0B1220`
- Marca (trazo): `#F1F5F9`
- Acento (uso puntual): esmeralda `#34D399`

El acento esmeralda **no** forma parte del símbolo; se usa alrededor (eyebrows, estados, links).

## Reglas de uso

- **Área de respeto**: dejar como mínimo un trazo (6/64 ≈ 9%) libre alrededor del símbolo.
- **Tamaño mínimo**: 16×16 px (el trazo está calibrado para leerse a 16).
- **No** deformar, rotar, agregar sombras, degradados ni contornos.
- **No** recolorear con más de una tinta.
- Sobre foto o color, usar la versión **badge** (con fondo `#0B1220`).

## Lockup

Cuando se acompaña con el nombre: símbolo + **NOMDEDEU** en mayúsculas con tracking amplio
(+28px total), y bajada opcional `DATA · ML · AI` en esmeralda.
