import { ContentProse } from '../../components'
import { EditorialAside } from '../../components/editorial'

type UseSuperpowersArticleProps = {
  markdown: string
}

const disclosureMarker = '> **When “most capable” changes overnight**'
const disclosureEndMarker = '\n\nThe Astra question is only one part of a wider audit'
const disclosureTitle = 'When “most capable” changes overnight'
const disclosurePrecis = 'A model release can change what a relative instruction means without anyone editing the instruction. My model-selection rule made that visible to me this morning.'

function removeBlockquotePrefix(line: string): string {
  return line.replace(/^> ?/, '')
}

export const UseSuperpowersArticle = ({ markdown }: UseSuperpowersArticleProps) => {
  const disclosureStart = markdown.indexOf(disclosureMarker)
  const disclosureEnd = markdown.indexOf(disclosureEndMarker, disclosureStart + disclosureMarker.length)

  if (disclosureStart < 0 || disclosureEnd < 0) {
    return <ContentProse register="article-serif" markdown={markdown} />
  }

  const opening = markdown.slice(0, disclosureStart).trimEnd()
  const disclosure = markdown.slice(disclosureStart, disclosureEnd).trim()
  const closing = markdown.slice(disclosureEnd).trimStart()
  const disclosureLines = disclosure.split('\n')
  const optionalBody = disclosureLines
    .slice(4)
    .map(removeBlockquotePrefix)
    .join('\n')
    .trim()

  return (
    <div className="use-superpowers-article">
      <ContentProse register="article-serif" markdown={opening} />
      <EditorialAside
        disclosureLabel="Read the Astra audit"
        precis={disclosurePrecis}
        title={disclosureTitle}
      >
        <ContentProse register="article-serif" markdown={optionalBody} />
      </EditorialAside>
      <ContentProse register="article-serif" markdown={closing} />
    </div>
  )
}
