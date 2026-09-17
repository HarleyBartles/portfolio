# Deterministic asset processing

## Use the owning processor

The portfolio's governed image pipelines are repository scripts backed by Sharp, not Vite image plugins. `src/client/package.json` exposes current `media:*:apply` and `media:*:check` commands for the asset families that need deterministic generation.

- `:apply` is the intentional writer.
- `:check` must not rewrite files and should fail when source identity, provenance, derivative bytes, dimensions, or receipts drift from the owning contract.
- Add a new processor only when an asset family genuinely needs deterministic transformation and no current processor owns it.

Inspect the current package scripts before naming a command; do not copy a command from an unrelated asset family.

## Transformation rules

Keep the source master in its owning custody package when reproduction requires it. Let the processor own resizing, cropping/masking, metadata stripping, format encoding, and receipt generation. Check the rendered result at its real display size as well as machine identity; deterministic output can still be visually wrong.

## Runtime cost

Use only the derivative sizes/routes the page needs. Preserve lazy loading and responsive source selection where current components already establish them, and verify the existing build/budget gate after material asset changes.

## Fonts

Font delivery is already deterministic through the installed Fontsource variable packages and `_fonts.scss`. Do not add a separate font optimizer. Changes to subsets, faces, or preloading belong to the typography/font-loading workflow and must preserve licence/source custody.
