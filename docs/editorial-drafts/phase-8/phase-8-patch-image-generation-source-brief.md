# Phase 8 Patch image-generation source brief

**Status:** Accepted Phase 8 implementation-handoff input. This file exists so the Patch homepage commission is generated from Adventures of Patch source truth and accepted prior art, not from a prose-only description of a generic comic/heist aesthetic.

**Pinned upstream source:** `HarleyBartles/adventures-of-patch@13bf77adc63cf5c8f49363cedd5dd392822b8375`

Local Sol must inspect the pinned upstream files and image pixels below before attempting the Patch homepage plate. If the upstream pin is intentionally changed, re-resolve the indexed source paths and acceptance state before generation rather than assuming this list is still current.

## Source-authority order

Use the smallest relevant set for the image being commissioned, in this order:

1. accepted source images and their adjacent sidecars;
2. accepted object/continuity bibles;
3. canonical Patch style bible and reference sheet when Patch appears;
4. accepted Heist Crew character references/bibles when a crew member appears;
5. adventure-specific frame/world guidance;
6. this Phase 8 homepage composition brief.

The Phase 8 brief decides the new composition. It does not replace source-world identity or invent a new visual language for Patch.

## Canonical Patch source

Read and inspect these when Patch is visible in the commissioned image:

- `style/patch/style-bible.md` — canonical identity, palette, prompt-positive/negative blocks, continuity rules and QA hard gates.
- `style/patch/reference_sheets/approved_style__v1.png` and `approved_style__v1-sidecar.json` — primary approved character reference for proportions, views, accessories and colour.
- `style/patch/reference_sheets/scene_behaviour__v1.png` and its sidecar — useful prior art for Patch behaving inside scenes rather than standing as a character-sheet specimen.
- `style/patch/reference_sheets/general_drift_risks__v1.png` plus the `style_drift_risks__v1_0.png` / `style_drift_risks__v1_1.png` sheets and sidecars — negative-control material for QA and repair, not positive style targets.

Do not replace these visual references with a prose summary. The upstream sidecars themselves instruct workers to inspect image pixels where exact proportions, outline, colour or fine details matter.

## Lawful Heist source for the representative Phase 8 plate

The first wireframe uses Lawful Heist and the completed recruitment folder as the hero object. Before generating it, read:

- `workbench/issue_48_override_heist_style_framework_v0_3/00_framework_index.md` — composition map and ownership of the Heist visual bibles.
- `workbench/issue_48_override_heist_style_framework_v0_3/style-bibles/01_override_heist_world.md` — clean editorial-vector/comic-book heist world, palette, lawful-override semantics and anti-drift constraints.
- `workbench/issue_48_override_heist_style_framework_v0_3/style-bibles/02_patch_comic_adaptation.md` — required only if Patch appears; the heist treatment may amplify staging but must not redesign him.
- `workbench/issue_48_override_heist_style_framework_v0_3/style-bibles/04_composable_panel_framing.md` — relevant when the homepage plate uses the small comic-book insets described by the Phase 8 art direction.
- `workbench/issue_48_override_heist_style_framework_v0_3/style-bibles/09_pitch_folder_and_assent_marker_system.md` — **primary object authority for this commission**. It locks the folder, progression, six assent-marker material languages, prompt blocks and hard negatives.

The homepage commission must preserve the distinction in that source: the recruitment pitch folder is an accumulated assent/memory object, not the later keycard, proof object, access credential, audit ledger or evidence wall.

### Existing folder imagery

Inspect the accepted seven-image continuity sequence under:

`workbench/issue_48_override_heist_style_framework_v0_3/style-sheets/heist_pitch_folder/`

In order:

1. `01_clean_folder_and_recruitment_list.png`
2. `02_index_joined.png`
3. `03_silk_joined.png`
4. `04_rollback_joined.png`
5. `05_writ_joined.png`
6. `06_klause_joined.png`
7. `07_receipt_joined.png`

Each has an adjacent `-sidecar.json`. The final `07_receipt_joined.png` is the most important positive image reference for the completed-folder hero state; the earlier sequence is useful for understanding how every marker is layered and where continuity can drift.

