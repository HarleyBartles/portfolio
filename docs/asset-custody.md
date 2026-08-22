# Portfolio asset custody

This record covers visual assets copied or derived from Harley Bartles' own repositories for the public portfolio. The portfolio stores the optimized public derivatives; the named sibling repositories retain the source files and their pipeline history.

## Typography

The site self-hosts Latin WOFF2 variable-font subsets through Fontsource npm packages. Every face uses `font-display: swap`; fallback stacks remain in `src/client/src/styles/_tokens.scss`. The packages retain their licence files and attribution metadata in `node_modules`, and the exact resolved versions are locked in `src/client/package-lock.json`.

### Fraunces

- Dependency: `@fontsource-variable/fraunces` 5.3.0; upstream font version v38.
- Files used: `fraunces-latin-wght-normal.woff2` and `fraunces-latin-wght-italic.woff2`.
- Source: Google Fonts / The Fraunces Project Authors, `github.com/undercasetype/Fraunces`.
- Licence: SIL Open Font License 1.1; public web embedding and redistribution permitted under the licence.
- Use and fallback: display headings; Georgia then generic serif.
- Added: 2026-08-21.

### Source Serif 4

- Dependency: `@fontsource-variable/source-serif-4` 5.3.0; upstream font version v14.
- Files used: `source-serif-4-latin-wght-normal.woff2` and `source-serif-4-latin-wght-italic.woff2`.
- Source and attribution: Google Fonts; metadata attribution is Google Inc.
- Licence: SIL Open Font License 1.1.
- Use and fallback: body and long-form reading; Iowan Old Style then generic serif.
- Added: 2026-08-21.

### Fira Code

- Dependency: `@fontsource-variable/fira-code` 5.3.0; upstream font version v27.
- File used: `fira-code-latin-wght-normal.woff2`.
- Source: Google Fonts / The Fira Code Project Authors, `github.com/tonsky/FiraCode`.
- Licence: SIL Open Font License 1.1.
- Use and fallback: folios, dates, status, and controls; Cascadia Code, SFMono-Regular, then generic monospace.
- Added: 2026-08-21.

## Brand

### HB mark

- Public file: `src/client/public/brand/hb-mark.svg`
- Source: hand-authored for this portfolio on 2026-08-21.
- Rights: Harley Bartles' original portfolio identity.
- Format and dimensions: vector SVG, `64 × 64` view box.
- Fallback: the home link retains the accessible name `Harley Bartles — home` when the image cannot load.

### Social card

- Public file: `src/client/public/brand/social-card.png`
- Source: generated locally for this portfolio on 2026-08-21 with Pillow, using the portfolio palette and Windows-bundled Georgia and Consolas fonts.
- Rights: Harley Bartles' original composition; the fonts are rasterized into the image rather than redistributed.
- Format and dimensions: optimized PNG, `1200 × 630`, 30,053 bytes.
- Alt/fallback context: link preview metadata also carries the page title and description.

## Adventures of Patch role-kit montage

- Public files:
  - `src/client/public/media/patch/patch-role-kits-640.webp` — `640 × 384`, 48,616 bytes.
  - `src/client/public/media/patch/patch-role-kits-1200.webp` — `1200 × 720`, 110,482 bytes.
- Source repository: sibling `adventures-of-patch` repository (owned by Harley Bartles).
- Exact sources:
  - `build/canon/patch/role-kits/detective-role-kit/source_images/hero_patch_detective__v1.png`
  - `build/canon/patch/role-kits/cowboy-role-kit/source_images/hero_patch_cowboy_waistcoat__v1.png`
  - `build/canon/patch/role-kits/chef-role-kit/source_images/hero_front__v1.png`
  - `build/canon/patch/role-kits/mechanic-role-kit/source_images/hero_full_body__v1.png`
