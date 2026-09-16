# Visual Storytelling Skills Design

**Status:** Approved for implementation planning

**Owner:** Portfolio repository during the experimental phase

**Future custody:** Agent Asset Marketplace after Portfolio stress testing

**Research baseline:** `.agents/specs/2026-09-15-visual-storytelling-web-spike.md`

## Purpose

Create two repo-owned, portable skills with a deliberate responsibility boundary:

- `directing-visual-stories` authors the visual story and its composition;
- `generating-images` translates an approved visual direction into image-generation
  or image-editing work, selects an available authorised capability, inspects the
  result, and iterates without silently redesigning the frame.

Together they prevent an image model, component library, browser convention, or
procedural generator from making creative decisions by omission.

The skill directs visual stories across four nested scales:

```text
object -> frame -> complete field -> sequence
```

A complete field may be one generated image, a full webpage, a compound editorial
page, a theatrical stage picture, a game viewport, or a navigable environment.

## Initial custody and graduation

The skills begin as tracked local source at:

```text
.agents/skills/directing-visual-stories/
.agents/skills/generating-images/
```

They are declared exactly by name in `.agents/plugins/marketplace.json` under
`repo.local_skills`. Repo-local skill names have no required prefix.

This local phase exists to support repeated Portfolio visual work and inexpensive
field iteration. Graduation to the Agent Asset Marketplace is a later, separately
authorised task. At graduation, source custody moves to a citation-backed marketplace
lane and Portfolio, Wild Bunch, and Adventures consume generated copies.

## Primary and secondary applications

### Image-generation briefing

Every material image-generation brief must make deliberate decisions about the
story beat, crop, scale, viewpoint, perspective, depth, focus, lighting, palette,
attention path, implied motion, internal framing, and off-frame space.

`directing-visual-stories` owns upstream creative direction. It hands a completed
frame direction to `generating-images`, which owns generation/edit mode, reference
image roles, prompt translation, capability selection, invariant preservation,
variant strategy, output inspection, targeted iteration, transparency, persistence,
and asset handoff.

`generating-images` is an Apache-2.0-compliant derivative of the installed OpenAI
`imagegen` skill, but is substantially rewritten as a portable capability contract.
It must carry the upstream licence, attribution, and prominent modification notice.
The derivative claim applies even where rewritten passages no longer resemble the
source closely; substantial modification does not erase the lineage of the work.
Its core instructions must not assume Codex tool names, `$CODEX_HOME`, built-in save
paths, or an OpenAI-only execution route. Provider- or harness-specific operations
belong in optional routed adapters. If no authorised image capability exists, the
skill reports the missing capability instead of pretending to have generated an asset.

### Authored screen composition

For UI-bearing repositories, the skill directs the visual story before frontend or
game implementation begins. It may shape a full route, article, case study,
interactive explanation, React/Phaser playfield, compound evidence surface, tile
town, or responsive sequence.

The skill is not a web-design skill. Photography, cinematography, comics, editorial
design, theatre, lighting, anime, and game design supply the creative grammar.
Existing UI, accessibility, responsive-layout, implementation, and asset-custody
skills translate and verify the result.

## Viewing contracts

The skill classifies work as:

- **Directed:** the author controls the view and order.
- **Guided:** the audience controls pace while the principal route remains authored.
- **Exploratory:** the participant controls viewpoint, order, route, or state.

Techniques must match the contract. A precise crop suits a directed still; an
exploratory world instead needs landmarks, paths, gradients, repeated cues, and
compositions that survive several viewpoints.

## Required decisions

The skill requires the agent to establish:

1. The story function and intended change in understanding or feeling.
2. The active composition scale or scales.
3. The viewing contract.
4. Subject and information hierarchy.
5. Crop, scale, viewpoint, and perspective.
6. Foreground, middle-ground, background, and occlusion.
7. Focus and intended noticing order.
8. Lighting source, motivation, quality, falloff, shadow, and selective visibility.
9. Palette roles and state changes.
10. Stillness, motion, transition, and interaction.
11. Relationship to adjacent frames or the complete field.
12. Repository, evidence, accessibility, and asset constraints.
13. The intended audience change: knowledge, feeling, orientation, or agency.
14. What downstream implementation must preserve across sizes, states, and inputs.

