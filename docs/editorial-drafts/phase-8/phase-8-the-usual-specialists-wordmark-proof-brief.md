# Phase 8 The Usual Specialists wordmark proof brief

**Status:** Isolated deterministic proof for Cloud/Harley review. Production integration remains blocked on rendered lockup acceptance.

## Goal

Settle the geometry of the renamed Patch adventure title, `The Usual Specialists`, before touching the production homepage.

The lockup has one typographic system:

- `THE USUAL` uses the repository-held Source Sans 3 variable face at weight `900`;
- `THE` is materially smaller than `USUAL` and is held between an upper and lower horizontal rule;
- `SPECIALISTS` uses the locally installed, upright `Chassis Black` face;
- `SPECIALISTS` supplies the dominant mass and most of the lockup width.

The title should feel complete, stable and load-bearing because every crew member is present. Chassis's own construction and internal cuts carry that idea. The proof must not add beams, braces, bolts, trusses or other structural illustration.

## Comparison boundary

The proof shows three spacing/geometry variants only. They may vary:

- Chassis tracking;
- the length of the rules around `THE`;
- the gap between `THE` and `USUAL`; and
- the vertical relationship between the upper and lower lines.

Font families, weights, casing, colours and all other treatment remain identical. Each variant appears at a wide title scale and inside the same narrow/mobile frame.

The proof must not use texture, shadow, outline, bevel, skew, distressed crime typography, stencil/tactical language, an italic motion shortcut or imagery borrowed from *The Usual Suspects*.

## Custody

Chassis Black was purchased and installed locally under a desktop licence. The proof may resolve it with CSS `local("Chassis Black")` for design review on this Windows machine. It must not locate, copy, vendor, redistribute or commit the `.otf`.

Source Sans 3 uses the existing repository-held OFL 1.1 WOFF2. No other supporting font is introduced.

After geometry acceptance, the intended production route is to convert the Chassis wordmark to vector outlines under the desktop licence, retain real semantic `The Usual Specialists` text for accessibility and record the resulting asset provenance. That conversion is explicitly outside this proof.

## Validation and handoff

- Verify that the browser has loaded the `Chassis Black` local face rather than a fallback.
- Inspect wide and narrow/mobile states, including 1440, 768, 390 and 320 CSS pixels.
- Check keyboard order, reduced motion, actual 200% browser zoom and horizontal reflow.
- Keep the proof independent of production homepage components, edition machinery and final Patch integration.
- Return the browser URL and a preferred geometry for Cloud/Harley taste review without treating it as accepted production art.

## Proof outcome

Open `phase-8-the-usual-specialists-wordmark-proof.html`.

- The fresh Chromium process resolved `local("Chassis Black")`; the proof's registered `Chassis Black Local Proof` face reports `loaded`, weight `900`, style `normal`.
- Source Sans 3 loaded from the existing repository-held variable WOFF2 at weight `900`.
- Variant A, `Balanced datum`, is the recommended starting point for Cloud/Harley review. It keeps the upper line calm and connected without squeezing Chassis or letting the `THE` rules become a separate graphic. B and C remain visible as geometry controls, not alternative concepts.
- Browser checks at 1440, 768, 390 and 320 CSS pixels found no page overflow or clipped wordmarks. The 720 CSS-pixel reflow-pressure check with reduced motion active found no overflow or animations.
- The skip link reaches the wide proof, and every visual lockup exposes the semantic accessible name `The Usual Specialists`.
- No Chassis binary or derived outline asset was added. Production integration and SVG-outline conversion remain blocked on rendered lockup acceptance.
