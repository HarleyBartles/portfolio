# Portfolio Local Doctrine and Stage Guides Plan

**Spec:** `.agents/superpowers/specs/2026-07-18-portfolio-local-doctrine-and-stage-guides-design.md`

**Implementer confidence:** 9/10. The plan names the migration, custody,
routing, tooling, test, and external refresh seams. The only external state is
the MARK-336 publication gate, which is intentionally a completion dependency,
not an implementation blocker.

## Outcome

Portfolio will consume the generic MARK-336 worker and Superpowers composition
contract while owning only its local doctrine, stage guides, artifact homes,
mesh rules, and optional `port-*` skill lane.

## Preflight and completion gate

Before mutation, record the active worktree and branch using the repository
identity commands in `AGENTS.md`. Work only in the existing dedicated linked
worktree `codex/portfolio-planning-continuation`; preserve its pre-existing
staged changes.

Execution may start from the current pinned marketplace revision. Do not merge
or close the Portfolio work until all of these are true:

1. MARK-336 has landed in `agent-asset-marketplace`.
2. The Portfolio submodule pointer has been refreshed to that revision.
3. `scripts/refresh_agent_surfaces.ps1 -Check` or the Bash peer passes.
4. The installed `repo-worker-base` and `work-mode-router` surfaces contain the
   expected `.agents/guides/` routing and composition contract.
5. Portfolio preflight and tests pass after the final refresh.

Until then, keep the Portfolio PR draft and state the gate honestly.

## Task 1: Replace the local hygiene policy draft

**Files:**

- `.agents/doctrine/repository-hygiene-layout-policy.md`
- `.agents/doctrine/AGENTS.md`
- `AGENTS.md`

Replace the earlier `repo-hygiene-layout-policy.md` draft with a Portfolio
overlay that:

- states that MARK-336 owns portable worker behavior;
- defines Portfolio's local homes and forbidden legacy homes;
- distinguishes doctrine, guides, runbooks/playbooks, skills, scripts, plans,
  generated surfaces, and local-only artifacts;
- defines the main-checkout-derived worktree and scratch path contract without
  absolute machine paths;
- requires source/derived/publication evidence boundaries;
- records the local `port-*` skill lane without creating a skill now;
- includes the adoption and completion gate;
- carries status, scope, owner, authority, and router metadata.

Use `repository-hygiene-layout-policy.md` as the canonical filename. Update
all links from the earlier shorter filename in the same change.

## Task 2: Migrate stage guides to the MARK-336 home

**Files:**

- Move `.agents/docs/guides/AGENTS.md` to `.agents/guides/AGENTS.md`.
- Move the four existing stage guides and their index to `.agents/guides/`.
- Update `.agents/docs/AGENTS.md` to remove the retired guide-home pointers.
- Update all guide self-references from `.agents/docs/guides/` to
  `.agents/guides/`.
- Update root `AGENTS.md` to route design, planning, implementation, and
  review work through `.agents/guides/AGENTS.md`.

Do not retain `.agents/docs/guides/` as a compatibility directory or create an
empty replacement tree. The nearest guide router must remain thin and point to
the four stage guides using read-when language.

## Task 3: Align local doctrine and artifact policies

**Files:**

- `.agents/doctrine/artifact-policy.md`
- `.agents/doctrine/mesh-policy.md`
- `.agents/doctrine/validation-policy.md`
- `.agents/doctrine/script-contract-policy.md`
- `.agents/skills/AGENTS.md`
- `scripts/AGENTS.md`
- `scripts/README.md` only where the local skill custody or refresh behavior
  changes the human catalog

Update only the local deltas:

- `.agents/guides/` is the canonical stage-guide home.
- `.agents/docs/runbooks/` is an optional future home for real repo-specific
  operational procedures; do not create it empty.
- `.agents/skills/port-*/` is tracked repository-owned capability custody.
- Other installed skill directories are marketplace-derived and provenance
  controlled.
- The marketplace source remains a gitlink boundary and never receives mesh
  files.
- README remains human-facing; AGENTS remains routing; INDEX remains generated.
- Plans remain tracked; specs and SDD material remain ignored.

Do not restate the generic MARK-336 references in each local policy. Link to
the relevant local and installed surfaces instead.

