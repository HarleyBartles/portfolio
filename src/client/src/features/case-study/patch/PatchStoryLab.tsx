import { getPatchStoryLab } from './patchEvidence'

export function PatchStoryLab() {
  const storyLab = getPatchStoryLab()

  return (
    <section aria-labelledby="patch-story-lab-title">
      <h2 id="patch-story-lab-title">Story lab</h2>
      <h3>Fairytale lessons</h3>
      <ul aria-label="Fairytale lessons">{storyLab.fairytaleLessons.map((lesson) => <li key={lesson}>{lesson}</li>)}</ul>
      <h3>Archived adventure questions</h3>
      <ul aria-label="Archived adventure questions">{storyLab.adventureQuestions.map((question) => <li key={question.title}><strong>{question.title}</strong>: {question.lesson}</li>)}</ul>
    </section>
  )
}
