import contentRouteRoots from '../data/routes/content-route-roots.json'

export type ContentKind =
  | 'project'
  | 'practice'
  | 'ai-engineering'
  | 'learning'
  | 'writing'
  | 'patch'

export type WritingHomepageCopy = {
  summary: string
  inwardLabel: string
  incomingTeaser: string
}

export type ContentSummary = {
  slug: string
  kind: ContentKind
  title: string
  status: string
  summary: string
  homepageFeature?: WritingHomepageCopy
  date?: string
  readingMinutes?: number
  featured: boolean
  tags: string[]
  relatedSlugs: string[]
}

export type ContentSummaryOf<K extends ContentKind> = Omit<ContentSummary, 'kind'> & { kind: K }

export type ArticleVisualId = `${string}-visual`

export type EditorialContinuation = {
  slug: string
  rationale: string
}

export type WritingEditorial = {
  dateline: string
  readingMinutes: number
  indexLead: boolean
  homepageFeature: {
    eligible: boolean
    proposition: string
  }
  visual: {
    id: ArticleVisualId
    description: string
  }
  continuations: [EditorialContinuation, EditorialContinuation]
}

/**
 * The future publication contract. It deliberately remains separate from
 * ContentSummary until the admitted roster activates it atomically.
 */
export type EditorialWritingSummary = Omit<
  ContentSummary,
  'kind' | 'date' | 'readingMinutes' | 'featured' | 'relatedSlugs'
> & {
  kind: 'writing'
  editorial: WritingEditorial
}

export type ContentDocument = {
  summary: ContentSummary
  markdown?: string
}

export const getContentPath = (item: Pick<ContentSummary, 'kind' | 'slug'>): string => {
  const root = contentRouteRoots[item.kind as keyof typeof contentRouteRoots]
  return root === undefined ? `/${item.slug}` : `${root}/${item.slug}`
}
