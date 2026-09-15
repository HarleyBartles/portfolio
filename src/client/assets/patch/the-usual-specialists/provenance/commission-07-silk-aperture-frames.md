# Commission 07 — Silk aperture frames

## Record identity

- Provenance ID: `commission-07-silk-aperture-frames`
- Schema version: 1
- Commission/package: Silk second fixed-frame aperture / Commission 07 accepted frames
- Assets covered: `silk-commission-07-frame-review`, `silk-commission-07-frame-review-portrait`
- Rights owner: Harley Bartles
- Temporary canonical repository: Portfolio

## Status

- Asset status: accepted
- Selection: current
- Acceptance date: 2026-09-15
- Both orientation masters were promoted from page-review candidate custody after live React review of the complete Commission 07 aperture with its service-corridor world.

## Original commission intent

Create isolated foreground broken-plaster wall frames for a rectangular world layer, preserving a restrained "less destroyed" wall treatment while guaranteeing that React can hide the hard rectangular world boundary beneath opaque wall material. The later portrait commission provides a true portrait frame rather than relying on a rotated landscape proxy.

## Material changes from original intent

An earlier temporary wall-frame experiment was rejected because its irregular damage did not provide a continuous rectangular occlusion contract. The replacement landscape commission made viewport concealment an explicit generation constraint and set intact plaster to the page's canonical mineral colour `#e6eaeb`. The generated landscape master is `1671 × 941`, one pixel narrower than the requested `1672 × 941`; custody records the actual output without resizing it.

After the 320–389px page treatment had been authored with a temporary 90-degree rotation of that landscape candidate, Harley commissioned a true portrait counterpart. The portrait result is exactly `941 × 1671`, preserves the same material family and mineral-colour requirement, and carries the same rectangular viewport-coverage contract without rotation, stretching, squashing or cropping.

## Accepted execution brief

Landscape evidence status: `normalized-from-approved-conversation`.

Generate a transparent PNG foreground wall frame with a large organic central opening, restrained cracking and crumbling, modest exposed masonry/timber, and substantially intact plaster. Use `#e6eaeb` / RGB `230, 234, 235` as the base intact-plaster colour. The asset must conceal a hard rectangular world layer behind the opening with continuous opaque wall material around the chosen viewport perimeter; transparency is allowed only outside the surviving wall fragment and through the central opening. Avoid catastrophic demolition, disconnected fragments, warm plaster, baked scenery, or a visible rectangular border.

Portrait evidence status: `verbatim-recovered`.

> Use the supplied broken-wall aperture image as the direct visual reference and create a true portrait version of the same architectural object.
>
> The result must be a vertically oriented broken plaster wall frame, approximately 941 × 1671 pixels or an equivalent portrait aspect ratio of about 0.563:1.
>
> Preserve the same physical language as the reference: irregular fractured plaster, exposed rough aggregate, occasional brick and timber structure, believable wall thickness, broken edges, rubble-like protrusions, and natural asymmetry. It must look like the same wall and belong to the same asset family.
>
> Do not rotate, stretch, squash, warp, or simply crop the landscape source. Recompose the breach naturally as a portrait aperture with a tall central opening and substantial broken wall material around all four sides.
>
> The mineral substrate colour is exactly `#E6EAEB`. The intact plaster and broken plaster belonging to the wall must use this exact mineral colour so that the frame visually merges into a page whose substrate is also `#E6EAEB`. Do not make the plaster cream, beige, warm grey, blue-grey, white, or another near-match. The underlying material colour is `#E6EAEB`. Fracture depth, exposed aggregate, brick, timber, dirt and physically necessary shadowing may introduce local detail, but the plaster/mineral material itself must clearly resolve to `#E6EAEB`.
>
> The exterior surrounding the broken wall must be transparent. The central aperture must also be transparent. Do not place scenery, a room, a colour field, a black fill, text, people, props, or any other content inside the opening.
>
> The complete broken-wall frame must remain inside the image bounds with a small transparent safety margin around its furthest exterior protrusions. Nothing important should be clipped by the canvas edge.
>
> Most importantly, the aperture must satisfy a strict rectangular viewport coverage contract. There must exist one clean portrait rectangle inside the broken opening that can be used as the viewport for a separate image placed behind the frame.
>
> Every point along all four edges of that viewport rectangle — top, right, bottom and left — must land on opaque pixels belonging to the broken wall frame. No part of any viewport edge may pass through the transparent central aperture, and no part may pass through the transparent exterior surrounding the frame.
>
> The wall therefore needs enough continuous opaque material around the entire rectangular viewport perimeter to completely cover it. The irregular visible hole may extend inward beyond that hidden rectangle, but the rectangle’s four boundary lines must remain continuously concealed by frame pixels.
>
> This contract is essential because a separate image will be clipped exactly to that rectangle behind the aperture. When composited, none of that image may be able to leak into either the inner transparency around the visible breach or the outer transparency beyond the wall. The broken frame must completely mask the viewport boundary on all four sides.
>
> Keep the aperture visually irregular and convincingly broken rather than turning it into an obvious neat rectangular picture frame. The rectangle is a hidden compositing constraint, not a visible design motif.
>
> Avoid mirrored rubble, repeated fracture patterns, overly smooth hole edges, decorative symmetry, fake bevels, obvious generative repetition, or exaggerated destruction. Preserve the photorealistic material scale, sharpness and cut-out quality of the supplied reference.

## Reference hierarchy

- Material authority: canonical Portfolio mineral surface `#e6eaeb`.
- Geometry authority: exact generated alpha plus orientation-specific React viewport derivation.
- Damage direction: restrained, substantially intact broken plaster rather than catastrophic demolition.
- Quarantined: baked world imagery, warm/cream plaster, thin decorative rubble rings, visible engineered rectangle.

