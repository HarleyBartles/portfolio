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

### HB device-icon fallbacks

- Public files: `src/client/public/brand/hb-mark-32.png` and `src/client/public/brand/hb-mark-180.png`.
- Source and rights: derived on 29 August 2026 from the hand-authored Harley Bartles SVG mark above; the same original portfolio identity rights apply.
- Transformation: local Sharp 0.34.5 rasterisation at exact `32 × 32` and `180 × 180` PNG sizes, respectively; no external source material or generated imagery was used.
- Use and fallback: the SVG remains the preferred favicon; the 32-pixel PNG supports older favicon consumers and the 180-pixel PNG serves Apple touch-icon discovery. Neither asset carries essential text or alters the accessible home-link fallback.

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

- Source status: advanced visual pre-production at Adventures of Patch revision `13bf77adc63cf5c8f49363cedd5dd392822b8375`. The processor verifies every repository source against its tracked path, Git object and SHA-256 before applying a no-upscale resize.

| Family | Source path | Git object | Source SHA-256 |
| --- | --- | --- | --- |
| `heist` | `workbench/issue_48_override_heist_style_framework_v0_3/style-sheets/heist_pitch_folder/07_receipt_joined.png` | `5d718ee449173bea4374e707a5d1b20ed9d57101` | `b653f2159851d0c1acd10fdf526323f55964aa941669536dfbdb87be40a5f5ab` |
| `heistFolderOpen` | `workbench/issue_48_override_heist_style_framework_v0_3/style-sheets/heist_pitch_folder/01_clean_folder_and_recruitment_list.png` | `c47c51bbabd62fbe70dadbfa2fa3d511263625d2` | `b7e9e65c5b493bb49b39c102d38e3c420bea2f49cc73065d21471d0244a8b177` |
| `heistIndex` | `build/characters/heist-crew/reference_sheets/index_hero__v1.png` | `cf3135e44dd9d244e38a57d42865157adc5aa9d3` | `50b563bfebe97415b778b7ddb82f0b4f6625248b9120ff5d675d714a5ae4b8b8` |
| `heistSilk` | `build/characters/heist-crew/reference_sheets/silk_hero__v1.png` | `a7da6c9f2f757c6551bcc7522f8e917a54ebeebd` | `28627c6809a7604dbcff66e46be9f79cf554cfe5c1176efe53ecc3f5c8b223d8` |
| `heistWrit` | `build/characters/heist-crew/reference_sheets/writ_hero__v1.png` | `04c23b1a4c35945d348b3a6634bc7438a80595bc` | `74daf08c9ec227c90e7cb7bd74bb7148c326a66ca5fe212c5879c92bb787f87a` |
| `heistKlause` | `build/characters/heist-crew/reference_sheets/klause_hero__v1.png` | `1d4035bd010e140540b44941312d5222ea3e57a1` | `c5964126f97005db435b9beae0bf1c5b65102277f5d7b83d643ba70440252d33` |
| `heistRollback` | `build/characters/heist-crew/reference_sheets/rollback_hero__v1.png` | `6aedf036bb22d1a28f467a20e3d6d8788712db92` | `e589526afc89f38ced0d49bd46b4ebcbbb23b310a11cd79654042d1a544286f1` |
| `heistReceipt` | `build/characters/heist-crew/reference_sheets/receipt_hero__v1.png` | `8fbb8ea63f670626e783cf4628aff073ce338d4b` | `4524441782e7699c1f0c90572b268a5e9b6078a6d2e61f7dbc76f1be07ec188f` |

