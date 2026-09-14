# The Usual Specialists provenance recustody design

**Status:** User-approved design; implementation not started.

**Scope:** Re-custody the accepted image-generation provenance for The Usual Specialists from temporary Linear documents and recoverable Chat on Steroids history into a normalized, repo-backed Portfolio package. Portfolio is temporary canonical custody only; eventual promotion into `adventures-of-patch` is deliberately deferred.

## Problem

The accepted Usual Specialists imagery now has durable source masters in Portfolio, but its provenance is fragmented across several temporary authorities:

- accepted PNG masters and JSON manifests in Portfolio;
- generation receipts for only some packages;
- detailed accepted-generation provenance documents on PORT-16 in Linear;
- original commission/package briefs on PORT-16 in Linear;
- recoverable approved generation briefs, correction deltas and acceptance dialogue in Chat on Steroids recordings;
- current human knowledge that the campaign used OpenAI Image 2.5 throughout.

Linear was intentionally temporary custody. The project must be able to delete the Linear brief/provenance documents later without losing the answer to any of these questions:

1. What was the asset originally commissioned to do?
2. What brief actually governed the accepted generation?
3. What references and ownership boundaries mattered?
4. Which exact bytes were accepted?
5. Which generation metadata is genuinely known, and which is missing?
6. What iterations materially explain why the accepted result won?
7. What defects or limitations were knowingly accepted?
8. What deterministic descendants were produced from the accepted master?
9. What asset is current when multiple historically accepted iterations exist?
10. Where did the provenance record itself come from, and where should it move next?

The current records answer most of these questions collectively, but not in one consistent repo-native shape.

## Decision

Create one normalized, portable provenance package under:

`src/client/assets/patch/the-usual-specialists/provenance/`

Portfolio becomes the temporary canonical provenance authority for this image campaign.

The package is designed to move later into `adventures-of-patch` alongside the canonical source masters with minimal semantic rewriting. The later upstream promotion is not part of this PR.

The provenance model has four distinct authorities:

1. `accepted-assets.json` answers **which source bytes are accepted**.
2. `generation-receipt.json` answers **which generation metadata is actually known**.
3. `provenance/*.md` answers **why the asset exists, what intent and brief governed it, what changed, and why it was accepted**.
4. the existing generated derivative receipt answers **what deterministic public media the Portfolio pipeline emitted**.

No one file should become a duplicate database of all four concerns.

## Evidence policy

The migration is a forensic normalization pass, not prose copying.

Use evidence in this order, with narrower direct evidence outranking broader reconstructed evidence:

1. Current repository master bytes, manifests, deterministic derivations and derivative receipts.
2. Retained image-generation tool metadata where available, including generation IDs and literal retained prompts.
3. PORT-16 accepted-generation provenance documents.
4. PORT-16 commission/package briefs for original intent and early ownership contracts.
5. Chat on Steroids recordings for recoverable approved generation briefs, correction deltas, QA and explicit acceptance dialogue.
6. Explicit project-owner confirmation for campaign-wide facts not reliably retained per generation.

For this campaign the generation model is **OpenAI Image 2.5 throughout**. Where a historical tool result or Linear record already records the model, retain that direct evidence. Where it does not, record the model with evidence basis `project-owner-confirmation-2026-09-14`; do not imply the missing historical tool payload supplied it.

Never reconstruct or guess:

- generation IDs;
- parent generation IDs;
- seeds;
- hidden/backend prompt strings;
- dates that cannot be tied confidently to a generation;
- missing source files;
- rejected-candidate identity that cannot be matched unambiguously.

Missing evidence is itself a durable fact and must be recorded explicitly.

## Normalized provenance document shape

Every human-readable provenance record uses the same section order. A record may cover one asset or a coherent accepted package such as the rope kit or traversal pose set.

### 1. Record identity

Record:

- stable provenance ID;
- schema version;
- commission/package name;
- asset IDs covered;
- rights owner;
- temporary canonical repository: Portfolio;
- intended eventual canonical repository: `adventures-of-patch`;
- legacy Linear brief/provenance document IDs and titles absorbed by the record.

### 2. Status

Record:

- acceptance date where known;
- accepted status;
- selection state: `current`, `superseded`, `library`, or `derived`;
- replacement/supersession relationship where applicable.

`accepted` and `current` are not synonyms. An asset may remain a historically accepted master while a later accepted iteration becomes the current page selection.

### 3. Original commission intent

Capture the durable intent from the relevant Linear commission/package brief in concise normalized form.

Preserve:

- narrative job;
- visual/compositional job;
- important ownership boundaries;
- durable character/world/material intent;
- important negative intent that explains the commission.

