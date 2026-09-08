import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { solverDocument } from '../../src/config/solver-evidence';

test('examples presents three traceable analytical comparisons', async ({
  page,
}) => {
  await page.goto('/examples/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Benchmarks with their assumptions visible.',
  );

  for (const benchmark of [
    {
      title: 'Cantilever beam',
      result: '−3.63828',
      document: 'docs/benchmarks/cantilever_beam.md',
      input: 'examples/abaqus/q4_cantilever.inp',
    },
    {
      title: 'Plate with a hole',
      result: '2.63094',
      document: 'docs/benchmarks/plate_with_hole.md',
      input: 'examples/abaqus/q4_plate_with_hole.inp',
    },
    {
      title: 'Block under compression',
      result: '−0.01',
      document: 'docs/benchmarks/h8_compression.md',
      input: 'examples/abaqus/h8_compression.inp',
    },
  ]) {
    const article = page.getByRole('article', { name: benchmark.title });
    await expect(article).toContainText(benchmark.result);
    await expect(
      article.getByRole('link', { name: 'Read benchmark method' }),
    ).toHaveAttribute('href', solverDocument(benchmark.document));
    await expect(
      article.getByRole('link', { name: 'View runnable input' }),
    ).toHaveAttribute('href', solverDocument(benchmark.input));
  }

  const image = page.getByRole('img', {
    name: /ParaView displacement-magnitude contour/,
  });
  await expect(image).toBeVisible();
  expect(
    await image.evaluate(
      (element: HTMLImageElement) =>
        element.complete &&
        element.naturalWidth === 1380 &&
        element.naturalHeight === 630,
    ),
  ).toBe(true);
  await expect(
    page.getByText('A benchmark validates a defined case—not every model.'),
  ).toBeVisible();
});

test('example anchors, themes and responsive layout work', async ({
  page,
}, testInfo) => {
  await page.goto('/examples/');
  await page.getByRole('link', { name: 'Plate with a hole' }).click();
  await expect(page).toHaveURL(/#plate-hole$/);
  await expect(
    page.getByRole('heading', { name: 'Plate with a hole' }),
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
      path: testInfo.outputPath(`examples-${theme}-mobile.png`),
      fullPage: true,
    });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.screenshot({
      path: testInfo.outputPath(`examples-${theme}-desktop.png`),
      fullPage: true,
    });
  }
});
