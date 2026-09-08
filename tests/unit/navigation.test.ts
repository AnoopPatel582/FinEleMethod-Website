import { describe, expect, it } from 'vitest';
import { navigation, isCurrentPath } from '../../src/config/navigation';
describe('site navigation', () => {
  it('has unique labels and canonical routes', () => {
    expect(new Set(navigation.map((item) => item.href)).size).toBe(
      navigation.length,
    );
    expect(new Set(navigation.map((item) => item.label)).size).toBe(
      navigation.length,
    );
    expect(
      navigation.every(
        (item) => item.href.startsWith('/') && item.href.endsWith('/'),
      ),
    ).toBe(true);
  });
  it.each([
    ['/', '/', true],
    ['/docs', '/docs/', true],
    ['/docs/', '/docs/', true],
    ['/docs/start/', '/docs/', true],
    ['/docs-old/', '/docs/', false],
    ['/features/', '/', false],
  ])('matches %s against %s: %s', (path, href, expected) => {
    expect(isCurrentPath(path, href)).toBe(expected);
  });
});
