# Portfolio Plugin Marketplace Setup Design

**Goal:** Establish a deterministic, repo-local Codex plugin marketplace and skill refresh flow for the portfolio repository without adding application scaffolding.

**Architecture:** The repository will carry a small `.agents/plugins/marketplace.json` manifest that names the plugins this portfolio repo should expose by default. The actual plugin source will live in a git submodule at `.agents/plugins/marketplace-source`, pinned to `HarleyBartles/agent-asset-marketplace`, and a deterministic installer script will materialize the selected skill directories into `.agents/skills/`. The skill directory is derived output, not source of truth.

**Scope:** This setup is for repository initialization only. It does not create the portfolio application, backend host, frontend app, authentication, or deployment plumbing.

## Context

The portfolio repository is a new, intentionally small workspace for Harley Bartles' personal developer site. The site will eventually host project showcases, technical writing, and a simple ASP.NET Core + React frontend, but today’s work is only the repository setup needed to support future agent tooling and deterministic skill refreshes.

The Wild Bunch repository already uses the desired pattern:

- a repo-local marketplace manifest at `.agents/plugins/marketplace.json`;
- a git submodule at `.agents/plugins/marketplace-source`;
- a deterministic skill install script that copies selected plugin skills into `.agents/skills/`;
- provenance tracking for the generated skill tree.

This repository should mirror that structure, but only with plugin selections relevant to a portfolio website.

## Proposed Repository Shape

### Source and derived surfaces

- `.agents/plugins/marketplace.json`: source manifest for the repo-local plugin set.
- `.agents/plugins/marketplace-source`: git submodule pointing at `HarleyBartles/agent-asset-marketplace`.
- `.agents/skills/`: generated skill output copied from the marketplace submodule.
- `.agents/skills/.provenance.json`: deterministic provenance record for the current skill sync.
- `scripts/install_agent_skills.py`: deterministic sync script that reads the manifest and copies the selected skill directories into `.agents/skills/`.
- `scripts/install_agent_skills.ps1`: thin PowerShell wrapper around the Python script for Windows convenience.

### Navigation mesh

If the repository adopts local index coverage for hidden agent surfaces, the following indexes should be added or regenerated with the existing repo mesh conventions:

- `.agents/INDEX.md`
- `.agents/plugins/INDEX.md`
- `.agents/skills/INDEX.md`

These should remain navigational only and should not become documentation dumps.

## Default Plugin Set

The repo-local marketplace manifest should include only plugins relevant to building and validating a portfolio website:

- `repo-worker-pack`
- `superpowers-plus`
- `architecture-pack`
- `frontend-pack`
- `dotnet-kit`
- `testing`

The manifest should not include Wild Bunch-specific packages, especially `wild-bunch-project-pack`.

## Behavioural Contract

### Marketplace manifest

The manifest should describe:

- repository name and display name;
- the plugin list;
- each plugin's source coordinates pointing into the marketplace submodule;
- a policy that keeps these plugins installed by default;
- notes that explain the repo-local purpose of the marketplace surface.

The manifest should stay narrow and readable. It is a setup surface, not a generic plugin catalog.

### Git submodule

The submodule should pin the Marketplace source tree at `.agents/plugins/marketplace-source` and use the `HarleyBartles/agent-asset-marketplace.git` repository as its remote.

The repository should treat that submodule as the canonical source for copied skills. Skill content should never be hand-maintained in `.agents/skills/` when it can be derived from the submodule.

### Deterministic install script

The install script should:

- read `.agents/plugins/marketplace.json`;
- verify the marketplace submodule exists and contains the expected plugin tree;
- copy only the `INSTALLED_BY_DEFAULT` plugin skills into `.agents/skills/`;
- skip or report collisions deterministically;
- write provenance for the current submodule SHA and synced plugin list;
- support a `--check` mode that reports drift without mutating files;
- support a `--force` mode for re-copying the selected skills.

The PowerShell wrapper should remain thin and delegate all real behavior to the Python script.

## Operational Flow

The intended refresh flow is:

1. Update the marketplace submodule when a new upstream skill snapshot is desired.
2. Run the deterministic installer to copy the default-installed skills into `.agents/skills/`.
3. Run the installer in `--check` mode to confirm the generated surface is stable.
4. Update the repo index mesh if any directories or tracked surfaces changed.
5. Commit the manifest, submodule pointer, derived skill tree, and any supporting index updates together.

## Constraints

- Keep the portfolio repository intentionally simple.
- Do not add application scaffolding as part of this setup.
- Do not include Wild Bunch-specific marketplace plugins here.
- Do not hand-edit derived skill content when the source submodule can regenerate it.
- Preserve existing patterns once established.
- Keep documentation current when the hidden agent surfaces are added or changed.

## Validation

The setup should be considered complete only when the following can be shown:

- the repo-local marketplace JSON is valid;
- the submodule path is present and pinned;
- the install script can materialize `.agents/skills/` deterministically;
- `--check` mode reports no drift after a clean sync;
- the working tree is clean after the setup files are committed.

## Notes

This design deliberately keeps the repository’s agent tooling aligned with the Wild Bunch pattern while staying focused on the portfolio domain. The result should feel intentional, not scaffold-heavy.
