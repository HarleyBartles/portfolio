---
name: typography-for-the-web
description: Use when choosing, pairing, scaling, or loading typefaces for the portfolio, or when reviewing typography for readability, performance, and accessibility.
license: MIT
---

# Typography for the web

## Use when

- You are choosing a primary typeface, a secondary typeface, or a monospace face for code.
- You are defining a type scale for headings and body text.
- You are deciding how to load, preload, or subset web fonts.
- You are reviewing typography for hierarchy, measure, line height, or fallback quality.
- A layout feels hard to read or a font choice is being justified by taste alone.

## Core thesis

Good web typography is about reading first, then voice. The reader must get the meaning before the typeface gets the credit. Every choice is a trade-off between legibility, page weight, loading time, and accessibility. Start with what is readable, then add character within the performance budget.

## Type pairing

Use one typeface until a second one earns its place. A second face should solve a real problem: distinguishing headings from body, marking code, or adding deliberate contrast. One typeface can carry a whole portfolio if it has a wide weight range and matching italic. Two faces are the default maximum. Three is a deliberate exception and needs a written reason.

When mixing:

- Pair a neutral sans for UI and body with a distinct serif or display face for headings, or the reverse.
- Do not pair two faces from the same category (two geometric sans-serifs, two slab serifs) unless one is strictly for code or labels.
- Use the second face at scale: headings, labels, or code, not for one-off emphasis.

## Hierarchy

Use no more than three heading treatments. The reader should know where they are after the first two seconds.

- Define a ratio and stick to it. A major-third ratio (1.25) or a perfect-fourth ratio (1.333) works for a portfolio.
- Start the scale from the body size, normally `1rem`.
- Pair larger sizes with tighter line heights; pair body with a generous one.
- Keep the measure between 45 and 75 characters for body text.
- Let whitespace and weight carry hierarchy before you reach for size.

## Font loading

A slow font is a slow sentence. Plan the loading before the font is used.

- Use `font-display: swap` for all `@font-face` blocks that the reader needs to see.
- Preload only the first font files the reader actually sees, normally the regular and bold weights of the body face.
- Subset to `latin` unless the portfolio needs other languages; subset removes unused glyphs and cuts bytes.
- Prefer variable fonts when you need two or more weights from the same family. One file can cover the range.
- Do not preload more than two font files. Each preload competes with critical CSS and first paint.

## Fallbacks

The web is not one font. Plan for the moment before the custom font loads and the moment it does not load at all.

- Build a system font stack that matches the category and feel of the chosen face.
- Use metric-compatible or near-metric-compatible fallbacks and `size-adjust` in `@font-face` to reduce layout shift.
- `font-display: swap` produces a Flash of Unstyled Text (FOUT). Accept it for body and headings because content must render. Do not hide text waiting for a font (FOIT).
- Test fallbacks by blocking the font URL in DevTools and measuring layout shift.

## Upstream

This skill consumes two upstream contracts:

- The master spec that chartered this foundation work: [`.agents/specs/2026-08-12-portfolio-premium-epic-spec.md`](../../specs/2026-08-12-portfolio-premium-epic-spec.md).
- The umbrella taste skill this typography work supports: [`designing-premium-sites`](../designing-premium-sites/SKILL.md).

## Reference routes

| Concern | Read this |
|---|---|
| Which typefaces work together? | [references/type-pairing.md](./references/type-pairing.md) |
| What scale and measure should I use? | [references/hierarchy.md](./references/hierarchy.md) |
| How do I load fonts responsibly? | [references/font-loading.md](./references/font-loading.md) |
| What are the fallback rules and stacks? | [references/fallbacks.md](./references/fallbacks.md) |

## Working rules

1. Self-host fonts when the project needs full control over subsets, caching, and headers. Use a CDN only when the license is clear, the subset is available, and the request budget has been measured.
2. Test font loading on a throttled connection. Time to first readable text matters more than time to full font weight.
3. Check the same page with the custom font blocked, with `prefers-reduced-motion` on, and at 200% zoom.
4. Record every non-system font choice, its source, and its license in the [asset custody](../asset-custody/SKILL.md) for the project.
