---
name: directing-visual-stories
description: Use when a visual brief, image, object, page, site, sequence, or interactive world needs authored composition and visual storytelling decisions before downstream implementation or generation.
metadata:
  source-id: directing-visual-stories
  provenance-name: Visual story direction first-party synthesis
  source-category: first_party
  status: active
  owner: Harley Bartles
  scope: Creative composition and visual storytelling across surfaces, frames, objects, bodies, sites, sequences, and interactive worlds.
  use_when:
  - crop, scale, viewpoint, perspective, focus, lighting, palette, attention, or story intent needs an authored decision.
  - a single frame, full page, sequence, or explorable field must carry a deliberate audience experience.
  - surface, material, mass, void, gesture, costume, site, curation, mapping, or embodied viewing carries meaning.
  do_not_use_when:
  - the task is only downstream image generation, responsive implementation, accessibility testing, or game mechanics.
license: MIT
---

# Directing Visual Stories

Make composition carry the story before a generator, page framework, or game
system chooses defaults. This first-party synthesis is a function-led guide, not
a style-imitation manual; sources and boundaries live in `assets/authority/`.

## Route the story problem

State the audience change (notice, understand, feel, anticipate, orient, or do) and
its evidence. Classify `mark/material`, `object/body`, `frame/surface`,
`field/site`, or `encounter/sequence`, plus a `directed`, `guided`, or
`exploratory` viewing contract. When the audience's body matters, also classify the
encounter as `pictorial`, `spatial`, `embodied`, or `participatory`. Choose one
primary family and at most two supporting families. Name beat, hierarchy,
crop/scale, viewpoint, perspective, depth/focus, attention path, light/palette,
material, motion/stillness, off-frame implication, and the invariant that must
survive translation. Expose unresolved choices; never let a downstream tool decide
them by omission.

## Selective routing

Read the scale contract first when ambiguous, then only the routes needed for the
beat. The containing page, spread, screen, or world remains in scope for every
subordinate frame. Use the canonical index for story function, never as a style
prompt.

| Problem | Reference |
| --- | --- |
| scale, agency, containing field | `story-scale-and-viewing-contract.md` |
| crop, viewpoint, perspective, negative space | `crop-scale-viewpoint-and-perspective.md` |
| hierarchy, vectors, detail density | `attention-weight-and-eye-path.md` |
| planes, focus, occlusion, causality | `depth-planes-focus-and-spatial-staging.md`, `internal-frames-occlusion-and-off-frame-space.md` |
| light, colour, reveal, state | `lighting-colour-and-selective-visibility.md` |
| close detail, reaction, motif, synecdoche | `details-inserts-reactions-and-synecdoche.md` |
| page, matte, inset, polyptych, rhythm | `page-fields-spreads-insets-and-polyptychs.md` |
| stage/blocking or anime timing | `staging-blocking-and-audience-relationship.md`, `rhythm-stillness-motion-and-transition.md` |
| exploratory space, landmarks, evidence | `spatial-cinematography-and-environmental-storytelling.md` |
| tiles, palettes, parallax, cycling | `constraints-tiles-palettes-and-colour-cycling.md` |
| surface, mark, collage, abstraction, material | `surface-mark-material-and-figure-ground.md` |
| mass, void, gravity, object in the round | `mass-void-gravity-and-multi-vantage-form.md` |
| site, threshold, procession, embodied view | `site-threshold-procession-and-embodied-viewing.md` |
| gesture, effort, ensemble, costume, drape | `gesture-effort-costume-and-choreographic-fields.md` |
| curation, anchors, juxtaposition, interpretive paths | `curation-juxtaposition-and-interpretive-paths.md` |
| symbols, maps, diagrams, visual rhetoric | `symbols-maps-diagrams-and-visual-rhetoric.md` |
| canonical practice anchor | `canonical-composition-index.md` |

## Handoff

Route to exactly one contract, then run the finite checks:

- image or edit: `translating-to-image-generation.md` → `generating-images`;
- page, screen, or full field: `translating-to-composed-interfaces.md` → web/React/accessibility/asset owners;
- navigable or tile world: `translating-to-interactive-worlds.md` → game/world owners.
- sequence or beat map: use the page/field contract for a directed sequence, or
  the world contract when participant agency changes the order.

Read `evaluating-visual-stories.md` for the selected output. Preserve creative
decisions and invariants; downstream skills own execution, responsive behaviour,
accessibility procedure, mechanics, and asset custody. If translation cannot
preserve the story job, return with the bounded change recorded.
