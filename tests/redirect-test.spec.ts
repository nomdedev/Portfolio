import { test, expect } from '@playwright/test';

test('GitHub Pages redirect works correctly', async ({ page }) => {
  // Ir al enlace de GitHub Pages
  await page.goto('https://nomdedev.github.io/Portfolio/');

  // Esperar a que ocurra el redirect
  await page.waitForTimeout(200);

  // Verificar que estamos en Vercel
  expect(page.url()).toContain('vercel.app');

  // Verificar que la página carga correctamente
  await expect(page.locator('h1:has-text("Martin Nomdedeu")')).toBeVisible();
});