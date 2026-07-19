import type { ContentDocument, ContentSummary } from '../types/content'

const navigationEndpoint = '/api/content/navigation'
const contentEndpoint = (slug: string) => `/api/content/${encodeURIComponent(slug)}`

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

async function fetchJson<T>(endpoint: string): Promise<T> {
  const response = await fetch(endpoint, {
    headers: {
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new ApiRequestError(endpoint, response.status)
  }

  return response.json() as Promise<T>
}

export function getNavigation(): Promise<ContentSummary[]> {
  return fetchJson<ContentSummary[]>(navigationEndpoint)
}

export function getContent(slug: string): Promise<ContentDocument> {
  return fetchJson<ContentDocument>(contentEndpoint(slug))
}
