# Features-page evidence and validation

## Product sources

- Reviewed on 2026-09-08 against solver commit `5941df69f3ef8469170ee086d08195bd25f7728a`.
- `docs/PROJECT_DECISIONS.md` supports the implemented Q4 plane-stress, Q4 plane-strain and H8 formulations, isotropic elastic materials, multiple materials, supported inputs and result fields.
- `docs/ARCHITECTURE.md` supports the COO-to-CSR assembly pipeline, direct elimination, Conjugate Gradient solution, result recovery, file-based projects, separate solver process, immutable run directories and cooperative cancellation.
- Links to both documents are commit-pinned so later solver changes cannot silently alter this page's evidence.
- The page says “supported subset” and lists material exclusions; it does not imply complete ABAQUS compatibility or capabilities outside the verified scope.

## Interface checks

- Native heading, navigation, section, definition-list and link semantics follow the current Vercel Web Interface Guidelines, with confirmed project decisions taking precedence.
- On-page navigation updates the URL fragment and moves the selected capability into view.
- Responsive checks cover 320, 390, 768, 1024, 1440 and 2560 CSS pixels in both themes.
- Axe checks run on the 390px layout in both themes; automated results do not establish complete WCAG conformance.
- Light mobile and dark desktop screenshots were reviewed for hierarchy, legibility, reflow and overflow.

## Verification status

- Features-specific Chromium and WebKit checks pass locally: four scenarios total; clean-runner CI will add the two Firefox scenarios.
- The production build contains eight static routes with no duplicate-route warning.
- Full local regression passed formatting, lint, Astro checks with zero diagnostics, all 25 unit tests and the production build.
- The full browser matrix contains 48 scenarios. All 32 Chromium/WebKit scenarios pass locally; all 16 Firefox scenarios fail before startup with `browserType.launch: spawn UNKNOWN` because of the known machine-specific limitation.
- Firefox stays enabled in required Windows and Ubuntu GitHub CI; the pull request must not merge until those clean-runner checks pass.
