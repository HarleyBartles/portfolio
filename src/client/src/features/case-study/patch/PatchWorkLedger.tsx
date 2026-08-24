import type { ReactNode } from 'react'
import { getInFlightWorlds, getPublishedArtefacts } from './patchEvidence'

export function PatchWorkLedger({ children }: { children?: ReactNode }) {
  return (
    <>
      <section aria-labelledby="patch-published-artefacts-title">
        <h2 id="patch-published-artefacts-title">Published artefacts</h2>
        <ul>
          {getPublishedArtefacts().map((artefact) => <li key={artefact.title}><a href={artefact.publicArtefactUrl}>{artefact.title}</a> <span>({artefact.status})</span></li>)}
        </ul>
        {children}
      </section>
      <section aria-labelledby="patch-in-flight-worlds-title">
        <h2 id="patch-in-flight-worlds-title">In-flight worlds</h2>
        {getInFlightWorlds().map((world) => (
          <article key={world.title} aria-label={world.title}>
            <h3>{world.title}</h3>
            <p><strong>Lesson</strong>: {world.lesson}</p>
            <p><strong>Current evidence</strong>: {world.currentEvidence}</p>
            <p><strong>Remaining work</strong>: {world.remaining}</p>
            <p><strong>Status</strong>: {world.status}</p>
          </article>
        ))}
      </section>
    </>
  )
}
