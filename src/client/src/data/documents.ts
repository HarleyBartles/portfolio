import type {
  ArticleVisualId,
  ContentDocument,
  ContentSummary,
  EditorialContinuation,
  EditorialWritingSummary,
  WritingEditorial,
} from '../types/content'
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
    showSummary: source.showSummary === false ? false : undefined,
    date: source.date === undefined ? undefined : String(source.date),
    readingMinutes:
      typeof source.readingMinutes === 'number' ? source.readingMinutes : undefined,
    presentation: source.presentation as ContentSummary['presentation'],
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
      showSummary: parsed.showSummary,
      featured: false,
      tags: parsed.tags,
      relatedSlugs: [],
    }
  }
  return parsed
}

export const navigation: ContentSummary[] = manifest.items.map(itemToSummary)

export function getProjectSummaries(items: readonly ContentSummary[] = navigation): ContentSummary[] {
  return items.filter((item) => item.kind === 'project')
}

const manifestItemBySlug = new Map(
  manifest.items.map((item) => [String(item.slug), item as Record<string, unknown>]),
)

export async function loadDocument(summary: ContentSummary): Promise<ContentDocument> {
  if (summary.presentation !== undefined) {
    return { summary, markdown: undefined }
  }

  const manifestItem = manifestItemBySlug.get(summary.slug)
  const sourcePath = manifestItem === undefined ? '' : String(manifestItem.path)
  const loader = markdownLoaders[`./content/${sourcePath}`]

  if (loader === undefined) {
    return { summary, markdown: '' }
  }

  const raw = await loader()
  return { summary, markdown: prepareMarkdown(raw, summary) }
}
