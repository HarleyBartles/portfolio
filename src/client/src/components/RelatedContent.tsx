import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { getContentPath, type ContentSummary } from '../types'
import { SectionTitle } from './content'

type RelatedContentProps = {
  slugs: string[]
  summaries: ContentSummary[]
  unavailable?: boolean
}

const RelatedSection = styled.section`
  margin-top: ${({ theme }) => theme.space.xxxl};
  border-top: 1px solid rgb(31 36 31 / 22%);
  padding-top: ${({ theme }) => theme.space.xl};

  ul {
    display: grid;
    gap: 1px;
    margin-top: ${({ theme }) => theme.space.xl};
    padding: 0;
    list-style: none;
    background: ${({ theme }) => theme.color.border};
  }

  li {
    background: rgb(255 250 240 / 72%);
    padding: ${({ theme }) => theme.space.lg};
  }

  li p {
    margin: ${({ theme }) => theme.space.md} 0 0;
    color: ${({ theme }) => theme.color.muted};
  }
`

const RelatedTitle = styled(SectionTitle)`
  margin-top: 0;
`

export const RelatedContent = ({
  slugs,
  summaries,
  unavailable = false,
}: RelatedContentProps) => {
  if (slugs.length === 0) {
    return null
  }

  if (unavailable) {
    return (
      <RelatedSection className="related-content" aria-labelledby="related-content-title">
        <RelatedTitle id="related-content-title">Related content</RelatedTitle>
        <p role="status">Related links are temporarily unavailable while supporting navigation reloads.</p>
      </RelatedSection>
    )
  }

  const relatedItems = slugs
    .map((slug) => summaries.find((summary) => summary.slug === slug))
    .filter((summary): summary is ContentSummary => summary !== undefined)

  if (relatedItems.length === 0) {
    return null
  }

  return (
    <RelatedSection as="nav" className="related-content" aria-label="Related content">
      <RelatedTitle>Related content</RelatedTitle>
      <ul>
        {relatedItems.map((item) => (
          <li key={item.slug}>
            <Link to={getContentPath(item)}>{item.title}</Link>
            <p>{item.summary}</p>
          </li>
        ))}
      </ul>
    </RelatedSection>
  )
}
