import type { ReactElement } from 'react'
import { AccessibleStatus } from '../components/AccessibleStatus'
import { DocumentMetadata } from '../components/DocumentMetadata'
import { SiteLayout } from '../components/SiteLayout'

type LoadingPageProps = {
  shell?: boolean
}

export function LoadingPage({ shell = true }: LoadingPageProps): ReactElement {
  const content = (
    <AccessibleStatus id="loading-title" title="Preparing the portfolio" headingLevel={shell ? 1 : 2}>
      Loading portfolio navigation.
    </AccessibleStatus>
  )

  if (!shell) {
    return content
  }

  return (
    <SiteLayout>
      <DocumentMetadata
        title="Portfolio Loading | Harley Bartles"
        description="Portfolio content is loading."
        canonicalPath="/"
      />
      {content}
    </SiteLayout>
  )
}
