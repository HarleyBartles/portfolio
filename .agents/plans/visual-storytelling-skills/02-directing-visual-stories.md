# Plan 2: Creative Visual-Story Direction

> **For agentic workers:** REQUIRED SUB-SKILL: Use `subagent-driven-development`
> or `executing-plans` to implement this plan task by task. Structural checks are
> deterministic; creative value is judged during the real Portfolio field trial in
> Plan 3.

**Goal:** Create the portable `directing-visual-stories` skill that makes authored
visual storytelling decisions explicit before image generation, UI composition, or
interactive-world implementation.

**Architecture:** A compact router classifies story scale (`object`, `frame`,
`complete field`, `sequence`) and viewing contract (`directed`, `guided`,
`exploratory`), then routes to only the references needed for the story problem. The
agent selects one primary compositional family and at most two supporting families,
states the audience change, and produces a frame, page, or interactive-world
direction. `generating-images` consumes the frame direction; existing web, React,
accessibility, asset, and game skills consume page/world directions.

**Spec:** `.agents/specs/2026-09-15-directing-visual-stories-design.md`

**Research baseline:** `.agents/specs/2026-09-15-visual-storytelling-web-spike.md`

**Roadmap:** `.agents/plans/visual-storytelling-skills/roadmap.md`

## Global constraints

- Use the exact local name `directing-visual-stories`; no prefix is required.
- This is a first-party synthesis with citable research, not a copy of a protected
  work or living artist's style. Cite sources in `assets/authority/CITATIONS.md`;
  do not vendor copyrighted images, panels, spreads, film stills, or screenshots.
- Keep `SKILL.md` a compact router under the repository's body-size target. Put
  teaching, examples, canonical references, and evaluation detail in routed files.
- Do not implement Portfolio or Wild Bunch UI, generate artwork, or encode their
  product facts in the portable core.
- The skill owns creative intent and invariants, not responsive CSS, React/Phaser
  mechanics, WCAG test procedure, asset custody, or game-system implementation.
- Do not use synthetic RED/GREEN pressure testing as a proxy for creative value.
  Portfolio field evidence belongs to Plan 3.
- Use `apply_patch` for authored files and owning generators for mesh/provenance.
- Normal commits use the tracked hook; do not run canonical CI immediately before or
  after a successful hooked commit.

---

## Task 1: Register and scaffold the synthesis skill

**Files:**

- Create: `.agents/skills/directing-visual-stories/SKILL.md`
- Create: `.agents/skills/directing-visual-stories/agents/openai.yaml`
- Create: `.agents/skills/directing-visual-stories/assets/authority/CITATIONS.md`
- Create: `.agents/skills/directing-visual-stories/assets/authority/authority.yaml`
- Create: `.agents/skills/directing-visual-stories/assets/authority/source-map.yaml`
- Create: `.agents/skills/directing-visual-stories/assets/field-trial-notes.md`
- Modify: `.agents/plugins/marketplace.json`
- Regenerate: `.agents/skills/.provenance.json` and mesh indexes

**Consumes:** The spike, design spec, current `generating-images` handoff contract,
and repo standards.

**Produces:** A discoverable synthesis-skill skeleton with explicit custody and
future field-learning surface.

- [x] Add `directing-visual-stories` exactly to `repo.local_skills`.
- [x] Write frontmatter and a compact entrypoint describing when the agent should
  direct visual storytelling, not how to generate images or implement a page.
- [x] Add the audience-change thesis, scale/contract classification, required
  decisions, primary/supporting-family rule, and terminal output choices.
- [x] Add a problem-to-reference routing table with planned links until later tasks
  author the files.
- [x] Record each web-spike source in `CITATIONS.md` with title, author/organisation,
  canonical URL, retrieval date `2026-09-15`, and operational lesson. Mark all prose
  as first-party synthesis; no inline citations in operational references.
- [x] Reconcile `authority.yaml` and `source-map.yaml` using `first_party_synthesis`
  entries pointing to the research references and the citation authority surface.
