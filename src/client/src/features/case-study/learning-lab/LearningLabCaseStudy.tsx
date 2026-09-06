import { CaseStudyBody } from '../CaseStudyBody'
import { CaseStudyCallout } from '../CaseStudyCallout'
import { CaseStudySection } from '../CaseStudySection'
import { ExternalLink } from '../../../components'
import styled from 'styled-components'
import { CurriculumAtlas } from './CurriculumAtlas'
import { LabAnatomy } from './LabAnatomy'
import { LabPromotionFlow } from './LabPromotionFlow'
import { LearningLabImage } from './LearningLabImage'
import { RepresentativeLabs } from './RepresentativeLabs'
import { learningLabEvidence, pinnedLearningLabPath } from './learningLabEvidence'

const LearningLab = styled.div`
  --learning-copper: #a24f32;
  --learning-teal: #0d5d60;
  display: grid;
  gap: clamp(var(--space-16), 9vw, var(--space-24));

  .learning-lab-thesis {
    font-family: var(--font-display);
    font-size: clamp(1.45rem, 2.8vw, 2.25rem);
    line-height: 1.12;
  }

  .learning-lab-origin {
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(18rem, 0.9fr);
    grid-template-areas: 'copy quote';
    gap: clamp(var(--space-8), 6vw, var(--space-16));
    align-items: center;
  }

  .learning-lab-origin > div { grid-area: copy; }

  .learning-lab-kicker {
    margin: 0 0 var(--space-3);
    color: var(--learning-teal);
    font-family: var(--font-site-sans);
    font-size: var(--type-metadata-size);
    font-weight: 700;
    letter-spacing: .012em;
  }

  .learning-lab-origin blockquote {
    grid-area: quote;
    margin: 0;
    padding: clamp(var(--space-6), 4vw, var(--space-10));
    border-left: .25rem solid var(--color-border);
    color: var(--color-ink);
    font-family: var(--font-site-sans);
    font-size: clamp(1.4rem, 2.6vw, 2.15rem);
    line-height: 1.16;
  }

  .learning-lab-system {
    display: grid;
    gap: clamp(var(--space-16), 9vw, var(--space-24));
  }

  .learning-lab-safety {
    display: grid;
    grid-template-columns: minmax(0, 1.25fr) minmax(18rem, .75fr);
    gap: clamp(var(--space-8), 6vw, var(--space-16));
    align-items: center;
  }

  .learning-lab-safety__copy { min-width: 0; }

  .learning-lab-state {
    padding-top: var(--space-8);
    border-top: 1px solid var(--color-ink);
  }

  .learning-lab-state > header h2 { margin: 0; }
  .learning-lab-state__heading { min-width: 0; }

  .learning-lab-state > dl {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    margin: var(--space-8) 0 0;
    border-top: 1px solid var(--color-border);
  }

  .learning-lab-state > dl > div { min-width: 0; padding: var(--space-5); border-right: 1px solid var(--color-border); }
  .learning-lab-state > dl > div:first-child { padding-left: 0; }
  .learning-lab-state > dl > div:last-child { padding-right: 0; border-right: 0; }
  .learning-lab-state dt { font-family: var(--font-site-sans); font-size: var(--type-metadata-size); font-weight: 700; }
  .learning-lab-state dd { margin: var(--space-3) 0 0; }
  .learning-lab-state dd p { margin-bottom: 0; }

  @media (max-width: 60rem) {
    .learning-lab-state > dl { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .learning-lab-state > dl > div:nth-child(2) { border-right: 0; }
  }

  @media (max-width: 44rem) {
    .learning-lab-origin { grid-template-columns: 1fr; grid-template-areas: 'quote' 'copy'; }
    .learning-lab-safety { display: flex; flex-direction: column; min-height: 0; }
    .learning-lab-safety__copy { width: auto; margin: 0; padding: var(--space-7); box-shadow: none; }
    .learning-lab-state > dl > div,
    .learning-lab-state > dl > div:first-child,
    .learning-lab-state > dl > div:last-child { padding: var(--space-5) 0; border-right: 0; border-bottom: 1px solid var(--color-border); }
  }
`

