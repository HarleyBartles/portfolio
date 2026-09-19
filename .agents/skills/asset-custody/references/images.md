# Image custody

## Source identity

For a production image, establish the owning source and current public consumer before changing bytes. Where the asset family has accepted/candidate manifests, generation receipts, or normalized provenance, those records must agree with the exact source master.

Generated-image masters selected for page iteration follow `.agents/playbooks/generated-image-custody.md`: preserve the exact selected bytes, hash, intrinsic dimensions and byte count, then record tool/model and prompt/brief metadata only when retained evidence actually supports them. An explicit unknown is valid provenance; an inferred seed or reconstructed backend prompt is not.

## Derivatives

Public page media may be a deterministic descendant of a larger or lossless source master. Record crop/mask/resize/format lineage rather than treating the derivative as a new authored source.

Prefer the format and dimensions already defined by the owning processor. Current governed image families use Sharp to produce deterministic page formats such as WebP and AVIF, with the exact outputs owned by each processor and receipt. Do not manually re-encode an output that a repository processor owns.

## Presentation

- Give meaningful images useful alternative intent in their consuming component/content.
- Decorative images use empty alternative text or the appropriate accessibility-tree exclusion.
- Preserve explicit intrinsic dimensions where they help prevent layout shift.
- Lazy-load below-the-fold media when appropriate; do not make decorative media block useful content.
- Use responsive/art-directed sources only when the composition has evidence for distinct variants.

## Review

Generated or externally sourced imagery still requires visual/legal review for trademarks, protected trade dress, misleading source claims, and mismatch with the portfolio's design contract. Passing a deterministic custody check proves identity and lineage, not taste or rights beyond the recorded evidence.
