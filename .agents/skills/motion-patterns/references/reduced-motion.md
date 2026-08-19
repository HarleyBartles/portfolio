# Reduced motion

## The default reduce story

The baseline is no motion. Add motion only when the user has not asked for reduced motion. This is the default reduce story.

A reduced-motion fallback is an instant state change. It is not a shorter or quieter version of the same animation. Do not lower the duration to `75ms` and call it accessible. Set the duration to `0ms` and show the final state.

## Detecting the preference

Use the `prefers-reduced-motion` media query:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0ms !important;
    transition-duration: 0ms !important;
  }
}
```

In `motion` for React, set `reducedMotion="user"` so the library follows the system preference. Do not set `reducedMotion="never"`.

## Tokens for reduced motion

When the preference is `reduce`, use the `duration-0` token. Skip `delay-*` tokens entirely. Easing is irrelevant because the change is instant.

## What to remove

In the reduce path, remove:

- entrance and scroll-reveal animations
- hover scale and bounce
- stagger and sequence delays
- cross-document view transitions

Keep state changes that do not depend on time:

- colour changes on focus and hover
- border and outline changes
- opacity-only state changes that are instant

## Testing

Test reduced motion in three ways:

1. Enable `prefers-reduced-motion: reduce` in browser DevTools (Rendering > Emulate CSS media feature).
2. Set the OS reduced-motion preference and reload the page.
3. Use `matchMedia('(prefers-reduced-motion: reduce)').matches` in the console to verify the condition.
