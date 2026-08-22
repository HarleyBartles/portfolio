import type { ComponentType } from 'react'
import { MarketplaceCaseStudy } from './marketplace/MarketplaceCaseStudy'

const projectPresentations = {
  'marketplace-case-study': MarketplaceCaseStudy,
} as const satisfies Record<string, ComponentType>

export function getProjectPresentation(presentation: string): ComponentType | undefined {
  return projectPresentations[presentation as keyof typeof projectPresentations]
}
