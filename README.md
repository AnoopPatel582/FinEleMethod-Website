# FinEleMethod Website

- Product website for the Windows FinEleMethod finite-element solver.
- Current pages: evidence-based Home, Features, Examples, Documentation, Download and About pages, shared responsive shell, original ParaView result image, and System/Light/Dark themes.
- No backend or database.
- Copyright © Anoop Patel. All rights reserved. Third-party dependencies retain their licences.

## Run locally

1. Install Node.js 24.20.0 (the version in .nvmrc).
2. Open a terminal in this repository.
3. Run `npm ci`.
4. Run `npm run dev`.
5. Open the local address printed in the terminal.

## Verify

- Before browser tests, run `npx playwright install chromium firefox webkit` (Linux may require `--with-deps`).
- `npm run verify`: formatting, lint, Astro checks, contrast unit tests, production build and browser/accessibility tests.
- `npm test`: semantic color contrast checks against the actual CSS tokens.
- `npm run test:browser`: Chromium, Firefox and WebKit tests against a completed production build.
- `npm run preview`: serve the production build locally after verification.
- `npm run format`: apply formatting.
- CI runs the same verification on Linux and Windows.
- All seven routes remain noindex during development. Home presents the solver, Features documents its scope, Examples presents the analytical comparisons, Documentation provides the first-analysis guide and technical reference map, Download links directly to verified release assets, and About explains the project intent and engineering approach. The original component preview is at `/design-system/`. Deployment remains pending; a Privacy page is deferred until it is needed.
- Browser screenshots and failure traces are written to ignored test-results/ and playwright-report/ directories.
- Lighthouse CI and full real-device acceptance remain later release checks.

## Project records

- [Confirmed decisions](WEBSITE_DECISIONS.md)
- [Design direction](DESIGN.md)
- [Progress and next step](docs/PROGRESS.md)
- [Tooling and references](docs/TOOLING.md)

## Directory responsibilities

- `src/pages/`: Astro routes.
- `src/styles/`: shared Tailwind entry point.
- `public/`: static assets.
- `docs/`: development records and reference provenance.
- `.agents/skills/`: approved development skills.
- `.github/workflows/`: automated checks.
