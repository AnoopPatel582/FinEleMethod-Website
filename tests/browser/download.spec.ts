import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { release } from '../../src/config/release';

test('download presents verified release packages and requirements', async ({
  page,
}) => {
  await page.goto('/download/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Download FinEleMethod for Windows.',
  );
  await expect(page.getByText('September 6, 2026')).toBeVisible();

  const installer = page.getByRole('link', {
    name: /Download FinEleMethod 0\.1\.0 Windows installer/,
  });
  await expect(installer).toHaveAttribute('href', release.installer.url);
  const portable = page.getByRole('link', {
    name: /Download FinEleMethod 0\.1\.0 portable ZIP/,
  });
  await expect(portable).toHaveAttribute('href', release.portable.url);

  await expect(page.getByText(release.installer.sha256)).toBeVisible();
  await expect(page.getByText(release.sourceCommit)).toBeVisible();
  await expect(page.getByText('Windows 10 or later')).toBeVisible();
  await expect(page.getByText('unknown-publisher warning')).toBeVisible();
  await expect(
    page.getByText(
      /runtime-installation branch still requires independent testing/,
    ),
  ).toBeVisible();

  for (const url of [
    release.installer.checksumUrl,
    release.portable.checksumUrl,
    release.manifest.url,
    release.sourceCommitUrl,
    release.releaseUrl,
  ]) {
    await expect(page.locator(`a[href="${url}"]`)).toHaveCount(1);
  }
});

test('download verification, themes and responsive layout work', async ({
  page,
}, testInfo) => {
  await page.goto('/download/');
  await page.getByRole('link', { name: 'View Verification Steps' }).click();
  await expect(page).toHaveURL(/#verify$/);
  await expect(
    page.getByRole('heading', { name: 'Verify with PowerShell' }),
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
      path: testInfo.outputPath(`download-${theme}-mobile.png`),
      fullPage: true,
    });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.screenshot({
      path: testInfo.outputPath(`download-${theme}-desktop.png`),
      fullPage: true,
    });
  }
});
