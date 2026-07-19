import type { ReactElement } from 'react'
import { ContentPage } from './ContentPage'

type ProjectPageProps = {
  slug: string
}

export function ProjectPage({ slug }: ProjectPageProps): ReactElement {
  return <ContentPage slug={slug} />
}
