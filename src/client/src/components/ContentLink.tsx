import type { ReactElement } from 'react'
import type { ContentSummary } from '../types/content'

type ContentLinkProps = {
  item: ContentSummary
  label: string
  href?: string
}

export function ContentLink({ item, label, href = `/content/${item.slug}` }: ContentLinkProps): ReactElement {
  return (
    <a className="content-link" href={href}>
      {label}
    </a>
  )
}
