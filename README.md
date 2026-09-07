# FinEleMethod Website

- Product website for the Windows FinEleMethod finite-element solver.
- Foundation stage: Astro, TypeScript, Tailwind CSS v4 and a build-verification page.
- No backend or database.
- Copyright © Anoop Patel. All rights reserved. Third-party dependencies retain their licences.

## Run locally

1. Install Node.js 24.20.0 (the version in .nvmrc).
2. Open a terminal in this repository.
3. Run `npm ci`.
4. Run `npm run dev`.
5. Open the local address printed in the terminal.

## Verify

- `npm run verify`: formatting, lint, Astro type checks and static production build.
- `npm run preview`: serve the production build locally after verification.
- `npm run format`: apply formatting.
- CI runs the same verification on Linux and Windows.
- Browser tests, Axe and Lighthouse CI will be introduced with actual interface behavior.

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
