import type { ComponentType } from 'react'
import { DocumentMetadata, SiteLayout } from '../components'
import previewRoutes from '../data/routes/preview-routes.json'

type UsualSpecialistsPreviewPageProps = {
  Presentation: ComponentType
}

const previewRoute = previewRoutes.find(
  (route) => route.path === '/patch/the-usual-specialists/next/',
)

if (previewRoute === undefined) {
  throw new Error('The Usual Specialists preview route registration is missing.')
}

export const UsualSpecialistsPreviewPage = ({ Presentation }: UsualSpecialistsPreviewPageProps) => (
  <SiteLayout mainFrame="full" opening="composed">
    <DocumentMetadata
      title={previewRoute.title}
      description={previewRoute.description}
      canonicalPath={previewRoute.path}
      noIndex
    />
    <Presentation />
  </SiteLayout>
)
