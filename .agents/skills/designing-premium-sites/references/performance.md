# Performance

The fastest way to look cheap is to load slowly.

Critical content should render first. Fonts and images that cause layout shifts make the page feel unstable. Non-critical resources should not block the first paint. Images should be appropriately sized and encoded, and the build pipeline should handle optimisation.

## $10k vs $500

| $500 | $10k |
|---|---|
| Layout shifts as fonts or images load | Critical assets preloaded; no cumulative layout shift |
| Blocking resources on first paint | Asynchronous non-critical resources |
| Uncompressed images | Modern formats or optimisation in the build pipeline |
