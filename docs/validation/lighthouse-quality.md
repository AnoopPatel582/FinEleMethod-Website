# Lighthouse quality validation

Validated locally on 2026-09-09 against the completed static build.

## Gate

- Lighthouse 13.4.1 is pinned as a development dependency.
- The runner starts the repository's static production server and a temporary isolated Chrome profile.
- Home, Features, Examples, Documentation, Download and About are audited.
- Performance, accessibility, best-practices and eligible SEO checks must each score at least 90.
- HTML and JSON reports are written only to the ignored `lighthouse-report/` directory. No report is uploaded to an external Lighthouse service.

## Development indexing exception

Every weighted SEO audit remains part of the score except `is-crawlable`. That single audit is deferred because all pages deliberately use `noindex, nofollow` before deployment. The runner prints both the gated score and the unmodified Lighthouse category score so this exception cannot be mistaken for a production SEO pass.

The exception must be removed when production indexing is enabled. Until then, raw SEO scores remain 63–66 even though every eligible SEO audit scores 100.

## Results

All six public pages scored:

- Performance: 100
- Accessibility: 100
- Best practices: 100
- Eligible SEO audits: 100

The initial run measured a cumulative layout shift of 0.227 on five pages because the mobile navigation collapsed after first paint. Adding the JavaScript-capable state before body rendering removed that shift while retaining a visible navigation fallback when JavaScript is disabled.

## Dependency review

The current `@lhci/cli` 0.15.1 dependency tree produced seven high-severity npm audit findings, including findings through its older Lighthouse release. It was not retained. The current Lighthouse engine is used directly instead; the final dependency audit reported zero known vulnerabilities.
