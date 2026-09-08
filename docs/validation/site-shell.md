# Responsive-shell validation

- Scope: shared navigation/header/footer, page layout and clearly labelled development routes, not finished product pages.
- Date: 2026-09-08; Node 24.20.0 and pinned project dependencies.
- Mobile-first implementation follows the installed Tailwind engineering playbook; review uses the [Vercel Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md), with confirmed decisions taking precedence.
- All routes remain noindex; no deployment was performed.

## Test coverage

- 25 unit checks: color contrast, unique navigation entries and route-boundary matching.
- 36 browser checks across Chromium, Firefox and WebKit: original design-system checks plus five shell scenarios per engine.
- Shell scenarios cover keyboard opening, Tab, Escape, resize focus transfer, outside dismissal, real route navigation, active-page state, saved theme across pages, no JavaScript and runtime/resource errors.
- All seven routes are checked for overflow at 320, 390, 768, 1024, 1280, 1440 and 2560 CSS pixels, in light and dark modes.
- Axe checks all seven routes with the mobile menu open in both themes.
- Local light-theme desktop and mobile screenshots reviewed: header, current-page state, layout and footer remain readable without overlap.

## Verification status

- Local final regression: formatting and lint passed; Astro reported zero errors, warnings and hints across 24 files; all 25 unit tests and the seven-page static build passed.
- All 24 Chromium/WebKit browser tests passed. The keyboard/resize scenario also passed five consecutive repetitions per engine before the final run.
- Full local verification remains non-green solely because all 12 Firefox scenarios fail before browser startup. Clean-runner CI must pass before merging.
- Clean Windows and Ubuntu runners both passed for `fd22b05` in [run 34182427344](https://github.com/AnoopPatel582/FinEleMethod-Website/actions/runs/34182427344). PR #2 was merged as `14aa16d` after those required checks passed.
- The existing local Firefox launch limitation remains documented in design-system.md. The full Firefox suite is retained in CI; a local launch failure is not recorded as a passed test.
- Actual Safari, screen readers, physical devices, zoom acceptance and Lighthouse remain later acceptance checks. Automated Axe results do not establish complete WCAG conformance.
