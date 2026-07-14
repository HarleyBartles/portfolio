# Workflow Policy

Use this reference when managing git workflow, claiming completion, or deciding whether a task is ready to hand off.

## Worktree, Branch, and Publication

- Use an isolated worktree when a task needs to stay separate from other in-flight work.
- Keep the worktree aligned to one branch at a time.
- Start from the current `main` branch unless a task says otherwise.
- Use a branch for real work; do not treat direct `main` edits as the default path.
- Keep in-progress work in draft until the task is actually complete.
- Raise a draft PR for work that is meant to be reviewed or handed off through GitHub.
- Keep the draft PR fresh with the actual branch state and validation status.
- Only publish the PR when all work is done and the local preflight (`scripts/ci-preflight.ps1` or `scripts/ci-preflight.sh`) has passed so CI is expected to pass.
- GitHub Actions does not need to fetch the marketplace source for this repository; derived skill refresh is a local agent check, not a CI check.
- For marketplace or derived-skill work, do not publish until the manifest, submodule, derived skills, provenance, and mesh validation all agree.
- Do not claim a merge, publish, or closeout happened unless the repo and the remote state prove it.
- If a task asks for direct `main` work, use it only for that task and keep the proof explicit.

## Readiness

- A task is not ready just because files changed.
- Before claiming ready, verify the expected docs, mesh, and validation state for the slice you touched.
- Before publishing a PR, verify the local preflight and branch state so the published CI run is expected to pass.
- Do not present a stale plan, stale README, or stale AGENTS pointer as current truth.

## Clean Finish

- End with a clean working tree unless the task explicitly leaves a tracked draft behind.
- Report the exact files changed and the exact validation run.
- If cleanup is part of the task, perform it explicitly and verify it.
