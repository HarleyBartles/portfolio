# The Usual Specialists generated-image provenance

This directory is the temporary canonical human-readable provenance store for accepted generated imagery and explicitly selected page-review candidates used by **The Usual Specialists** while the work is owned by the Portfolio repository. The intended long-term home for accepted work is the Adventures of Patch repository; that promotion is a separate future custody action.

Schema version: **1**.

The custody authorities are intentionally separate:

- package `accepted-assets.json` files answer **which source bytes are accepted in repository custody**;
- scoped `candidate-assets.json` files under a package `candidates/` lane answer **which source bytes are deliberately retained for reversible page review without implying acceptance**;
- package `generation-receipt.json` files answer **which generation metadata is actually known**;
- these Markdown records answer **why the asset was commissioned, what changed, what brief governed the retained result, and what acceptance or candidate-review decision actually exists**;
- `src/client/public/media/patch/the-usual-specialists/usual-specialists-derivatives.json` answers **which deterministic page-use derivatives the processor emitted**;
- `linear-source-register.json` is a migration/deletion-readiness ledger only. Linear is legacy evidence, not current canonical provenance custody.

Every provenance record uses the same fifteen H2 sections, in the same order. Empty-but-reviewed sections say `None known.` rather than disappearing.

Accepted execution brief evidence status is one of:

- `verbatim-recovered` — a literal retained generation prompt/brief exists;
- `normalized-from-approved-conversation` — the approved human brief or correction deltas were recovered from conversation and normalized without claiming to be the backend prompt;
- `recovered-from-linear-record` — the durable accepted execution direction is preserved in the historical Linear record;
- `missing-from-retained-history` — no sufficiently reliable retained brief was found.

Missing generation metadata is explicit. A `null` value in a generation receipt is paired with a status such as `missing-from-retained-history`, `tool-returned-null`, or `not-supplied-by-tool`; absence is never used to imply that research was not performed.

Accepted source custody can differ from accepted provenance custody. `accepted-not-promoted` means an asset was genuinely accepted in the historical review but its source master was never promoted into Portfolio. Do not copy such files into Portfolio merely to make the manifests symmetrical.

Candidate custody is not acceptance. A candidate selected for page review remains outside every `accepted-assets.json` manifest, carries `status: candidate` and `selection: page-review`, and uses a distinct deterministic public derivative. Promotion, rejection, supersession, and removal require a later explicit human decision.

The campaign generation model is **OpenAI Image 2.5**, confirmed by the project owner on 2026-09-14. Historical tool records that did not expose a model must not be rewritten as though they did; the generation receipt records the evidence basis separately.

For ongoing work, follow `.agents/runbooks/generated-image-custody.md`: write provenance while the generation context is still fresh and before the selected asset is stood up on the page.
