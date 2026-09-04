import { Link } from 'react-router-dom'
import { DocumentMetadata, SiteLayout, StatePanel } from '../components'
import '../styles/interior.scss'

export const NotFoundPage = () => {
  return (
    <SiteLayout>
      <DocumentMetadata
        title="Page Not Found | Harley Bartles"
        description="This portfolio page is not available."
        canonicalPath="/"
        noIndex
      />
      <StatePanel labelledBy="not-found-title">
        <h1 id="not-found-title">Page not found</h1>
        <p>This portfolio page is not available yet.</p>
        <Link to="/">Return to the homepage</Link>
      </StatePanel>
    </SiteLayout>
  )
}
