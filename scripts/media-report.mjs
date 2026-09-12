import fs from "node:fs"
import path from "node:path"

const root = path.join(process.cwd(), "public", "projects")
const IMG = /\.(webp|avif|jpe?g|png)$/i
const VID = /\.(mp4|webm|ogg|mov)$/i

const dirs = fs
  .readdirSync(root, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort()

const pad = (s, n) => String(s).padEnd(n)
let withMedia = 0
const rows = []

for (const slug of dirs) {
  const files = fs.readdirSync(path.join(root, slug))
  const imgs = files.filter((f) => IMG.test(f))
  const vids = files.filter((f) => VID.test(f))
  const meta = files.includes("meta.json")
  const status = imgs.length + vids.length > 0 ? "OK" : "placeholder"
  if (status === "OK") withMedia++
  rows.push({ slug, imgs: imgs.length, vids: vids.length, meta, status })
}

console.log(pad("proyecto", 26) + pad("img", 5) + pad("vid", 5) + pad("meta", 6) + "estado")
console.log("-".repeat(50))
for (const r of rows) {
  console.log(pad(r.slug, 26) + pad(r.imgs, 5) + pad(r.vids, 5) + pad(r.meta ? "si" : "-", 6) + r.status)
}
console.log(`\n${withMedia}/${rows.length} proyectos con medios reales`)
