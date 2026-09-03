import type { ContentDocument, ContentSummary } from '../types/content'
import { loadDocument, navigation } from '../data/documents'

export class ApiRequestError extends Error {
  readonly endpoint: string
  readonly status: number

  constructor(endpoint: string, status: number) {
    super(`Request to ${endpoint} failed with status ${status}.`)
    this.name = 'ApiRequestError'
    this.endpoint = endpoint
    this.status = status
  }
}

export function getNavigation(): Promise<ContentSummary[]> {
  return Promise.resolve(navigation)
}

export function getContent(slug: string): Promise<ContentDocument> {
  const summary = navigation.find((item) => item.slug === slug)

  if (summary === undefined) {
    return import('../data/previews/port10Preview').then(({ getPort10Preview }) => {
      const preview = getPort10Preview(slug)
      if (preview === undefined) {
        throw new ApiRequestError(`/api/content/${encodeURIComponent(slug)}`, 404)
      }
      return preview
    })
  }

  return loadDocument(summary)
}
