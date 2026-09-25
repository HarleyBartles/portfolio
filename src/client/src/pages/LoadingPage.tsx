import { DocumentMetadata, SiteLayout, StatePanel } from '../components'

type LoadingPageProps = {
  shell?: boolean
}

export const LoadingPage = ({ shell = true }: LoadingPageProps) => {
  const content = (
    <StatePanel id="loading-title" title="Loading…" headingLevel={shell ? 1 : 2} announcement="status" routeLoading messages={[]} />
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
