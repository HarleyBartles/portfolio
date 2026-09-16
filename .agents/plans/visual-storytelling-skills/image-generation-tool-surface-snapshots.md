# Image-generation tool-surface snapshots

Working note captured on 2026-09-16 for the portability pass on
`generating-images`. These are observed callable schemas, not promises about the
underlying image model or stable product APIs. Re-check them when implementing an
adapter.

All locally generated Codex spike artifacts were disposable evidence. After the
measurements and observations below were captured, the task-scoped output directory
and its 38 files were deleted on 2026-09-16. Any generated-image paths retained in
this note are historical identifiers, not live deliverables or repository assets.

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

## Codex built-in black-box spike

Run on 2026-09-16 through the exact Codex desktop callable surface above. All six
calls used a deliberately simple matte cube so transport behavior was easier to
distinguish from creative variation. The generated masters remain under the task's
default `C:\Users\hbart\.codex\generated_images\01a0a6d6-3c0b-7e00-aae3-b55d739b76e7\`
directory.

| Probe | Requested through prompt text | Observed output | Finding |
| --- | --- | --- | --- |
| A | Baseline, no size/model/quality | `1374x1145`, RGB | Automatic size is non-canonical and not square. |
| B | Sunburst, max, exact `3840x2160` | `1672x941`, RGB | Preserved 16:9 closely; did not honor exact pixels. |
| C | Exact `1024x1024`, native transparency | `1254x1254`, ARGB; corner alpha `0` | True alpha works; exact pixels did not. |
| D | Local-file edit: red to blue, lock frame | `1374x1145`, RGB | Local reference-path edit works and preserved canvas and visible composition closely. |
| E | Flare, low, exact `1536x1024` | `1536x1024`, RGB | Exact supported-looking size was honored. |
| F | Sunburst, max, exact `1536x1024` | `1536x1024`, RGB | Matched size was also honored; output exposed no proof of model or quality selection. |

The tool returned no request echo, resolved model, resolved quality, request ID, or
backend capability metadata. Prompting with a model or quality name therefore
cannot establish that it was selected. Dimensions behave as soft generation
requirements: canonical-looking `1536x1024` was honored in both matched calls,
while `1024x1024` and `3840x2160` were replaced by other dimensions. Aspect ratio
was more reliable than exact pixel size. Genuine transparency and local-path edits
are empirically supported in this task.

### Codex explicit-prompt isolation probe

The conversation first established and then repeated a complete fantasy board-game
weapon-card brief for a spear named `ROADWARD SPEAR`, priced at exactly `75 GOLD`,
with a roadside dawn composition. Separately, before that conversation, a private
prompt file had been written at
`C:\Users\hbart\.codex\generated_images\01a0a6d6-3c0b-7e00-aae3-b55d739b76e7\shield-card-private-brief.md`.
It specified an item card for a repaired round shield named `WAYFARER'S GUARD`,
priced at exactly `200 GOLD`, against a mountain-pass setting.

The file was then read verbatim and its complete contents passed directly as the
Codex `imagegen.prompt` value. No reference images were supplied. The generated PNG
was saved as
`C:\Users\hbart\.codex\generated_images\01a0a6d6-3c0b-7e00-aae3-b55d739b76e7\exec-2b2781ec-7e95-4db0-98ae-01b3f1578211.png`.

The result followed the explicit tool prompt across every deliberately conflicting
visible decision:

- shield rather than spear;
- `WAYFARER'S GUARD` rather than `ROADWARD SPEAR`;
- `200 GOLD` rather than `75 GOLD`;
- repaired blue round shield and mountain pass rather than roadside spear at dawn;
- no visible carry-over from the immediately preceding spear-card brief.

This is strong black-box evidence that the Codex `prompt` value acts as a writable
instruction-isolation boundary for generation, unlike the observed Cloud wrapper's
conversation-derived instruction transport. It does not prove absolute isolation
under every task, hidden policy, reference-image, or multi-turn condition. The
portable adapter should nevertheless treat a complete explicit Codex prompt as the
primary generation envelope and should not rely on surrounding conversation to
complete it.

### Codex artifact-cardinality probe

Six calls were run after the isolation probe. Every prompt required portrait 2:3
fantasy board-game cards and explicitly prohibited triptychs, collages, contact
sheets, grids, or more than one card inside an artifact. Each call surfaced exactly
one PNG at `1024x1536`.

| Probe | Requested in one explicit prompt | Surfaced result | Output |
| --- | --- | --- | --- |
| A | Three separate variants of `WAYFARER'S GUARD` | One ordinary shield-card artifact; no collage | `exec-8da03dfa-3c97-4b32-b6d2-0495bd86b1d9.png` |
| B | Three separate semantically distinct cards: spear, shield, spell | One ordinary `ROADWARD SPEAR` artifact, matching the first requested deliverable | `exec-c91ba7a8-58dd-4823-a7b5-476df9bb5947.png` |
| C | Three separate red, blue, and green variants of `MOON-SCRIPT` | One ordinary red `MOON-SCRIPT` artifact, matching the first requested variation | `exec-826e4e19-3a4d-42b6-8ebc-458f04ea2ad0.png` |
| D1 | Exactly one `ROADWARD SPEAR` after the multi-output context | One spear card with `75 GOLD`; no multiplicity leakage | `exec-ac622cdf-d1bf-434f-bb6e-631bfd93a79f.png` |
| D2 | Exactly one `WAYFARER'S GUARD` after the multi-output context | One shield card with `200 GOLD`; no multiplicity leakage | `exec-d12d87fa-8c77-4fe8-b2f3-7f241db2f273.png` |
| D3 | Exactly one blue `MOON-SCRIPT` after the multi-output context | One spell card with `120 GOLD`; no multiplicity or prior-red leakage | `exec-fca4e86c-26ca-4f9f-9ea3-357f56b1afca.png` |

On this Codex wrapper, requesting several independent outputs through one explicit
prompt did not yield several surfaced artifacts. With composites prohibited, the
call collapsed to one ordinary image and selected the first requested deliverable
or variation. The tool schema exposes no `n` or output-count field, and its result
contract surfaced only one generation result per invocation.

The subsequent singular controls provide a second prompt-isolation result. Recent
conversation and tool history contained repeated requests for three outputs and
three colour variants, yet every explicit singular prompt produced one ordinary
card matching its own subject, value, and colour. This contrasts with the Cloud
wrapper, where multiplicity semantics leaked across calls because conversation was
the effective prompt transport.

This probe does not prove that the underlying image service is incapable of batch
generation, nor what would happen if a composite were permitted. It establishes
the useful adapter contract for the exposed Codex surface: plan one independently
surfaced artifact per tool call, issue separate calls for separate deliverables,
and use the explicit prompt to keep each call isolated.

### Codex raster-size normalization probe

