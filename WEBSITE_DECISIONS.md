# FinEleMethod website decisions

Status: confirmed by Anoop Patel during planning. Implementation status is recorded separately in docs/PROGRESS.md.

1. Purpose: combined product showcase, documentation, and Windows download website.
2. Audience: engineering students, beginners, recruiters, technical reviewers, engineers, and developers.
3. Primary pages: Home, Features, Examples, Documentation, Download, and About.
4. Framework: Astro and TypeScript.
5. Visual direction: navy, graphite, cyan, readable light surfaces, authentic FEM imagery, restrained motion.
6. Styling: Tailwind CSS v4.
7. Repository: independent public FinEleMethod-Website repository.
8. Hosting: Vercel, preview deployments, HTTPS, custom domain later.
9. Downloads: direct GitHub Release asset links start installer downloads without a GitHub page visit. Binaries stay outside this repository.
10. Documentation: user guides live here; solver architecture, formulations, algorithms, decisions, and benchmark methodology remain authoritative in FinEleMethod. Link instead of copying technical documents.
11. Logo: original connected-node mesh symbol combining Q4 and an H8 projection; wordmark and favicon variants.
12. Themes: dark and light; first visit follows system preference, fallback dark, explicit selection remembered locally.
13. Architecture: static output, no backend or database. Content uses Markdown and TypeScript.
14. Quality targets: WCAG 2.2 AA, keyboard and screen reader support, visible focus, sufficient contrast, reduced motion, Lighthouse category scores at least 90. Automated checks do not by themselves establish WCAG conformance.
15. Testing: Astro checks, ESLint, Prettier, Vitest for meaningful logic, Playwright, Axe, Lighthouse CI, and manual cross-browser acceptance.
16. Delivery: GitHub Flow, short feature branches and PRs, GitHub Actions, Vercel PR previews; production only after required checks pass. Branch protection and deployment gating require verified remote configuration.
17. Responsive support: 320px and above, portrait and landscape, mobile/tablet/desktop/ultrawide; current and previous major Chrome, Edge, Firefox, Safari; Windows/macOS/Android/iOS; touch/mouse/keyboard. No overflow or inaccessible content. Validate browser feature support during implementation.
18. SEO: unique titles/descriptions, canonical URLs, sitemap, robots.txt, sharing images, SoftwareApplication structured data, semantic headings and accurate content.
19. Licensing: public source with copyright reserved; no open-source licence selected. Preserve third-party licences and required attribution.
20. Privacy: a dedicated Privacy page is deferred until requested. The current site still uses no analytics, advertising trackers, personal-data forms, or consent-requiring cookies; theme preference is stored locally.
21. Domain: Vercel address initially, exact availability unverified; custom domain later, stable paths and redirects.
22. Language: English initially, clear terminology; no incomplete language switcher.
23. Precedence: confirmed decisions, customized DESIGN.md, Vercel web guidelines, Lombiq Tailwind guidance, then GetDesign Vercel inspiration.
24. Evidence: authentic GUI/ParaView screenshots and validated benchmark data. No invented capabilities, metrics, testimonials, or adoption claims. Mark development placeholders and replace before launch.
25. Release data: one typed configuration holding version, asset filename/URL, release URL/date, size, SHA-256 and Windows requirements. Populate from verified release evidence.
26. Package manager: npm, committed package-lock.json, npm ci in CI, pinned supported Node version.
27. Local path: sibling of solver at FEM Software/FinEleMethod-Website.
28. Remote: https://github.com/AnoopPatel582/FinEleMethod-Website, public, main production branch.
29. Initial scope: responsive shell/themes, six primary pages, genuine visuals, metadata, tests, deployment, original design/logo. Privacy, search, translations, blog, accounts, cloud analysis and feedback forms are deferred.
30. Sequence: foundation; design/components; responsive shell; individual pages; evidence/docs/downloads; quality validation; preview then production. Test and push each stage.

## Implementation clarifications

- Node 24.20.0 is the initial toolchain pin; current Astro requires Node >=22.12.0.
- The system preference governs first-visit theme; dark is the fallback and brand direction.
- Public source must not be described as open-source until a suitable licence is selected.
- If a Privacy page is added later, its wording must acknowledge infrastructure providers and direct GitHub downloads.
- The chosen design template is inspiration, not affiliation with Vercel.
