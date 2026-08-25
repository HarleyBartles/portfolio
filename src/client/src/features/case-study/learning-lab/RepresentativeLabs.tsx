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

export function RepresentativeLabs() {
  return (
    <section className="representative-labs" aria-labelledby="representative-labs-title">
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
    </section>
  )
}
import { LearningLabImage } from './LearningLabImage'