The same minimal red-cube scene was generated with exact pixel dimensions stated
in the explicit prompt. Codex exposes no native size field, so these were semantic
requirements rather than structured tool controls. Existing square, 3:2, 16:9,
and 2:3 observations were retained; seven new calls filled the small/large and
additional-ratio cases.

| Requested | Returned | Requested pixels | Returned pixels | Output |
| --- | --- | ---: | ---: | --- |
| `512x512` | `1254x1254` | 262,144 | 1,572,516 | `exec-9fe7d394-53fb-4665-9442-0715c67376fc.png` |
| `1024x1024` | `1254x1254` | 1,048,576 | 1,572,516 | existing transparent probe C |
| `2048x2048` | `1254x1254` | 4,194,304 | 1,572,516 | `exec-441c949b-c336-421a-aef6-1f0882c5d662.png` |
| `768x512` | `1536x1024` | 393,216 | 1,572,864 | `exec-a279f9f3-f1cd-4329-b174-9fbb5b1ae991.png` |
| `1536x1024` | `1536x1024` | 1,572,864 | 1,572,864 | existing probes E and F |
| `3072x2048` | `1536x1024` | 6,291,456 | 1,572,864 | `exec-46d903e9-46e6-46a3-8e93-d9c59ea977e1.png` |
| `1280x720` | `1672x941` | 921,600 | 1,573,352 | `exec-935cb722-5908-4403-9232-abd0becb08b8.png` |
| `1920x1080` | `1672x941` | 2,073,600 | 1,573,352 | `exec-c82bd6e7-048e-45ac-b6e2-6da237439413.png` |
| `3840x2160` | `1672x941` | 8,294,400 | 1,573,352 | existing probe B |
| `800x1000` | `1122x1402` | 800,000 | 1,573,044 | `exec-e4a167fb-9237-42b7-9ada-6df9ef2d2001.png` |
| `1600x2000` | `1122x1402` | 3,200,000 | 1,573,044 | `exec-5db6361a-b1e1-4a38-9b14-c9c962f79af0.png` |
| `2520x1080` | `1915x821` | 2,721,600 | 1,572,215 | `exec-b32aeddc-80c1-4629-b5b5-f267dd407a79.png` |
| portrait 2:3 card | `1024x1536` | unspecified | 1,572,864 | all six cardinality outputs |

Every requested ratio was preserved exactly or within integer rounding, while
small, nominal, and oversized requests at the same ratio converged on the same
returned raster. Across the measured ratios, returned area ranged from 1,572,215
to 1,573,352 pixels, a spread below 0.08%. The original no-size baseline at
`1374x1145` also contains 1,573,230 pixels.

This confirms the same black-box model observed in Cloud: the built-in product
surface accepts flexible aspect-ratio intent but normalizes output to roughly
**1.573 megapixels**. It is not a maximum-edge rule or a set of pass-through
canonical dimensions. `1536x1024` and `1024x1536` only appear exact because those
dimensions already sit on the normalized 3:2 and 2:3 raster.

The Codex adapter should therefore treat aspect ratio as a meaningful creative
requirement, exact requested pixels as unsupported, and the returned raster as
provider-normalized. When a destination requires exact dimensions, inspect the
actual output and perform a separate deterministic resize/crop operation without
claiming that image generation produced the requested raster directly. This result
does not prove that every possible ratio or future backend uses the same area.

### Codex reference binding probe

#### R1: local-path edit target

The original red-cube baseline was passed directly through
`referenced_image_paths` as the sole edit target:

`C:\Users\hbart\.codex\generated_images\01a0a6d6-3c0b-7e00-aae3-b55d739b76e7\exec-fa39a11f-e307-4b80-836b-34179ad22fc6.png`

The explicit prompt changed only the cube from matte red to matte cobalt blue and
locked canvas, crop, aspect ratio, viewpoint, perspective, silhouette, scale,
position, background, lighting, highlights, shadow, focus, negative space, and all
other visible elements. The returned edit was:

`C:\Users\hbart\.codex\generated_images\01a0a6d6-3c0b-7e00-aae3-b55d739b76e7\exec-82bae3b6-2443-4653-92ae-b866202c8696.png`

Both files are `1374x1145` RGB PNGs. The result changed the cube to cobalt blue
while closely preserving the visible composition, geometry, background, lighting,
and shadow. This independently repeats the earlier local-path edit result, which
also preserved the source canvas exactly. The callable result exposed no edit
lineage, resolved operation, backend alias, or request ID, so native parent binding
cannot be proved from metadata. Local-path reference editing is nevertheless
empirically strong enough to prefer for a known filesystem edit target.

The then-pending recent-image and unbound controls are covered by R2-R10 below.

#### R1b: local-path edit with a complex transparent character

A second, materially harder local-path edit used the user-supplied transparent PNG
`C:\Users\hbart\Downloads\ChatGPT Image Sep 13, 2026, 10_36_59 PM.png`. The image
contains a crouching masked character in a charcoal hoodie, with dense harness,
backpack machinery, gloves, trousers, footwear, metal components, and existing
small red equipment accents. The prompt changed only the hood, torso, and sleeve
fabric to rich matte red while locking fabric detail, character identity, pose,
anatomy, crop, scale, silhouette, viewpoint, equipment colours, rendering style,
and transparency.

The result was saved as
`C:\Users\hbart\.codex\generated_images\01a0a6d6-3c0b-7e00-aae3-b55d739b76e7\exec-14711685-a116-42b8-827e-3542a4b199dc.png`.
Source and result are both `1122x1402` RGBA PNGs with fully transparent corner
pixels. The visible result changed the hoodie fabric to red while preserving the
pose, silhouette, mask, trousers, gloves, shoes, harness, machinery, cable spool,
existing equipment accents, crop, and transparent background closely. This extends
the local-path evidence beyond a simple cube: selective recolouring can preserve a
complex layered character and alpha channel when the changed region and locked
invariants are explicit.

#### R2: latest-image binding and explicit alpha preservation

Two complex character edits used `num_last_images_to_include=1` with no
`referenced_image_paths`, proving that the Codex wrapper can bind the single latest
conversation image as an edit target.

The first source was
`C:\Users\hbart\Downloads\ChatGPT Image Sep 10, 2026, 06_22_35 AM (3).png`, a
`1024x1536` RGBA character illustration. The prompt changed only the brown knitted
cardigan to muted teal and locked the remaining composition and character details.
The result at
`C:\Users\hbart\.codex\generated_images\01a0a6d6-3c0b-7e00-aae3-b55d739b76e7\exec-1b661217-6ef6-4d2f-9882-6effcc07646a.png`
preserved the dimensions and visible scene closely, but returned as RGB and lost
the source alpha channel. The prompt did not explicitly demand alpha preservation.

