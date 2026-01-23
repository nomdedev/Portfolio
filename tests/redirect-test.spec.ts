import { test, expect } from '@playwright/test';

test('GitHub Pages loads directly without redirect', async ({ page }) => {
  // Medir el tiempo de carga
  const start = Date.now();

  // Ir al enlace de GitHub Pages
  await page.goto('https://nomdedev.github.io/Portfolio/');

  const end = Date.now();
  const loadTime = end - start;

  // Verificar que la página carga en menos de 5 segundos
  expect(loadTime).toBeLessThan(5000);

  // Verificar que estamos en GitHub Pages (no redirige a Vercel)
  expect(page.url()).toBe('https://nomdedev.github.io/Portfolio/');

  // Verificar que la página carga correctamente
  await expect(page.locator('h1:has-text("Martin Nomdedeu")')).toBeVisible();
});