- Public paths:
  - completed folder: `src/client/public/media/patch/patch-heist-1200.avif`, `src/client/public/media/patch/patch-heist-1200.webp`;
  - opening folder: `src/client/public/media/patch/patch-heist-folder-open-1200.avif`, `src/client/public/media/patch/patch-heist-folder-open-1200.webp`;
  - Index: `src/client/public/media/patch/patch-heist-index-560.avif`, `src/client/public/media/patch/patch-heist-index-560.webp`, `src/client/public/media/patch/patch-heist-index-marker-420.avif`, `src/client/public/media/patch/patch-heist-index-marker-420.webp`;
  - Silk: `src/client/public/media/patch/patch-heist-silk-560.avif`, `src/client/public/media/patch/patch-heist-silk-560.webp`, `src/client/public/media/patch/patch-heist-silk-marker-420.avif`, `src/client/public/media/patch/patch-heist-silk-marker-420.webp`;
  - Writ: `src/client/public/media/patch/patch-heist-writ-560.avif`, `src/client/public/media/patch/patch-heist-writ-560.webp`, `src/client/public/media/patch/patch-heist-writ-marker-420.avif`, `src/client/public/media/patch/patch-heist-writ-marker-420.webp`;
  - Klause: `src/client/public/media/patch/patch-heist-klause-560.avif`, `src/client/public/media/patch/patch-heist-klause-560.webp`, `src/client/public/media/patch/patch-heist-klause-marker-420.avif`, `src/client/public/media/patch/patch-heist-klause-marker-420.webp`;
  - Rollback: `src/client/public/media/patch/patch-heist-rollback-560.avif`, `src/client/public/media/patch/patch-heist-rollback-560.webp`, `src/client/public/media/patch/patch-heist-rollback-marker-420.avif`, `src/client/public/media/patch/patch-heist-rollback-marker-420.webp`, `src/client/public/media/patch/patch-heist-rollback-lockdown-1200.avif`, `src/client/public/media/patch/patch-heist-rollback-lockdown-1200.webp`;
  - Receipt: `src/client/public/media/patch/patch-heist-receipt-560.avif`, `src/client/public/media/patch/patch-heist-receipt-560.webp`, `src/client/public/media/patch/patch-heist-receipt-marker-420.avif`, `src/client/public/media/patch/patch-heist-receipt-marker-420.webp`, `src/client/public/media/patch/patch-heist-receipt-alcove-1200.avif`, `src/client/public/media/patch/patch-heist-receipt-alcove-1200.webp`.

Exact generated measurements and output identities follow.

