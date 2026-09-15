# Silk receipt peek-through frame

## Record identity

- Provenance ID: `silk-receipt-peekthrough-frame`
- Schema version: 1
- Commission/package: Silk receipt peek-through / circular plasterboard punch-through frame
- Assets covered: `silk-receipt-peekthrough-frame-review`
- Rights owner: Harley Bartles
- Temporary canonical repository: Portfolio

## Status

- Harley Bartles accepted this exact mounted frame into `accepted / current` custody on 2026-09-15 after live React review.
- The byte-identical source master now lives in the accepted Silk package and is recorded in `accepted-assets.json`.

## Original commission intent

Create a square photorealistic foreground frame representing a roughly circular hole punched inward through a recently installed plasterboard false wall. The wall should read as modern plasterboard and skim, use the Portfolio mineral page colour `#e6eaeb`, expose no brick or traditional lath, and leave only the actual circular opening transparent. The surrounding square should resolve to flat mineral wall material so its outer boundary disappears against the page.

## Material changes from original intent

The approved brief requested a `1536 x 1536` master. The generated source is actually `1254 x 1254`, so source custody records the generated result exactly without enlargement or resampling. Inspection also found that the generated intact outer wall missed the mineral-field contract: sampled source pixels range roughly from RGB `196,199,200` to `216,221,222` instead of resolving to `#E6EAEB`, and the outer edge is near-opaque rather than mathematically fully opaque (measured minimum alpha `242`). The generated PNG remains byte-identical in accepted custody; only the deterministic page derivative receives the approved mineral-field correction.

## Accepted execution brief

Evidence status: `normalized-from-approved-conversation`.

Create a single photorealistic square PNG foreground frame of a roughly circular hole punched inward through a recently built plasterboard false wall. Use modern plasterboard plus thin skim construction, not masonry, brick, timber lath, studs, insulation, pipes or old wall fabric. The broken skim and gypsum should fracture and lean inward into the opening, with restrained cracks radiating away from the impact. The wall surface should resolve to the page mineral colour `#E6EAEB` and become completely flat and undisturbed toward the outer canvas edge. Only the interior of the punched-through hole should be transparent; the surrounding square should be opaque wall material. Keep a substantial central opening for separately composited imagery, use neutral restrained lighting, and generate no receipt, people, props, text, scenery or other content behind the opening.

Harley approved a `1536 x 1536` square master and authorized exactly one image, one brief and one image-generation tool call.

## Reference hierarchy

- Construction/material authority: approved modern plasterboard-and-skim brief.
- Mineral surface authority: `#E6EAEB` / RGB `230,234,235`.
- Source identity authority: exact user-saved generated file.
- Generated-image identity authority: retained generation ID `da9b0bf3-2ff2-4efb-b59b-0499d85cd9c1`.
- Page review authority: current Silk receipt peek-through placement in React.
- Quarantined: receipt scene art, brick, masonry, traditional lath, studs, insulation, pipes, cables, text, people and generated scenery.

## Accepted asset identity

| Asset ID | Original generated filename | Dimensions | Bytes | SHA-256 |
| --- | --- | --- | ---: | --- |
| `silk-receipt-peekthrough-frame-review` | `ChatGPT Image Sep 15, 2026, 10_56_41 AM.png` | 1254 x 1254 | 1,921,708 | `b54884c061078485ba777055ee7edb57eddeff3dc2579bad356b55e87e1ce3b4` |

Repository source: `src/client/assets/patch/the-usual-specialists/silk/silk-receipt-peekthrough-frame-review.png`.

Measured source format: PNG, sRGB, 4 channels, 8-bit unsigned depth, alpha present.

## Generation provenance

- Model: OpenAI Image 2.5
- Model evidence: retained tool result
- Generation ID: `da9b0bf3-2ff2-4efb-b59b-0499d85cd9c1`
- Generation ID status: retained
- Parent generation ID: tool returned null
- Seed: not supplied by tool
- Generation date: 2026-09-15
- Backend prompt metadata: empty string; no separate literal backend prompt is claimed
- Human brief evidence: approved current conversation, normalized above

