import type { ReactElement } from 'react'
import { DocumentMetadata } from '../components/DocumentMetadata'
import { SiteLayout } from '../components/SiteLayout'

type AreaPlaceholderPageProps = {
  title: string
}

export function AreaPlaceholderPage({ title }: AreaPlaceholderPageProps): ReactElement {
  return (
    <SiteLayout>
      <DocumentMetadata
        title={`${title} | Harley Bartles`}
        description={`${title} portfolio content is being prepared.`}
        canonicalPath="/"
      />
      <section className="state-panel" aria-labelledby="area-placeholder-title">
        <h1 id="area-placeholder-title">{title}</h1>
        <p>This section is being prepared.</p>
        <p>The homepage summary is the current public placeholder until deeper content is published.</p>
        <a href="/">Return to the homepage</a>
      </section>
    </SiteLayout>
  )
}
