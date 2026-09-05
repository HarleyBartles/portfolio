import { DocumentMetadata, SiteLayout, StatePanel } from '../components'

export const NotFoundPage = () => {
  return (
    <SiteLayout>
      <DocumentMetadata
        title="Page Not Found | Harley Bartles"
        description="This portfolio page is not available."
        canonicalPath="/"
        noIndex
      />
      <StatePanel id="not-found-title" title="Page not found" messages={['This portfolio page is not available yet.']} actions={[{ label: 'Return to the homepage', to: '/' }]} />
    </SiteLayout>
  )
}
