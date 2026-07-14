# Task 1 Report: Refresh Orchestration Surface

## Status

Completed.

## Scope Delivered

- Added `scripts/refresh_agent_surfaces.py` as the portable orchestration core.
- Added `scripts/refresh_agent_surfaces.ps1` and `scripts/refresh_agent_surfaces.sh` as thin wrappers.
- Added focused orchestration tests in `tests/test_refresh_agent_surfaces.py`.
- Updated `scripts/README.md`, `scripts/AGENTS.md`, and `AGENTS.md` so the new refresh family is the preferred repo-facing refresh command.
- Regenerated the affected `INDEX.md` mesh entries for the new script and test surfaces.

## Behavior

- `--check` validates both deterministic surfaces without writing.
- Normal execution refreshes the index mesh first and installed agent skills second.
- The orchestration stops on the first failing surface.
- Failure output names the surface that failed and preserves the failing exit code.
- The PowerShell and Bash wrappers forward `-Check` / `--check` to the Python core.

## Verification

- `py -3 -m unittest`
- `python scripts/refresh_agent_surfaces.py --check`
- `.\scripts\refresh_agent_surfaces.ps1 -Check`

## Self-Review

- Kept the orchestration layer small and delegated all real work to the existing deterministic helpers.
- Left `generate_index_mesh.py`, `install_agent_skills.py`, and `ci-preflight.ps1` behavior intact apart from routing/doc updates.
- Did not stage or overwrite unrelated pre-existing worktree changes.

## Notes / Concerns

- The worktree already contained unrelated changes in `.gitignore` and an untracked planning artifact before this task.
- Regenerating the mesh also touched `.agents/superpowers/plans/INDEX.md` because of that pre-existing untracked plan file. I left that unrelated generated change out of the task commit.
