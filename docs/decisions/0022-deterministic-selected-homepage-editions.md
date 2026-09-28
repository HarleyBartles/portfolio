# ADR 0022: Deterministic selected homepage editions

**Date:** 2026-09-02
**Status:** Superseded by [ADR 0033](0033-daily-homepage-writing-edition.md)

**Context:** The accepted Phase 8 homepage is an authored sequence whose Writing and Patch movements need to change over time without returning to the obsolete shuffled-deck architecture or scattering cross-section copy through the shell.

**Decision:** Render one pinned, deterministic homepage edition made from typed Writing and Patch descriptors. Each destination feature owns its route, inward label, summary or presentation data, and the incoming teaser that the preceding movement displays. `HomePage` selects the edition and connects adjacent descriptors; it does not own feature copy or rotation policy.

**Consequence:** The homepage has a stable editorial reading order and no mount-time randomness. A future edition can replace either feature without rewriting the shell, while tests can prove that destination-owned teaser copy travels with the selected descriptor.

**Reconsider when:** There are enough accepted editions to justify a deliberate, testable rotation policy with equally strong accessibility and editorial continuity. Until then, selection remains pinned.
