import type { ReactElement } from 'react'
import { AccessibleStatus, DocumentMetadata, SiteLayout } from '../components'

type LoadingPageProps = {
  shell?: boolean
}

export function LoadingPage({ shell = true }: LoadingPageProps): ReactElement {
  const content = (
    <AccessibleStatus id="loading-title" title="Preparing the portfolio" headingLevel={shell ? 1 : 2} routeLoading>
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
        noIndex
      />
      {content}
    </SiteLayout>
  )
}