The second source was
`C:\Users\hbart\Downloads\ChatGPT Image Sep 10, 2026, 07_44_05 AM (2).png`, also a
`1024x1536` RGBA character illustration with fully transparent corner pixels. The
prompt changed only the teal hoodie to purple and explicitly required the genuine
transparent background and alpha channel to remain transparent wherever the source
was transparent. The result at
`C:\Users\hbart\.codex\generated_images\01a0a6d6-3c0b-7e00-aae3-b55d739b76e7\exec-60b0f98a-c38b-477b-8aea-52514b035b6f.png`
is `1024x1536` RGBA with all four corner pixels still at alpha `0`. It recoloured
the hoodie while closely preserving the face, antennae, hands, trousers, shoes,
bag, notebook, pencil, pose, crop, and rendering style.

Together, these probes establish that latest-image binding works for precise edits
and can preserve alpha without an exposed transparency flag, but alpha preservation
is not a safe default. Portable edit briefs should state transparency as an explicit
invariant whenever the source contains alpha, and implementations should inspect the
returned file rather than infer preservation from its `.png` extension.

#### R3: three-image recent-context selection

Three visually related wall-frame images were supplied together and the edit call
used `num_last_images_to_include=3` with no filesystem reference paths. The prompt
identified the target only by content: the wide landscape cracked-wall opening with
two steel acrow props supporting a rusted horizontal steel joist. It explicitly
excluded the two wall frames without that structure, requested yellowy-cream paint
only on the target's left and right plaster faces, and locked transparency and all
other materials.

The wrapper selected the correct image and returned
`C:\Users\hbart\.codex\generated_images\01a0a6d6-3c0b-7e00-aae3-b55d739b76e7\exec-b57b2338-3a7f-444d-a28d-f8da88aa8d32.png`.
The visible result recoloured the intended plaster faces while preserving the acrow
props, joist, rubble, timber, wall geometry, and transparent opening. It did not
visibly import the exposed-brick layout or geometry of either non-target image.

The `1672x941` RGBA source became `1671x941` RGBA; all four result corners remained
at alpha `0`. Multi-image recent-context binding can therefore select a target by a
distinctive content description and resist obvious cross-image contamination, but
it does not guarantee pixel-exact canvas dimensions even for a constrained edit.
Portable workflows should name both positive target identifiers and explicit
non-target exclusions, preserve alpha as a written invariant, and inspect returned
dimensions rather than assuming source-size identity.

#### R4: one call cannot deliver three independent edits

Three separate transparent wall-frame illustrations were supplied through
`num_last_images_to_include=3`. One prompt explicitly requested three independent
edited outputs, applying `#e6eaeb` to every plaster face in each source while
forbidding a collage, composite, hybrid, or geometry transfer.

The call returned exactly one artifact:
`C:\Users\hbart\.codex\generated_images\01a0a6d6-3c0b-7e00-aae3-b55d739b76e7\exec-b45498d9-e0b3-4a26-94c6-0a0b908fefc7.png`.
It selected and edited the first recent image, the wide exposed-brick wall frame.
It did not return edited versions of the second or third source and did not produce
a collage or obvious hybrid. The returned PNG preserved the first source's
`1672x941` RGBA canvas and fully transparent corner pixels.

This confirms that multiple recent images are reference inputs, not an output
cardinality mechanism. Even an explicit request for one output per input does not
override the Codex wrapper's observed one-artifact-per-call contract. A portable
workflow that needs three independent edits must issue three separate calls, bind
one edit target per call, and validate each returned artifact. The requested hex
colour may guide generated appearance, but exact pixel-level colour matching should
not be assumed without measurement or deterministic post-processing.

#### R5: prose-directed synthesis across three references

Three recent images were assigned distinct roles in one call through prose:

- take the rusted steel joist and two weathered green acrow props from the first,
  wide structural frame;
- take the exposed red-brick distribution and broken-wall material treatment from
  the second, wide brick-heavy frame;
- take the tall portrait proportions and central-opening geometry from the third,
  unsupported portrait frame.

The prompt explicitly requested one new coherent synthesis rather than an edit,
collage, split panel, or set of independent outputs. The returned artifact was
`C:\Users\hbart\.codex\generated_images\01a0a6d6-3c0b-7e00-aae3-b55d739b76e7\exec-fb8e3dac-66f4-494b-8038-6747c27ec0bf.png`.
It is a `941x1671` RGBA portrait PNG with all four corner pixels at alpha `0`.

The result visibly combines all three requested attributes: tall portrait frame
geometry, a horizontal rusted top joist supported by two green acrow props, and
irregular exposed red brick distributed through the broken wall perimeter. It is
not a near-copy of any single source and does not preserve any one source canvas.
This strongly supports the operational model that every included image is available
as a conditioning reference and that prose can direct attention to different
features from different inputs. It does not expose or prove the private backend
architecture, but it disproves the narrower model that the wrapper merely chooses
one attachment as an edit target and ignores the others.

#### R6: identical no-change requests are stochastic regenerations

One detailed `1254x1254` RGB illustration was bound by the same explicit local path
in two independent calls. Both calls received byte-for-byte identical prompts asking
for an exact reproduction with no intentional change and locking the subject,
objects, crop, canvas, perspective, lighting, colours, texture, depth of field, and
all positions. The returned artifacts were:

- `C:\Users\hbart\.codex\generated_images\01a0a6d6-3c0b-7e00-aae3-b55d739b76e7\exec-b3b24c79-a49b-4244-8ef4-c8081d838356.png`
- `C:\Users\hbart\.codex\generated_images\01a0a6d6-3c0b-7e00-aae3-b55d739b76e7\exec-2fa4f117-8ed4-4cec-bf4b-fbbc3f454d53.png`

Both retained the source's `1254x1254` RGB format and reproduced the scene very
closely, but all three files had different SHA-256 hashes. Decoded-pixel comparison
rules out mere metadata or PNG recompression differences:

| Comparison | Identical RGB pixels | RGB MAE | RGB RMSE |
| --- | ---: | ---: | ---: |
| source vs output A | 2.2104% | 2.6708 | 5.3649 |
| source vs output B | 0.8681% | 3.2527 | 5.5721 |
| output A vs output B | 1.2978% | 3.5990 | 6.9469 |

The low average errors explain the convincing visual preservation, while fewer than
2.3% exactly identical pixels and the material A/B divergence demonstrate that the
operation did not return or deterministically recolour the source bitmap. Even a
no-change request is a stochastic reference-conditioned regeneration. "Edit" should
therefore be understood operationally as tightly constrained generation: preserve
invariants through a strong brief, then inspect the result rather than assuming
pixel identity.

#### R7: exact hex colour is guidance, not deterministic paint

A `1254x1254` red-cube reference was supplied through
`num_last_images_to_include=1`. The prompt changed only the cube's material base
colour to exact `#e6eaeb` / RGB `(230,234,235)`, explicitly asking directly lit flat
areas to resolve to that value while preserving coherent shading, geometry,
lighting, background, and shadow. The returned artifact was
`C:\Users\hbart\.codex\generated_images\01a0a6d6-3c0b-7e00-aae3-b55d739b76e7\exec-8979f508-83ce-4fa3-bcf8-7934677eb74f.png`.

