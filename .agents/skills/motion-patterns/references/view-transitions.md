# View transitions

## Same-document view transitions

Same-document transitions make a DOM change look continuous inside one page.

1. Call `document.startViewTransition(() => { ... })` and perform the DOM update inside the callback.
2. The browser captures the old and new states as pseudo-element snapshots.
3. Add a matching `view-transition-name` CSS property to both the old and new elements to morph them into each other.
4. The function returns a `ViewTransition` object. Await `transition.finished` if you need to clean up after the animation.

### Same-document example

```css
.card-thumb {
  view-transition-name: card-thumb;
}
```

```js
async function openDetail(id) {
  const transition = document.startViewTransition(() => {
    renderDetail(id);
  });
  await transition.finished;
}
```

## Cross-document view transitions

Cross-document transitions run when the browser navigates from one page to another. They only work for real multi-page navigation, not a client-side router that fakes navigation.

1. Add the at-rule to the stylesheet of both pages:
   ```css
   @view-transition {
     navigation: auto;
   }
   ```
2. Add matching `view-transition-name` values to the elements that should persist across the navigation.
3. Use the `pageswap` and `pagereveal` events to skip the transition for specific links or to start custom logic.

### Cross-document example

```css
/* On both pages */
@view-transition {
  navigation: auto;
}

.hero-image {
  view-transition-name: hero-image;
}
```

```js
window.addEventListener('pagereveal', () => {
  // optional: run custom setup after the browser reveals the new page
});
```

## Fallback and accessibility

- If `document.startViewTransition` or `@view-transition` is not supported, the state change or navigation must still work without animation.
- Respect `prefers-reduced-motion: reduce` before running any transition. In the reduce path, run the DOM update or navigation directly.
- Do not apply view transitions to every link. Use them only for meaningful state changes that the reader should follow.
