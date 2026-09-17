# Asset Runbook

Use this runbook when adding, changing, generating, attributing, replacing, or removing fonts, images, icons, screenshots, diagrams, or other static assets for the portfolio.

## Required skills

- `/using-superpowers-plus` for routing.
- `/asset-custody` for source identity, rights, transformation, and removal decisions.
- `/typography-for-the-web` when the change affects font selection, loading, fallback, or type behaviour.

For a selected generated image, also follow `generated-image-custody.md` before page use.

## Discover the owner first

1. Read `docs/asset-custody.md` for the current production record.
2. Find the source master, public derivative, consuming component/content, and any owning manifest/receipt.
3. Inspect `src/client/package.json` for the current `media:*:apply` / `media:*:check` commands rather than assuming a generic image pipeline.

## Images

- Preserve the exact source master when the asset family requires reproduction custody.
- Generated-image metadata is evidence-bounded; unknown IDs, seeds, dates, prompts, or parents stay unknown rather than being reconstructed.
- Use the owning Sharp processor for deterministic derivatives. Run its `:apply` target only for intended regeneration and its `:check` target for verification.
- Production imagery and active visual-regression baselines are live assets. Historical design-room captures are not live evidence merely because they were once useful during review.

## Fonts

- The client currently self-hosts Source Sans 3, Source Serif 4, and Source Code Pro through Fontsource variable packages and `_fonts.scss`.
- Preserve WOFF2 variable loading, Unicode-range intent, `font-display: swap`, fallback stacks, and licence/source custody.
- Do not add a framework-specific font loader to this Vite application without an explicit architecture change.

## Icons and SVG

- Reuse current semantic components first. `ExternalLink.tsx` owns the site's external-link glyph and accessibility/new-tab contract.
- Keep brand marks, diagrams, and other identity-bearing SVGs as explicit assets under their owning custody when appropriate.
- Do not introduce a general icon library simply to obtain a glyph the repository already owns.

## Removal/replacement

Before removal or replacement, search source, content, metadata, tests, generated route documents where relevant, and public derivatives. Update custody manifests/receipts and current consumers in the same change. For previously accepted generated imagery, follow the supersession rules in `generated-image-custody.md` rather than silently deleting history that remains provenance-relevant.

## Verification

Run the focused owning custody check and affected tests while iterating. The normal tracked commit hook owns the complete repository gate at commit time.
