# Phase 8P typography contract

**Status:** Typography decision accepted on 30 August 2026. This contract is implementation-ready typography custody within the wider Phase 8P visual-language room. It does not authorize public-site implementation, homepage work or a local implementation plan.

## Governing rule

Source Sans 3 is the site voice. Source Serif 4 is a semantic transition into authored reading, not a prestige accent. Source Code Pro appears when the material itself becomes technical, not as engineering decoration. Judge every edge case by the content's role before choosing a family.

The accompanying [deterministic specimen](./phase-8p-typography-specimen.html) demonstrates typography only. It is not a production page, component library, colour decision, spacing system or layout direction. Production components and layout must not be copied wholesale from it.

## Family contract

### Source Sans 3: shared site voice

Source Sans 3 must own:

- site display headings;
- About headings;
- project titles;
- section headings;
- body copy outside authored article routes;
- navigation;
- metadata;
- captions; and
- ordinary links outside a serif article context.

### Source Serif 4: authored long-form register

Source Serif 4 may own only:

- article titles;
- article body;
- article leads or standfirsts when the article benefits from one; and
- rare genuine quotations or literary excerpts whose content belongs to the authored-reading register.

Source Serif 4 must not bleed into:

- project titles;
- About titles;
- navigation;
- case-study headings;
- evidence captions;
- generic pull-excerpts; or
- decorative “premium editorial” moments.

A route being substantial, reflective or visually prominent does not make it an article. Case studies remain in the shared Sans voice unless the wider visual-language contract explicitly introduces a genuine authored article inside them.

### Source Code Pro: technical evidence

Source Code Pro may own only:

- code;
- diffs;
- terminal or command output; and
- genuinely machine-readable technical evidence.

Source Code Pro must not be used for navigation, metadata or labels merely because their subject is technical. General utility text remains Source Sans 3.

## Hierarchy tokens

| Role | Family | Weight | Size | Line height | Tracking | Boundary |
|---|---|---:|---|---:|---:|---|
| Site display | Source Sans 3 | `650` | `clamp(42px, 5.4vw, 72px)` | `0.98` | `-0.025em` | Sentence case; major site, About and project display |
| Article display | Source Serif 4 | `600` | `clamp(38px, 4.2vw, 52px)` | `1.04` | `-0.025em` | Authored articles only; quieter than site display |
| Section heading | Source Sans 3 | `600` | `32px` | `1.08` | `-0.022em` | Shared section and case-study hierarchy |
| Site body | Source Sans 3 | `400` | `18px` | `1.62` | `0` | Non-article prose; measure around `66ch` |
| Article body | Source Serif 4 | `400` | `19px` | `1.66` | `0` | Authored article prose at a comfortable reading measure |
| Article lead | Source Serif 4 | `500` | `20px` | `1.35` | `0` | Optional; use only when it improves the opening |
| Metadata | Source Sans 3 | `600` | `14px` | `1.40` | `0.012em` | Sentence case; meaningful metadata floor |
| Caption | Source Sans 3 | `400` | `14px` | `1.50` | `0` | Evidence and media captions |
| Code / diff | Source Code Pro | `400` | `14px` | `1.55` | `0` | Genuine technical material only |

Links inherit the family, weight and size of their surrounding role. They must remain visibly underlined in Sans and Serif contexts and must not receive a separate brand-font treatment. Focus indication and accessible contrast remain production requirements.

## Implementation boundaries

### Must

- Preserve the family-to-content role mapping above.
- Use normal browser text rendering rather than rasterised type.
- Keep site and article display in sentence case.
- Keep the article display visually quieter than the site display at every shared viewport.
- Self-host legitimate font files and retain their licence and provenance under repository custody.
- Use `font-display: swap` or an equivalently readable loading strategy for public implementation.
- Define readable category-matched fallback stacks and test the page with custom fonts blocked.

### May

