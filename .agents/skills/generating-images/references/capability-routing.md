# Capability routing

Select the current OpenAI image surface by the behaviour the operation needs. A
product name, assumed model version, or convenient interface is not evidence that
the required behaviour exists. If no authorised capability satisfies the
requirement, stop with `blocked by missing capability` and record what is missing.

## Discover in this order

1. Read the requested operation and output contract. Separate hard requirements
   (for example, an edit must preserve a face) from preferences (for example,
   preferred speed).
2. Inspect the environment's declared image tool schema and harness instructions.
   Never assume Codex and ChatGPT expose the same controls.
3. Build a short capability card for each candidate. Do not infer support from a
   marketing label or from a previous run.
4. Select the smallest authorised capability that satisfies all hard requirements.
   If several qualify, prefer the one with the clearest output custody and the
   least irreversible transformation.
5. Record the selected capability and its constraints in the handoff record.

If the environment exposes no declared capability registry, use the adapter's
documented discovery surface or run a bounded capability probe before selecting
it. A generic provider label is not a capability card. If discovery cannot prove
the required operation, use the blocked terminal state.

## Capability card

```text
Capability: <local identifier or provider adapter>
Operation: generate | edit | variation | inpaint | outpaint | composite | cutout | convert
Input roles accepted: <reference, target, mask, identity, composition, style, palette>
Reference count/limits: <known limit or unknown>
Mask support: yes | no | unknown
Transparency: native | preserved on input | no | unknown
Output delivery: <actual local path, returned media, or provider result>
Composition control: <what can be locked or is likely to drift>
Known constraints: <format, size, text, identity, rate, or policy limits>
Authorisation/custody: <why this route is allowed and where results belong>
Evidence checked: <adapter documentation, capability listing, or run result>
```

Unknown is not yes. A capability that has not demonstrated masks, transparency,
reference roles, or output delivery cannot be selected when those are hard
requirements.

## Behaviour matrix

| Requirement | Evidence needed before selection | If absent |
| --- | --- | --- |
| New raster image | A generation operation returning media | Route to another generator or block |
| Controlled edit | Target input plus an edit operation | Do not phrase an edit as a new generation |
| Multiple reference images | Explicit multi-reference support and role mapping | Use one reference only if it preserves the brief, otherwise block |
| Masked local change | Mask input and documented mask semantics | Do not promise local-only editing |
| Transparent cutout | Native alpha or verified alpha-preserving output | Keep background or block; do not fake transparency with a checkerboard |
| Project-bound output | Stable retrieval and a writable destination | Preview-only result cannot satisfy handoff |
| Identity or exact composition | Suitable reference fidelity and invariant control | Escalate unresolved risk to the brief or block |
| Iteration | Comparable rerun with the same prompt and inputs | Do not compare unlike variants |

## Observed OpenAI surface adapters

These cards record field evidence from 2026-09-16. They are routing defaults, not
permanent API promises. Re-enumerate the callable schema when it differs.

### Codex built-in image surface

```text
Instruction transport: required, assistant-written prompt
Reference binding: local paths OR the smallest sufficient count of recent images
Reference behaviour: all included images condition one generated result; prose assigns roles and attention
Output cardinality: one surfaced artifact per call in the observed wrapper
Size/aspect: no structured control; semantic aspect intent preserved around a provider-normalized raster area
Transparency: no flag; can be generated or preserved when stated explicitly, but must be inspected
Model selection: unavailable
```

Operational rules:

- Omit both reference mechanisms for a new image. An unbound explicit prompt does
  not silently import recent conversation images in the observed surface.
- Use a direct local path when the intended source is known on disk. Use recent
  image binding only when conversation images are the intended references.
- The two binding routes are mutually exclusive. When several recent images are
  included, identify each target and non-target by visible content and role.
- Issue separate calls for separate deliverables. Several references are inputs to
  one result, not a batch-output mechanism.
- Treat dimensions, alpha, and exact colour as post-generation inspection items.

### ChatGPT Cloud built-in image surface

```text
Instruction transport: conversation-derived; exposed prompt field was deprecated and left null
Reference binding: selected by the product from visible conversation images or native edit UI
Structured controls observed: optional size, image count, transparent background, style-transfer intent
Output cardinality: context-sensitive; several artifacts can surface when the conversation establishes distinct deliverables
Size/aspect: requested dimensions normalized in observed calls
Transparency: native request supported and verified, but inspect the returned alpha
Model selection: unavailable on the callable surface
```

Operational rules:

- Put one complete, unambiguous image job in the current conversational request.
  Earlier context can help reference following, but it can also contaminate action
  classification, multiplicity, and content.
- Do not assume an exposed field is writable merely because it appears in a schema.
  Follow the harness instruction for deprecated or product-managed fields.
- Native edit UI, ordinary attachment-plus-chat, and fresh generation can bind
  images differently. Record the invocation route actually used.
- Treat `n`, style-transfer intent, size, and model identity according to observed
  behaviour, not their labels alone.

## Shared proven behaviour

- Image inputs are conditioning references. Prose can select one image for a tight
  near-copy or synthesize named features from several references.
- Tight prompts can preserve perceptual identity extremely well, but identical
  no-change calls still produce distinct decoded pixels.
- A requested hex value guides rendered colour; it does not guarantee exact pixel
  values. Exact wordmark and brand-colour work needs deterministic tooling.
- Generated dimensions can preserve aspect while changing pixel size. Very wide
  frames may be normalized or padded.
- Transparency must be explicitly requested or preserved and then inspected. PNG
  encoding alone is not proof of alpha.

## Adapter boundary

An adapter translates this contract to a concrete OpenAI runtime or application.
Keep changing schema details in this compatibility reference. An adapter must state
which capability-card fields it implements, its authentication and output rules,
and its source evidence. Never hide harness defaults in a generic prompt or claim
that a missing adapter was used.

## Terminal routing

- `not generated because the brief is incomplete`: crop, subject, operation, or
  other story-critical direction is unresolved; route back to
  `directing-visual-stories`.
- `blocked by missing capability`: the required behaviour or authorised output
  custody is unavailable; name the exact missing field.
- `generated but unresolved`: a capability returned media, but inspection found
  a material defect or an unverified invariant.
- `selected and handed off`: the selected result and all custody evidence are
  available at the declared destination.
