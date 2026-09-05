import styled from 'styled-components'

const Anatomy = styled.section`
  > header { max-width: 48rem; margin-bottom: var(--space-8); }
  > header h2 { margin: 0; }
  .lab-anatomy__layers {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    align-items: stretch;
    gap: clamp(var(--space-4), 3vw, var(--space-8));
    padding-bottom: var(--space-20);
  }
  .lab-anatomy__layers section { min-width: 0; padding: clamp(var(--space-5), 3vw, var(--space-8)); border-top: 1px solid var(--color-border); }
  .lab-anatomy__layers section:nth-child(2),
  .lab-anatomy__layers section:nth-child(3) { transform: none; }
  .lab-anatomy__layers h3 { margin: var(--space-3) 0; }
  .lab-anatomy__label { color: var(--learning-copper); font-family: var(--font-site-sans); font-size: var(--type-metadata-size); font-weight: 700; letter-spacing: .012em; }

  @media (max-width: 44rem) {
    .lab-anatomy__layers { grid-template-columns: 1fr; padding-bottom: 0; }
    .lab-anatomy__layers section:nth-child(2),
    .lab-anatomy__layers section:nth-child(3) { transform: none; }
  }
`

export function LabAnatomy() {
  return (
    <Anatomy className="lab-anatomy" aria-labelledby="lab-anatomy-title">
      <header><p className="learning-lab-kicker">Inside a lab</p><h2 id="lab-anatomy-title">Three views of the same session</h2><p>Facilitator choreography is not worker context.</p></header>
      <div className="lab-anatomy__layers">
        <section aria-label="Facilitator">
          <p className="lab-anatomy__label">Facilitator</p>
          <h3>Hold the whole experiment</h3>
          <p>Rationale, setup, expected observations, fallbacks and deliberate deferments stay visible here. The facilitator can respond without leaking the lesson into the exercise.</p>
        </section>
        <section aria-label="Learner">
          <p className="lab-anatomy__label">Learner</p>
          <h3>Reveal the next card</h3>
          <p><strong>The next learner card</strong> supplies the questions needed now. The learner inspects what happened, makes the judgment and decides what to try next.</p>
        </section>
        <section aria-label="Worker environment">
          <p className="lab-anatomy__label">Worker environment</p>
          <h3>See only the work</h3>
          <p>The agent receives the scoped mission, project state and applicable instructions, tools and permissions. Workspace scope controls what is presented; permission enforcement controls what is possible.</p>
        </section>
      </div>
    </Anatomy>
  )
}