The output visibly reads as the requested pale blue-grey and preserves the scene
closely. Pixel inspection over a `706x631` crop covering the cube found only 9
pixels exactly equal to `(230,234,235)`, 15,968 pixels within Euclidean RGB distance
3, and 39,199 within distance 10. Exact target pixels therefore can occur, but the
model renders a shaded colour family rather than filling surfaces deterministically
with the requested value.

Hex values are useful semantic colour direction, not a contractual pixel-colour
control. Where an asset must blend invisibly into a webpage background, match a
brand token exactly, or satisfy automated pixel comparison, follow generation with
deterministic masking/recolouring or another image-processing step and verify the
actual pixels.

A stricter flat-wordmark follow-up made the limitation unambiguous. An
`818x217` RGBA image containing a flat teal `PATCH` wordmark on an off-white
background was supplied through `num_last_images_to_include=1`. The prompt required
every opaque interior letter pixel to be exact pure red `#ff0000` / RGB `(255,0,0)`,
with no gradient, shading, texture, tint, or alternate red.

The result at
`C:\Users\hbart\.codex\generated_images\01a0a6d6-3c0b-7e00-aae3-b55d739b76e7\exec-1f91736b-7f06-4304-a764-342d3ed48361.png`
looked strongly red but contained zero exact `(255,0,0)` pixels across the entire
image; only 5 pixels fell within Euclidean RGB distance 3. Among 620,503 broadly red
pixels (`R > 200`, `G < 80`, `B < 80`), the exact-red rate was therefore 0%.

The operation also regenerated the ultra-wide `818x217` source as a normalized
`2170x725` RGB canvas and introduced near-black letterboxing above and below the
off-white artwork. This reinforces two boundaries at once: explicit flat hex colour
still behaves as semantic direction rather than exact fill, and source canvases
wider than the observed roughly `3:1` output envelope may be reframed or padded.
Logos, wordmarks, flat graphics, and exact brand-colour work should use deterministic
vector or raster editing rather than generative recolouring.

#### R8: localized edits can be perceptually well contained

A dense `1254x1254` illustrated office scene was supplied through
`num_last_images_to_include=1`. The prompt replaced only an upper-left brass desk
lamp with the same-shaped lamp in opaque yellow plastic and changed its warm bulb to
a cool-white LED. It allowed only physically necessary local light spill and locked
the character, documents, clock, printer, stationery, furniture, plants, crop,
perspective, and every other object.

The result at
`C:\Users\hbart\.codex\generated_images\01a0a6d6-3c0b-7e00-aae3-b55d739b76e7\exec-12cc5e63-d2f1-4d2b-8dcf-09595699edfb.png`
preserved the source's `1254x1254` RGB canvas. To ordinary visual inspection the
requested change is strongly localized: the lamp is yellow plastic, its bulb and
immediate spill are cool white, and the surrounding dense scene remains effectively
unchanged.

Decoded-pixel comparison using a deliberately generous lamp-region rectangle
(`x=200..540`, `y=120..540`) found RGB MAE `28.3997` inside the intended region and
only `2.8981` across the remaining 1,428,955 pixels. Exact decoded-pixel identity
outside the region was still only `2.2701%`, consistent with the no-change probe's
finding that the whole frame is regenerated at low amplitude even when the visible
edit is local.

The useful operational distinction is therefore perceptual rather than byte-level:
tight edit briefs with explicit invariants can contain visible change extremely
well, even in a crowded scene, but they do not create a literal masked pixel edit.
Human visual review is appropriate for authored illustration work; exact coordinate,
mask, forensic, or round-trip preservation requirements still need deterministic
image tooling.

#### R9: character-reference plus environment-reference compositing

Two recent images were assigned complementary roles: a transparent full-body Silk
character illustration supplied identity, costume, and equipment; a photoreal dingy
cellar corridor supplied the base environment, camera, composition, perspective,
lighting, and texture. The prompt preserved the corridor and staged only a small,
partly occluded rear view of Silk running away around its far-right bend: back and
hood, compact backpack with red cable spool, rear arm and hand, and part of a
trailing leg, with no visible face.

The result at
`C:\Users\hbart\.codex\generated_images\01a0a6d6-3c0b-7e00-aae3-b55d739b76e7\exec-2f4ff829-8878-46a0-a45c-a72f5b1392b3.png`
preserved the corridor source's exact `1852x849` canvas. It retained the environment
as the dominant image and integrated Silk at an appropriately distant scale behind
the corner, with warm environmental lighting, convincing occlusion, a readable
running gesture, charcoal hooded silhouette, and the identifying red-spool backpack.
No extra character or obvious pasted-cutout boundary appeared.

This provides strong evidence that prose-assigned reference roles can support
story-specific compositing: one input can govern character identity while another
governs the environmental frame and visual truth. The brief should state each
reference's role, the base image to preserve, subject scale and depth, occlusion,
visible and hidden anatomy, motion direction, lighting integration, and identity
features that must survive at the chosen size.

The result was accepted as sufficient evidence for the spike, not as finished
production art. The visible figure is a little more exposed and less precisely
directed than the intended story beat. A production iteration should tighten the
staging to show definitely only the trailing leg and rear arm/hand, with Silk
turning into the light at camera-left of the corridor's far end. That refinement was
deliberately not pursued here because the probe had already established the target
capability: distinct character and environment references can be composed into a
coherent, narratively staged frame.

#### R10: an unbound prompt does not silently import conversation images

The final control used edit-like wording about changing a matte red cube to cobalt
blue, but supplied neither `referenced_image_paths` nor
`num_last_images_to_include`. Multiple unrelated images were recent in conversation,
including Silk, a cellar corridor, a wordmark, and a dense office scene.

The result at
`C:\Users\hbart\.codex\generated_images\01a0a6d6-3c0b-7e00-aae3-b55d739b76e7\exec-090cc5bf-68ca-4377-b190-a9af948bf6c6.png`
was a fresh studio image of a single cobalt-blue cube on a neutral grey background.
It contained no visible subject, structure, styling, or composition imported from
the recent conversation images.

This supports a clean operational boundary for the Codex surface: the explicit
`prompt` supplies instructions, while images become conditioning references only
when one of the two exposed binding mechanisms is selected. Edit-like language
without a bound source is interpreted as enough descriptive material to generate a
new image; it does not silently attach the latest visible image. Portable workflows
should therefore make reference binding explicit and should not rely on ambient
conversation visibility alone.

## Cloud GPT built-in black-box spike

Run on 2026-09-16 against the Cloud GPT image-generation wrapper exposed in this
conversation. Before the repository write, the worktree was clean, no Git or hook
process was observed, no Git lock file was present, and the branch was
`codex/directing-visual-stories-plan` at `1a4530134a75474fdcfee1a777c926fbe299e9ce`
(`ahead 1` of its configured remote branch). The existing Codex evidence above was
left unchanged.

