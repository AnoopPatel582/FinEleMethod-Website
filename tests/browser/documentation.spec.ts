import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { solverDocument } from '../../src/config/solver-evidence';

test('documentation provides a first analysis and pinned reference map', async ({
  page,
}) => {
  await page.goto('/docs/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Start with a model. Trace every layer.',
  );
  const firstAnalysis = page.getByRole('region', {
    name: 'From launch to result.',
  });
  await expect(firstAnalysis.getByRole('listitem')).toHaveCount(5);
  await expect(firstAnalysis).toContainText('q4_tension.inp');
  await expect(firstAnalysis).toContainText('0.01');
  await expect(firstAnalysis).toContainText('10.0');

  for (const document of [
    ['Windows ZIP quick start', 'docs/WINDOWS_QUICK_START.md'],
    ['Windows installer', 'docs/INSTALLER.md'],
    ['Beginner’s source guide', 'docs/BEGINNERS_GUIDE.md'],
    ['Architecture', 'docs/ARCHITECTURE.md'],
    ['Q4 formulation', 'docs/formulations/Q4.md'],
    ['H8 formulation', 'docs/formulations/H8.md'],
    ['System solution', 'docs/formulations/SYSTEM_SOLUTION.md'],
    ['Release validation', 'docs/RELEASE_VALIDATION.md'],
    ['GUI acceptance', 'docs/GUI_ACCEPTANCE.md'],
    ['Project decisions', 'docs/PROJECT_DECISIONS.md'],
    ['Demonstration plan', 'docs/DEMONSTRATION.md'],
  ] as const) {
    const link = page.locator(`a[href="${solverDocument(document[1])}"]`);
    await expect(link).toHaveCount(1);
    await expect(link).toContainText(document[0]);
  }
  await expect(
    page.getByText('Independently validate results before engineering use.'),
  ).toBeVisible();
});

test('documentation anchors, themes and responsive layout work', async ({
  page,
}, testInfo) => {
  await page.goto('/docs/');
  await page
    .getByRole('link', { name: 'Understand the solver', exact: true })
    .click();
  await expect(page).toHaveURL(/#understand$/);
  await expect(
    page.getByRole('heading', { name: 'Understand the solver' }),
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
      path: testInfo.outputPath(`documentation-${theme}-mobile.png`),
      fullPage: true,
    });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.screenshot({
      path: testInfo.outputPath(`documentation-${theme}-desktop.png`),
      fullPage: true,
    });
  }
});
