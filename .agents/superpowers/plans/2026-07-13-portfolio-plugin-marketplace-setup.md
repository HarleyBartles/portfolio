# Portfolio Plugin Marketplace Setup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establish a deterministic, repo-local Codex plugin marketplace and skill refresh flow for the portfolio repository without adding application scaffolding.

**Architecture:** Keep `.agents/plugins/marketplace.json` as the source manifest, pin `.agents/plugins/marketplace-source` as the upstream marketplace submodule, and make `scripts/install_agent_skills.py` the only writer for `.agents/skills/` and its provenance. The mesh should expose the new plugin and skill surfaces from the root router and generated `INDEX.md` files, while validation stays check-mode driven and deterministic.

**Tech Stack:** Git submodules, Python 3, PowerShell, JSON, `unittest`, generated `INDEX.md` mesh.

## Execution Confidence

**Rating: 9/10.** The plan names the source, derived-output, routing, validation, and publication seams an implementer must coordinate, with explicit file ownership and acceptance commands. The remaining uncertainty is limited to external submodule availability and does not require the implementer to invent repository architecture.

**Implementer input contract:** Treat the manifest and pinned gitlink as source truth, keep Wild Bunch-specific assets excluded, materialize only selected skills, preserve check-mode determinism, and do not scaffold application code.

## Global Constraints

- `.agents/plugins/marketplace.json` is source, not a loose inventory.
- `.agents/plugins/marketplace-source` is a git submodule pinned to `HarleyBartles/agent-asset-marketplace.git`.
- `.agents/skills/` is derived output, not source of truth.
- `.agents/skills/.provenance.json` records the current marketplace submodule SHA and synced plugin list.
- The default-installed plugin set is exactly: `repo-worker-pack`, `superpowers-plus`, `architecture-pack`, `frontend-pack`, `dotnet-kit`.
- Testing coverage comes from the projected skills inside `dotnet-kit` and `frontend-pack`, not from a standalone `testing` plugin.
- Wild Bunch-specific plugins do not belong in this repository.
- The installer script must read the manifest, copy only default-installed skill trees, detect collisions deterministically, and support both `--check` and `--force`.
- The implementation must not scaffold application code for ASP.NET Core, React, authentication, or deployment.

---

### Task 1: Add the marketplace source surface and routing

**Files:**
- Create: `.agents/plugins/AGENTS.md`
- Create: `.agents/plugins/marketplace.json`
- Create: `.agents/plugins/marketplace-source` as a git submodule
- Modify: `AGENTS.md`
- Modify: `.agents/doctrine/artifact-policy.md`
- Modify: `.agents/doctrine/mesh-policy.md`
- Generated: `.agents/INDEX.md`
- Generated: `.agents/plugins/INDEX.md`

**Interfaces:**
- Consumes: the repo router, the doctrine rules for artifact placement and mesh discovery, and the marketplace submodule remote.
- Produces: a repo-local plugin routing surface that points at the manifest and the submodule, plus a manifest that names the default-install plugin set and source coordinates.

- [ ] **Step 1: Write the routing surface and manifest**

Create `.agents/plugins/AGENTS.md` with `use when` pointers to:

```md
- `.agents/plugins/marketplace.json` for the repo-local plugin manifest.
- `.agents/plugins/marketplace-source` for the pinned marketplace source tree.
- `.agents/skills/INDEX.md` after skill materialization, when checking the derived surface.
```

Create `.agents/plugins/marketplace.json` with the exact default-installed plugin names:

```json
{
  "repo": "portfolio",
  "display_name": "Portfolio",
  "default_plugins": [
    "repo-worker-pack",
    "superpowers-plus",
    "architecture-pack",
    "frontend-pack",
    "dotnet-kit"
  ]
}
```

Each plugin entry must carry source coordinates that resolve into the marketplace submodule, and the manifest must explicitly exclude `wild-bunch-project-pack`.

- [ ] **Step 2: Add the marketplace submodule**

Add `.agents/plugins/marketplace-source` as a git submodule whose remote is `HarleyBartles/agent-asset-marketplace.git`.

Use the submodule as the canonical source for copied skill directories. Do not hand-maintain copied skills in `.agents/skills/` as source of truth.

- [ ] **Step 3: Route the new surfaces through the mesh**

Update `AGENTS.md` so the root routing surface explicitly points agents at:

```md
- `.agents/plugins/AGENTS.md` before any plugin or marketplace-source work.
- `.agents/doctrine/mesh-policy.md` before changing hidden agent surfaces.
```

Update `.agents/doctrine/artifact-policy.md` and `.agents/doctrine/mesh-policy.md` so they clearly classify:

- `.agents/plugins/marketplace.json` as source.
- `.agents/plugins/marketplace-source` as pinned upstream source.
- `.agents/skills/` as derived output.
- `.agents/skills/.provenance.json` as the sync receipt.

- [ ] **Step 4: Regenerate and verify the mesh**

Run:

```powershell
py -3 scripts/generate_index_mesh.py
py -3 scripts/generate_index_mesh.py --check
git diff --check
```

Expected: a success line beginning with `Wrote index mesh:` from the write pass, then a success line beginning with `OK index mesh:` from the check pass.

The regenerated mesh must include `.agents/plugins/INDEX.md` and the `.agents/` directory listing must surface the new plugin subtree.

### Task 2: Implement deterministic skill installation with tests

**Files:**
- Create: `scripts/install_agent_skills.py`
- Create: `scripts/install_agent_skills.ps1`
- Create: `tests/test_install_agent_skills.py`
- Modify: `scripts/AGENTS.md`
- Modify: `scripts/README.md`

