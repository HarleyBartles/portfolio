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
