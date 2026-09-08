import { readFileSync } from 'node:fs';
import { describe, it, expect } from 'vitest';
const css = readFileSync(
  new URL('../../src/styles/global.css', import.meta.url),
  'utf8',
);
function luminance(hex: string) {
  const channels = hex.match(/[a-f0-9]{2}/gi)!.map((value) => {
    const n = parseInt(value, 16) / 255;
    return n <= 0.04045 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4;
  });
  return channels[0]! * 0.2126 + channels[1]! * 0.7152 + channels[2]! * 0.0722;
}
for (const theme of ['dark', 'light']) {
  describe(`${theme} semantic color contrast`, () => {
    const block =
      theme === 'dark'
        ? css.match(/:root\s*{([^}]+)}/)![1]!
        : css.match(/:root\[data-theme='light'\]\s*{([^}]+)}/)![1]!;
    const colors = Object.fromEntries(
      [...block.matchAll(/--([\w-]+):\s*(#[a-f0-9]{6})/gi)].map((match) => [
        match[1],
        match[2],
      ]),
    );
    for (const [fg, bg, minimum] of [
      ['ink', 'canvas', 4.5],
      ['ink', 'surface', 4.5],
      ['muted', 'canvas', 4.5],
      ['muted', 'surface', 4.5],
      ['muted', 'elevated', 4.5],
      ['accent', 'surface', 4.5],
      ['accent', 'canvas', 4.5],
      ['on-accent', 'accent', 4.5],
      ['line', 'surface', 3],
    ] as const) {
      it(`${fg} on ${bg} meets ${minimum}:1`, () => {
        const a = luminance(colors[fg]!);
        const b = luminance(colors[bg]!);
        expect(
          (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05),
        ).toBeGreaterThanOrEqual(minimum);
      });
    }
  });
}
