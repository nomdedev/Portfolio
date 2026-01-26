import { test, expect } from '@playwright/test';

test('GitHub Pages loads directly without redirect', async ({ page }) => {
  // Medir el tiempo de carga
  const start = Date.now();

  // Ir al sitio en martinnomdedeu.com
  await page.goto('https://martinnomdedeu.com');

  const end = Date.now();
  const loadTime = end - start;

  // Verificar que la página carga en menos de 5 segundos
  expect(loadTime).toBeLessThan(5000);

  // Verificar que estamos en martinnomdedeu.com
  expect(page.url()).toBe('https://martinnomdedeu.com');

  // Verificar que la página carga correctamente
  await expect(page.locator('h1:has-text("Martín Nomdedeu")')).toBeVisible();
});