## Task 4: Separate marketplace and Portfolio skill custody

**Files:**

- `scripts/install_agent_skills.py`
- `scripts/install_agent_skills.ps1`
- `scripts/install_agent_skills.sh`
- `scripts/refresh_agent_surfaces.py`
- `tests/test_install_agent_skills.py`
- `tests/test_refresh_agent_surfaces.py`

Modify the installer contract so:

- marketplace-selected skills are the only entries written to marketplace
  provenance;
- existing tracked `port-*` directories are preserved in write and check mode;
- local `port-*` directories are never overwritten or pruned;
- unexpected non-`port-*` unmanaged skill directories still fail validation or
  are handled according to the current installer contract;
- case-variant collisions between local and derived skill names fail clearly;
- refresh remains deterministic and produces no diff when source inputs are
  unchanged.

Keep the Python core authoritative and the Bash/PowerShell wrappers thin and
behaviorally equivalent. Add temporary-fixture tests for preservation,
provenance exclusion, collision failure, write-mode refresh, and check-mode
parity. Do not add a real `port-*` skill as part of this setup slice.

## Task 5: Strengthen mesh and doctrine validation

**Files:**

- `scripts/generate_index_mesh.py`
- `scripts/generate_index_mesh.ps1`
- `scripts/generate_index_mesh.sh`
- `scripts/validate_agent_mesh.py`
- `scripts/validate_agent_mesh.ps1`
- `scripts/validate_agent_mesh.sh`
- `tests/test_generate_index_mesh.py`
- `tests/test_validate_agent_mesh.py`

Ensure the existing tooling proves the local contract:

- `.agents/docs/guides/` is not a live canonical home;
- ignored specs/SDD directories are not traversed or indexed;
- the marketplace gitlink remains a leaf boundary;
- active doctrine is reachable from an applicable `AGENTS.md`;
- authored local links resolve;
- generated indexes are current and non-empty where required;
- local `port-*` skills are allowed as tracked authored capability surfaces but
  are not treated as marketplace provenance;
- generated indexes are never hand-authored inside the submodule.

Add tests for the guide migration, ignored-directory behavior, submodule
boundary, doctrine reachability, and local-skill classification. Preserve the
existing churn-free double-generation test.

## Task 6: Regenerate and update authored navigation

After the authored moves and policy changes:

1. Run the platform-appropriate mesh generator in write mode from the linked
   worktree.
2. Inspect the root, `.agents`, `.agents/docs`, `.agents/guides`,
   `.agents/doctrine`, `.agents/skills`, and `scripts` indexes.
3. Run the mesh validator in check mode.
4. Sweep for stale `.agents/docs/guides/` references and the retired policy
   filename.
5. Do not hand-edit generated indexes.

## Task 7: Validate against the incoming Marketplace contract

When MARK-336 lands:

1. Fast-forward the marketplace submodule to the published revision from the
   dedicated Portfolio worktree.
2. Run the deterministic refresh entrypoint in write mode.
3. Confirm the refreshed `repo-worker-base` routes to the local policy and
   `.agents/guides/`.
4. Confirm the refreshed `work-mode-router` uses the required order:
   `work-mode-router -> repo-worker-base -> baseline reference and local guide
   -> Superpowers lane`.
5. Run refresh check mode and verify no generated diff remains.
6. Re-run the local skill custody and mesh tests after refresh.

Do not edit generated skills directly to bridge the pre-publication gap.

## Task 8: Final validation and publication

Run the platform-appropriate commands:

```text
.\scripts\refresh_agent_surfaces.ps1 -Check
.\scripts\generate_index_mesh.ps1 -Check
.\scripts\validate_agent_mesh.ps1 -Check
py -3 -m unittest discover -s tests -v
git diff --check origin/main...HEAD -- . ':(exclude).agents/skills/**'
git status --short
```

Use the Bash peers on Linux. Report skipped checks explicitly.

Before publishing the PR, confirm:

- MARK-336 is landed;
- the submodule and derived skill provenance agree;
- refresh check is clean;
- mesh and doctrine validation pass;
- the PR body describes the gate and actual evidence honestly.

Keep the PR draft until those conditions are met. Merge only after published
CI is green, then remove the branch/worktree according to the local workflow
policy.
