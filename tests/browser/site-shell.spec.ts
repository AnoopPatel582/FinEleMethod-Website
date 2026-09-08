import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { navigation } from '../../src/config/navigation';

test('mobile menu supports keyboard, Escape and resize', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const toggle = page.locator('[data-menu-toggle]');
  const nav = page.getByRole('navigation', { name: 'Primary' });
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(nav).toBeHidden();
  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(nav).toBeVisible();
  await page.keyboard.press('Tab');
  await expect(
    nav.getByRole('link', { name: 'Home', exact: true }),
  ).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(toggle).toBeFocused();
  await expect(nav).toBeHidden();
  await toggle.click();
  await nav.getByRole('link', { name: 'Features', exact: true }).focus();
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(toggle).toBeHidden();
  await expect(nav).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(toggle).toBeFocused();
  await expect(nav).toBeHidden();
  await toggle.click();
  await page.locator('#main').focus();
  await expect(nav).toBeHidden();
  await toggle.click();
  await page.locator('main h1').click();
  await expect(nav).toBeHidden();
});

test('every navigation route works and keeps the saved theme', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('response', (response) => {
    if (response.status() >= 400) errors.push(response.url());
  });
  await page.goto('/');
  await page.getByLabel('Appearance', { exact: true }).selectOption('light');
  for (const item of navigation) {
    const nav = page.getByRole('navigation', { name: 'Primary' });
    await nav.getByRole('link', { name: item.label, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(item.href + '$'));
    await expect(nav.locator('[aria-current="page"]')).toHaveCount(1);
    await expect(nav.locator('[aria-current="page"]')).toHaveText(item.label);
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await expect(page.locator('main h1')).toHaveCount(1);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      'content',
      'noindex, nofollow',
    );
  }
  await page
    .getByRole('navigation', { name: 'Footer' })
    .getByRole('link', { name: 'Privacy' })
    .click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Privacy');
  await expect(
    page.getByRole('navigation', { name: 'Primary' }).locator('[aria-current]'),
  ).toHaveCount(0);
  expect(errors).toEqual([]);
});

for (const theme of ['light', 'dark'] as const) {
  test(`shell ${theme}: responsive and accessible routes`, async ({
    page,
  }, testInfo) => {
    test.setTimeout(90000);
    await page.emulateMedia({ colorScheme: theme, reducedMotion: 'reduce' });
    for (const href of [...navigation.map((item) => item.href), '/privacy/']) {
      await page.goto(href);
      for (const width of [320, 390, 768, 1024, 1280, 1440, 2560]) {
        await page.setViewportSize({ width, height: 900 });
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        ).toBe(true);
      }
      await page.setViewportSize({ width: 390, height: 844 });
      await page.locator('[data-menu-toggle]').click();
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze();
      expect(results.violations).toEqual([]);
      if (href === '/features/') {
        await page.screenshot({
          path: testInfo.outputPath(`shell-${theme}-mobile.png`),
          fullPage: true,
        });
        await page.setViewportSize({ width: 1440, height: 900 });
        await page.screenshot({
          path: testInfo.outputPath(`shell-${theme}-desktop.png`),
          fullPage: true,
        });
      }
    }
  });
}

test('navigation stays usable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 320, height: 800 },
  });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4322/');
  await expect(page.locator('[data-menu-toggle]')).toBeHidden();
  const nav = page.getByRole('navigation', { name: 'Primary' });
  await expect(nav).toBeVisible();
  await nav.getByRole('link', { name: 'Examples' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Benchmarks with their assumptions visible.',
  );
  await context.close();
});
