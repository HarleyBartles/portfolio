import { CaseStudyBody } from '../CaseStudyBody'
import { CaseStudyCallout } from '../CaseStudyCallout'
import { CaseStudyEvidence } from '../CaseStudyEvidence'
import { CaseStudyMediaCaption } from '../CaseStudyMediaCaption'
import { ExternalLink } from '../../../components'
import { Link } from 'react-router-dom'
import { PatchProductionFlow } from './PatchProductionFlow'
import { PatchLeadSection } from './PatchLeadSection'
import { getPatchAssetPath, getPatchMediaByPath, getPatchRepositoryEvidence } from './patchEvidence'
import styled from 'styled-components'

const Patch = styled.div`
  --patch-teal: #0d7476;
  --patch-teal-deep: #153f42;
  --case-study-callout-accent: var(--patch-teal);
  display: grid;
  gap: clamp(var(--space-16), 9vw, 8rem);
  max-width: var(--layout-max-width);
  margin-inline: auto;
  padding-block: clamp(var(--space-12), 7vw, var(--space-24));

  h2 {
    max-width: 14ch;
    margin: 0 0 var(--space-6);
    color: var(--color-ink);
    font-size: clamp(2.25rem, 5vw, 4.8rem);
    line-height: 0.98;
    text-wrap: balance;
  }

  h3 { text-wrap: balance; }
  p { max-width: 67ch; }

  .patch-snapshot {
    padding-block: var(--space-5);
    border-block: 1px solid var(--color-ink);
  }

  .patch-snapshot__label {
    margin: 0;
    color: var(--patch-teal);
    font-family: var(--font-site-sans);
    font-size: var(--type-metadata-size);
    font-weight: 700;
    letter-spacing: .012em;
  }

  .patch-snapshot dl {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    margin: var(--space-4) 0 0;
  }

  .patch-snapshot dl div {
    display: grid;
    grid-template-columns: minmax(8rem, 0.4fr) 1fr;
    gap: var(--space-4);
    padding: var(--space-4) var(--space-5) var(--space-4) 0;
    border-top: 1px solid var(--color-border);
  }

  .patch-snapshot dl div:nth-child(even) {
    padding-left: var(--space-5);
    border-left: 1px solid var(--color-border);
  }

  .patch-snapshot dt {
    font-family: var(--font-site-sans);
    font-size: var(--type-metadata-size);
    font-weight: 700;
  }

  .patch-snapshot dd {
    margin: 0;
    color: var(--color-ink-secondary);
  }

  .patch-movement { min-width: 0; }

  .patch-movement__copy,
  [data-case-study-section-body] { max-width: var(--measure-reading); }

  .patch-origin,
  .patch-first-deck {
    display: grid;
    grid-template-columns: minmax(18rem, 0.82fr) minmax(0, 1.18fr);
    gap: clamp(var(--space-8), 5vw, var(--space-16));
    align-items: center;
  }

  .patch-evidence-figure { margin: 0; }

  .patch-evidence-figure picture,
  .patch-evidence-figure img {
    display: block;
    width: 100%;
  }

  .patch-evidence-figure img { height: auto; }

  .patch-evidence-figure {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    box-shadow: 0 1.1rem 2.8rem rgb(31 36 31 / 8%);
  }

  .patch-first-deck .patch-evidence-figure { transform: rotate(0.35deg); }

  .patch-frame-gate {
    display: grid;
    grid-template-columns: minmax(18rem, 0.7fr) minmax(0, 1.3fr);
    gap: var(--space-8) clamp(var(--space-8), 6vw, var(--space-20));
    padding: clamp(var(--space-8), 6vw, var(--space-16));
    border-block: 1px solid var(--color-border);
  }

  .patch-frame-gate__questions {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0;
    margin: 0;
    padding: 0;
    list-style: none;
    counter-reset: frame-question;
  }

  .patch-frame-gate__questions li {
    position: relative;
    min-height: 8rem;
    padding: var(--space-8) var(--space-5) var(--space-5) 3.5rem;
    border-top: 1px solid rgb(31 36 31 / 24%);
    counter-increment: frame-question;
  }

  .patch-frame-gate__questions li:nth-child(even) { border-left: 1px solid rgb(31 36 31 / 24%); }

  .patch-frame-gate__questions li::before {
    position: absolute;
    top: var(--space-5);
    left: var(--space-4);
    color: var(--color-muted);
    font-family: var(--font-site-sans);
    font-size: var(--type-metadata-size);
    content: counter(frame-question, decimal-leading-zero);
  }

  .patch-frame-gate__close {
    grid-column: 2;
    margin: 0;
    font-style: italic;
  }

  .patch-production {
    padding: clamp(var(--space-8), 6vw, var(--space-16));
    color: var(--color-surface);
    background: var(--patch-teal-deep);
  }

  .patch-production [data-patch-lead-copy] { margin-bottom: var(--space-10); }

  .patch-production h2,
  .patch-production h3 { color: var(--color-surface); }

  .patch-production p,
  .patch-production dd { color: rgb(255 250 240 / 82%); }

  .patch-production dt { color: #75d4d0; }

  .patch-production__flow {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    margin: 0;
    padding: 0;
    border-top: 1px solid rgb(255 250 240 / 32%);
    list-style: none;
    counter-reset: production-stage;
  }

  .patch-production__flow li {
    padding: var(--space-8) var(--space-6);
    border-bottom: 1px solid rgb(255 250 240 / 32%);
    counter-increment: production-stage;
  }

  .patch-production__flow li:not(:nth-child(3n + 1)) { border-left: 1px solid rgb(255 250 240 / 32%); }

  .patch-production__flow h3::before {
    display: block;
    margin-bottom: var(--space-3);
    color: #75d4d0;
    font-family: var(--font-code);
    font-size: 0.75rem;
    content: "0" counter(production-stage);
  }

  .patch-production__flow dl { margin: var(--space-5) 0 0; }

  .patch-production__flow dt {
    margin-top: var(--space-3);
    font-family: var(--font-code);
    font-size: 0.69rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .patch-production__flow dd {
    margin: var(--space-1) 0 0;
    font-size: 0.9rem;
    line-height: 1.48;
  }

  .patch-showcase-link,
  .patch-source-link {
    color: var(--patch-teal-deep);
    font-weight: 700;
    text-decoration-thickness: 0.12em;
    text-underline-offset: 0.2em;
  }

  .patch-showcase-link:focus-visible,
  .patch-source-link:focus-visible {
    outline: 0.2rem solid var(--color-focus);
    outline-offset: 0.2rem;
  }

  .patch-showcase-bridge {
    padding-block: var(--space-8);
    border-block: 1px solid var(--color-ink);
  }

  .patch-showcase-bridge .patch-showcase-link {
    display: inline-block;
    margin-top: var(--space-5);
  }

  .patch-boundary {
    padding: clamp(var(--space-8), 6vw, var(--space-16));
    border-block: 1px solid var(--color-border);
  }

  .patch-boundary [data-evidence-custody="provenance"] {
    margin-top: var(--space-8);
    padding-top: var(--space-5);
    border-top: 1px solid rgb(21 63 66 / 30%);
  }

  .patch-close {
    padding: clamp(var(--space-8), 7vw, var(--space-20));
    border-top: 1px solid var(--color-border);
  }

  .patch-close .patch-source-link {
    display: inline-block;
    margin-top: var(--space-6);
  }

  @media (max-width: 58rem) {
    .patch-origin,
    .patch-first-deck,
    .patch-frame-gate { grid-template-columns: 1fr; }

    .patch-frame-gate__close { grid-column: auto; }

    .patch-production__flow { grid-template-columns: repeat(2, minmax(0, 1fr)); }

    .patch-production__flow li:not(:nth-child(3n + 1)) { border-left: 0; }
    .patch-production__flow li:nth-child(even) { border-left: 1px solid rgb(255 250 240 / 32%); }
  }

  @media (max-width: 44rem) {
    gap: var(--space-16);
    padding-block: var(--space-12);

    .patch-snapshot dl,
    .patch-production__flow,
    .patch-frame-gate__questions { grid-template-columns: 1fr; }

    .patch-snapshot dl div,
    .patch-snapshot dl div:nth-child(even) {
      display: block;
      padding-block: var(--space-2);
      padding-inline: 0;
      border-left: 0;
    }

    .patch-snapshot { padding-block: var(--space-3); }
    .patch-snapshot dl { margin-top: var(--space-3); }
    .patch-snapshot dt,
    .patch-snapshot dd { display: inline; }
    .patch-snapshot dt { margin-right: var(--space-2); }

    .patch-frame-gate,
    .patch-production,
    .patch-boundary,
    .patch-close { padding: var(--space-8) var(--space-5); }

    .patch-frame-gate__questions li:nth-child(even),
    .patch-production__flow li:nth-child(even) { border-left: 0; }
  }
`

