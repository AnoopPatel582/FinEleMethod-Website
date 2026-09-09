# Website progress

## Stage 1: foundation

- Confirmed decisions recorded.
- Independent local repository initialized.
- Astro, strict TypeScript, Tailwind v4, formatting and lint configuration.
- Minimal noindex build-verification page; product pages are not built yet.
- CI definition checks Windows and Linux.
- Public repository created: https://github.com/AnoopPatel582/FinEleMethod-Website.
- Local clean npm ci and npm run verify passed on 2026-09-07: formatting, lint, Astro checks (zero errors/warnings), static build.
- Production preview returned HTTP 200 with the expected heading and noindex; generated Tailwind utilities verified.
- Approved skills installed and Tailwind educational snapshot initialized locally; GetDesign Vercel reference retrieved.
- Remote CI status is available in GitHub Actions; local checks do not establish remote success.

## Next stage

- Verify the About-page PR on Windows/Linux, then build the Privacy page.

## Stage 2: design system

- Original SVG mesh symbol, responsive wordmark and favicon.
- Semantic navy/graphite/cyan tokens with dark and light palettes.
- System/Light/Dark selector; manual persistence, live OS changes, cross-tab synchronization, blocked-storage and no-JavaScript fallbacks.
- Shared layout, logo, theme control, button links, panels and badges.
- Development component preview at `/`, still noindex and not publicly deployed.
- Vitest checks color contrast against actual CSS; Playwright checks interactions, focus, responsive overflow, reduced motion and Axe accessibility in Chromium/Firefox/WebKit.
- GitHub CI now runs the same browser tests on both Linux and Windows.
- Stage 2 cross-engine CI verification passed: Windows and Ubuntu each passed 18 unit tests and all 21 browser tests, with zero Astro diagnostics (run 34146279666, verified 2026-09-08).
- Local contrast tests and all Chromium/WebKit checks pass; local Firefox still fails before browser startup. This machine-specific test limitation remains documented.
- See docs/validation/design-system.md for verification evidence and acceptance limits.

## Stage 3: responsive shell

- Shared SiteHeader, SiteFooter, SiteFrame and PageLayout.
- Typed navigation with active-route matching, including nested-path boundary tests.
- Mobile menu with keyboard/Escape support, outside dismissal and resize focus transfer; no-JavaScript navigation remains usable.
- Seven development routes: Home, Features, Examples, Documentation, Download, About and Privacy. Unfinished content is explicitly labelled; no download URLs or product claims fabricated.
- Automated tests cover route navigation, theme persistence, runtime/resource errors, menu behavior, responsiveness and Axe checks across all routes.
- Verification evidence is recorded in docs/validation/site-shell.md; deployment remains deferred.
- Both required checks passed in run 34182427344; PR #2 merged as `14aa16d` on 2026-09-08.

## Stage 4: Home page

- Solver overview, supported element families, workflow, evidence links and engineering-use limitations.
- Product claims sourced from the solver checkout at `5941df69f3ef8469170ee086d08195bd25f7728a`; documentation links are pinned to that commit.
- Original user-supplied ParaView screenshot copied unchanged, with provenance and limitations recorded in docs/validation/home-page.md.
- Component preview preserved at `/design-system/`; six remaining product pages still explicitly labelled incomplete.
- New browser tests cover evidence links, image loading, workflow navigation, 200% text enlargement and screenshots in both themes.
- All pages remain noindex; release metadata, direct installer links and deployment are deferred.
- Both required checks passed; PR #3 merged as `fc68123` on 2026-09-08.

## Stage 5: Features page

- Capability catalogue for analysis scope, model input, numerical pipeline, result fields and Windows workbench.
- Explicit unsupported-scope section and independent-validation warning.
- On-page navigation, both themes, Axe checks and responsive coverage from 320 to 2560 CSS pixels.
- Technical links remain pinned to verified solver commit `5941df6`.
- Formatting, lint, Astro checks, 25 unit tests, the eight-route production build and all 32 Chromium/WebKit scenarios pass locally.
- The 16 Firefox scenarios fail before startup because of the documented machine-specific launch limitation; all 48 scenarios remain enabled for required clean-runner CI before merge.
- Both required checks passed in run 34195241681; PR #4 merged as `813fd1f` on 2026-09-08.

