import type { ReactElement } from 'react'
import { SiteLayout } from '../components/SiteLayout'

type LoadingPageProps = {
  shell?: boolean
}

export function LoadingPage({ shell = true }: LoadingPageProps): ReactElement {
  const Heading = shell ? 'h1' : 'h2'
  const content = (
    <section className="state-panel" aria-labelledby="loading-title">
      <Heading id="loading-title">Preparing the portfolio</Heading>
      <p role="status">Loading portfolio navigation.</p>
    </section>
  )

  if (!shell) {
    return content
  }

  return (
    <SiteLayout>
      {content}
    </SiteLayout>
  )
}