## Iteration history

Harley first specified the circular modern-plasterboard treatment and explicitly kept image generation hands-off while the brief was reviewed. After approving the brief, Harley supplied the desired square dimensions and authorized one image, one brief and one tool call. One image was generated, manually saved by Harley, then selected for candidate custody and live React page review without any additional image generation.

During live page review the square source boundary remained visible because the generated outer wall was materially darker than the page mineral surface. Harley approved deterministic colour correction rather than another image-generation pass. The source master remains unchanged; the processor now preserves the fracture zone and central transparency while feathering the undamaged outer field to the canonical page mineral.

## Acceptance decision

Harley accepted the exact mounted receipt-hole frame into `accepted / current` custody on 2026-09-15 after completing live React review, with the instruction: `Good enough. We can move on. Accept the receipt hole frame image into accepted custody if it isn't already in accepted.` The visual frame, source bytes, deterministic mineral correction, current React placement, scale behavior, parallax stand-in world, and z-order remain unchanged by this custody promotion.

## Known accepted limitations

- The generated master is `1254 x 1254`, not the requested `1536 x 1536`; no enlargement or source resampling is applied.
- Fully transparent pixels occupy a central irregular region with measured bounds approximately `x=258..973`, `y=242..981`.
- The centre pixel is fully transparent.
- The four source corners are near-opaque rather than fully opaque, with sampled alpha values `242`, `252`, `250`, and `251`; measured minimum outer-edge alpha is `242`.
- The generated intact outer wall is materially darker than `#E6EAEB`; this is corrected only in the deterministic page derivative, not in the accepted source master.
- React keeps the temporary striped world inset beneath the central breach during review so no diagnostic world pixels can reach the source-canvas boundary.
- The receipt scene itself is deliberately not commissioned or represented here.

## Composition / ownership contract

The accepted image owns only the modern plasterboard foreground frame. React owns the existing receipt peek-through placement, a central clipped diagnostic world, parallax motion, responsive sizing and z-order. Only the temporary striped world moves; the frame remains page-locked. The parent placement remains unscaled and owns only page position plus the existing `3deg` rotation; the child square composition owns authored visual scale bands of `1.25` at `320..389`, `1.6` at `390..899`, `1200..1499`, and `1920+`, and `2.5` at `900..1199` and `1500..1919`.

## Deterministic descendants

The accepted PNG master receives a deterministic metadata-free WebP page derivative from `src/client/scripts/process-usual-specialists-assets.mjs` using the repository WebP contract (`quality 82`, `alphaQuality 100`, `effort 6`, `smartSubsample true`, no enlargement). Before WebP encoding, the receipt-frame derivative applies a radial mineral-field correction centred on the `1254 x 1254` canvas: source pixels are preserved through radius `0.40 x 1254 = 501.6px`; from `501.6px` to `0.48 x 1254 = 601.92px` they are smoothstep-feathered toward opaque `#E6EAEB`; at and beyond `601.92px` the output is fully opaque canonical mineral. The central aperture lies inside the preserved region and therefore retains its generated alpha unchanged. The transform parameters are also recorded in the derivative receipt. Exact descendant bytes and SHA-256 live in `usual-specialists-derivatives.json`.

## Missing historical evidence

- Backend literal prompt string distinct from the approved conversational brief; the tool returned an empty prompt field.
- Seed; not supplied by the tool.
- Parent generation ID; the tool returned null.

## Custody history

Approved circular plasterboard frame brief -> one OpenAI Image 2.5 generation -> Harley manually saved the result -> exact saved source copied byte-for-byte into Portfolio candidate custody -> measured source identity and alpha limitations recorded -> deterministic WebP descendant -> live React page review with striped parallax stand-in world -> visible source-canvas mineral mismatch identified -> Harley approved deterministic correction -> derivative-only radial mineral-field normalization applied while source custody remained byte-identical -> lower-half placement, scale and z-order reviewed in React -> Harley accepted the exact mounted frame on 2026-09-15 -> byte-identical master promoted to accepted/current Silk custody and removed from active candidate custody.
