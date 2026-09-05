import { ContentProse } from '../../components'
import { EditorialAside } from '../../components/editorial'

type ContextComplexityArticleProps = {
  markdown: string
}

const workClawHeading = '## I tried the packaged version'
const followingHeading = '## A role is not a sign on the wall'

export const ContextComplexityArticle = ({ markdown }: ContextComplexityArticleProps) => {
  const workClawStart = markdown.indexOf(workClawHeading)
  const followingStart = markdown.indexOf(followingHeading, workClawStart + workClawHeading.length)

  if (workClawStart < 0 || followingStart < 0) {
    return <ContentProse register="article-serif" markdown={markdown} />
  }

  const opening = markdown.slice(0, workClawStart).trimEnd()
  const workClaw = markdown.slice(workClawStart + workClawHeading.length, followingStart).trim()
  const closing = markdown.slice(followingStart).trimStart()

  return (
    <div className="context-complexity-article">
      <ContentProse register="article-serif" markdown={opening} />
      <EditorialAside
        disclosureLabel="Read the WorkClaw experiment"
        eyebrow="Same abstraction, different bill"
        precis="My hand-rolled version charged repository complexity. WorkClaw charged runtime spend. Neither bought enough coordination to justify an organisation around this novel."
        title="The packaged organisation"
      >
        <ContentProse register="article-serif" treatment="editorial-aside" markdown={workClaw} />
      </EditorialAside>
      <ContentProse register="article-serif" markdown={closing} />
    </div>
  )
}
