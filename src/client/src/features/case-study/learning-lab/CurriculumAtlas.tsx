import { ExternalLink } from '../../../components'
import { learningLabEvidence, pinnedLearningLabPath } from './learningLabEvidence'

const courseStageLabels = {
  complete: 'Complete',
  'substantially-planned': 'Substantially planned',
  'early-outline': 'Early outline',
} as const

export function CurriculumAtlas() {
  return (
    <section className="learning-atlas" data-visual-contract="learning-lab-atlas" aria-labelledby="learning-atlas-title">
      <header className="learning-atlas__header">
        <div>
          <p className="learning-lab-kicker">Curriculum atlas</p>
          <h2 id="learning-atlas-title">A progression built from runnable practice</h2>
        </div>
        <p>Course-local numbering. 10 mature labs and 9 planning modules. Snapshot inspected 25 August 2026.</p>
      </header>
      <div className="learning-atlas__courses">
        {learningLabEvidence.courses.map((course, courseIndex) => (
          <section className={`learning-atlas__course learning-atlas__course--${courseIndex + 1}`} aria-labelledby={`${course.id}-title`} key={course.id}>
            <div className="learning-atlas__course-meta">
              <p className="learning-atlas__course-number">Course {courseIndex + 1}</p>
              <p className="learning-atlas__course-stage">{courseStageLabels[course.stage]}</p>
            </div>
            <h3 id={`${course.id}-title`}>{course.title}</h3>
            <p className="learning-atlas__outcome">{course.outcome}</p>
            {course.modules.length > 0 ? (
              <ol className="learning-atlas__modules">
                {course.modules.map((module) => (
                  <li className="learning-atlas__module" key={`${course.id}-${module.id}`}>
                    <span className="learning-atlas__module-id">{module.id}</span>
                    <span className="learning-atlas__module-copy"><strong>{module.title}</strong><span className="learning-atlas__module-summary">{module.summary}</span></span>
                  </li>
                ))}
              </ol>
            ) : null}
            {course.modules.length === 0 ? <p className="learning-atlas__empty">The course boundary is set. Its detailed spine is still to come.</p> : null}
          </section>
        ))}
      </div>
      <p className="learning-atlas__source">
        <ExternalLink href={pinnedLearningLabPath(learningLabEvidence.proof.curriculumShape)} aria-label="Inspect the pinned curriculum shape">Inspect the pinned curriculum shape</ExternalLink>
        <ExternalLink href={pinnedLearningLabPath(learningLabEvidence.proof.course2Index)} aria-label="Inspect the pinned Course 2 plan">Inspect the pinned Course 2 plan</ExternalLink>
      </p>
    </section>
  )
}
