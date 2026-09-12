import { test, expect } from '@playwright/test';

test.describe.configure({ timeout: 60_000 });

const SLUG = 'tradingview-mcp';

test('project detail renders title, table of contents and gallery', async ({ page }) => {
  await page.goto(`/projects/${SLUG}`);

  await expect(page.getByRole('heading', { level: 1, name: SLUG })).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'En esta página' })).toBeVisible();
  await expect(page.getByRole('button', { name: /Ampliar imagen/ })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Qué hace' })).toBeVisible();
});

test('unknown project slug returns a 404', async ({ page }) => {
  const response = await page.goto('/projects/no-existe');
  expect(response?.status()).toBe(404);
});

test('detail language toggle switches copy to English', async ({ page }) => {
  await page.goto(`/projects/${SLUG}`);

  await page.getByRole('group', { name: 'Idioma' }).getByRole('button', { name: 'en' }).click();

  await expect(page.getByRole('heading', { level: 1, name: SLUG })).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'On this page' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'What it does' })).toBeVisible();
});

test('lightbox opens on expand, closes with Escape and returns focus', async ({ page }) => {
  await page.goto(`/projects/${SLUG}`);

  const expand = page.getByRole('button', { name: /Ampliar imagen/ });
  await expand.click();

  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(expand).toBeFocused();
});

test('prev/next navigation moves to another project', async ({ page }) => {
  await page.goto(`/projects/${SLUG}`);

  await page.getByRole('link', { name: /Siguiente/ }).click();

  await expect(page).toHaveURL(/\/projects\/(?!tradingview-mcp)[a-z0-9-]+/);
});
