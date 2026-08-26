import { describe, expect, test } from 'vitest'
import { getWritingPresentation } from './writingPresentations'

describe('writing presentations', () => {
  test('registers the authored Vibe presentation', () => {
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
  })

  test('registers the authored Why ADRs presentation and fails closed for unknown slugs', () => {
    const presentation = getWritingPresentation('why-adrs')

    expect(presentation).toMatchObject({
      figure: {
        id: 'decision-memory-visual',
        description: 'A decision record carries context, rejected alternatives, evidence, consequences and reconsideration triggers forward to the next engineer.',
      },
      continuations: [
        { slug: 'agentic-engineering-vs-vibe-coding', eyebrow: 'Return to the professional boundary', rationale: 'Return to the professional boundary' },
        { slug: 'context-is-not-state', eyebrow: 'Carry the memory into agentic work', rationale: 'Carry the memory into agentic work' },
      ],
    })
    expect(getWritingPresentation('provisioning-is-not-accumulation')).toBeUndefined()
    expect(getWritingPresentation('unknown-writing-slug')).toBeUndefined()
  })
})
