import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('system preference, override, persistence and reset', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/design-system/');
  const html = page.locator('html');
  const select = page.getByLabel('Appearance', { exact: true });
  await expect(html).toHaveAttribute('data-theme', 'light');
  await expect(select).toHaveValue('system');
  await select.selectOption('dark');
  await page.reload();
  await expect(select).toHaveValue('dark');
  await expect(html).toHaveAttribute('data-theme', 'dark');
  await select.selectOption('system');
  await expect(html).toHaveAttribute('data-theme', 'light');
  await page.emulateMedia({ colorScheme: 'dark' });
  await expect(html).toHaveAttribute('data-theme', 'dark');
  expect(
    await page.evaluate(() => localStorage.getItem('finelemethod-theme')),
  ).toBeNull();
});
test('invalid preference and blocked storage keep controls working', async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.addInitScript(() =>
    localStorage.setItem('finelemethod-theme', 'invalid'),
  );
  await page.goto('/design-system/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => {
      throw new Error('Storage blocked');
    };
    Storage.prototype.setItem = () => {
      throw new Error('Storage blocked');
    };
    Storage.prototype.removeItem = () => {
      throw new Error('Storage blocked');
    };
  });
  await page.reload();
  await page.getByLabel('Appearance', { exact: true }).selectOption('light');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});
test('choices synchronize across tabs', async ({ page, context }) => {
  await page.goto('/design-system/');
  const second = await context.newPage();
  await second.goto('/');
  await page.getByLabel('Appearance', { exact: true }).selectOption('light');
  await expect(second.getByLabel('Appearance', { exact: true })).toHaveValue(
    'light',
  );
  await page.getByLabel('Appearance', { exact: true }).selectOption('dark');
  await expect(second.locator('html')).toHaveAttribute('data-theme', 'dark');
  await second.close();
});
test('keyboard skip link and focus', async ({ page }) => {
  await page.goto('/design-system/');
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Skip to content' });
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport();
  await expect(skip).toHaveCSS('outline-style', 'solid');
  await page.keyboard.press('Enter');
  await expect(page.locator('#main')).toBeFocused();
  await page.getByLabel('Appearance', { exact: true }).focus();
  await expect(page.getByLabel('Appearance', { exact: true })).toHaveCSS(
    'outline-style',
    'solid',
  );
});
for (const theme of ['light', 'dark'] as const) {
  test(`${theme}: accessibility, responsive layout, reduced motion`, async ({
    page,
  }, testInfo) => {
    await page.emulateMedia({ colorScheme: theme, reducedMotion: 'reduce' });
    await page.goto('/design-system/');
    for (const width of [320, 390, 768, 1440, 2560]) {
      await page.setViewportSize({ width, height: 1000 });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      await expect(
        page.getByLabel('Appearance', { exact: true }),
      ).toBeVisible();
    }
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      const result = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze();
      expect(result.violations).toEqual([]);
      await page.screenshot({
        path: testInfo.outputPath(`${theme}-${width}.png`),
        fullPage: true,
      });
    }
    await expect(page.locator('.action').first()).toHaveCSS(
      'transition-duration',
      '0s',
    );
  });
}
test('no JavaScript retains readable content and hides inactive controls', async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    colorScheme: 'light',
  });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4322/design-system/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByLabel('Appearance', { exact: true })).toBeHidden();
  await expect(page.locator('html')).toHaveCSS('color-scheme', 'light');
  await context.close();
});
