import { lazy, type ComponentType } from 'react'

const projectPresentations = {
  'codex-marketplace': lazy(async () => ({ default: (await import('./marketplace/MarketplaceCaseStudy')).MarketplaceCaseStudy })),
  'wild-bunch': lazy(async () => ({ default: (await import('./wild-bunch/WildBunchCaseStudy')).WildBunchCaseStudy })),
  'adventures-of-patch': lazy(async () => ({ default: (await import('./patch/PatchPipelineCaseStudy')).PatchPipelineCaseStudy })),
  'identity-emporium': lazy(async () => ({ default: (await import('../patch-showcase/IdentityEmporiumPage')).IdentityEmporiumPage })),
  'tournament-of-reasonable-defaults': lazy(async () => ({ default: (await import('../patch-showcase/TournamentPage')).TournamentPage })),
  'agentic-learning-lab': lazy(async () => ({ default: (await import('./learning-lab/LearningLabCaseStudy')).LearningLabCaseStudy })),
} as const satisfies Record<string, ComponentType>

export function getProjectPresentation(slug: string): ComponentType | undefined {
  return projectPresentations[slug as keyof typeof projectPresentations]
}
