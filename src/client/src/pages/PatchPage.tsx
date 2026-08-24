import type { ReactElement } from 'react'
import { ContentPage } from './ContentPage'

type PatchPageProps = {
  slug: string
}

export function PatchPage({ slug }: PatchPageProps): ReactElement {
  return <ContentPage slug={slug} expectedKind="patch" />
}
