import { CaseStudyBody } from '../CaseStudyBody'
import { CaseStudyEvidence } from '../CaseStudyEvidence'
import { ExternalLink } from '../../../components/ExternalLink'
import { PatchEvidenceGallery, getPatchAssetPath } from './PatchEvidenceGallery'
import { PatchProductionFlow } from './PatchProductionFlow'
import { PatchStoryLab } from './PatchStoryLab'
import { getPatchMediaByPath, getPatchRepositoryEvidence } from './patchEvidence'
import { PatchWorkLedger } from './PatchWorkLedger'
import './PatchPipelineCaseStudy.scss'

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
      <figcaption className="case-study-media-caption">{caption}</figcaption>
    </figure>
  )
}

export function PatchPipelineCaseStudy() {
  const repositoryEvidence = getPatchRepositoryEvidence()
  const pinnedRepositoryUrl = `${repositoryEvidence.repositoryUrl}/tree/${repositoryEvidence.sourceRevision}`

  return (
    <CaseStudyBody>
      <section className="patch-case-study" aria-label="Adventures of Patch case study">
        <section className="patch-movement patch-origin" aria-labelledby="patch-origin-title">
          <div className="patch-movement__copy">
            <p className="patch-section-number" aria-hidden="true">01</p>
            <h2 id="patch-origin-title">The day the database disappeared</h2>
            <p>Patch began with a missing database and a lesson I needed people to remember. A little teal character outside a nightclub, with the safety controls working as bouncers, made it memorable.</p>
            <p>I gave an agent an environment in which deleting a development database was a reasonable available action. It deleted the database. The data wasn&apos;t business-critical, and I rebuilt it quickly. The incident mattered because the agent had followed the affordances and authority I&apos;d designed.</p>
            <p>Calling it rogue would&apos;ve let the system designer off the hook. I asked the same agent to help design layers of enforcement around the database. Those controls became the Club DB bouncers, checks whose job was to change the available actions. Patch was the character I made to carry that explanation.</p>
          </div>
          <PatchEvidenceFigure path="src/client/public/media/patch/patch-clubDb-slide-2-1200.avif" alt="Club DB slide showing Patch at a workstation after the database deletion, with the root cause traced to a disposable-looking working folder." caption="The original incident and root cause, rendered from slide 2 of the published Club DB deck." />
        </section>

        <section className="patch-movement patch-first-deck" aria-labelledby="patch-first-deck-title">
          <div className="patch-movement__copy">
            <p className="patch-section-number" aria-hidden="true">02</p>
            <h2 id="patch-first-deck-title">The first deck</h2>
            <p>I made Club DB in a day because I needed the explanation to be useful to colleagues straight away. It shows what happened, why instructions weren&apos;t enough and how layered enforcement changed the action space.</p>
            <p>It also shows the limits of the process I had then. Some text fights the background, Patch changes between frames and generated artefacts got through. I kept the useful deck and turned its misses into requirements for the current pipeline.</p>
          </div>
          <PatchEvidenceFigure path="src/client/public/media/patch/patch-clubDb-slide-14-1200.avif" alt="Club DB slide contrasting a warning sign with a bouncer who enforces the rule at the door." caption="Slide 14 closes the original argument: signs advise; bouncers enforce." />
        </section>

        <p className="case-study-callout">A sign can describe a rule. Enforcement makes the unsafe action unavailable or costly. That distinction still runs through the project.</p>

        <section className="patch-snapshot" aria-label="Project snapshot">
          <p className="patch-snapshot__label">Project snapshot</p>
          <dl>
            <div><dt>Teaching</dt><dd>Agentic engineering, testing, authority, evidence, recovery, review and stakeholder decisions.</dd></div>
            <div><dt>Production</dt><dd>Story frames, visual bibles, character and environment packs, image QA, deterministic builders, manifests, sidecars and receipts.</dd></div>
            <div><dt>Formats</dt><dd>Multi-slide Adventures, one-page Fairytales and supporting character or world artefacts.</dd></div>
            <div><dt>Planning and delivery</dt><dd>Linear shapes the work. GitHub proves what lands. Python builders, presentation tooling and repository validation make the route repeatable.</dd></div>
            <div><dt>Current state</dt><dd>One published origin deck, two published fairytales, three materially developed adventure worlds and one gated idea library.</dd></div>
          </dl>
        </section>

        <section className="patch-movement patch-frame-gate" aria-labelledby="patch-frame-gate-title">
          <div className="patch-movement__copy">
            <p className="patch-section-number" aria-hidden="true">03</p>
            <h2 id="patch-frame-gate-title">A story has to earn production</h2>
            <p>I gate ideas before visual production. A candidate has to answer six questions clearly enough for the metaphor to teach the engineering mechanism.</p>
          </div>
          <ol className="patch-frame-gate__questions">
            {frameQuestions.map((question) => <li key={question}>{question}</li>)}
          </ol>
          <p className="patch-frame-gate__close">If the frame can&apos;t answer them, it stops there. That&apos;s cheap on purpose; the expensive work hasn&apos;t started.</p>
        </section>

        <PatchProductionFlow />
        <PatchWorkLedger><PatchEvidenceGallery /></PatchWorkLedger>
        <PatchStoryLab />

        <section className="patch-movement patch-boundary" aria-labelledby="patch-boundary-title">
          <div className="patch-movement__copy case-study-lead">
            <div className="case-study-lead__heading">
              <p className="patch-section-number" aria-hidden="true">08</p>
              <h2 id="patch-boundary-title">What reaches the public record</h2>
            </div>
            <div className="case-study-lead__body">
              <p>I use Linear to shape and sequence work, GitHub to prove what has landed, and the published catalogue to mark what&apos;s ready for an audience. The planning surface contains provisional thinking; the public repository carries the smaller set I&apos;m prepared to call evidence.</p>
              <p>Manifests and sidecars record source, status and acceptance. Deterministic receipts record the transforms that produced each public file. That boundary keeps private workshop material private and makes every public claim inspectable at one exact revision.</p>
              <CaseStudyEvidence auditDate="24 August 2026" href={pinnedRepositoryUrl} label="Inspect the audited Adventures of Patch source" />
            </div>
          </div>
        </section>

        <section className="patch-movement patch-close" aria-labelledby="patch-close-title">
          <div className="patch-movement__copy case-study-lead">
            <div className="case-study-lead__heading">
              <p className="patch-section-number" aria-hidden="true">09</p>
              <h2 id="patch-close-title">Controlled creative production</h2>
            </div>
            <div className="case-study-lead__body">
              <p>Generative imagery gives this project range. I remain responsible for the lesson, frame, visual direction, rejection reasons and acceptance bar. The tooling preserves those decisions through source custody, status, image QA, deterministic composition and the receipt that says what actually shipped.</p>
              <p>The extra work buys me material I can revise without losing provenance, explanations I can trust in front of a technical audience, and an honest line between an exciting image and a published artefact.</p>
              <ExternalLink className="patch-source-link" href={pinnedRepositoryUrl}>Open the public Adventures of Patch repository</ExternalLink>
            </div>
          </div>
        </section>
      </section>
    </CaseStudyBody>
  )
}
