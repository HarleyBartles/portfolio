import { DocumentMetadata, SiteLayout, StatePanel } from '../components'

type ErrorPageProps = {
  message?: string
  shell?: boolean
}

export const ErrorPage = ({ message, shell = true }: ErrorPageProps) => {
  const content = (
    <StatePanel
      id="error-title"
      title="Portfolio content unavailable"
      headingLevel={shell ? 1 : 2}
      announcement="alert"
      messages={[message ?? 'Could not load the portfolio content. Please refresh or try again later.']}
      actions={[{ label: 'Go to the homepage', to: '/' }, { label: 'Browse project stories', to: '/projects' }]}
    />
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
        noIndex
      />
      {content}
    </SiteLayout>
  )
}
