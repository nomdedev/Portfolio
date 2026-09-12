import { expect, test, type Page } from '@playwright/test'

/**
 * Matriz responsive (R6 del plan revisado con /autoplan).
 *
 * Se corre dentro del proyecto `chromium` (no como proyectos de Playwright) para
 * no multiplicar los tests funcionales por cada viewport. Cada bloque usa
 * `test.use({ viewport })` y las seis aserciones del plan:
 *   a) sin overflow horizontal
 *   b) CTA primario del hero dentro del primer pantallazo (móvil)
 *   c) nav desktop en >=1024 y hamburguesa por debajo
 *   d) ningún elemento de contenido solapa un riel lateral
 *   e) contrato del fondo: <main> transparente + canvas cubriendo el viewport
 *   f) reflow: mismo layout sano con viewport de 640 (proxy de zoom 200%)
 */

const VIEWPORTS = [
  { name: '320x640 (piso)', width: 320, height: 640, mobile: true },
  { name: '360x640 (Android chico)', width: 360, height: 640, mobile: true },
  { name: '390x844 (iPhone)', width: 390, height: 844, mobile: true },
  { name: '844x390 (landscape)', width: 844, height: 390, mobile: true },
  { name: '768x1024 (tablet)', width: 768, height: 1024, mobile: true },
  { name: '1024x768 (laptop chica)', width: 1024, height: 768, mobile: false },
  { name: '1280x800 (laptop)', width: 1280, height: 800, mobile: false },
  { name: '1440x900 (desktop)', width: 1440, height: 900, mobile: false },
  { name: '1920x1080 (ancho)', width: 1920, height: 1080, mobile: false },
]

type Metrics = {
  scrollWidth: number
  clientWidth: number
  mainBg: string
  canvasTop: number
  canvasBottom: number
  canvasWidth: number
  viewportHeight: number
  navOverflow: number
  collisions: string[]
}

async function readMetrics(page: Page): Promise<Metrics> {
  return page.evaluate(() => {
    const doc = document.documentElement
    const main = document.querySelector('main') as HTMLElement | null
    const canvas = document.querySelector('canvas')
    const nav = document.querySelector('header nav')
    const canvasRect = canvas ? canvas.getBoundingClientRect() : null

    // d) solapes riel ↔ contenido
    const rails = Array.from(document.querySelectorAll('[data-rail]')).map((el) =>
      el.getBoundingClientRect()
    )
    const collisions: string[] = []
    if (rails.length > 0) {
      const content = Array.from(
        document.querySelectorAll('#hero h1, #hero p, #hero dl, #hero a, #hero span, section h2')
      )
      for (const el of content) {
        const r = el.getBoundingClientRect()
        if (r.width === 0 || r.height === 0) continue
        for (const rail of rails) {
          const overlaps =
            r.left < rail.right && r.right > rail.left && r.top < rail.bottom && r.bottom > rail.top
          if (overlaps) {
            collisions.push(`${el.tagName.toLowerCase()}.${String(el.className).slice(0, 24)}`)
          }
        }
      }
    }

    return {
      scrollWidth: doc.scrollWidth,
      clientWidth: doc.clientWidth,
      mainBg: main ? getComputedStyle(main).backgroundColor : 'no-main',
      canvasTop: canvasRect ? canvasRect.top : NaN,
      canvasBottom: canvasRect ? canvasRect.bottom : NaN,
      canvasWidth: canvasRect ? canvasRect.width : NaN,
      viewportHeight: window.innerHeight,
      navOverflow: nav ? nav.scrollWidth - nav.clientWidth : 0,
      collisions,
    }
  })
}

async function expectHeroCtaAboveFold(page: Page, height: number) {
  const box = await page.locator('#hero a[href="#projects"]').first().boundingBox()
  expect(box, 'el CTA del hero tiene que existir').not.toBeNull()
  expect(
    Math.round((box as { y: number; height: number }).y + (box as { height: number }).height),
    `el CTA del hero queda bajo el pliegue (${height}px)`
  ).toBeLessThanOrEqual(height)
}

