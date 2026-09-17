# The Usual Specialists Provenance Re-custody Implementation Plan

> **For the implementing agent:** execute this plan inline on the existing `codex/port-17-silk-continuation` branch after this plan passes the repository handoff gate. The user has already authorized moving directly from a passing plan gate into implementation on the same branch/worktree/PR; do not stop for another approval checkpoint.

**Goal:** Replace temporary PORT-16 Linear provenance custody and recoverable chat-only generation context with a normalized, repository-backed provenance package for every currently accepted *The Usual Specialists* generated-image family, while preserving accepted image bytes, current page behavior, source-custody boundaries, and future promotion intent.

**Architecture:** Keep four authorities deliberately separate. `accepted-assets.json` remains the answer to “which source bytes are accepted in this package?”, package `generation-receipt.json` files become the canonical machine-readable answer to “which generation facts are actually known?”, normalized `provenance/*.md` records become the canonical human answer to “what was commissioned, what changed, what governed the accepted result, and why was it accepted?”, and `usual-specialists-derivatives.json` remains the deterministic page-use derivative receipt. A new focused validator is wired into the existing `media:usual-specialists:check` command so the graph cannot silently become incomplete. Linear becomes migration history only, recorded in `linear-source-register.json`.

**Tech stack:** Node.js ESM, TypeScript/Vitest, Sharp 0.34.5, JSON/Markdown custody records, repository mesh tooling, existing Portfolio Python quality gate.

**Design authority:** `.agents/specs/2026-09-14-usual-specialists-provenance-recustody-design.md`

**Execution strategy:** inline, sequential, TDD for validation behavior. Do not dispatch subagents. Use focused checks while iterating and one normal implementation commit at the end so the tracked pre-commit hook owns the single complete staged-tree `py -3 tools/run.py ci --check` gate. The plan itself is checkpointed separately before implementation.

## Handoff readiness

- **Target:** 9/10.
- **Current rating:** 9.5/10.
- The accepted-image corpus, relevant PORT-16 Linear document corpus, current manifests/receipts, derivative processor, repository quality constraints, and Commission 06 recovery record have all been inventoried before implementation.
- Remaining uncertainty is intentionally represented as provenance data, not planning ambiguity: some historical generation IDs/seeds/prompts are genuinely unavailable and must be recorded as `missing-from-retained-history` rather than researched indefinitely or reconstructed.
- No user decision is required to begin implementation once this plan is committed and its normal hook passes.

## Global constraints

- Work only in `Z:\_agent-worktrees\portfolio\codex\port-17-silk-continuation` on `codex/port-17-silk-continuation`; keep draft PR #61.
- Do not create a new branch, worktree, or PR.
- Do not call image generation.
- Do not generate replacement Silk art, edit accepted Commission 06 pixels, or change the current hands-free abseil page selection.
- Do not start Silk layout/product tuning, reopen the accepted first-aperture geometry, redesign Index/Silk composition, or change route/publication behavior.
- Do not promote source assets or provenance into `adventures-of-patch` in this work. Portfolio is temporary canonical provenance custody; Adventures promotion remains explicit future work.
- Do not delete/archive Linear documents. This change proves later deletion readiness only.
- Do not copy accepted scratch-only traversal PNGs into Portfolio merely to make manifests symmetrical.
- Do not invent generation IDs, parent IDs, seeds, dates, literal prompts, filenames, acceptance claims, or source paths.
- `model: "OpenAI Image 2.5"` is campaign-wide project-owner authority dated `2026-09-14`; where historical tool/model evidence is absent, use `modelEvidence: "project-owner-confirmation-2026-09-14"` rather than implying an old tool result exposed the model.
- A recovered conversational brief is an approved human brief, not a literal backend prompt, unless a literal tool prompt is actually retained.
- Preserve every committed source PNG and public derivative byte-for-byte. This is a provenance migration, not an asset-processing change.
- Keep `docs/asset-custody.md` high-level, but retain a compact literal inventory of every public asset path because `tools/portfolio_quality.py` requires every public/production image path to appear in that file.
- Generated `INDEX.md` files are mesh output. Do not hand-edit them; run `py -3 tools/run.py mesh --apply` after authored runbook/provenance/plan surfaces change.

## Evidence inventory locked before execution

### Accepted-provenance Linear records

The deletion-readiness register must include all twelve accepted-provenance documents below:

