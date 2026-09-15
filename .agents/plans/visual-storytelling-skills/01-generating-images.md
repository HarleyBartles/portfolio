# Plan 1: Portable Image-Generation Foundation

> **For agentic workers:** REQUIRED SUB-SKILL: Use `subagent-driven-development`
> or `executing-plans` to implement this plan task by task. Validate deterministic
> structure here; reserve behavioural judgement for real Portfolio field use.

**Goal:** Repair stale local-skill naming doctrine and create a repo-owned
`generating-images` skill that preserves the useful operating contract of the
Apache-2.0 OpenAI `imagegen` skill while removing Codex-harness and OpenAI-only
assumptions.

**Architecture:** `generating-images` is a capability-based execution skill. It
accepts either an approved visual direction or a composition-preserving edit,
selects an authorised image capability through routed adapters, translates the
brief into a provider-ready prompt, generates or edits, inspects the result against
explicit invariants, iterates narrowly, and hands off the asset with custody and
validation evidence. It does not invent unresolved crop, viewpoint, focus,
lighting, palette, or attention decisions; those will be owned by Plan 2's
`directing-visual-stories` skill.

**Tech stack:** Markdown Agent Skills, Apache 2.0 attribution, repository skill
manifest, Portfolio mesh and validation commands, and later Portfolio field trials.

**Spec:** `.agents/specs/2026-09-15-directing-visual-stories-design.md`

**Research baseline:** `.agents/specs/2026-09-15-visual-storytelling-web-spike.md`

**Roadmap:** `.agents/plans/visual-storytelling-skills/roadmap.md`

## Global constraints

- The exact local skill name is `generating-images`; no prefix is required.
- Do not edit the installed OpenAI `imagegen` skill or copy its CLI.
- Retain a copy of Apache License 2.0 and declare the work plainly as a substantially
  modified derivative of OpenAI's bundled `imagegen` instructions. Rewriting does
  not convert the derivative into a claim of wholly original authorship.
- The portable core describes capabilities and contracts, not Codex tool names,
  `$CODEX_HOME`, built-in save paths, or one provider's environment variables.
- Provider/harness adapters are optional and routed. Absence of a capability is an
  explicit blocked outcome, never a fabricated generation claim.
- Use `apply_patch` for authored files. Use owning generators for mechanical files.
- Do not generate Portfolio artwork, redesign a route, or mutate Wild Bunch or
  Adventures in this plan.
- Normal commits use the tracked hook. Do not run canonical CI immediately before
  or after a successful hooked commit.

---

## Task 1: Repair stale repo-local skill naming guidance

**Files:**

- Modify: `.agents/runbooks/skill-authoring.md`
- Modify: `.agents/doctrine/mesh-policy.md`
- Modify: `.agents/doctrine/marketplace-custody-policy.md`
- Regenerate: affected `.agents/**/INDEX.md` files

**Consumes:** Current authority in
`.agents/skills/repo-standards/references/repository-shape-standard.md`,
`.agents/doctrine/surface-classification-policy.md`, and `.agents/skills/AGENTS.md`.

**Produces:** One consistent rule: a repo-owned skill may use any valid exact name;
explicit membership in `repo.local_skills` is the custody boundary.

- [ ] Capture stale claims with:

  ```powershell
  rg -n "port-\*|port-<name>|tracked local `port-`|prefix" .agents/runbooks/skill-authoring.md .agents/doctrine/mesh-policy.md .agents/doctrine/marketplace-custody-policy.md
  ```

- [ ] Replace prefix requirements with `.agents/skills/<skill-name>/` and exact
  `repo.local_skills` membership. Preserve marketplace provenance and pruning rules.
- [ ] Run `py -3 tools/run.py mesh --apply` and `git diff --check`.
- [ ] Stage only the doctrine/runbook/generated index changes and commit through the
  normal hook as `docs: align local skill custody with exact names`.

---

## Task 2: Scaffold the licensed portable skill

**Files:**

- Create: `.agents/skills/generating-images/SKILL.md`
- Create: `.agents/skills/generating-images/LICENSE.txt`
- Create: `.agents/skills/generating-images/NOTICE.md`
- Create: `.agents/skills/generating-images/agents/openai.yaml`
- Create: `.agents/skills/generating-images/assets/field-trial-notes.md`
- Create: `.agents/skills/generating-images/assets/authority/CITATIONS.md`
- Modify: `.agents/plugins/marketplace.json`
- Regenerate: `.agents/skills/.provenance.json` and affected indexes

**Consumes:** Approved spec and research baseline; Apache 2.0 upstream licence;
current repo skill metadata and manifest contracts.

**Produces:** A discoverable, licensed local skill skeleton with an honest boundary.

- [ ] Add `generating-images` exactly to `repo.local_skills` before refresh.
- [ ] Write a compact `SKILL.md` router with trigger-only description, scope,
  prerequisite direction contract, capability routing, terminal outputs, and links
  to not-yet-authored references. Mark reference links as planned until Task 4.
