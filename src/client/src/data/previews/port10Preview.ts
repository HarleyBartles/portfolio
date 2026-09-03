import type { ContentDocument, ContentSummary } from '../../types/content'
import { prepareMarkdown } from '../documents'
import markdownSource from './port10Preview.md?raw'

export const port10PreviewSlug = 'how-the-invisibles-logo-designer-influenced-the-usual-specialists'

const summary: ContentSummary = {
  slug: port10PreviewSlug,
  kind: 'writing',
  title: 'How The Invisibles’ logo designer influenced The Usual Specialists',
  status: 'preview',
  summary: 'How The Invisibles’ logo designer influenced The Usual Specialists',
  featured: false,
  tags: [],
  relatedSlugs: [],
}

const preview: ContentDocument = {
  summary,
  markdown: prepareMarkdown(markdownSource, summary),
  publicationState: 'preview',
}

export function getPort10Preview(slug: string): ContentDocument | undefined {
  return slug === port10PreviewSlug ? preview : undefined
}