- [x] Add UI metadata that describes creative direction and does not claim generation,
  frontend implementation, or game implementation.
- [x] Add a field-trial note template for real Usual Specialists use: problem,
  audience change, selected routes, direction, accepted/rejected decisions, survival,
  friction, and portable lesson.
- [x] Run quick validation, refresh apply/check, mesh apply, and diff check.

---

## Task 2: Author frame composition and attention references

**Files:**

- Create: `.agents/skills/directing-visual-stories/references/story-scale-and-viewing-contract.md`
- Create: `.agents/skills/directing-visual-stories/references/crop-scale-viewpoint-and-perspective.md`
- Create: `.agents/skills/directing-visual-stories/references/attention-weight-and-eye-path.md`
- Create: `.agents/skills/directing-visual-stories/references/depth-planes-focus-and-spatial-staging.md`
- Create: `.agents/skills/directing-visual-stories/references/lighting-colour-and-selective-visibility.md`
- Create: `.agents/skills/directing-visual-stories/references/internal-frames-occlusion-and-off-frame-space.md`
- Create: `.agents/skills/directing-visual-stories/references/details-inserts-reactions-and-synecdoche.md`
- Create: `.agents/skills/directing-visual-stories/references/canonical-composition-index.md`
- Modify: `.agents/skills/directing-visual-stories/SKILL.md`

**Consumes:** Task 1 router and the photography, cinematography, lighting, and
comics findings in the spike.

**Produces:** Problem-routed frame vocabulary that handles frame-within-frame,
three-plane focus, close crops, negative space, and visual evidence.

- [x] Define object/frame/field/sequence and directed/guided/exploratory contracts;
  require the containing field to be considered for every subordinate frame.
- [x] Cover crop, shot scale, viewpoint, perspective, aspect/boundary, short-side
  pressure, off-frame implication, and negative space as conditional story choices.
- [x] Cover visual weight, leading vectors, gaze, contrast, first/second/final read,
  and how detail density can guide without becoming noise.
- [x] Cover foreground/middle-ground/background, deep focus, shallow focus, rack
  focus, split-field focus, occlusion, and spatial causality.
- [x] Cover lighting source/motivation, direction, quality, falloff, shadow,
  selective visibility, palette roles, and state cues. Reject “cinematic lighting”
  as an actionable brief.
- [x] Cover frame-within-frame, repoussoir, barriers, reflections, apertures,
  observation, confinement, detail, insert, reaction, motif, and visual synecdoche.
- [x] Build the canonical index with story function, canonical practice/work, what to
  inspect, what not to imitate, routed references, and source links.
- [x] Extend the router with precise problem routes and no duplicated teaching.

---

## Task 3: Author complete-field, sequence, and interactive references

**Files:**

- Create: `.agents/skills/directing-visual-stories/references/page-fields-spreads-insets-and-polyptychs.md`
- Create: `.agents/skills/directing-visual-stories/references/staging-blocking-and-audience-relationship.md`
- Create: `.agents/skills/directing-visual-stories/references/rhythm-stillness-motion-and-transition.md`
- Create: `.agents/skills/directing-visual-stories/references/spatial-cinematography-and-environmental-storytelling.md`
- Create: `.agents/skills/directing-visual-stories/references/constraints-tiles-palettes-and-colour-cycling.md`
- Modify: `.agents/skills/directing-visual-stories/SKILL.md`

**Consumes:** Task 2 frame vocabulary and the editorial, theatre, anime, modern
game, tile, and Amiga findings in the spike.

**Produces:** Full-page and world composition guidance that translates creative
industry grammar without surface imitation.

- [x] Cover page/spread unity, background matte with inset panels, splash/super-panel,
  polyptych, continuous narrative, montage, editorial voices, grid infrastructure,
  density rhythm, interruption, text as spatial actor, and reveal/page-turn analogues.
- [x] Cover tableau, blocking, levels, proximity, grouping, gaze, entrances/exits,
  cues, poetic space, and proscenium/thrust/in-the-round/promenade relationships.
