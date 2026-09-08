import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { solverDocument } from '../../src/config/solver-evidence';

test('features presents implemented scope and explicit boundaries', async ({
  page,
}) => {
  await page.goto('/features/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'A finite-element workflow you can trace.',
  );
  for (const heading of [
    'Analysis scope',
    'Model input',
    'Numerical pipeline',
    'Results',
    'Windows workbench',
    'What this scope does not include.',
  ]) {
    await expect(page.getByRole('heading', { name: heading })).toBeVisible();
  }
  await expect(
    page.getByText(
      'Nonlinear, dynamic, thermal, contact or buckling analysis.',
    ),
  ).toBeVisible();
  await expect(
    page.getByText('independently validate every model', { exact: false }),
  ).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Read the solver architecture' }),
  ).toHaveAttribute('href', solverDocument('docs/ARCHITECTURE.md'));
  await expect(
    page.getByRole('link', { name: 'Review the project scope' }),
  ).toHaveAttribute('href', solverDocument('docs/PROJECT_DECISIONS.md'));
});

test('feature anchors, themes and responsive layout work', async ({
  page,
}, testInfo) => {
  await page.goto('/features/');
  await page
    .getByRole('link', { name: 'Numerical pipeline', exact: true })
    .click();
  await expect(page).toHaveURL(/#solver$/);
  await expect(
    page.getByRole('heading', { name: 'Numerical pipeline' }),
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
      path: testInfo.outputPath(`features-${theme}-mobile.png`),
      fullPage: true,
    });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.screenshot({
      path: testInfo.outputPath(`features-${theme}-desktop.png`),
      fullPage: true,
    });
  }
});