Do not reproduce every source-master aspiration, exhaustive negative list or speculative responsive detail merely because it appeared in a working brief.

### 4. Material changes from original intent

Explicitly record meaningful changes between the original commission and the accepted result.

Examples already known:

- Commission 02 moved from an archive-room scene to direct-overhead document terrain with separate transparent traversal characters.
- The rope kit grew from a proposed small family into seven accepted selectable pieces while preserving one-physical-rope semantics.
- Commission 06 evolved from a generic controlled threshold/rappel concept into the current squat, hands-free, page-right-facing abseil, with Silk's existing red-string reel understood as the powered lowering mechanism.

This section prevents superseded working directions from masquerading as current requirements while preserving why the asset family changed.

### 5. Accepted execution brief

Capture the brief that governed the accepted generation, with one explicit evidence status:

- `verbatim-recovered`;
- `normalized-from-approved-conversation`;
- `recovered-from-linear-record`;
- `missing-from-retained-history`.

Chat on Steroids recordings are valid evidence when the matching sequence is unambiguous: complete brief proposed, user approval, corresponding generation, QA and acceptance/correction history.

A recovered conversational brief is not automatically a literal backend prompt. Call it an approved human generation brief unless a literal prompt field was actually retained.

Where several approved correction turns led to the accepted generation, combine them into a concise normalized execution brief and state that it is normalized from those approved deltas.

### 6. Reference hierarchy

Record only the useful authority relationships:

- identity authority;
- world/material authority;
- geometry/composition authority;
- context-only references;
- quarantined/negative-only references.

Do not preserve incidental old references that no longer explain the accepted output.

### 7. Accepted asset identity

For every accepted master covered by the record, include:

- stable asset ID;
- original staged/generated filename where known;
- repository source path when in repo custody;
- current source-custody state when not yet promoted into Portfolio;
- width and height;
- byte count;
- SHA-256.

Current repository identity is verified from the bytes, not copied blindly from Linear prose.

### 8. Generation provenance

Record:

- generation model: OpenAI Image 2.5;
- evidence basis for the model field;
- generation ID where known;
- parent generation ID where known;
- seed where known;
- generation date/time where confidently recoverable;
- literal prompt only where genuinely retained.

Unknown fields use explicit missing-history states rather than invented values.

### 9. Iteration history

Retain only attempts that materially explain the accepted decision or teach a durable constraint.

Useful entries include:

- accepted candidate lineage;
- rejected attempts that drove a significant correction;
- known generation IDs for those attempts;
- concise reason the attempt lost;
- durable lesson carried into the accepted output.

The repo does not need an exhaustive cemetery of every unsuccessful image.

### 10. Acceptance decision

Record:

- what was reviewed;
- whether review was standalone, in wireframe, or in React;
- who accepted it;
- acceptance date where known;
- why the result was judged sufficient.

### 11. Known accepted limitations

Record defects or compromises that were explicitly tolerated rather than overlooked.

This section is present even when the value is `None known`.

### 12. Composition / ownership contract

Preserve the durable boundary between generated pixels and React/HTML composition.

Examples include:

- meaningful text remains HTML;
- Commission 06 contains zero page/aperture/route-rope pixels;
- React owns placement, responsive geometry and re-occlusion;
- paper props own physical material while the web layer owns semantic typography;
- rope assets own material identity rather than chapter coordinates.

Do not turn transient CSS coordinates into provenance unless a geometry value is itself part of the accepted physical asset contract.

### 13. Deterministic descendants

Record source-master descendants such as crops, masks and occluders when they are semantically relevant to the accepted treatment.

Include exact deterministic derivation where available.

Public WebP/AVIF encoding hashes and byte sizes remain authoritative in the derivative receipt and should not be copied wholesale into every Markdown record.

### 14. Missing historical evidence

Always include this section.

Examples:

- generation ID missing from retained history;
- no trustworthy literal backend prompt was retained;
- source master remains accepted in provenance but was never promoted from scratch into Portfolio;
- seed not exposed.

Use `None known` when appropriate.

### 15. Custody history

Record the custody chain:

`scratch / generation output -> temporary Linear record -> temporary Portfolio canonical provenance -> intended Adventures of Patch promotion`

Include dates or commits when confidently known.

## Machine-readable custody model

### Accepted asset manifests

The Index, Silk and rope `accepted-assets.json` files remain the machine authority for accepted source identity.

Normalize each accepted entry to include at least:

- stable `id`;
- source path where repo-custodied;
- dimensions;
- SHA-256;
- status;
- selection state where meaningful;
- rights owner;
- repo-relative `provenanceRecord`;
- legacy Linear document IDs only as migration/history fields, not as the canonical provenance pointer;
- `derivedFrom` and deterministic derivation where applicable.

