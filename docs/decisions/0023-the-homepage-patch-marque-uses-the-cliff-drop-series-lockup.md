# ADR 0023: The homepage Patch marque uses the cliff-drop series lockup

**Date:** 2026-09-03
**Status:** Accepted

**Context:** The Specialists movement opened with the standalone PATCH wordmark even though the movement introduces an Adventures of Patch series title. After approving the cliff-drop construction, the solo mark no longer carried either the series relationship or the restrained “falling into another adventure” story.

**Decision:** Replace only the small solo PATCH marque in the homepage Specialists title field with the canonical cliff-drop Adventures of PATCH lockup. Preserve the standalone PATCH asset and the large The Usual Specialists wordmark. Render the cliff lockup from its indivisible public SVG through the base-path-safe brand helper, keep it at or above the established 132 px checked width, and inherit colour from the host composition.

**Consequence:** The movement now introduces the series before the specific adventure, strengthening the hierarchy without changing the scene, copy, destination, or semantic fallback. The before state remains in Git history; focused wide and portrait lockup snapshots are the accepted after-state evidence. Component tests pin the asset route and accessible label.

**Reconsider when:** Another homepage Patch edition is selected, the lockup fails at a supported viewport or zoom level, the series name becomes redundant in context, or the cliff-drop narrative competes with the adventure title.
