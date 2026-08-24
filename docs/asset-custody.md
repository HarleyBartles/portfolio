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
- Fallback: the home link retains the accessible name `Harley Bartles, home` when the image cannot load.

### Social card

- Public file: `src/client/public/brand/social-card.png`
- Source: generated locally for this portfolio on 2026-08-21 with Pillow, using the portfolio palette and Windows-bundled Georgia and Consolas fonts.
- Rights: Harley Bartles' original composition; the fonts are rasterized into the image rather than redistributed.
- Format and dimensions: optimized PNG, `1200 × 630`, 30,053 bytes.
- Alt/fallback context: link preview metadata also carries the page title and description.

## Adventures of Patch evidence derivatives

All records below are first-party source material from `HarleyBartles/adventures-of-patch` revision `0240a8657aae5b580c1a7a0d31e0be7a68b27f4e`, processed on 2026-08-24 by `src/client/scripts/process-patch-assets.mjs`. Sharp 0.34.5 uses no-upscale resizing, AVIF quality 52/effort 6/4:2:0 or WebP quality 78/effort 6/smart subsampling, and emits no retained metadata. `src/client/public/media/patch/patch-derivatives.json` is the exact per-output receipt for source Git-object and SHA-256 identity, dimensions, encoding, output checksum, and measured bytes. Rights basis for every family is Harley Bartles' first-party project work, authorised for this portfolio. Semantic HTML provides every caption and explanatory label, so the images have no essential explanatory text fallback.

Exact public paths: `src/client/public/media/patch/patch-hero-720.avif`, `src/client/public/media/patch/patch-hero-720.webp`, `src/client/public/media/patch/patch-hero-1440.avif`, `src/client/public/media/patch/patch-hero-1440.webp`, `src/client/public/media/patch/patch-introducing-page-640.avif`, `src/client/public/media/patch/patch-introducing-page-640.webp`, `src/client/public/media/patch/patch-introducing-page-1200.avif`, `src/client/public/media/patch/patch-introducing-page-1200.webp`, `src/client/public/media/patch/patch-introducing-page-portrait-640.avif`, `src/client/public/media/patch/patch-introducing-page-portrait-640.webp`, `src/client/public/media/patch/patch-goldilocks-640.avif`, `src/client/public/media/patch/patch-goldilocks-640.webp`, `src/client/public/media/patch/patch-goldilocks-1200.avif`, `src/client/public/media/patch/patch-goldilocks-1200.webp`, `src/client/public/media/patch/patch-goldilocks-portrait-640.avif`, `src/client/public/media/patch/patch-goldilocks-portrait-640.webp`, `src/client/public/media/patch/patch-sorcerers-apprentice-640.avif`, `src/client/public/media/patch/patch-sorcerers-apprentice-640.webp`, `src/client/public/media/patch/patch-sorcerers-apprentice-1200.avif`, `src/client/public/media/patch/patch-sorcerers-apprentice-1200.webp`, `src/client/public/media/patch/patch-clubDb-slide-2-1200.avif`, `src/client/public/media/patch/patch-clubDb-slide-2-1200.webp`, `src/client/public/media/patch/patch-clubDb-slide-4-1200.avif`, `src/client/public/media/patch/patch-clubDb-slide-4-1200.webp`, `src/client/public/media/patch/patch-clubDb-slide-14-1200.avif`, `src/client/public/media/patch/patch-clubDb-slide-14-1200.webp`, `src/client/public/media/patch/patch-heist-1200.avif`, `src/client/public/media/patch/patch-heist-1200.webp`, `src/client/public/media/patch/patch-tournament-1200.avif`, `src/client/public/media/patch/patch-tournament-1200.webp`, `src/client/public/media/patch/patch-identity-1200.avif`, and `src/client/public/media/patch/patch-identity-1200.webp`.