1. `4e5cc96c-aed2-42ea-833d-e2b7cba296ca` — Commission 01 — Accepted generation provenance (desktop)
2. `5ab525cc-6199-46ef-8735-873e6b5b5b13` — Commission 02 — Accepted generation provenance (Index document-world desktop base)
3. `a3fdc811-8316-4e97-8f4a-7c3e43bc1e63` — Index paper package — Accepted generation provenance (blue INDEX carrier)
4. `a858be3b-5d50-4365-862a-446b6b1ffa90` — Index paper package — Accepted generation provenance (graph-paper calculation spill)
5. `4fcfe31f-ccc0-452b-88f2-dcd67bb8230e` — Index paper package — Accepted generation provenance (yellow assent sticky note)
6. `a6163be5-3bdd-425a-b144-b00e3a88423d` — Index traversal models — Accepted generation provenance (5 transparent character poses)
7. `88ce5252-5efc-4b48-adf3-cba854beb3b6` — Patch traversal models — Accepted generation provenance (5 transparent character poses)
8. `bc91c036-2d34-456f-adfb-1bf81c716070` — Commission 04 — Accepted generation provenance (Index macguffin extraction)
9. `37667c1c-8475-4479-9c2d-98265da2e945` — Index→Silk anchor lock — Accepted generation provenance
10. `b4956d48-8d2a-4dbc-9811-0adf212eac2f` — Commission 05 — Accepted generation provenance (Silk corridor world plate)
11. `710a99b4-7218-4eab-930a-fea7d4a9ae78` — Commission 05 — Accepted generation provenance (Silk heavy aperture frames)
12. `d9bc63f9-1020-4a03-9ab8-ab990ab5a9e2` — Transparent Prop Package — Accepted generation provenance (Specialists rope segment kit)

### Original-intent / mixed Linear records

The register must also include these twelve source-intent or mixed-guidance documents because their durable intent must survive Linear deletion:

1. `18a97b18-d945-4ad5-b826-1099294d91a5` — The Usual Specialists — page redesign brief
2. `a2c647c1-a0e4-4b57-812d-291217187053` — Commission 01 — Safehouse threshold establishing composition
3. `fdbd5170-bc9c-4142-84bd-1ec1d608a70e` — Commission 02 — Index opening: archive discovery
4. `def04ca9-f641-4494-bfbe-e32935895f75` — Transparent Prop Package — Index foreground paper occluders
5. `2a767060-d3fb-44c6-b12d-aa6f795123f7` — Commission 03 — Index inset: obstructed observation
6. `9a262b0f-1f7c-442c-b189-caa6955f3f39` — Commission 04 — Index inset: macguffin extraction
7. `72833c08-cbbe-4674-889a-9024c307c415` — Patch traversal models — Generation briefs (5 transparent character poses)
8. `c892a0f0-8878-4243-958a-f6a0e451f6b7` — Transparent Prop Package — Specialists rope segment kit
9. `2d045fac-9b5a-4201-a111-8e880045319a` — Transparent Prop Package — Mineral-page rope anchors
10. `c090a33b-e2e0-4f45-98ae-59d1781c6d93` — Transparent Prop Package — Silk mineral-wall aperture rims
11. `a08fc2c6-0603-4ba8-a05b-2aeae8a82444` — Commission 05 — Silk opening: route launch
12. `f4fb6aeb-c989-4934-a038-7cd80d8d073f` — Commission 06 — Silk overlay: transparent rappel traversal

Do not add Commission 07+ documents merely because they match “Silk” or “Commission” search terms. They are outside the current accepted Index/Silk asset corpus.

### Accepted-but-not-promoted traversal assets

Do not add these PNGs to Portfolio source manifests. Preserve them in the relevant normalized provenance record and Index generation receipt with `sourceCustodyState: "accepted-not-promoted"`:

- Index model 4 / reach-and-balance, SHA-256 `928db2928caa2700bb48691aacc8dea3fa0da62132c41be4b2e4c45cf4a8e09`.
- Patch model 3 / high-step, SHA-256 `fdbb36cd0056f213febb8efb8492eaf10fb6a670f2bbb0335d6addbcc5048d88`.
- Patch model 4 / caught-up pause, SHA-256 `fb1a861bc28494a34210d7f8249197c99dad8dce6b9428a6a031c159929f26a6`.

Their acceptance is historical provenance; source promotion is a different decision.

---

## Task 1: Add a focused, testable provenance-graph validator

**Files:**
- Create: `src/client/scripts/validate-usual-specialists-provenance.mjs`
- Create: `src/client/scripts/validate-usual-specialists-provenance.test.ts`
- Preserve for later wiring: `src/client/scripts/process-usual-specialists-assets.mjs`

