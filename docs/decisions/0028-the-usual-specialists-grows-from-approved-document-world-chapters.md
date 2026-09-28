# ADR 0028: The Usual Specialists grows from approved document-world chapters

**Date:** 2026-09-10
**Status:** Accepted

**Context:** The previous React presentation treated The Usual Specialists as a six-profile dossier. PORT-16 established a different visual and narrative grammar: an apartment safehouse opening followed by document-world chapters whose paper stacks, traversal figures and evidence relationships are approved one chapter at a time before implementation.

**Decision:** `/patch/the-usual-specialists` follows the accepted PORT-16 document-world composition. The first React milestone contains only the opening, apartment threshold, Index chapter and a temporary red rope path. Later Specialist chapters are appended only after their wireframes are reviewed and approved. The route uses the normal site mineral canvas as its ground, while actual documents and cards retain their warm paper surfaces. Story and series wordmarks publish as outlined SVG assets with live semantic text; commercial font binaries are not part of the route. The approved opening precis uses a literal hyphen rather than an em dash.

**Consequence:** The route can evolve chapter by chapter without reviving the retired dossier or pretending unfinished sections exist. The current red rope remains explicitly temporary, visual regression protects only the accepted Index milestone, and future chapter work returns to wireframing before React integration.

**Reconsider when:** A real browser, accessibility or performance constraint makes the accepted Index geometry unworkable, or Harley explicitly reopens the design.