const frameQuestions = [
  'What real engineering task is being performed?',
  'What specific failure occurs?',
  'What does Patch do differently?',
  'What observable artefact or outcome changes?',
  'What can the audience use in its own work tomorrow?',
  'Does the adventure metaphor explain the mechanism?',
] as const

function PatchEvidenceFigure({ path, alt, caption }: { path: string; alt: string; caption: string }) {
  const avif = getPatchMediaByPath(path)
  const webp = getPatchMediaByPath(path.replace(/\.avif$/, '.webp'))
  if (avif === undefined || webp === undefined) throw new Error(`Patch evidence is missing for ${path}.`)

  return (
    <figure className="patch-evidence-figure">
      <picture>
        <source srcSet={getPatchAssetPath(avif.path)} type="image/avif" />
        <source srcSet={getPatchAssetPath(webp.path)} type="image/webp" />
        <img src={getPatchAssetPath(webp.path)} width={webp.width} height={webp.height} alt={alt} loading="lazy" />
      </picture>
      <CaseStudyMediaCaption>{caption}</CaseStudyMediaCaption>
    </figure>
  )
}

export function PatchPipelineCaseStudy() {
  const repositoryEvidence = getPatchRepositoryEvidence()
  const pinnedRepositoryUrl = `${repositoryEvidence.repositoryUrl}/tree/${repositoryEvidence.sourceRevision}`

  return (
    <CaseStudyBody>
      <Patch className="patch-case-study" aria-label="Adventures of Patch case study">
        <section className="patch-movement patch-origin" aria-labelledby="patch-origin-title">
          <div className="patch-movement__copy">
            <h2 id="patch-origin-title">The day the database disappeared</h2>
            <p>Patch began with a missing database and a lesson I needed people to remember. A little teal character outside a nightclub, with the safety controls working as bouncers, made it memorable.</p>
            <p>I gave an agent an environment in which deleting a development database was a reasonable available action. It deleted the database. The data wasn&apos;t business-critical, and I rebuilt it quickly. The incident mattered because the agent had followed the affordances and authority I&apos;d designed.</p>
            <p>Calling it rogue would&apos;ve let the system designer off the hook. I asked the same agent to help design layers of enforcement around the database. Those controls became the Club DB bouncers, checks whose job was to change the available actions. Patch was the character I made to carry that explanation.</p>
          </div>
          <PatchEvidenceFigure path="src/client/public/media/patch/patch-clubDb-slide-2-1200.avif" alt="Club DB slide showing Patch at a workstation after the database deletion, with the root cause traced to a disposable-looking working folder." caption="The original incident and root cause, rendered from slide 2 of the published Club DB deck." />
        </section>

        <section className="patch-movement patch-first-deck" aria-labelledby="patch-first-deck-title">
          <div className="patch-movement__copy">
            <h2 id="patch-first-deck-title">The first deck</h2>
            <p>I made Club DB in a day because I needed the explanation to be useful to colleagues straight away. It shows what happened, why instructions weren&apos;t enough and how layered enforcement changed the action space.</p>
            <p>It also shows the limits of the process I had then. Some text fights the background, Patch changes between frames and generated artefacts got through. I kept the useful deck and turned its misses into requirements for the current pipeline.</p>
          </div>
          <PatchEvidenceFigure path="src/client/public/media/patch/patch-clubDb-slide-14-1200.avif" alt="Club DB slide contrasting a warning sign with a bouncer who enforces the rule at the door." caption="Slide 14 closes the original argument: signs advise; bouncers enforce." />
        </section>

        <CaseStudyCallout>A sign can describe a rule. Enforcement makes the unsafe action unavailable or costly. That distinction still runs through the project.</CaseStudyCallout>

        <section className="patch-snapshot" aria-label="Project snapshot">
          <p className="patch-snapshot__label">Project snapshot</p>
          <dl>
            <div><dt>Teaching</dt><dd>Agentic engineering, testing, authority, evidence, recovery, review and stakeholder decisions.</dd></div>
            <div><dt>Production</dt><dd>Story frames, visual bibles, character and environment packs, image QA, deterministic builders, manifests, sidecars and receipts.</dd></div>
            <div><dt>Formats</dt><dd>Multi-slide Adventures, one-page Fairytales and supporting character or world artefacts.</dd></div>
            <div><dt>Evidence</dt><dd>Manifests, source revisions, acceptance records, sidecars and deterministic build receipts.</dd></div>
          </dl>
        </section>

        <section className="patch-movement patch-frame-gate" aria-labelledby="patch-frame-gate-title">
          <div className="patch-movement__copy">
            <h2 id="patch-frame-gate-title">A story has to earn production</h2>
            <p>I gate ideas before visual production. A candidate has to answer six questions clearly enough for the metaphor to teach the engineering mechanism.</p>
          </div>
          <ol className="patch-frame-gate__questions">
            {frameQuestions.map((question) => <li key={question}>{question}</li>)}
          </ol>
          <p className="patch-frame-gate__close">If the frame can&apos;t answer them, it stops there. That&apos;s cheap on purpose; the expensive work hasn&apos;t started.</p>
        </section>

        <PatchProductionFlow />
        <PatchLeadSection className="patch-movement patch-showcase-bridge" title="The stories have their own home" titleId="patch-showcase-bridge-title">
          <p>The pipeline produces work in two shapes. One-page fairytales carry a single operational lesson. Larger adventures have room for personality, failure modes and the consequence of a good intervention.</p>
          <p>The Adventures of Patch area gives each story the space its evidence has earned, including work assembled directly for this portfolio. This case study stays with the engineering that turns an idea into accepted, traceable work.</p>
          <Link className="patch-showcase-link" to="/patch">Explore the Adventures of Patch</Link>
        </PatchLeadSection>

        <PatchLeadSection className="patch-movement patch-boundary" title="What reaches the public record" titleId="patch-boundary-title">
          <p>I use Linear to shape and sequence work, GitHub to prove what has landed, and the published catalogue to mark what&apos;s ready for an audience. The planning surface contains provisional thinking; the public repository carries the smaller set I&apos;m prepared to call evidence.</p>
          <p>Manifests and sidecars record source, status and acceptance. Deterministic receipts record the transforms that produced each public file. That boundary keeps private workshop material private and makes every public claim inspectable at one exact revision.</p>
          <CaseStudyEvidence auditDate="24 August 2026" href={pinnedRepositoryUrl} label="Inspect the audited Adventures of Patch source" />
        </PatchLeadSection>

        <PatchLeadSection className="patch-movement patch-close" title="Controlled creative production" titleId="patch-close-title">
          <p>Generative imagery gives this project range. I remain responsible for the lesson, frame, visual direction, rejection reasons and acceptance bar. The tooling preserves those decisions through source custody, status, image QA, deterministic composition and the receipt that says what actually shipped.</p>
          <p>The extra work buys me material I can revise without losing provenance, explanations I can trust in front of a technical audience, and an honest line between an exciting image and a published artefact.</p>
          <ExternalLink className="patch-source-link" href={pinnedRepositoryUrl}>Open the public Adventures of Patch repository</ExternalLink>
        </PatchLeadSection>
      </Patch>
    </CaseStudyBody>
  )
}