**Interfaces:**
- Export `USUAL_SPECIALISTS_PROVENANCE_HEADINGS` containing the exact normalized fifteen-section heading order from the approved design.
- Export a pure `assertUsualSpecialistsProvenanceGraph(input)` helper for synthetic unit tests.
- Export an async filesystem loader `validateUsualSpecialistsProvenance()` that reads the three accepted manifests, package generation receipts, provenance Markdown files, and `linear-source-register.json` from the live repository tree.
- Do **not** call the filesystem validator from the asset processor until Task 5, after the corpus exists. This keeps intermediate focused checks green rather than deliberately breaking `media:usual-specialists:check` for several tasks.

- [ ] **Step 1: Write failing tests for the graph contract before implementing the validator.** Cover at least:
  - accepted manifest entry missing `provenanceRecord`;
  - `provenanceRecord` points at a missing record;
  - linked Markdown record does not contain the asset ID;
  - generated accepted master lacks generation-receipt coverage;
  - generation receipt uses bare missing values without an explicit status field;
  - deterministic child lacks a valid `derivedFrom` accepted source;
  - provenance Markdown is missing or reorders a required normalized heading;
  - migrated Linear source-register entry points at no existing destination record;
  - migrated record still claims Linear is current/canonical custody;
  - valid synthetic graph passes.
- [ ] **Step 2: Run the new test file and verify RED.**

```powershell
npm --prefix src/client test -- --run scripts/validate-usual-specialists-provenance.test.ts
```

Expected: FAIL because the validator module/contracts do not exist yet.

- [ ] **Step 3: Implement the smallest validator API that makes the synthetic contract pass.** Keep validation structural and evidence-oriented; do not embed asset-specific prose or copy the whole provenance database into code.
- [ ] **Step 4: Run the focused validator tests and expect GREEN.**
- [ ] **Step 5: Mark Task 1 complete in this plan.**

---

## Task 2: Create the normalized provenance schema and Index/opening records

**Files:**
- Create directory: `src/client/assets/patch/the-usual-specialists/provenance/`
- Create: `src/client/assets/patch/the-usual-specialists/provenance/README.md`
- Create: `src/client/assets/patch/the-usual-specialists/provenance/commission-01-safehouse-threshold.md`
- Create: `src/client/assets/patch/the-usual-specialists/provenance/commission-02-index-document-world.md`
- Create: `src/client/assets/patch/the-usual-specialists/provenance/index-blue-carrier.md`
- Create: `src/client/assets/patch/the-usual-specialists/provenance/index-graph-paper-calculation-spill.md`
- Create: `src/client/assets/patch/the-usual-specialists/provenance/index-assent-note.md`
- Create: `src/client/assets/patch/the-usual-specialists/provenance/commission-03-index-observation.md`
- Create: `src/client/assets/patch/the-usual-specialists/provenance/commission-04-index-macguffin.md`
- Create: `src/client/assets/patch/the-usual-specialists/provenance/index-traversal-models.md`
- Create: `src/client/assets/patch/the-usual-specialists/provenance/patch-traversal-models.md`
- Create: `src/client/assets/patch/the-usual-specialists/provenance/opening-rope-start-anchor.md`

**Schema rules for every Markdown record:**

Use these exact H2 headings, in this exact order:

```text
## Record identity
## Status
## Original commission intent
## Material changes from original intent
## Accepted execution brief
## Reference hierarchy
## Accepted asset identity
## Generation provenance
## Iteration history
## Acceptance decision
## Known accepted limitations
## Composition / ownership contract
## Deterministic descendants
## Missing historical evidence
## Custody history
```

`README.md` defines schema version `1`, the four-authority separation, accepted execution brief evidence statuses, missing-history rules, source-custody states, and temporary Portfolio → eventual Adventures custody direction. It is schema guidance, not another per-asset provenance database.

**Record-specific evidence requirements:**

