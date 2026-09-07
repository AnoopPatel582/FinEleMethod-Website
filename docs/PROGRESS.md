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

- Resolve the Firefox test-browser launch blocker and verify the full Windows/Linux CI suite before closing Stage 2.
- Then build the responsive site header, navigation, footer and shared page layouts.
- Product pages follow after shell acceptance.

## Stage 2: design system

- Original SVG mesh symbol, responsive wordmark and favicon.
- Semantic navy/graphite/cyan tokens with dark and light palettes.
- System/Light/Dark selector; manual persistence, live OS changes, cross-tab synchronization, blocked-storage and no-JavaScript fallbacks.
- Shared layout, logo, theme control, button links, panels and badges.
- Development component preview at `/`, still noindex and not publicly deployed.
- Vitest checks color contrast against actual CSS; Playwright checks interactions, focus, responsive overflow, reduced motion and Axe accessibility in Chromium/Firefox/WebKit.
- GitHub CI now runs the same browser tests on both Linux and Windows.
- Local contrast tests and all Chromium/WebKit checks pass; Firefox fails before browser startup. Stage 2 verification remains open.
- See docs/validation/design-system.md for verification evidence and the exact blocker.

## Before launch

- Main branch protection is configured; verify Vercel deployment gating before launch.
- Verify release metadata, asset links, and download checksums.
- Extend behavior tests and Axe as real pages are added; add Lighthouse CI.
- Complete supported-browser and 320px-to-ultrawide acceptance.
- Verify provider privacy wording, asset licences, canonical domain and robots policy.
- Replace the foundation page and remove noindex only for production content.
