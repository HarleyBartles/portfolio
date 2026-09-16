# Notice

`generating-images` is a substantially modified derivative of the installed
OpenAI bundled `imagegen` Agent Skill instructions. The upstream source was
retrieved on 2026-09-15 from the installed bundled OpenAI `imagegen` skill. A
byte-identical source snapshot is retained under
`assets/authority/reference-source/openai-imagegen/SKILL.md`.

Upstream source snapshot:

- File SHA-256: `706D4D96E1D5C9E6023FE3CCABBA1BB34B364024D344FD25B8515EC7D28FE3C4`
- Source file length: 19,516 bytes
- Source licence: Apache License 2.0; the complete licence text is retained in
  [`LICENSE.txt`](LICENSE.txt).

This repository does not claim the upstream instructions as wholly original. The
derivative retains and reorganises useful concepts concerning image-generation
versus editing, explicit input-image roles, prompt structuring, invariant
preservation, inspection, targeted iteration, transparency, and asset handoff.

The substantial modifications for this repository are:

- capability- and behaviour-based routing across current OpenAI product surfaces
  instead of one fixed execution tool;
- separation of the portable OpenAI workflow from observed Codex and ChatGPT
  harness contracts that can change independently;
- removal of the bundled OpenAI CLI and its scripts, dependencies, model details,
  and network instructions;
- separation of unresolved creative direction into `directing-visual-stories`;
- a harness-portable contract for truthful missing-capability and incomplete-brief
  outcomes;
- explicit preservation of frame and story invariants;
- repository-neutral provenance, custody, and field-learning reporting.

Harness-specific observations are field evidence, not promises about a backend
model or permanent public API. They must be re-checked against the callable surface
present in the active OpenAI environment.
