---
name: applying-portfolio-typography
description: Use when implementing or reviewing typography on portfolio routes, components, metadata, articles, quotations, code, or responsive layouts.
---

# Applying portfolio typography

Apply the accepted typography system; do not redesign it locally.

## Authority

1. Read the [Phase 8P typography contract](../../../docs/editorial-drafts/phase-8/phase-8p-typography-contract.md) before typography implementation or review. It is normative.
2. Inspect the [deterministic specimen](../../../docs/editorial-drafts/phase-8/phase-8p-typography-specimen.html) when visual judgement is relevant. It proves type, not production layout.
3. Use this skill to classify content, apply the existing role or token, and verify the result.

If the sources appear to disagree, follow the contract and raise the mismatch.

## Classify before styling

| Content role | Family register |
|---|---|
| Shared site, interface, project, About, case-study, metadata or non-article prose | Source Sans 3 |
| Genuine authored long-form article content | Source Serif 4 |
| Code, diff, terminal output or machine-readable technical material | Source Code Pro |

Technical subject matter does not make labels, captions, navigation or metadata technical material. "Editorial," "premium," "reflective" or visually prominent does not make content authored long-form.

A quotation enters the Serif register only when the quoted content itself genuinely belongs to the authored-reading register. Being first-person, pulled out, or decorative is insufficient. If that judgement is not clear from the content and route, stop and raise a Phase 8P design gap.

## Apply

- Reuse the contract's existing role and production token. Do not create a component-local type role or retune a shared token for taste.
- Let links inherit their surrounding family and keep the defined underline and focus treatment.
- Copy no panels, colours, spacing, dividers, grids, or component structure from the specimen.
- When a requested role is absent or a change would extend the contract, stop and return the gap to Phase 8P rather than improvising.

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
- "Use the specimen" means reproduce its typography contract, not its page design.
