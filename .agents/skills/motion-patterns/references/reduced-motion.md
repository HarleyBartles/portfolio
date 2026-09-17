# Reduced motion

## Repository baseline

`src/client/src/styles/global.scss` owns the global reduced-motion safeguard. Under `prefers-reduced-motion: reduce`, it restores automatic scrolling and collapses transition/animation durations to an effectively immediate `0.01ms` with one animation iteration.

Do not create a competing global reset in a feature.

## CSS and styled-components

When a component needs behavior beyond the global safeguard, use a local media query to remove transforms, transitions, or other movement and present the meaningful final state.

```css
@media (prefers-reduced-motion: reduce) {
  transform: none;
  transition: none;
}
```

Use the exact local property changes the component needs rather than assuming duration alone makes every effect acceptable.

## JavaScript motion

When JavaScript calculates scroll-linked movement or schedules animation, read the preference with:

```js
window.matchMedia('(prefers-reduced-motion: reduce)')
```

A reduced-motion result should bypass movement and leave content/navigation usable. If the preference can change while the page is open and the effect is long-lived, listen for that media-query change and update the stable state.

## Testing

Verify the affected feature with the browser/OS reduced-motion preference enabled. For JavaScript-driven motion, also verify the calculated or observed moving offset resolves to its non-moving state.
