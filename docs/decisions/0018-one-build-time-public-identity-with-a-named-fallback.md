# ADR 0018: One build-time public identity, with a named fallback

**Date:** 2026-08-29
**Status:** Accepted

**Decision:** The portfolio owns its public origin and base path in one tracked
site profile. The custom domain is the active canonical identity;
`github.io/portfolio` remains an explicit rebuild profile for rollback. The
browser hostname never chooses metadata, routes, or copied links.

**Why:** A canonical is a public claim, not a runtime guess. One profile lets
Vite, client metadata, static route documents, sitemap, robots and deployment
checks make the same claim, while keeping a blocked custom-domain activation
recoverable without a cross-language search-and-replace.

**Consequences:** GitHub Pages settings, DNS, TLS and social-preview caches
remain separate proof surfaces after deployment. `www` redirects to the apex;
the fallback profile is not a second indexed identity.

**Reconsider when:** The hosting architecture changes materially. Do not add
runtime host branching merely to support another preview environment.
