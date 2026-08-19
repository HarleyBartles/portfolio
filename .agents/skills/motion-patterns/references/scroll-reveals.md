# Scroll reveals

## When to reveal

Reveal an element when it enters the viewport for the first time and the reveal explains the page structure.

Reveal:

- Section headings that introduce a new topic.
- Card groups, feature lists, or proof blocks.
- Primary content blocks that the reader should notice in order.

Skip:

- Static backgrounds, dividers, and decorative shapes.
- Content already above the fold on first load.
- Elements that belong to a repeated pattern the reader has already seen.

## Trigger

Use `IntersectionObserver` directly or the `useInView` hook from `motion`. Trigger the animation once per element. Do not re-trigger when the element leaves and re-enters the viewport.

A safe threshold is `0.1` with `rootMargin` of `0px 0px -50px 0px` so the element is slightly on screen before it animates.

## Distance

Keep the motion small. A `translateY` of 16px to 32px plus an opacity change from 0 to 1 is the default. Larger distances make the reader wait for the content to arrive.

## Timing

- Use `duration-300` with `ease-out` for the element itself.
- Stagger groups with `delay-75` between items.
- For small pieces such as metadata or captions, use `duration-150`.

## Avoiding scroll jacking

Scroll jacking happens when the page fights the reader's scroll input.

- Do not listen to the `scroll` event to drive an animation.
- Do not pin the scroll position or slow the natural scroll speed.
- Do not trigger a reveal more than once per element.
- Do not make an element wait to render until the scroll completes.

## Smooth scroll

Use `lenis` only for long anchor-linked pages or guided galleries where the scroll destination should feel controlled. Disable it under `prefers-reduced-motion: reduce`; reveals use `IntersectionObserver`, but test their timing together because smooth scroll can delay the trigger.
