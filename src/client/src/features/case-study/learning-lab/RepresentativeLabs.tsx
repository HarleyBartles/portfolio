import styled from 'styled-components'
import { LearningLabImage } from './LearningLabImage'

const labs = [
  {
    id: '3',
    title: 'The project has a home',
    problem: 'Important decisions feel safely remembered because they remain in the conversation.',
    pressure: 'Make a Repair Café decision while the agent is read-only, lose the conversation, then ask a fresh agent to reconstruct the project.',
    experiment: 'Persist the decision deliberately, compare durable artefacts that disagree and ask which one carries authority.',
    model: 'Decisions that exist only in conversation are tears in the rain. Durable state survives the agent, but persisted does not automatically mean current or authoritative.',
    consequence: 'Mentoring moves from saving chat transcripts to designing project memory and an explicit source-of-truth hierarchy.',
  },
  {
    id: '5',
    title: 'Diagnose the worker before changing it',
    problem: 'A weak result gets blamed on the model before anyone identifies the failing layer.',
    pressure: 'Hold the task steady while changing standing instructions, available evidence and a deterministic verification tool one at a time.',
    experiment: 'Rerun comparable work after each intervention and inspect the accumulated change set as primary evidence.',
    model: 'model + harness + instructions/settings + context + tools + environment/state + feedback = observed behaviour',
    consequence: 'Diagnosis comes before intervention. Plausible and verified become visibly different states of knowledge.',
  },
  {
    id: '7',
    title: 'Put authority where the knowledge lives',
    problem: 'A capable worker can sound convincing while the wrong person holds acceptance authority.',
    pressure: 'Run the same provisioning loop through software engineering, creative writing and technical drawing, changing who can judge the work each time.',
    experiment: 'Compare a baseline with a provisioned attempt, then let the person who knows what good looks like verify the result.',
    model: 'Expertise can be in the room, sourced from outside it or carried primarily by the learner. Provisioning improves the worker; human judgment still accepts the outcome.',
    consequence: 'The facilitator knows when to lead, when to share judgment and when to defer to the learner without surrendering the experimental frame.',
  },
] as const

const Labs = styled.section`
  > header { max-width: 48rem; margin-bottom: var(--space-8); }
  > header h2 { margin: 0; }
  .representative-labs__cases { display: grid; gap: clamp(var(--space-12), 7vw, var(--space-20)); }
  .representative-lab { display: grid; grid-template-columns: minmax(14rem, 0.62fr) minmax(0, 1.38fr); gap: clamp(var(--space-8), 6vw, var(--space-16)); }
  .representative-lab header { padding-top: var(--space-5); border-top: 1px solid var(--color-border); }
  .representative-lab header p { margin: 0 0 var(--space-3); color: var(--learning-copper); font-family: var(--font-site-sans); font-size: var(--type-metadata-size); font-weight: 700; letter-spacing: .012em; }
  .representative-lab h3 { margin: 0; font-size: clamp(2rem, 4vw, 3.5rem); line-height: 0.98; }
  .representative-lab dl { margin: 0; }
  .representative-lab dl div { display: grid; grid-template-columns: minmax(8rem, 0.35fr) minmax(0, 1fr); gap: var(--space-5); padding: var(--space-4) 0; border-top: 1px solid var(--color-border); }
  .representative-lab dt { font-family: var(--font-site-sans); font-size: var(--type-metadata-size); font-weight: 700; }
  .representative-lab dd { margin: 0; }
  .representative-lab[data-lab='7'] { grid-template-columns: minmax(14rem, 0.62fr) minmax(0, 1.38fr); gap: clamp(var(--space-8), 6vw, var(--space-16)); }
  .representative-lab[data-lab='7'] [data-learning-lab-image-id='authority-transfer'] { grid-area: auto; min-height: 0; }
  .representative-lab[data-lab='7'] header { grid-area: auto; margin: 0; padding: var(--space-5) 0 0; color: var(--color-ink); }
  .representative-lab[data-lab='7'] header p { color: var(--learning-copper); }
  .representative-lab[data-lab='7'] dl { grid-column: 1 / -1; margin: 0; padding: 0; }

  @media (max-width: 44rem) {
    .representative-lab { grid-template-columns: 1fr; }
    .representative-lab dl div { grid-template-columns: 1fr; gap: var(--space-2); }
    .representative-lab[data-lab='7'] { display: flex; flex-direction: column; }
    .representative-lab[data-lab='7'] header { order: 0; margin: 0; padding: var(--space-6); }
    .representative-lab[data-lab='7'] [data-learning-lab-image-id='authority-transfer'] { order: 1; min-height: 0; }
    .representative-lab[data-lab='7'] dl { order: 2; margin: 0; padding: var(--space-6) 0 0; }
  }
`

export function RepresentativeLabs() {
  return (
    <Labs className="representative-labs" aria-labelledby="representative-labs-title">
      <header><p className="learning-lab-kicker">Three experiments as proof</p><h2 id="representative-labs-title">The judgment lives in the mechanics</h2></header>
      <div className="representative-labs__cases">
        {labs.map((lab) => (
          <article className="representative-lab" data-lab={lab.id} key={lab.id}>
            <header><p>Lab {lab.id}</p><h3>{lab.title}</h3></header>
            {lab.id === '7' ? <LearningLabImage id="authority-transfer" /> : null}
            <dl>
              <div><dt>Learner problem</dt><dd>{lab.problem}</dd></div>
              <div><dt>Designed pressure</dt><dd>{lab.pressure}</dd></div>
              <div><dt>Safe experiment</dt><dd>{lab.experiment}</dd></div>
              <div><dt>Earned model</dt><dd>{lab.model}</dd></div>
              <div><dt>Mentoring and systems consequence</dt><dd>{lab.consequence}</dd></div>
            </dl>
          </article>
        ))}
      </div>
    </Labs>
  )
}
