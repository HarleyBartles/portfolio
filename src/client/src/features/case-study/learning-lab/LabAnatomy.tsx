export function LabAnatomy() {
  return (
    <section className="lab-anatomy" aria-labelledby="lab-anatomy-title">
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
          <p><strong>Learner card 03</strong> supplies the questions needed now. The learner inspects what happened, makes the judgment and decides what to try next.</p>
        </section>
        <section aria-label="Worker environment">
          <p className="lab-anatomy__label">Worker environment</p>
          <h3>See only the work</h3>
          <p>The agent receives the scoped mission, project state and applicable instructions, tools and permissions. Workspace scope controls what is presented; permission enforcement controls what is possible.</p>
        </section>
      </div>
    </section>
  )
}