For the homepage plate, use these actual source PNGs as image-reference inputs to the image-generation tool where the tool supports reference images. Do not merely describe them from memory in the text prompt.

## Heist Crew source for peripheral insets

If a proposed inset shows Index, Silk, Rollback, Writ, Klause or Receipt, use the accepted promoted character package rather than inventing a specialist from the role name.

Start at:

- `build/characters/heist-crew/README.md`
- `build/characters/heist-crew/reference_sheets/`
- `build/characters/heist-crew/manifests/`
- `workbench/issue_48_override_heist_style_framework_v0_3/frame-bibles/`

For each character, the accepted package defines the reference hierarchy: hero image for the primary single-pose read, style sheet for turnaround/kit continuity, and anti-pattern sheet only as a rejected negative-control reference. Adjacent sidecars record observed facts and provenance.

Accepted positive PNG families live at `build/characters/heist-crew/reference_sheets/`:

- `index_hero__v1.png`, `index_style_sheet__v1.png`
- `silk_hero__v1.png`, `silk_style_sheet__v1.png`
- `rollback_hero__v1.png`, `rollback_style_sheet__v1.png`
- `writ_hero__v1.png`, `writ_style_sheet__v1.png`
- `klause_hero__v1.png`, `klause_style_sheet__v1.png`
- `receipt_hero__v1.png`, `receipt_style_sheet__v1.png`

Use the corresponding `*_anti_patterns__v1.png` as negative QA evidence, not as a positive generation reference.

The shared character-class bible and current character bibles are under `build/characters/heist-crew/manifests/`. Index deliberately has no separate checked-in character bible: use Index's accepted hero/style/anti-pattern references and sidecars together with `heist_crew_character_class_bible.md`. Do not reconstruct a missing Index bible from historical workbench material.

When an inset depends on a character's panel language, read that character's matching file under `workbench/issue_48_override_heist_style_framework_v0_3/frame-bibles/` rather than making every inset use the same generic comic frame.

## Image-generation operating rule

For the Lawful Heist first pass:

1. inspect the final folder PNG and the continuity sequence;
2. read the folder bible and Override Heist world bible;
3. choose only the crew members actually used by the three-or-four peripheral insets;
4. inspect those crew members' accepted hero/style references and matching character/frame bibles;
5. if Patch is visible, add the canonical Patch approved style reference and Patch comic-adaptation rules;
6. give the image generator those representative source images directly where supported, then add the Phase 8 composition direction in prose;
7. QA the result back against the same accepted references and hard gates before treating it as a usable wireframe asset.

The aim is a new derivative composition that unmistakably belongs to the existing Adventures of Patch / Override Heist visual world. It is not a collage of source images and not a literal recreation of an existing slide. Equally, it must not be a freehand `comic heist`, `AI agent` or generic mascot image whose only connection to the source is prompt wording.

Negative-control sheets belong in comparison/repair. Do not feed rejected anti-pattern art as though it were an approved positive style reference.

## Phase 8 composition that this source work must serve

The settled homepage job remains unchanged:

- the **completed heist folder is the dominant hero object**;
- roughly three or four small comic-book insets may supply narrative charge at the periphery;
- the folder remains visually dominant over the insets;
- use consequential details rather than several complete competing scenes;
- avoid corkboard-conspiracy collage, generic film-poster composition, dense explanatory labels and lesson-checklist imagery;
- the result should feel like an authored story object from Patch's existing world, then resolve onto the portfolio's governing grid.

Source fidelity is a constraint on the commission, not a reason to weaken that homepage composition.

## Custody and permission

The source assets remain Adventures of Patch material and retain their own provenance/licensing. Using them as references does not relicense them or turn them into portfolio-owned source art.

Harley's Phase 8 editorial direction separately authorises the portfolio to commission and publish the homepage-specific derivative Patch imagery required by this accepted design. Treat that as a project-specific permission for this portfolio work, not as a general adaptation licence for other repositories, stories or outputs.
