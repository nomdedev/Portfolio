import { test, expect } from '@playwright/test';

test('CV link should work', async ({ page }) => {
  // Ir al sitio en martinnomdedeu.com
  await page.goto('https://martinnomdedeu.com');

  // Esperar a que la página cargue
  await page.waitForLoadState('networkidle');

  // Verificar que estamos en martinnomdedeu.com
  expect(page.url()).toBe('https://martinnomdedeu.com');

  // Buscar el enlace del CV por texto
  const cvLink = page.locator('a:has-text("Ver CV")').or(page.locator('a:has-text("Currículum")')).first();
  await expect(cvLink).toBeVisible();

  // Verificar que el href contiene el enlace de Google Drive
  await expect(cvLink).toHaveAttribute('href', 'https://drive.google.com/file/d/1Gi8OMUOUrH3r_HSuqGlF4Gbxm-by_oM8/view?usp=sharing');

  // Hacer clic y verificar que abre en nueva pestaña
  const [newPage] = await Promise.all([
    page.context().waitForEvent('page'),
    cvLink.click()
  ]);

  // Esperar a que la nueva página cargue en Google Drive
  await newPage.waitForURL('**/drive.google.com/**');

  // Verificar que la URL es de Google Drive
  expect(newPage.url()).toContain('drive.google.com');
});