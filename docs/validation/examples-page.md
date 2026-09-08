# Examples-page evidence and validation

## Benchmark sources

- Reviewed on 2026-09-08 against solver commit `5941df69f3ef8469170ee086d08195bd25f7728a`.
- `docs/benchmarks/cantilever_beam.md` records the Q4 cantilever model, the `−4.0` beam-theory displacement, the `−3.63828` solver result, `9.04%` relative error and `10%` acceptance limit.
- `docs/benchmarks/plate_with_hole.md` records the interior Gauss-point Kirsch value `2.58158`, solver hoop stress `2.63094`, `1.91%` relative error and `10%` acceptance limit.
- `docs/benchmarks/h8_compression.md` records the exact and computed top displacement `−0.01` plus checks of all eight Gauss points with a `1 × 10⁻¹¹` tolerance.
- Each benchmark method and runnable input link is pinned to that exact commit.
- The page distinguishes benchmark-specific evidence from validation of a new engineering model.

## Image provenance

- The plate-with-a-hole section reuses `public/images/plate-hole-displacement.png`, whose original user-supplied source, checksum and limitations are recorded in `docs/validation/home-page.md`.
- The caption states that the image displays displacement while the numerical comparison uses hoop stress.
- No cantilever or H8 image was invented to fill the page.

## Interface checks

- The page uses semantic articles, headings, navigation, definition lists, figure and caption markup.
- Model and comparison numbers use tabular numerals.
- Responsive checks cover 320, 390, 768, 1024, 1440 and 2560 CSS pixels in both themes.
- Axe checks run at 390px in both themes; automated results do not establish complete WCAG conformance.
- Light mobile and dark desktop screenshots were reviewed for hierarchy, image presentation, legibility and overflow.

## Verification status

- Examples-specific Chromium and WebKit checks pass locally: four scenarios total; clean-runner CI will add the two Firefox scenarios.
- Full local regression passed formatting, lint, Astro checks with zero diagnostics, all 25 unit tests and the eight-route production build.
- All 36 Chromium/WebKit scenarios pass after updating the shell's no-JavaScript assertion from the retired placeholder heading to the real Examples heading.
- The complete matrix contains 54 scenarios. All 18 Firefox scenarios fail before startup with `browserType.launch: spawn UNKNOWN` because of the known machine-specific limitation.
- Firefox stays enabled in required Windows and Ubuntu GitHub CI; the pull request must not merge until those clean-runner checks pass.