- Commission 01: preserve original safehouse-threshold purpose, the accepted rear-only/no-face/no-bag/no-rope changes, accepted generation ID `ebf2767e-3c18-4d72-939b-f47725f8773f`, and only the materially useful rejected iterations.
- Commission 02 base: explicitly record the material shift from archive-room scene to direct overhead document-world terrain; accepted generation ID `fe9f06e1-e962-479a-9634-ef89d709ce5e`.
- Blue carrier: preserve the physical-alpha paper/HTML-typography split and generation ID `8a3cc100-2a4a-4532-88aa-a806c0d9835c`.
- Graph paper: explicitly record that generation ID is `missing-from-retained-history`; do not infer one from filename/time.
- Assent note: preserve blank generated note vs semantic HTML wording, generation ID `1fc00bf8-6ac4-4f94-b6db-4866e3b58d74`, and its consciously accepted curl/shadow/fingerprint tolerances.
- Commission 03 observation: use the current Linear commission brief as durable original/execution intent where no stronger unambiguous accepted-generation record exists. If the matching generation ID cannot be directly recovered, mark it missing; do not infer from chronology.
- Commission 04: preserve why attempt 1 won despite the explicitly accepted hand/style/archive-label limitations; generation ID `8244e69b-1575-4eed-ac3b-1db78859a95f`.
- Index traversal record: cover all five accepted full-body poses, including the reach/balance scratch-only asset. Preserve the full-body/downstream-occlusion ownership rule. Use Chat on Steroids session `2026-09-09-b6bc99a4` as accepted-human-brief evidence for the pilot/four-pose set; all five generation IDs remain missing unless a direct retained tool result is found. Use project-owner model evidence, not the older record’s historical “model unavailable” statement.
- Patch traversal record: cover all five accepted poses, including scratch-only high-step and pause. Retain all five known generation IDs and the approved sibling generation brief. `parent_gen_id` was returned null and seeds were not supplied; record that distinction honestly.
- Opening rope-start anchor: preserve the exact source identity, generation ID `75919162-bd16-4985-8672-afdea3a2ffb3`, accepted top-anchor physical role, and deterministic bottom crop only. Record that the earlier mineral-anchor package was broader source intent but the accepted production object is this one top-origin treatment.

- [ ] **Step 1: Write `README.md` and the ten normalized Index/opening record files using only the locked evidence above, current manifests, direct repository byte identity, Linear source material, and unambiguous Chat history.**
- [ ] **Step 2: For every record, explicitly write `None known` when a normalized section has no applicable limitation/history rather than omitting the section.**
- [ ] **Step 3: Verify the accepted-but-not-promoted Index/Patch traversal assets are described with no fake repository source path and are not added to `accepted-assets.json`.**
- [ ] **Step 4: Run a temporary local heading check through the validator unit helper or a focused Node invocation against the new records; do not wire the full graph check yet.**
- [ ] **Step 5: Mark Task 2 complete in this plan.**

---

## Task 3: Create the Silk/rope normalized provenance records

**Files:**
- Create: `src/client/assets/patch/the-usual-specialists/provenance/specialists-rope-segment-kit.md`
- Create: `src/client/assets/patch/the-usual-specialists/provenance/index-silk-anchor-lock.md`
- Create: `src/client/assets/patch/the-usual-specialists/provenance/commission-05-silk-corridor.md`
- Create: `src/client/assets/patch/the-usual-specialists/provenance/commission-05-silk-aperture-frames.md`
- Create: `src/client/assets/patch/the-usual-specialists/provenance/commission-06-silk-threshold-crossing.md`
- Create: `src/client/assets/patch/the-usual-specialists/provenance/commission-06-silk-abseil-hands-free.md`

**Record-specific evidence requirements:**

- Rope kit: cover all seven accepted selectable source masters in one normalized package record; preserve the “material library, not seven semantic story roles” contract and known generation IDs.
- Index→Silk anchor lock: cover the accepted generated anchor-ring and foreground-knot masters plus deterministic knot crop and ring-occluder descendants in one composition record. Preserve the paint order and ownership boundary, but do not duplicate public WebP hashes from the derivative receipt in every sub-entry when the record can link to that canonical receipt.
- Commission 05 corridor: generation ID `7a1366d8-1b12-4d38-8764-4fa074ac5408`; preserve environment/world-plate vs React aperture separation and accepted world-only parallax contract.
- Commission 05 aperture frames: cover landscape and portrait accepted heavy rims together. Landscape generation ID remains missing unless direct evidence is found. For portrait, prefer the current repository’s retained generation ID `82ca6eaa-45dd-48c8-a559-65899b9c26a8` only if implementation can trace it to current durable evidence; otherwise record the older Linear uncertainty rather than laundering the value. Preserve the complete four-sided portrait enclosure acceptance contract.
- Commission 06 threshold crossing: use the user-supplied recovered normalized record as primary evidence. Status is accepted historical, `selection: superseded`, accepted 13 September 2026, superseded 14 September 2026, literal prompt retained, generation ID `18d4a48f-cf8a-4dbe-b12c-d85657dca42b`.
- Commission 06 hands-free abseil: use the user-supplied recovered normalized record as primary evidence. Status is accepted current, accepted 14 September 2026, brief status `normalized-from-approved-conversation`, no literal prompt retained, generation ID `10d1bdb0-bdc5-4265-9250-38bb8f042b13`, and acceptance remains explicitly revisitable after the rest of Silk is established.

