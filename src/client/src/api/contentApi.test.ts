import { HttpResponse, http } from 'msw'
import { describe, expect, test } from 'vitest'
import { server } from '../test/server'
import { getContent, getNavigation } from './contentApi'
import type { ContentDocument, ContentSummary } from '../types/content'

const wildBunchSummary = {
  slug: 'wild-bunch',
  kind: 'project',
  title: 'Wild Bunch',
  status: 'active',
  summary: 'A cooperative planning game.',
  tags: ['React', 'ASP.NET Core'],
  relatedSlugs: ['portfolio'],
} satisfies ContentSummary

const wildBunchDocument = {
  summary: wildBunchSummary,
  markdown: '# Wild Bunch\n\nProject notes.',
} satisfies ContentDocument

describe('content API client', () => {
  test('retrieves typed navigation summaries from the server API', async () => {
    server.use(
      http.get('/api/content/navigation', () => HttpResponse.json([wildBunchSummary])),
    )

    await expect(getNavigation()).resolves.toEqual([wildBunchSummary])
  })

  test('retrieves a typed content document by slug from the server API', async () => {
    server.use(
      http.get('/api/content/:slug', ({ params }) => {
        expect(params.slug).toBe('wild-bunch')

        return HttpResponse.json(wildBunchDocument)
      }),
    )

    await expect(getContent('wild-bunch')).resolves.toEqual(wildBunchDocument)
  })

  test('converts HTTP failures into endpoint and status errors without server path leakage', async () => {
    server.use(
      http.get('/api/content/:slug', () =>
        HttpResponse.text('Failed to read Z:\\portfolio\\src\\content\\content-manifest.json', {
          status: 500,
        }),
      ),
    )

    await expect(getContent('wild-bunch')).rejects.toMatchObject({
      endpoint: '/api/content/wild-bunch',
      status: 500,
    })

    await expect(getContent('wild-bunch')).rejects.toThrow(
      'Request to /api/content/wild-bunch failed with status 500.',
    )

    await expect(getContent('wild-bunch')).rejects.not.toThrow('Z:\\portfolio')
    await expect(getContent('wild-bunch')).rejects.not.toThrow('content-manifest.json')
  })
})
