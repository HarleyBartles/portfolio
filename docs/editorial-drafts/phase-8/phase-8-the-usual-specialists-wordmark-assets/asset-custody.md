# The Usual Specialists wordmark asset custody

**Status:** Production-ready outlined presentation asset for the accepted Phase 8 wordmark. Production homepage integration remains out of scope.

## Asset

### `the-usual-specialists-wordmark.svg`

- Format: SVG paths only, fixed `0 0 1120 240` viewBox.
- SHA-256: `89af7028f4e289044594d7a8a40636128a01e3d973c9c0929d9666dac4a4342c`.
- Semantic title: `The Usual Specialists`, retained separately as real page text by every consumer.
- Geometry authority: [`../phase-8-the-usual-specialists-wordmark-refinement-proof.html`](../phase-8-the-usual-specialists-wordmark-refinement-proof.html), accepted by Harley on 1 September 2026 and frozen in [`../phase-8-the-usual-specialists-wordmark-authority.md`](../phase-8-the-usual-specialists-wordmark-authority.md).
- Source Sans 3 source: repository-held `source-sans-3-latin-wght-normal.woff2` from `@fontsource-variable/source-sans-3@5.3.0`, weight `900`, distributed under SIL Open Font License 1.1. Existing repository custody and licence text remain under `../phase-8p-typography-assets/`.
- Chassis source: Chassis Black, upright Black face, purchased by Harley Bartles and activated locally on this Windows machine under a desktop licence.
- Chassis conversion: Windows resolved the installed family by name and emitted glyph geometry for the accepted `SPECIALISTS` lettering. The conversion did not locate, copy, vendor, embed, redistribute or commit the `.otf` or any other Chassis font binary.
- Composition: the Source Sans outlines, two rules and Chassis outlines are retained together as one canonical asset. Consumers must uniformly scale the asset and must not reconstruct or independently position its parts.
- Colour: paths use `currentColor`; standalone image use defaults to black. A consumer that needs a different colour may use the complete asset as one mask or inline presentation object without changing its internal geometry.

## Fidelity proof

[`../phase-8-the-usual-specialists-wordmark-outline-proof.html`](../phase-8-the-usual-specialists-wordmark-outline-proof.html) places the outlined asset beside the frozen live-font authority at wide and narrow scales. The comparison exists to prove conversion fidelity, not to reopen optical design.

Browser captures of the live authority and outlined asset were compared at the canonical `1120 × 240` scale and at `563 × 120` and `320 × 68` rendered scales. At canonical scale the occupied horizontal bounds and top edge are identical; the live-font baseline extends one raster pixel farther because text hinting and path rasterisation differ. At `320 × 68` the occupied bounds are identical. Difference inspection shows edge anti-aliasing and hinting only, with no change to the frozen vector geometry.

## Licence boundary

Only the generated wordmark outlines are committed. The Chassis font file is neither a repository asset nor a webfont dependency. The SVG must not be treated as a source from which to reconstruct or redistribute the Chassis typeface.