Tournament story paths: `src/client/public/media/patch/patch-tournament-seven-day-1200.avif`, `src/client/public/media/patch/patch-tournament-seven-day-1200.webp`, `src/client/public/media/patch/patch-tournament-high-jump-1200.avif`, `src/client/public/media/patch/patch-tournament-high-jump-1200.webp`, `src/client/public/media/patch/patch-tournament-maze-1120.avif`, `src/client/public/media/patch/patch-tournament-maze-1120.webp`, `src/client/public/media/patch/patch-tournament-maze-map-1200.avif`, `src/client/public/media/patch/patch-tournament-maze-map-1200.webp`, `src/client/public/media/patch/patch-tournament-bit-hazard-560.avif`, `src/client/public/media/patch/patch-tournament-bit-hazard-560.webp`, `src/client/public/media/patch/patch-tournament-bot-wrong-line-560.avif`, `src/client/public/media/patch/patch-tournament-bot-wrong-line-560.webp`, `src/client/public/media/patch/patch-tournament-long-course-1200.avif`, and `src/client/public/media/patch/patch-tournament-long-course-1200.webp`.

### Introducing Patch base

- Source/status/checksum: `published/misc/introducing-patch/source_images/page_base_desktop__v1.png`; accepted source image; SHA-256 `1bd8c2e3bfe53de50185c3159babd4347f6957baa11a27e3c0a5bc0f54d8008d`.
- Public derivatives: `patch-hero-720.avif` (`720 × 403`, 6,218 bytes), `patch-hero-720.webp` (`720 × 403`, 10,998 bytes), `patch-hero-1440.avif` (`1440 × 806`, 12,247 bytes), and `patch-hero-1440.webp` (`1440 × 806`, 26,590 bytes). Byte-budget class: hero. Transform: mobile-safe Patch crop with intrinsic dimensions.
- Alt intent: Patch in the approved cream base with open space for adjacent HTML route context.

### Finished Introducing Patch page

- Source/status/checksum: `published/misc/introducing-patch/page__v1.png`; published one-pager; SHA-256 `0a7ea32dc4dc1054ca144a2b4bf3dd96b5901937b9e0d9b9007791ec74cd609a`.
- Public derivatives: `patch-introducing-page-640.avif` (`640 × 358`, 9,843 bytes), `patch-introducing-page-640.webp` (`640 × 358`, 15,070 bytes), `patch-introducing-page-1200.avif` (`1200 × 672`, 20,383 bytes), and `patch-introducing-page-1200.webp` (`1200 × 672`, 36,102 bytes). Byte-budget class: page. Transform: no-upscale responsive resize.
- Portrait source/status/checksum: `published/misc/introducing-patch/page__v1-mobile.png`; published mobile one-pager; SHA-256 `0e0ab3fc0818671aea27b0b060671ff48d3517bb63ea51d3eb392af6080d97bb`. Derivatives: `patch-introducing-page-portrait-640.avif` (`640 × 1138`, 21,989 bytes) and `patch-introducing-page-portrait-640.webp` (`640 × 1138`, 35,038 bytes). Mobile viewports select this composition instead of shrinking the landscape page.
- Alt intent: finished Introducing Patch one-pager, used as published evidence rather than the route hero.

### Published Fairytale pages