- Express the tokens through the production token system rather than copying the specimen's CSS names.
- Tune fallback metrics, measures and responsive wrapping where implementation proof shows a need without changing the role hierarchy.
- Use Source Serif 4 for a genuine quotation or literary excerpt when the content itself belongs to the authored-reading register.
- Use `13px` for genuinely secondary material only after the proof described below.

### Must not

- Turn Source Serif 4 into a reusable premium-looking accent.
- Use Source Code Pro as a general signifier of engineering.
- Create uppercase, highly tracked label furniture from metadata;
- copy specimen layout, panels, colours or spacing into production as an implied design system; or
- substitute a remote, unlicensed or look-alike font without reopening this decision and recording new custody.

## Validation contract

- `14px` is the normal floor for meaningful metadata.
- `13px` is allowed only for genuinely secondary material after narrow-width, contrast and 200% zoom proof.
- Confirm the site-display `-0.025em` tracking against the longest real About and project headings during implementation.
- Prove that article display remains quieter than site display at `1440`, `768`, `390` and `320` CSS pixels.
- Prove typography at 200% zoom, at narrow widths, with keyboard-only navigation and in normal browser font rendering without a collapsed or ambiguous hierarchy.
- Test readable fallback rendering with the custom font requests blocked.
- Retain visible underlines and focus treatment for links in both Sans and Serif contexts.

## Font custody and licence

The specimen vendors three normal-style Latin variable WOFF2 files from Fontsource `5.3.0` packages:

| Family | Packaged source | Vendored file | Package axes | SHA-256 |
|---|---|---|---|---|
| Source Sans 3 | `@fontsource-variable/source-sans-3@5.3.0`, `files/source-sans-3-latin-wght-normal.woff2` | `phase-8p-typography-assets/fonts/source-sans-3-latin-wght-normal.woff2` | weight `200–900` | `7a19a7027e125257d310c6dbd78ae3a30b5ea1e3794d60b12bb28227a003bfda` |
| Source Serif 4 | `@fontsource-variable/source-serif-4@5.3.0`, `files/source-serif-4-latin-opsz-normal.woff2` | `phase-8p-typography-assets/fonts/source-serif-4-latin-opsz-normal.woff2` | weight `200–900`, optical-size build | `f2ea9c12d2fe9bd3a9589b02ad2c0909da88f30938c91adc838c4f4098f9f9e0` |
| Source Code Pro | `@fontsource-variable/source-code-pro@5.3.0`, `files/source-code-pro-latin-wght-normal.woff2` | `phase-8p-typography-assets/fonts/source-code-pro-latin-wght-normal.woff2` | weight `200–900` | `8b774aaa5137a38ef40f4ac9d36db9a5eee152b2f66589dfdc82ff007fc87135` |

All three packages declare `OFL-1.1`. The distribution licence is retained at [`phase-8p-typography-assets/OFL-1.1.txt`](./phase-8p-typography-assets/OFL-1.1.txt). Fontsource package pages and Adobe's upstream repositories remain the provenance routes: [Source Sans 3](https://fontsource.org/fonts/source-sans-3), [Source Serif 4](https://fontsource.org/fonts/source-serif-4), [Source Code Pro](https://fontsource.org/fonts/source-code-pro), [Adobe Source Sans](https://github.com/adobe-fonts/source-sans), [Adobe Source Serif](https://github.com/adobe-fonts/source-serif) and [Adobe Source Code Pro](https://github.com/adobe-fonts/source-code-pro).

Future public implementation must reassess subset coverage against the real character set, preserve the OFL notice when redistributing the fonts and record any different file, subset or package version with its own hash. It must not silently replace local custody with a CDN.

## Decision close

The earlier three-way comparison between the Source, IBM Plex and Literata/Atkinson systems is retired. It was temporary selection evidence and must not be added to the repository. This contract and the single Source-system specimen replace it as the durable typography decision artifacts. The wider Phase 8P visual-language contract remains incomplete, so the baton stays `Blocked` and PR #45 stays draft.
