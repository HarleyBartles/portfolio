import type { CareerStage } from '../data'

export const CareerTimeline = ({ stages }: { stages: readonly CareerStage[] }) => {
  return (
    <ol className="career-timeline" aria-label="Career chronology">
      {stages.map((stage) => {
        const headingId = `career-stage-${stage.id}`

        return (
          <li className="career-timeline__stage" data-career-stage={stage.id} data-career-state="idle" key={stage.id} tabIndex={-1}>
            <section aria-labelledby={headingId}>
              <div className="career-timeline__rail">
                <p className="eyebrow">{stage.periodLabel}</p>
              </div>
              <div className="career-timeline__content">
                <h2 id={headingId}>{stage.heading}</h2>
                {(stage.formalTitle !== undefined || stage.scopeLabel !== undefined) && (
                  <dl>
                    {stage.formalTitle !== undefined && <div><dt>Formal title</dt><dd>{stage.formalTitle}</dd></div>}
                    {stage.scopeLabel !== undefined && <div><dt>Scope</dt><dd>{stage.scopeLabel}</dd></div>}
                  </dl>
                )}
                <p>{stage.summary}</p>
                {stage.evidence.map((item) => <p key={item}>{item}</p>)}
              </div>
            </section>
          </li>
        )
      })}
    </ol>
  )
}
