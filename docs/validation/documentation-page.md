# Documentation-page evidence and validation

## User-guide sources

- Reviewed on 2026-09-08 against solver commit `5941df69f3ef8469170ee086d08195bd25f7728a`.
- The first-analysis workflow and expected Q4 tension values come from `docs/WINDOWS_QUICK_START.md` and `docs/BEGINNERS_GUIDE.md` at that commit.
- The page preserves the documented workbench actions: launch, choose the supplied model, create a separate project, run, and inspect the VTU result in ParaView.
- It states the consistent-unit requirement and independent-validation boundary.

## Reference integrity

- Eleven links cover the portable ZIP, installer, source build, architecture, Q4 and H8 formulations, system solution, release validation, GUI acceptance, project decisions and demonstration plan.
- Git object checks confirmed every target exists at the pinned solver commit.
- Technical material is linked rather than copied so the solver repository remains authoritative.
- No release asset URL, checksum, performance claim or unpublished guide was invented.

## Interface checks

- Semantic headings, navigation, ordered steps, reference regions, links and callouts provide a browsable documentation hierarchy.
- Responsive checks cover 320, 390, 768, 1024, 1440 and 2560 CSS pixels in both themes.
- Axe checks run at 390px in both themes; automated results do not establish complete WCAG conformance.
- Light mobile and dark desktop screenshots were reviewed for reading order, card hierarchy, legibility and overflow.

## Verification status

- Documentation-specific Chromium and WebKit checks pass locally: four scenarios total; clean-runner CI will add the two Firefox scenarios.
- Full local regression passed formatting, lint, Astro checks with zero diagnostics, all 25 unit tests and the eight-route production build.
- All 40 Chromium/WebKit scenarios pass, including the Documentation workflow, anchor navigation, themes, responsive layouts, Axe scans and no-JavaScript navigation.
- The complete matrix contains 60 scenarios. All 20 Firefox scenarios fail before startup with `browserType.launch: spawn UNKNOWN` because of the known machine-specific limitation.
- Firefox stays enabled in required Windows and Ubuntu GitHub CI; the pull request must not merge until those clean-runner checks pass.
