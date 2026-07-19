import type { ReactElement } from 'react'
import type { ContentSummary } from '../types/content'
import { getContentPath } from '../types/content'

type RelatedContentProps = {
  slugs: string[]
  summaries: ContentSummary[]
  unavailable?: boolean
}

export function RelatedContent({
  slugs,
  summaries,
  unavailable = false,
}: RelatedContentProps): ReactElement | null {
  if (slugs.length === 0) {
    return null
  }

  if (unavailable) {
    return (
      <section className="related-content" aria-labelledby="related-content-title">
        <h2 id="related-content-title">Related content</h2>
        <p role="status">Related links are temporarily unavailable while supporting navigation reloads.</p>
      </section>
    )
  }

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
