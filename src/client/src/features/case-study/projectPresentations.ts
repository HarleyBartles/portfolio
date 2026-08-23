import { lazy, type ComponentType } from 'react'

const projectPresentations = {
  'marketplace-case-study': lazy(async () => ({ default: (await import('./marketplace/MarketplaceCaseStudy')).MarketplaceCaseStudy })),
} as const satisfies Record<string, ComponentType>

export function getProjectPresentation(presentation: string): ComponentType | undefined {
  return projectPresentations[presentation as keyof typeof projectPresentations]
}
