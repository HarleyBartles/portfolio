# Phase 7A site visual-language recommendations

**Status:** Active Cloud-room design output, 29 August 2026.

**Purpose:** This room owns the recommendations. Phase 7A implementation applies the
page-specific decisions to the surfaces it changes. The later site-wide polish pass
must use this record as a starting design brief, compare the recommendations against
the rendered site as a whole, and harmonise recurring visual language rather than
rediscovering it from CSS or treating each page as an isolated design exercise.

This record does not require every route to look the same. The portfolio's established
direction is an authored editorial engineering field journal. Coherence should come
from a recognisable visual vocabulary used with judgement, not from forcing every
article, case study and professional surface through one template.

## Governing principle

The whole site should look as though one editor and one art director made it, even when
individual pages have different compositions.

Reuse grammar, not layouts.

A reader should gradually learn what visual forms mean. An editorial interruption,
inspectable evidence, metadata, a status, a navigation action and a project-native
artefact should each have a recognisable family resemblance wherever they appear.

## Core vocabulary to preserve

### Typography has stable jobs

- **Fraunces** is the expressive display voice: page and section headings, strong
  editorial statements and pull quotes.
- **Source Serif 4** is the reading voice: sustained prose, explanations and narrative.
- **Fira Code** is the utility voice: eyebrows, metadata, small contextual labels,
  statuses, technical annotations and compact navigation language.
- Do not create new local font roles merely to make one component look distinctive.
  Distinction should normally come from scale, weight, placement, whitespace and the
  existing palette.

### Colour has stable jobs

- Warm paper remains the default reading surface.
- Ink remains the primary text and structural colour.
- Copper is emphasis, orientation and editorial punctuation rather than general
  decoration.
- The existing soft copper wash is the default light emphasis surface.
- Dark ink / deep-teal evidence surfaces may remain where a technical or
  project-specific proof moment earns them. They should not spread into generic card
  chrome.
- Avoid adding another family of pastel callout boxes or arbitrary accent colours.

### Rules do structural work

- Fine ink rules separate editorial regions and establish rhythm.
- Copper rules signal emphasis or an active editorial moment.
- Borders should not be added simply to make content feel componentised.
- Prefer ruled rows, open compositions and whitespace over a wall of generic cards.

### Asymmetry is part of the house style

- Keep body prose at a comfortable reading measure.
- Use the wider grid and editorial margin for headings, artefacts, quotes, captions and
  evidence that benefit from breaking the prose column.
- Wide-screen whitespace is available composition, not an error to fill indiscriminately.
- At narrow widths and high zoom, breakouts return to a simple semantic reading order.

## Pull quotes: shared editorial grammar

The rendered pull quotes in `Why ADRs?`, `I made agentic engineering harder than it
needed to be`, and `The right test isn't your favourite test` were compared directly in
Opera on 29 August 2026.

They establish a successful shared grammar:

- pale copper wash;
- a strong copper vertical rule on the left;
- oversized italic Fraunces;
- enough surrounding whitespace to interrupt the prose rhythm deliberately; and
- an optional small Fira Code line beneath the quote for attribution or contextual
  classification.

This is now a **site editorial primitive**, not merely writing-page CSS.

### What remains consistent

Every pull quote should be recognisable as part of this family through the copper rule,
soft wash, display italic and deliberate interruption of the reading rhythm.

The small secondary line, when present, uses the utility voice. It must add information:
an actual attribution, provenance, or a useful classification such as `PRODUCTION
INVARIANT`. Do not add labels merely because the component has room for one.

### What may vary

The primitive needs responsive and editorial variants rather than one fixed rectangle:

- **Long thought:** may occupy the full reading width and, on wide authored pages, bleed
  into the editorial margin when that improves the composition.
- **Short statement:** should use a tighter measure and/or reduced vertical padding so a
  five-word line does not look like a marketing slogan in an oversized empty panel.
- **Attributed quotation:** may use the secondary utility line for the speaker/source.
- **Classified statement:** may use the secondary utility line to identify the statement's
  role when that role helps interpretation.

At smaller widths the quote returns to the normal content width. It must never create
horizontal overflow or require its wide-screen breakout for meaning.

### Phase 7A application

About should use this grammar for:

> **No source capture, no success.**
>
> `PRODUCTION INVARIANT`

Use the short-statement variant: main narrative width or a restrained one-column bleed,
with tighter vertical space than the longer article examples. It is an editorial pause,
not a proof card, badge or dashboard widget.

The following prose explains the operational consequence: missing authoritative source
evidence means the check fails and downstream receives the no-charge signal.

### Later polish responsibility