Generation IDs should no longer be inconsistently scattered through asset manifests as the sole source of generation truth; the generation receipt is canonical for that metadata.

### Generation receipts

Every generated accepted master must have a generation-receipt entry, even when most historical metadata is unavailable.

Use explicit evidence/status fields, for example:

- `model: "OpenAI Image 2.5"`;
- `modelEvidence: "tool-metadata"` or `project-owner-confirmation-2026-09-14`;
- `generationId: null` plus `generationIdStatus: "missing-from-retained-history"` when unknown;
- `seed: null` plus a corresponding status where useful;
- `briefStatus` using the approved brief-evidence vocabulary;
- Chat on Steroids session/timestamp references when those logs supply the approved execution brief;
- literal prompt only when actually retained.

An ordinary JSON `null` must not be the only signal when there is a meaningful distinction between "checked and missing" and "not yet researched".

### Linear source register

Add:

`src/client/assets/patch/the-usual-specialists/provenance/linear-source-register.json`

This is the migration/deletion-readiness register, not the ongoing provenance authority.

For every PORT-16 document whose information must survive deletion, record:

- Linear document ID;
- title;
- document role: `brief`, `accepted-provenance`, or mixed/package guidance;
- destination repo provenance record(s);
- material retained: e.g. `original-intent`, `accepted-execution`, `iteration-history`, `acceptance`, `composition-contract`;
- migration status.

The register exists so a later cleanup can answer mechanically whether anything remains stranded in Linear.

Do not delete or archive Linear documents as part of this PR. The PR establishes deletion readiness; actual Linear deletion remains a separate explicit authority gate.

## Source-custody versus provenance-custody

Provenance migration does not silently promote every accepted scratch PNG into Portfolio.

Where a Linear record covers an accepted set larger than the current Portfolio source package, preserve the full accepted provenance set and record the missing source master's custody honestly.

Known examples include traversal-model packages where some accepted poses may not currently be present in the live Portfolio asset manifest.

The provenance record may say `accepted, source not promoted to Portfolio` without copying the asset merely to make the manifest symmetrical.

Asset promotion is a separate decision.

## Commission 06 current/superseded model

Commission 06 is the reference case for separating acceptance from current selection.

- `silk-commission-06-threshold-crossing` remains a historically accepted first page-iteration master but is marked `selection: superseded`.
- `silk-commission-06-abseil-hands-free` is the current accepted Commission 06 selection as of 14 September 2026.
- both masters retain their exact byte identity and known generation IDs;
- the first retains its literal recovered prompt where already available;
- the hands-free abseil records the approved conversational edit brief as normalized human brief provenance rather than inventing a literal backend prompt.

This distinction is required because Commission 06 may be iterated again after the rest of the Silk chapter is established.

## Linear intent migration policy

The original Linear commission/package briefs are source evidence, not text to preserve verbatim.

For each accepted asset family, read the relevant brief and capture enough original intent that deleting that Linear document later loses no durable design reasoning.

Retain:

- why the asset was commissioned;
- what story or compositional job it owned;
- durable material/character/world rules;
- important separation-of-responsibility rules;
- major rejection intent where it explains the role;
- meaningful divergence between initial commission and final accepted execution.

Discard or compress:

- exhaustive first-turn negative lists once the durable rule is expressed clearly;
- speculative source-resolution targets no longer governing current custody;
- abandoned responsive schemes;
- hypothetical variant counts superseded by the accepted package;
- duplicated character-kernel prose already captured by a reference hierarchy unless a specific identity constraint materially affected the accepted asset.

The test for sufficiency is:

> After deleting the Linear brief and provenance documents, can the repo still explain what the asset was meant to do, what actually governed the accepted result, why that result was selected, what its exact bytes are, and what evidence is genuinely unavailable?

If yes, the recustody is complete.

## Chat on Steroids recovery policy

Use recorded sessions to recover approved human generation briefs and acceptance context where Linear is incomplete.

For each candidate recovery:

1. identify the asset using stable filename, SHA-256, generation ID, commission name and date/time clues;
2. locate the complete brief or correction delta immediately preceding the generation;
3. confirm explicit user approval where the workflow required it;
4. correlate the following generation/QA/acceptance dialogue with the accepted file;
5. preserve the session ID and useful timestamp as evidence;
6. normalize the approved brief only when the correspondence is unambiguous.

If the match is ambiguous, record `missing-from-retained-history` or fall back to the accepted Linear art-direction record. Do not choose the most plausible chat merely to fill a field.

