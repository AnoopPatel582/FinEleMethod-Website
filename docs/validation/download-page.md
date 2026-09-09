# Download-page evidence and validation

## Release sources

- Audited on 2026-09-09 against the public GitHub latest-release API and the solver's `docs/RELEASE_VALIDATION.md`, `docs/INSTALLER.md` and `docs/WINDOWS_QUICK_START.md`.
- Latest release: `v0.1.0`, published 2026-09-06, normal release, not a draft or pre-release.
- Exact source commit: `63def64dbf539f687718c2cead2c9d83c42c1638`.
- Installer: `FinEleMethod-0.1.0-windows-x64-setup.exe`, 23,579,981 bytes, SHA-256 `0b93d773aaff6d0c657858f84cf2e34b34330959a9d00b149a72861d002e6a27`.
- Portable ZIP: `FinEleMethod-windows-x64.zip`, 4,830,974 bytes, SHA-256 `b379564f5917685e54de8dc606fd7aeffca38a58c5d7b201044db87c44419bb5`.
- The page uses the live published asset sizes. Earlier local acceptance artifacts recorded in the solver documentation are not presented as the downloadable files.

## Link and requirement checks

- Direct links cover the installer, installer checksum, portable ZIP, ZIP checksum and 517-byte release manifest.
- HTTP HEAD requests followed GitHub's redirects and returned 200 for all five assets with the expected content lengths.
- The downloaded checksum-file contents match the GitHub asset digests and the solver release-validation record.
- Installer requirements: Windows 10 or later, x64, administrator approval; no developer toolchain is required.
- Portable requirements: extract all files, keep DLLs together and install the current Microsoft Visual C++ v14 x64 Redistributable separately.
- The page states that version 0.1.0 is not code-signed and does not advise bypassing Windows security.
- The page preserves the outstanding limitation: automatic runtime installation has not been independently qualified on a runtime-absent machine.

## Interface checks

- The primary installer download is visible before the alternative portable package.
- Package names and SHA-256 values can wrap without causing page overflow; the PowerShell command region is keyboard focusable when it scrolls.
- Responsive checks cover 320, 390, 768, 1024, 1440 and 2560 CSS pixels in both themes.
- Axe checks run at 390px in both themes; automated results do not establish complete WCAG conformance.

## Verification status

- Download-specific Chromium and WebKit checks pass locally: four scenarios total; clean-runner CI will add the two Firefox scenarios.
- Unit tests validate versioned URL consistency, checksum shape and locale-aware size/date formatting.
- Full local regression passed formatting, lint, Astro checks with zero diagnostics, all 27 unit tests and the eight-route production build.
- All 44 Chromium/WebKit scenarios pass, including release metadata, requirements, direct links, responsive layouts, themes, Axe scans and no-JavaScript navigation.
- The complete matrix contains 66 scenarios. All 22 Firefox scenarios fail before startup with `browserType.launch: spawn UNKNOWN` because of the known machine-specific limitation.
- Firefox stays enabled in required Windows and Ubuntu GitHub CI; the pull request must not merge until those clean-runner checks pass.
