import { DocumentMetadata, SiteLayout } from '../../components'
import { getRouteMetadata } from '../../data/routes/routeCatalogue'
import { UsualSpecialistsPage } from './UsualSpecialistsPage'

const canonicalRoute = getRouteMetadata('/patch/the-usual-specialists')

if (canonicalRoute === undefined) {
  throw new Error('The Usual Specialists canonical route registration is missing.')
}

export const PublishedUsualSpecialistsPage = () => (
  <SiteLayout mainFrame="full">
    <DocumentMetadata
      title={canonicalRoute.title}
      description={canonicalRoute.description}
      canonicalPath={canonicalRoute.path}
    />
    <UsualSpecialistsPage />
  </SiteLayout>
)
