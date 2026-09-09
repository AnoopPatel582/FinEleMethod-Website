# About-page evidence and validation

## Project-story sources

- Reviewed on 2026-09-09 against solver commit `5941df69f3ef8469170ee086d08195bd25f7728a`.
- `docs/PROJECT_DECISIONS.md` defines FinEleMethod as a serious software-engineering and learning project, not only an academic submission, and records incremental development and testing.
- The same decision record establishes C++20, MSVC, CMake, Q4 then H8, custom FEM and numerical calculations, file-based projects, a standalone CLI and a wxWidgets Windows workbench.
- `docs/ARCHITECTURE.md` records the independently runnable command-line solver, separate GUI process, element-to-COO-to-CSR pipeline, Conjugate Gradient solution and VTU/JSON outputs.
- Anoop Patel is the confirmed publisher and copyright holder. The page links to the previously supplied GitHub profile without adding a personal biography.
- No adoption, employment, education, performance, affiliation or testimonial claim is made.

## Licensing and engineering limits

- The source repository is publicly viewable, but no open-source licence is selected; copyright remains reserved.
- The page identifies the current linear-static Q4/H8 scope and excludes automatic unit conversion, nonlinear analysis, contact, dynamics and automatic meshing.
- Users are instructed to supply consistent units and independently validate models before engineering use.

## Interface checks

- Semantic header, navigation, sections, ordered lists, definition list and hierarchical headings provide a structured project narrative.
- On-page links expose principles, architecture decisions and development journey as stable anchors.
- Responsive checks cover 320, 390, 768, 1024, 1440 and 2560 CSS pixels in both themes.
- Axe checks run at 390px in both themes; automated results do not establish complete WCAG conformance.

## Verification status

- About-specific Chromium and WebKit checks pass locally: four scenarios total; clean-runner CI will add the two Firefox scenarios.
- Full local regression passed formatting, lint, Astro checks with zero diagnostics, all 27 unit tests and the eight-route production build.
- All 48 Chromium/WebKit scenarios pass, including project-story evidence, anchor navigation, responsive layouts, themes, Axe scans and no-JavaScript navigation.
- The complete matrix contains 72 scenarios. All 24 Firefox scenarios fail before startup with `browserType.launch: spawn UNKNOWN` because of the known machine-specific limitation.
- Firefox stays enabled in required Windows and Ubuntu GitHub CI; the pull request must not merge until those clean-runner checks pass.
