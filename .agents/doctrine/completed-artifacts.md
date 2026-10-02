# Completed Artifact Custody

## Scope

Completed execution-artifact custody truth for this repository.

## Doctrine

Completed plans, specifications, roadmaps, checkpoints, image-generation briefs, and similar execution artifacts remain tracked through their completing PR so squash-merged `main` records them. They may leave the tracked repository in the first commit of a later substantive slice when current source, delivery evidence, and successor-use needs establish that retirement is appropriate. Git history is the immutable record. A completed artifact is not an authority: do not use it as a source of canonical command sequences, a template for current implementation, or an authoritative example of repo conventions. Completion does not create a durable exception for an artifact type.

Completion markers may help humans discover candidate artifacts, but they are neither required nor sufficient evidence. Assess each artifact's actual outcome, delivery state, active dependencies, and successor use. Preserve active or unpublished work.

An image-generation brief remains live while generation, correction, candidate review, or acceptance is active. It is complete only when it produced the accepted asset or asset set it was meant to produce, or when it was explicitly abandoned. Scratch, rejected, or still-under-review candidates do not make a brief complete.

Any governed artifact abandoned rather than completed must record that decision and its reason before retirement. Abandonment is not inferred from inactivity, scratch output, rejected candidates, or deletion.

Durable content promotes before removal: enduring architecture decisions belong in the repository's declared ADR home; operating rules belong in `.agents/doctrine/`, `.agents/runbooks/`, or `.agents/playbooks/`.

## Ownership

The `completing-planning-artifacts` skill owns the lifecycle. `cleanup-custody` owns ambiguous classification and promotion-before-removal decisions. Planning and PR runbooks bind these workflows to repository paths. Current conventions live in `.agents/doctrine/*.md`, `.agents/runbooks/*.md`, `.agents/playbooks/*.md`, and active plans and specs.
