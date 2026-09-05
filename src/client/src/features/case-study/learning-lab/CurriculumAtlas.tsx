import { ExternalLink } from '../../../components'
import styled from 'styled-components'
import { learningLabEvidence, pinnedLearningLabPath } from './learningLabEvidence'

const courseStageLabels = {
  complete: 'Complete',
  'substantially-planned': 'Substantially planned',
  'early-outline': 'Early outline',
} as const

const Atlas = styled.section`
  .learning-atlas__header {
    display: grid;
    grid-template-columns: minmax(0, 1.4fr) minmax(15rem, 0.6fr);
    gap: var(--space-8);
    align-items: end;
    padding-bottom: var(--space-6);
    border-bottom: 1px solid var(--color-border);
  }

  .learning-atlas__header h2 { margin: 0; }
  .learning-atlas__header > p { margin: 0; }

  .learning-atlas__courses {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: start;
  }

  .learning-atlas__course {
    min-width: 0;
    padding: clamp(var(--space-5), 3vw, var(--space-8));
    border-right: 1px solid var(--color-border);
  }

  .learning-atlas__course:first-child { padding-left: 0; }
  .learning-atlas__course:nth-child(2) { padding-right: 0; border-right: 0; }
  .learning-atlas__course:last-child { grid-column: 1 / -1; padding: var(--space-8) 0 0; border-top: 1px solid var(--color-border); border-right: 0; }
  .learning-atlas__course:last-child h3,
  .learning-atlas__course:last-child .learning-atlas__outcome,
  .learning-atlas__course:last-child .learning-atlas__empty { max-width: 48rem; }
  .learning-atlas__course:last-child .learning-atlas__outcome { min-height: 0; }
  .learning-atlas__course-meta { display: flex; flex-wrap: wrap; justify-content: space-between; gap: var(--space-2) var(--space-4); }
  .learning-atlas__course-number { margin: 0 0 var(--space-3); color: var(--learning-teal); font-family: var(--font-site-sans); font-size: var(--type-metadata-size); font-weight: 700; letter-spacing: .012em; }
  .learning-atlas__course-stage { margin: 0 0 var(--space-3); font-family: var(--font-site-sans); font-size: var(--type-metadata-size); font-weight: 700; letter-spacing: .012em; }
  .learning-atlas__course h3 { margin: 0; font-size: clamp(1.3rem, 2vw, 1.8rem); line-height: 1.05; }
  .learning-atlas__course:not(:last-child) h3 { min-height: 2.1em; }
  .learning-atlas__outcome { min-height: 7.5em; font-size: 0.95rem; }
  .learning-atlas__empty { margin: var(--space-6) 0 0; border-top: 1px solid var(--color-border); padding-top: var(--space-5); font-style: italic; }

  .learning-atlas__modules { display: grid; gap: 0; margin: var(--space-6) 0 0; padding: 0; list-style: none; border-top: 1px solid var(--color-border); }
  .learning-atlas__module { display: grid; grid-template-columns: 2.5rem 1fr; gap: var(--space-3); padding: var(--space-4) 0; border-bottom: 1px solid var(--color-border); }
  .learning-atlas__course:not(:last-child) .learning-atlas__module:last-child { border-bottom: 0; }
  .learning-atlas__module-id { color: var(--learning-copper); font-family: var(--font-code); font-weight: 700; }
  .learning-atlas__module-copy { display: grid; gap: var(--space-2); }
  .learning-atlas__module-copy strong { line-height: 1.2; }
  .learning-atlas__course:not(:last-child) .learning-atlas__module-copy strong { min-height: 2.4em; }
  .learning-atlas__module-summary { color: var(--color-muted); font-size: 0.9rem; line-height: 1.4; }
  .learning-atlas__course:not(:last-child) .learning-atlas__module-summary { min-height: 2.8em; }
  .learning-atlas__source { display: flex; flex-wrap: wrap; gap: var(--space-3) var(--space-6); margin-top: var(--space-6); }

  @media (max-width: 60rem) {
    .learning-atlas__outcome { min-height: 0; }
  }

  @media (max-width: 44rem) {
    .learning-atlas__header,
    .learning-atlas__courses { grid-template-columns: 1fr; }
    .learning-atlas__course,
    .learning-atlas__course:first-child,
    .learning-atlas__course:nth-child(2),
    .learning-atlas__course:last-child { grid-column: auto; padding: var(--space-7) 0; border-top: 0; border-right: 0; }
    .learning-atlas__course:not(:last-child) .learning-atlas__module:last-child { border-bottom: 1px solid var(--color-border); }
    .learning-atlas__course:not(:last-child) h3,
    .learning-atlas__course:not(:last-child) .learning-atlas__module-copy strong,
    .learning-atlas__course:not(:last-child) .learning-atlas__module-summary { min-height: 0; }
  }
`

export function CurriculumAtlas() {
  return (
    <Atlas className="learning-atlas" data-visual-contract="learning-lab-atlas" aria-labelledby="learning-atlas-title">
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
    </Atlas>
  )
}
