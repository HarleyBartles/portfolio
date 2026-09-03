import type { ReactElement } from 'react'
import { MarkdownContent } from '../../components'
import { PatchLockupCameo, SpecialistsWordmarkStudy } from './RianHughesArticleFigures'

type RianHughesArticleProps = {
  markdown: string
}

const specialistsMarker = '<!-- specialists-wordmark-study -->'
const patchMarker = '<!-- patch-lockup-cameo -->'

export function RianHughesArticle({ markdown }: RianHughesArticleProps): ReactElement {
  const specialistsStart = markdown.indexOf(specialistsMarker)
  const patchStart = markdown.indexOf(patchMarker, specialistsStart + specialistsMarker.length)

  if (specialistsStart < 0 || patchStart < 0) {
    return <MarkdownContent markdown={markdown} />
  }

  const opening = markdown.slice(0, specialistsStart).trimEnd()
  const middle = markdown.slice(specialistsStart + specialistsMarker.length, patchStart).trim()
  const closing = markdown.slice(patchStart + patchMarker.length).trimStart()

  return (
    <div className="rian-hughes-article">
      <MarkdownContent markdown={opening} />
      <SpecialistsWordmarkStudy />
      <MarkdownContent markdown={middle} />
      <PatchLockupCameo />
      <MarkdownContent markdown={closing} />
    </div>
  )
}
