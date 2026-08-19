# Asset optimization

Use this reference when compressing assets or reducing their bundle impact.

## Vite image optimizer

- Add an optimizer such as `vite-plugin-image-optimizer`, or a transform pipeline such as `vite-imagetools`.
- Run the optimizer on all images in `src/client/public` and the assets imported by the client.
- Keep the original source files outside the build output if they are not needed at runtime. Store them in a `src/assets/sources` or equivalent source directory and let the build produce the final files.
- Verify that the optimized files still look correct at the intended display size.

## Font optimization

- Subset fonts to the characters used on the site. Start with `latin`.
- Prefer variable fonts over multiple static files when the design uses two or more weights.
- Use `font-display: swap` so text is visible before the custom font loads.
- Limit preloads to the first two files the user actually sees.

## Responsive images

- Use `srcset` and `sizes` or the framework's image component to serve the smallest file that fits the container.
- Generate 1x, 2x, and 3x versions or a `srcset` range at sensible breakpoints.
- Lazy load images below the fold.
- For art-directed images, use the `picture` element and a `source` list.

## Bundle-size rules

- The total font payload for a page should not exceed the JavaScript payload unless a heavy typeface is a deliberate brand choice.
- A single hero image should not exceed the first 100 KB of visible content unless it is the primary visual focus and the budget allows it.
- Measure bundle impact with the build analyzer or the network tab before and after adding an asset.
- If an asset is used on only one route, load it lazily or keep it in the route's own asset directory.
