# Portfolio asset custody

This record covers visual assets copied or derived from Harley Bartles' own repositories for the public portfolio. The portfolio stores the optimized public derivatives; the named sibling repositories retain the source files and their pipeline history.

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
- Source repository: `Z:\adventures-of-patch` (owned by Harley Bartles).
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
- Source repository: `Z:\agentic-learning-lab` (owned by Harley Bartles).
- Exact source: `labs/02-give-the-cloud-agent-the-project/project/source/venue-plan.png`.
- Transformation: copied byte-for-byte. The source PNG is already much smaller than a WebP derivative and should not be upscaled merely to satisfy a nominal responsive width.
- Added: 2026-08-21.
- Alt text: "A simple venue floor plan used as the bounded project artifact in Learning Lab 02."

## Removal rule

Before removing or replacing one of these files, search the client source, Markdown, generated route documents, and metadata for its path. Remove every consumer, run the client build and browser suite, and update this record in the same change.
