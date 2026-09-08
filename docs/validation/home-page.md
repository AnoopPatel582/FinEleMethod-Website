# Home-page evidence and validation

## Product sources

- Reviewed on 2026-09-08 against solver commit `5941df69f3ef8469170ee086d08195bd25f7728a`.
- Solver README supports Windows x64/C++20, Q4 plane stress/strain, H8 solids, isotropic linear elasticity, supported ABAQUS input, multiple materials, loads, results and consistent-unit requirements.
- The beginner guide and release-validation record are linked at that exact commit; Git object checks confirmed all referenced documents exist.
- Benchmark wording states that comparisons are documented, not that this website work reran or certified the solver.
- No download size, checksum, current release version, performance metric or certification was invented. Release configuration is a later stage.

## Image provenance

- Asset: `public/images/plate-hole-displacement.png`.
- Source: `disp.png`, supplied by Anoop in this project's earlier plate-with-a-hole result discussion.
- Copied unchanged from the supplied local file; 1380 × 630 pixels, 35,106 bytes.
- SHA-256: `bb9d6d6ad13d3de2e7236e8425e082514efa5b6a214538f359e0b3200623faca`.
- Original ParaView displacement-magnitude image, not an AI-generated solver result.
- Caption and alt text identify the example and displayed field. The image links to its full-resolution original for the legend.
- Exact source-run identity, input hash and deformation scale are not established by this screenshot. It illustrates the workflow, not independent numerical validation.

## Checks

- Home-specific Chromium and WebKit tests pass: evidence links, original image loading/dimensions, workflow anchor, 200% text enlargement and theme screenshots.
- Dark desktop and light mobile screenshots reviewed; content reflows without overlap. The full-size image remains available because the legend becomes small on mobile.
- Shared shell tests also exercise the Home page at 320–2560 pixels and run Axe in both themes.
- Full suite now comprises 25 unit tests and 42 browser tests across the three engines.
- Full local regression: formatting and lint pass; Astro reports zero errors, warnings and hints across 27 files; all 25 unit tests and the eight-route static build pass.
- All 28 Chromium/WebKit tests pass. The 14 Firefox scenarios fail before browser startup with the existing local launch limitation, so full local verification is not green. All 42 scenarios remain enabled on clean-runner CI, which is required before merge.
- GitHub API checks confirmed all three pinned documentation links exist at the recorded solver commit.
- The installed Tailwind engineering playbook guided responsive composition. The [Vercel Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md) guided semantics, focus and image accessibility.
- Automated checks do not replace screen-reader, physical-device, native Safari or final Lighthouse acceptance.
