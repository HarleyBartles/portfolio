# Hierarchy

## Type scale

Base body size: `1rem` (assumed `16px` in most browsers).

| Name | Size | Use |
|---|---|---|
| `text-xs` | `0.75rem` | Captions, metadata, timestamps |
| `text-sm` | `0.875rem` | Small body, labels, helper text |
| `text-base` | `1rem` | Default body text |
| `text-lg` | `1.125rem` | Lead paragraphs, large body |
| `text-xl` | `1.25rem` | Minor headings |
| `text-2xl` | `1.5rem` | Section headings |
| `text-3xl` | `1.875rem` | Major section headings |
| `text-4xl` | `2.25rem` | Page title, hero heading |
| `text-5xl` | `3rem` | Hero-only treatments |

The scale stays close to a major-third (1.25) ratio from `text-base` to `text-4xl`. Use `text-5xl` or larger only for hero treatments and never for body-size copy.

## Headings

| Heading | Size | Line height | Weight | Typical use |
|---|---|---|---|---|
| `h1` | `text-4xl` to `text-5xl` | `1.1` to `1.2` | `700` | Page title, hero headline |
| `h2` | `text-3xl` | `1.2` to `1.25` | `600` to `700` | Major sections |
| `h3` | `text-2xl` | `1.25` to `1.3` | `600` | Sub-sections |
| `h4` | `text-xl` to `text-2xl` | `1.3` | `600` | Group headings |
| `h5` | `text-base` to `text-lg` | `1.35` | `600` | Label-like headings |
| `h6` | `text-sm` to `text-base` | `1.35` to `1.4` | `600` | Minor labels |

Use no more than six heading levels in the source, and no more than three visually distinct heading treatments on a single page. If `h5` and `h6` are not different from `h4`, combine them.

## Line height

| Context | Line height | Reason |
|---|---|---|
| Headings | `1.1` to `1.25` | Tight, avoids excessive whitespace between short lines |
| Body | `1.5` to `1.7` | Longer lines need more room |
| Captions / small text | `1.4` to `1.5` | Slightly tighter to keep the block compact |
| Code | `1.5` | Fits ascenders and descenders without overlap |

## Measure

- Aim for 45 to 75 characters per line for body text.
- Use `max-width: 70ch` as the default reading measure.
- On large screens, cap long-form text at `75ch`.
- Do not let body lines exceed `85ch` at any breakpoint.

## Letter spacing

- Body text: `0` (default).
- Large headings: `-0.02em` to `-0.03em`.
- Small caps, labels, or all-caps: `0.05em` to `0.1em`.
- Code: `0` or `0.01em`; do not spread code.

## Hierarchy checklist

- [ ] Heading count on a page is no more than three visual treatments.
- [ ] Scale steps follow a single ratio.
- [ ] Body text sits between 45 and 75 characters per line.
- [ ] Line height is tighter for headings and looser for body.
- [ ] Contrast between a heading and the next smaller heading is at least 1.2x, ideally 1.25x in size.