The agent selects one primary compositional family and at most two supporting
families, reads only the routed references, and explains why the chosen composition
carries the story.

## Source disciplines

The skill cleanly synthesises:

- photography: selection, crop, light, depth, detail, and implied before/after;
- cinematography: camera, blocking, focus, continuity, reveal, reaction, and time;
- comics: panel/page duality, closure, gutter, inset, polyptych, super-panel, and flow;
- editorial design: page/spread unity, hierarchy, multiple voices, interruption, and pacing;
- theatre: tableau, blocking, levels, proximity, entrances, audience relationship, and cues;
- lighting: selective visibility, form, depth, atmosphere, information, and palette;
- anime: layout blueprints, key poses, selective motion, compositing, stillness, impact, and deformation;
- games: spatial cinematography, guidance, agency, landmarks, environmental story, responsive state, tiles, sprites, parallax, palettes, bitplanes, and colour cycling.

Sources are cited in `assets/authority/CITATIONS.md`. Copyrighted source pages,
screenshots, film stills, comic panels, and magazine spreads are not vendored.
Operational references contain clean-room synthesis rather than inline citations.

## Skill structure

```text
.agents/skills/directing-visual-stories/
|-- SKILL.md
|-- agents/
|   `-- openai.yaml
|-- references/
|   |-- story-scale-and-viewing-contract.md
|   |-- crop-scale-viewpoint-and-perspective.md
|   |-- attention-weight-and-eye-path.md
|   |-- depth-planes-focus-and-spatial-staging.md
|   |-- lighting-colour-and-selective-visibility.md
|   |-- internal-frames-occlusion-and-off-frame-space.md
|   |-- details-inserts-reactions-and-synecdoche.md
|   |-- page-fields-spreads-insets-and-polyptychs.md
|   |-- staging-blocking-and-audience-relationship.md
|   |-- rhythm-stillness-motion-and-transition.md
|   |-- spatial-cinematography-and-environmental-storytelling.md
|   |-- constraints-tiles-palettes-and-colour-cycling.md
|   |-- translating-to-image-generation.md
|   |-- translating-to-composed-interfaces.md
|   |-- translating-to-interactive-worlds.md
|   |-- canonical-composition-index.md
|   `-- evaluating-visual-stories.md
`-- assets/
    |-- field-trial-notes.md
    `-- authority/
        `-- CITATIONS.md
```

No bundled executable is justified in the experimental phase.

```text
.agents/skills/generating-images/
|-- SKILL.md
|-- LICENSE.txt
|-- NOTICE.md
|-- agents/
|   `-- openai.yaml
|-- references/
|   |-- capability-routing.md
|   |-- prompt-contract.md
|   |-- generation-and-editing.md
|   |-- preserving-frame-invariants.md
|   |-- validation-and-iteration.md
|   `-- asset-handoff-and-custody.md
`-- assets/
    |-- field-trial-notes.md
    `-- authority/
        `-- CITATIONS.md
```

The derivative does not copy the bundled OpenAI CLI. A portable executable may be
added later only when more than one consumer can use the same provider-neutral
interface without harness-specific environment assumptions.

## Progressive disclosure

`SKILL.md` remains a compact router containing the thesis, scope boundaries,
classification flow, required decisions, reference routing table, and output
contracts. Technique teaching, medium translations, canonical examples, and
evaluation detail live in routed references.

The description identifies triggering conditions only. It must not summarise the
workflow in a way that lets agents bypass the entrypoint.

## Canonical composition index

Each entry records:

- technique;
- story function;
- canonical work or practice;
- what to inspect;
- what not to imitate superficially;
- applicable references;
- source links.

The index includes frame-within-frame and repoussoir; off-frame implication and
negative-space pressure; deep staging, deep focus,
rack focus, and split-field composition; detail and visual synecdoche; reaction
framing; directed negative space and short-side pressure; page panel, inset,
polyptych, continuous narrative, montage, and super-panel; editorial spread and
interruption; theatrical tableau and blocking; lighting cues; anime layout, key
pose, selective motion, stillness, and impact; spatial cinematography,
environmental storytelling, observation points, landmarks, attention relays, tiles,
parallax, palette swapping, colour cycling, regional display rules, and Amiga-era
constraint invention.

The index extracts principles and never directs copying of a protected frame,
spread, studio style, or living artist's identifiable aesthetic.