## Accepted asset identity

| Asset ID | Original generated filename | Dimensions | Bytes | SHA-256 |
| --- | --- | --- | ---: | --- |
| `silk-commission-07-frame-review` | `ChatGPT Image Sep 14, 2026, 01_24_36 PM.png` | 1671 × 941 | 1,346,025 | `ae71464cdff60d3fc48ed19a79537f11821e498f9e8b3af47a5a7d5efae49005` |
| `silk-commission-07-frame-review-portrait` | `ChatGPT Image Sep 15, 2026, 07_18_49 AM.png` | 941 × 1671 | 1,483,753 | `b6ae38e89fc4050b68cf76832cb0b8c246fe947cdca936fc9815426e2c0c2c71` |

Repository sources:

- `src/client/assets/patch/the-usual-specialists/silk/silk-commission-07-frame-review.png`
- `src/client/assets/patch/the-usual-specialists/silk/silk-commission-07-frame-review-portrait.png`

## Generation provenance

Landscape master:

- Model: OpenAI Image 2.5
- Model evidence: project-owner-confirmation-2026-09-14
- Generation ID: `25052eb4-cbee-48fb-abb8-0b47e7f99e8d`
- Parent generation ID: tool returned null
- Seed: not supplied by the tool
- Generation date: 2026-09-14
- Literal backend prompt: not retained; the tool result exposed an empty prompt field
- Human brief evidence: normalized from the approved conversation

Portrait master:

- Model: OpenAI Image 2.5
- Model evidence: project-owner-confirmation-2026-09-14
- Generation ID: `90641cec-ee79-488d-b8b1-a98c44794b55`
- Parent generation ID: tool returned null
- Seed: not supplied by the tool
- Generation date: 2026-09-15
- Backend prompt metadata: the generation result exposed an empty prompt field
- Human brief evidence: the exact project-owner-approved brief is retained verbatim above and was the single brief used for the single generation call

## Iteration history

The first temporary frame was evaluated and rejected because its broken silhouette could not support the required rectangular edge occlusion. A replacement landscape brief was rewritten to contain only the information the image model needed: canvas/output requirements, mineral plaster colour, restrained damage direction, transparency rules, and an explicit rectangular occlusion contract. Harley approved that brief and selected the resulting landscape image for candidate custody and live React review.

The lowest-width React composition initially rotated that landscape candidate by 90 degrees as an explicitly temporary proxy. On 2026-09-15 Harley approved the portrait brief above, authorized exactly one image from exactly one brief in one tool call, then selected that result for candidate custody and directed it to replace the rotated proxy.

## Acceptance decision

Accepted by Harley Bartles on 2026-09-15 after the landscape and portrait frame variants were mounted with the Commission 07 service-corridor world in React and reviewed together on the page. The landscape master is the wider-band frame; the portrait master is the true narrow-band frame. The earlier temporary rotated landscape proxy is superseded.

## Known accepted limitations

- The generated master is `1671 × 941` rather than the requested `1672 × 941`; no resampling is applied.
- Exact alpha analysis selected a page viewport of `x=112..1522`, `y=166..812`.
- The authored viewport carries a continuous two-pixel inward perimeter at alpha threshold `240`; this is the accepted contract for these exact pixels.
- The portrait master is exactly `941 × 1671` and is used without rotation or resampling.
- Exact portrait alpha analysis selected a page viewport of `x=143..837`, `y=198..1475`.
- The portrait viewport also carries a continuous two-pixel inward perimeter at alpha threshold `240`; its centre remains transparent, proving the viewport crosses the aperture rather than hiding entirely under solid wall.
- The world behind the frame is the separately accepted `silk-commission-07-service-corridor-review` master rather than the earlier diagnostic colour field.

## Composition / ownership contract

The generated images own foreground broken-wall material only. React selects the landscape frame above the narrowest band and the true portrait frame at the narrowest band; it does not rotate the landscape candidate to simulate portrait. React owns the orientation-specific rectangular clipped world viewport, the separately custodied Commission 07 service-corridor world image, parallax motion, whole-aperture placement, responsive sizing, cyan diagnostics and z-order. Only the world moves for parallax; the viewport and foreground frame remain page-locked.

## Deterministic descendants

Both accepted PNG masters have deterministic WebP page-use derivatives generated by `src/client/scripts/process-usual-specialists-assets.mjs`; exact descendant bytes and hashes live in `usual-specialists-derivatives.json`.

## Missing historical evidence

- Landscape literal backend prompt string; the generation result exposed an empty prompt field.
- Portrait backend prompt metadata field; the generation result exposed an empty prompt field, while the approved human/tool-call brief is retained verbatim above.
- Seed for either generation; the tool did not supply one.

## Custody history

Landscape: approved conversational commission brief → OpenAI Image 2.5 generation → project-owner candidate selection → exact generated master copied into Portfolio candidate custody → normalized provenance and generation receipt → deterministic WebP derivative → live React page review → project-owner acceptance → byte-identical master promoted into Portfolio Silk accepted custody.

Portrait: project-owner correction of the portrait requirements and rectangle coverage contract → verbatim brief approval → one OpenAI Image 2.5 generation call → project-owner candidate selection → exact `941 × 1671` generated master copied into Portfolio candidate custody → alpha-contract proof at `x=143..837`, `y=198..1475` → generation receipt and provenance update → deterministic WebP derivative → narrow React replacement of the temporary 90-degree landscape rotation → project-owner acceptance → byte-identical master promoted into Portfolio Silk accepted custody.
