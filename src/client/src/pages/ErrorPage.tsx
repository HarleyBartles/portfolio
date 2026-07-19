import type { ReactElement } from 'react'
import { SiteLayout } from '../components/SiteLayout'

type ErrorPageProps = {
  message?: string
  shell?: boolean
}

export function ErrorPage({ message, shell = true }: ErrorPageProps): ReactElement {
  const Heading = shell ? 'h1' : 'h2'
  const content = (
    <section className="state-panel" aria-labelledby="error-title">
      <Heading id="error-title">Portfolio content unavailable</Heading>
      <p role="alert">
        {message ?? 'Could not load the portfolio content. Please refresh or try again later.'}
      </p>
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