| Family | Dimensions | AVIF bytes / SHA-256 | WebP bytes / SHA-256 |
| --- | --- | --- | --- |
| `heist` | `1200 × 900` | `74131` / `53e9bc7684d25a09a9ff1d411e6b78a4aae55300c832c60b334320cd1e9209cf` | `117480` / `8c9f7ea53f2ef68762ef70406eddfc2f1c6f54c0c14e00fe5dece1dd560279d4` |
| `heistFolderOpen` | `1200 × 800` | `62933` / `9eb510ca937f60906d625a00db40ceb1608255eddbc8257623f6a112009bd1de` | `101350` / `c1e96af30f856dce7b8700af74343ad4437cc4f4b8ad2d2e27fe90d0025fbc14` |
| `heistIndex` | `560 × 700` | `22691` / `87452bce7fa75fb1b578fa7fa9e5faecc373bbbe6f18e6820c130266ab3dc38e` | `36098` / `170f2de93b28eb40db47bc0df7692f08e9eabcae56de34166be4021950c12553` |
| `heistIndexMarker` | `420 × 420` | `21351` / `9eda8d2b2af59de2c87e52f437021594217ac8f57382ee38019daff52544bebd` | `47192` / `0a5b90e2589a459f36575a873143eb6f2214182d6d78e57330485662b3626d97` |
| `heistSilk` | `560 × 700` | `20141` / `6c36c59b92344d57f5fa24620fa5c89676bd8eedbd4fe4fdbcae7113db26280d` | `30618` / `2ed95d471fe6bb3f512f155a84b2e1490c6b2c8bfebdd9c120d4bc85a3526b1c` |
| `heistSilkMarker` | `420 × 420` | `12364` / `6a6655c58a0ce9e0ba85a5f2d536393ecba2377d4e4d79964703d32dfd5e3b73` | `20958` / `9c2d60085f1795c36d1f256e2f89befc2fe3977c0942aba91fe2c75054232cd4` |
| `heistWrit` | `560 × 700` | `14636` / `84458ca6b336ea1a6c155ca6b68c788f928d7b5d6a1e3231a3e948e59db91919` | `25172` / `faf51d9006c850f4fb36a5c78b6ec3827c2338329e87e7025b3fc23f614f3b32` |
| `heistWritMarker` | `420 × 420` | `9328` / `d3ee4eb81e3fa3ca2e8e0f0339e64176f6cae9c03a971db07250e6f8379c21e1` | `20554` / `e539d478d38005efdf1f9d8a5544b609fe40ecd099ff8f5822568248d2ac57d7` |
| `heistKlause` | `560 × 635` | `16135` / `40e0f5e49ec371da13dd867705748973f10b1dbdcfcb797522ecfcddbc1cb704` | `27020` / `9bb3cc35ffe16709d7085ae78df8070f21a02a7f807d8dbeb08d11473dc48879` |
| `heistKlauseMarker` | `420 × 420` | `21560` / `9c32ed05281b4864bcd25f9367d688523052487469914bc65772590791b30360` | `43066` / `396f1c98cef5ad226c943a96ea6bc39b86dc71e27505bd33ea137849044f4721` |
| `heistRollback` | `560 × 700` | `18415` / `c9bbd2214549be95376de2bb4ed2f27132727f1cf43890f82b20218e4820d266` | `27282` / `c0942f4b3eca0f71044e207978a92172a30d4bc1446728c7ad848aad1167cb55` |
| `heistRollbackMarker` | `420 × 420` | `19385` / `201f36018f1e2df5b27b7b2d2f92e8465a2c0dfa81f0c7a98e4aeb4c38d8bb28` | `27588` / `547562372a4cb171a78ee1c8294bb1a5f63d6a26616d56137fe5174cec60e65c` |
| `heistRollbackLockdown` | `1200 × 675` | `38960` / `a28e7679c641a911583414b74ef6abadb8d5afede9c5554064432d23c9cd5f88` | `71888` / `98f49c781b21736191d88d8878fca80088e29c5676b3651688a9d943be5e8501` |
| `heistReceipt` | `560 × 840` | `17038` / `7444a039e76ea2cbe74201e5d9d90a478690c53ae6de1787fe7f96b7d8fc47f5` | `29298` / `d9f05a916b03446b304a37a972db2f5f5345439afd3848ea0c2d98a1f9dfbc6b` |
| `heistReceiptMarker` | `420 × 420` | `7719` / `524f60ee1ca9c1328b6e2241a6bb05880937c1aa6d78b04fd15637e3070abe9c` | `16762` / `a26a81135db53c5f70070ccd02147fbe7e3c06faf1e62fc3cebff1b5948d2a27` |
| `heistReceiptAlcove` | `1200 × 675` | `24441` / `f8baf42f56505494aaa15c4bfbfab2319070c9e90089807dbf4c439b886bc58f` | `47522` / `12a0c86ed608d0488f5e0609f1a13ae3a31d8b9e537da67a88cf7b62af51eac7` |

- Alt intent: the opening and completed folders establish the recruitment journey; each portrait establishes one crew member; each marker shows that specialist's assent; Rollback's scene shows calm containment during a failed plan; Receipt's scene shows the audit record waiting before the pitch arrives. Semantic page copy carries the meaning where image text is small.
- Portfolio-generated assent masters: `src/client/assets/patch/lawful-heist/assent-index.png`, `assent-silk.png`, `assent-writ.png`, `assent-klause.png`, `assent-rollback.png`, and `assent-receipt.png`. All six are accepted `1254 × 1254` RGBA PNGs derived from the corresponding joined continuity boards at Adventures of Patch revision `13bf77adc63cf5c8f49363cedd5dd392822b8375`. Their SHA-256 values are respectively `634144fe87d6dba2565d27c050d3445309d4b99fe86da42c1763baca4ecddc81`, `a748ce32d8ea96419cfe8623dc94badb5b9b98018ff3871edfc4d05216b63050`, `7f2fda7a4c094cad828bd9eb473220e2ab5ebe5ac50b1fdd455d6d2f8c5cfd1a`, `56232ae0ba4b8e0205acdc0984bc04638002c3a4cec3c7a7d21819060918367a`, `2ffaedb936ee3f7e5489bad0b0a0e8c6942d43868e38152c6038f131195f87ab`, and `a7d19c3158321e5ff4c69cf94d82b14745018901fda32a5d6124994c82613e5b`.
- Portfolio-generated narrative masters: `src/client/assets/patch/lawful-heist/rollback-lockdown.png` and `receipt-alcove.png`; accepted `1672 × 941` RGB PNGs; SHA-256 respectively `1bc1b655400fe4ef48e6763bf7afe5b175ac78a3290296c78e95889b73e14c4a` and `bf4b47968f56d8584ee447ec00eee476fc2d660e5994d5eba19e8f424e155388`. They derive from each character's approved hero and style sheet at the same pinned revision. Rollback records the sourced observation-deck beat without baked text: contained chamber failure, calm lockdown control and descending shutter. Receipt records the anti-recruitment beat: an easy-to-miss audit alcove, the roll already printed and a mild no-pitch-needed gesture.
- Generation custody: `src/client/assets/patch/lawful-heist/generation-receipt.json` records the exact continuity source path and checksum, selected prompt, output checksum, acceptance notes and any deterministic finishing step for each master. `src/client/scripts/key-chroma-background.mjs` removes only the deliberately requested green backdrop from the Silk and Rollback selections and despills their antialiased edge. `src/client/scripts/remove-leading-alpha-specks.mjs` removes only disconnected alpha before the first substantial paper row from the Writ and Receipt markers.
- Permission: Harley Bartles, copyright holder in the named Adventures of Patch source assets and associated Heist Crew character and world IP, authorises the creation, publication and distribution of the listed derivative images as part of Harley Bartles' portfolio website and its repository build artefacts. This permission is specific to the recorded portfolio derivatives. It doesn't relicense the source assets, characters or world IP, and grants no general right to create or publish further adaptations.
- Rights: the generated insets remain copyright Harley Bartles, all rights reserved unless a later explicit licence says otherwise.

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

