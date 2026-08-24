import { getPatchStoryLab } from './patchEvidence'

export function PatchStoryLab() {
  const storyLab = getPatchStoryLab()

  return (
    <section className="patch-movement patch-story-lab" aria-labelledby="patch-story-lab-title">
      <div className="patch-movement__copy case-study-lead">
        <div className="case-study-lead__heading">
          <p className="patch-section-number" aria-hidden="true">07</p>
          <h2 id="patch-story-lab-title">What Patch might teach next</h2>
        </div>
        <div className="case-study-lead__body">
          <p>Future work stays light until its lesson earns more. Each fairytale plan pairs one operational thought with a familiar story. The adventure plans are broader, but none is presented as scheduled work.</p>
        </div>
      </div>
      <div className="patch-story-lab__notebook">
        <div>
          <h3>Fairytale plans</h3>
          <ul aria-label="Fairytale plans">{storyLab.fairytalePlans.map((plan) => <li key={plan.title}><strong>{plan.title}</strong><span>{plan.lesson}</span></li>)}</ul>
        </div>
        <div>
          <h3>Adventure plans</h3>
          <ul aria-label="Adventure plans">{storyLab.adventurePlans.map((plan) => <li key={plan.title}><strong>{plan.title}</strong><span>{plan.lesson}</span></li>)}</ul>
        </div>
      </div>
    </section>
  )
}
