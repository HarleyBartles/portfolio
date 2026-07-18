# Portfolio Repository Hygiene and Layout Policy

Status: active policy
Owner: Portfolio repository
Scope: repository-wide agent surfaces, local tooling, worktrees, generated skills, and documentation layout
Routed from: `/AGENTS.md` and `/.agents/doctrine/AGENTS.md`
Generic baseline: installed `repo-worker-base` and its references

This policy binds the generic worker contract to Portfolio. It owns Portfolio's
paths, exclusions, custody choices, and exceptions; it does not duplicate
portable worker behavior supplied by the installed baseline skill.

## Surface roles

Use the smallest set of surfaces justified by a current reader or consumer.

| Surface | Role | Authority |
| --- | --- | --- |
| `README.md` | Human-facing purpose and orientation | Human documentation |
| `AGENTS.md` | Thin scoped routing using read-when language | Agent router |
| `INDEX.md` | Generated traversal and containment navigation | Mesh generator |
| `.agents/doctrine/` | Binding Portfolio policies, contracts, and invariants | Authored doctrine |
| `.agents/docs/` | Non-binding agent reference material | Authored docs |
| `.agents/guides/` | `design-guide.md`, `planning-guide.md`, `implementing-guide.md`, and `code-review-guide.md` stage guides | Authored guidance |
| `.agents/docs/runbooks/` | Optional repeatable Portfolio procedures | Authored runbooks |
| `.agents/plugins/` | Plugin manifest and pinned marketplace source | Manifest and gitlink |
| `.agents/skills/port-*/` | Future Portfolio-owned skills | Tracked local custody |
| `.agents/skills/<other>/` | Marketplace-derived skills | Pinned source and provenance |
| `.agents/superpowers/plans/` | Tracked implementation plans | Authored plans |
| `.agents/superpowers/specs/` and `sdd/` | Local-only working material | Ignored workspace |
| `scripts/` | Deterministic generation, refresh, validation, and safety tooling | Tool-owned behavior |

`README.md` files are not agent routers. `AGENTS.md` files are not doctrine
containers. `INDEX.md` files are not policy. One rule has one canonical
authority.

## Classification and anti-sprawl

- Put a durable invariant, policy, contract, or authority boundary in
  `.agents/doctrine/`.
- Put stage-specific, non-binding workflow guidance in `.agents/guides/`.
- Put a repeatable Portfolio procedure in `.agents/docs/runbooks/` only when
  it has a current reader and does not need skill invocation or composition.
- Put a triggerable, composable Portfolio capability in `.agents/skills/port-*`
  only when a real repeated use case justifies it.
- Put implementation of a capability in repository code or scripts, not in an
  installed skill tree.
- Keep plans in the single tracked plan home and temporary execution material
  in ignored or external scratch custody.

Do not create parallel `policies/`, `contracts/`, `reports/`, `receipts/`,
`reference/`, `playbooks/`, or actor/domain taxonomies without a separately
justified scope boundary. Do not create empty taxonomy directories.

Every new doctrine document must state its status, owner, scope, authority, and
nearest router. If it supersedes another document, state that explicitly.
Before retaining an existing document, verify that it is current, unique,
correctly classified, discoverable, and has a named reader, producer,
consumer, validator, or safety boundary.

## Worktrees and external locations

Use the Git-derived path contract supplied by `repo-worker-base`:

1. Resolve the current checkout with `git rev-parse --show-toplevel`.
2. Resolve the main checkout through `git rev-parse --git-common-dir`.
3. Resolve the main checkout root from that common Git directory.
4. Derive the external worktree root as
   `<main-checkout-root>/../_agent-worktrees/<repo-name>`.

Do not use drive letters, current-worktree parent walking,
`Path(__file__).parent` discovery, or assumptions that the current checkout is
main. Keep temporary scratch under a similarly main-checkout-relative
`../_agents-scratch/<branch-name>/` location and never commit it.

## Source and generated custody

- `.agents/plugins/marketplace.json` declares the selected plugin set.
- `.agents/plugins/marketplace-source` is a pinned gitlink and a mesh boundary.
- Marketplace-derived skills are copied from that source by the installer and
  recorded in `.agents/skills/.provenance.json`.
- Do not hand-edit marketplace-derived skills.
- `port-*` skills, when introduced, are tracked local source and are excluded
  from marketplace provenance. Refresh tooling must preserve them and must not
  overwrite or prune them.
- Portfolio code and tests must not import executable implementation from
  `.agents/skills/` or a user-level skill cache.
- The marketplace refresh is a local agent check. It is not a GitHub Actions
  dependency, but it is a completion gate for marketplace-backed changes.

## Mesh and routing

Every active doctrine document must be reachable from an applicable
`AGENTS.md`. When a doctrine, guide, runbook, skill lane, or tooling surface is
added, moved, or removed, update the nearest router and regenerate the mesh in
the same change.

The generator must respect `.gitignore`, cover tracked in-scope directories,
and treat `.agents/plugins/marketplace-source` as a leaf. It must never emit
indexes inside ignored directories, local-only specs/SDD workspaces, or the
marketplace submodule.

Mesh validation must cover authored links, doctrine reachability, forbidden
legacy homes, generated-index equality, submodule boundaries, and skill
provenance where those surfaces are enabled. Generated indexes are repaired by
the generator, never by hand.

## Publication and readiness

Local file changes, commits, and validation output do not prove completion.
Repository work completes through the authorized branch and PR publication
surface, followed by remote verification. Keep PRs draft until the work,
documentation, mesh, tests, and preflight are complete. Publish only when CI
is expected to pass. The Portfolio PR must remain unmergeable until MARK-336
has landed and the refreshed `repo-worker-base` and `work-mode-router` skills
have been installed and validated here.

## Local completion gate

The hygiene profile is ready for normal website implementation only when:

- `.agents/guides/` is the canonical stage-guide home;
- no stale `.agents/docs/guides/` routing or compatibility tree remains;
- all active doctrine is routed and all authored links resolve;
- local-only and generated custody boundaries are validated;
- the marketplace gitlink is current and does not receive mesh output;
- refresh and mesh check modes are churn-free;
- the platform-appropriate preflight and tests pass;
- MARK-336 has landed and its refreshed derived skills are present;
- the final PR body and validation evidence are honest.