## Stage 6: Examples page

- Three benchmark-led sections for the Q4 cantilever, Q4 plate with a hole and H8 compression cases.
- Exact analytical and solver comparison values, model assumptions, tolerances and interpretation limits sourced from the pinned solver commit.
- Direct commit-pinned links to each benchmark method and runnable ABAQUS input.
- Reuses the documented user-supplied plate-with-a-hole ParaView image; no benchmark imagery or result was generated.
- On-page navigation, both themes, Axe checks and responsive coverage from 320 to 2560 CSS pixels.
- Formatting, lint, Astro checks, 25 unit tests, the eight-route production build and all 36 Chromium/WebKit scenarios pass locally.
- The 18 Firefox scenarios fail before startup because of the documented machine-specific launch limitation; all 54 scenarios remain enabled for required clean-runner CI before merge.
- Both required checks passed in run 34247364989; PR #5 merged as `5a45352` on 2026-09-08.

## Stage 7: Documentation page

- Practical five-step Windows-workbench guide from launch through ParaView result inspection.
- Expected Q4 tension verification values and consistent-unit limitation stated beside the workflow.
- Eleven commit-pinned source links grouped into installation, solver concepts and validation references.
- The website provides the concise user path while detailed architecture, formulation and validation documents remain authoritative in the solver repository.
- On-page navigation, both themes, Axe checks and responsive coverage from 320 to 2560 CSS pixels.
- Formatting, lint, Astro checks, 25 unit tests, the eight-route production build and all 40 Chromium/WebKit scenarios pass locally.
- The 20 Firefox scenarios fail before startup because of the documented machine-specific launch limitation; all 60 scenarios remain enabled for required clean-runner CI before merge.
- Both required checks passed in run 34250433034; PR #6 merged as `b64b713` on 2026-09-08.

## Stage 8: Download page

- Typed release configuration for version, publication date, exact source commit, Windows requirements and all direct asset URLs.
- Installer-first download path with the portable ZIP as an alternative.
- Exact published SHA-256 values, byte sizes, checksum files, release manifest and source provenance.
- Windows 10 x64, administrator and Visual C++ Runtime requirements stated per package.
- Unsigned-installer warning and the outstanding runtime-absent qualification are visible before engineering-use guidance.
- All five release asset endpoints returned HTTP 200 with expected sizes on 2026-09-09.
- Formatting, lint, Astro checks, 27 unit tests, the eight-route production build and all 44 Chromium/WebKit scenarios pass locally.
- The 22 Firefox scenarios fail before startup because of the documented machine-specific launch limitation; all 66 scenarios remain enabled for required clean-runner CI before merge.
- Both required checks passed in run 34304415723; PR #7 merged as `0a878cd` on 2026-09-09.

## Stage 9: About page

- Confirmed project purpose, creator attribution, engineering principles and development approach.
- Technical-identity map covers the chosen core, elements, numerical system, interfaces, storage and result formats.
- Development journey follows the verified progression from command-line core through validation, Windows workbench and packaged release.
- Architecture and project-decision links remain pinned to solver commit `5941df6`.
- Public-source and copyright wording does not describe the project as open-source.
- Explicit current-scope and independent-validation limits remain visible.
- Formatting, lint, Astro checks, 27 unit tests, the eight-route production build and all 48 Chromium/WebKit scenarios pass locally.
- The 24 Firefox scenarios fail before startup because of the documented machine-specific launch limitation; all 72 scenarios remain enabled for required clean-runner CI before merge.

## Before launch

- Main branch protection is configured; verify Vercel deployment gating before launch.
- Verify release metadata, asset links, and download checksums.
- Extend behavior tests and Axe as real pages are added; add Lighthouse CI.
- Complete supported-browser and 320px-to-ultrawide acceptance.
- Verify provider privacy wording, asset licences, canonical domain and robots policy.
- Replace the foundation page and remove noindex only for production content.
