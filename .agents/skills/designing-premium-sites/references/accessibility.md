# Accessibility

Accessibility is a quality signal, not a feature for later. *Resilient Web Design* argues that the web's strength is its openness to every device and user. A portfolio that only works for one kind of visitor is not resilient. *The Shape of Design* makes the case for delight through accommodation: the more a visitor feels the space was designed for them, the more the work resonates.

## Core lessons from the source

- The web is for everyone. Until JavaScript finishes loading, no one has JavaScript. Until the font loads, the system font is the typeface. A portfolio must work in these states.
- Contrast is part of the palette. Colour choices should be strong enough from the start. Body text can be softer than pure black, but important text and interactive elements must remain clearly distinguishable.
- Focus states are visible. Keyboard navigation should work, and focus should be visible and predictable. A missing focus state is a missing detail.
- Alt text and labels are content. Write alt text and form labels with the same care as the visible copy. They should inform, not describe.
- Motion must be optional. Respect `prefers-reduced-motion` and ensure the page is usable without animations.
- Semantic HTML is the foundation. Use the right elements for the right purposes. Material honesty in HTML is the first layer of accessibility.

## $10k vs $500

| $500 | $10k |
|---|---|
| Contrast only checked later | Contrast and focus states are part of the first draft |
| Keyboard navigation broken or untested | Focus order and visible focus states are designed and verified |
| Alt text and labels absent or generic | Alt text and labels are treated as content, not metadata |
| Core features depend on JavaScript | Core features work for every device and preference |
