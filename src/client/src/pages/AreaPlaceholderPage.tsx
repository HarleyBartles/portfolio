import { DocumentMetadata, SiteLayout, StatePanel } from '../components'

type AreaPlaceholderPageProps = {
  title: string
}

export const AreaPlaceholderPage = ({ title }: AreaPlaceholderPageProps) => {
  return (
    <SiteLayout>
      <DocumentMetadata
        title={`${title} | Harley Bartles`}
        description={`${title} portfolio content is being prepared.`}
        canonicalPath="/"
        noIndex
      />
      <StatePanel
        id="area-placeholder-title"
        title={title}
        messages={['This section is being prepared.', 'The homepage summary is the current public placeholder until deeper content is published.']}
        actions={[{ label: 'Return to the homepage', to: '/' }]}
      />
    </SiteLayout>
  )
}
