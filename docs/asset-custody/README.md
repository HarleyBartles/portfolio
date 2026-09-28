# Asset custody ledgers

These JSON ledgers record the source, rights, transformations, and fallback intent for assets used by the portfolio. Each ledger's `assetPaths` lists the exact public or imported files it covers. The portfolio quality gate compares those paths with the files in the client. `groups` and their records retain the provenance and presentation notes.

| Ledger | Scope |
| --- | --- |
| [Typography](typography.json) | Self-hosted font packages, licences, and fallback roles |
| [Brand](brand.json) | Portfolio mark, icon fallbacks, and social card |
| [Patch derivatives](patch-derivatives.json) | Patch source assets and derivative history |
| [Patch heist](patch-heist.json) | Heist Crew assets and rights context |
| [Patch fairytales](patch-fairytales.json) | Fairytale page art and derivatives |
| [Patch lockups](patch-lockups.json) | Canonical Patch lockups and fallbacks |
| [Learning Lab](learning-lab.json) | Case-study scene derivatives and source limits |
| [Marketplace](marketplace.json) | Case-study icons and their source bundles |
| [Wild Bunch](wild-bunch.json) | Development captures and concept art |
| [Writing](writing.json) | Article diagrams and outlined-wordmark figures |
| [Homepage](homepage.json) | Homepage editorial artwork and derivatives |
| [The Usual Specialists](usual-specialists.json) | Accepted page assets and their source packages |

Where a processor publishes a derivative receipt, that receipt owns exact output identity. The ledgers explain why and how the asset may be used. Before replacing or removing an asset, find its consumers in client source, article Markdown, metadata, and generated routes; update the owning ledger and receipt in the same change.
