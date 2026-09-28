# ADR 0029: Silk reveals the mineral page as safehouse plaster

**Date:** 2026-09-12
**Status:** Accepted

**Context:** The first Silk wireframe successfully established its story beats, rope crossing, responsive choreography and accepted surprised-eyes reuse, but the rectangular Commission 05/07/08/09 image cells made the chapter feel too polite. Earlier safehouse comic mockups had a stronger idea: Silk pressure-tests the route by physically breaking through the structure that contains the story.

**Decision:** Keep Index exactly as accepted and make Silk the chapter that reveals the Portfolio's cool-mineral route surface as literal safehouse plaster. Commission 05 and 07 become world/depth plates seen through irregular apertures rather than framed images. The clean `SILK` mark, story copy and chapter structure stay on the page plane; local rope and transparent Silk traversal assets can cross between the world behind the wall and the page surface; foreground plaster/brick rims and practical rope anchors can re-occlude those traversal layers to prove depth. The accepted surprised-eyes image becomes a narrow plaster slit. A subtle bounded scroll parallax may move the first aperture's world plane by roughly 20–40 CSS pixels while the rim remains fixed, with `prefers-reduced-motion` disabling the effect completely. The earlier rectangular Silk wireframe is historical evidence, not current composition authority.

**Consequence:** Silk gets a web-native version of the original frame-breaking idea without turning the route into a literal comic-page skin. The mineral substrate remains the shared site ground and is only made explicitly diegetic where Silk's boundary-testing story earns it. Asset commissioning must separate world plates from page-surface infrastructure, keep the rope modular, and prove aperture/rope/traversal geometry in React before generating the remaining Silk art. Protected Index snapshots remain unchanged.

**Reconsider when:** The page-as-wall metaphor stops reading at 320px or actual 200% zoom, parallax needs scroll-jacking or large continuous transforms to be noticeable, aperture assets create unmanageable bleed/performance costs, or the depth illusion can only work by redesigning Index or using brittle pixel-perfect registration between independent assets.
