import type { ContentDocument, ContentSummary } from '../types/content'
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

function itemToSummary(item: unknown): ContentSummary {
  const source = item as Record<string, unknown>
  return {
    slug: String(source.slug),
    kind: source.kind as ContentSummary['kind'],
    title: String(source.title),
    status: String(source.status),
    summary: String(source.summary),
    date: source.date === undefined ? undefined : String(source.date),
    readingMinutes:
      typeof source.readingMinutes === 'number' ? source.readingMinutes : undefined,
    presentation: source.presentation as ContentSummary['presentation'],
    featured: source.featured === true,
    tags: Array.isArray(source.tags) ? source.tags.map(String) : [],
    relatedSlugs: Array.isArray(source.relatedSlugs) ? source.relatedSlugs.map(String) : [],
  }
}

export const navigation: ContentSummary[] = manifest.items.map(itemToSummary)

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
