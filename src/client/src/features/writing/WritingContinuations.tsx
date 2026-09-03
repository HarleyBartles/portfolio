import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import type { ContentSummary } from '../../types/content'
import { getContentPath } from '../../types/content'

export type WritingContinuationItem = {
  slug: string
  eyebrow: string
}

type WritingContinuationsProps = {
  items: readonly WritingContinuationItem[]
  summaries: readonly ContentSummary[]
}

export function WritingContinuations({ items, summaries }: WritingContinuationsProps): ReactElement | null {
  const continuations = items.map((item) => ({
    ...item,
    summary: summaries.find((summary) => summary.slug === item.slug),
  }))

  if (continuations.length === 0 || continuations.some(({ summary }) => summary === undefined)) return null

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
