# Silk Diegetic Wall Design

Status: Approved direction, 12 September 2026

## Problem

The first Silk React wireframe proved the story beats and responsive choreography, but its rectangular image cells make the chapter feel too polite. Silk's canonical visual idea is more aggressive: she pressure-tests the route by breaking through the safehouse and through the page structure that contains it.

The accepted new direction treats the Portfolio's cool-mineral page surface as literal safehouse plaster. Silk reveals that truth by anchoring into it, cracking it, opening apertures through it and moving between the world behind the wall and the editorial surface in front.

The old Silk disposable-wireframe composition is therefore superseded as a layout authority. It remains historical evidence for story order and discovered beats only.

## Product direction

Silk is the chapter where the web page stops behaving like a set of panels.

The reader should experience this escalation:

1. Index ends on the existing accepted mineral page composition.
2. A physical route anchor bites into that mineral surface and exposes a restrained amount of brick beneath the plaster.
3. A broad irregular aperture opens through the page. Commission 05 is not a panel on top of the page; it is the safehouse corridor visible behind that hole.
4. The clean `SILK` wordmark remains printed on the mineral surface. The red route rope physically crosses its glyph bodies.
5. Commission 06 places Silk across the aperture threshold so part of her reads inside the safehouse depth plane and part of her reads on the page plane.
6. Silk continues down the page on the rope and opens a second structural breach. Commission 07 is another world/depth plate behind that aperture rather than a rectangular panel.
7. Receipt appears through a smaller fused smashed-wall peek-through elsewhere in the same plaster/brick system.
8. The accepted surprised-eyes image becomes a narrow slit through the plaster rather than a framed reaction cell.
9. Commission 09 remains a separate handoff beat, but its final composition is allowed to violate ordinary panel framing and should be designed around the page/world boundary rather than placed as a polite rectangle beneath Commission 08.
10. The Silk rope resolves naturally into its endpoint and loose curl.

The mineral page is therefore diegetic: it is painted/plastered safehouse wall. Broken areas reveal ordinary safehouse brick/lath and interior depth. This rule is specific enough to make Silk's chapter memorable without requiring the rest of the portfolio to become a literal wall texture.

## Preserve from the previous work

The following decisions remain authoritative:

* Opening → Index → Silk source order.
* Index remains visually and geometrically protected. Do not redesign it to match Silk.
* The page-owned responsive vocabulary in `specialistsResponsive.ts` remains authoritative.
* No authored 620px Silk breakpoint.
* 1920px inclusive remains the first ultrawide state.
* Internal authored geometry freezes above the 2560px canvas ceiling.
* The `SILK` mark remains clean Chassis-derived outlined SVG artwork with no distortion or distress.
* A real red rope crosses through the body of the `SILK` mark.
* Commission 06 contains zero rope pixels and must read as physically attached to the independently composed rope.
* Rope implementation is modular: local chapter-owned rope segments joined at deliberate mineral-page anchor events.
* Receipt remains one fused transparent Receipt + smashed aperture asset, not independently registered character/aperture layers.
* The accepted `1983 × 793` surprised-eyes image remains reuse-first authority for Commission 08.
* Parents own whole-child geometry; vertical-slice children own internals; no caller `className`, selector reach-through, hidden geometry variables or `styled(ChildComponent)` seam.

## Layer model

Silk's chapter uses four conceptual planes:

1. **Mineral page plane** — the normal route surface, clean `SILK` mark, chapter numeral, editorial copy and story card.
2. **Behind-wall world plane** — Commission 05/07 environment plates visible only through authored apertures. This plane may move subtly with scroll.
3. **Traversal plane** — rope segments and transparent Silk/character assets that can cross between world and page space.
4. **Foreground rim/anchor plane** — broken plaster/brick rim pieces and rope-anchor hardware that re-occlude parts of Silk/rope and prove physical depth.

The implementation should make those planes explicit enough to test. Do not fake depth by drawing every layer into one scene image.

## Aperture architecture

Create a focused Silk aperture primitive owned by the Silk vertical slice. It is not a portfolio-wide generic component.

The primitive owns:

* clipping the world/depth child into an irregular authored hole;
* a stable page-plane aperture boundary;
* a separate foreground-rim layer that can occlude traversal content;
* a bounded transform target for subtle parallax;
* reduced-motion fallback;
* data hooks for browser geometry/motion tests.

The parent Silk composition owns each aperture's placement, size, rotation and z-order. The aperture child owns its internal clipping, rim relationship and world-plane transform.

Desktop, tablet and compact authored states may use different aperture silhouettes. Do not merely scale one tear if doing so destroys the intended composition.

## Parallax law

Parallax exists only to sell physical depth behind an aperture.

The governing rule is:

**The mineral wall moves with the document. The world behind it moves a little less. The broken edge never slips.**

Implementation requirements:

* only the behind-wall world layer translates;
* the aperture mask/rim remains fixed to the page plane;
* motion is directly derived from normal document scroll; no scroll-jacking, inertial lag, spring animation or mouse-follow effect;
* total relative travel should remain subtle, approximately 20–40 CSS px while an aperture crosses the active viewport region;
* motion is bounded so image bleed never exposes an empty edge;
* off-screen work should be avoided by observing aperture visibility;
* `prefers-reduced-motion: reduce` disables the relative transform entirely;
* the static reduced-motion composition must remain complete and visually intentional;
* mobile may use a lower amplitude or zero amplitude if crop reserve cannot support movement cleanly.

Do not split a single environment plate into many faux-3D layers merely to increase the effect. One moving world plate behind one stable rim is the default.

## Commission implications

### Commission 05

