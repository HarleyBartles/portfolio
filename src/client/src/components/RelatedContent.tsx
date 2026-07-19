import type { ReactElement } from 'react'
import type { ContentSummary } from '../types/content'
import { getContentPath } from '../types/content'

type RelatedContentProps = {
  slugs: string[]
  summaries: ContentSummary[]
}

export function RelatedContent({ slugs, summaries }: RelatedContentProps): ReactElement | null {
  const relatedItems = slugs
    .map((slug) => summaries.find((summary) => summary.slug === slug))
    .filter((summary): summary is ContentSummary => summary !== undefined)

  if (relatedItems.length === 0) {
    return null
  }

  return (
    <nav className="related-content" aria-label="Related content">
      <h2>Related content</h2>
      <ul>
        {relatedItems.map((item) => (
          <li key={item.slug}>
            <a href={getContentPath(item)}>{item.title}</a>
            <p>{item.summary}</p>
          </li>
        ))}
      </ul>
    </nav>
  )
}
