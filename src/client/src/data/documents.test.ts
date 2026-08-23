import { describe, expect, test } from 'vitest'
import type { ContentSummary } from '../types/content'
import { loadDocument, navigation, prepareMarkdown } from './documents'

describe('prepareMarkdown', () => {
  test('removes a duplicate leading title from a fairytale before the page header renders', () => {
    const summary: ContentSummary = {
      slug: 'goldilocks',
      kind: 'fairytales',
      title: 'Goldilocks',
      status: 'published',
      featured: false,
      summary: 'A visual lesson.',
      tags: ['fairytales'],
      relatedSlugs: [],
    }

    expect(prepareMarkdown('# Goldilocks\n\nThe story begins.', summary)).toBe('The story begins.')
  })
})

describe('loadDocument', () => {
  test('preserves a project presentation discriminator without looking for Markdown', async () => {
    const marketplace = navigation.find((item) => item.slug === 'codex-marketplace')

    expect(marketplace).toBeDefined()
    expect(marketplace?.presentation).toBe('marketplace-case-study')
    await expect(loadDocument(marketplace!)).resolves.toMatchObject({
      summary: { presentation: 'marketplace-case-study' },
      markdown: undefined,
    })
  })

  test('continues to load ordinary Markdown documents', async () => {
    const wildBunch = navigation.find((item) => item.slug === 'wild-bunch')

    await expect(loadDocument(wildBunch!)).resolves.toMatchObject({
      summary: { slug: 'wild-bunch' },
      markdown: expect.stringContaining('pre-alpha'),
    })
  })
})
