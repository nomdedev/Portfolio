import { test, expect } from '@playwright/test';

test('GitHub Pages redirect works correctly', async ({ page }) => {
  // Medir el tiempo de redirección
  const start = Date.now();

  // Ir al enlace de GitHub Pages
  await page.goto('https://nomdedev.github.io/Portfolio/');

  // Esperar a que ocurra la redirección
  await page.waitForURL('**/vercel.app/**', { timeout: 200 });

  const end = Date.now();
  const redirectTime = end - start;

  // Verificar que la redirección ocurre en menos de 200ms (sin mostrar contenido visual)
  expect(redirectTime).toBeLessThan(200);

  // Verificar que estamos en Vercel
  expect(page.url()).toContain('vercel.app');

  // Verificar que la página carga correctamente
  await expect(page.locator('h1:has-text("Martin Nomdedeu")')).toBeVisible();
});