The site-wide polish pass must inventory all pull quotes and blockquote-like treatments,
then consolidate them into this common visual grammar unless a page has a documented
reason to diverge. It should review quote length, margin behaviour, contextual labels,
spacing and nearby evidence rather than applying one dimension to every quote.

The existing 26 August design decision that allows authored pull quotes into the
editorial margin remains the seed. The polish pass is responsible for making the result
feel intentional across the publication rather than historically accumulated.

## Distinguish recurring editorial primitives

A coherent site needs recurring forms to keep their meanings separate.

### Pull quote

Job: interrupt the reading rhythm with a sentence worth holding in the reader's head.

Visual family: copper rule + soft wash + italic display type.

Do not use it to contain a mini case study, a pile of metrics or interactive controls.

### Evidence surface

Job: let the reader inspect a diagram, screenshot, test, source artefact or technical
receipt.

Visual family: may use the existing darker technical surfaces or project-native visual
language. Evidence should look inspectable rather than quotable.

Do not use pull-quote styling merely because the evidence supports an important claim.

### Editorial note / metadata

Job: status, date, provenance, scope, caveat or compact context.

Visual family: Fira Code utility type, restrained scale and colour. It should not compete
with the narrative hierarchy.

### Action

Job: navigate or perform a clear user action.

Retain the existing distinction between strong dark primary actions and quieter textual
links with copper underline/accent. Do not invent a new button style per page.

### Section boundary

Job: create reading rhythm and hierarchy.

Prefer whitespace, authored grid shifts and fine rules over boxed section containers.

## Professional surfaces: imagery recommendations

Image generation itself remains a later polish task. This room owns what imagery would
help and what should be avoided.

### About

Do not force a decorative hero image into About. The professional proposition and
current-work evidence should carry the first viewport.

For the Access section, a generated illustration is **not** the recommended first choice.
If a visual is needed after the text layout is implemented, prefer a restrained semantic
system diagram that explains the safe public boundary only: government web journey ->
bounded browser interpretation/action selection -> deterministic extraction and source
capture -> integrated screening check. Do not expose private endpoint topology or make
the LLM look like an autonomous decision-maker.

Independent-work links may use existing project-native imagery where it improves
recognition, but the section should remain an editorial list/row composition rather than
turning into another card gallery.

For the acting aside, prefer an owned/licensed archival photograph or existing public
asset whose rights are clear. If none is available, keep the aside text-only. Do not
generate a fake archival image or synthetic likeness.

### CV

Keep the CV image-free unless a later human decision explicitly changes that. The web
and PDF versions should remain hiring-document first: print-safe, scannable and free of
decoration that competes with employment evidence.

### Case studies and writing

Prefer project-native artefacts and exact diagrams where available. Generated imagery
should have one declared editorial/evidential job and must not replace inspectable
technical proof with atmosphere.

The polish pass should identify places where the site feels visually thin, but `empty
space` alone is not an image-generation requirement.

## Site-wide harmonisation audit for the later polish pass

The later pass should inspect rendered pages, not infer appearance from selectors. At
minimum compare the following across homepage, About, CV, project case studies, writing
and Patch:

1. page eyebrows and metadata;
2. H1/H2/H3 hierarchy and display-type behaviour;
3. pull quotes and other blockquotes;
4. evidence panels and technical callouts;
5. captions and provenance labels;
6. status labels;
7. primary and secondary links/actions;
8. section rules and spacing rhythm;
9. card-like surfaces that could become more editorial ruled rows or open compositions;
10. external-link treatment;
11. image framing, captions and custody language;
12. narrow-width and 200% zoom behaviour of every breakout treatment.

The pass should remove accidental near-duplicates. If two recurring forms have the same
semantic job, converge them. If they have different jobs, make the distinction legible.

## Guardrails against over-harmonising

- Do not make all project case studies share one skeleton. Their authored identities are
  an asset.
- Do not make every important sentence a pull quote.
- Do not replace page-specific visual evidence with a universal component library.
- Do not centre or box material simply to make it symmetrical.
- Do not introduce ornamental motion as a unifying device.
- Do not let generated imagery overwhelm owned artefacts or semantic explanation.
- Do not treat component reuse as the goal. Reader recognition and editorial coherence
  are the goal.

## Acceptance signal for the later polish pass

A reader moving between an article, About, a project case study and the CV should feel
that the pages belong to the same publication before consciously noticing why.

They should also learn the grammar well enough that a copper-wash italic interruption
reads as an editorial statement, a darker technical surface reads as inspectable proof,
and small Fira Code copy reads as orientation or metadata.

The pages may remain visibly different. They should stop looking independently evolved.
