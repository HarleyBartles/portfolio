export type ContentKind =
  | 'project'
  | 'experience'
  | 'practice'
  | 'ai-engineering'
  | 'learning'
  | 'writing'

export type ContentSummary = {
  slug: string
  kind: ContentKind
  title: string
  status: string
  summary: string
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

  return `/${item.slug}`
}
