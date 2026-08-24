import { lazy, type ComponentType } from 'react'

const projectPresentations = {
  'marketplace-case-study': lazy(async () => ({ default: (await import('./marketplace/MarketplaceCaseStudy')).MarketplaceCaseStudy })),
  'wild-bunch-case-study': lazy(async () => ({ default: (await import('./wild-bunch/WildBunchCaseStudy')).WildBunchCaseStudy })),
  'patch-pipeline-case-study': lazy(async () => ({ default: (await import('./patch/PatchPipelineCaseStudy')).PatchPipelineCaseStudy })),
  'patch-identity-emporium': lazy(async () => ({ default: (await import('../patch-showcase/IdentityEmporiumPage')).IdentityEmporiumPage })),
  'patch-tournament': lazy(async () => ({ default: (await import('../patch-showcase/TournamentPage')).TournamentPage })),
  'patch-lawful-heist': lazy(async () => ({ default: (await import('../patch-showcase/LawfulHeistPage')).LawfulHeistPage })),
} as const satisfies Record<string, ComponentType>

export function getProjectPresentation(presentation: string): ComponentType | undefined {
  return projectPresentations[presentation as keyof typeof projectPresentations]
}
