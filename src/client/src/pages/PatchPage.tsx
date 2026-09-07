import type { ReactElement } from 'react'
import { PatchStoryBrand } from '../features/patch-brand/PatchBrand'
import { ContentPage } from './ContentPage'

type PatchPageProps = {
  slug: string
}

export function PatchPage({ slug }: PatchPageProps): ReactElement {
  return <ContentPage slug={slug} expectedKind="patch" headerVisual={<PatchStoryBrand storyWordmark={slug === 'the-usual-specialists' ? 'usual-specialists' : undefined} />} />
}
