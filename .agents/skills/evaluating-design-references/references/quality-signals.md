# Quality signals

Use this reference when evaluating a public design reference for adoption.

## Craft

A reference shows craft when its decisions look intentional rather than accidental.

- Typography: no more than two typefaces; weights and sizes are used consistently; line height and measure support reading.
- Spacing: margins, paddings, and gaps relate to a base unit and do not vary without reason.
- Colour: a limited palette with clear roles, not one-off decorative choices.
- Layout: a visible grid or strong implied structure with one clear focal point per section.
- Motion: every animation clarifies state, focus, or loading; there are no endless or purely decorative loops.

## Finish

A reference is finished when it handles the less glamorous states as well as the hero view.

- No visible compression or scaling artifacts on images.
- Assets match the site's voice and are not generic stock.
- Hover, focus, active, and disabled states are designed, not missing.
- The mobile layout is as considered as the desktop layout: touch targets are at least 44 x 44 px, type scale is legible, and whitespace is preserved.

## Accessibility

A reference is accessible when it does not rely on assumptions about how users perceive or interact with it.

- Text and background colour contrast meets WCAG 2.1 AA: 4.5:1 for normal text and 3:1 for large text and UI components.
- Focus states are visible without relying on colour alone.
- Meaningful images have alt text or are marked as decorative.
- Motion respects `prefers-reduced-motion` and does not autoplay without pause.

## Performance

A reference is fast enough to look intentional.

- Largest Contentful Paint is under 2.5 seconds on a mid-range connection.
- No layout shifts from late-loading fonts, images, or injected content.
- Critical assets are preloaded or loaded above the fold.

## Consistency

A reference is consistent when the same decisions appear across different pages and sections.

- The same type, spacing, colour, and motion tokens are used throughout.
- Interaction patterns such as links and buttons behave the same way in different contexts.
- The reference has a recognizable voice on a second or third page.

## Checklist

- [ ] Craft: typography, spacing, colour, layout, and motion are intentional.
- [ ] Finish: states, edges, mobile, and asset quality are handled.
- [ ] Accessibility: contrast, focus, alt text, and reduced motion are met.
- [ ] Performance: LCP, layout shifts, and critical asset loading are acceptable.
- [ ] Consistency: the same choices appear across multiple pages.
