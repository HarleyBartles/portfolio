export type ContentKind =
  | 'project'
  | 'practice'
  | 'ai-engineering'
  | 'learning'
  | 'writing'
  | 'patch'

export type ContentPresentation =
  | 'marketplace-case-study'
  | 'wild-bunch-case-study'
  | 'patch-pipeline-case-study'
  | 'learning-lab-case-study'
  | 'patch-identity-emporium'
  | 'patch-tournament'
  | 'patch-lawful-heist'

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
  presentation?: ContentPresentation
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

export function getContentPath(item: Pick<ContentSummary, 'kind' | 'slug'>): string {
  if (item.kind === 'project') {
    return `/projects/${item.slug}`
  }

  if (item.kind === 'writing') {
    return `/writing/${item.slug}`
  }

  if (item.kind === 'patch') {
    return `/patch/${item.slug}`
  }

  return `/${item.slug}`
}
