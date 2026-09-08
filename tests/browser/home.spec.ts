import { test, expect } from '@playwright/test';
import { solverDocument } from '../../src/config/solver-evidence';

test('home exposes evidence and a real result image', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'From your model.',
  );
  await expect(
    page.getByRole('link', { name: 'Read the beginner’s guide' }),
  ).toHaveAttribute('href', solverDocument('docs/BEGINNERS_GUIDE.md'));
  await expect(
    page.getByRole('link', { name: 'Read the validation record' }),
  ).toHaveAttribute('href', solverDocument('docs/RELEASE_VALIDATION.md'));
  await expect(
    page.getByText('Independently validate results before engineering use.', {
      exact: false,
    }),
  ).toBeVisible();
  const image = page.getByRole('img', {
    name: /ParaView displacement-magnitude/,
  });
  await expect(image).toBeVisible();
  expect(
    await image.evaluate(
      (img: HTMLImageElement) =>
        img.complete && img.naturalWidth === 1380 && img.naturalHeight === 630,
    ),
  ).toBe(true);
  await page.getByRole('link', { name: 'Explore the workflow' }).click();
  await expect(page).toHaveURL(/#workflow$/);
  await expect(
    page.getByRole('heading', { name: 'Inspect. Solve. Understand.' }),
  ).toBeInViewport();
});

test('home supports enlarged text and both themes', async ({
  page,
}, testInfo) => {
  await page.goto('/');
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.locator('html').evaluate((el) => {
      el.style.fontSize = '200%';
    });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  await page.locator('html').evaluate((el) => {
    el.style.fontSize = '';
  });
  for (const theme of ['light', 'dark'] as const) {
    await page.getByLabel('Appearance', { exact: true }).selectOption(theme);
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.screenshot({
        path: testInfo.outputPath(`home-${theme}-${width}.png`),
        fullPage: true,
      });
    }
  }
});
