---
name: asset-custody
description: Use when adding, generating, selecting, transforming, attributing, replacing, or removing portfolio fonts, images, icons, diagrams, screenshots, or other static visual assets.
license: MIT
---

# Asset custody

## Core thesis

An asset is usable only when its source, rights, identity, transformation path, and current consumer are truthful. Page code is not provenance. Keep reproduction masters separate from deterministic page derivatives and use the repository's owning processor/check instead of ad hoc optimisation.

## Read first

- [`../../../docs/asset-custody.md`](../../../docs/asset-custody.md) for current production custody records.
- [`../../runbooks/asset.md`](../../runbooks/asset.md) for the repository asset workflow.
- [`../../runbooks/generated-image-custody.md`](../../runbooks/generated-image-custody.md) when a generated image is selected for iteration or production use.

## Images

Before page use, identify the owning source package and record the exact master where that asset family requires source custody. For generated images, preserve the byte-identical selected master and record only generation facts that are genuinely known; never invent a seed, generation ID, prompt, parent, or date to fill a schema.

Create public derivatives through the existing owning script. Current image families use deterministic Sharp processors exposed through `media:*:apply` and `media:*:check` package scripts. `:apply` is the writer; `:check` proves source/provenance/derivative drift without rewriting files.

See [references/images.md](./references/images.md) and [references/optimization.md](./references/optimization.md).

## Fonts

The live site self-hosts Source Sans 3, Source Serif 4, and Source Code Pro through Fontsource variable packages and `_fonts.scss`. Preserve licence/source custody, WOFF2 delivery, declared Unicode range, `font-display: swap`, and the semantic family roles in the portfolio typography contract. Do not introduce another font loading framework for this Vite client.

See [references/fonts.md](./references/fonts.md).

## Icons and marks

Prefer an existing semantic component or a repository-owned SVG asset. The external-link affordance already belongs to `ExternalLink.tsx` as a small inline decorative SVG; reuse that component rather than introducing an icon dependency. Brand marks and diagrams with durable identity remain explicit SVG assets under their owning custody.

See [references/icons.md](./references/icons.md).

## Replacement and removal

Search source, content, metadata, tests, and generated/public derivatives before replacing or deleting an asset. Update the custody record and owning manifest/receipt in the same change. A formerly accepted generated master may need superseded provenance rather than deletion; follow the generated-image runbook.

## Working rules

1. Exact source identity comes before derivative use.
2. Rights/licence/public-use authority must be recorded at the level the asset actually requires.
3. Generated-image provenance is evidence-bounded: known facts are recorded, unknown facts stay explicitly unknown.
4. Deterministic crops, masks, resizes, and format conversions are descendants, not new generation events.
5. Use the owning repository processor and focused `:check`; do not add generic Vite image plugins for an asset family already governed by Sharp scripts.
6. Keep historical design-room captures out of live custody unless a current executable test or production consumer makes them present truth.

## Upstream

This skill supports the current portfolio design contract in [`../../doctrine/portfolio-design-policy.md`](../../doctrine/portfolio-design-policy.md) and the umbrella taste guidance in [`../designing-premium-sites/SKILL.md`](../designing-premium-sites/SKILL.md).
