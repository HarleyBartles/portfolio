# Pull request runbook

Use this runbook for pull-request workflow and publication proof in this repo.

## Before you begin

- Read root [`AGENTS.md`](../../AGENTS.md).
- Read [`.devin/rules/tools.md`](../../.devin/rules/tools.md) for validation commands.
- For visitor-facing changes, read [the portfolio design policy](../doctrine/portfolio-design-policy.md).
- Invoke `/repo-worker-base`.

## When to use

- Preparing a branch for review.
- Creating or updating a PR.
- Providing publication proof for repo work.

## PR instructions

- Work in an isolated worktree on a task branch.
- Run `py -3 tools/run.py ci --check` before pushing.
- Push the branch and open a **draft** PR into `main` unless direct-main work is explicitly authorized.
- Keep the PR in draft while iterating and running local validation.
- Flip to ready for review only after self-review is complete and `py -3 tools/run.py ci --check` passes.
- The PR body must include publication proof.
- Use `.github/pull_request_template.md`; do not delete its design, accessibility, performance, factual, custody, or visual-evidence prompts when they apply.

## Remote CI gate

- This repository currently has no remote CI checks beyond `py -3 tools/run.py ci --check`.
- If a GitHub Actions workflow is added later, update this runbook to require `gh pr checks` to pass after flipping a PR out of draft.


- Open pull requests as **draft**.
- Keep a PR in draft while iterating, running local validation, and performing self-review.
- Only flip a PR out of draft when:
  - self-review is complete,
  - the relevant validation commands pass,
  - the branch is ready for review or merge.
- This repo's CI must not run on draft pull requests. For GitHub Actions, gate `pull_request` workflows so they run only when `github.event.pull_request.draft == false` or on `ready_for_review` activity.
- After flipping a PR to ready, monitor CI and address failures before requesting human review.
- The PR body must include publication proof per root `AGENTS.md`.

## Publication proof

- Local file changes are not repo completion.
- A valid repo-work return must include one of:
  1. an open PR URL with branch name and full head SHA;
  2. a verified direct-main commit SHA when direct-main work was explicitly authorized;
  3. a concrete publication blocker explaining why the local changes could not be pushed or turned into a PR.
- Do not claim GREEN, completion, or issue closure from local paths, local commit hashes, local validation output, or an unpublished branch alone.

## Routing to skills

- `/repo-worker-base` for worktree, branch, and publication boundaries.
- `/using-github-mcp` for PR evidence and GitHub proof.
- `/verification-before-completion` before claiming the PR is green.
