# Artifact Policy

Use this reference when creating repo artifacts, temporary notes, or planning outputs.

## Where Things Belong

- Root `README.md` is for humans.
- Root `AGENTS.md` is for routing pointers and repo-wide guidance.
- `INDEX.md` files are generated navigation surfaces.
- `.agents/docs/` is for durable non-doctrine guidance such as workflow guides.
- `.agents/doctrine/` is for durable doctrine such as policies, contracts, and rule sets.
- `.agents/docs/guides/` is for workflow guides such as design, planning, and implementation.
- `.agents/superpowers/plans/` is for repo-resident implementation plans.
- `.agents/superpowers/specs/` is a local-only scratch space and is ignored by git.

## Scratch Files

- Do not create scratch files at repo root.
- Do not commit temporary notes, review drafts, or session artifacts in product source folders.
- If you need local scratch space, keep it outside the repo or in a git-ignored path.

## Change Hygiene

- If a change adds or moves a repo-resident artifact surface, update the mesh and the relevant guidance in the same change.
- If a doc is meant to be local-only, make that explicit in the policy and the ignore rules.