export function LearningLabCaseStudy() {
  return (
    <CaseStudyBody>
      <LearningLab className="learning-lab-case-study">
        <CaseStudySection title="Experience made transferable" layout="lead-prose">
          <p className="learning-lab-thesis">The learner is not the agent&apos;s hands. They learn to direct, inspect, verify, recover, and direct again.</p>
          <p>I was a software engineer before I became an agentic engineer. Source truth, controlled variables, durable state, bounded authority, inspected evidence and recoverable failure were already ordinary parts of my work. The machinery changed. Those responsibilities came with me.</p>
          <p>The curriculum turns what I&apos;ve learned through extensive hands-on work into experiments another person can run. Each lesson has to make a distinction observable, give the learner room to judge it and leave enough evidence to question what happened.</p>
        </CaseStudySection>

        <section className="learning-lab-origin" aria-labelledby="learning-lab-origin-title">
          <blockquote>“I&apos;m going to teach my brother a few things about using agentic AI. I don&apos;t really have a learning plan or anything.”</blockquote>
          <div>
            <p className="learning-lab-kicker">Origin artefact</p>
            <h2 id="learning-lab-origin-title">A scrappy promise became a curriculum</h2>
            <p>I wrote those words at the start of the first curriculum-design conversation in August 2026. I wanted to pass hard-earned agentic practice to my brother, an intelligent, technically minded non-programmer, but I hadn&apos;t decided what was valuable to teach and what he should discover through the work. The Learning Lab began there, as a love letter to my brother and an admission that I didn&apos;t yet know its shape.</p>
            <p>That conversation produced a repository on 15 August. Working in it with agents turned the loose promise into teaching principles, runnable experiments and a three-course curriculum that other learners and facilitators can adapt. It also corrected an assumption in the original prompt: the early cloud-versus-local framing gave way to the stronger question of where the project lives and what evidence the learner can inspect.</p>
          </div>
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
            <CaseStudyCallout>What is the blast radius, and do I have a recovery path?</CaseStudyCallout>
          </div>
        </section>

        <CaseStudySection title="The method built the method" layout="lead-prose">
          <p>The founding prompt left the learning plan open. That made the first version a live question: what does useful agentic practice actually look like? I used agents to investigate it, build the repository, test the teaching shape and revise it whenever the work exposed a better one. I was writing the course while sitting partly in the learner&apos;s chair.</p>
          <p>Cloud and local began as the organising split. Building Lab 3 exposed the stronger question: where does the project live when nobody is talking to an AI about it? The experiment changed the curriculum because it gave me better evidence than the original plan.</p>
          <p>That is the promise I want the curriculum to keep. A learner should be able to use agents to build something they care about before they can describe its final form. The work becomes clearer through making, inspection and revision. This repository had to prove that promise while it was being made.</p>
          <p>The repository carries the resulting discipline. Facilitator guides preserve rationale and contingency. Learner cards reveal only the next useful problem. Worker folders contain the project rather than the lesson. Integrity checks catch missing references and leaks between those boundaries. A lab can still change when running it teaches me something better.</p>
        </CaseStudySection>

        <section className="learning-lab-state" aria-labelledby="learning-lab-state-title">
          <header>
            <div className="learning-lab-state__heading">
              <p className="learning-lab-kicker">Honest present state</p>
              <h2 id="learning-lab-state-title">A dated body of working practice</h2>
            </div>
          </header>
          <dl>
            <div><dt>Curriculum</dt><dd>Course 1 is complete. Course 2 is substantially planned. Course 3 is little more than an outline today.</dd></div>
            <div><dt>Source snapshot</dt><dd><code>{learningLabEvidence.sourceRevision.slice(0, 7)}</code>, inspected 25 August 2026.<br /><ExternalLink href={learningLabEvidence.sourceChangeUrl} aria-label="Inspect the course-numbering change">Inspect the course-numbering change</ExternalLink></dd></div>
            <div><dt>Repository proof</dt><dd><ExternalLink href={learningLabEvidence.repositoryUrl} aria-label="View the public repository">View the public repository</ExternalLink><br /><ExternalLink href={learningLabEvidence.integrityRunUrl} aria-label="Inspect the integrity run">Inspect the integrity run</ExternalLink></dd></div>
            <div><dt>Licence</dt><dd><ExternalLink href={pinnedLearningLabPath(learningLabEvidence.licensing.policyPath)} aria-label="Read the licence policy">Read the licence policy</ExternalLink><br /><ExternalLink href={pinnedLearningLabPath(learningLabEvidence.licensing.curriculum.path)} aria-label="CC BY 4.0 curriculum licence">CC BY 4.0 curriculum licence</ExternalLink><br /><ExternalLink href={pinnedLearningLabPath(learningLabEvidence.licensing.tooling.path)} aria-label="MIT tooling licence">MIT tooling licence</ExternalLink><p>With those scopes explicit, the curriculum and its standalone tools are freely licensed for reuse.</p></dd></div>
          </dl>
        </section>
      </LearningLab>
    </CaseStudyBody>
  )
}
