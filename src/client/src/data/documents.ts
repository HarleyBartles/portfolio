import type {
  ArticleVisualId,
  ContentDocument,
  ContentSummary,
  EditorialContinuation,
  EditorialWritingSummary,
  WritingEditorial,
} from '../types'
import manifest from './content/content-manifest.json'

const markdownLoaders = import.meta.glob('./content/**/*.md', {
  query: '?raw',
  import: 'default',
}) as Record<string, () => Promise<string>>

function stripFrontmatter(markdown: string): string {
  const match = markdown.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/)
  return match !== null ? markdown.slice(match[0].length) : markdown
}

function stripLeadingTitle(markdown: string, title: string): string {
  const firstHeading = markdown.match(/^\s*#\s+(.+)\r?\n?/)

  if (firstHeading !== null && firstHeading[1].trim().toLowerCase() === title.trim().toLowerCase()) {
    return markdown.slice(firstHeading[0].length).trimStart()
  }

  return markdown
}

export function prepareMarkdown(raw: string, summary: ContentSummary): string {
  const withoutFrontmatter = stripFrontmatter(raw)
  return stripLeadingTitle(withoutFrontmatter, summary.title)
}

function nonemptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function parseWritingHomepageCopy(item: Record<string, unknown>): ContentSummary['homepageFeature'] {
  if (item.kind !== 'writing' || item.homepageFeature === null || typeof item.homepageFeature !== 'object') {
    return undefined
  }

  const source = item.homepageFeature as Record<string, unknown>
  if (!nonemptyString(source.summary) || !nonemptyString(source.inwardLabel) || !nonemptyString(source.incomingTeaser)) {
    return undefined
  }

  return {
    summary: source.summary,
    inwardLabel: source.inwardLabel,
    incomingTeaser: source.incomingTeaser,
  }
}

function parseEditorial(item: Record<string, unknown>): WritingEditorial | undefined {
  const editorial = item.editorial
  if (item.kind !== 'writing' || editorial === null || typeof editorial !== 'object') {
    return undefined
  }

  const source = editorial as Record<string, unknown>
  const homepageFeature = source.homepageFeature
  const visual = source.visual
  const continuations = source.continuations
  if (
    !nonemptyString(source.dateline)
    || typeof source.readingMinutes !== 'number'
    || !Number.isInteger(source.readingMinutes)
    || source.readingMinutes <= 0
    || typeof source.indexLead !== 'boolean'
    || homepageFeature === null
    || typeof homepageFeature !== 'object'
    || visual === null
    || typeof visual !== 'object'
    || !Array.isArray(continuations)
    || continuations.length !== 2
  ) {
    return undefined
  }

  const homepage = homepageFeature as Record<string, unknown>
  const figure = visual as Record<string, unknown>
  if (
    typeof homepage.eligible !== 'boolean'
    || !nonemptyString(homepage.proposition)
    || !nonemptyString(figure.id)
    || !figure.id.endsWith('-visual')
    || !nonemptyString(figure.description)
  ) {
    return undefined
  }

  const parsedContinuations: EditorialContinuation[] = []
  for (const continuation of continuations) {
    if (continuation === null || typeof continuation !== 'object') {
      return undefined
    }
    const entry = continuation as Record<string, unknown>
    if (!nonemptyString(entry.slug) || !nonemptyString(entry.rationale)) {
      return undefined
    }
    parsedContinuations.push({ slug: entry.slug, rationale: entry.rationale })
  }

  return {
    dateline: source.dateline,
    readingMinutes: source.readingMinutes,
    indexLead: source.indexLead,
    homepageFeature: { eligible: homepage.eligible, proposition: homepage.proposition },
    visual: { id: figure.id as ArticleVisualId, description: figure.description },
    continuations: [parsedContinuations[0], parsedContinuations[1]],
  }
}

export function parseContentSummary(item: unknown): ContentSummary | EditorialWritingSummary {
  const source = item as Record<string, unknown>
  const editorial = parseEditorial(source)
  if (editorial !== undefined) {
    return {
      slug: String(source.slug),
      kind: 'writing',
      title: String(source.title),
      status: String(source.status),
      summary: String(source.summary),
      tags: Array.isArray(source.tags) ? source.tags.map(String) : [],
      editorial,
    }
  }

  return {
    slug: String(source.slug),
    kind: source.kind as ContentSummary['kind'],
    title: String(source.title),
    status: String(source.status),
    summary: String(source.summary),
    homepageFeature: parseWritingHomepageCopy(source),
    date: source.date === undefined ? undefined : String(source.date),
    readingMinutes:
      typeof source.readingMinutes === 'number' ? source.readingMinutes : undefined,
    featured: source.featured === true,
    tags: Array.isArray(source.tags) ? source.tags.map(String) : [],
    relatedSlugs: Array.isArray(source.relatedSlugs) ? source.relatedSlugs.map(String) : [],
  }
}

function itemToSummary(item: unknown): ContentSummary {
  const parsed = parseContentSummary(item)
  if ('editorial' in parsed) {
    return {
      slug: parsed.slug,
      kind: parsed.kind,
      title: parsed.title,
      status: parsed.status,
      summary: parsed.summary,
      homepageFeature: parsed.homepageFeature,
      featured: false,
      tags: parsed.tags,
      relatedSlugs: [],
    }
  }
  return parsed
}

export const navigation: ContentSummary[] = manifest.items.map(itemToSummary)

const defaultProjectOrder = new Map([
  ['codex-marketplace', 0],
  ['agentic-learning-lab', 1],
  ['wild-bunch', 2],
  ['adventures-of-patch', 3],
])

const defaultPatchOrder = new Map([
  ['goldilocks', 0],
  ['sorcerers-apprentice', 1],
  ['identity-emporium', 2],
  ['tournament-of-reasonable-defaults', 3],
  ['the-usual-specialists', 4],
])

const orderSummaries = (
  items: readonly ContentSummary[],
  kind: ContentSummary['kind'],
  order: ReadonlyMap<string, number>,
): ContentSummary[] => items
  .filter((item) => item.kind === kind)
  .toSorted((left, right) => (
    (order.get(left.slug) ?? Number.MAX_SAFE_INTEGER)
    - (order.get(right.slug) ?? Number.MAX_SAFE_INTEGER)
  ))

export const getProjectSummaries = (items: readonly ContentSummary[] = navigation): ContentSummary[] => (
  orderSummaries(items, 'project', defaultProjectOrder)
)

export const getPatchSummaries = (items: readonly ContentSummary[] = navigation): ContentSummary[] => (
  orderSummaries(items, 'patch', defaultPatchOrder)
)

const manifestItemBySlug = new Map(
  manifest.items.map((item) => [String(item.slug), item as Record<string, unknown>]),
)

export async function loadDocument(summary: ContentSummary): Promise<ContentDocument> {
  const manifestItem = manifestItemBySlug.get(summary.slug)
  const sourcePath = manifestItem === undefined || typeof manifestItem.path !== 'string'
    ? ''
    : manifestItem.path
  if (sourcePath === '') {
    return { summary, markdown: undefined }
  }
  const loader = markdownLoaders[`./content/${sourcePath}`]

  if (loader === undefined) {
    return { summary, markdown: '' }
  }

  const raw = await loader()
  return { summary, markdown: prepareMarkdown(raw, summary) }
}
