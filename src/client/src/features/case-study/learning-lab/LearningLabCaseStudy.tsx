import { CaseStudyBody } from '../CaseStudyBody'
import { CaseStudySection } from '../CaseStudySection'
import { ExternalLink } from '../../../components/ExternalLink'
import { CurriculumAtlas } from './CurriculumAtlas'
import { LabAnatomy } from './LabAnatomy'
import { LabPromotionFlow } from './LabPromotionFlow'
import { LearningLabImage } from './LearningLabImage'
import { RepresentativeLabs } from './RepresentativeLabs'
import { formatLearningLabDelivery, learningLabEvidence, pinnedLearningLabPath } from './learningLabEvidence'
import './LearningLabCaseStudy.scss'

export function LearningLabCaseStudy() {
  return (
    <CaseStudyBody>
      <div className="learning-lab-case-study">
        <CaseStudySection title="Experience made transferable" layout="lead">
          <p className="learning-lab-thesis">The learner is not the agent&apos;s hands. They learn to direct, inspect, verify, recover, and direct again.</p>
          <p>I was a software engineer before I became an agentic engineer. Source truth, controlled variables, durable state, bounded authority, inspected evidence and recoverable failure were already ordinary parts of my work. The machinery changed. Those responsibilities came with me.</p>
          <p>The curriculum turns what I&apos;ve learned through extensive hands-on work into experiments another person can run. Each lesson has to make a distinction observable, give the learner room to judge it and leave enough evidence to question what happened.</p>
        </CaseStudySection>

        <section className="learning-lab-origin" aria-labelledby="learning-lab-origin-title">
          <div>
            <p className="learning-lab-kicker">Origin artefact</p>
            <h2 id="learning-lab-origin-title">A scrappy promise became a curriculum</h2>
            <p>At heart, the Learning Lab is a love letter to my brother: a promise to turn hard-earned agentic practice into something an intelligent, technically minded non-programmer could learn safely and use for his own purposes. That promise grew into a public curriculum other learners and facilitators can adapt.</p>
          </div>
          <blockquote>“I&apos;m going to teach my brother a few things about using agentic AI. I don&apos;t really have a learning plan or anything.”</blockquote>
        </section>

        <CurriculumAtlas />

        <div className="learning-lab-system" data-visual-contract="learning-lab-system">
          <LabPromotionFlow />

          <LabAnatomy />

          <RepresentativeLabs />
        </div>

        <section className="learning-lab-safety" aria-labelledby="learning-lab-safety-title">
          <LearningLabImage id="safe-breakage-rig" />
          <div className="learning-lab-safety__copy">
            <p className="learning-lab-kicker">Lab 4 runs underneath the curriculum</p>
            <h2 id="learning-lab-safety-title">Safe enough to learn by breaking things</h2>
            <p>A learner should be able to make a mess without losing the last state they understood. Lab 4 builds that recovery model with tracked and untracked files, inspected diffs, deliberate commits and the separate act of publishing a commit.</p>
            <p>The lesson uses one repository, one main line of history and one agent changing it at a time. That constraint keeps the experiment legible. Concurrency, branches and worktree isolation wait until the learner has a recovery model sturdy enough to carry them.</p>
            <p className="case-study-callout">What is the blast radius, and do I have a recovery path?</p>
          </div>
        </section>

        <CaseStudySection title="The method built the method" layout="lead">
          <p>I began with cloud and local as the organising split. Building Lab 3 exposed the stronger question: where does the project live when nobody is talking to an AI about it? The curriculum changed because its own experiment produced better evidence.</p>
          <p>The repository follows the same discipline it teaches. Facilitator guides preserve rationale and contingency. Learner cards reveal the next useful problem. Worker folders contain the project rather than the lesson. Integrity checks catch missing references and accidental leaks between those boundaries.</p>
          <p>That structure lets the material move as the field moves. A roadmap module earns maturity through pressure, choreography, safety, recovery and handoff. A mature lab can still change when running it teaches me something better.</p>
        </CaseStudySection>

        <section className="learning-lab-state" aria-labelledby="learning-lab-state-title">
          <header>
            <p className="learning-lab-kicker">Honest present state</p>
            <h2 id="learning-lab-state-title">A dated body of working practice</h2>
            <p>{formatLearningLabDelivery(learningLabEvidence.delivery)}</p>
          </header>
          <dl>
            <div><dt>Curriculum</dt><dd>10 mature labs and 9 roadmap modules across three courses.</dd></div>
            <div><dt>Source snapshot</dt><dd><code>{learningLabEvidence.sourceRevision.slice(0, 7)}</code>, inspected 24 August 2026.</dd></div>
            <div><dt>Repository proof</dt><dd><ExternalLink href={learningLabEvidence.repositoryUrl} aria-label="View the public repository">View the public repository</ExternalLink><br /><ExternalLink href={learningLabEvidence.integrityRunUrl} aria-label="Inspect the integrity run">Inspect the integrity run</ExternalLink></dd></div>
            <div><dt>Licence</dt><dd><ExternalLink href={pinnedLearningLabPath(learningLabEvidence.licensing.curriculum.path)} aria-label="CC BY 4.0 curriculum licence">CC BY 4.0 curriculum licence</ExternalLink><br /><ExternalLink href={pinnedLearningLabPath(learningLabEvidence.licensing.tooling.path)} aria-label="MIT tooling licence">MIT tooling licence</ExternalLink><p>With those scopes explicit, the curriculum and its standalone tools are freely licensed for reuse.</p></dd></div>
          </dl>
        </section>
      </div>
    </CaseStudyBody>
  )
}
