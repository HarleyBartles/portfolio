import { describe, expect, test } from 'vitest'
import { getWritingArticleBody } from './writingArticleBodies'

describe('writing article bodies', () => {
  test('resolves each specialist article as a React lazy component', () => {
    for (const slug of [
      'the-right-test-isnt-your-favourite-test',
      'i-just-write-the-code-is-not-a-full-sentence',
      'i-made-agentic-engineering-harder-than-it-needed-to-be',
      'how-the-invisibles-logo-designer-influenced-the-usual-specialists',
      'use-superpowers',
    ]) {
      expect(getWritingArticleBody(slug)).toHaveProperty('$$typeof', Symbol.for('react.lazy'))
    }
  })

  test('fails closed for an ordinary writing article and unknown slugs', () => {
    expect(getWritingArticleBody('agentic-engineering-vs-vibe-coding')).toBeUndefined()
    expect(getWritingArticleBody('unknown-writing-slug')).toBeUndefined()
  })
})
