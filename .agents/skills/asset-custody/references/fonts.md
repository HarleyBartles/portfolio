# Font custody

The current portfolio self-hosts its public type through installed Fontsource variable packages and `src/client/src/styles/_fonts.scss`.

Current families are Source Sans 3, Source Serif 4, and Source Code Pro. Their semantic roles are governed by the portfolio typography/visual contract; this reference owns loading/custody details, not typographic taste.

## Current loading contract

- Font files come from the pinned `@fontsource-variable/*` package dependencies, not a CDN or runtime font service.
- `_fonts.scss` declares WOFF2 variable `@font-face` sources, the current Latin Unicode range, supported weight range, style, and `font-display: swap`.
- CSS token stacks provide system fallbacks so text remains usable while custom fonts load or fail.
- Source Serif 4 includes the italic face because authored long-form prose uses it.

## Changes

Before changing a font package, face, subset, or loading rule:

1. verify source/licence/public-web use;
2. inspect the current Fontsource dependency and `_fonts.scss` declaration;
3. keep fallback stacks and typography roles coherent;
4. measure the resulting build/runtime payload; and
5. run the focused typography/style tests plus normal repository validation.

Do not copy commercial font binaries from a local machine into web custody unless the licence explicitly permits that distribution. Static outlined brand artwork is a different custody class from a webfont and should not be converted into runtime font serving.
