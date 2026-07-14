# Workflow Policy

Use this reference when managing git workflow, claiming completion, or deciding whether a task is ready to hand off.

## Worktree, Branch, and Publication

- Use an isolated worktree when a task needs to stay separate from other in-flight work.
- Keep the worktree aligned to one branch at a time.
- Start from the current `main` branch unless a task says otherwise.
- Use a branch for real work; do not treat direct `main` edits as the default path.
- Before mutating files on a branch task, assert that you are in the intended linked worktree; stop if the shared checkout is active.
- Keep in-progress work in draft until the task is actually complete.
- Raise a draft PR for work that is meant to be reviewed or handed off through GitHub.
- Keep the draft PR fresh with the actual branch state and validation status.
- Only publish the PR when all work is done and the local preflight has passed so CI is expected to pass.
- For marketplace or derived-skill work, do not publish until the manifest, submodule, derived skills, provenance, and mesh validation all agree.
- Do not claim a merge, publish, or closeout happened unless the repo and the remote state prove it.
- If a task asks for direct `main` work, use it only for that task and keep the proof explicit.

## Readiness

- A task is not ready just because files changed.
- Before assuming CI will be green, run the repo-facing refresh command so the deterministic agent surfaces are current.
- Use `.\scripts\ci-preflight.ps1` as the repo's readiness wrapper when the question is "am I ready for CI?"
- Before claiming ready, verify the expected docs, mesh, and validation state for the slice you touched.
- Before publishing a PR, verify the local preflight and branch state so the published CI run is expected to pass.
- Do not rely on hidden state, stale derived skills, or stale generated navigation when deciding to publish or hand off work.
- Do not present a stale plan, stale README, or stale AGENTS pointer as current truth.

## Clean Finish

- End with a clean working tree unless the task explicitly leaves a tracked draft behind.
- Report the exact files changed and the exact validation run.
- If cleanup is part of the task, perform it explicitly and verify it.
