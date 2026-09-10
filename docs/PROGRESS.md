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

- Complete the remaining quality validation before deployment. The Privacy page is deferred until requested.

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
- Seven development routes were originally created: Home, Features, Examples, Documentation, Download, About and a Privacy placeholder. The Privacy placeholder was later removed when that page was deferred.
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

## Stage 10: Lighthouse quality gate

- Current Lighthouse 13.4.1 is pinned directly; the unavailable secure upgrade path in `@lhci/cli` was rejected after its dependency audit reported seven high-severity findings.
- A repository-owned runner audits Home, Features, Examples, Documentation, Download and About with local-only HTML and JSON reports.
- Performance, accessibility, best-practices and eligible SEO audits must score at least 90.
- The intentional development `noindex` is the only deferred SEO audit. Raw SEO remains below the launch target until indexing is enabled; every other weighted SEO audit is still gated.
- The mobile navigation now starts collapsed before first paint when JavaScript is available, eliminating its measured cumulative layout shift while preserving visible no-JavaScript navigation.
- Local production audits on 2026-09-09 scored 100 for performance, accessibility, best practices and eligible SEO checks on all six public pages.
- `npm audit` reported zero known dependency vulnerabilities after the final Lighthouse dependency selection.

## Stage 11: Production deployment and indexing

- The public site is deployed at `https://fin-ele-method-website.vercel.app/`.
- Shared metadata now uses the deployed origin for canonical URLs and allows the six public routes to be indexed.
- `robots.txt` permits crawling and identifies a sitemap containing Home, Features, Examples, Documentation, Download and About.
- The internal `/design-system/` route remains `noindex, nofollow` and is excluded from the sitemap.
- The footer now identifies version 0.1.0 and its supported Windows platform instead of describing the site as unpublished.
- The production SEO audit is fully enforced with no deferred crawlability exception.
- Local Lighthouse scores on 2026-09-10 were 100 for accessibility, best practices and SEO on every public page; performance was 100 on five pages and 99 on Download.

## Remaining post-deployment checks

- Verify that Vercel production deployment follows the protected `main` branch workflow.
- Extend behavior tests and Axe as real pages are added; keep Lighthouse thresholds enforced.
- Complete supported-browser and 320px-to-ultrawide acceptance.
- Complete asset-licence review. Add and verify provider privacy wording if a Privacy page is introduced.