- [ ] **Step 1: Write all six Silk/rope normalized records using the same fifteen-section shape as Task 2.**
- [ ] **Step 2: Keep generated-master lineage separate from deterministic descendants; do not turn the crop/ring mask into fake generation events.**
- [ ] **Step 3: Check that both Commission 06 records preserve the exact current/superseded distinction and do not imply that supersession equals rejection.**
- [ ] **Step 4: Run the focused heading/schema checks over all sixteen provenance records.**
- [ ] **Step 5: Mark Task 3 complete in this plan.**

---

## Task 4: Normalize accepted manifests and generation receipts

**Files:**
- Modify: `src/client/assets/patch/the-usual-specialists/index/accepted-assets.json`
- Create: `src/client/assets/patch/the-usual-specialists/index/generation-receipt.json`
- Modify: `src/client/assets/patch/the-usual-specialists/rope/accepted-assets.json`
- Modify: `src/client/assets/patch/the-usual-specialists/rope/generation-receipt.json`
- Modify: `src/client/assets/patch/the-usual-specialists/silk/accepted-assets.json`
- Modify: `src/client/assets/patch/the-usual-specialists/silk/generation-receipt.json`

### Accepted manifest shape

Normalize each accepted source entry around these durable fields while preserving existing source identities:

```json
{
  "id": "stable-id",
  "originalWireframeFilename": "retained existing source-name field where applicable",
  "repositorySourcePath": "src/client/assets/...png",
  "sha256": "...",
  "width": 0,
  "height": 0,
  "status": "accepted",
  "selection": "current | library | superseded | deterministic-derivative",
  "rightsOwner": "Harley Bartles",
  "provenanceRecord": "src/client/assets/patch/the-usual-specialists/provenance/<record>.md",
  "legacyLinearDocumentIds": ["..."]
}
```

Use `derivedFrom` and `derivation` only on deterministic source descendants. Keep existing `originalWireframeFilename` for compatibility rather than creating a gratuitous manifest rename; the human provenance record carries the exact original generated filename where the stable preview filename differs.

Selection rules:

- ordinary active scene/master: `current`;
- reusable rope/traversal source library entries: `library`;
- Commission 06 threshold crossing: `superseded`;
- Commission 06 hands-free abseil: `current`;
- deterministic knot crop/ring occluder: `deterministic-derivative`.

Remove `generationId` from accepted manifests once the generation receipt contains it. Generation metadata must not survive only as scattered manifest fields.

### Generation receipt shape

All three package receipts use:

```json
{
  "schemaVersion": 1,
  "rightsOwner": "Harley Bartles",
  "assets": {
    "stable-id": {
      "model": "OpenAI Image 2.5",
      "modelEvidence": "project-owner-confirmation-2026-09-14 | retained-linear-provenance | retained-tool-result",
      "generationId": null,
      "generationIdStatus": "retained | missing-from-retained-history",
      "parentGenerationId": null,
      "parentGenerationIdStatus": "retained | tool-returned-null | missing-from-retained-history",
      "seed": null,
      "seedStatus": "retained | not-supplied-by-tool | missing-from-retained-history",
      "generationDate": null,
      "generationDateStatus": "retained | missing-from-retained-history",
      "briefStatus": "verbatim-recovered | normalized-from-approved-conversation | recovered-from-linear-record | missing-from-retained-history"
    }
  }
}
```

Add `literalPrompt` only when a literal prompt is genuinely retained. Add concise evidence references such as Linear document IDs or Chat on Steroids session IDs where they materially establish a recovered brief. Do not add empty prompt strings as if they were evidence.

### Index receipt coverage

The new Index receipt must cover all accepted generated Index/opening masters plus the full accepted traversal libraries, including provenance-only scratch assets:

`safehouse-threshold`, `opening-rope-start-anchor`, `index-desktop-base`, `index-assent-note`, `index-blue-carrier`, `index-graph-paper`, `index-observation`, `index-macguffin`, `index-walk`, `index-inspect`, `index-high-step`, `index-reach-balance`, `index-return`, `patch-follow`, `patch-leaning`, `patch-high-step`, `patch-pause`, `patch-return`.

Known Patch traversal generation IDs are retained for all five accepted poses:

- `patch-follow`: `e4d1de96-8f7b-459f-8d8e-a925384603c2`
- `patch-leaning`: `4d9d73cf-df43-4807-875e-8ffb4669df0d`
- `patch-high-step`: `49950748-ac1d-4be9-9a21-fbe8671b81e2`
- `patch-pause`: `595d5307-b940-448e-86ca-812f8c293717`
- `patch-return`: `8aa8231b-3094-4a21-9c3f-06833f3abcf9`

