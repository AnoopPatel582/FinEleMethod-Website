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

- Verify Stage 3 on clean Windows/Linux runners, then build the real Home page from verified solver evidence.

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

## Before launch

- Main branch protection is configured; verify Vercel deployment gating before launch.
- Verify release metadata, asset links, and download checksums.
- Extend behavior tests and Axe as real pages are added; add Lighthouse CI.
- Complete supported-browser and 320px-to-ultrawide acceptance.
- Verify provider privacy wording, asset licences, canonical domain and robots policy.
- Replace the foundation page and remove noindex only for production content.
