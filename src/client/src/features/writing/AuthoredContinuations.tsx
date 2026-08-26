import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import type { ContentSummary } from '../../types/content'
import { getContentPath } from '../../types/content'
import type { WritingPresentation } from './writingPresentations'

type AuthoredContinuationsProps = {
  presentation: WritingPresentation
  summaries: readonly ContentSummary[]
}

export function AuthoredContinuations({ presentation, summaries }: AuthoredContinuationsProps): ReactElement | null {
  const continuations = presentation.continuations.map((continuation) => ({
    ...continuation,
    summary: summaries.find((summary) => summary.slug === continuation.slug),
  }))

  if (continuations.some(({ summary }) => summary === undefined)) return null

  return (
    <nav className="writing-continuations" aria-label="Continue reading">
      <h2>Continue reading</h2>
      <ul>
        {continuations.map(({ slug, eyebrow, summary }) => (
          <li key={slug}>
            <Link to={getContentPath(summary!)}>
              <span className="writing-continuations__eyebrow">{eyebrow}</span>
              <strong>{summary!.title}</strong>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
