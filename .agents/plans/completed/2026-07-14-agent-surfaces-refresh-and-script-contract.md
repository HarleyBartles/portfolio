# Agent Surfaces Refresh and Script Contract Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a single deterministic refresh entrypoint for agent-maintained repo surfaces, backfill existing scripts to the new contract, and establish a durable script authoring policy for future repo work.

**Architecture:** Keep the refresh orchestration in a small Python core and expose it through thin Bash and PowerShell wrappers. Treat `generate_index_mesh` and `install_agent_skills` as the underlying deterministic tasks, preserve them as individually runnable helpers, and make `ci-preflight.ps1` the readiness wrapper that consumes the refresh contract rather than duplicating it.

**Tech Stack:** Python 3, PowerShell, Bash, `unittest`, JSON, existing deterministic repo tooling.

## Execution Confidence

**Rating: 9/10.** The plan defines orchestration order, wrapper parity, helper classifications, readiness integration, generated outputs, and verification evidence at each seam. The only residual uncertainty is platform launcher availability, which the wrapper contract handles explicitly rather than leaving to implementer improvisation.

**Implementer input contract:** Keep Python as the shared core where appropriate, expose Bash and PowerShell peers, preserve direct helper entrypoints, run skills before mesh generation, and keep read-only validation distinct from refresh writes.

## Global Constraints

- `README.md` is human-facing and must not be used as an agent-routing surface.
- `AGENTS.md` files are scoped routing surfaces that tell agents what to read and when.
- `.agents/doctrine/` holds durable doctrine; `.agents/docs/` holds non-doctrine guidance.
- `.agents/superpowers/specs/` is local-only and ignored by git.
- `.agents/superpowers/plans/` is repo-resident and committed.
- The refresh contract must support `--check` and must be deterministic.
- The repo should expose both Bash and PowerShell entrypoints where that makes sense for agent-facing scripts.
- Existing deterministic helpers must remain available after the backfill; the new refresh family should not create a second competing pathway.

---

### Task 1: Add the new refresh orchestration surface

**Files:**
- Create: `scripts/refresh_agent_surfaces.py`
- Create: `scripts/refresh_agent_surfaces.sh`
- Create: `scripts/refresh_agent_surfaces.ps1`
- Modify: `scripts/README.md`
- Modify: `scripts/AGENTS.md`
- Modify: `AGENTS.md`

**Interfaces:**
- Consumes: `scripts/generate_index_mesh.py`, `scripts/install_agent_skills.py`, and repo-local validation conventions.
- Produces: a deterministic refresh entrypoint with `--check` support and shell-specific wrappers.

- [ ] **Step 1: Write the failing tests or runnable assertions for the orchestration contract**

Add focused tests for the orchestration surface, using the lightest existing test framework that fits the repo.

Cover at minimum:

- `--check` reports drift without mutating files;
- normal execution runs the skill refresh before the mesh refresh;
- the wrapper entrypoints pass the same mode through to the Python core;
- the command reports which deterministic surface failed when one step returns non-zero.

If the repo lacks a good place for a Python test module for this behavior, add one under `tests/` with a name that matches the new refresh surface.

- [ ] **Step 2: Implement the orchestration core**

Implement `scripts/refresh_agent_surfaces.py` as the portable orchestration core.

The core should:

- accept `--check`;
- call the skill check/write path first;
- call the mesh check/write path second;
- stop on the first failure;
- emit clear surface-scoped status text;
- avoid duplicating mesh or skill logic directly.

Keep the core small and explicit. It should orchestrate existing deterministic helpers, not reimplement them.

- [ ] **Step 3: Add thin Bash and PowerShell wrappers**

Implement `scripts/refresh_agent_surfaces.sh` and `scripts/refresh_agent_surfaces.ps1` as thin launchers for the Python core.

The wrappers should:

- pass through `--check` / `-Check`;
- not replicate refresh logic;
- stay consistent with the existing script style in `scripts/`.

- [ ] **Step 4: Update the script catalog and routing surfaces**

Update `scripts/README.md`, `scripts/AGENTS.md`, and the root `AGENTS.md` so agents know:

- the new refresh command is the preferred way to refresh deterministic surfaces;
- `generate_index_mesh` and `install_agent_skills` remain available as helpers;
- `ci-preflight.ps1` is the readiness wrapper, not the refresh surface.

- [ ] **Step 5: Verify the new surface**

Run:

```powershell
python scripts/refresh_agent_surfaces.py --check
.\scripts\refresh_agent_surfaces.ps1 -Check
```

Expected: both commands complete successfully when the repo surfaces are current.

### Task 2: Backfill the existing deterministic scripts to the new contract

**Files:**
- Modify: `scripts/generate_index_mesh.py`
- Modify: `scripts/generate_index_mesh.ps1`
- Modify: `scripts/install_agent_skills.py`
- Modify: `scripts/install_agent_skills.ps1`
- Modify: `scripts/validate_agent_mesh.py`
- Modify: `scripts/validate_agent_mesh.ps1`
- Modify: `scripts/assert_active_worktree.py`
- Modify: `scripts/assert_active_worktree.ps1`
- Modify: `scripts/README.md`
- Modify: `scripts/AGENTS.md`

