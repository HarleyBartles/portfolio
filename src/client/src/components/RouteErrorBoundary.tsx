import type { ReactElement } from 'react'
import { Link, useRouteError } from 'react-router-dom'
import { DocumentMetadata } from './DocumentMetadata'
import { SiteLayout } from './SiteLayout'

export function RouteErrorBoundary(): ReactElement {
  useRouteError()

  return (
    <SiteLayout>
      <DocumentMetadata
        title="Portfolio Error | Harley Bartles"
        description="Portfolio route content could not be loaded."
        canonicalPath="/"
      />
      <section className="state-panel" aria-labelledby="route-error-title">
        <h1 id="route-error-title">Portfolio route unavailable</h1>
        <p role="alert">Could not load this portfolio route. Use the links below to recover.</p>
        <div className="state-actions" aria-label="Recovery navigation">
          <Link to="/">Return to the homepage</Link>
          <Link to="/projects">View project stories</Link>
        </div>
      </section>
    </SiteLayout>
  )
}
