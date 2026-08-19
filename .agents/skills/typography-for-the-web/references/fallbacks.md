# Fallbacks

## System font stacks

Use a stack that degrades through the same category as the chosen face.

### Sans-serif

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
```

### Serif

```css
font-family: 'Source Serif 4', Georgia, 'Times New Roman', Times, serif;
```

### Monospace

```css
font-family: 'JetBrains Mono', 'Fira Code', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
```

## Metric-compatible fallbacks

Metric-compatible fonts reduce layout shift because their characters are close in width, x-height, and line spacing to the custom face.

| Custom face | Metric-compatible or near-compatible fallback |
|---|---|
| Inter | Arial with `size-adjust: 107%` and `ascent-override: 90%` |
| Source Serif 4 | Georgia with `size-adjust: 105%` |
| JetBrains Mono | Consolas with `size-adjust: 108%` and `ascent-override: 95%` |

Tuning values are approximate. Measure with the font URL blocked and compare cumulative layout shift (CLS). Adjust `size-adjust`, `ascent-override`, and `descent-override` until the two lines render to nearly the same dimensions.

## Fine-tuning with `@font-face`

```css
@font-face {
  font-family: 'Inter Fallback';
  src: local('Arial');
  size-adjust: 107%;
  ascent-override: 90%;
  descent-override: 23%;
  line-gap-override: 0%;
}
```

Then use the fallback name in the stack:

```css
font-family: 'Inter', 'Inter Fallback', sans-serif;
```

## FOUT and FOIT

- FOUT (Flash of Unstyled Text): the fallback appears, then the custom font loads and swaps in. This is the expected behavior with `font-display: swap`. Accept it for all readable text.
- FOIT (Flash of Invisible Text): the text is invisible until the font loads. This happens when `font-display` is omitted or set to `block`. Avoid it.

## Accessibility

- The fallback stack must remain readable on its own. Test with the custom font disabled and `prefers-reduced-motion` enabled.
- Do not rely on the custom font for contrast or meaning. The message must survive in the fallback.
- Respect `prefers-reduced-motion` by not animating font swaps.

## Fallback checklist

- [ ] A system font stack is defined and matches the custom face's category.
- [ ] A metric-compatible fallback is provided when layout shift is a risk.
- [ ] `font-display: swap` is set on every custom `@font-face` block.
- [ ] The page has been tested with the custom font blocked.
- [ ] The page is still readable and no content is hidden waiting for a font.