### Rope receipt coverage

Convert the current coarse `generationIds` map into per-asset `assets` entries for all seven rope masters, retaining the seven known generation IDs and the shared 13 September 2026 generation date where durable evidence supports it.

### Silk receipt coverage

Expand the Silk receipt beyond Commission 06 to every generated accepted Silk master:

- `silk-commission-05-aperture-rim-heavy`
- `silk-commission-05-aperture-rim-heavy-portrait`
- `silk-commission-05-corridor`
- `silk-index-crossing-anchor-ring`
- `silk-index-crossing-knot-foreground`
- `silk-commission-06-threshold-crossing`
- `silk-commission-06-abseil-hands-free`

Do not add generation receipt entries for `silk-index-crossing-knot-foreground-crop` or `silk-index-crossing-ring-occluder`; they are deterministic descendants, not generation events.

- [ ] **Step 1: Normalize all three accepted manifests without changing any source hash/dimension/path.**
- [ ] **Step 2: Create/normalize all three generation receipts with explicit missing-history statuses and the evidence rules above.**
- [ ] **Step 3: Confirm the three scratch-only traversal IDs occur in the Index generation receipt/provenance record but not in `index/accepted-assets.json`.**
- [ ] **Step 4: Confirm no generation ID remains solely in a manifest after migration.**
- [ ] **Step 5: Run `npm --prefix src/client run media:usual-specialists:check` only if the validator is still not wired in; source/derivative identity must remain green.**
- [ ] **Step 6: Mark Task 4 complete in this plan.**

---

## Task 5: Build the Linear deletion-readiness register and wire provenance validation into the existing asset check

**Files:**
- Create: `src/client/assets/patch/the-usual-specialists/provenance/linear-source-register.json`
- Modify: `src/client/scripts/validate-usual-specialists-provenance.mjs`
- Modify: `src/client/scripts/validate-usual-specialists-provenance.test.ts`
- Modify: `src/client/scripts/process-usual-specialists-assets.mjs`
- Modify: `src/client/scripts/process-usual-specialists-assets.test.ts`

### Linear register schema

Use:

```json
{
  "schemaVersion": 1,
  "issue": "PORT-16",
  "purpose": "migration-and-deletion-readiness",
  "sources": [
    {
      "documentId": "...",
      "title": "...",
      "role": "brief | accepted-provenance | mixed-guidance",
      "destinationRecords": ["src/client/assets/.../provenance/example.md"],
      "materialRetained": ["original-intent", "accepted-execution", "iteration-history", "acceptance", "composition-contract"],
      "migrationStatus": "migrated"
    }
  ]
}
```

Include all 24 documents listed in the evidence inventory. The page-redesign brief may legitimately fan out to several destination records because its durable chapter/world contracts are distributed through the normalized asset records; do not create a non-normalized catch-all provenance record just to give it one destination.

The mineral-page-anchor brief should map to the accepted opening rope-start anchor and Index→Silk lock records; do not create accepted provenance for exploratory anchor-pack variants that never survived.

### Runtime/check integration

`process-usual-specialists-assets.mjs --check` becomes the single public command that proves both source/derivative custody and the provenance graph. Import/call `validateUsualSpecialistsProvenance()` from the companion module at the end of the existing source/derivative validation path. `--apply` already calls `check()` after emitting derivatives, so it will also enforce provenance without duplicating logic.

- [ ] **Step 1: Create `linear-source-register.json` with all 24 relevant Linear records and real destination paths.**
- [ ] **Step 2: Add integration fixtures/tests proving the filesystem validator accepts the live normalized corpus and rejects a migrated register entry whose destination is missing.**
- [ ] **Step 3: Wire `validateUsualSpecialistsProvenance()` into the existing processor `check()` path.**
- [ ] **Step 4: Update `process-usual-specialists-assets.test.ts` only for the new integration seam; do not loosen existing derivative/source assertions.**
- [ ] **Step 5: Run focused tests.**

```powershell
npm --prefix src/client test -- --run scripts/validate-usual-specialists-provenance.test.ts scripts/process-usual-specialists-assets.test.ts
```

Expected: PASS.

- [ ] **Step 6: Run the actual existing asset check against the live repository graph.**

```powershell
npm --prefix src/client run media:usual-specialists:check
```

Expected: `Usual Specialists derivatives are current.` and no provenance-graph error.

- [ ] **Step 7: Mark Task 5 complete in this plan.**

---

