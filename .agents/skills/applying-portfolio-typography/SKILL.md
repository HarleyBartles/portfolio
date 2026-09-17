---
name: applying-portfolio-typography
description: Use when implementing or reviewing typography on portfolio routes, components, metadata, articles, quotations, code, or responsive layouts.
---

# Applying portfolio typography

Apply the accepted typography system; do not redesign it locally.

## Authority

1. Read this skill's durable [typography contract](./references/contract.md).
2. Use this skill to classify content, apply the existing role or token, and verify the result.

If current production tokens and this contract disagree, raise the mismatch before styling.

## Classify before styling

| Content role | Family register |
|---|---|
| Shared site, interface, project, About, case-study, metadata or non-article prose | Source Sans 3 |
| Genuine authored long-form article content | Source Serif 4 |
| Code, diff, terminal output, machine-readable technical material or compact utility furniture | Source Code Pro |

Technical subject matter does not make body copy or captions technical material. Compact navigation, folios, dates, status and controls belong to the Source Code Pro utility register; "editorial," "premium," "reflective" or visually prominent does not make content authored long-form.

A quotation enters the Serif register only when the quoted content itself genuinely belongs to the authored-reading register. Being first-person, pulled out, or decorative is insufficient. If that judgement is not clear from the content and route, stop and raise a typography-contract gap.

## Apply

- Reuse the contract's existing role and production token. Do not create a component-local type role or retune a shared token for taste.
- Let links inherit their surrounding family and keep the defined underline and focus treatment.
- Keep typography decisions scoped to typography. Do not infer panels, colours, spacing, dividers, grids, or component structure from a type role.
- When a requested role is absent or a change would extend the contract, stop and raise a typography-contract gap rather than improvising.

## Verify

- Inspect affected desktop and narrow layouts with real content.
- Check relevant surfaces at 200% zoom.
- Preserve the contract's normal metadata floor; shrinking to make content fit requires the contract's secondary-material proof.
- Check the longest real display headings for tracking and wrapping.
- Confirm article display remains quieter than site display.
- Confirm Serif has not become a prestige accent and Mono has not become an engineering accent.

## Pressure warnings

- "Make it premium" is not permission to add Serif.
- "Make it engineering-led" is not permission to add Mono.
- "Make mobile tighter" is not permission to shrink meaningful metadata.
