import type { ReactElement } from 'react'
import { ContentPage } from './ContentPage'

type WritingPageProps = {
  slug: string
}

export function WritingPage({ slug }: WritingPageProps): ReactElement {
  return <ContentPage slug={slug} />
}
