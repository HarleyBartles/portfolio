# ADR 0006: Privacy-preserving contact seam

**Date:** 2026-08-21
**Status:** Accepted

**Context:** Public plaintext email addresses and phone numbers are routinely scraped, while a nonfunctional form would be deceptive.

**Decision:** Configure contact delivery only through an environment-provided HTTPS form endpoint. When it is absent, show an honest GitHub fallback and no active submission claim.

**Consequence:** Production source and HTML contain no personal address or phone literal. Enabling delivery requires configuration and verification, not a content edit exposing private data.

**Reconsider when:** A privacy-preserving first-party contact service with equal or stronger abuse controls becomes available.
