import { getContentPath, type ContentSummary } from '../types'

type ContentLinkProps = {
  item: ContentSummary
  label: string
  href?: string
}

export const ContentLink = ({ item, label, href = getContentPath(item) }: ContentLinkProps) => {
  return (
    <a className="content-link" href={href}>
      {label}
    </a>
  )
}
