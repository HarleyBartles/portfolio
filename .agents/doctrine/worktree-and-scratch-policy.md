# Worktree and Scratch Policy

Status: active policy
Owner: Portfolio repository
Scope: git worktrees, linked checkouts, and temporary scratch space
Routed from: `/.devin/rules/agents-doctrine.md`
Generic baseline: installed `repo-worker-base` and its references

Use this policy when creating or using worktrees and scratch space.

## Worktree and scratch locations

Use the Git-derived path contract supplied by `repo-worker-base`:

1. Resolve the current checkout with `git rev-parse --show-toplevel`.
2. Resolve the main checkout through `git rev-parse --git-common-dir`.
3. Resolve the main checkout root from that common Git directory.
4. Derive the external worktree root as `<main-checkout-root>/../_agent-worktrees/<repo-name>`.

Do not use drive letters, current-worktree parent walking,
`Path(__file__).parent` discovery, or assumptions that the current checkout is
main. Keep temporary scratch under a similarly main-checkout-relative
`../_agents-scratch/<branch-name>/` location and never commit it.

## Shared checkout

Mutation must refuse the shared `main` checkout by default. An explicit
`--allow-shared-checkout` may continue only after current human approval and a
prominent warning. It changes no path calculation and never permits a submodule.

## Scratch custody

Keep disposable artifacts under the external scratch root, never inside the
repository. Scratch is external, per-repository, per-branch, disposable, and
never durable custody.
