# Adoption checklist

Use this reference to translate a public design reference into a portfolio-specific pattern.

## Steps

1. **Name the principle.** Write one sentence that explains the single idea that makes the reference work. If you cannot do this, stop.
2. **Check the principle against the portfolio voice.** Read [designing-premium-sites](../designing-premium-sites/SKILL.md). If the principle contradicts the portfolio's definition of premium, reject it.
3. **Find the source.** Record the URL, author, date, and license. If the source is not public or the license is not clear, reject it.
4. **Translate to tokens.** Map the principle to the portfolio's token system: colour, type, space, size, radius, shadow, motion, and breakpoint tokens. See [design-tokens](../design-tokens/SKILL.md) and [typography-for-the-web](../typography-for-the-web/SKILL.md).
5. **Build a one-section prototype.** Apply the translated principle to one component or one page section before scaling.
6. **Run the quality checks.** Evaluate the prototype against [references/quality-signals.md](./quality-signals.md).
7. **Write the recommendation.** Produce one paragraph that states what was extracted, what was changed, where it will live, and why it is safe to adopt.
8. **Record the decision.** If the reference is adopted, keep the source URL and the adaptation rationale next to the implementation.

## Rejection criteria

Reject a reference if any of the following are true:

- You cannot name the single principle it demonstrates.
- It conflicts with the [designing-premium-sites](../designing-premium-sites/SKILL.md) heuristics.
- It uses unlicensed, stock, or AI-generated assets that cannot be clearly attributed.
- It fails the accessibility or performance checks in [references/quality-signals.md](./quality-signals.md).
- It is built on a generic trend with no specific connection to the portfolio content.
