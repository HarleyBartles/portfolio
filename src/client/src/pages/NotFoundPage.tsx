import type { ReactElement } from 'react'
import { DocumentMetadata } from '../components/DocumentMetadata'
import { SiteLayout } from '../components/SiteLayout'

export function NotFoundPage(): ReactElement {
  return (
    <SiteLayout>
      <DocumentMetadata
        title="Page Not Found | Harley Bartles"
        description="This portfolio page is not available."
        canonicalPath="/"
      />
      <section className="state-panel" aria-labelledby="not-found-title">
        <h1 id="not-found-title">Page not found</h1>
        <p>This portfolio page is not available yet.</p>
        <a href="/">Return to the homepage</a>
      </section>
    </SiteLayout>
  )
}
