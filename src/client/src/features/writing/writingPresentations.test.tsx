import { describe, expect, test } from 'vitest'
import { getWritingPresentation } from './writingPresentations'

describe('writing presentations', () => {
  test('registers only the authored Vibe presentation and fails closed for unknown slugs', () => {
    const presentation = getWritingPresentation('agentic-engineering-vs-vibe-coding')

    expect(presentation).toMatchObject({
      figure: {
        id: 'vibe-coding-door-road-visual',
        description: 'Vibe coding opens the door. Engineering carries the work from a working demo to a durable system.',
      },
      continuations: [
        { slug: 'graph-iterative-review', eyebrow: 'Follow the review machinery', rationale: 'Follow the review machinery' },
        { slug: 'provisioning-is-not-accumulation', eyebrow: 'Follow the environment boundary', rationale: 'Follow the environment boundary' },
      ],
    })
    expect(getWritingPresentation('context-is-not-state')).toBeUndefined()
    expect(getWritingPresentation('unknown-writing-slug')).toBeUndefined()
  })
})
