# The Usual Specialists responsive strategy design

**Status:** Approved for implementation.

**Planning handoff readiness:** 9/10. The supported range, authored bands, local exception, ceiling behaviour, ownership boundary, and browser proof are explicit.

## Goal

Make the implemented Index milestone the responsive golden example for later Specialists chapters before more React composition is added.

The page supports `320` through `2560` CSS px as an authored responsive domain. It may have route-specific authored bands; it does not need to conform to the portfolio's older generic breakpoint table. New Specialist chapters should consume the page's responsive vocabulary instead of inventing ad hoc viewport thresholds.

## Page-owned responsive contract

The Specialists page owns these authored transitions:

- `320-390`: narrow composition.
- `391-720`: compact composition.
- `721-900`: mid composition.
- `901-1399`: standard composition.
- `1400-1599`: wide composition.
- `1600-1920`: expanded composition; the returning Index/Patch traversal pair is present.
- `1921-2560`: ultrawide composition; the approved hard topology switch and fixed commission relationship apply.
- `2560`: authored ceiling and canonical terminal composition.

`1400` is the actual wide boundary. The current `1401` formulas were authored to meet the accepted `1400` geometry continuously, so the implementation should remove the accidental `1399 / singleton 1400 / 1401` expression and start the wide regime at `1400`.

`620` is not a page band. It is an existing opening/temporary-rope adaptation and must be represented as an explicitly named opening-local exception. Later chapters must not reuse it merely because it exists.

## Behaviour above the ceiling

At `2561px` and wider, the page stops adapting its authored geometry.

The complete Specialists composition is centred inside a `2560px` authored canvas. Additional viewport width becomes exterior breathing room. Internal geometry must remain equal to the accepted `2560px` layout, apart from the uniform horizontal translation caused by centring the canvas.

The freeze applies to the whole current page, including the opening and Index chapter. In particular, viewport-driven positions such as threshold copy, story card, commission composition, paper relationships, traversal relationships, scales, overlaps, and text/media sizing must not continue drifting after `2560px`.

This is a finite authored design domain, not a request to scale the composition indefinitely on 3440px or 5120px displays.

## Ownership

Add one Specialists-local responsive source containing the named thresholds and media-query strings. It is route-local source, not a site-wide token system.

All viewport media queries inside the current Specialists page should consume that source. Child vertical slices continue to own their internal responsive choreography; centralising the breakpoint vocabulary does not move geometry ownership back to the parent.

The page root remains the full-width semantic article and shared mineral field. A centred authored-canvas wrapper owns the finite `2560px` composition width so exterior space can grow without narrowing the article/background surface.

## Existing visual invariants

Preserve the accepted current composition from `320` through `2560`, including:

- `<=720`: mobile traversal topology with `index-high-step` and `patch-follow`, while the desktop/commission traversal figures are hidden as currently approved;
- `1600+`: the returning Index/Patch pair appears on the desk document;
- `1920/1921`: the lower Patch changes sides without interpolating through the upper Patch and retains at least `48px` visible separation;
- `1921-2560`: blue INDEX sheet and graph paper keep their fixed relative relationship and the blue sheet never recovers past its accepted `1920` position;
- `1921-2560`: Commission 03/04/note keep the approved fixed internal relationship, at least `24px` art-cell overlap, Patch coverage `<=50%`, zero protected Index-face occlusion, and sticky-note seam bridging;
- protected visual baselines at `2560`, `1600`, `1440`, `768`, `390`, and `320` remain unchanged.

## Verification contract

Keep the existing breakpoint-edge and relationship coverage. Add explicit browser proof for the ceiling using `2560`, `2561`, `2880`, and `3440` CSS px.

At widths above `2560`:

1. the authored canvas is exactly `2560px` wide and horizontally centred;
2. representative opening and Index elements have the same bounding boxes relative to the authored canvas as at `2560`, within normal renderer tolerance;
3. existing ultrawide invariants continue to hold;
4. there is no horizontal document overflow.

Use stable semantic/data hooks and bounding-box relationships, not styled-component class names.

## Scope boundary

This slice changes responsive architecture only. It does not add the next Specialist chapter, commission assets, redesign Index, change public copy, alter the temporary rope art direction, introduce site-wide breakpoint policy, or perform the later 320-2560 portfolio-wide responsive audit.

Image generation remains hands-off.
