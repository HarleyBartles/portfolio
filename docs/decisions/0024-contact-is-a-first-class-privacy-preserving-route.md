# ADR 0024: Contact is a first-class privacy-preserving route

**Date:** 2026-09-04
**Status:** Accepted

**Context:** Contact was stranded at the bottom of About, coupling the professional assessment surface to the conversion form and making intentional inbound journeys depend on a page hash.

**Decision:** Keep About as the professional assessment surface and move the existing Contact composition to `/contact`. Route-local form state and privacy behaviour remain unchanged. About, the CV and the homepage professional close link to `/contact`; `/about#contact` redirects there for compatibility.

**Consequence:** The contact journey has canonical metadata and a direct route without inventing a second visual language or repeating the form. The route remains discoverable through intentional conversion links and preserves the no-plaintext-contact-data contract.

**Reconsider when:** Navigation research shows the route is undiscoverable, or a stronger privacy-preserving contact service changes the delivery contract.