## Repository documentation boundary

`docs/asset-custody.md` should remain the high-level custody map, not a second per-image provenance database.

Refactor its Usual Specialists section to describe:

- temporary Portfolio custody;
- source-master versus public-derivative boundary;
- rights basis;
- normalized provenance package path;
- generation/derivative verification commands;
- intended future Adventures promotion.

Detailed art-direction, iteration and acceptance history belongs only in `provenance/*.md`.

## Verification and enforcement

Extend the Usual Specialists asset validation so the repo fails when the normalized custody graph is incomplete or inconsistent.

At minimum verify:

1. every accepted repo source master has a `provenanceRecord` path that exists;
2. every provenance-linked asset ID appears in the referenced record;
3. every generated accepted master has a generation-receipt entry or an explicit missing-history entry;
4. every deterministic accepted child traces through `derivedFrom` to an accepted source identity;
5. every provenance Markdown record contains the required normalized section headings;
6. every Linear source-register entry marked migrated points to at least one existing repo record;
7. no migrated record still treats Linear as the canonical authority;
8. source hashes/dimensions continue to match the accepted manifests;
9. public derivatives continue to match the existing deterministic derivative receipt.

Use focused unit/script tests for schema and graph validation. Do not require browser tests for provenance-only content unless the migration changes runtime asset selection.

No image generation is part of this work.

## Initial record families

The normalized package should cover at least the accepted families already represented by PORT-16 provenance and/or current Portfolio custody:

- Commission 01 safehouse threshold;
- Commission 02 Index document-world base;
- blue INDEX carrier;
- Index graph-paper calculation spill;
- Index assent note;
- Commission 03 obstructed observation;
- Commission 04 macguffin extraction;
- Index traversal pose set;
- Patch traversal pose set;
- Specialists rope segment kit;
- mineral-page rope anchors / opening rope-start treatment where accepted;
- Index-to-Silk anchor lock and its deterministic descendants;
- Commission 05 Silk corridor world plate;
- Commission 05 Silk heavy aperture frames, landscape and portrait;
- Commission 06 Silk traversal, including current and superseded accepted iterations.

The migration inventory should expand this list if another accepted image in the live manifests or PORT-16 accepted corpus lacks a normalized record.

## Non-goals

This PR does not:

- generate or edit any imagery;
- promote provenance or source masters into `adventures-of-patch` yet;
- copy every accepted scratch-only image into Portfolio;
- delete or archive Linear documents;
- reconstruct hidden prompts, seeds or generation IDs;
- preserve every rejected candidate image;
- redesign Index or Silk composition;
- change canonical/preview route ownership;
- change accepted image selection except to encode the already-decided Commission 06 current/superseded relationship;
- turn `docs/asset-custody.md` into the detailed provenance store.

## Success criteria

The recustody is complete when:

1. every accepted Usual Specialists image family has a normalized repo-backed provenance record;
2. original commission intent, accepted execution intent, accepted-byte identity and acceptance rationale are all recoverable without Linear;
3. every historical unknown is explicitly marked rather than guessed;
4. OpenAI Image 2.5 is consistently recorded with honest evidence basis;
5. recoverable Chat on Steroids briefs are captured with evidence status and session provenance;
6. every relevant PORT-16 Linear brief/provenance document is accounted for in the source register;
7. the repo can prove whether the Linear provenance corpus is safe to delete later;
8. current versus superseded accepted imagery is unambiguous;
9. provenance for accepted-but-not-promoted source files remains preserved without silently expanding Portfolio asset custody;
10. `media:usual-specialists:check` or an equivalent focused validation fails on broken provenance links, missing required sections or unaccounted accepted sources;
11. existing public image derivatives remain byte-for-byte governed by the current deterministic asset pipeline unless a separately approved asset-selection change requires otherwise;
12. the provenance package is structurally portable to Adventures of Patch in a later promotion PR.

## Planning boundary

The implementation plan should cover only today's Portfolio recustody:

- inventory the accepted Portfolio masters and all relevant PORT-16 brief/provenance documents;
- recover unambiguous approved generation briefs/acceptance context from Chat on Steroids where useful;
- create the normalized provenance schema/README and source register;
- write the normalized provenance records;
- normalize manifest and generation-receipt links/status fields;
- refactor the Usual Specialists section of `docs/asset-custody.md` to point at the new authority;
- add focused validation/tests;
- verify asset bytes and deterministic public derivatives remain unchanged except for already-approved current Commission 06 integration work present on this branch.

Do not include Adventures promotion, Linear deletion, new image commissioning, or future Silk iteration in this implementation plan.
