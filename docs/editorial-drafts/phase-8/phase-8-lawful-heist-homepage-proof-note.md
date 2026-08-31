# Phase 8 Lawful Heist homepage proof note

**Status:** Ready for Cloud/Harley visual review. The proof remains isolated from production.

## Chosen composition

The proof is an irregular cover/spread composition built around one bespoke overhead completed-folder plate. `Lawful Heist` remains real Source Sans 3 DOM text in the quiet left field. Three unequal peripheral insets supply consequential story beats rather than six equal character portraits:

- Silk's eyes open in restrained surprise when the route survives her test;
- Rollback's gloved hand engages the amber lockdown control;
- Receipt takes the record as it prints.

Klause's produced K impression is a genuine transparent red overprint crossing the lower-right edge of the comic treatment into the pale shared-site ground. The folder stays decisively dominant, the insets add narrative charge second, and the title/link remain ordinary accessible web content.

The composition is specific to Lawful Heist. It is not a reusable Patch component or a miniature of the full route.

## Asset attempts and acceptance

- Completed folder plate: attempt **1/5 accepted**. The 3:2 image gives the folder decisive right-hand dominance, preserves all six material languages, and leaves quiet dark space for live title copy.
- Transparent K overprint: **2/5 generation attempts used**. Attempt 1 preserved the correct impression but baked in a checkerboard. Attempt 2 provided a chroma intermediate. The final asset uses deterministic luminance-to-alpha extraction from the stronger first impression, with fixed Heist-red ink RGB and genuine PNG alpha. It contains no paper carrier, stamp tool, hand, ink pad or wax seal.
- Silk reaction strip: attempt 1 was rejected because narrowed eyes read as scrutiny/annoyance. Attempt **2/5 accepted** after opening and lifting the simple eye shapes enough to register restrained surprise while preserving Silk's approved identity.
- Rollback lockdown inset: attempt **1/5 accepted**. The hand/control cause-and-effect is immediate and calm rather than militarised or spectacular.
- Receipt printing inset: **4/5 generation attempts inspected**. Attempt 1 had the strongest machine/hand composition but showed an arm/hand contradiction in the full frame. Attempts 2 and 4 explored anatomy repairs but weakened the composition; attempt 3 removed the hand and therefore lost the requested action. The proof deliberately returns to attempt 1 and uses a much tighter browser crop around the correct hand, paper and printer mouth so the contradictory forearm is not part of the composed asset.

Full source and derivative custody is recorded in `phase-8-lawful-heist-homepage-proof-assets/asset-custody.md`.

## Responsive treatment

Desktop behaves as one bounded cover field: folder hero, title mass and three peripheral cut-ins share the same plane. Narrow layouts are re-authored rather than squeezed. The title becomes its own dark opening; the folder follows as a wide story object; the reaction, control and receipt beats move underneath at readable scale. The K overprint crosses the lower-right edge of the composed strip into the pale ground rather than being reduced to a tiny badge.

The proof is static. Reduced motion therefore exposes the same resolved composition. `?media=off` removes the critical imagery and exposes a plain-language fallback while the title and onward route remain usable.

## Review surface

Open:

`/docs/editorial-drafts/phase-8/phase-8-lawful-heist-homepage-proof.html`

The production homepage, production Lawful Heist route, and all other Patch treatments are unchanged.

## Browser QA evidence

- Wide desktop: inspected at 1440 × 1100; all images loaded, console errors 0, horizontal overflow 0.
- Narrow editions: inspected at 768, 390 and 320 CSS pixels; title, folder and supporting beats recompose in deliberate reading order with horizontal overflow 0.
- Zoom/reflow: inspected at a 720 CSS-pixel viewport with 2× device scale as the 1440-pixel/200% equivalent; horizontal overflow 0.
- Keyboard order: `Skip to proof` → `Open live adventure` → `Meet the crew`.
- Reduced motion: browser context reported `prefers-reduced-motion: reduce`; the proof is static and exposes the same resolved state.
- Missing media: `?media=off` hides the hero, insets and overprint, preserves title/navigation, and exposes one ordered plain-language fallback without a dead media block.

## Known review questions

- Does the eye strip add enough narrative charge without competing with the folder?
- Is the transparent K impression forceful enough at the title seam, or should its final production treatment be simpler?
- At narrow widths, is the full three-inset sequence worth its vertical depth, or should one secondary beat disappear after review?
