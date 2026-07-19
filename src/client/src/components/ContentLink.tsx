import type { ReactElement } from 'react'
import type { ContentSummary } from '../types/content'
import { getContentPath } from '../types/content'

type ContentLinkProps = {
  item: ContentSummary
  label: string
  href?: string
}

export function ContentLink({ item, label, href = getContentPath(item) }: ContentLinkProps): ReactElement {
  return (
    <a className="content-link" href={href}>
      {label}
    </a>
  )
}
