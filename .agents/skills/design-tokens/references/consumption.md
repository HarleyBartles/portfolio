# Consuming portfolio tokens

## Sass and CSS

Read shared tokens as CSS custom properties. `_tokens.scss` is loaded globally, so a component stylesheet does not redeclare the value.

```css
.example {
  color: var(--color-ink);
  padding: var(--space-6);
  transition: transform var(--duration-state) var(--ease-out);
}
```

Use `clamp()`, `calc()`, `color-mix()`, and other CSS functions around a token when the relationship is the design rule. Do not copy the underlying raw value into each consumer.

## styled-components

Use the typed `portfolioTheme` mapping when an existing semantic group makes the component clearer:

```tsx
const Example = styled.section`
  color: ${({ theme }) => theme.color.ink};
  padding: ${({ theme }) => theme.space.lg};
  transition: transform ${({ theme }) => theme.motion.state} ${({ theme }) => theme.motion.easeOut};
`
```

The theme entries resolve back to `var(--...)`. A styled-component may also use a CSS custom property directly when no typed mapping is needed, especially in mixed CSS/custom-property expressions.

## Adding typed access

When a shared custom property is genuinely needed by styled-components, add a mapping in `src/client/src/styles/portfolioTheme.ts` under the closest existing group. Keep the raw value in `_tokens.scss`; never repeat the literal in `portfolioTheme.ts`.

## Local values

A literal may remain local when it describes one bounded composition rather than a shared design-system decision. Project-native colour, measured artwork geometry, and one-off evidence layout values are common examples. Promote a local value only when reuse or a durable cross-route decision gives it shared meaning.