- Transformation: near-white source backgrounds were removed; the four character renders were placed on overlapping editorial cards with a restrained workflow line, then exported as quality-86 WebP at the two display widths.
- Added: 2026-08-21.
- Alt text: "Patch appears as a detective, cowboy, chef, and mechanic in four overlapping role-kit cards."

## Patch Fairytales

### Goldilocks — The Right Amount of Guidance

- Public files:
  - `src/client/public/fairytales/goldilocks/page-640.webp` — `640 × 360`, 39,154 bytes.
  - `src/client/public/fairytales/goldilocks/page-1200.webp` — `1200 × 675`, 105,172 bytes.
- Source repository/file: portfolio copy of the Harley-owned Adventures of Patch output, formerly `page__right_amount_of_guidance__v1.png` at `2400 × 1350`, 1,568,600 bytes.
- Transformation: Lanczos resize and quality-86 WebP export.
- Added: 2026-08-21.
- Accessibility: the detail page provides a concise alt description and a separate three-scene transcript.

### The Sorcerer's Apprentice — Delegation Without Boundaries

- Public files:
  - `src/client/public/fairytales/sorcerers-apprentice/page-640.webp` — `640 × 360`, 61,638 bytes.
  - `src/client/public/fairytales/sorcerers-apprentice/page-1200.webp` — `1200 × 675`, 165,046 bytes.
- Source repository/file: portfolio copy of the Harley-owned Adventures of Patch output, formerly `page__delegation_without_boundaries__v1.png` at `2400 × 1350`, 4,491,081 bytes.
- Transformation: Lanczos resize and quality-86 WebP export.
- Added: 2026-08-21.
- Accessibility: the detail page provides a concise alt description and a separate scene transcript.

## Agentic Learning Lab venue plan

- Public file: `src/client/public/media/learning-lab/venue-plan.png` — `500 × 350`, 1,322 bytes.
- Source repository: sibling `agentic-learning-lab` repository (owned by Harley Bartles).
- Exact source: `labs/02-give-the-cloud-agent-the-project/project/source/venue-plan.png`.
- Transformation: copied byte-for-byte. The source PNG is already much smaller than a WebP derivative and should not be upscaled merely to satisfy a nominal responsive width.
- Added: 2026-08-21.
- Alt text: "A simple venue floor plan used as the bounded project artifact in Learning Lab 02."

## Marketplace case-study icons

- Public file: `src/client/public/media/marketplace/repo-worker-pack.svg`.
- Public file: `src/client/public/media/marketplace/superpowers-plus.svg`.
- Public file: `src/client/public/media/marketplace/mcp-usage-pack.svg`.
- Public file: `src/client/public/media/marketplace/frontend-pack.svg`.
- Public file: `src/client/public/media/marketplace/architecture-pack.svg`.
- Public file: `src/client/public/media/marketplace/dotnet-pack.svg`.
- Exact sources: `codex-marketplace/plugins/repo-worker-pack/assets/icon.svg`, `superpowers-plus/assets/superpowers-small.svg`, `mcp-usage-pack/assets/icon.svg`, `frontend-pack/assets/icon.svg`, `architecture-pack/assets/icon.svg`, and `dotnet-pack/assets/icon.svg` in `HarleyBartles/agent-asset-marketplace`, revision `52866dfb13b257c8d7d98fbb6155f96a7a8ca07e`.
- Rights and provenance: first-party Marketplace plugin assets, except `superpowers-plus`, whose source bundle preserves its transparent upstream derivative provenance. Each bundle is MIT licensed; copied byte-for-byte with no transformation.
- Sizes: 545, 1,734, 545, 643, 732, and 277 bytes respectively; SVG remains appropriate for these small interface marks.
- Fallback: every icon has an adjacent text plugin label in the case study; no meaning depends on an image loading.
- Added: 2026-08-22.

## Removal rule

Before removing or replacing one of these files, search the client source, Markdown, generated route documents, and metadata for its path. Remove every consumer, run the client build and browser suite, and update this record in the same change.