## Task 6: Add the ongoing generated-image custody runbook and reduce duplicate custody prose

**Files:**
- Create: `.agents/runbooks/generated-image-custody.md`
- Modify: `.agents/doctrine/repo-runbook-policy.md`
- Modify: `docs/asset-custody.md`
- Regenerate through owner command: `.agents/runbooks/INDEX.md`, `.agents/INDEX.md`, relevant `src/client/assets/.../INDEX.md` files, and any other generated indexes affected by the new provenance directory/runbook.

### Runbook contract

The runbook must open with this invariant:

> **Generate -> select for custody -> custody the master and write provenance while context is fresh -> verify custody -> only then stand the asset up on the page.**

It must state, without duplicating the fifteen-section schema:

1. scratch paths, chat attachments, and image-tool output paths are transient handoff surfaces, not durable custody;
2. selected generated masters are copied byte-for-byte into the owning source package before page use unless an explicit deterministic processing step is separately recorded;
3. the same custody pass records filename, repo path/source-custody state, SHA-256, dimensions, rights owner, selection status, model and only genuinely known generation metadata;
4. the current approved human brief is captured while the conversation is fresh;
5. literal retained tool prompt vs normalized conversational brief are different evidence classes;
6. reference hierarchy, original commission intent, material deviations and accepted limitations are written during custody;
7. `accepted-assets.json`, `generation-receipt.json`, and `provenance/*.md` are updated together as appropriate;
8. deterministic page-use derivatives are created only through the owning processor/receipt;
9. focused custody/provenance checks pass before React/HTML/CSS/wireframe references the derivative;
10. missing metadata is recorded immediately as `missing-from-retained-history` rather than blocking custody or encouraging invention;
11. later supersession preserves the old master/provenance and changes selection state rather than deleting history.

Point the runbook to `src/client/assets/patch/the-usual-specialists/provenance/README.md` for the normalized record schema.

Add `generated-image-custody.md` to `.agents/doctrine/repo-runbook-policy.md` under “Additional repo-specific runbooks” so it is an authored discoverability route; rely on the generated runbook/mesh indexes for navigation instead of adding operative law to `AGENTS.md`.

### `docs/asset-custody.md` boundary

Replace the long per-image Usual Specialists generation history with a concise map that says:

- Portfolio is temporary source/provenance custody for this page work;
- source masters live under Index/Rope/Silk package roots;
- normalized human provenance lives under `provenance/`;
- package generation receipts hold known generation metadata;
- `usual-specialists-derivatives.json` owns public derivative identity;
- `npm --prefix src/client run media:usual-specialists:check` verifies source, provenance and derivative custody;
- eventual Adventures promotion remains future work.

Retain a compact literal public-path inventory for every Usual Specialists public derivative because `tools/portfolio_quality.py` requires every public asset path to appear in this file. Do not retain duplicate prompt/iteration/acceptance prose merely to satisfy that inventory rule.

- [ ] **Step 1: Write `.agents/runbooks/generated-image-custody.md` as the thin repeatable repository procedure above.**
- [ ] **Step 2: Add the runbook to `.agents/doctrine/repo-runbook-policy.md`.**
- [ ] **Step 3: Refactor the Usual Specialists section of `docs/asset-custody.md` to the high-level authority map plus compact path inventory.**
- [ ] **Step 4: Run the focused Portfolio quality check before mesh regeneration.**

```powershell
py -3 tools/check_portfolio_quality.py
```

Expected: `content, privacy, and public assets OK`.

- [ ] **Step 5: Regenerate the repository mesh with the owning command and inspect its diff.**

```powershell
py -3 tools/run.py mesh --apply
```

Do not hand-edit generated `INDEX.md` files.

- [ ] **Step 6: Run the mesh check.**

```powershell
py -3 tools/run.py mesh --check
```

Expected: PASS.

- [ ] **Step 7: Mark Task 6 complete in this plan.**

---

## Task 7: Prove byte stability, provenance completeness, and no runtime behavior change

**Files:**
- No new product/runtime files expected.
- Inspect all files changed by Tasks 1–6.

### Required focused proof

- [ ] **Step 1: Re-run the focused provenance/processor tests.**

```powershell
npm --prefix src/client test -- --run scripts/validate-usual-specialists-provenance.test.ts scripts/process-usual-specialists-assets.test.ts
```

- [ ] **Step 2: Run the live Usual Specialists custody check.**

```powershell
npm --prefix src/client run media:usual-specialists:check
```

- [ ] **Step 3: Run the Portfolio quality checker.**

```powershell
py -3 tools/check_portfolio_quality.py
```

