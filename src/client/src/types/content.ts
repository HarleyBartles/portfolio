export type ContentKind =
  | 'project'
  | 'practice'
  | 'ai-engineering'
  | 'learning'
  | 'writing'
  | 'fairytales'

export type ContentSummary = {
  slug: string
  kind: ContentKind
  title: string
  status: string
  summary: string
  date?: string
  readingMinutes?: number
  featured: boolean
  tags: string[]
  relatedSlugs: string[]
}

export type ContentDocument = {
  summary: ContentSummary
  markdown: string
}

export function getContentPath(item: Pick<ContentSummary, 'kind' | 'slug'>): string {
  if (item.kind === 'project') {
    return `/projects/${item.slug}`
  }

  if (item.kind === 'writing') {
    return `/writing/${item.slug}`
  }

  if (item.kind === 'fairytales') {
    return `/fairytales/${item.slug}`
  }

  return `/${item.slug}`
}
