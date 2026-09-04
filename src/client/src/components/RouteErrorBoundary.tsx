import { useRouteError } from 'react-router-dom'
import { DocumentMetadata } from './DocumentMetadata'
import { SiteLayout } from './SiteLayout'
import { StatePanel } from './StatePanel'

export const RouteErrorBoundary = () => {
  useRouteError()

  return (
    <SiteLayout>
      <DocumentMetadata
        title="Portfolio Error | Harley Bartles"
        description="Portfolio route content could not be loaded."
        canonicalPath="/"
        noIndex
      />
      <StatePanel
        id="route-error-title"
        title="Portfolio route unavailable"
        messages={['Could not load this portfolio route. Use the links below to recover.']}
        announcement="alert"
        actions={[{ label: 'Return to the homepage', to: '/' }, { label: 'View project stories', to: '/projects' }]}
      />
    </SiteLayout>
  )
}
