# Surface Classification Policy

Status: active policy
Owner: Portfolio repository
Scope: repository-wide agent and documentation surfaces
Routed from: `/.devin/rules/agents-doctrine.md`
Generic baseline: installed `repo-worker-base` and its references

Use this policy when deciding what kind of surface a rule, guide, or note should live on.

## Surface roles

Use the smallest set of surfaces justified by a current reader or consumer.

| Surface | Role | Authority |
| --- | --- | --- |
| `README.md` | Human-facing purpose and orientation | Human documentation |
| `AGENTS.md` | Root repo router | Agent router |
| `.devin/rules/*.md` | Conditional scope triggers for lazy-loaded runbook and doctrine | Agent rules |
| `INDEX.md` | Generated traversal and containment navigation | Mesh generator |
| `.agents/doctrine/` | Binding Portfolio policies, contracts, and invariants | Authored doctrine |
| `.agents/docs/` | Non-binding agent reference material | Authored docs |
| `.agents/runbooks/` | Stage and topical workflow runbooks | Authored guidance |
| `.agents/plugins/` | Plugin manifest and pinned marketplace source | Manifest and gitlink |
| `.agents/skills/port-*/` | Future Portfolio-owned skills | Tracked local custody |
| `.agents/skills/<other>/` | Marketplace-derived skills | Pinned source and provenance |
| `.agents/plans/completed/` | Historical implementation plans | Authored plans |
| `.agents/specs/` | In-flight design specs | Authored specs |
| `.agents/specs/completed/` | Historical design specs | Authored specs |
| `.agents/sdd/` | Local-only SDD workspace | Ignored workspace |
| `tools/` | Deterministic generation, refresh, validation, and safety tooling | Tool-owned behavior |

`README.md` files are not agent routers. `AGENTS.md` files are not doctrine
containers. `INDEX.md` files are not policy. One rule has one canonical
authority.

## Classification and anti-sprawl

- Put a durable invariant, policy, contract, or authority boundary in `.agents/doctrine/`.
- Put stage-specific, non-binding workflow guidance in `.agents/runbooks/`.
- Put a repeatable Portfolio procedure in `.agents/runbooks/` only when it does not need skill invocation or composition.
- Put a triggerable, composable Portfolio capability in `.agents/skills/port-*` only when a real repeated use case justifies it.
- Put implementation of a capability in repository code or `tools/`, not in an installed skill tree.
- Keep plans in the tracked plan home and temporary execution material in ignored or external scratch custody.

Do not create parallel `policies/`, `contracts/`, `reports/`, `receipts/`,
`reference/`, `playbooks/`, or actor/domain taxonomies without a separately
justified scope boundary. Do not create empty taxonomy directories.

Every new doctrine document must state its status, owner, scope, authority, and
nearest router. If it supersedes another document, state that explicitly.
Before retaining an existing document, verify that it is current, unique,
correctly classified, discoverable, and has a named reader, producer,
consumer, validator, or safety boundary.