**Interfaces:**
- Consumes: `.agents/plugins/marketplace.json`, the pinned submodule at `.agents/plugins/marketplace-source`, and a destination root at `.agents/skills/`.
- Produces: copied default-installed skill directories, `.agents/skills/.provenance.json`, and deterministic exit codes for `--check` and `--force`.

- [ ] **Step 1: Define the script contract and failing tests**

Create the installer module with these callable surfaces:

- `load_manifest(path: Path) -> MarketplaceManifest`
- `sync_default_skills(manifest: MarketplaceManifest, source_root: Path, output_root: Path, *, check: bool = False, force: bool = False) -> SyncResult`
- `write_provenance(output_root: Path, result: SyncResult) -> None`

Write `tests/test_install_agent_skills.py` with failing tests for:

- `test_sync_copies_default_plugins(tmp_path)`
- `test_check_reports_drift_without_mutating(tmp_path)`
- `test_collision_policy_is_deterministic(tmp_path)`
- `test_provenance_records_source_sha_and_plugin_list(tmp_path)`

Run:

```powershell
py -3 -m unittest tests.test_install_agent_skills -v
```

Expected: the tests fail until the installer exists.

- [ ] **Step 2: Implement the minimal installer**

Implement the script so it:

- reads the manifest;
- resolves only the default-installed plugin roots from the submodule;
- copies each selected skill tree into `.agents/skills/`;
- writes `.agents/skills/.provenance.json` with the source SHA and copied plugin list;
- reports collisions deterministically instead of silently overwriting;
- returns a non-zero exit code when `--check` finds drift;
- returns zero when `--check` matches the on-disk state;
- supports `--force` for re-copying the selected skills.

Keep the PowerShell wrapper thin and delegate all real behavior to the Python module.

- [ ] **Step 3: Make the test suite pass**

Run:

```powershell
py -3 -m unittest tests.test_install_agent_skills -v
py -3 scripts/install_agent_skills.py --check
.\scripts\install_agent_skills.ps1 -Check
```

Expected: exit 0 with a single success line from the test runner.

Update `scripts/AGENTS.md` and `scripts/README.md` so they point agents at the installer and describe the check/force behavior clearly.

### Task 3: Materialize the derived skill tree and generated indexes

**Files:**
- Create or update: `.agents/skills/**`
- Create or update: `.agents/skills/.provenance.json`
- Generated: `.agents/skills/INDEX.md`
- Generated: `.agents/plugins/INDEX.md`
- Generated: `.agents/INDEX.md`
- Modify: `.gitmodules` if the submodule reference changes during setup

**Interfaces:**
- Consumes: the manifest, the marketplace submodule, and the installer from Task 2.
- Produces: the repo-resident skill tree that future agents can read directly, plus the generated indexes that expose it.

- [ ] **Step 1: Materialize the selected skills**

Run the installer against the pinned submodule so `.agents/skills/` contains only the default-installed plugin skill trees.

Do not hand-edit the copied skill files. If the source changes, re-run the installer instead.

- [ ] **Step 2: Capture provenance**

Ensure `.agents/skills/.provenance.json` records the marketplace submodule SHA and the exact plugin list copied into the repo.

The provenance file must make it obvious when the derived skill tree is stale.

- [ ] **Step 3: Regenerate the hidden-surface mesh**

Run:

```powershell
py -3 scripts/generate_index_mesh.py
py -3 scripts/generate_index_mesh.py --check
.\scripts\generate_index_mesh.ps1 -Check
py -3 scripts/install_agent_skills.py --check
```

Expected: a success line beginning with `Wrote index mesh:`, a success line beginning with `OK index mesh:`, and a success line from the installer check.

The generated `.agents/skills/INDEX.md` must list the copied skill directories, and `.agents/plugins/INDEX.md` must list the manifest and the submodule.

### Task 4: Wire validation and publication rules to the new setup

**Files:**
- Modify: `.agents/doctrine/validation-policy.md`
- Modify: `scripts/ci-preflight.ps1`
- Modify: `.github/workflows/ci.yml`
- Modify: `.agents/doctrine/workflow-policy.md` if the publish/readiness wording needs to mention the marketplace setup branch lifecycle

**Interfaces:**
- Consumes: the installer check from Task 2 and the repo's existing preflight flow.
- Produces: a local-and-CI validation path that verifies the marketplace manifest, derived skill tree, and mesh before publication.

- [ ] **Step 1: Add the installer check to the validation baseline**

Update `.agents/doctrine/validation-policy.md` so the minimum setup validation includes the installer `--check` path alongside the mesh checks.

The validation policy should explicitly say that the marketplace setup is not complete until the manifest, submodule, skill tree, and provenance are all in agreement.

- [ ] **Step 2: Fold the installer into the preflight script**

Update `scripts/ci-preflight.ps1` so it runs:

```powershell
.\scripts\generate_index_mesh.ps1 -Check
.\scripts\install_agent_skills.ps1 -Check
```

in that order, and exits on the first failure.

- [ ] **Step 3: Keep CI aligned with draft/publication state**

Ensure `.github/workflows/ci.yml` runs the preflight only for published PRs and direct pushes to `main`, not draft PRs.

If `workflow-policy.md` needs a wording tweak for the marketplace setup branch, keep it narrow: draft PR while work is in progress, publish only after the work is done and the local preflight is passing.

- [ ] **Step 4: Re-run the repo validation bundle**

Run:

```powershell
.\scripts\ci-preflight.ps1 -Check
py -3 scripts/generate_index_mesh.py --check
py -3 scripts/install_agent_skills.py --check
git diff --check
git status --short
```

Expected: success lines beginning with `OK index mesh:` and `OK`.

No task is complete until the derived skill tree, the mesh, and the validation path all agree on the same source state.