## Agentic Learning Lab editorial scenes

These three portfolio-owned generated scenes interpret curriculum mechanics at Agentic Learning Lab revision `315442bd2661bbc99a0834e57ff5f500b549326c`. They are editorial concept art, not documentary images of a delivered session. Copyright Harley Bartles, all rights reserved.

- Generation custody: `src/client/assets/learning-lab/generation-receipt.json` records the exact initial and corrective prompts, selection reasoning, acceptance criteria, source revision, rights, dimensions and SHA-256 for every master. The accepted masters are `engineering-control-workbench.png` (`1536 × 1024`, 4,039,699 bytes, SHA-256 `6d9c3f85ac63e7743525d269e9e86f9330101e3e6a04267711be067c6e6ce170`), `safe-breakage-rig.png` (`1536 × 1024`, 3,353,290 bytes, SHA-256 `8e81ed32473bf50433b65f6ef5f9853f0b7e679d9ef2eee815f8bc650849d1a7`) and `authority-transfer.png` (`1568 × 1003`, 3,011,470 bytes, SHA-256 `a9485800263c51185133a7dcb4647a95faf28b1a9d98da19c0215fc3e9e894db`).
- Public derivative manifest: `src/client/public/media/learning-lab/learning-lab-derivatives.json`.
- Workbench derivatives: `src/client/public/media/learning-lab/engineering-control-workbench-mobile-720.avif` (`720 × 450`, 33,080 bytes), `src/client/public/media/learning-lab/engineering-control-workbench-mobile-720.webp` (`720 × 450`, 61,634 bytes), `src/client/public/media/learning-lab/engineering-control-workbench-desktop-1440.avif` (`1440 × 960`, 175,987 bytes) and `src/client/public/media/learning-lab/engineering-control-workbench-desktop-1440.webp` (`1440 × 960`, 336,728 bytes).
- Safe-breakage derivatives: `src/client/public/media/learning-lab/safe-breakage-rig-mobile-720.avif` (`720 × 540`, 34,700 bytes), `src/client/public/media/learning-lab/safe-breakage-rig-mobile-720.webp` (`720 × 540`, 58,812 bytes), `src/client/public/media/learning-lab/safe-breakage-rig-desktop-1200.avif` (`1200 × 800`, 82,548 bytes) and `src/client/public/media/learning-lab/safe-breakage-rig-desktop-1200.webp` (`1200 × 800`, 147,190 bytes).
- Authority-transfer derivatives: `src/client/public/media/learning-lab/authority-transfer-mobile-720.avif` (`720 × 461`, 34,890 bytes), `src/client/public/media/learning-lab/authority-transfer-mobile-720.webp` (`720 × 461`, 59,652 bytes), `src/client/public/media/learning-lab/authority-transfer-desktop-1440.avif` (`1440 × 921`, 119,263 bytes) and `src/client/public/media/learning-lab/authority-transfer-desktop-1440.webp` (`1440 × 921`, 213,586 bytes). All twelve outputs remain below the 450 KB editorial-image ceiling.
- Transformation: `src/client/scripts/process-learning-lab-assets.mjs` verifies master hashes and dimensions, applies the accepted focal crop or inside fit, exports AVIF/WebP and strips metadata. From the repository root, `npm.cmd --prefix src/client run media:learning-lab:check` fails when a master, derivative or receipt drifts.
- Alt intent: the workbench shows human inspection of measured output and an available recovery path; the containment rig shows bounded failure beside a protected reference state and reset mechanism; the authority scene shows judgment moving from engineer-led inspection through shared review to learner-led technical drawing acceptance. Semantic HTML carries the exact learning loop, lab mechanics and authority argument.
- Earlier source prop retained without a public consumer: `src/client/public/media/learning-lab/venue-plan.png` is the byte-for-byte `500 × 350` source from `labs/02-give-the-cloud-agent-the-project/project/source/venue-plan.png`. It remains canonical Lab 2 material, but its basic connector-test pixels no longer represent the case study or any project preview.
- Added: 2026-08-24.

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