## Output contracts

### Frame direction

Produces the story beat, moment, subject hierarchy, crop, viewpoint, spatial
staging, attention path, lighting, palette, motion, off-frame implication,
rationale, and avoid list.

### Page composition direction

Produces the page story, compositional form, entry field, dominant field,
subordinate frames and editorial voices, spatial staging, density rhythm,
transitions, closing composition, text-as-spatial-actor decisions, and survival
requirements for later responsive and accessible implementation.

### Interactive-world direction

Produces the player story, agency contract, object/viewport/scene/world scales,
landmarks, routes, thresholds, vistas, loops, environmental narrative, likely
arrival/discovery/return/departure frames, state changes, lighting, palette,
motion, interface relationship, and implementation constraints.

## Validation strategy

The first versions are authored directly from the approved research baseline,
licensing boundary, responsibility split, and known Portfolio requirements. Skill
structure, metadata, links, manifests, provenance, and repository mesh receive normal
deterministic validation. Creative value is not claimed from synthetic RED/GREEN
agent comparisons.

Behavioural validation happens in the field during the upcoming Usual Specialists
work in Portfolio. For each material use, record only evidence that can improve the
skill:

- the real visual problem and accepted story intent;
- which routes and references were selected;
- the direction or image brief produced;
- where the skill clarified, constrained, distracted, over-prescribed, or omitted;
- which decisions Harley accepted, rejected, or changed;
- what survived image generation and responsive implementation;
- the smallest skill revision justified by the observed result.

Field notes are evidence, not an automatic instruction to encode every preference as
a universal rule. Revisions must distinguish a portable compositional lesson from a
Portfolio-specific art direction choice. After several materially different uses,
the evidence is reviewed for marketplace readiness and cross-repository portability.

## Wild Bunch later field trial

After Portfolio incubation, the live Wild Bunch town hub supplies a read-only
cross-repository field trial:

- React shell and Phaser playfield;
- deterministic 10x10 grid and 800x500 field;
- fixed top-down oblique camera;
- two-column main road, spurs, and rasterised paths;
- named and supporting building families;
- five building views;
- prosperity-controlled density;
- seeded dirt and prop variation;
- mirroring and seam contracts;
- DOM keyboard navigation surrounding the canvas.

The skill must direct focal hierarchy, arrival composition, landmarks, district
rhythm, sightlines, environmental story, social staging, lighting, ambient motion,
palette behaviour, and changed-world states without violating those existing
contracts or inventing implementation facts.

## Portfolio incubation field

Portfolio supplies the first guided-composition work. The skill must produce an
authored evidence-led route without falling back to hero/card-grid/CTA grammar,
copying another medium's surface language, inventing public evidence, flattening
route identity, or losing the story during responsive translation.

## Non-goals

- Implementing a visual redesign or generated asset during skill creation.
- Editing the installed system `imagegen` skill.
- Copying or redistributing its Codex-specific CLI.
- Hiding provider-specific assumptions in the portable core.
- Adding implementation code, CSS, React components, or Phaser behaviour.
- Moving the skill to the Agent Asset Marketplace in this slice.
- Installing it into Wild Bunch or Adventures in this slice.
- Treating canonical examples as templates to copy.
- Encoding Portfolio-specific identity or Wild Bunch-specific game rules in the portable core.

## Completion criteria

- Both unprefixed repo-local skills are declared exactly in `repo.local_skills`.
- Stale prefix-based local-skill guidance is repaired.
- The first version is grounded in the recorded research and explicit responsibility
  boundaries rather than synthetic behavioural theatre.
- `directing-visual-stories` routes by storytelling problem and progressively
  discloses references.
- `generating-images` routes by capability and operation without taking over
  unresolved creative direction.
- Their handoff is explicit: direction contract in, generated/edited asset plus
  validation report out.
- Apache 2.0 redistribution obligations and modification notices are present.
- The notice identifies the exact upstream source snapshot used and distinguishes
  retained upstream material from this repository's modifications without implying
  that the derivative is wholly original work.
- Upcoming Usual Specialists work records real field evidence and drives only
  demonstrated revisions; Wild Bunch remains a later portability trial.
- Skill metadata and repository mesh validate.
- A normal hooked commit passes the canonical repository gate.
- Marketplace graduation remains a documented future custody transition, not an implied completed action.
