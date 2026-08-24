const promotionStages = [
  { title: 'Roadmap module', question: 'What judgment should the learner earn?', output: 'A bounded learning intent.', stop: 'Stop if the idea only names a topic.' },
  { title: 'Learning pressure and dependencies', question: 'What experience makes the distinction matter?', output: 'A failure-shaped problem and its prerequisites.', stop: 'Stop if explanation alone can carry it.' },
  { title: 'Facilitator choreography', question: 'What must be prepared, observed, held back, or recovered?', output: 'A runnable session path with contingencies.', stop: 'Stop if success depends on improvising hidden setup.' },
  { title: 'Learner cards and progressive disclosure', question: 'What does the learner need at this moment?', output: 'Sequenced prompts that preserve discovery.' },
  { title: 'Bounded worker environment and safety controls', question: 'What may the agent see and change?', output: 'A scoped project with instructions, tools, permissions, and a recovery route.', stop: 'Stop if the blast radius is unclear.' },
  { title: 'Mature lab with recovery and handoff', question: 'Can another facilitator run it and respond when reality differs?', output: 'A ready-to-run lab with evidence, fallbacks, deferments, and the next question.' },
] as const

export function LabPromotionFlow() {
  return (
    <section className="lab-promotion" aria-labelledby="lab-promotion-title">
      <header><p className="learning-lab-kicker">From intent to runnable work</p><h2 id="lab-promotion-title">How a module earns maturity</h2></header>
      <ol>
        {promotionStages.map((stage, index) => (
          <li key={stage.title}>
            <span className="lab-promotion__number">{String(index + 1).padStart(2, '0')}</span>
            <h3>{stage.title}</h3>
            <dl><div><dt>Question</dt><dd>{stage.question}</dd></div><div><dt>Output</dt><dd>{stage.output}</dd></div></dl>
            {'stop' in stage ? <p className="lab-promotion__stop">{stage.stop}</p> : null}
          </li>
        ))}
      </ol>
      <p className="lab-promotion__note">Mature means ready to run and learn from, not finished forever.</p>
    </section>
  )
}
