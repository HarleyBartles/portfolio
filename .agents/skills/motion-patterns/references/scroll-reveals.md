# Viewport-triggered and scroll-linked motion

## One-shot reveals

Use a reveal only when it helps explain reading order or a meaningful state change. A simple reveal should need no scroll library:

1. Render the content in a usable baseline/final state. Do not make no-JavaScript or unsupported-observer paths depend on an initially hidden class.
2. Use `IntersectionObserver` to detect when the element enters the relevant viewport region.
3. Toggle a class/state once if a transition is genuinely useful, then unobserve/disconnect the completed one-shot target.
4. Animate a small transform and/or opacity change with the current shared motion values.
5. Under reduced motion, expose the final state without the reveal movement.

Do not hide essential content indefinitely when `IntersectionObserver` is unavailable. Do not add a dependency just to wrap this browser API.

## Browser-native scrolling

Do not replace or reshape ordinary browser scrolling. Smooth anchor scrolling, where appropriate, is already a CSS/browser concern; `global.scss` disables smooth scrolling for narrow screens and reduced-motion users.

Scroll-jacking means the experience takes control of scroll position, speed, or progression away from the browser/user. That is prohibited.

## Bounded scroll-linked effects

Some evidence compositions can legitimately move an internal visual world relative to a fixed aperture. For those effects, a passive `scroll` listener can be acceptable when it only observes native scrolling, schedules work through `requestAnimationFrame`, limits updates to the relevant region, writes a compositor-friendly transform, and resolves to no movement for reduced motion.

The current Silk aperture parallax hook demonstrates that exception. It is not the default reveal implementation.
