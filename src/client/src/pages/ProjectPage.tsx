import type { ReactElement } from 'react'
import { ContentPage } from './ContentPage'
import './ContentPage.scss'

type ProjectPageProps = {
  slug: string
}

export function ProjectPage({ slug }: ProjectPageProps): ReactElement {
  return <ContentPage slug={slug} expectedKind="project" />
}
