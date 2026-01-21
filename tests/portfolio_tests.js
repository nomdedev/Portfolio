import { test, expect } from '@playwright/test';

test.describe('Portfolio Website Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8000');
  });

  test('Página principal carga correctamente', async ({ page }) => {
    await expect(page).toHaveTitle(/Portfolio/);
    await expect(page.locator('h1').first()).toContainText('Hola');
    await expect(page.locator('h1').nth(2)).toContainText('Martin Nomdedeu');
  });

  test('Navegación del menú funciona', async ({ page }) => {
    // Verificar que los enlaces de navegación existen
    await expect(page.locator('nav a[href="#bckPage"]')).toBeVisible();
    await expect(page.locator('nav a[href="#services"]')).toBeVisible();
    await expect(page.locator('nav a[href="#projects"]')).toBeVisible();
    await expect(page.locator('nav a[href="#about"]')).toBeVisible();
    await expect(page.locator('nav a[href="#contact"]')).toBeVisible();
  });

  test('Sección de proyectos se carga correctamente', async ({ page }) => {
    await page.locator('#projects').scrollIntoViewIfNeeded();
    await expect(page.locator('#projects .projects-header h1')).toContainText('Mis Proyectos');

    // Verificar que hay al menos 3 proyectos
    const projectCount = await page.locator('.project-item').count();
    expect(projectCount).toBeGreaterThanOrEqual(3);
  });

  test('Enlaces de proyectos funcionan', async ({ page }) => {
    await page.locator('#projects').scrollIntoViewIfNeeded();

    // Verificar enlaces de contacto en proyectos
    const contactLinks = page.locator('.project-link');
    await expect(contactLinks.first()).toHaveAttribute('href', /linkedin/);
  });

  test('Animaciones de scroll funcionan', async ({ page }) => {
    // Scroll a la sección de proyectos
    await page.locator('#projects').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000); // Esperar animaciones

    // Verificar que los elementos de proyecto tienen opacidad
    const firstProject = page.locator('.project-item').first();
    const opacity = await firstProject.evaluate(el => getComputedStyle(el).opacity);
    expect(parseFloat(opacity)).toBeGreaterThan(0);
  });

  test('Menú móvil funciona', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });

    // Verificar que el botón hamburguesa existe
    const burger = page.locator('.burguer');
    await expect(burger).toBeVisible();

    // Hacer clic en el menú hamburguesa
    await burger.click();

    // Verificar que el menú móvil se muestra
    const mobileMenu = page.locator('.nav-list ul');
    await expect(mobileMenu).toHaveClass(/active/);
  });

  test('Sección de servicios se muestra correctamente', async ({ page }) => {
    await page.locator('#services').scrollIntoViewIfNeeded();
    await expect(page.locator('#services .service-top h1')).toContainText('Diseño de sitios web');

    // Verificar que hay servicios
    const serviceCount = await page.locator('.service-item').count();
    expect(serviceCount).toBeGreaterThanOrEqual(4);
  });

  test('Sección de contacto tiene información correcta', async ({ page }) => {
    await page.locator('#contact').scrollIntoViewIfNeeded();

    // Verificar que hay elementos de contacto
    const contactItems = page.locator('.contact-item');
    await expect(contactItems).toHaveCount(2); // Email y LinkedIn
  });

  test('Footer tiene enlaces sociales', async ({ page }) => {
    await page.locator('#footer').scrollIntoViewIfNeeded();

    // Verificar enlaces sociales
    const socialLinks = page.locator('.social-item');
    await expect(socialLinks).toHaveCount(2); // GitHub y LinkedIn
  });

  test('Diseño responsivo funciona en móvil', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    // Verificar que el header se adapta
    const header = page.locator('.header');
    await expect(header).toBeVisible();

    // Verificar navegación móvil
    const burger = page.locator('.burguer');
    await expect(burger).toBeVisible();
  });

  test('Enlaces externos son válidos', async ({ page }) => {
    // Verificar enlaces de LinkedIn
    const linkedinLinks = page.locator('a[href*="linkedin"]');
    for (const link of await linkedinLinks.all()) {
      const href = await link.getAttribute('href');
      expect(href).toMatch(/^https:\/\/www\.linkedin\.com/);
    }
  });

  test('Imágenes se cargan correctamente', async ({ page }) => {
    // Verificar que las imágenes de proyectos existen
    const images = page.locator('.project-img img');
    for (const img of await images.all()) {
      await expect(img).toBeVisible();
      // Verificar que no hay errores de carga
      const src = await img.getAttribute('src');
      expect(src).toBeTruthy();
    }
  });

  test('Animaciones CSS funcionan', async ({ page }) => {
    // Verificar que los estilos CSS se aplican
    const projectItem = page.locator('.project-item').first();
    const backgroundColor = await projectItem.evaluate(el => getComputedStyle(el).backgroundColor);
    expect(backgroundColor).not.toBe('rgba(0, 0, 0, 0)'); // Debe tener fondo
  });
});