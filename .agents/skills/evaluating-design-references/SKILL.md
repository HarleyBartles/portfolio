---
name: evaluating-design-references
description: Use when a public design reference such as a portfolio, Dribbble shot, or reference repo is proposed for adoption and you need to decide whether to extract and adapt its pattern.
license: MIT
---

# Evaluating design references

## Use when

- A public portfolio, Dribbble shot, reference repo, or article is proposed as the basis for a portfolio pattern.
- You need to decide whether a reference is worth adopting, not just whether it looks good.
- You are writing a recommendation to adopt, adapt, or reject a reference.

## Core thesis

A reference is useful for principles, not for copying. The goal is to extract the idea, translate it into the portfolio's token and type system, and adapt it to the portfolio's voice. A copied reference resembles the source; a translated reference fits the portfolio.

## Quality signals

A reference is credible when it shows these five signals. Do not adopt a reference just because it is popular or current.

- **Craft** - the reference shows intentional choices in type, space, colour, layout, and motion. See [references/quality-signals.md](./references/quality-signals.md).
- **Finish** - the reference handles states, edges, and small screens as well as the hero view. See [references/quality-signals.md](./references/quality-signals.md).
- **Accessibility** - the reference meets contrast, focus, motion, and alt text expectations. See [references/quality-signals.md](./references/quality-signals.md).
- **Performance** - the reference loads critical content first and avoids layout shifts. See [references/quality-signals.md](./references/quality-signals.md).
- **Consistency** - the reference applies the same decisions across every visible page. See [references/quality-signals.md](./references/quality-signals.md).

## Adoption checklist

To turn a reference into a portfolio-specific pattern:

1. Name the single principle that makes the reference work. Write it as one sentence.
2. Compare the principle against the portfolio voice in [designing-premium-sites](../designing-premium-sites/SKILL.md). If it conflicts, reject it.
3. Translate the principle into the portfolio's token system: colour, type, space, size, radius, shadow, motion, and breakpoint tokens. See [references/adoption-checklist.md](./references/adoption-checklist.md).
4. Build a one-component or one-section prototype before applying it to the whole site.
5. Run the checks in [references/quality-signals.md](./references/quality-signals.md) against the prototype.
6. Write a one-paragraph recommendation that includes what was extracted, what was adapted, where it will live, and why it is safe to adopt.
7. If the recommendation is accepted, record the source URL and the adaptation rationale next to the implementation.

See [references/adoption-checklist.md](./references/adoption-checklist.md) for the full checklist.

## Avoiding copying

Generic trends, stock-look, and overused patterns are easy to copy and hard to defend. Learn to spot them before you adopt. See [references/avoiding-copying.md](./references/avoiding-copying.md) for red flags and synthesis techniques.

## Upstream

This skill consumes two upstream contracts:

- The master spec that chartered this foundation work: [`.agents/specs/2026-08-12-portfolio-premium-epic-spec.md`](../../specs/2026-08-12-portfolio-premium-epic-spec.md).
- The umbrella taste skill this reference work supports: [`designing-premium-sites`](../designing-premium-sites/SKILL.md).

## Reference routes

| Concern | Read this |
|---|---|
| Is the reference credible and finished? | [references/quality-signals.md](./references/quality-signals.md) |
| How do I turn the reference into a portfolio pattern? | [references/adoption-checklist.md](./references/adoption-checklist.md) |
| How do I avoid copying the reference? | [references/avoiding-copying.md](./references/avoiding-copying.md) |

## Working rules

1. Extract a principle, not a screenshot. If you cannot write the idea in one sentence, you are copying.
2. A reference is an input, not a specification. The portfolio's voice and constraints come first.
3. Reject a reference when it relies on a generic trend, uses unlicensed assets, fails accessibility, or has measurable performance problems.
4. Write every recommendation as one paragraph: what was extracted, what was adapted, where it will live, and why it is safe to adopt.
5. Record the source URL and the adaptation rationale whenever a reference is adopted.
6. When in doubt, reject the reference. It is cheaper to wait for a better reference than to unpublish a copied one.
