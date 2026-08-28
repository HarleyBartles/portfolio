import type { ReactElement } from 'react'
import { MarkdownContent } from '../../components/MarkdownContent'
import './ContextComplexityArticle.scss'

type ContextComplexityArticleProps = {
  markdown: string
}

const workClawHeading = '## I tried the packaged version'
const followingHeading = '## A role is not a sign on the wall'

function WorkClawAside({ body }: { body: string }): ReactElement {
  return (
    <aside className="context-workclaw-aside" aria-labelledby="context-workclaw-title">
      <header>
        <p className="context-workclaw-aside__eyebrow">Same abstraction, different bill</p>
        <h2 id="context-workclaw-title">The packaged organisation</h2>
        <p className="context-workclaw-aside__standfirst">
          My hand-rolled version charged repository complexity. WorkClaw charged runtime spend. Neither bought enough coordination to justify an organisation around this novel.
        </p>
      </header>
      <details className="context-workclaw-aside__details">
        <summary>
          <span>Read the WorkClaw experiment</span>
          <span className="context-workclaw-aside__marker" aria-hidden="true" />
        </summary>
        <div className="context-workclaw-aside__body">
          <MarkdownContent markdown={body} />
        </div>
      </details>
    </aside>
  )
}

export function ContextComplexityArticle({ markdown }: ContextComplexityArticleProps): ReactElement {
  const workClawStart = markdown.indexOf(workClawHeading)
  const followingStart = markdown.indexOf(followingHeading, workClawStart + workClawHeading.length)

  if (workClawStart < 0 || followingStart < 0) {
    return <MarkdownContent markdown={markdown} />
  }

  const opening = markdown.slice(0, workClawStart).trimEnd()
  const workClaw = markdown.slice(workClawStart + workClawHeading.length, followingStart).trim()
  const closing = markdown.slice(followingStart).trimStart()

  return (
    <div className="context-complexity-article">
      <MarkdownContent markdown={opening} />
      <WorkClawAside body={workClaw} />
      <MarkdownContent markdown={closing} />
    </div>
  )
}
