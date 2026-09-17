# Generated Image Custody Runbook

Use this runbook when an image generated for the portfolio is selected for page iteration, reuse, or final production use.

## Required skills

- `asset-custody` owns generated-image source custody and deterministic derivative handling.
- `verification-before-completion` before claiming custody or provenance is complete.

> **Generate -> select for custody -> custody the master and write provenance while context is fresh -> verify custody -> only then stand the asset up on the page.**

Page composition is never the first durable record of a generated asset. Image-tool outputs, chat attachments, Downloads, and agent scratch paths are transient handoff surfaces, not repository custody.

## Read first

- `.agents/runbooks/asset.md` for the general repository asset rules.
- `.agents/skills/asset-custody/SKILL.md` for custody and deterministic-processing guidance.
- For The Usual Specialists schema and evidence vocabulary, read `src/client/assets/patch/the-usual-specialists/provenance/README.md`.

## Custody before page use

When a generated image is selected for page iteration or final use, perform one custody pass before React, HTML, CSS, or a durable wireframe references its page-use derivative.

1. Copy the exact selected generated master into the owning source package. Do not silently crop, retouch, flatten alpha, re-encode, or otherwise rewrite the reproduction master.
2. Record the original generated filename, repository source path or honest non-promoted state, SHA-256, intrinsic dimensions, byte count, rights owner, and selection state.
3. Classify the asset honestly: page-review candidate, current accepted selection, accepted library item, superseded accepted selection, deterministic descendant, or accepted-but-not-promoted historical source.
4. Record the actually evidenced generation tool/model plus only generation metadata that is genuinely known. Generation ID, parent ID, seed, date, and prompt provenance need evidence; they are not fields to fill by inference. Do not upgrade a generic tool record into a more specific model claim without retained evidence.
5. Capture the approved human generation brief from the current conversation while it is still fresh. Preserve correction deltas that materially explain the accepted result.
6. Distinguish evidence classes. A literal retained tool prompt is not the same thing as a conversational brief normalized from approved human direction.
7. Record reference hierarchy, original commission intent, material changes from that intent, accepted limitations, acceptance decision, and image-vs-page ownership boundaries.
8. Update the owning custody surfaces in the same pass: an accepted source belongs in its `accepted-assets.json`; a page-review candidate stays in the scoped `candidate-assets.json` until explicit acceptance; update the relevant `generation-receipt.json` and normalized provenance Markdown record as appropriate.
9. Create page-use derivatives only through the owning deterministic processor and receipt. The generated master remains the reproduction source.
10. Run the focused custody/provenance checks before standing the derivative up on the page.

## Missing history

If metadata is already unavailable, record that fact immediately. Use an explicit status such as `missing-from-retained-history`, `tool-returned-null`, or `not-supplied-by-tool` rather than a bare `null` whose meaning is unclear.

Do not delay custody while trying to manufacture completeness. A precisely recorded unknown is stronger provenance than a reconstructed guess.

## Prompt and brief evidence

- `verbatim-recovered`: a literal retained generation prompt or approved brief is present.
- `normalized-from-approved-conversation`: the approved human brief/correction sequence is recoverable and has been normalized, but no literal backend prompt is claimed.
- `recovered-from-linear-record`: a historical project record preserves the governing execution direction.
- `missing-from-retained-history`: no sufficiently reliable execution brief survived.

When Chat on Steroids history is used, prefer a sequence where the complete brief, user approval, generation, QA, corrections, and acceptance can be matched unambiguously. Record useful session identifiers. If correspondence is ambiguous, stop at the evidence boundary instead of guessing.

## Deterministic descendants

Crops, masks, extractions, and format conversions are not new generation events. Give accepted deterministic descendants stable identities and `derivedFrom` lineage, but keep generation metadata attached to the generated master.

For The Usual Specialists, `npm --prefix src/client run media:usual-specialists:check` validates source custody, generation/provenance links, deterministic lineage, and public derivative identity.

## Supersession

When later page evaluation replaces an accepted generated asset:

- keep the earlier master and provenance;
- change its selection state to superseded rather than rejected/deleted when it was genuinely accepted;
- record the replacement relationship and date;
- put the replacement through this same custody workflow before page use;
- do not overwrite the earlier source or rewrite its history to make the later decision look inevitable.

## Handoff

Before implementation continues, the selected source master, generation receipt, normalized provenance, deterministic derivative receipt, and focused checks should agree. Only then may the page composition treat the asset as available production material.
