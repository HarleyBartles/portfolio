import { describe, expect, test } from 'vitest'
import type { ContentSummary } from '../types/content'
import { prepareMarkdown } from './documents'

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
