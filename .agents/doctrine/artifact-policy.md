# Artifact Policy

Use this reference when creating repo artifacts, temporary notes, or planning outputs.

## Where Things Belong

- Root `README.md` is for humans.
- Root `AGENTS.md` is for routing pointers and repo-wide guidance.
- `INDEX.md` files are generated navigation surfaces.
- `.agents/docs/` is for durable non-doctrine guidance such as workflow guides.
- `.agents/doctrine/` is for durable doctrine such as policies, contracts, and rule sets.
- `.agents/runbooks/` is for workflow guides such as design, planning, implementation, and review.
- `.agents/runbooks/` is the optional home for repeatable Portfolio procedures that are not skills.
- `.agents/plugins/` is for the repo-local plugin manifest and pinned marketplace source.
- `.agents/skills/` contains repo-owned skills (unprefixed unless they are a repo-specific
  override or variant of a shared marketplace skill) and marketplace-derived skills
  described by `.provenance.json`.
- `.agents/plans/` holds in-flight, one-shot, and epic plan surfaces. A completed
  plan remains tracked through its completing PR with the exact
  `completed-awaiting-retirement` marker, then retires in the first commit of the
  next substantive slice under `.agents/doctrine/completed-artifacts.md`.
- `.agents/image-briefs/` holds active repository-bound image-generation briefs.
  Image briefs are generation execution inputs, not implementation plans, and
  must not be filed under `.agents/plans/`. Keep a brief live while generation
  or iteration is still active. Mark it `completed-awaiting-retirement` only
  when it has produced the accepted asset or asset set it was intended to
  produce, or when the brief has been explicitly abandoned. Scratch, rejected,
  or still-under-review candidates do not make a brief disposable. Keep a
  completed brief tracked through the completing PR, then retire it in the
  first commit of the next substantive slice under
  `.agents/doctrine/completed-artifacts.md`.
- `.agents/plans/<epic-name>/` holds a multi-plan epic roadmap and its plans while the
  epic is in flight. Completed child plans follow the same two-slice lifecycle unless
  they remain actively required by the in-flight roadmap.
- `.agents/specs/` holds in-flight design specs and is tracked. Completed specs follow
  the same two-slice lifecycle after enduring decisions are promoted to current
  doctrine or ADRs.
- Optional convenience copies of completed planning artifacts may live only in the
  central disposable `_agent-scratch/<repo-name>/completed/` store described by
  `.agents/doctrine/completed-artifacts.md`; they are not evidence.
- `.agents/sdd/` is a legacy, ignored local-only workspace. New SDD outputs and
  temporary execution artifacts live outside the repo tree per
  `.agents/doctrine/non-repo-locations-policy.md`.

## Scratch Files

- Do not create scratch files at repo root.
- Do not commit temporary notes, review drafts, or session artifacts in product source folders.
- Keep temporary scratch in the canonical off-repo `_agent-scratch` workspace described by
  `.agents/doctrine/non-repo-locations-policy.md`.

## Change Hygiene

- If a change adds or moves a repo-resident artifact surface, update the mesh and the relevant guidance in the same change.
- If a doc is meant to be local-only, make that explicit in the policy and the ignore rules.
