# ADR 0031: The Usual Specialists breakpoints are inclusive lower bounds

**Date:** 2026-09-14
**Status:** Accepted

**Context:** Responsive work on the V2 Specialists page exposed ambiguous one-pixel seams where values such as `390`, `720`, and `900` were treated as the upper edge of one layout while also informally naming the layout that began there. That made an exact 720px viewport inherit compact rules even though 720 was being discussed and reviewed as the next authored breakpoint.

**Decision:** Every named responsive breakpoint on The Usual Specialists is the inclusive lower bound of the band it introduces. The preceding band ends one CSS pixel earlier. The shared authored bands are `320-389`, `390-719`, `720-899`, `900-1399`, `1400-1599`, `1600-1919`, and `1920-2560`; widths above `2560` freeze the 2560 composition. Shared media helpers derive upper bounds from the next lower bound rather than storing ambiguous `*Max` values. Chapter-local seams use the same convention.

**Consequence:** A 390px viewport receives the 390-band treatment, a 720px viewport receives the 720-band treatment, and a 900px viewport receives the 900-band treatment consistently across Opening, Index, crossings, rope geometry, and Silk. Boundary proof uses pairs such as `389/390`, `719/720`, `899/900`, and `1399/1400` so a future local override cannot quietly recreate overlapping ownership.

**Reconsider when:** The page adopts container queries or another responsive model that makes viewport-width bands the wrong source of layout authority. Until then, exact breakpoint values always belong to the wider/newer band.
