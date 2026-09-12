import { test, expect } from '@playwright/test';

test('homepage renders hero with positioning and CTAs', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1, name: 'Martin Nomdedeu' })).toBeVisible();
  await expect(page.getByText('Convierto datos y modelos de IA en decisiones de negocio.')).toBeVisible();

  // CTAs del hero
  await expect(page.getByRole('link', { name: 'Ver proyectos' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Descargar CV' })).toBeVisible();

  // Secciones principales
  await expect(page.getByRole('heading', { name: /Sobre mí/ })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Proyectos' })).toBeVisible();
});

test('featured projects are visible', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('heading', { name: 'Proyectos' }).scrollIntoViewIfNeeded();
  await expect(page.getByRole('heading', { name: 'Predicción de Tenis ATP' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Fine-tuning de LLMs' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'tradingview-mcp' })).toBeVisible();
});

test('project filters narrow the grid', async ({ page }) => {
  await page.goto('/');

  const grid = page.locator('#projects');
  await grid.getByRole('heading', { name: 'Proyectos' }).scrollIntoViewIfNeeded();

  await grid.getByRole('button', { name: 'Trading & Quant' }).click();
  await expect(grid.getByRole('heading', { name: 'tradingview-mcp' })).toBeVisible();
  await expect(grid.getByText('7 proyectos')).toBeVisible();
});

test('language toggle switches to English', async ({ page }) => {
  await page.goto('/');

  // Esperar hidratación antes de interactuar
  await expect(page.getByRole('heading', { level: 1, name: 'Martin Nomdedeu' })).toBeVisible();

  await page.getByRole('group', { name: 'Idioma' }).getByRole('button', { name: 'en' }).click();
  await expect(page.getByRole('link', { name: 'View projects' })).toBeVisible();
  await expect(page.getByText('I turn data and AI models into business decisions.')).toBeVisible();
});

test('clicking anywhere on a project card opens its detail page', async ({ page }) => {
  await page.goto('/');

  const card = page.locator('article').filter({ hasText: 'tradingview-mcp' }).first();
  await card.scrollIntoViewIfNeeded();

  const box = await card.boundingBox();
  if (!box) throw new Error('project card not visible');

  // Click en el cuerpo de la card (no en el título ni en el link de GitHub)
  await page.mouse.click(box.x + box.width / 2, box.y + box.height * 0.55);

  await expect(page).toHaveURL(/\/projects\/tradingview-mcp/);
});
