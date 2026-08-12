# $10k-feel vs $500-feel

A quick taste checklist. A $500-feel portfolio satisfies the brief; a $10k-feel portfolio makes the brief look inevitable. The right-hand column is the target. Use this as an opt-in reference when judging a specific page, component, or design direction.

## Spacing

| $500 | $10k |
|---|---|
| Random margins and paddings | A single spacing scale applied consistently |
| Elements touch or float at odd distances | Generous, intentional whitespace that gives each element room to breathe |
| No vertical rhythm | Text and images snap to a common baseline grid |

Whitespace is an active material, not leftover canvas. Long lines of text are hard to read, so the measure should be constrained. Padding and margins should come from a scale, not ad hoc numbers. When spacing is consistent, the page calms down and the content gains authority.

## Typography

| $500 | $10k |
|---|---|
| Default fonts, default sizes | A considered pair of fonts with clear roles |
| All-caps labels, thin headings that are hard to read | Scale and weight guide the eye; body text is comfortable at all widths |
| Text dumps with no hierarchy | Chunked content, clear headings, and short paragraphs |

Text is the primary content of the Web. The typeface should be chosen deliberately; the default "Times" look is a signal that no choice was made. A sans-serif or a robust serif with good fallbacks improves readability. Line height should be generous, the measure limited, and headings should use a clear scale so the hierarchy is obvious. All-caps and very thin weights can look stylish but often hurt readability.

## Colour and contrast

| $500 | $10k |
|---|---|
| Pure black on pure white everywhere | Softer, chosen shades that are easy on the eyes while keeping contrast strong |
| Random accent colours | A primary accent and a few complementary secondary shades |
| Colour used without purpose | Colour reinforces meaning: links, calls to action, and section identity |

Harsh contrast can be tiring. A slightly softer body text, darker headings, and a reserved primary colour create a more polished reading experience. Important words and interactive elements should stand out through deliberate contrast, not decoration. The accent colour should appear consistently and with restraint.

## Layout

| $500 | $10k |
|---|---|
| Elements placed by eye | A grid or strong implied structure governs the composition |
| No clear reading order | The reader's path through the page is intentionally shaped |
| Components break at breakpoints | The layout is responsive by design, not by patch |

A strong layout does not fight the content. A grid, even a simple one, makes the page feel ordered. The reading order should be shaped by the size, position, and spacing of elements. Responsive design should be considered from the first layout, not applied later as a fix.

## Motion

| $500 | $10k |
|---|---|
| Animations for decoration | Animations that clarify or reward attention |
| No reduced-motion support | Reduced-motion support tested and documented |
| Everything moves at once | Motion is choreographed: one thing at a time |

Motion should answer a question: what is changing, and why does it matter? A page that animates everything at once feels like a distraction. A premium site uses motion sparingly, with clear triggers and end states, and it always respects `prefers-reduced-motion`.

## Asset quality

| $500 | $10k |
|---|---|
| Generic or unoptimised images | Original or intentionally chosen images, appropriate format and size |
| Favicon and social preview missing | All meta assets and favicons in place |
| Mixed icon styles | A single, consistent icon set |

Images, icons, and fonts are chosen for quality, not quantity. A generic hero image from a stock library undermines the claim that the work is personal. Assets should be appropriate to the format: modern image formats where they help, self-hosted or attribution-respecting fonts, and a consistent icon style. Favicons, Open Graph images, and other social assets should not be afterthoughts.

## Accessibility

| $500 | $10k |
|---|---|
| Contrast only checked later | Contrast and focus states are part of the first draft |
| Keyboard navigation broken or untested | Focus order and visible focus states are designed and verified |
| Alt text and labels absent or generic | Alt text and labels are treated as content, not metadata |

Accessibility is a quality signal. A premium portfolio does not treat it as an extra. Colour contrast should be strong enough from the start, focus states should be visible, and keyboard navigation should work. Alt text for images and labels for controls should be written with the same care as the visible copy.

## Performance

| $500 | $10k |
|---|---|
| Layout shifts as fonts or images load | Critical assets preloaded; no cumulative layout shift |
| Blocking resources on first paint | Asynchronous non-critical resources |
| Uncompressed images | Modern formats or optimisation in the build pipeline |

The fastest way to look cheap is to load slowly. Critical content should render first. Fonts and images that cause layout shifts make the page feel unstable. Non-critical resources should not block the first paint. Images should be appropriately sized and encoded, and the build pipeline should handle optimisation.

## Taste

| $500 | $10k |
|---|---|
| Copies current trends without context | Builds a coherent, ownable visual voice |
| "Looks like a template" | "Looks like a decision" |
| Accessible only as an afterthought | Accessibility considered from the first draft |

Taste is the sum of all the choices above. It is the discipline to say no to trends that do not fit, to keep the palette and type system small, and to make sure every detail has a reason. A premium portfolio does not look expensive because it uses expensive effects; it looks expensive because it is coherent.
