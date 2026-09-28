# ADR 0008: Composable case studies, not a project-page template

**Date:** 2026-08-22
**Status:** Accepted

**Context:** Marketplace needs a specialist, evidence-led body while later flagship projects need different material and art direction.

**Decision:** Keep the route shell and Markdown fallback in `ContentPage`; dispatch the small, explicit project-presentation registry to a specialist body.

**Consequence:** Later case studies can vary their reading order and visual language without duplicating route infrastructure or forcing every project into one template.

**Reconsider when:** Multiple specialist bodies demonstrate a stable shared primitive that materially reduces duplication without flattening their distinct narratives.
