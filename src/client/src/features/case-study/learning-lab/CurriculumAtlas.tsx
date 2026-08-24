import { ExternalLink } from '../../../components/ExternalLink'
import { learningLabEvidence, pinnedLearningLabPath } from './learningLabEvidence'

function moduleStateLabel(state: 'mature-lab' | 'roadmap-module'): string {
  return state === 'mature-lab' ? 'Mature lab' : 'Roadmap module'
}

export function CurriculumAtlas() {
  return (
    <section className="learning-atlas" data-visual-contract="learning-lab-atlas" aria-labelledby="learning-atlas-title">
      <header className="learning-atlas__header">
        <div>
          <p className="learning-lab-kicker">Curriculum atlas</p>
          <h2 id="learning-atlas-title">A progression built from runnable practice</h2>
        </div>
        <p>Modules 1-18 plus the linked 14A practicum. Snapshot inspected 24 August 2026.</p>
      </header>
      <div className="learning-atlas__courses">
        {learningLabEvidence.courses.map((course, courseIndex) => (
          <section className={`learning-atlas__course learning-atlas__course--${courseIndex + 1}`} aria-labelledby={`${course.id}-title`} key={course.id}>
            <p className="learning-atlas__course-number">Course {courseIndex + 1}</p>
            <h3 id={`${course.id}-title`}>{course.title}</h3>
            <p className="learning-atlas__outcome">{course.outcome}</p>
            <ol className="learning-atlas__modules">
              {course.modules.map((module) => (
                <li className="learning-atlas__module" key={module.id}>
                  <span className="learning-atlas__module-id">{module.id}</span>
                  <span className="learning-atlas__module-copy"><strong>{module.title}</strong><small>{moduleStateLabel(module.state)}</small></span>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
      <p className="learning-atlas__source"><ExternalLink href={pinnedLearningLabPath()} aria-label="Inspect the pinned curriculum snapshot">Inspect the pinned curriculum snapshot</ExternalLink></p>
    </section>
  )
}
