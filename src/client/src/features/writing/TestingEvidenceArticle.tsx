import { ContentProse } from '../../components'
import { EditorialAside } from '../../components/editorial'

type TestingEvidenceArticleProps = {
  markdown: string
}

const agenticHeading = '## Prose can still be tested'
const closingHeading = '## Green only earns the confidence it earned'
const testingPrecis = 'A skill is prose. I still test what it makes an agent do.'

export const TestingEvidenceArticle = ({ markdown }: TestingEvidenceArticleProps) => {
  const agenticStart = markdown.indexOf(agenticHeading)
  const closingStart = markdown.indexOf(closingHeading, agenticStart + agenticHeading.length)

  if (agenticStart < 0 || closingStart < 0) {
    return <ContentProse register="article-serif" markdown={markdown} />
  }

  const opening = markdown.slice(0, agenticStart).trimEnd()
  const agenticLens = markdown
    .slice(agenticStart + agenticHeading.length, closingStart)
    .trim()
  const closing = markdown.slice(closingStart).trimStart()

  return (
    <div className="testing-evidence-article">
      <ContentProse register="article-serif" markdown={opening} />
      <EditorialAside
        disclosureLabel="Read the applied test lens"
        eyebrow="Applied to agentic systems"
        precis={testingPrecis}
        title="Prose can still be tested"
      >
        <ContentProse register="article-serif" markdown={agenticLens.replace(`${testingPrecis}\n\n`, '')} />
      </EditorialAside>
      <ContentProse register="article-serif" markdown={closing} />
    </div>
  )
}
