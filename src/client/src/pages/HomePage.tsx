import type { ReactElement } from 'react'
import { DocumentMetadata, SiteLayout } from '../components'
import '../features/home/HomePage.scss'
import { HomepageOpening } from '../features/home/HomepageOpening'
import { MarketplaceFeature } from '../features/home/MarketplaceFeature'
import { ProfessionalClose } from '../features/home/ProfessionalClose'
import { PatchHomepageSlot } from '../features/home/PatchHomepageSlot'
import { WildBunchFeature } from '../features/home/WildBunchFeature'
import { WritingFeature } from '../features/home/WritingFeature'
import { getHomepageEdition } from '../features/home/homepageEdition'

export function HomePage(): ReactElement {
  const edition = getHomepageEdition()

  return (
    <SiteLayout surface="home">
      <DocumentMetadata
        title="Harley Bartles | Full-stack software engineer"
        description="Full-stack software engineer building reliable agentic systems, public tools, and memorable visual explanations."
        canonicalPath="/"
      />
      <HomepageOpening />
      <MarketplaceFeature />
      <WildBunchFeature nextFeature={edition.writing} />
      <WritingFeature feature={edition.writing} nextFeature={edition.patch} />
      <PatchHomepageSlot feature={edition.patch} />
      <ProfessionalClose />
    </SiteLayout>
  )
}
