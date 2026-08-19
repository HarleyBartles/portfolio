# Asset Runbook

Use this runbook when adding, changing, or attributing fonts, images, icons, or other static assets for the portfolio.

## Read first

- `.agents/skills/asset-custody/SKILL.md` for the repo's asset-custody skill.
- `.agents/skills/asset-custody/references/fonts.md` for font sourcing and loading rules.
- `.agents/skills/asset-custody/references/images.md` for image format, sizing, and compression rules.
- `.agents/skills/asset-custody/references/icons.md` for icon set choices and usage.
- `.agents/skills/asset-custody/references/optimization.md` for build-time and CDN optimization.

## Principles

- Prefer open-licensed or self-hosted assets. Do not use assets with unclear licensing.
- Keep asset counts low. One typeface, one icon set, and one image optimization pipeline are usually enough.
- Document the source and license in `.agents/skills/asset-custody/assets/authority/CITATIONS.md` if the asset is vendored.

## Fonts

- Use `next/font` or a self-hosted `@font-face` with a `font-display: swap` strategy.
- Pair no more than one display or serif typeface with one body typeface.
- Follow the `typography-for-the-web` skill for scale, fallback, and loading guidance.

## Images

- Use responsive formats: WebP/AVIF for photographs, SVG for icons and logos.
- Provide `srcset` or use the framework's image component when image width is known at build time.
- Keep source originals in a tracked `assets/` or `public/` directory; do not commit unoptimized raw exports.

## Icons

- Use one icon set consistently. `lucide` is the default for this project.
- Do not mix icon families on the same page or component family.
- Prefer SVG icons to icon fonts for accessibility and weight.

## Optimization

- Optimize images before commit. Use the project's image optimizer or a `tools/run.py` asset command if one exists.
- Keep the total font payload small; subset when possible.
- Verify the asset load budget after adding new assets.

## Handoff

- When an asset is added, leave a note in the PR body with the source URL, license, and optimization performed.
- Update the skill references only if a new asset pattern is discovered or a rule changes.
