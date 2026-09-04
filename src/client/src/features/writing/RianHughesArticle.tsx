import { ContentProse } from '../../components'
import { PatchLockupCameo, SpecialistsWordmarkStudy } from './RianHughesArticleFigures'

type RianHughesArticleProps = {
  markdown: string
}

const specialistsMarker = '<!-- specialists-wordmark-study -->'
const patchMarker = '<!-- patch-lockup-cameo -->'

export const RianHughesArticle = ({ markdown }: RianHughesArticleProps) => {
  const specialistsStart = markdown.indexOf(specialistsMarker)
  const patchStart = markdown.indexOf(patchMarker, specialistsStart + specialistsMarker.length)

  if (specialistsStart < 0 || patchStart < 0) {
    return <ContentProse register="article-serif" markdown={markdown} />
  }

  const opening = markdown.slice(0, specialistsStart).trimEnd()
  const middle = markdown.slice(specialistsStart + specialistsMarker.length, patchStart).trim()
  const closing = markdown.slice(patchStart + patchMarker.length).trimStart()

  return (
    <div className="rian-hughes-article">
      <ContentProse register="article-serif" markdown={opening} />
      <SpecialistsWordmarkStudy />
      <ContentProse register="article-serif" markdown={middle} />
      <PatchLockupCameo />
      <ContentProse register="article-serif" markdown={closing} />
    </div>
  )
}
