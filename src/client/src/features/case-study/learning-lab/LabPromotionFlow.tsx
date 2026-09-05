import styled from 'styled-components'

const promotionStages = [
  { title: 'Roadmap module', question: 'What judgment should the learner earn?', output: 'A bounded learning intent.', stop: 'Stop if the idea only names a topic.' },
  { title: 'Learning pressure and dependencies', question: 'What experience makes the distinction matter?', output: 'A failure-shaped problem and its prerequisites.', stop: 'Stop if explanation alone can carry it.' },
  { title: 'Facilitator choreography', question: 'What must be prepared, observed, held back, or recovered?', output: 'A runnable session path with contingencies.', stop: 'Stop if success depends on improvising hidden setup.' },
  { title: 'Learner cards and progressive disclosure', question: 'What does the learner need at this moment?', output: 'Sequenced prompts that preserve discovery.' },
  { title: 'Bounded worker environment and safety controls', question: 'What may the agent see and change?', output: 'A scoped project with instructions, tools, permissions, and a recovery route.', stop: 'Stop if the blast radius is unclear.' },
  { title: 'Mature lab with recovery and handoff', question: 'Can another facilitator run it and respond when reality differs?', output: 'A ready-to-run lab with evidence, fallbacks, deferments, and the next question.' },
] as const

const Promotion = styled.section`
  > header { max-width: 48rem; margin-bottom: var(--space-8); }
  > header h2 { margin: 0; }
  > ol {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    margin: 0;
    padding: 0;
    list-style: none;
    border-top: 1px solid var(--color-border);
    border-left: 1px solid var(--color-border);
  }
  > ol > li { min-width: 0; padding: clamp(var(--space-5), 3vw, var(--space-8)); border-right: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border); }
  .lab-promotion__number { color: var(--learning-copper); font-family: var(--font-site-sans); font-size: var(--type-metadata-size); font-weight: 700; letter-spacing: .012em; }
  h3 { min-height: 2.2em; margin: var(--space-3) 0 var(--space-6); font-size: 1.35rem; line-height: 1.05; }
  dl { margin: 0; }
  dl div + div { margin-top: var(--space-4); }
  dt { font-family: var(--font-site-sans); font-size: var(--type-metadata-size); font-weight: 700; }
  dd { margin: var(--space-1) 0 0; }
  .lab-promotion__stop { color: var(--color-muted); font-size: 0.9rem; }
  .lab-promotion__note { max-width: 38rem; margin: var(--space-6) 0 0 auto; font-family: var(--font-site-sans); font-size: 1.3rem; }

  @media (max-width: 60rem) {
    > ol { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }

  @media (max-width: 44rem) {
    > ol { grid-template-columns: 1fr; }
  }
`

export function LabPromotionFlow() {
  return (
    <Promotion className="lab-promotion" aria-labelledby="lab-promotion-title">
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
    </Promotion>
  )
}
