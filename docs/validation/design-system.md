# Design-system validation

## Scope

- Stage 2 development component preview only; no product pages or deployment.
- Tested locally on Windows on 2026-09-07 with Node 24.20.0.
- Original Q4/H8-inspired SVG identity, reusable components, dark/light palettes and System/Light/Dark preferences.

## Verified locally

- Prettier and ESLint passed.
- Astro source diagnostics: 16 files, zero errors, warnings or hints.
- Vitest: all 18 semantic color-contrast tests passed.
- Production static build passed.
- Chromium and WebKit: all 14 browser tests passed.
- Theme persistence, live system changes, cross-tab changes, invalid/blocked storage, keyboard skip navigation and no-JavaScript fallback passed in those two engines.
- No horizontal overflow at 320, 390, 768, 1440 and 2560 CSS pixels.
- Axe reported zero violations for the selected WCAG 2/2.1/2.2 A/AA rules at 390 and 1440 pixels in both themes in those two engines.
- Desktop dark Chromium and mobile light WebKit screenshots visually reviewed: content, identity and controls remain readable without overlap.

## Corrections during verification

- Exact accessible-name matching distinguishes the Appearance control from the appearance information section.
- An explicit normal tab stop on the skip link makes it reachable with Tab in Windows WebKit. Enter transfers focus to main content.
- Generated Playwright reports are excluded from source type-checking, lint and formatting.
- Dark control-border contrast was increased to meet the tested 3:1 threshold.

## Open verification blocker

- Full local verification is not green: the seven Firefox tests cannot launch their browser.
- Playwright Firefox build 1543 reports `spawn UNKNOWN`; Windows SideBySide events report that the dependent `mozglue` assembly cannot be found, although `mozglue.dll` is present.
- Reinstalling the official Playwright Firefox package with `playwright install --force firefox` did not resolve the launch error.
- No browser binaries, Windows settings, security controls or test assertions were bypassed to hide this failure.
- The full three-engine suite remains enabled for Windows and Linux CI. Clean-runner results must be checked before merging this stage.

## Limits

- Automated Axe results do not establish complete WCAG conformance.
- Native Safari, previous browser versions, physical-device and screen-reader acceptance remain future checks.
- Lighthouse and product-page validation follow in later stages.
- Screenshots and traces are generated under ignored `test-results/` and `playwright-report/`; CI retains reports on failures.
- UI review used the [Vercel Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md), with confirmed project decisions taking precedence.
