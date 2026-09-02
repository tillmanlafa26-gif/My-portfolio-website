import { test, expect } from '@playwright/test';

const viewports = [
  { width: 320, height: 568 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1440, height: 900 },
];

for (const viewport of viewports) {
  test(`portfolio layout ${viewport.width}x${viewport.height}`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.setViewportSize(viewport);
    await page.goto('http://127.0.0.1:3000', { waitUntil: 'networkidle' });
    await expect(page.locator('h1')).toContainText('Mission-tested');
    await expect(page.locator('#projects')).toBeAttached();
    const dimensions = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, innerWidth }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.innerWidth + 1);
    expect(errors).toEqual([]);
    if (viewport.width <= 800) {
      const menu = page.getByRole('button', { name: 'Toggle navigation' });
      const box = await menu.boundingBox();
      expect(box?.width).toBeGreaterThanOrEqual(44);
      expect(box?.height).toBeGreaterThanOrEqual(44);
      await menu.click();
      await expect(page.getByRole('link', { name: 'Projects' })).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(page.getByRole('link', { name: 'Projects' })).not.toBeVisible();
    }
  });
}

test('reduced motion leaves content visible and background static', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('http://127.0.0.1:3000', { waitUntil: 'networkidle' });
  await page.locator('#projects').scrollIntoViewIfNeeded();
  await expect(page.locator('article').first()).toBeVisible();
  expect(await page.locator('html').evaluate((el) => getComputedStyle(el).scrollBehavior)).toBe('auto');
});
