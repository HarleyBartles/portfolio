# Performance

The fastest way to look cheap is to load slowly. *Resilient Web Design* describes performance as a shearing layer: content changes daily, but the structural layers of a site should remain fast. *Web Design in 4 Minutes* treats performance as a side effect of good structure: a constrained measure, modest assets, and sensible CSS. A premium portfolio should feel stable and immediate.

## Core lessons from the source

- Render critical content first. The visitor should see the page's message before anything else. Non-critical resources should not block the first paint.
- Avoid layout shifts. Fonts and images that cause layout shifts make the page feel unstable. Preload critical assets, and provide fallback colours and sizes while assets load.
- Use the right format and size. Images should be appropriate for the display and encoded efficiently. The build pipeline should handle optimisation where possible.
- Fonts are a presentation layer. Custom fonts can add identity, but they should not block content. Use a system font stack as the foundation and load web fonts as an enhancement.
- Asynchronous non-critical resources. JavaScript and analytics should not block rendering. Load them asynchronously or defer them.
- Test under poor conditions. If the site only feels premium on fast, modern hardware, it is not resilient. Test on slower networks and less powerful devices.

## $10k vs $500

| $500 | $10k |
|---|---|
| Layout shifts as fonts or images load | Critical assets preloaded; no cumulative layout shift |
| Blocking resources on first paint | Asynchronous non-critical resources |
| Uncompressed images | Modern formats or optimisation in the build pipeline |
| Slow on mobile or poor networks | Fast and stable across the web's continuum |
