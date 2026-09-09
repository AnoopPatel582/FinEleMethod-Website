# Lighthouse quality validation

Validated locally on 2026-09-10 against the production-indexable static build.

## Gate

- Lighthouse 13.4.1 is pinned as a development dependency.
- The runner starts the repository's static production server and a temporary isolated Chrome profile.
- Home, Features, Examples, Documentation, Download and About are audited.
- Performance, accessibility, best-practices and SEO must each score at least 90.
- HTML and JSON reports are written only to the ignored `lighthouse-report/` directory. No report is uploaded to an external Lighthouse service.

## Production indexing

Every weighted SEO audit, including crawlability, is enforced. The six public pages use `index, follow`, production canonical URLs, and the routes listed in `sitemap.xml`. The internal `/design-system/` preview remains `noindex, nofollow` and is excluded from the sitemap and Lighthouse route list.

## Results

All six public pages scored:

- Performance: 100 on five pages and 99 on Download
- Accessibility: 100
- Best practices: 100
- SEO: 100

The initial run measured a cumulative layout shift of 0.227 on five pages because the mobile navigation collapsed after first paint. Adding the JavaScript-capable state before body rendering removed that shift while retaining a visible navigation fallback when JavaScript is disabled.

## Dependency review

The current `@lhci/cli` 0.15.1 dependency tree produced seven high-severity npm audit findings, including findings through its older Lighthouse release. It was not retained. The current Lighthouse engine is used directly instead; the final dependency audit reported zero known vulnerabilities.
