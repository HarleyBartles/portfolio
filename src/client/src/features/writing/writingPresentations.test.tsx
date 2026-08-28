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
        { slug: 'i-made-agentic-engineering-harder-than-it-needed-to-be', eyebrow: 'Carry the memory into agentic work', rationale: 'Carry the memory into agentic work' },
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
        { slug: 'i-made-agentic-engineering-harder-than-it-needed-to-be', eyebrow: 'Separate context from durable state' },
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
        { slug: 'i-made-agentic-engineering-harder-than-it-needed-to-be', eyebrow: 'Keep the evidence durable' },
      ],
    })
  })

  test('registers the context article as an organisation that outgrew its work', () => {
    const presentation = getWritingPresentation('i-made-agentic-engineering-harder-than-it-needed-to-be')

    expect(presentation).toMatchObject({
      regionLabel: 'Agent organisation article introduction',
      visualContract: 'agent-organisation-overhead',
      figure: {
        id: 'agent-organisation-overhead-visual',
        description: 'Will turned Harley’s intent into a small cross-repository organisation. Chris directed Rooms through three department heads while Patch represented another project under Will.',
      },
    })
  })
})