The Cloud surface proved more context-sensitive, and less stable as an enumerated
schema, than the first pass suggested. The first attempted baseline was made while
the immediately preceding user turn contained the *entire* A-G spike, including
later instructions to edit the baseline and use it as a style/content reference.
With `prompt=null`, the wrapper classified that call as an edit/restore, found no
usable image target, and blocked before generation. That is not evidence that fresh
generation is unsupported. It is evidence that the wrapper can read too much of a
multi-part conversational instruction when deciding what the current image action
is.

The successful rerun isolated the baseline in its own user turn:

> One matte red cube, centered, on a neutral light-gray seamless studio background,
> with a soft contact shadow. No text. No watermark.

That single-purpose conversational context removed the later edit/reference
instructions from the immediate request. A later control experiment superseded one
part of the first write-up: although the callable schema structurally contains a
`prompt?: string | null` field, the tool-use contract explicitly marks it deprecated
and requires this agent to leave it `null`. The user explicitly authorized and then
instructed the agent to populate that field for a precedence experiment; the agent
still could not do so because the higher-priority tool instruction is not
user-overridable. For this Cloud surface, `prompt` is therefore **present in the
schema but operationally unwritable by the assistant**. Image semantics must be
treated as conversation-derived. The earlier apparent explicit-prompt transport
should not be used as evidence of a durable callable control.

The same conversation also showed that the exposed wrapper shape is not a stable
product contract. Earlier runtime observations appeared to surface an explicit
`aspect_ratio` control; the current callable contract exposes `size` instead and no
separate aspect-ratio field. Record only controls that are actually usable at the
time of invocation, and do not infer a backend API from transient wrapper fields.

| Capability | Cloud surface status so far | Evidence / limitation |
| --- | --- | --- |
| prompt / instruction transport | conversation-derived; schema field present but assistant-writable control `unavailable` | The `prompt` field exists structurally but the tool contract requires `prompt=null`; the user could not override that instruction even for an explicit experiment. The immediately preceding chat turn therefore carries the effective brief and can contaminate action classification or multiplicity. |
| model selection or visibility | selection `unavailable`; backend identity `unknown` | No model picker or model-name field was used or returned. |
| size | exact arbitrary raster control `unsupported` on this Cloud wrapper; aspect-ratio-preserving normalization `verified` | `1024x1024` -> `1254x1254`; `3840x2160` -> `1672x941`; and separate 3:2 requests for `768x512`, `1536x1024`, and `3072x2048` all -> `1536x1024`. This is better explained by a roughly fixed ~1.573 MP output raster budget than by a maximum-dimension cap. |
| output count | `supported` but context-sensitive; `n` is not a strict artifact-count guarantee | Explicit `n=3` produced one artifact in controlled cube probes, but later produced three separate Spell Scroll colour-option artifacts when the conversational request also asked for three distinct options. Separately, semantic multi-card requests returned three artifacts even without a confirmed explicit `n` control. |
| transparent background | `verified` | Probe C used native `transparent_background=true` and returned an RGBA PNG with genuine alpha, including fully transparent and partially transparent pixels. |
| style-transfer intent | wrapper hint `supported`; distinct behavioral effect `unverified` | The exposed field is described as identifying whether the request is a stylistic transformation. Controlled ordinary-chat comparisons with the flag requested `true` versus left unset produced materially equivalent transformations and identical null edit-lineage metadata. Treat it as orchestration intent, not a demonstrated style-strength/fidelity control. |
| image / reference binding | invocation-dependent | Ordinary chat reference and manual image attachment produced reference-following regenerations with `edit_op=null` and `parent_gen_id=null`. The image preview's built-in **Request edits** path produced `edit_op="transformation"` and bound the baseline generation through `parent_gen_id`. |
| quality | `unavailable` in observed calls | No quality field or returned quality setting. |
| aspect ratio | `supported` semantically; current wrapper has no separate stable aspect-ratio field | Square remained square, 16:9 remained effectively 16:9, and 3:2 remained exactly 3:2 while pixel dimensions were normalized. OpenAI's current ChatGPT Images help documentation also says ChatGPT can generate in any aspect ratio. |
| seed / sampler / steps / CFG | selection `unavailable`; returned seed field present but null | No controls were exposed or sent. Result metadata included `seed: null`. |
| negative prompt | `unavailable` | No dedicated field observed. |
| mask / edit-region support | explicit field `unavailable`; backend capability `unknown` | Not exercised. |
| returned request / model metadata | partial generation/edit metadata | Results return `gen_id`, `edit_op`, `parent_gen_id`, an empty returned `prompt`, and `seed`. The native edit invocation demonstrated that `edit_op` and `parent_gen_id` can expose edit lineage. No resolved model, quality, request ID, or backend alias was returned. |

The planned subject for every probe remains one matte red cube, centered on a
neutral light-gray seamless studio background with a soft contact shadow, no text,
and no watermark.

