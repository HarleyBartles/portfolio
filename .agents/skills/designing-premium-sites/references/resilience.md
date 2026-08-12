# Resilience

Resilient design is the discipline of building websites that last. *Resilient Web Design* argues that ideas are more resilient than code, and that the web's long history is the best guide for its future. A premium portfolio should not be a bet on the latest framework; it should be a layered system that still works when assumptions fail.

## Core lessons from the source

- Build on stable foundations. The web itself was built on existing internet infrastructure; new technology always builds on what came before. For a portfolio, the stable foundation is semantic HTML, standard protocols, and URLs that work.
- Use liberal error handling. Browsers are designed to ignore what they do not understand. A portfolio that uses this quality builds with progressive enhancement: the core experience is always available; newer layers can be ignored or fail without destroying the page.
- Separate concerns. HTML carries meaning, CSS carries presentation, and JavaScript carries behaviour. This loose coupling lets the same content survive changes in tools and devices.
- Design for the continuum. The web is not a fixed platform. Screen sizes, bandwidth, and browser capabilities vary. Use fluid layouts, responsive design, and mobile-first thinking. The absence of a media query is your first media query.
- Layer progressively. Identify the core functionality, deliver it with the simplest possible technology, then enhance. Your portfolio must communicate its core message even if CSS or JavaScript is unavailable.
- Embrace uncertainty. Every assumption about devices and networks has eventually been proven wrong. The only certainty is uncertainty. Future-friendly work is backwards-compatible work.

## $10k vs $500

| $500 | $10k |
|---|---|
| Works only with JavaScript enabled | Core content and navigation work without JavaScript |
| No fallbacks for custom fonts or features | System fonts and native HTML features are treated as the foundation |
| Assumes modern devices and fast networks | Degrades gracefully under poor conditions |
| Coupled to a specific framework version | Built from stable, replaceable layers |
