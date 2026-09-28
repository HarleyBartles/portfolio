# ADR 0003: Manual randomized feature deck

**Date:** 2026-08-21
**Status:** Superseded by [ADR 0022](0022-deterministic-selected-homepage-editions.md)

**Context:** Static homepage features made repeated visits feel fixed, while a conventional autoplay carousel would add movement at the cost of control and perceived quality.

**Decision:** Randomize the initial lead on each full load, keep supporting stories visible, and provide labelled Previous, Next, and Shuffle controls. Never autoplay.

**Consequence:** Randomness changes emphasis, not availability. Feature motion communicates the hierarchy swap and becomes immediate for reduced motion.

**Reconsider when:** Analytics or usability testing shows random entry harms comprehension, or a different editorial mechanism offers variety with better control.