Commission 05 becomes the **world behind the first aperture**, not a framed upper-right chapter panel.

Keep the approved environmental narrative: ordinary shabby safehouse corridor first, methodical pressure-test evidence second, small late-arriving canonical Patch third, no visible Silk. Preserve the researched foreground/midground/background staging and Patch identity contract.

Remove the old requirement for quiet image-space reserved for the `SILK` wordmark or rope. Those elements now live on the mineral page in front of the aperture.

Add generous parallax/crop overscan around all sides. The model must not generate broken page-plaster aperture edges, page anchors, comic borders or the main rope. The React aperture system owns the reveal.

### Commission 06

Commission 06 remains transparent and rope-free, but it is now specifically a **threshold-crossing traversal**. Silk should plausibly bridge the first aperture: some anatomy can read behind the foreground plaster rim while the rest projects onto the mineral page. The final prompt must use an accepted aperture/rope geometry guide rather than a generic panel-overlap guide.

### Commission 07

Commission 07 becomes a second **behind-wall environment/depth plate**. It should show the deeper tested route/service-void world without generating the page aperture rim itself. The React layer owns the hole and re-occlusion. Receipt remains separate.

### Commission 08

Use the accepted reaction image behind a narrow irregular **plaster slit**. The existing close CSS crop is useful. The slit owns the visual framing; the source image is content behind it. Recommission only if the historical baked rope cannot be hidden/subordinated by authored crop.

### Commission 09

Keep the realization and handoff as separate beats, but reopen the handoff composition. It no longer has a locked right-edge-aligned rectangular cell contract. Design the handoff around the page/world relationship after the new aperture/traversal geometry is proven.

### Asset packages

* Keep the 2–3 piece Specialists rope kit; amend it for page/world depth transitions and aperture occlusion.
* Keep and strengthen the mineral-page anchor kit; it now establishes the diegetic plaster/brick truth of the page.
* Replace the old "Silk panel-edge occluders" concept with a **Silk mineral-wall aperture/rim package**. These are page-surface foreground pieces/masks for the main corridor opening, broad breach and narrow eye slit, not rectangular panel lips.
* Keep the fused Receipt smashed-wall peek-through. Align its plaster/brick vocabulary with the aperture package.
* Decide the mineral plaster surface treatment as part of the page implementation. It may be subtle CSS texture or a small owned texture asset; do not introduce a loud repeating wall pattern.

## Responsive composition

The existing responsive vocabulary remains the only authored page vocabulary:

* minimum: 320
* narrow max: 390
* compact max: 720
* mid max: 900
* wide min: 1400
* expanded min: 1600
* ultrawide min: 1920
* ceiling: 2560

The new Silk composition is authored at these states rather than inheriting the disposable wireframe's old rectangles.

At every state:

* the first aperture must read as a hole in the mineral surface, not an image card;
* `SILK` remains on the mineral page and the route rope crosses it;
* Commission 06 must visibly cross an aperture boundary;
* the second breach remains materially distinct from the first but belongs to the same wall;
* the reaction slit remains a distinct short beat;
* semantic source order remains understandable without imagery/motion;
* no horizontal page overflow;
* the 2560 authored geometry freezes above the ceiling.

## Accessibility and motion

The chapter must remain understandable when images fail or animation is disabled.

* Semantic heading/order stays Opening → Index → Silk.
* Narrative copy remains HTML.
* Aperture/rim art is decorative when its meaning is already carried by scene alt/copy.
* Parallax is supplemental and disabled under reduced motion.
* Keyboard and zoom behavior remain governed by the route-wide contracts.
* Actual 200% browser zoom remains a human review gate.

## Test contract

Retire tests that assert the superseded rectangular Silk wireframe relationships.

Replace them with objective physical laws:

* the first and second world plates are clipped by apertures rather than rendered as ordinary bordered figures;
* the aperture rim stays page-locked while the world layer translates under normal scrolling;
* reduced motion produces zero parallax transform;
* Commission 06 crosses the first aperture boundary and paints above the local rope but can be re-occluded by the rim;
* the rope crosses the real `SILK` mark;
* local chapter rope ports remain close enough for commissioned boundary anchors to cover their overlaps;
* Commission 08 still uses the accepted `specialists-silk.webp` source behind the reaction slit;
* no horizontal overflow at protected widths;
* responsive geometry freezes above 2560;
* accepted Index protected visual snapshots remain unchanged.

Do not retain the old "exactly one page-spanning rope SVG" assertion. Test perceived continuity and seam geometry instead of implementation count.

## Asset custody

Do not add the rejected first Commission 05 generation to accepted production custody.

Silk accepted masters should live in a dedicated chapter source package rather than being appended blindly to the Index-only accepted-assets manifest. The production processor may be generalized by chapter or gain a sibling Silk processor, but whichever route is chosen must preserve:

* accepted source checksum and dimensions;
* generation/provenance receipt where applicable;
* deterministic AVIF/WebP or alpha-capable derivatives as appropriate;
* no-upscale policy;
* byte budgets;
* enough source overscan for approved parallax travel;
* explicit accepted/rejected status boundaries.

## Reconsideration triggers

Revisit this direction if any of the following become true during the React proof:

* the page-as-wall metaphor cannot remain legible at 320px or 200% zoom;
* parallax requires large image travel, scroll-jacking or continuous main-thread work to read;
* the aperture system forces Index to be redesigned rather than remaining a stable contrast;
* Commission 06 cannot cross the aperture convincingly without brittle per-pixel registration;
* irregular aperture art causes unmanageable bleed or asset-size costs across responsive states.

Those are reasons to simplify the implementation, not to silently fall back to the superseded rectangular Silk wireframe.
