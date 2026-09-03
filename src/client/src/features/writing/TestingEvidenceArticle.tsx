import type { ReactElement } from 'react'
import { MarkdownContent } from '../../components'
import './TestingEvidenceArticle.scss'

type TestingEvidenceArticleProps = {
  markdown: string
}

const agenticHeading = '## Prose can still be tested'
const closingHeading = '## Green only earns the confidence it earned'

export function TestingEvidenceArticle({ markdown }: TestingEvidenceArticleProps): ReactElement {
  const agenticStart = markdown.indexOf(agenticHeading)
  const closingStart = markdown.indexOf(closingHeading, agenticStart + agenticHeading.length)

  if (agenticStart < 0 || closingStart < 0) {
    return <MarkdownContent markdown={markdown} />
  }

  const opening = markdown.slice(0, agenticStart).trimEnd()
  const agenticLens = markdown
    .slice(agenticStart + agenticHeading.length, closingStart)
    .trim()
  const closing = markdown.slice(closingStart).trimStart()

  return (
    <div className="testing-evidence-article">
      <MarkdownContent markdown={opening} />
      <aside className="testing-evidence-lens" aria-labelledby="testing-evidence-lens-title">
        <header>
          <p className="testing-evidence-lens__eyebrow">Applied to agentic systems</p>
          <h2 id="testing-evidence-lens-title">Prose can still be tested</h2>
        </header>
        <MarkdownContent markdown={agenticLens} />
      </aside>
      <MarkdownContent markdown={closing} />
    </div>
  )
}