### Phase 8P evidence crops

These crops remove application-shell chrome while preserving the product surface that supports the case-study claim. They are deterministic derivatives generated and checked by `src/client/scripts/process-wild-bunch-evidence-crops.mjs`; `src/client/public/media/wild-bunch/evidence-crop-derivatives.json` records source identity, crop rectangles, output hashes, dimensions and bytes.

- Dustwell source: receipt-controlled `src/client/public/media/wild-bunch/dustwell-town-1200.webp`, SHA-256 `03a765839f6650aaf54c4fb269fee40b727f6cd98b13f971e9fe37616912e0ba`. The `667 × 417` crop at `(267, 244)` retains the complete town hub while removing application-shell chrome. Public derivatives: `src/client/public/media/wild-bunch/dustwell-town-hub-focus-640.avif` (`640 × 400`, 6,346 bytes), `src/client/public/media/wild-bunch/dustwell-town-hub-focus-640.webp` (`640 × 400`, 10,256 bytes), `src/client/public/media/wild-bunch/dustwell-town-hub-focus-800.avif` (`800 × 500`, 7,858 bytes), and `src/client/public/media/wild-bunch/dustwell-town-hub-focus-800.webp` (`800 × 500`, 13,060 bytes).
- Trail-map source: receipt-controlled `src/client/public/media/wild-bunch/trail-map-1200.webp`, SHA-256 `7b00aecd93e3729a2c50e9df3589a52061e55bb85cfba3a09d4f57e26b83c730`. The crop retains the complete starting-town heading, explanatory copy, graph and instruction. Public derivatives: `src/client/public/media/wild-bunch/trail-map-focus-480.avif` (`480 × 472`, 10,972 bytes), `src/client/public/media/wild-bunch/trail-map-focus-480.webp` (`480 × 472`, 15,598 bytes), `src/client/public/media/wild-bunch/trail-map-focus-600.avif` (`600 × 590`, 15,285 bytes), and `src/client/public/media/wild-bunch/trail-map-focus-600.webp` (`600 × 590`, 22,570 bytes).
- Sheriff Office source: receipt-controlled `src/client/public/media/wild-bunch/wanted-notice-960.webp`, SHA-256 `b03e2ef23c6aabe6e00cd3f88b85282fb31af8555fd00369da90b618d7a60afc`. The crop retains the office title, player action and wanted-poster surface. Public derivatives: `src/client/public/media/wild-bunch/wanted-notice-focus-472.avif` (`472 × 479`, 12,345 bytes), `src/client/public/media/wild-bunch/wanted-notice-focus-472.webp` (`472 × 479`, 16,078 bytes), `src/client/public/media/wild-bunch/wanted-notice-focus-590.avif` (`590 × 599`, 17,039 bytes), and `src/client/public/media/wild-bunch/wanted-notice-focus-590.webp` (`590 × 599`, 22,580 bytes).
- Rights and framing: first-party Wild Bunch gameplay captures owned and authorised by Harley Bartles. Dustwell belongs to the revision, seed and setup already recorded for the public Wild Bunch evidence set and proves a stored town layout without adding a stronger prosperity claim. The Hardpan reference capture remains internal composition evidence only because its public revision, seed and setup are not recorded. These remain current development-build evidence, not final game art.
- Added: 2026-08-30.

