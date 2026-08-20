import type { ReactElement } from 'react'
import { ContentPage } from './ContentPage'

type FairytalesPageProps = {
  slug: string
}

export function FairytalesPage({ slug }: FairytalesPageProps): ReactElement {
  return <ContentPage slug={slug} expectedKind="fairytales" />
}
