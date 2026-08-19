# Font custody

Use this reference when adding or reviewing a font for the portfolio.

## Custody checklist

- [ ] Source: foundry, CDN, or repository where the font is distributed.
- [ ] License: permits use on a public website. Open-source licenses such as SIL OFL, Apache-2.0, or MIT are usually safe; commercial licenses need a written grant.
- [ ] Attribution: is required or not, and where it must appear if it is required.
- [ ] Subset: includes only the characters the site uses. Start with `latin`.
- [ ] Format: WOFF2 is the modern default. Add a variable font file when two or more weights are needed.
- [ ] Fallback stack: a system or metric-compatible font that matches the family category.

## Format guidance

| Format | Use it when |
|---|---|
| WOFF2 | All modern browsers support it. Use as the primary format. |
| WOFF | Fallback for very old browsers. Avoid unless analytics prove it is needed. |
| Variable font | Two or more weights or widths are needed from the same family. |
| TTF/OTF | Do not serve these directly. Convert to WOFF2 for the web. |

## Self-hosting vs CDN

- Self-host when caching, headers, and subsetting matter. Place files in `src/client/public/fonts/` or a route-appropriate public directory and include them in the build manifest.
- Use a CDN only when the license is clear, the file is served from a stable domain, and the request does not block first paint. Prefer the fastest option that preserves provenance.

## Font loading defaults

- Use `font-display: swap` for body and heading faces so text renders before the custom font arrives.
- Preload at most two files, normally the regular and bold weights of the primary face.
- Subset to the characters the site needs. `latin` is the default unless the content needs other scripts.
