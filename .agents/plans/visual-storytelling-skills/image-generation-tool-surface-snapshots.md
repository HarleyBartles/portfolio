# Image-generation tool-surface snapshots

Working note captured on 2026-09-16 for the portability pass on
`generating-images`. These are observed callable schemas, not promises about the
underlying image model or stable product APIs. Re-check them when implementing an
adapter.

## Codex desktop surface observed in this task

There is no model picker or model-name argument. The callable surface is:

```text
imagegen({
  prompt: string,
  referenced_image_paths?: string[],
  num_last_images_to_include?: number
})
```

- `prompt` is required and carries the explicit generation or editing brief.
- `referenced_image_paths` supplies local files when every target image has a
  local path.
- `num_last_images_to_include` supplies the smallest sufficient number of recent
  conversation images when one or more targets have no local path; the maximum is
  five.
- The two reference mechanisms are mutually exclusive.
- A new generation omits both reference mechanisms.
- The tool exposes no explicit `size`, aspect ratio, image count, transparency,
  style-transfer flag, mask, quality, seed, sampler, steps, CFG/guidance, negative
  prompt, output format, or model selection field.

## Cloud GPT surface reported in this conversation

There is no model picker or model-name argument. The reported callable surface is:

```text
image_generation({
  prompt?: deprecated; leave null,
  size?: value,
  n?: number,
  transparent_background?: boolean,
  is_style_transfer?: boolean,
  referenced_image_ids?: deprecated; normally leave null
})
```

- The effective generation/editing instructions are inferred from conversation
  context rather than passed through `prompt`.
- `size` optionally requests output size.
- `n` optionally requests output count.
- `transparent_background` optionally requests transparency.
- `is_style_transfer` identifies a stylistic transformation.
- Conversation image selection is normally handled by the system rather than by
  populating deprecated `referenced_image_ids`.
- The surface exposes no sampler, seed, steps, CFG/guidance, quality preset,
  explicit negative-prompt field, or aspect-ratio field separate from `size`.

This is the Cloud GPT agent's description of its callable wrapper. It does not
establish which backend model the wrapper uses or describe every end-user image UI.

## Portability consequence

The durable skill contract must define a generation brief independently of its
transport. An adapter may serialize that brief into an explicit `prompt`, place it
in conversation context, or map selected requirements to native fields. Model
visibility, model selection, reference binding, size, count, alpha, style transfer,
masking, and delivery should each be recorded as `supported`, `implicit`,
`unavailable`, or `unknown`; the skill must not infer a backend capability from an
absent wrapper field.
