import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import type { ContentSummary } from '../types/content'
import { getContentPath } from '../types/content'

type ContentNavigationProps = {
  items: readonly ContentSummary[]
  currentSlug: string
}

export function ContentNavigation({ items, currentSlug }: ContentNavigationProps): ReactElement | null {
  const currentIndex = items.findIndex((item) => item.slug === currentSlug)

  if (currentIndex < 0) return null

  const previous = items[currentIndex - 1]
  const next = items[currentIndex + 1]

  if (previous === undefined && next === undefined) return null

  const kindLabel = items[currentIndex].kind === 'patch' ? 'Patch stories' : items[currentIndex].kind

  return (
    <nav className="content-navigation" aria-label={`More ${kindLabel}`}>
      {previous === undefined ? <span /> : (
        <Link to={getContentPath(previous)} aria-label={`Previous: ${previous.title}`}>
          <span>Previous</span>
          <strong>{previous.title}</strong>
        </Link>
      )}
      {next === undefined ? <span /> : (
        <Link to={getContentPath(next)} aria-label={`Next: ${next.title}`}>
          <span>Next</span>
          <strong>{next.title}</strong>
        </Link>
      )}
    </nav>
  )
}
