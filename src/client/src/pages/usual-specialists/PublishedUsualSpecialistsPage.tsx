import { DocumentMetadata, SiteLayout } from '../../components'
import { UsualSpecialistsPage } from './UsualSpecialistsPage'

export const PublishedUsualSpecialistsPage = () => (
  <SiteLayout mainFrame="full">
    <DocumentMetadata canonicalPath="/patch/the-usual-specialists" />
    <UsualSpecialistsPage />
  </SiteLayout>
)
