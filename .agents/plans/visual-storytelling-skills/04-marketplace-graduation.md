# Plan 4: Marketplace graduation and consumer rollout

> **For agentic workers:** This is a custody migration, not a copy operation.
> Preserve the Portfolio source until the marketplace package is validated and
> reviewable. Use the marketplace repo's current standards and generators.

**Goal:** Promote the field-tested `directing-visual-stories` and
`generating-images` skills into canonical Agent Asset Marketplace plugin custody,
then prepare consumer projections for Portfolio, Adventures, and Wild Bunch.

## Gate and boundaries

- The Portfolio field trial is complete in commit `8f46b37`; use its notes and
  actual accepted Silk evidence as the promotion evidence.
- `generating-images` is a source-backed Apache-2.0 derivative and must retain its
  upstream snapshot, licence, notice, authority, and source map.
- `directing-visual-stories` is first-party synthesis with citable sources and no
  vendored protected media.
- Marketplace owns canonical skill source and bundle manifests; consumer repos
  receive generated projections only. Do not delete Portfolio custody until a
  verified marketplace PR exists and the consumer refresh path is proven.
- Keep PRs draft during validation. Do not claim marketplace publication or
  consumer installation from a local copy.

## Task 1: Prepare marketplace source

In a fresh marketplace worktree from updated `main`, choose the smallest suitable
plugin pack (or a new visual-storytelling pack only if existing pack ownership is
not appropriate). Add both skills through the marketplace's canonical source and
bundle-manifest workflow, not by editing installed projections. Convert local
authority paths and hashes to the marketplace validator's portable form; preserve
the derivative notice and exact source snapshot. Record Portfolio field evidence
as provenance, not as a marketplace authority source.

## Task 2: Validate and publish a draft marketplace PR

Run the marketplace's canonical inventory, marketplace generation, authority,
bundle, mesh, and complete CI checks. Inspect generated plugin manifests,
`bundle-manifest.json`, repo indexes, zips, and licence notices. Open a draft PR
with source/derivative boundaries, field evidence, validation output, and explicit
consumer refresh instructions. Stop if authority, legal, or pack ownership is
ambiguous.

## Task 3: Consumer projections

After the marketplace source PR is reviewable, refresh Portfolio from that source
and prepare matching projection changes for Adventures and Wild Bunch. Verify
exact skill names, source revisions, generated indexes, and local manifest custody.
Do not alter product UI merely to demonstrate installation; the next real visual
slice in each repo is the behavioural consumer proof.

## Closeout

Update this roadmap with marketplace PR and projection evidence only after the
systems prove it. A failed or deferred marketplace review leaves the skills safely
incubated in Portfolio and is a blocker for this plan, not a reason to weaken the
authority boundary.

## Current handoff

The marketplace pack is prepared in draft PR
`https://github.com/HarleyBartles/agent-asset-marketplace/pull/319` at commit
`1374ea7e9`. Marketplace inventory, generation, repo-index, mesh, shared-reference,
and complete hooked CI checks passed. The PR remains draft pending marketplace
review; no consumer projection or canonical-custody claim is made here.