- Goldilocks source/status/checksum: `published/fairytales/goldilocks/page__right_amount_of_guidance__v1.png`; published; SHA-256 `3ecd0a1052de65f222fb9ea2a6c4f8ffbec11cc0f509fac6bb51cfc432ddd92c`. Derivatives: `patch-goldilocks-640.avif` (`640 × 360`, 23,148 bytes), `patch-goldilocks-640.webp` (`640 × 360`, 31,616 bytes), `patch-goldilocks-1200.avif` (`1200 × 675`, 56,684 bytes), and `patch-goldilocks-1200.webp` (`1200 × 675`, 84,952 bytes). Byte-budget class: page.
- Goldilocks portrait source/status/checksum: `published/fairytales/goldilocks/page__right_amount_of_guidance__v1-mobile.png`; published mobile fairytale page; SHA-256 `9facb864843f01ecbac48a12ac911496f55b6e02cd532f7908787a6686395f60`. Derivatives: `patch-goldilocks-portrait-640.avif` (`640 × 1138`, 58,714 bytes) and `patch-goldilocks-portrait-640.webp` (`640 × 1138`, 81,702 bytes). Mobile viewports select this composition. Sorcerer's Apprentice has no portrait source and retains its landscape fallback.
- Sorcerer's Apprentice source/status/checksum: `published/fairytales/sorcerers-apprentice/page__delegation_without_boundaries__v1.png`; published; SHA-256 `10a78af6a1e49dc9d7b3f60e2919a22c479590a833aa930f21a12b6519671d1b`. Derivatives: `patch-sorcerers-apprentice-640.avif` (`640 × 360`, 38,945 bytes), `patch-sorcerers-apprentice-640.webp` (`640 × 360`, 49,790 bytes), `patch-sorcerers-apprentice-1200.avif` (`1200 × 675`, 99,476 bytes), and `patch-sorcerers-apprentice-1200.webp` (`1200 × 675`, 133,940 bytes). Byte-budget class: page.
- Transform/alt intent: no-upscale responsive page resize; each concise alt describes its specific agentic lesson and the page remains the published artefact.

### Club DB origin slides

- Source/status/checksum/object: `published/adventures/club_db_bouncer_queue_v6_canonical.pptx`; legacy reference; PPTX SHA-256 `7cfe625cb5757adeec271c2e04f0c50a6ac3766011670160313fca9e62f334ee`; Git blob `ebc7fe4ad0c1bcd2b6deeafeaf6530e2ef862ca0` at the pinned revision.
- Intermediates: selected slides 2, 4, and 14 only, rendered directly from that verified PPTX into off-repo scratch with Microsoft PowerPoint `COM Slide.Export PNG` through `render-patch-club-db-slides.ps1`. The receipt records each selected rendered PNG SHA-256 and its resulting AVIF/WebP output checksum. These PNGs are scratch-only source intermediates, never deployed.
- Public derivatives: `patch-clubDb-slide-2-1200.avif` (`1200 × 675`, 51,979 bytes) and `.webp` (85,852 bytes); slide 4 AVIF (61,389 bytes) and WebP (99,772 bytes); slide 14 AVIF (70,224 bytes) and WebP (111,920 bytes). Byte-budget class: support. Transform: no-upscale resize from the selected direct-rendered frame.
- Alt intent: respectively, the accountable incident/root cause, Patch's original framing, and the signs-versus-enforcement lesson. These frames show historical origin evidence, not current production quality.

### Lawful Heist

- Source/status/object/checksum: accepted visual evidence, advanced visual pre-production; Git blob `5d718ee449173bea4374e707a5d1b20ed9d57101` and SHA-256 `b653f2159851d0c1acd10fdf526323f55964aa941669536dfbdb87be40a5f5ab` at the pinned revision. The processor accepts the explicit local `--heist-source` only when it resolves inside the pinned worktree and matches both identities. Its receipt deliberately records the auditable object identity instead of a private workshop coordinate.
- Public derivatives: `patch-heist-1200.avif` (`1200 × 900`, 74,131 bytes) and `patch-heist-1200.webp` (`1200 × 900`, 117,480 bytes). Byte-budget class: support. Transform: no-upscale resize.
- Alt intent: accepted joined visual evidence, explicitly framed as advanced visual pre-production rather than deck art.

### Tournament