## Wild Bunch early-alpha concept art

- Sources: `src/client/assets/wild-bunch/concept-art/town-arrival-landscape.png` (`1672 × 941`, SHA-256 `9d592f8840034dc9be94c541d2e1fb744f5cba55663e5881730c338628cfc21e`) and `src/client/assets/wild-bunch/concept-art/town-arrival-portrait.png` (`1122 × 1402`, SHA-256 `6caa63f62e91da216054c864893e277f085b30f0b3149aacafac61c9b25456c2`).
- Provenance and rights: generated with OpenAI's built-in image-generation tool under Harley's direction; copyright Harley Bartles, all rights reserved. `src/client/assets/wild-bunch/concept-art/generation-receipt.json` preserves the accepted prompts, selections, risk review and intended claims. User-supplied references guided mood and subject only and are not retained.
- Public derivatives: `src/client/public/media/wild-bunch/town-arrival-landscape.avif` (`1440 × 810`, 121,640 bytes), `src/client/public/media/wild-bunch/town-arrival-landscape.webp` (`1440 × 810`, 169,746 bytes), `src/client/public/media/wild-bunch/town-arrival-portrait.avif` (`720 × 900`, 81,615 bytes), and `src/client/public/media/wild-bunch/town-arrival-portrait.webp` (`720 × 900`, 109,312 bytes).
- Transformation: deterministic Sharp resize to the accepted responsive compositions, AVIF quality 55 or WebP quality 80, with metadata stripped. `src/client/public/media/wild-bunch/concept-art-derivatives.json` records output identity and bytes.
- Claim boundary: bespoke visual-direction concept art for an early-alpha game, not a gameplay capture or evidence of implemented graphics. The landscape uses one-sided tintype emulsion loss; the portrait is a clean-edge re-composition of the same arrival moment.
- Added: 2026-08-30.

## Writing diagram captures

### Iterative Review version-one graph

- Public file: `src/client/public/images/writing/review-graph-v1.svg`.
- Source: `docs/assets/review-graph-v1.mmd`, a faithful Mermaid capture of `codex-marketplace/plugins/superpowers-plus/skills/iterative-review/references/review-state-graph.md` at first-party Marketplace revision `70dd30e2e65fd8f7aa89796a1a037da14235dd2a`. The capture preserves every node and transition in that source graph; its dark treatment is a portfolio presentation choice, not a claim about the runtime.
- Rights: Harley Bartles' first-party Marketplace workflow source, published from the public repository; authorised for this portfolio article.
- Transformation: rendered locally on 2026-08-27 with `@mermaid-js/mermaid-cli` 11.12.0. The retained source is the Mermaid input; the public output is static SVG with the portfolio's ink, surface and border palette, `2428.17 × 1544` view box, 61,984 bytes, SHA-256 `8427a3c8494755c6eb9a4964c4599bd06d7875013c31e67c06a8aaf102ee0879`.
- Alt and fallback: the concise alt identifies the initial orderly route and the later knot around repair, metrics, triage and final review. The figure caption and article text carry the argument if the image cannot load.
- Added: 2026-08-27.

## Phase 8 homepage editorial assets

The accepted homepage artwork was promoted from the Phase 8 editorial proof on 2 September 2026. The three Marketplace SVGs, four Wild Bunch textures, and two outlined wordmarks are byte-for-byte copies of their accepted sources. The seven Specialists PNG masters were converted at their full pixel dimensions to metadata-free WebP (quality 82, alpha quality 100) so the production files satisfy the repository's 400 KB image ceiling; the artwork was not regenerated, cropped, or downsampled.