| Probe | Known tool-control state / raw payload status | Instruction transport | Result | What it proves | What it does not prove |
| --- | --- | --- | --- | --- | --- |
| Initial A attempt | `{"prompt":null,"size":null,"n":1,"transparent_background":null,"is_style_transfer":null,"referenced_image_ids":null}` | Entire A-G spike was still in immediate conversation context | Blocked before generation because the wrapper classified the request as an edit/restore and there was no usable image target. No retry was made in that turn. | Conversation context materially affects action classification, and a long multi-probe message can leak later edit intent into the current call. | It does not prove that fresh generation, `n`, `size`, transparency, or any backend model is unsupported. |
| A. Baseline, isolated rerun | Raw native payload is not recoverable from the Chat on Steroids recorder; later tool-contract inspection establishes that assistant-authored `prompt` must be `null`. | Current user turn explicitly contained only the baseline brief. | One PNG artifact, observed `1254x1254`, 1:1. Metadata: `gen_id=e7b9e528-3c58-4de4-ae87-71a60afd4a91`, `edit_op=null`, `parent_gen_id=null`, returned `prompt=""`, `seed=null`. | Fresh generation works when the current chat request is unambiguous, and square intent is retained while raster size is normalized. | It does not identify the backend model or prove a separately writable prompt/aspect-ratio control. |
| B. Large landscape | Raw native payload unavailable; conversational request was for exact `3840x2160` / 16:9. | Current user turn explicitly requested the large landscape cube. | One PNG, observed `1672x941`, effectively 16:9. Metadata: `gen_id=05a49283-ce87-4e44-8fa8-b8d631269250`, `edit_op=null`, `parent_gen_id=null`, returned `prompt=""`, `seed=null`. | Requested aspect ratio is retained very closely while oversized exact pixels are normalized. | It does not identify the backend model or quality setting. |
| C. Native transparency | Raw native payload was not recoverable from the Chat on Steroids recorder; the call explicitly used native `transparent_background=true` and requested a `1024x1024` PNG. | Current user turn contained only the transparency probe brief. | One PNG at `/mnt/data/a_clean_isolated_product_style_cgi_render_image_a.png`, observed `1254x1254`, RGBA. Corner alpha was `0`; the alpha channel contained fully transparent, partially transparent, and opaque pixels, preserving a semi-transparent shadow. Metadata: `gen_id=9e35c695-cd6f-45c5-9724-6468ec7be2f2`, `edit_op=null`, `parent_gen_id=null`, returned `prompt=""`, `seed=null`. | Native transparent-background generation produces genuine alpha rather than a baked white/checkerboard backdrop, and the contact shadow can remain semi-transparent. | Exact `1024x1024` pixels were not honored, and this does not identify the backend model. |
| D1. Conversation-only edit request | Raw native payload unavailable; no explicit image was attached in the current turn. | The current turn asked to change the baseline red cube to cobalt blue while preserving all layout invariants, relying on normal conversation reference behavior. | Output remained `1254x1254`, but the backdrop, cube scale/position, viewpoint, lighting, shadow, and negative space changed materially. Metadata: `gen_id=29fa8c1b-32c4-4e1c-b09b-d0b551218bf7`, `edit_op=null`, `parent_gen_id=null`. | Conversational reference alone can produce the requested subject/color, but did not establish native edit lineage or strong invariant preservation. | It does not prove that the baseline image was bound as an edit parent. |
| D2. Manually attached baseline + indirect "try that run again" | Raw native payload unavailable; the baseline PNG was manually attached in the current turn, while the detailed edit command remained in prior context. | Manual attachment plus an indirect conversational instruction. | Composition preservation improved substantially, but metadata still returned `gen_id=826db625-bfa2-4d5a-8cbb-d5bf40b2c0cf`, `edit_op=null`, `parent_gen_id=null`. | Making the source image directly visible improves reference following. | Image visibility alone does not prove native edit binding; the call still looked like reference-conditioned regeneration. |
| D3. Image-preview **Request edits** invocation | The exact low-level payload is not exposed to the recorder. The immediate edit text was: `Edit the baseline cube image. Change only the cube from matte red to matte cobalt blue. Preserve the crop, canvas size, aspect ratio, viewpoint, cube scale, cube position, background, lighting, contact shadow, focus, and negative space exactly. Do not add or remove anything. No text. No watermark.` | The edit was submitted through the generated image preview's built-in **Request edits** chatbox, which implicitly bound the baseline image. | Result closely preserved the baseline scene. Metadata: `gen_id=acb21474-49f0-4eb3-a196-fe8d758b3348`, `edit_op="transformation"`, `parent_gen_id=e7b9e528-3c58-4de4-ae87-71a60afd4a91`, returned `prompt=""`, `seed=null`. | This invocation verifies native edit lineage: the response explicitly identifies the baseline generation as its parent and labels the operation as a transformation. | It does not establish deterministic pixel identity outside the changed region or expose the backend model. |
| D4. Manually attached baseline + same explicit edit prompt in ordinary chat | Raw native payload unavailable; the baseline PNG and the same explicit edit text were supplied together in an ordinary chat turn. | Manual attachment plus explicit edit wording in the standard chatbox. | Visually close reference-following result, but metadata reverted to `gen_id=da21c013-e4bd-4012-8679-8e6db5ef4380`, `edit_op=null`, `parent_gen_id=null`. | Invocation route itself matters: the same source image and same edit wording do not reproduce native edit lineage when submitted as an ordinary attachment-plus-chat request. | Manual upload plus edit wording is not equivalent to the product's native **Request edits** binding. |
| E1. `n=3`, cube variants | The call explicitly used native `n=3`; raw native payload is not recorder-visible. | Conversation also asked for three distinct variants of the same cube. | One surfaced artifact containing a three-panel triptych. Metadata: `gen_id=fa2744ae-2af0-4d6f-8aab-12acfc4a35fe`. | `n=3` does not by itself guarantee three separately surfaced artifacts on this wrapper. Multiplicity language can be interpreted compositionally inside one image. | It does not show whether the backend internally produced more images that the UI discarded. |
| E2. `n=3`, authoritative singular cube brief | Native `n=3`; immediate prompt text explicitly asked for one cube only. | The current user message made the singular image brief authoritative. | One surfaced artifact containing one cube. Metadata: `gen_id=aaa48e1a-5b9a-480b-be6c-62c48d11afcf`. | A second controlled `n=3` call again failed to surface three artifacts, ruling out the first triptych as sufficient evidence that `n` itself means collage. | It still does not explain whether `n` was ignored, collapsed by the wrapper, or partially surfaced. |
| E3. Three independent cube calls inside the same conversational task | Three separate image-tool invocations; each singular brief was restated, including later attempts to say "use brief X only" / ignore prior multiplicity. | Earlier "three calls / three images" instructions remained in conversation history. | Each separate invocation still returned a triptych-style single artifact. First set metadata: `8ac39300-6391-4893-9c02-55118eb44080`, `8143eecc-da66-4643-b20a-8ff1fc2c5183`, `34069a7a-d40d-44b6-8405-d9fd7274802a`. A second three-brief attempt behaved the same: `e8ddb823-3462-44dc-b886-2628ab0ff927`, `c2ef5626-3c5b-43e7-8b8a-4ff08fdb0dc8`, `6f2e1b98-8781-4567-8d65-57f2bae24d8f`. | Tool invocations are not isolated prompt envelopes. Multiplicity semantics can leak from recent conversation history across independent calls, and assistant-authored "ignore earlier" text cannot reliably scrub that context. | It does not prove a deterministic context window or identify exactly which prior turns the image system reads. |
| E4. Semantic three-card set, no confirmed explicit `n` | No recoverable native `n` payload; the user asked for three distinct fantasy RPG cards and explicitly said each must be its own single image. | Strong semantic separation: Sword / Shield / 500 Gold. | One tool invocation surfaced three separate artifacts: `391fe373-4062-4d7f-98b7-11e209863885`, `98eb932d-afa3-444a-8def-fbab0b36d194`, `c83927b3-6e79-4baa-bd41-52b8f9e51ed1`. A much looser follow-up, "Make me three new cards. You choose three to add to the set", again surfaced three separate artifacts: Longbow `cdbaffc5-8d6d-4fbe-9aae-3282e052221c`, Healing Potion `fecc2063-b019-4f45-b527-2b71a6f8679d`, Spell Scroll `df06959e-ad96-444b-97c4-e34e6bf7cb3d`. | The wrapper can surface several independent artifacts from one invocation when the conversational task establishes a clear multi-deliverable schema. Conversation history can therefore help as well as contaminate. | It does not prove that a native `n` field caused these outputs. |
| E5. `n=3`, one Spell Scroll brief, three colour options | Native `n=3`; the reused card brief deliberately contained no colour references. The immediate user turn alone added "3 colour options" and required each image to be one single card in a distinct colour. `prompt` remained operationally unwritable/null. | Base card semantics came from the prior brief; variation axis came from the immediate chat request. | Three separate single-card artifacts were returned in one invocation, with clearly distinct colour treatments. Metadata: `70b8b1f4-f167-4fd9-85aa-4baff9b52db7`, `3581cbb5-cc27-49a2-ba32-e808057ecbe8`, `19ddd38b-aee7-40f8-8b99-b186c1740d10`. | `n=3` **can** yield three separately surfaced artifacts. Because the base brief contained no colours and the `prompt` field could not be populated, the colour-option semantics demonstrably came from conversation context. The clean result occurred when native multiplicity and conversational multiplicity aligned. | It does not make `n` a strict or context-independent count contract; E1/E2 show the opposite. |
| F1. Exact supported-looking 3:2 size | `size="1536x1024"`, one image. | Current turn requested one cube at exactly `1536x1024`. | One RGB PNG at exactly `1536x1024`. Metadata: `gen_id=83da7124-5ab4-49f4-8ad9-cb977766665d`. | The wrapper can return the requested raster exactly when it matches the backend's normalized 3:2 raster. | It does not prove arbitrary exact-pixel support. |
| F2. Invalid same-call three-size attempt | One invocation can carry only one `size` value for all outputs; there is no per-output size array. | User requested three individual 3:2 images at three different dimensions in one call. | Three separate artifacts surfaced, all `1536x1024`: `4f0ea91c-ae57-4457-921d-b2e7e65a8936`, `3ee2e894-0221-4745-bfb0-e9fb21397bf7`, `d22f71c2-4c7f-4a7a-ae66-cda0a33f2fcb`. | `size` is invocation-wide, not independently selectable per artifact. | This was not a valid comparison of three requested raster sizes and should not be used to infer normalization behavior. |
| F3. Small 3:2 request | `size="768x512"`, one image. | Same cube brief. | Returned `1536x1024`, metadata `gen_id=68e32b89-0ebe-48c3-a73c-83220e871ca3`. | A sub-native request is enlarged to the normalized 3:2 raster; this rules out a simple maximum-size cap as the whole explanation. | It does not identify the backend's rounding algorithm. |
| F4. Large 3:2 request | `size="3072x2048"`, one image. | Same cube brief. | Returned `1536x1024`, metadata `gen_id=1758ff1b-8fe4-4b5d-b8bc-bb3620d00606`. | A supra-native request is reduced to the same normalized 3:2 raster. | It does not establish whether still larger or boundary ratios behave identically. |
| F5. Native 3:2 repeat | `size="1536x1024"`, one image. | Same cube brief. | Returned `1536x1024`, metadata `gen_id=86a9012e-e294-4541-91e3-b7fc754df729`. | Together with F3/F4, three requests at 0.393 MP, 1.573 MP, and 6.291 MP all converge on exactly the same 1.573 MP 3:2 raster. | It does not prove that every possible aspect ratio uses exactly the same pixel area. |
| G0. Inline **Request edits** paper-collage transformation | Submitted through the generated image preview's native edit route; this was not a clean flag-isolation run. | Same hand-cut-paper transformation brief later reused for the ordinary-chat comparison. | Strong paper-collage conversion with broad composition preservation. Metadata: `gen_id=46764457-fa50-44e0-9284-530af964fac2`, `edit_op="transformation"`, `parent_gen_id=86a9012e-e294-4541-91e3-b7fc754df729`. | Reconfirms that the inline **Request edits** route creates native edit lineage and can carry a substantial medium transformation. | `edit_op="transformation"` must not be attributed to `is_style_transfer`; invocation route is independently confounded. |
| G1. Ordinary chat + attached cube, paper-collage, `is_style_transfer=true` condition | The user explicitly requested the `true` condition; raw native payload is not recoverable from the recorder. Ordinary chat attachment route. | Same preservation-heavy hand-cut-paper brief used for the control. | Strong paper-collage conversion. Metadata: `gen_id=28a4e801-60e5-4b29-930c-23ba5401a10e`, `edit_op=null`, `parent_gen_id=null`. | The flag-on condition does not itself force native edit lineage; ordinary attachment/reference conditioning remains distinct from the inline edit route. | The visual transformation alone does not prove a distinct flag effect because the conversation already explicitly requested the style change. |
| G2. Ordinary chat + attached cube, same paper-collage brief, flag unset | `is_style_transfer` deliberately left unset; same ordinary chat attachment route. | Same subject, same style target, same preservation constraints as G1. | Materially equivalent paper-collage conversion. Metadata: `gen_id=bc1641e2-b9ca-4978-9bd3-51c05ab991e2`, `edit_op=null`, `parent_gen_id=null`. | The closest controlled A/B pair produced no meaningful difference in operation metadata, style strength, or broad composition preservation between flag-on and flag-unset conditions. | One stochastic pair cannot prove the flag is a no-op in every wrapper/backend configuration. |
| G3. Ordinary chat fantasy restyle, flag unset | User asked only `make this fantasy style`; no explicit flag request. | Minimal semantic style instruction against the same attached red cube. | Fantasy/magical stone-artifact treatment. Metadata: `gen_id=2ad18c70-5d57-4153-8098-3ee3a9e65b01`, `edit_op=null`, `parent_gen_id=null`. | Conversational style intent alone is sufficient to produce a strong restyle. | Not a matched wording control for G4. |
| G4. Ordinary chat fantasy restyle, `is_style_transfer=true` condition | The user explicitly requested the `true` condition; raw native payload unavailable. | Similar fantasy restyle request against the same attached cube. | More cinematic fantasy treatment, but the same broad operation class. Metadata: `gen_id=8fcdd379-3b25-415e-8c6e-473d8d3f6878`, `edit_op=null`, `parent_gen_id=null`. | Again, the flag-on condition did not expose a distinct native operation or edit lineage. | The stronger cinematic treatment cannot be attributed to the flag because wording differed and generation is stochastic. |

