# Font loading

## The `font-display` strategy

| Value | Behavior | Use when |
|---|---|---|
| `swap` | Text appears in fallback immediately, then swaps to the custom font when it loads. | Body and headings the reader must see. This is the default for all custom fonts in the portfolio. |
| `optional` | Text appears in fallback; the custom font is used only if it loads before the user needs it. | Decorative or non-essential faces where the design still works without them. |
| `fallback` | Brief invisible period, then fallback, then swap. | Avoid. It creates a longer wait before the reader sees anything. |
| `block` | Invisible text until the font loads. | Never use. This is Flash of Invisible Text (FOIT). |

## `@font-face` baseline

```css
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter-latin.woff2') format('woff2');
  font-weight: 400 700;
  font-style: normal;
  font-display: swap;
}
```

- Always declare `font-display`.
- Use `woff2` as the only format for self-hosted fonts. It has the best compression and is supported by every browser the portfolio targets.
- Use a variable font file when the design needs a continuous weight range. The `font-weight` descriptor should match the file's supported range, e.g., `400 700`.

## Preloading

Preload only the font files required for first paint. Recommended order:

1. Regular weight of the primary body typeface.
2. If headings use a different family, the regular weight of that typeface.

```html
<link rel="preload" href="/fonts/inter-latin-regular.woff2" as="font" type="font/woff2" crossorigin>
```

- Do not preload more than two font files. Additional preloads delay critical CSS and first paint.
- Do not preload every weight or italic style. Let the browser fetch those on demand.
- Always include `crossorigin` for fonts served from a different origin or CDN.

## Subsetting

- Subset to `latin` for English-only portfolios.
- Use `latin-ext` if the content includes common Western European diacritics.
- Only include additional subsets (Greek, Cyrillic, etc.) when the content demands them.
- If using Google Fonts, include `&subset=latin` or `&text=` for a reduced character set.
- If self-hosting, generate the subset with `pyftsubset` or a similar tool and keep the original un-subset file under source control for later expansion.

## Variable fonts

A variable font is the right choice when:

- The design uses three or more weights from the same family.
- The file size of the variable font is smaller than the combined static files.
- The browser support target supports `font-variation-settings`.

A variable font is the wrong choice when:

- Only one or two weights are needed. Two static files are smaller and simpler.
- The font file exceeds the performance budget for first paint.

## Testing

- Throttle the network to "Slow 3G" in DevTools and confirm text appears within the first paint.
- Disable the font URL and verify the fallback does not break the layout.
- Use the Lighthouse "Avoid invisible text during `font-display`" audit.