- Source/status/checksum: `build/adventures/Tournament/long-course-route-check-booth/source_images/source_02_patch_at_route_check_booth__v1.png`; visual development; SHA-256 `74cd76abe10c3d7db2a399f64906141b0e7c657fed4c02d7cc787c67867a1802`.
- Public derivatives: `patch-tournament-1200.avif` (`1200 × 900`, 125,029 bytes) and `patch-tournament-1200.webp` (`1200 × 900`, 202,048 bytes). Byte-budget class: support. Transform: no-upscale resize.
- Story sources: the seven-day sprint, high-jump, overhead maze, annotated maze plan, long-course environment, Bit hazard-tape pose, and Bot false-finish pose under `build/adventures/Tournament`. Every source is tracked at the pinned revision and recorded by Git object and SHA-256 in the derivative receipt.
- Story derivatives: seven-day AVIF/WebP at `1200 × 800` (148,938 and 214,204 bytes); high-jump at `1200 × 900` (114,123 and 172,488 bytes); maze at `1120 × 840` (258,575 and 370,906 bytes); maze map at `1200 × 900` (161,335 and 227,736 bytes); Bit and Bot poses at `560 × 700` (19,467/31,342 and 19,175/30,574 bytes); long course at `1200 × 675` (76,899 and 116,700 bytes). Byte-budget class: support. Transform: no-upscale resize.
- Alt intent: each image proves one visible part of the four-event progression. Semantic HTML carries tasks, interpretations, Patch's response, lessons, and medal outcomes. The generic medal-official art is intentionally excluded because it cannot prove who earned each medal.

### Identity Emporium

- Source/status/checksum: `build/environments/identity-emporium/reference_sheets/world_proof__v1.png`; legacy reference; SHA-256 `8bbaaeb2c4499eb560092787aafbd0e439d2746c4db467f86e922c7f607d233b`.
- Public derivatives: `patch-identity-1200.avif` (`1200 × 960`, 95,269 bytes) and `patch-identity-1200.webp` (`1200 × 960`, 166,626 bytes). Byte-budget class: support. Transform: no-upscale resize.
- Alt intent: Patch and the shopkeeper at the Identity Emporium counter. The selected environment image retains its `legacy_reference` source custody, while the adventure is described as visual development because it also produced four substantial Patch role-kit families and the approved Bit and Bot role kit. Narrative, deck and final acceptance work remain.
- Composition sources: the approved Bot chicken-lasso failure pose and Bit action pose (SHA-256 respectively `99f23e0e54148a4fa0f6cc6455c5d2c4adf0783093d2c791e1810a0cb694d4e0` and `0d86b9efdca4d85450348975d47cd26d629a2a3be0ea99caa3d25aa11eabdfc4`) and the cowboy, detective, mechanic and chef Patch role-kit hero sources (SHA-256 respectively `5f1f8970d5745f683e65bb4960055ecd29b19a59211ce8478d03a1ef1e1d8120`, `15511c89b88946519c4be73a33a03c2206a62842877725254b58f1e6ffd6120c`, `1a83c11a8e7302ebef6cdae136d52304ed6da898eb285674a2ea12201ca65843` and `5ec51f9d9b84b354fa8a1690b793eb312fac1e27df254f90f7c783a0ba107904`). Semantic HTML combines the two bots into a failure-mode comparison while retaining Bot's canonically larger scale. The processor preserves Bot's complete chicken chase at its natural `5:4` ratio and trims the four Patch heroes onto equal `480 × 600` white canvases with one baseline and inset.
- Composition derivatives: `src/client/public/media/patch/patch-identity-bot-failure-480.avif` (`480 × 384`, 19,951 bytes), `src/client/public/media/patch/patch-identity-bot-failure-480.webp` (`480 × 384`, 27,580 bytes), `src/client/public/media/patch/patch-identity-bit-action-480.avif` (`480 × 600`, 13,710 bytes), `src/client/public/media/patch/patch-identity-bit-action-480.webp` (`480 × 600`, 20,156 bytes), `src/client/public/media/patch/patch-identity-cowboy-480.avif` (`480 × 600`, 11,244 bytes), `src/client/public/media/patch/patch-identity-cowboy-480.webp` (`480 × 600`, 19,202 bytes), `src/client/public/media/patch/patch-identity-detective-480.avif` (`480 × 600`, 15,642 bytes), `src/client/public/media/patch/patch-identity-detective-480.webp` (`480 × 600`, 25,768 bytes), `src/client/public/media/patch/patch-identity-mechanic-480.avif` (`480 × 600`, 12,265 bytes), `src/client/public/media/patch/patch-identity-mechanic-480.webp` (`480 × 600`, 20,244 bytes), `src/client/public/media/patch/patch-identity-chef-480.avif` (`480 × 600`, 11,311 bytes), and `src/client/public/media/patch/patch-identity-chef-480.webp` (`480 × 600`, 18,946 bytes).
- Composition intent: distinguish Bot mistaking preparation for a script, Bit rushing into the work before preparing, and Patch using the task to shape his preparation. The four developed Patch kits show that the approach extends beyond the cowboy example.

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