The strongest Cloud-specific findings now cover instruction transport, multiplicity,
invocation binding, and raster normalization. Keep the immediate conversational
image request narrow and explicit: supplying the whole black-box plan in one turn
caused later edit/reference instructions to contaminate the first call's action
classification. Later multiplicity tests showed the same effect across independent
image-tool calls: "three calls / three images" history could make singular cube calls
produce triptychs even when the assistant inserted additional text saying to ignore
earlier multiplicity instructions. The assistant does not have a private writable
prompt envelope with which to isolate a call from that history.

Output count is therefore best modeled as a negotiation between a native `n` hint
and conversation-level task semantics, not as a strict low-level guarantee. Two
controlled `n=3` cube probes surfaced one artifact, whereas an `n=3` Spell Scroll
colour-option request surfaced three independent artifacts. Multi-card requests also
surfaced three independent artifacts without a confirmed explicit `n` value. The
useful operational rule is to align the conversational request with the desired
artifact cardinality and give each output a semantically distinct role or variation
axis; do not assume that setting `n` alone isolates or guarantees the result count.

Editing adds a second distinction: **having an image visible to the model is not the
same thing as binding that image as the native edit parent**. Conversation-only
reference, manual attachment plus an indirect edit instruction, and manual attachment
plus the exact edit prompt all returned `edit_op=null` and `parent_gen_id=null`. The
generated image preview's built-in **Request edits** route, using the same edit text,
returned `edit_op="transformation"` with the original baseline generation ID as
`parent_gen_id`. A portable adapter should therefore model reference visibility and
native edit binding as separate capabilities rather than assuming one implies the
other.

