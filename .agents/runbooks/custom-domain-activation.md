# GitHub Pages custom-domain activation

This runbook activates the already verified `harleybartles.com` domain for the
portfolio after the Phase 9 source PR has merged and deployed. It does not
treat a local build, a DNS record, or a Pages setting as proof of the others.

## Before the change

1. Confirm `main` contains the custom-domain profile in `src/client/site.config.json` and the Pages deployment for that commit has succeeded.
2. Re-read the GitHub Pages settings and the live DNS answers. Do not rely on an older screenshot or a previous registrar configuration.
3. In the repository Pages settings, set the custom domain to `harleybartles.com`. Keep the existing GitHub domain verification record in place.

## Namecheap records

Remove the old parking or redirect records that conflict with the names below,
then create these records with Namecheap BasicDNS:

| Type | Host | Value |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `HarleyBartles.github.io` |

Do not add wildcard records. GitHub Pages routes `www.harleybartles.com` to the
apex; the apex is the only canonical host.

## Proof after propagation

1. Confirm both hosts resolve to GitHub Pages and `http://` redirects to HTTPS.
2. Confirm `https://www.harleybartles.com/` redirects to `https://harleybartles.com/`.
3. Confirm the homepage, one project, one writing route, one Patch route, the CV, and an unknown route return the expected status, title and canonical. Run `py -3 tools/run.py ci --check` locally and `py -3 tools/check_public_routes.py --origin https://harleybartles.com` against the deployed host.
4. Wait for GitHub Pages to issue its certificate, then enable HTTPS enforcement in the Pages settings.
5. Inspect a representative share preview only after the deployed HTML is correct; cached social previews are a separate platform surface.

## Rollback

If the custom domain cannot be verified or the certificate does not issue,
switch `activeProfile` to `github-pages-fallback`, rebuild and redeploy. Leave
the user-facing portfolio on `https://harleybartles.github.io/portfolio/` until
the blocker is understood. Revert or remove the custom Pages domain and DNS
records only after recording the observed failure and confirming the fallback
is live.
