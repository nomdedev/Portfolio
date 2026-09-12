import { test, expect } from '@playwright/test';

const DRIVE_URL =
  'https://drive.google.com/file/d/1Gi8OMUOUrH3r_HSuqGlF4Gbxm-by_oM8/view?usp=sharing';

test('CV link points to Google Drive and opens in a new tab', async ({ page }) => {
  await page.goto('/');

  const cvLink = page.getByRole('link', { name: 'Descargar CV' });
  await expect(cvLink).toBeVisible();
  await expect(cvLink).toHaveAttribute('href', DRIVE_URL);
  await expect(cvLink).toHaveAttribute('target', '_blank');
});