## Wild Bunch development-build captures

These are derivative screenshots of Harley Bartles' running Wild Bunch repository at revision `2a9814d094148bb789766a27d316095fecce5a60`, captured on 2026-08-23. They are evidence of a playable current development build / working skeleton, not final game design, approved art direction, or public-demo readiness. The receipt-verified run used `Ranger Vale`, world seed `00000000-0000-0000-0000-000000000000`, `Standard` difficulty, explicitly selected `Boring` entropy, and player-chosen `Dustwell`.

The visible game art is first-party project work generated under Harley's direction for Wild Bunch and retained in that repository's source, staging, and production custody paths. The public provenance record is [Wild Bunch PR #155](https://github.com/HarleyBartles/wild-bunch/pull/155), "Generate town hub filler assets". Harley owns the project and explicitly authorised these product screenshots for this portfolio phase. The portfolio publishes only screenshots and their resized derivatives, not the standalone sprite files; this record makes no open-source licensing or third-party reuse claim for those sprites.

### Dustwell town hub

- Raw source: Harley's unretouched `wild-bunch-dustwell-town-1440.png`, PNG `1440 × 1100`, 778,555 bytes, SHA-256 `1fb8228009fb80a728de3274ad564507414f83f2e996b628a57760441793f147`.
- Public derivatives: `src/client/public/media/wild-bunch/dustwell-town-720.avif` (`720 × 550`, 6,790 bytes); `src/client/public/media/wild-bunch/dustwell-town-720.webp` (`720 × 550`, 11,020 bytes); `src/client/public/media/wild-bunch/dustwell-town-1200.avif` (`1200 × 917`, 14,095 bytes); `src/client/public/media/wild-bunch/dustwell-town-1200.webp` (`1200 × 917`, 25,362 bytes).
- Transformation: fixed-width Sharp resize without upscaling, then AVIF quality 52 or WebP quality 78; metadata stripped. The larger derivative is 25,362 bytes, below the 250 KB hero target.
- Alt intent: current development build showing Ranger Vale in Dustwell, one generated town in the seeded map-world, with ordinary town actions visible. Caption framing: this is the generated town captured for the recorded seed, not a hand-built showcase town or final game art.

### Generated trail map

- Raw source: Harley's unretouched `wild-bunch-trail-map-1440.png`, PNG `1440 × 1100`, 264,087 bytes, SHA-256 `ca31e664919d8b5a2f49c33e2a27ff4082b08e4c7c25e12458fdde426ae6c4b4`.
- Public derivatives: `src/client/public/media/wild-bunch/trail-map-720.avif` (`720 × 550`, 10,698 bytes); `src/client/public/media/wild-bunch/trail-map-720.webp` (`720 × 550`, 16,834 bytes); `src/client/public/media/wild-bunch/trail-map-1200.avif` (`1200 × 917`, 21,459 bytes); `src/client/public/media/wild-bunch/trail-map-1200.webp` (`1200 × 917`, 35,858 bytes).
- Transformation: fixed-width Sharp resize without upscaling, then AVIF quality 52 or WebP quality 78; metadata stripped. The larger derivative is 35,858 bytes, below the 180 KB support target.
- Alt intent: current development build showing five named towns, connecting trails, and ride-day distances. Caption framing: generated topology and travel distance before the player chooses a town; current development build / working skeleton.

### Ordered session audit

- Raw source: Harley's unretouched `wild-bunch-session-audit-1440.png`, PNG `1440 × 1100`, 158,427 bytes, SHA-256 `785341cca40132a83752eae645d9aa137629f69b14e7854767698633d02919ac`.
- Public derivatives: `src/client/public/media/wild-bunch/session-audit-720.avif` (`720 × 550`, 10,266 bytes); `src/client/public/media/wild-bunch/session-audit-720.webp` (`720 × 550`, 14,832 bytes); `src/client/public/media/wild-bunch/session-audit-1200.avif` (`1200 × 917`, 22,310 bytes); `src/client/public/media/wild-bunch/session-audit-1200.webp` (`1200 × 917`, 33,516 bytes).
- Transformation: fixed-width Sharp resize without upscaling, then AVIF quality 52 or WebP quality 78; metadata stripped. The larger derivative is 33,516 bytes, below the 180 KB support target.
- Alt intent: current development build showing the screened ordered audit after setup and investigation. Caption framing: current development build / working skeleton; no session identifier is published.

### Sheriff Office wanted notice

- Raw source: Harley's unretouched `wild-bunch-wanted-notice-1440.png`, PNG `1440 × 1100`, 312,404 bytes, SHA-256 `59cde4de536fad07fcb855b11a33ea0e3149d57f7287b28c8b35c57b58da991f`.
- Public derivatives: `src/client/public/media/wild-bunch/wanted-notice-640.avif` (`640 × 489`, 10,363 bytes); `src/client/public/media/wild-bunch/wanted-notice-640.webp` (`640 × 489`, 14,502 bytes); `src/client/public/media/wild-bunch/wanted-notice-960.avif` (`960 × 733`, 18,691 bytes); `src/client/public/media/wild-bunch/wanted-notice-960.webp` (`960 × 733`, 26,230 bytes).
- Transformation: fixed-width Sharp resize without upscaling, then AVIF quality 52 or WebP quality 78; metadata stripped. The larger derivative is 26,230 bytes, below the 180 KB support target.
- Alt intent: current development build showing a populated player-facing wanted notice without a hidden culprit answer. Caption framing: current development build / working skeleton.

### Player-known case file

- Raw source: Harley's unretouched `wild-bunch-case-file-1440.png`, PNG `1440 × 1100`, 138,324 bytes, SHA-256 `9f1111d63d647c1e513bdc2f110629c10c961587e98d4fb9fcff1980356ee67a`.
- Public derivatives: `src/client/public/media/wild-bunch/case-file-640.avif` (`640 × 489`, 12,751 bytes); `src/client/public/media/wild-bunch/case-file-640.webp` (`640 × 489`, 17,406 bytes); `src/client/public/media/wild-bunch/case-file-960.avif` (`960 × 733`, 23,968 bytes); `src/client/public/media/wild-bunch/case-file-960.webp` (`960 × 733`, 32,240 bytes).
- Transformation: fixed-width Sharp resize without upscaling, then AVIF quality 52 or WebP quality 78; metadata stripped. The larger derivative is 32,240 bytes, below the 180 KB support target.
- Alt intent: current development build showing player-known clues, records, and evidence without a hidden culprit answer. Caption framing: current development build / working skeleton.
- Added: 2026-08-23. The measured derivatives all meet the stated byte targets; no legibility exception is recorded.

## Removal rule

Before removing or replacing one of these files, search the client source, Markdown, generated route documents, and metadata for its path. Remove every consumer, run the client build and browser suite, and update this record in the same change.
