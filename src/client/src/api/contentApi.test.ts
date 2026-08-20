import { describe, expect, test } from 'vitest'
import { getContent, getNavigation, ApiRequestError } from './contentApi'

describe('content API client', () => {
  test('retrieves navigation summaries from the static content manifest', async () => {
    const navigation = await getNavigation()
    const wildBunch = navigation.find((item) => item.slug === 'wild-bunch')

    expect(wildBunch).toBeDefined()
    expect(wildBunch?.kind).toBe('project')
    expect(wildBunch?.title).toBe('Wild Bunch')
  })

  test('retrieves a content document by slug from the static content set', async () => {
    const document = await getContent('wild-bunch')

    expect(document.summary.slug).toBe('wild-bunch')
    expect(document.summary.kind).toBe('project')
    expect(document.markdown).toContain('pre-alpha')
  })

  test('converts missing slug into a 404 endpoint error without server path leakage', async () => {
    await expect(getContent('not-real')).rejects.toBeInstanceOf(ApiRequestError)
    await expect(getContent('not-real')).rejects.toMatchObject({
      endpoint: '/api/content/not-real',
      status: 404,
    })
    await expect(getContent('not-real')).rejects.toThrow('404')
    await expect(getContent('not-real')).rejects.not.toThrow('content-manifest.json')
  })
})