- [x] Cover anime layout as an integrated shot blueprint, key poses, readable
  silhouettes, selective motion, held frames, environmental intervals, compositing,
  and event-specific deformation.
- [x] Cover spatial cinematography, observation points, landmarks, attention relays,
  thresholds, vistas, compression/release, loops/returns, environmental evidence,
  agency, and world/interface relationship.
- [x] Cover tile repetition and exception, sprite/silhouette discipline, limited
  palette roles, palette swapping, parallax, bitplane-like semantic layers, colour
  cycling, and regional display rules. Keep implementation mechanics downstream.
- [x] Extend the router with page, sequence, stage, exploratory-world, tile, palette,
  and constraint-led routes.

---

## Task 4: Author application contracts and complete the entrypoint

**Files:**

- Create: `.agents/skills/directing-visual-stories/references/translating-to-image-generation.md`
- Create: `.agents/skills/directing-visual-stories/references/translating-to-composed-interfaces.md`
- Create: `.agents/skills/directing-visual-stories/references/translating-to-interactive-worlds.md`
- Create: `.agents/skills/directing-visual-stories/references/evaluating-visual-stories.md`
- Modify: `.agents/skills/directing-visual-stories/SKILL.md`

**Consumes:** Tasks 2-3 vocabulary and the actual `generating-images` contract at
`.agents/skills/generating-images/references/prompt-contract.md`.

**Produces:** Concrete frame, page, and world directions with safe downstream
handoffs.

- [x] Define the frame-direction output: audience change, beat, subject hierarchy,
  crop, viewpoint, perspective, depth, focus, attention path, light, palette,
  motion/stillness, off-frame implication, rationale, and avoid list.
- [x] Define the image handoff: `directing-visual-stories` settles creative choices;
  `generating-images` translates, executes, inspects, and reports custody. Preserve
  the exact input fields and invariant ledger boundary.
- [x] Define the page-direction output: page story, field form, entry/dominant field,
  subordinate frames/voices, text-as-space, rhythm, transitions, closing field, and
  responsive/accessibility survival requirements.
- [x] Define the interactive-world output: participant story, agency contract,
  object/viewport/scene/world scales, observation points, landmarks, routes,
  thresholds, environmental evidence, changed state, light/palette, motion, and
  interface relationship.
- [x] Define finite evaluation checks for story, hierarchy, orientation, frame,
  field, lighting/colour, sequence, interaction, truth, custody, and medium-translation
  integrity. Require thumbnail/reduced-detail review where relevant.
- [x] Complete the entrypoint's final routing table and keep all references selective.

---

## Task 5: Validate structure and close Plan 2

**Files:** Modify only demonstrated structural or factual defects under
`.agents/skills/directing-visual-stories/`; regenerate owned indexes/provenance.

**Consumes:** Completed Tasks 1-4 and current repo standards.

**Produces:** A structurally valid, source-cited creative-direction skill ready for
real Portfolio field use.

- [x] Read the complete skill as a future image-brief author, page director, and
  interactive-world director. Correct circular ownership, unbounded reference
  loading, medium imitation, implementation leakage, and ambiguous terminal states.
- [x] Verify citation URLs, retrieval date, authority/source-map reconciliation,
  absence of vendored protected media, and exact local manifest membership.
- [x] Run:

  ```powershell
  py -3 C:/Users/hbart/.codex/skills/.system/skill-creator/scripts/quick_validate.py .agents/skills/directing-visual-stories
  py -3 tools/run.py refresh-skills --apply
  py -3 tools/run.py refresh-skills --check
  py -3 tools/run.py mesh --apply
  py -3 .agents/skills/repo-standards/scripts/repo_standards.py --check
  git diff --check
  ```

- [ ] Commit through the normal hook as `feat: add visual story direction skill`.
- [ ] Update the roadmap with the commit and evidence, then push the branch and
  update draft PR #62. Do not claim creative value until Plan 3 field use.
- [ ] Pass Plan 2 completion-readiness at 9/10 or higher, then write Plan 3 JIT from
  the actual skill and the next Usual Specialists work item.
