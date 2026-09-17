# Portfolio typography contract

This is the durable typography authority for portfolio implementation and
review. Classify content by semantic role before choosing a family.

## Governing rule

Source Sans 3 is the site voice. Source Serif 4 is a semantic transition into
authored reading, not a prestige accent. Source Code Pro carries genuine
technical material and the compact utility register.

## Family contract

### Source Sans 3 — shared site voice

Use for site display headings, About headings, project titles, section headings,
body copy outside authored article routes, navigation, metadata, captions and
ordinary links outside a serif article context.

### Source Serif 4 — authored long-form register

Use only for article titles, article body, article leads/standfirsts when useful,
and rare genuine quotations or literary excerpts whose content belongs to the
authored-reading register.

Do not use Serif for project titles, About titles, navigation, case-study
headings, evidence captions, generic pull-excerpts or decorative "premium
editorial" moments. A route being substantial, reflective or visually prominent
does not make it an article.

### Source Code Pro — technical and compact utility register

Use for code, diffs, terminal/command output, genuinely machine-readable
technical evidence, and compact folios, dates, status, navigation and controls
where the utility register is semantically appropriate.

Do not use Mono as a general signifier of engineering. Meaningful prose,
captions and ordinary links remain Sans or Serif according to their content role.

## Hierarchy tokens

| Role | Family | Weight | Size | Line height | Tracking | Boundary |
|---|---|---:|---|---:|---:|---|
| Site display | Source Sans 3 | `650` | `clamp(42px, 5.4vw, 72px)` | `0.98` | `-0.025em` | Sentence case; major site, About and project display |
| Article display | Source Serif 4 | `600` | `clamp(38px, 4.2vw, 52px)` | `1.04` | `-0.025em` | Authored articles only; quieter than site display |
| Section heading | Source Sans 3 | `600` | `32px` | `1.08` | `-0.022em` | Shared section and case-study hierarchy |
| Site body | Source Sans 3 | `400` | `18px` | `1.62` | `0` | Non-article prose; measure around `66ch` |
| Article body | Source Serif 4 | `400` | `19px` | `1.66` | `0` | Authored article prose at a comfortable reading measure |
| Article lead | Source Serif 4 | `500` | `20px` | `1.35` | `0` | Optional; only when it improves the opening |
| Metadata | Source Sans 3 | `600` | `14px` | `1.40` | `0.012em` | Sentence case; meaningful metadata floor |
| Caption | Source Sans 3 | `400` | `14px` | `1.50` | `0` | Evidence and media captions |
| Code / utility | Source Code Pro | `400` | `14px` | `1.55` | `0` | Technical material and compact utility register |

Links inherit the family, weight and size of their surrounding role. Keep them
visibly underlined in Sans and Serif contexts and preserve visible focus and
accessible contrast.

## Implementation boundaries

Must:

- preserve the family-to-content mapping above;
- use normal browser text rendering;
- keep site and article display in sentence case;
- keep article display visually quieter than site display;
- self-host legitimate font files with repository asset custody;
- use `font-display: swap` or an equivalently readable loading strategy; and
- define readable category-matched fallback stacks and test with custom fonts
  blocked.

May:

- express these roles through the production token system rather than copying
  historical specimen CSS names;
- tune fallback metrics, measures and responsive wrapping without changing the
  role hierarchy;
- use Serif for a genuine quotation whose content belongs to the authored-reading
  register; and
- use `13px` only for genuinely secondary material after narrow-width, contrast
  and 200% zoom proof.

Must not:

- turn Serif into a reusable premium-looking accent;
- use Mono as general engineering decoration;
- create uppercase, highly tracked label furniture from metadata;
- infer layout, panels, colours or spacing from a typography specimen; or
- substitute remote, unlicensed or look-alike fonts without a new custody
  decision.

## Validation

- `14px` is the normal floor for meaningful metadata.
- `13px` requires genuinely secondary content plus narrow, contrast and 200%
  proof.
- Check site-display tracking against the longest real About and project headings.
- Prove article display remains quieter than site display at `1440`, `768`, `390`
  and `320` CSS pixels.
- Prove typography at 200% zoom, narrow widths, and keyboard-only navigation.
- Test readable fallback rendering with custom font requests blocked.
- Retain visible underlines and focus treatment for links in Sans and Serif.