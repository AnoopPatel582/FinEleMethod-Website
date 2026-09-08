# FinEleMethod design direction

Implemented design system. The development page at `/` demonstrates the primitives before product pages are built.

- Brand: navy, graphite, cyan; clear typography and restrained animation.
- Support light and dark themes with readable scientific documentation.
- Use original FEM mesh symbols and genuine validated solver results.
- Responsive layouts begin at 320px; preserve zoom, focus, and reduced motion.
- Use GetDesign's Vercel reference for spacing and visual discipline only.
- Reference file: docs/references/vercel-design.md when installed.
- Vercel interface guidelines guide accessibility and UX reviews.
- Confirmed WEBSITE_DECISIONS.md takes precedence.

## Tokens and typography

- Source of truth: `src/styles/global.css`; semantic colors map through Tailwind `@theme inline`.
- Dark: canvas #0b1220, surface #111d2e, elevated #1c2c40, ink #edf3fa, muted #acbccf, accent #67e8f9.
- Light: canvas #f5f7fa, surface #ffffff, elevated #e7edf3, ink #142238, muted #485b71, accent #00677d.
- System sans-serif for readable prose; Cascadia Code/Consolas/system monospace for technical notation. No remote font requests.
- Use the Tailwind spacing scale, 6px control corners and 12px panel corners; 44px minimum action/control height.
- Container maximum 76rem; 20px minimum side gutters; layouts reflow from 320px.
- Underlines and a 3px focus outline communicate interaction. Reduced motion removes transitions and hover translation.

## Original identity

- `Logo.astro` combines a quadrilateral face with an H8 projection and connected corner nodes.
- Variants: standard wordmark, large responsive wordmark, symbol-only with accessible text.
- `public/favicon.svg` uses the same geometry on a navy tile for reliable browser-tab contrast.
- The illustration is a brand symbol, not a computed mesh or an analysis result.
- Keep the symbol proportional and retain clear space of at least one node diameter.

## Theme behavior

- First visit follows OS preference; no preference falls back to dark.
- System, Light and Dark are explicit native-select choices.
- Manual preference uses only `finelemethod-theme` localStorage; System clears it.
- OS changes update System mode; storage events synchronize other tabs.
- Blocked storage does not disable switching during the current visit.
- A shared inline head script applies saved preference before content paints.
- Without JavaScript, CSS follows the OS and hides inactive theme controls.

## Components

- BaseLayout: document metadata, favicon, theme initialization and skip link.
- Logo, ThemeControl, ButtonLink, Panel and Badge provide the initial reusable primitives.
- Actual links retain native navigation; there are no simulated download actions.
- Product shell, navigation and content pages are the following stage.