- [ ] **Step 4: Prove no source PNG or public derivative bytes changed.** Compare `git diff --numstat`/`git diff --name-only` against the known asset roots and require **no modified binary files** under:
  - `src/client/assets/patch/the-usual-specialists/**/*.png`
  - `src/client/public/media/patch/the-usual-specialists/**/*.webp`
  - `src/client/public/media/patch/the-usual-specialists/usual-specialists-derivatives.json`

`usual-specialists-derivatives.json` should remain byte-identical because no derivative configuration or source byte changed.

- [ ] **Step 5: Prove runtime source was untouched.** `git diff --name-only` must contain no files under `src/client/src/features/patch-showcase/usual-specialists/` and no route/publication files. If a runtime file appears, stop and investigate rather than accepting it as incidental provenance work.
- [ ] **Step 6: Run `git diff --check` and inspect `git status --short`.**
- [ ] **Step 7: Read the final normalized records side-by-side and verify every one has the same fifteen headings, every missing-data claim is explicit, and Linear is described only as legacy/migration evidence rather than current authority.**
- [ ] **Step 8: Mark Task 7 complete in this plan.**

---

## Task 8: Normal commit, canonical hook, push, and existing-PR update

**Files:** all intended provenance/validator/runbook/doc/mesh changes from Tasks 1–7 plus this tracked implementation plan.

- [ ] **Step 1: Stage only the intended provenance migration.** Inspect:

```powershell
git status --short
git diff --cached --name-status
```

No image binary, runtime composition, route, or unrelated file may be staged.

- [ ] **Step 2: Make one normal implementation commit, for example:**

```powershell
git commit -m "docs: recustody Specialists image provenance"
```

Do not use `--no-verify`. Do not manually run the complete `ci --check` immediately beforehand; the tracked pre-commit hook owns the complete staged-tree gate.

- [ ] **Step 3: Observe the hook result.** Completion is not proven unless the normal hook reports the canonical CI check passed. Record the exact Python/Vitest/build/Playwright counts from the observed output.
- [ ] **Step 4: After a successful commit, verify the tree is clean and inspect the new local head.**

```powershell
git status --short
git log -3 --oneline
```

- [ ] **Step 5: Push the existing branch to origin and update draft PR #61 implicitly through that push.**

```powershell
git push origin codex/port-17-silk-continuation
```

Do not create another PR and do not merge it.

- [ ] **Step 6: Keep the worktree and branch live after the push.** Provenance migration is the side-quest checkpoint; later Silk layout/product work resumes only after this migration is complete.
- [ ] **Step 7: Mark Task 8 complete in this plan.**

## Explicit non-goals

- No image generation or image editing.
- No Commission 06 re-iteration.
- No Silk layout tuning or breakpoint changes.
- No Index/Silk visual redesign.
- No canonical/preview route changes.
- No new browser test unless a provenance change unexpectedly touches runtime, which it should not.
- No public derivative regeneration unless `--check` exposes unexpected existing drift; if that happens, diagnose before applying anything.
- No promotion into `adventures-of-patch` today.
- No Linear deletion/archive/mutation.
- No source promotion for accepted scratch-only Index/Patch traversal assets.
- No provenance record for rejected exploratory anchor packs, rejected Silk candidates, or future Commission 07+ work merely for completeness.

## Final completion criteria

The migration is complete only when all of the following are true:

1. All sixteen normalized provenance records use the exact same fifteen-section shape.
2. Every repo-custodied accepted source master points at an existing provenance record that names its asset ID.
3. Every accepted generated master in current scope, including accepted-but-not-promoted traversal assets, has a generation-receipt entry with explicit known/missing evidence state.
4. Commission 06 threshold crossing is accepted + superseded; hands-free abseil is accepted + current.
5. Every deterministic accepted child traces to an accepted generated source via `derivedFrom`/derivation and is not represented as a generation event.
6. All 24 relevant Linear documents are represented in `linear-source-register.json` with destinations, retained-material classes, and `migrated` status.
7. No migrated provenance record treats Linear as current canonical custody.
8. The new generated-image custody runbook is discoverable through repo runbook policy/mesh and encodes provenance-writing before page use.
9. `docs/asset-custody.md` is a high-level map plus required public-path inventory, not a second detailed provenance database.
10. `npm --prefix src/client run media:usual-specialists:check`, the focused Vitest suite, portfolio quality check, mesh check, and normal commit hook all pass.
11. No source PNG, public WebP, derivative receipt, runtime composition, or route/publication file changes.
12. The existing branch is pushed and draft PR #61 contains the completed provenance migration.
