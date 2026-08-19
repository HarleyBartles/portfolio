# Type pairing

## How many typefaces to use

| Count | When to use | Examples |
|---|---|---|
| One | A single typeface has at least 4 weights and an italic; all typography can be expressed through weight, size, and case. | Inter, Source Sans 3, Spline Sans |
| Two | A second face is needed to separate headings from body, code from prose, or labels from content. | Inter + Source Serif 4, Source Sans 3 + JetBrains Mono |
| Three | A dedicated code face is added to a two-typeface system. Justify in writing if you add a third display or decorative face. | Inter + Source Serif 4 + JetBrains Mono |

## Rules for mixing

- Do not use more than one typeface for the same job. One face handles body, one handles headings, one handles code.
- Pair contrast, not conflict. Mix a neutral with a characterful face, or a sans with a serif. Do not mix two faces that differ only slightly.
- Keep x-heights within roughly 10% of each other at the same font-size. If one face's x-height is more than 10% taller or shorter, the pairing looks mismatched at the same size.
- Use the secondary face at scale. A decorative face works for `h1` or labels; it fails for body text.
- Limit the number of weights per family to three at most: regular, medium/semibold, and bold. Fewer files means fewer requests.

## Safe portfolio pairs

| Heading | Body / UI | Use case |
|---|---|---|
| Source Serif 4 | Inter | Editorial, readable long-form portfolio |
| Space Grotesk | Inter | Modern, technical, slightly crafted |
| Inter | Inter | Neutral, fast, lets content and colour lead |
| Playfair Display | Source Sans 3 | Strong editorial, high contrast |

## Safe code face

- JetBrains Mono
- Fira Code
- IBM Plex Mono

Use a monospace face for inline code, code blocks, and technical labels only. Do not set prose in a monospace face.

## Pairing checklist

- [ ] Each face has a specific job.
- [ ] No two faces serve the same job.
- [ ] The pair has been tested at body size, heading size, and a throttled load.
- [ ] The combined weight of the chosen weights does not exceed the performance budget.
