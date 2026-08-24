import { CaseStudyBody } from '../CaseStudyBody'
import { CaseStudySection } from '../CaseStudySection'
import { CurriculumAtlas } from './CurriculumAtlas'
import './LearningLabCaseStudy.scss'

export function LearningLabCaseStudy() {
  return (
    <CaseStudyBody>
      <div className="learning-lab-case-study">
        <CaseStudySection title="Engineering judgement, made teachable" layout="lead">
          <p className="learning-lab-thesis">The learner is not the agent&apos;s hands. They learn to direct, inspect, verify, recover, and direct again.</p>
          <p>The habits behind that loop came from software engineering: establish source truth, control variables, preserve durable state, limit authority, inspect evidence and make failure recoverable. The machinery is new. The responsibility isn&apos;t.</p>
        </CaseStudySection>

        <section className="learning-lab-origin" aria-labelledby="learning-lab-origin-title">
          <div>
            <p className="learning-lab-kicker">Origin artefact</p>
            <h2 id="learning-lab-origin-title">A scrappy promise became a curriculum</h2>
            <p>At heart, the Learning Lab is a love letter to my brother: a promise to turn hard-earned agentic practice into something an intelligent, technically minded non-programmer could learn safely and use for his own purposes.</p>
          </div>
          <blockquote>“I&apos;m going to teach my brother a few things about using agentic AI. I don&apos;t really have a learning plan or anything.”</blockquote>
        </section>

        <CurriculumAtlas />
      </div>
    </CaseStudyBody>
  )
}
