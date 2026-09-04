import { Link } from 'react-router-dom'
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
      <StatePanel labelledBy="area-placeholder-title">
        <h1 id="area-placeholder-title">{title}</h1>
        <p>This section is being prepared.</p>
        <p>The homepage summary is the current public placeholder until deeper content is published.</p>
        <Link to="/">Return to the homepage</Link>
      </StatePanel>
    </SiteLayout>
  )
}
