import { describe, expect, test } from 'vitest'
import { orderProjectIndex } from './ProjectIndexPage'

describe('ProjectIndexPage order', () => {
  test('pairs the wide Wild Bunch and Marketplace cards with the compact Patch and Learning Lab cards', () => {
    const projects = [
      { slug: 'codex-marketplace' },
      { slug: 'agentic-learning-lab' },
      { slug: 'wild-bunch' },
      { slug: 'adventures-of-patch' },
    ]

    expect(orderProjectIndex(projects).map((project) => project.slug)).toEqual([
      'wild-bunch',
      'adventures-of-patch',
      'agentic-learning-lab',
      'codex-marketplace',
    ])
  })
})
