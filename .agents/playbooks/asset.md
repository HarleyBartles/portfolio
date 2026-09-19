# Asset Playbook

Use this playbook when adding, changing, generating, attributing, replacing, or removing Portfolio static assets.

## When

- Working with fonts, images, icons, screenshots, diagrams, or other static assets.
- Changing an asset's source identity, rights, deterministic derivative, or production consumer.

## Required skills

- `asset-custody` for source identity, rights, transformation, and removal decisions.
- `typography-for-the-web` when font selection, loading, fallback, or type behavior changes.
- `verification-before-completion` before custody or production-readiness claims.

## Composition

1. Discover the current source master, derivative, consumer, manifest/receipt, and rights owner.
2. Apply `asset-custody` and any specialized capability relevant to the asset family.
3. For a selected generated image, invoke the generated-image custody playbook before page use.
4. Produce derivatives only through the owning deterministic processor and verify them with its check path.

## Doctrine and contracts

- `docs/asset-custody.md` is the current production custody record.
- [`../doctrine/artifact-policy.md`](../doctrine/artifact-policy.md) constrains artifact placement.

## Local commands and paths

- Inspect `src/client/package.json` for the owning `media:*:apply` and `media:*:check` commands instead of assuming a generic image pipeline.
- Preserve exact source masters where reproduction custody requires them.
- Reuse current semantic icon/components before introducing new libraries.

## Evidence contract

- Source identity, rights, derivative lineage, owning receipt/manifest, and current consumer agree.
- Deterministic derivatives reproduce from the retained source and pass their focused check.
- Removal/replacement updates all current consumers and custody surfaces in the same change.

## Prohibited combinations

- Do not infer missing generated-image metadata.
- Do not silently rewrite reproduction masters.
- Do not introduce framework-specific font loaders or general icon libraries without an explicit need and architecture decision.

## Runbook routing

None.