**Interfaces:**
- Consumes: the new refresh orchestration contract from Task 1.
- Produces: helper scripts that still work directly, but now conform to the repo’s script authoring rules and are clearly documented as helpers or standalone validators.

- [ ] **Step 1: Define the backfill matrix in code and docs**

Update the script catalog so each existing script is classified as one of:

- canonical helper used by the refresh family;
- standalone read-only validator;
- standalone safety guard.

The required classification is:

- `generate_index_mesh` -> canonical helper;
- `install_agent_skills` -> canonical helper;
- `validate_agent_mesh` -> standalone read-only validator;
- `assert_active_worktree` -> standalone safety guard.

- [ ] **Step 2: Align mesh and skill helpers with the new contract**

Update `scripts/generate_index_mesh.py` and `scripts/install_agent_skills.py` so they remain directly runnable and expose the same `--check` semantics the refresh family relies on.

If either helper currently has wrapper or output wording that conflicts with the new contract, fix it now rather than leaving compatibility drift.

- [ ] **Step 3: Keep validators and safety guards standalone**

Verify `scripts/validate_agent_mesh.py` and `scripts/assert_active_worktree.py` still behave as separate commands and do not get folded into the refresh family.

If their wrappers or docs need wording changes to reflect the new repo policy, update them narrowly.

- [ ] **Step 4: Verify helper behavior**

Run:

```powershell
python scripts/generate_index_mesh.py --check
python scripts/install_agent_skills.py --check
python scripts/validate_agent_mesh.py --check
python scripts/assert_active_worktree.py --allow-shared-checkout
```

Expected: the helper checks succeed in a clean current-state repo, and the worktree guard reports the expected checkout state.

### Task 3: Wire preflight and repo readiness to the refresh contract

**Files:**
- Modify: `scripts/ci-preflight.ps1`
- Modify: `.agents/doctrine/workflow-policy.md`
- Modify: `.agents/doctrine/mesh-policy.md`
- Modify: `.agents/doctrine/artifact-policy.md` if needed for discoverability wording
- Modify: `AGENTS.md`
- Modify: `scripts/README.md`

**Interfaces:**
- Consumes: the new refresh family from Task 1 and the backfilled helpers from Task 2.
- Produces: a readiness wrapper that uses the refresh contract and a policy trail that tells agents when to use it.

- [ ] **Step 1: Rewire `ci-preflight.ps1` to consume the refresh family**

Update `scripts/ci-preflight.ps1` so `-Check` performs:

```powershell
.\scripts\refresh_agent_surfaces.ps1 -Check
.\scripts\validate_agent_mesh.ps1 -Check
```

in that order, stopping on the first failure.

Keep the non-`-Check` path aligned with the same readiness baseline if the script already offers one.

- [ ] **Step 2: Update workflow policy wording**

Add or refine the readiness language so it is explicit that:

- agents should run the refresh command before assuming CI will be green;
- `ci-preflight.ps1` is the repo’s readiness wrapper;
- the repo should not rely on hidden state or stale surfaces when deciding whether to publish or hand off.

- [ ] **Step 3: Update mesh and artifact guidance**

Update the mesh and artifact guidance so the repo docs clearly route agents to:

- the new refresh command for deterministic surfaces;
- the helper scripts when direct helper execution is appropriate;
- the preflight wrapper when the question is "am I ready for CI?"

- [ ] **Step 4: Verify the readiness path**

Run:

```powershell
.\scripts\ci-preflight.ps1 -Check
python scripts/refresh_agent_surfaces.py --check
python scripts/validate_agent_mesh.py --check
```

Expected: the repo’s readiness path passes only when the deterministic surfaces are already current.

### Task 4: Regenerate the mesh and close the loop

**Files:**
- Generated: `INDEX.md` files across the repo as needed
- Modify: any docs or routing files that become stale after the refresh contract changes

**Interfaces:**
- Consumes: all prior tasks.
- Produces: updated generated navigation and final verification evidence.

- [ ] **Step 1: Regenerate the generated mesh**

Run:

```powershell
python scripts/generate_index_mesh.py
python scripts/generate_index_mesh.py --check
.\scripts\generate_index_mesh.ps1 -Check
```

Expected: the mesh regenerates cleanly and the check pass confirms there is no drift.

- [ ] **Step 2: Run the full repo preflight bundle**

Run:

```powershell
.\scripts\ci-preflight.ps1 -Check
git diff --check
git status --short
```

Expected: no unexpected diff, no whitespace issues, and a clean or intentionally-documented working tree.

- [ ] **Step 3: Commit the setup slice**

Create a focused commit that captures the refresh contract, backfill, routing updates, and generated mesh changes together.

Use a commit message that makes the repo setup nature obvious, such as:

```bash
git commit -m "chore: add refresh surface contract"
```
