import { describe, expect, it } from 'vitest';
import {
  formatBytes,
  formatMegabytes,
  formatReleaseDate,
  release,
} from '../../src/config/release';

describe('release metadata', () => {
  it('keeps versioned direct-download assets internally consistent', () => {
    expect(release.tag).toBe(`v${release.version}`);
    expect(release.releaseUrl).toContain(`/tag/${release.tag}`);

    for (const asset of [release.installer, release.portable]) {
      expect(asset.url).toContain(`/download/${release.tag}/${asset.filename}`);
      expect(asset.bytes).toBeGreaterThan(0);
      expect(asset.sha256).toMatch(/^[a-f0-9]{64}$/);
      expect(asset.checksumUrl).toBe(`${asset.url}.sha256`);
    }
  });

  it('formats release values for display', () => {
    expect(formatMegabytes(release.installer.bytes)).toBe('23.6\u00a0MB');
    expect(formatBytes(release.portable.bytes)).toBe('4,830,974 bytes');
    expect(formatReleaseDate(release.publishedAt)).toBe('September 6, 2026');
  });
});
