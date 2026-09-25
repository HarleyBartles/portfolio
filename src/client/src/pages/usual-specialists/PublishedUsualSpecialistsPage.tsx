import { DocumentMetadata, SiteLayout } from '../../components'
import { UsualSpecialistsPage } from './UsualSpecialistsPage'

export const PublishedUsualSpecialistsPage = () => (
  <SiteLayout mainFrame="full" opening="composed">
    <DocumentMetadata canonicalPath="/patch/the-usual-specialists" />
    <UsualSpecialistsPage />
  </SiteLayout>
)
