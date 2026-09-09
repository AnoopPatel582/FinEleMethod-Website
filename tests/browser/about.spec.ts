import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {
  solverDocument,
  solverEvidence,
} from '../../src/config/solver-evidence';

test('about explains the project intent, architecture and boundaries', async ({
  page,
}) => {
  await page.goto('/about/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Learn the method by building the whole path.',
  );
  await expect(page.getByText('Anoop Patel', { exact: true })).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'View GitHub Profile' }),
  ).toHaveAttribute('href', 'https://github.com/AnoopPatel582');

  for (const principle of [
    'Keep the Method Visible',
    'Build in Verified Increments',
    'Publish the Evidence',
  ]) {
    await expect(page.getByRole('heading', { name: principle })).toBeVisible();
  }

  await expect(
    page.locator(`a[href="${solverDocument('docs/ARCHITECTURE.md')}"]`),
  ).toHaveCount(1);
  await expect(
    page.locator(`a[href="${solverDocument('docs/PROJECT_DECISIONS.md')}"]`),
  ).toHaveCount(1);
  await expect(
    page.locator(`a[href="${solverEvidence.repository}"]`),
  ).toHaveCount(1);
  await expect(page.getByText('no open-source licence')).toBeVisible();
  await expect(
    page.getByText(/independently validate every model/),
  ).toBeVisible();
});

test('about anchors, themes and responsive layout work', async ({
  page,
}, testInfo) => {
  await page.goto('/about/');
  await page.getByRole('link', { name: 'Development Journey' }).click();
  await expect(page).toHaveURL(/#journey$/);
  await expect(
    page.getByRole('heading', {
      name: 'From Numerical Core to Windows Release',
    }),
  ).toBeInViewport();

  for (const theme of ['light', 'dark'] as const) {
    await page.getByLabel('Appearance', { exact: true }).selectOption(theme);
    for (const width of [320, 390, 768, 1024, 1440, 2560]) {
      await page.setViewportSize({ width, height: 900 });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    }
    await page.setViewportSize({ width: 390, height: 844 });
    const axe = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(axe.violations).toEqual([]);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({
      path: testInfo.outputPath(`about-${theme}-mobile.png`),
      fullPage: true,
    });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.screenshot({
      path: testInfo.outputPath(`about-${theme}-desktop.png`),
      fullPage: true,
    });
  }
});
