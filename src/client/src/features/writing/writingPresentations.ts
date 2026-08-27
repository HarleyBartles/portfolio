import { lazy, type ComponentType, type LazyExoticComponent } from 'react'
import './VibeCodingFigure.scss'

type WritingFigure = {
  id: `${string}-visual`
  description: string
  Component: LazyExoticComponent<ComponentType>
}

type WritingContinuation = {
  slug: string
  eyebrow: string
  rationale: string
}

export type WritingPresentation = {
  regionLabel: string
  visualContract: string
  figure: WritingFigure
  continuations: readonly [WritingContinuation, WritingContinuation]
}

const writingPresentations = {
  'agentic-engineering-vs-vibe-coding': {
    regionLabel: 'Vibe article introduction',
    visualContract: 'vibe-coding-door-road',
    figure: {
      id: 'vibe-coding-door-road-visual',
      description: 'Vibe coding opens the door. Engineering carries the work from a working demo to a durable system.',
      Component: lazy(async () => ({ default: (await import('./VibeCodingFigure')).VibeCodingFigure })),
    },
    continuations: [
      { slug: 'graph-iterative-review', eyebrow: 'Follow the review machinery', rationale: 'Follow the review machinery' },
      { slug: 'provisioning-is-not-accumulation', eyebrow: 'Follow the environment boundary', rationale: 'Follow the environment boundary' },
    ],
  },
  'why-adrs': {
    regionLabel: 'Why ADRs? article introduction',
    visualContract: 'decision-memory',
    figure: {
      id: 'decision-memory-visual',
      description: 'A decision record carries context, rejected alternatives, evidence, consequences and reconsideration triggers forward to the next engineer.',
      Component: lazy(async () => ({ default: (await import('./WhyAdrsFigure')).WhyAdrsFigure })),
    },
    continuations: [
      { slug: 'wild-bunch', eyebrow: 'See the decision under pressure', rationale: 'See the decision under pressure' },
      { slug: 'context-is-not-state', eyebrow: 'Carry the memory into agentic work', rationale: 'Carry the memory into agentic work' },
    ],
  },
  'provisioning-is-not-accumulation': {
    regionLabel: 'Provisioning article introduction',
    visualContract: 'capability-read-path',
    figure: {
      id: 'capability-read-path-visual',
      description: 'A deep capability store feeds only the relevant guidance into a narrow active path for the current agent.',
      Component: lazy(async () => ({ default: (await import('./ProvisioningFigure')).ProvisioningFigure })),
    },
    continuations: [
      { slug: 'goldilocks', eyebrow: 'See the argument in one page', rationale: 'See the argument in one page' },
      { slug: 'context-is-not-state', eyebrow: 'Separate context from durable state', rationale: 'Separate context from durable state' },
    ],
  },
  'graph-iterative-review': {
    regionLabel: 'Review graph article introduction',
    visualContract: 'review-graph-authority',
    figure: {
      id: 'review-graph-authority-visual',
      description: 'A trustworthy review graph turns recorded state into one lawful next action or an honest blocked exit.',
      Component: lazy(async () => ({ default: (await import('./ReviewGraphFigure')).ReviewGraphFigure })),
    },
    continuations: [
      { slug: 'provisioning-is-not-accumulation', eyebrow: 'See the environment boundary', rationale: 'See the environment boundary' },
      { slug: 'context-is-not-state', eyebrow: 'Keep the evidence durable', rationale: 'Keep the evidence durable' },
    ],
  },
} as const satisfies Record<string, WritingPresentation>

export function getWritingPresentation(slug: string): WritingPresentation | undefined {
  return writingPresentations[slug as keyof typeof writingPresentations]
}
