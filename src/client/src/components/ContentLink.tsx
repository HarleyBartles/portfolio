import type { ReactElement } from 'react'
import type { ContentSummary } from '../types/content'

type ContentLinkProps = {
  item: ContentSummary
  label: string
}

export function ContentLink({ item, label }: ContentLinkProps): ReactElement {
  return (
    <a className="content-link" href={`/content/${item.slug}`}>
      {label}
    </a>
  )
}
