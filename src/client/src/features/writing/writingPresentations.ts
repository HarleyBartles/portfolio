import { lazy, type ComponentType, type LazyExoticComponent } from 'react'
import './VibeCodingFigure.scss'

type WritingFigure = {
  id: 'vibe-coding-door-road-visual'
  description: 'Vibe coding opens the door. Engineering carries the work from a working demo to a durable system.'
  Component: LazyExoticComponent<ComponentType>
}

type WritingContinuation = {
  slug: 'graph-iterative-review' | 'provisioning-is-not-accumulation'
  eyebrow: 'Follow the review machinery' | 'Follow the environment boundary'
  rationale: 'Follow the review machinery' | 'Follow the environment boundary'
}

export type WritingPresentation = {
  figure: WritingFigure
  continuations: readonly [WritingContinuation, WritingContinuation]
}

const writingPresentations = {
  'agentic-engineering-vs-vibe-coding': {
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
} as const satisfies Record<string, WritingPresentation>

export function getWritingPresentation(slug: string): WritingPresentation | undefined {
  return writingPresentations[slug as keyof typeof writingPresentations]
}