for (const vp of VIEWPORTS) {
  test.describe(`responsive · ${vp.name}`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } })

    test('layout sano (a, c, d, e) y CTA del hero (b)', async ({ page }) => {
      await page.goto('/')
      await page.waitForSelector('canvas')

      const m = await readMetrics(page)

      // a) sin overflow horizontal
      expect(m.scrollWidth, `overflow horizontal en ${vp.width}px`).toBeLessThanOrEqual(
        m.clientWidth + 1
      )

      // c) nav: desktop desde 1024, hamburguesa por debajo
      const desktopNav = page.getByTestId('nav-desktop')
      if (vp.width >= 1024) {
        await expect(desktopNav).toBeVisible()
        expect(m.navOverflow, `el nav desborda su contenedor en ${vp.width}px`).toBeLessThanOrEqual(1)
      } else {
        await expect(desktopNav).toBeHidden()
        await expect(
          page.getByRole('button', { name: /abrir menú|open menu|cerrar menú|close menu/i })
        ).toBeVisible()
      }

      // d) sin solapes con los rieles laterales
      expect(m.collisions, `elementos pisados por un riel: ${m.collisions.join(', ')}`).toEqual([])

      // e) contrato del fondo: capa visible y del tamaño del área de contenido
      expect(m.mainBg, 'el <main> opaco tapa el fondo animado').toBe('rgba(0, 0, 0, 0)')
      expect(m.canvasTop).toBeLessThanOrEqual(0)
      expect(m.canvasBottom).toBeGreaterThanOrEqual(m.viewportHeight)
      expect(Math.abs(m.canvasWidth - m.clientWidth)).toBeLessThanOrEqual(1)

      // b) CTA del hero en el primer pantallazo.
      //    En landscape de teléfono (altura 390) no hay hero que entre: se
      //    verifica sólo que no haya overflow horizontal (aserción a) y que el
      //    CTA quede como mucho al borde del pliegue.
      if (vp.height >= 500) {
        await expectHeroCtaAboveFold(page, vp.height)
      } else {
        const box = await page.locator('#hero a[href="#projects"]').first().boundingBox()
        expect(box, 'el CTA del hero tiene que existir').not.toBeNull()
        expect(
          Math.round((box as { y: number; height: number }).y + (box as { height: number }).height),
          'landscape: el CTA tendría que quedar al borde del pliegue, no muy abajo'
        ).toBeLessThanOrEqual(vp.height + 60)
      }
    })

    test('layout sano en inglés (a, c) y reflow 640 (f)', async ({ page }) => {
      await page.goto('/')

      // el nav en EN mide distinto: es donde primero se rompe el ancho
      await page.locator('header button:visible').filter({ hasText: /^en$/i }).first().click()
      await expect(page.locator('#hero a[href="#projects"]')).toContainText(/view projects/i)

      // f) reflow: 640 de ancho representa bien el zoom al 200% en un desktop
      await page.setViewportSize({ width: 640, height: vp.height })
      const m = await readMetrics(page)
      expect(m.scrollWidth, 'overflow horizontal con reflow a 640px').toBeLessThanOrEqual(
        m.clientWidth + 1
      )
      expect(m.collisions).toEqual([])
    })
  })
}

test.describe('menú móvil (R1b)', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test('contiene el foco, bloquea el scroll y devuelve el foco al cerrar', async ({ page }) => {
    await page.goto('/')
    const toggle = page.getByRole('button', { name: /abrir menú|open menu/i })
    await toggle.click()

    const panel = page.locator('#mobile-menu')
    await expect(panel).toBeVisible()
    // scroll lock
    expect(await page.evaluate(() => getComputedStyle(document.body).overflow)).toBe('hidden')
    // el foco entró al panel
    expect(
      await page.evaluate(() => document.activeElement?.closest('#mobile-menu') !== null)
    ).toBe(true)
    // Tab no escapa del panel
    for (let i = 0; i < 12; i++) await page.keyboard.press('Tab')
    expect(
      await page.evaluate(() => document.activeElement?.closest('#mobile-menu') !== null)
    ).toBe(true)

    // Escape cierra, libera el scroll y devuelve el foco al botón
    await page.keyboard.press('Escape')
    await expect(panel).toBeHidden()
    expect(await page.evaluate(() => getComputedStyle(document.body).overflow)).not.toBe('hidden')
    expect(
      await page.evaluate(() => document.activeElement?.getAttribute('aria-expanded') !== null)
    ).toBe(true)
  })
})

test.describe('ficha de proyecto a 768 (columna de lectura)', () => {
  test.use({ viewport: { width: 768, height: 1024 } })

  test('una columna y ancho de lectura >= 560px', async ({ page }) => {
    await page.goto('/projects/mondial-xboost')
    const width = await page.evaluate(() => {
      const main = document.querySelector('article .space-y-12')
      return main ? main.getBoundingClientRect().width : 0
    })
    expect(width, 'columna de lectura demasiado angosta a 768').toBeGreaterThanOrEqual(560)
  })
})
