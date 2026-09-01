# Phase 8 The Usual Specialists homepage proof note

**Status:** Accepted on 1 September 2026 as the Patch movement authority for the Phase 8 homepage wireframe. The isolated proof remains the source specimen; its approved movement is now integrated unchanged into the full editorial wireframe. Production homepage integration remains out of scope.

## PATCH protagonist marque

`PATCH` is typeset unmodified in the locally installed upright ITC Serif Gothic Std Black face and exported as one five-path SVG. The face's normal shaping, kerning and advances are preserved; there is no tracking adjustment, glyph surgery, sloped `T`, effect or additional branding furniture. The complete asset uses the existing cream paper colour on the dark Heist field and remains visually quieter than the episode title.

Real semantic `PATCH` text remains in the page immediately before the semantic `The Usual Specialists` heading. The outlined asset is hidden from assistive technology. The font binary was not located, copied, embedded or committed. Typeface, licence and generated-asset custody are recorded in [`phase-8-patch-wordmark-assets/asset-custody.md`](./phase-8-patch-wordmark-assets/asset-custody.md), and [`phase-8-patch-wordmark-outline-proof.html`](./phase-8-patch-wordmark-outline-proof.html) provides the deterministic local-font comparison.

## Final polish pass

The invitation now reads `One question. Are you in?`; the CTA remains `Meet the crew →`. The complete PATCH SVG is optically offset `6px` to the right at every size so the Serif Gothic `P` meets the episode-title/copy datum by eye. At the narrow breakpoint only, the same complete SVG is also offset `14px` downward, reducing its visible gap to the episode wordmark without changing either asset or surrounding document flow.

Rendered before/after measurements confirm that the wide and intermediate PATCH/title vertical geometry did not move, while the narrow visible gap changed from `82.64px` to `68.64px`. The episode-title position remained unchanged at all three review widths.

## Intermediate hierarchy correction

The `521px` to `1099px` composition now lets the episode-title outlines cross directly from the existing dark field into the folder with no added background continuation. At the decisive smallest intermediate width, the complete fixed wordmark grows until the `T` of `SPECIALISTS` straddles the dark/folder seam. `THE USUAL` and `SPECIALISTS` remain one uniformly scaled asset; no internal geometry changes.

Within that intermediate range, PATCH is `94px`, approximately `90%` of its previous `104px` size. The complete episode-title asset grows to approximately `225.3px` at the decisive `521px` viewport. Its width remains proportional to the dark-field lane so the same `T` continues to straddle the seam as the intermediate composition grows; the SVG itself is only uniformly scaled. The gap from the visible `SPECIALISTS` outlines to the lower divider reduces to approximately `32px` at `521px`. `One question. Are you in?` stays on one line by scaling smoothly from `15px` to the accepted `18px`, without claiming breakout space. The narrow rules explicitly restore the accepted `112px` PATCH width, original episode-title width and normal copy wrapping; the wide composition never enters these intermediate rules.

Rendered checks at `521`, `560`, `640`, `768`, `900` and `1099` CSS pixels confirm the one-line invitation, zero page overflow, loaded media, preserved semantic marks and unchanged zero-flow K behavior. Boundary checks at `520` and `1100` confirm that the accepted narrow and wide compositions remain isolated from the correction.

## Frozen title authority

Harley accepted the canonical `The Usual Specialists` lockup on 1 September 2026. [`phase-8-the-usual-specialists-wordmark-authority.md`](./phase-8-the-usual-specialists-wordmark-authority.md) freezes the complete `1120 × 240` geometry and prohibits further optical tuning or responsive reconstruction.

The production presentation asset is one path-only SVG containing `THE`, both rules, `USUAL` and `SPECIALISTS`. It is consumed as one proportional object. Real semantic `The Usual Specialists` text remains inside the page's `h1`; the outlined SVG is hidden from assistive technology.

The asset contains 21 vector paths, zero text elements and zero font references. Its Chassis and Source Sans 3 provenance, licence boundary, conversion method and SHA-256 are recorded in [`phase-8-the-usual-specialists-wordmark-assets/asset-custody.md`](./phase-8-the-usual-specialists-wordmark-assets/asset-custody.md). No Chassis font binary was located, copied, embedded or committed.

