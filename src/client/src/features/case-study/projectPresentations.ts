import { lazy, type ComponentType } from 'react'

const projectPresentations = {
  'marketplace-case-study': lazy(async () => ({ default: (await import('./marketplace/MarketplaceCaseStudy')).MarketplaceCaseStudy })),
  'wild-bunch-case-study': lazy(async () => ({ default: (await import('./wild-bunch/WildBunchCaseStudy')).WildBunchCaseStudy })),
} as const satisfies Record<string, ComponentType>

export function getProjectPresentation(presentation: string): ComponentType | undefined {
  return projectPresentations[presentation as keyof typeof projectPresentations]
}