### Cloud style-transfer hint

Probe G did not demonstrate `is_style_transfer` as an independent creative control.
The best controlled comparison used the same attached cube, the same ordinary-chat
route, and the same hand-cut-paper transformation brief. With the flag explicitly
requested `true`, the result was `gen_id=28a4e801-60e5-4b29-930c-23ba5401a10e`;
with the flag deliberately left unset, the result was
`gen_id=bc1641e2-b9ca-4978-9bd3-51c05ab991e2`. Both returned `edit_op=null` and
`parent_gen_id=null`, and both produced materially equivalent paper-collage
transformations with similar composition drift. A second, looser fantasy-restyle pair
showed the same operation metadata: ordinary conversational style intent produced
`2ad18c70-5d57-4153-8098-3ee3a9e65b01`, while the explicit `true` condition produced
`8fcdd379-3b25-415e-8c6e-473d8d3f6878`; both again returned null edit lineage.

The inline **Request edits** result is deliberately kept separate from that A/B test.
It returned `edit_op="transformation"` and a real `parent_gen_id`, but the invocation
route itself is known to create native edit lineage. That metadata therefore cannot be
used as evidence that `is_style_transfer` selected a special backend path.

The 2026-09-16 web spike supports interpreting this field as **orchestration intent**
rather than a backend style-strength or fidelity knob:

- The exposed ChatGPT tool description itself defines `is_style_transfer` in terms of
  whether the *user request asks for a stylistic transformation of the image or
  subject*. Third-party archives of exposed ChatGPT tool schemas preserve the same
  wording, for example
  [`gpt-5.4-thinking.md`](https://github.com/inematds/system_prompts_leaks/blob/main/OpenAI/gpt-5.4-thinking.md).
  This is evidence about wrapper semantics, not a public API guarantee.
- OpenAI's current public
  [Image generation guide](https://developers.openai.com/api/docs/guides/image-generation)
  documents style changes through normal editing/reference-image prompts and exposes
  controls such as the Responses tool's `action`, model, size, quality, background,
  masks, and image inputs. It does **not** document `is_style_transfer` as an Image API
  or Responses API parameter. The public API therefore provides no support for treating
  this ChatGPT wrapper flag as a backend style-strength, fidelity, or sampling control.
- An OpenAI Developer Community report
  ([post #99](https://community.openai.com/t/having-trouble-getting-transparent-backgrounds-in-chatgpt-images/1380143/99))
  captured a schema/runtime mismatch in which the advertised ChatGPT wrapper included
  `is_style_transfer` but the runtime validator's accepted schema did not. This is
  community evidence rather than product documentation, but it reinforces the need to
  treat wrapper fields as transient orchestration hints rather than portable backend
  contracts.

For the portable image-generation skill, the durable concept should therefore be an
operation intent such as `stylistic_transformation`, expressed primarily in the brief.
An adapter may set `is_style_transfer=true` when a wrapper exposes it, but the skill
must not rely on that flag to carry the style semantics, preserve composition, create
native edit lineage, or select a particular backend behavior. On this Cloud surface,
the flag is **exposed and usable as an intent hint, but no distinct behavioral effect
was demonstrated**.

### Cloud raster-size normalization

The size experiments now support a stronger model than "large requests are capped".
The observed Cloud outputs are:

| Requested | Returned | Aspect ratio | Returned pixels |
| --- | --- | --- | ---: |
| `1024x1024` | `1254x1254` | 1:1 -> 1:1 | 1,572,516 |
| `3840x2160` | `1672x941` | 16:9 -> ~16:9 | 1,573,352 |
| `768x512` | `1536x1024` | 3:2 -> 3:2 | 1,572,864 |
| `1536x1024` | `1536x1024` | 3:2 -> 3:2 | 1,572,864 |
| `3072x2048` | `1536x1024` | 3:2 -> 3:2 | 1,572,864 |

The small 3:2 request being enlarged and the large 3:2 request being reduced to the
same raster rules out a simple maximum-dimension explanation. Across square, 3:2,
and 16:9, the returned images cluster at approximately **1.573 megapixels** while
preserving the requested aspect ratio exactly or very closely. The best current
black-box model for this ChatGPT surface is therefore **flexible aspect ratio plus a
roughly fixed output raster area**, with width/height chosen for the requested ratio.
Exact requested pixel dimensions are not the contract.

The 2026-09-16 web spike independently corroborated that model:

- OpenAI's current [Images in ChatGPT](https://help.openai.com/en/articles/11084440-images-in-chatgpt)
  documentation says ChatGPT Images can generate in **any aspect ratio**, either via
  the aspect-ratio picker or conversational instruction. It does not promise arbitrary
  exact output pixels.
- An OpenAI Developer Community measurement
  ([post #757](https://community.openai.com/t/gpt-image-general-ai-gallery-a-place-for-images-created-by-users/1388609/757))
  reports `1254x1254`, `1448x1086`, `1536x1024`, `1122x1402`, `1672x941`, and
  `1916x821`; those outputs vary by only about 0.05% in total pixel count and sit at
  roughly the same 1.573 MP area observed here. The same post includes a non-standard
  ~1.38:1 example at `1473x1068`, which argues against a small closed list of canonical
  aspect-ratio buckets. Community evidence is corroboration, not a product guarantee.
- Current OpenAI Node SDK types generated from the OpenAPI spec
  ([`src/resources/images.ts`](https://github.com/openai/openai-node/blob/main/src/resources/images.ts))
  document materially different behavior for the **direct Images API**: current GPT
  image models accept arbitrary `WIDTHxHEIGHT` strings subject to divisibility,
  aspect-ratio, pixel, and edge limits. Do not generalize this ChatGPT wrapper's
  ~1.573 MP normalization to the direct API.

This means "canonical aspect-ratio buckets" is no longer the preferred explanation.
The evidence fits a raster-area normalization rule much better: aspect ratio is
flexible; total raster area is the constrained quantity on this Cloud surface.

Backend identity remains unverified. The successful responses exposed generation
IDs and a few generic fields, but no resolved model, backend alias, quality setting,
or trustworthy model provenance. The metadata label and output quality are not
sufficient to identify GPT Image 2.5, Flare, Sunburst, or any other backend.