## Conversion fidelity

[`phase-8-the-usual-specialists-wordmark-outline-proof.html`](./phase-8-the-usual-specialists-wordmark-outline-proof.html) renders the frozen live-font authority beside the outlined asset at wide and narrow scales.

Browser captures were compared at the canonical `1120 × 240` scale and at `563 × 120` and `320 × 68` rendered scales. The canonical comparison has identical occupied horizontal bounds and top edge; the live-font baseline extends one raster pixel farther because hinted live text and unhinted vector paths rasterise differently. The `320 × 68` comparison has identical occupied bounds. Difference inspection is confined to glyph-edge anti-aliasing and hinting, with no visible geometry drift.

The outlined asset is visually indistinguishable from the accepted browser specimen apart from those normal rasterisation differences.

## Isolated Heist integration

The proof at [`phase-8-lawful-heist-homepage-proof.html`](./phase-8-lawful-heist-homepage-proof.html) now presents the public title `The Usual Specialists`. The legacy filename remains only as the existing Phase 8 working-path location; no visible `Lawful Heist` title treatment remains in the proof.

The accepted art direction is otherwise unchanged:

- wide retains the simultaneous spread with the eye strip intruding from the left, dominant folder, unequal Rollback and Receipt carriers, and red K breaking into the pale ground;
- intermediate retains eye-strip-first ordering, the title and invitation over the folder, and the K physically bridging the folder/Rollback seam;
- narrow retains the separate title-first authored sequence followed by the eye strip, folder, K punctuation, Rollback and Receipt; and
- Klause's K remains an absolute zero-flow overprint at every breakpoint.

The wordmark is uniformly scaled inside each authored composition. Its internal geometry never changes.

## Browser QA

The integrated proof was visually inspected at `1440`, `768` and `390` CSS pixels. The complete boundary matrix at `320`, `390`, `520`, `521`, `768`, `1024`, `1099`, `1100` and `1440` reported:

- zero horizontal page overflow;
- all five raster story assets loaded with non-zero natural dimensions;
- semantic `PATCH` text remained present before the episode heading and its outlined presentation retained the fixed `2893:744` ratio;
- the semantic `h1` text remained `The Usual Specialists`;
- the outlined wordmark retained the `1120:240` ratio under uniform scaling;
- the K remained `position: absolute` with `0px` margin; and
- hiding the K changed section height, Rollback position and Receipt position by exactly `0px` at every width.

At every intermediate and narrow width, the K's visible bounds intersected both the folder and Rollback bounds. The unexplained Rollback top margin rejected in the earlier v2 review has not returned.

The `?media=off` state was rechecked at `390` and `768`: the semantic title and outlined title presentation remain visible, the hero/K/detail planes disappear, the single folder fallback appears, and page overflow remains zero.

The reflow-pressure check at a `720 × 550` CSS viewport with `2×` device scale reported reduced motion active, zero animations, zero overflow, all media loaded and the K still absolute. The focusable DOM order remains `Skip to proof` → `Open live adventure` → `Meet the crew`; the title integration adds no focusable element.

The PATCH fidelity surface resolved its local browser reference through `SerifGothicStd-Black` with upright style and weight `900`. At a `96px` em, the browser's shaped advance was `282.828px` against the Windows export authority's `282.816px`; the `0.012px` difference is normal raster precision. The matching-scale outline and live specimen differed in rendered height by `0.016px`. The fallback control measured `349.922px`, proving that the intended installed face—not Arial—was rendering.

## Review handoff

**Accepted Patch movement authority — The Usual Specialists isolated homepage proof**

The full-page integration is available in [`phase-8-homepage-wireframe.html`](./phase-8-homepage-wireframe.html). It preserves this proof's wide, intermediate and narrow choreography while allowing Cloud and Harley to judge the transitions from Writing into Patch and from Patch into the professional close. Production homepage components, edition machinery, the live Patch route and any generalized Patch template remain unchanged.
