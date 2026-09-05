import { DocumentMetadata, SiteLayout, StatePanel } from '../components'

type LoadingPageProps = {
  shell?: boolean
}

export const LoadingPage = ({ shell = true }: LoadingPageProps) => {
  const content = (
    <StatePanel id="loading-title" title="Preparing the portfolio" headingLevel={shell ? 1 : 2} announcement="status" routeLoading messages={['Loading portfolio navigation.']} />
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
