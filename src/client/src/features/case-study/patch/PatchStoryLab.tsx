import { getPatchStoryLab } from './patchEvidence'

export function PatchStoryLab() {
  const storyLab = getPatchStoryLab()

  return (
    <section className="patch-movement patch-story-lab" aria-labelledby="patch-story-lab-title">
      <div className="patch-movement__copy">
        <p className="patch-section-number" aria-hidden="true">07</p>
        <h2 id="patch-story-lab-title">What Patch might teach next</h2>
        <p>I keep future work light until its lesson earns more. Fairytale seeds can stay as a single operational thought. The older adventure directions below still answer the current frame test. They stay unlinked until I choose one for production.</p>
      </div>
      <div className="patch-story-lab__notebook">
        <div>
          <h3>Fairytale lessons</h3>
          <ul aria-label="Fairytale lessons">{storyLab.fairytaleLessons.map((lesson) => <li key={lesson}>{lesson}</li>)}</ul>
        </div>
        <div>
          <h3>Questions worth keeping</h3>
          <ul aria-label="Archived adventure questions">{storyLab.adventureQuestions.map((question) => <li key={question.title}><strong>{question.title}</strong><span>{question.lesson}</span></li>)}</ul>
        </div>
      </div>
    </section>
  )
}
