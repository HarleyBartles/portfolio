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
        { slug: 'wild-bunch', eyebrow: 'See the decision under pressure', rationale: 'See the decision under pressure' },
        { slug: 'context-is-not-state', eyebrow: 'Carry the memory into agentic work', rationale: 'Carry the memory into agentic work' },
      ],
    })
    expect(getWritingPresentation('unknown-writing-slug')).toBeUndefined()
  })

  test('registers Provisioning as a narrow active read through a deeper capability store', () => {
    const presentation = getWritingPresentation('provisioning-is-not-accumulation')

    expect(presentation).toMatchObject({
      regionLabel: 'Provisioning article introduction',
      visualContract: 'capability-read-path',
      figure: {
        id: 'capability-read-path-visual',
        description: 'A deep capability store feeds only the relevant guidance into a narrow active path for the current agent.',
      },
      continuations: [
        { slug: 'goldilocks', eyebrow: 'See the argument in one page' },
        { slug: 'context-is-not-state', eyebrow: 'Separate context from durable state' },
      ],
    })
  })

  test('registers the review graph as an authority contract rather than a decorative diagram', () => {
    const presentation = getWritingPresentation('graph-iterative-review')

    expect(presentation).toMatchObject({
      regionLabel: 'Review graph article introduction',
      visualContract: 'review-graph-authority',
      figure: {
        id: 'review-graph-authority-visual',
        description: 'A trustworthy review graph turns recorded state into one lawful next action or an honest blocked exit.',
      },
      continuations: [
        { slug: 'provisioning-is-not-accumulation', eyebrow: 'See the environment boundary' },
        { slug: 'context-is-not-state', eyebrow: 'Keep the evidence durable' },
      ],
    })
  })
})