- Marketplace artwork: `src/client/public/media/homepage/marketplace-superpowers-plus-wide.svg` (`1600 × 900`, SHA-256 `5c76bee24ce91037f881399fd164d513f0341ff63ed82543dd6dc7bf9be5a2f5`), `src/client/public/media/homepage/marketplace-superpowers-plus-intermediate.svg` (`1200 × 720`, `7963ffe90487875442d0384101a81d2395e97e4fbb008874dcc9bc94cf3a6cf0`), and `src/client/public/media/homepage/marketplace-superpowers-plus-narrow.svg` (`720 × 860`, `b02685fc6414e02fc57d01fc09efb00ea6e4d1e3f81a84738582493baaa88e7e`). Their accepted staging sources are preserved in Git history, not the live tree.
- Wild Bunch material: `src/client/public/media/homepage/wild-bunch-state.webp` (`1200 × 800`, SHA-256 `1ef18d113b88b2dd5d62fc731edacf211f3a3ca4d850333d83e958d4fa02730e`), `src/client/public/media/homepage/wild-bunch-state-vertical.webp` (`800 × 1200`, `1e661335578512d06b8bc7dbb2042108c30421871183bcf43e4226f1c6455525`), `src/client/public/media/homepage/wild-bunch-replay-leather.webp` (`900 × 900`, `11643f6f75e885cde5a8dc508278f50769e7a7be87e237eadfa6cdf10f14db8d`), and `src/client/public/media/homepage/wild-bunch-cache-crosshatch.webp` (`900 × 900`, `255ca2773a986041c10258af0c9a2c7a0ca66df214698fa555b85f41789c8f4f`). These textures support the semantic DOM proof; they do not carry topology by themselves.
- Specialists presentation: `src/client/public/media/homepage/patch-wordmark.svg` (`2893 × 744`, SHA-256 `07125a7e75a82a3a22f6271467d57e225669cc08cf20bd72317be784a6ab00e8`) and `src/client/public/media/homepage/the-usual-specialists-wordmark.svg` (`1120 × 240`, `89af7028f4e289044594d7a8a40636128a01e3d973c9c0929d9666dac4a4342c`) are first-party presentation outlines. No commercial font binary entered repository custody, and real semantic text remains in the page.
- Specialists scene derivatives: `src/client/public/media/homepage/specialists-folder.webp` (`1536 × 1024`, SHA-256 `ea74fc60f996ad9ee3614750b9a19203a626e83c3283e4e0eb21171f5a7dc816`), `src/client/public/media/homepage/specialists-silk.webp` (`1983 × 793`, `4f72dcd76fb72c98e33fd12741e61e16b207afdc6026fdd9fdcc0431750cfd1f`), `src/client/public/media/homepage/specialists-rollback.webp` (`1536 × 1024`, `5a5740482bd814ddbab9caffd663e01b5d09da23883ee596d6f907cac2666d83`), `src/client/public/media/homepage/specialists-receipt.webp` (`1448 × 1086`, `5da3cbbd5817ef8f734a242c05b26ce77e92ac0457b72fd83169cf634464cc19`), and `src/client/public/media/homepage/specialists-klause-k.webp` (`1254 × 1254`, `9c13c07852684fa134b199c9daa48764b3e2208a9ffa87367284f69a5f6631be`). Sources: the accepted raster assets referenced by the integrated wireframe.
- Torn substrate derivatives: `src/client/public/media/homepage/specialists-torn-edge-left.webp` and `src/client/public/media/homepage/specialists-torn-edge-right.webp` are both `724 × 2172`, with SHA-256 `e3239bac2d64899620bc7117af3383772c56a1deab9ecf3a25818c081a857b96` and `819a5de4efb9c6b4b128a598126a0b803a2206cd95dd6949cef1c1713ccb07ba`. Their transparent PNG masters are preserved in the implementation history rather than the live tree.
- Rights and fallback: these are first-party portfolio editorial assets owned or authorised by Harley Bartles. Marketplace and Specialists scene images have descriptive alternatives; Wild Bunch material textures, torn edges, overprint, and outlined wordmarks are decorative or presentation-only. If they fail, semantic headings, proof topology, copy, links, solid backgrounds, and a Specialists text fallback remain available.

## Removal rule

Before removing or replacing one of these files, search the client source, Markdown, generated route documents, and metadata for its path. Remove every consumer, run the client build and browser suite, and update this record in the same change.
