# Token naming

## Start from the live vocabulary

Name shared tokens to fit `src/client/src/styles/_tokens.scss`, not an abstract framework grammar. Current names use semantic category prefixes such as `color`, `space`, `size`, `font`, `type`, `layout`, `measure`, `duration`, and `ease`.

Good names describe a stable role:

- `--color-interior-canvas`
- `--color-evidence-group-secondary`
- `--space-10`
- `--font-site-sans`
- `--type-metadata-size`
- `--measure-reading`
- `--duration-state`

Avoid names that expose an incidental raw value (`--color-blue`) or an implementation library. A token should still make sense if its literal value changes.

## Semantic versus scaled names

Use a numeric scale where the repository already treats the values as a reusable ordered scale, as with `--space-*`. Use a semantic name when the value has a specific job, as with `--color-focus` or `--duration-state`.

Do not force project-native or measured composition values into the global naming scheme. A local custom property can name a bounded relationship without claiming portfolio-wide reuse.

## Renames

Before renaming a token:

1. search `_tokens.scss`, `portfolioTheme.ts`, Sass/CSS, styled-components, and tests;
2. update the source token and every mapping/consumer in one change;
3. avoid compatibility aliases unless an actual staged migration requires them; and
4. run the smallest relevant style/component tests plus the normal repository validation path at commit time.