- [ ] Copy the upstream `LICENSE.txt`. Add `NOTICE.md` identifying the OpenAI bundled
  `imagegen` skill as the source, the retrieval date, and the exact installed source
  snapshot or package version/hash when available. Retain every applicable upstream
  copyright, patent, trademark, and attribution notice. Record prominent changes:
  capability-based routing, removal of Codex/OpenAI-only assumptions, removal of the
  bundled CLI, separation of creative direction, and portable custody reporting.
- [ ] Add citation metadata without vendoring upstream scripts or generated media.
- [ ] Add UI metadata that describes generation/editing accurately and does not
  claim a particular provider is always available.
- [ ] Add a concise field-note template covering real problem, routed references,
  produced brief, accepted/rejected decisions, generation or implementation result,
  observed friction, and candidate portable lesson. Do not pre-fill synthetic cases.
- [ ] Run:

  ```powershell
  py -3 tools/run.py refresh-skills --apply
  py -3 tools/run.py mesh --apply
  py -3 C:/Users/hbart/.codex/skills/.system/skill-creator/scripts/quick_validate.py .agents/skills/generating-images
  py -3 tools/run.py refresh-skills --check
  git diff --check
  ```

- [ ] Commit the scaffold through the normal hook as
  `feat: scaffold portable image generation skill`.

---

## Task 3: Author the execution contract and routed references

**Files:**

- Modify: `.agents/skills/generating-images/SKILL.md`
- Create: `.agents/skills/generating-images/references/capability-routing.md`
- Create: `.agents/skills/generating-images/references/prompt-contract.md`
- Create: `.agents/skills/generating-images/references/generation-and-editing.md`
- Create: `.agents/skills/generating-images/references/preserving-frame-invariants.md`
- Create: `.agents/skills/generating-images/references/validation-and-iteration.md`
- Create: `.agents/skills/generating-images/references/asset-handoff-and-custody.md`

**Consumes:** Research-backed responsibility boundary and the Task 2 scaffold.

**Produces:** A provider-neutral generation/editing workflow with selective
progressive disclosure.

- [ ] Define capability discovery by behaviour: generate, edit, accept multiple
  references, preserve transparency, support masks, return local/remote media, and
  expose provider constraints. Route to an optional adapter only after selecting the
  required behaviour.
- [ ] Define the prompt contract: intent, operation, subject, composition, camera,
  environment, lighting, palette, material/style characteristics, constraints,
  invariants, avoid list, and output requirements. Do not silently fill material
  creative omissions; route them to `directing-visual-stories` once available.
- [ ] Define reference-image roles explicitly: content source, identity/character,
  composition, style/material, palette, mask, and edit target. Prevent accidental
  role blending.
- [ ] Separate generation, variation, inpainting/outpainting, compositing, cleanup,
  and format conversion. State which operations may alter composition.
- [ ] Define frame invariants and edit locks for crop, scale, viewpoint,
  perspective, subject position, focus, light direction, palette roles, silhouette,
  and negative space.
- [ ] Define inspection at full frame and detail scale, comparison against the brief,
  single-defect iteration, variant comparability, and truthful failure reporting.
- [ ] Define asset handoff: actual output location or provider result, operation and
  capability used, references consumed, prompt/brief trace, inspection result,
  unresolved defects, licence/provenance, and destination custody.
- [ ] Replace planned links in `SKILL.md` with a compact problem-to-reference routing
  table. Keep adapter details out of the entrypoint.
- [ ] Run the focused validator, mesh apply, refresh check, and `git diff --check`;
  commit through the normal hook as `feat: add portable image generation workflow`.

---

## Task 4: Validate structure and close Plan 1

**Files:** Modify `.agents/skills/generating-images/` only for structural or factual
defects; regenerate owned provenance/index surfaces.

**Consumes:** Completed Task 3 skill and repository validation contracts.

**Produces:** A structurally valid first version and a stable contract for Plan 2.

- [ ] Read the complete skill once as an executor and once as the future
  `directing-visual-stories` caller. Correct broken routes, circular ownership,
  provider assumptions, unfulfillable outputs, and ambiguous terminal states.
- [ ] Confirm every upstream-derived file has the required licence, attribution, and
  modification notice, and that no bundled CLI or Codex-only path was copied.
- [ ] Run final focused validation:

  ```powershell
  py -3 C:/Users/hbart/.codex/skills/.system/skill-creator/scripts/quick_validate.py .agents/skills/generating-images
  py -3 tools/run.py refresh-skills --apply
  py -3 tools/run.py refresh-skills --check
  py -3 tools/run.py mesh --apply
  git diff --check
  ```

- [ ] Inspect the intended diff, stage only Plan 1 files, and commit final refinements
  through the normal hook as `docs: validate portable image generation contract`.
- [ ] Update the roadmap status, commit, PR, and notes with evidence. Leave the
  numeric readiness rating out of the durable roadmap.
- [ ] Handoff to just-in-time planning for Plan 2 with: the accepted direction input
  contract, provider-neutral capability model, structural validation results,
  commits, open limits, the field-note template, and explicit reminder that creative
  value will be judged in upcoming Usual Specialists work rather than claimed here.
