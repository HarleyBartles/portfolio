import { getContentPath, type ContentSummary } from '../types'
import { ContentContinuations, type ContentContinuation } from './ContentContinuations'

type ContentNavigationProps = {
  items: readonly ContentSummary[]
  currentSlug: string
}

export const ContentNavigation = ({ items, currentSlug }: ContentNavigationProps) => {
  const currentIndex = items.findIndex((item) => item.slug === currentSlug)

  if (currentIndex < 0) return null

  const previous = items[currentIndex - 1]
  const next = items[currentIndex + 1]

  if (previous === undefined && next === undefined) return null

  const continuationItems: ContentContinuation[] = [
    ...(previous === undefined ? [] : [{
      slug: previous.slug,
      contextLabel: 'Previous',
      title: previous.title,
      href: getContentPath(previous),
    }]),
    ...(next === undefined ? [] : [{
      slug: next.slug,
      contextLabel: 'Next',
      title: next.title,
      href: getContentPath(next),
    }]),
  ]

  return <ContentContinuations className="content-navigation" items={continuationItems} />
}
