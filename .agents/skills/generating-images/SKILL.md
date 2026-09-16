---
name: generating-images
description: Use when OpenAI image generation in Codex or ChatGPT must generate, edit, composite, vary, or inspect raster imagery from an authored brief or reference images.
---

# Generating Images

This skill provides current OpenAI image-tool mastery across Codex and ChatGPT
surfaces. It discovers the callable contract actually present, translates an
authored visual direction into that surface's instruction and reference model,
controls constrained regeneration, inspects the returned media, and hands off only
truthful assets.

It is a substantially modified Apache-2.0 derivative of the `imagegen` skill named
in [`NOTICE.md`](NOTICE.md). The core is portable between OpenAI harnesses; observed
surface details live in the routed compatibility reference and must be re-checked
when the exposed tool changes.

## Boundary

Use `directing-visual-stories` first when crop, scale, viewpoint, perspective,
focus, lighting, palette, attention, or story intent is unresolved. This skill
translates an approved direction into generation or editing work; it does not
quietly make those creative decisions by omission.

Use this skill when the requested output is a raster image: new image, variation,
edit-like constrained regeneration, inpaint/outpaint where exposed, composite, or
cutout. Prefer deterministic raster editing, native vector, HTML, CSS, or canvas
when exact pixels, masks, dimensions, text, wordmarks, or brand colours are the
contract.

## Route by operation

| Need | Read next |
| --- | --- |
| Discover and adapt to the current Codex or ChatGPT image surface | [`references/capability-routing.md`](references/capability-routing.md) |
| Turn a direction into a surface-ready brief | [`references/prompt-contract.md`](references/prompt-contract.md) |
| Choose generate, edit, variation, compositing, or conversion | [`references/generation-and-editing.md`](references/generation-and-editing.md) |
| Preserve crop, pose, lighting, palette, or other locked decisions | [`references/preserving-frame-invariants.md`](references/preserving-frame-invariants.md) |
| Inspect, compare, iterate, or report a failed result | [`references/validation-and-iteration.md`](references/validation-and-iteration.md) |
| Place, attribute, and hand off the selected asset | [`references/asset-handoff-and-custody.md`](references/asset-handoff-and-custody.md) |

Read only references needed for the operation. Harness details belong in the routed
compatibility layer, not in the creative brief.

## Required flow

1. Identify operation, intended use, output format, and whether the result is
   preview-only or project-bound.
2. Confirm the creative direction exists. Record unresolved creative choices as
   open decisions for `directing-visual-stories`; do not invent them.
3. Inspect the current OpenAI tool schema. Do not import controls from another
   harness, product surface, prior run, or marketing label.
4. Label each input image by role: edit target, content/reference source,
   identity/character, composition, style/material, palette, mask, or composite
   insert.
5. Select the matching OpenAI surface adapter by behaviour: instruction transport,
   reference binding, output cardinality, transparency, size/aspect behaviour, and
   output delivery.
6. Translate the direction into a concise prompt or operation specification,
   preserving exact text, invariants, avoid items, and output requirements.
7. Generate or constrain-regenerate without overwriting source assets. Treat every
   reference as conditioning input and direct attention through explicit image
   roles. Plan one independently surfaced artifact per call unless the current
   surface proves another contract.
8. Inspect the full frame and relevant details against the direction and invariants,
   including actual dimensions, alpha, colour, text, and reference-role adherence.
9. Iterate one material defect at a time. Keep variants comparable and report
   capability failure, unresolved defects, or missing custody evidence plainly.
10. Hand off the selected asset with its actual location or provider result,
   operation and capability used, references and roles, prompt/brief trace,
   inspection result, unresolved defects, and licence/provenance.

## Core operating model

- References condition a new result. A tight edit brief can achieve practical
  visual equivalence, but it does not promise byte or pixel identity.
- Prose routes attention. Name which image supplies identity, environment,
  composition, geometry, material, palette, or the base frame to preserve.
- Hard delivery requirements need proof. A `.png` name does not prove alpha; a hex
  code does not prove exact pixels; requested dimensions do not prove returned
  dimensions.
- Use deterministic post-processing for contractual colour, size, crop, encoding,
  masks, logos, or wordmarks. Do not make the generator impersonate an image editor.

## Terminal outcomes

The workflow ends with exactly one truthful state: `selected and handed off`,
`generated but unresolved`, `blocked by missing capability`, or `not generated
because the brief is incomplete`. Never imply an image exists when the selected
capability did not return one, and never leave a project-bound asset only in an
untracked provider or temporary location.

Treat observations from one harness, repository, or result as local evidence until
they are corroborated and promoted into the routed compatibility guidance. One
successful generation is not automatically a universal tool contract.
