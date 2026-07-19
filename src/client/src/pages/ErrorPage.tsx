import type { ReactElement } from 'react'
import { AccessibleStatus } from '../components/AccessibleStatus'
import { DocumentMetadata } from '../components/DocumentMetadata'
import { SiteLayout } from '../components/SiteLayout'

type ErrorPageProps = {
  message?: string
  shell?: boolean
}

export function ErrorPage({ message, shell = true }: ErrorPageProps): ReactElement {
  const content = (
    <AccessibleStatus
      id="error-title"
      title="Portfolio content unavailable"
      headingLevel={shell ? 1 : 2}
      tone="alert"
    >
      {message ?? 'Could not load the portfolio content. Please refresh or try again later.'}
    </AccessibleStatus>
  )

  if (!shell) {
    return content
  }

  return (
    <SiteLayout>
      <DocumentMetadata
        title="Portfolio Content Unavailable | Harley Bartles"
        description="Portfolio content could not be loaded."
        canonicalPath="/"
      />
      {content}
      <div className="state-actions" aria-label="Recovery navigation">
        <a href="/">Go to the homepage</a>
        <a href="/projects">Browse project stories</a>
      </div>
    </SiteLayout>
  )
}
