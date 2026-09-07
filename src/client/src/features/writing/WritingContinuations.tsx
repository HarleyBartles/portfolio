import { Link } from 'react-router-dom'
import styled from 'styled-components'

export type WritingContinuation = {
  slug: string
  eyebrow: string
  title: string
  href: string
}

type WritingContinuationsProps = {
  items: readonly WritingContinuation[]
}

const ContinuationFrame = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.space.lg};
  max-width: ${({ theme }) => theme.layout.readingMeasure};
  margin-top: ${({ theme }) => theme.space.xxxl};
`

export const ContinuationHeading = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.color.ink};
  font-family: ${({ theme }) => theme.font.siteSans};
  font-size: ${({ theme }) => theme.type.sectionSize};
  font-weight: 600;
  letter-spacing: -0.022em;
  line-height: 1.08;
  text-transform: none;
`

const ContinuationTaxonomy = styled.span`
  color: ${({ theme }) => theme.color.muted};
  font-family: ${({ theme }) => theme.font.siteSans};
  font-size: ${({ theme }) => theme.type.metadataSize};
  font-weight: 600;
  letter-spacing: 0.035em;
  line-height: 1.4;
  text-transform: uppercase;
`

const Continuations = styled(ContinuationFrame).attrs({ as: 'nav' })``

const ContinuationList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 17rem), 1fr));
  gap: ${({ theme }) => theme.space.md};
  margin: 0;
  padding: 0;
  list-style: none;
`

const ContinuationItem = styled.li`
  display: flex;
  min-width: 0;
`

const ContinuationLink = styled(Link)`
  display: grid;
  width: 100%;
  min-height: 9rem;
  align-content: start;
  gap: ${({ theme }) => theme.space.sm};
  border: 1px solid ${({ theme }) => theme.color.border};
  background: color-mix(in srgb, ${({ theme }) => theme.color.surface} 48%, transparent);
  padding: ${({ theme }) => theme.space.lg};
  color: ${({ theme }) => theme.color.ink};
  text-decoration: none;
  transition:
    background-color ${({ theme }) => theme.motion.fast} ${({ theme }) => theme.motion.easeOut},
    border-color ${({ theme }) => theme.motion.fast} ${({ theme }) => theme.motion.easeOut};

  &:hover {
    border-color: ${({ theme }) => theme.color.ink};
    background: ${({ theme }) => theme.color.surface};
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.color.focus};
    outline-offset: 3px;
  }

  &:active {
    background: ${({ theme }) => theme.color.accentSoft};
  }
`

const ContinuationTitle = styled.strong`
  font-family: ${({ theme }) => theme.font.siteSans};
  font-size: clamp(1.25rem, 2.5vw, 1.5rem);
  font-weight: 650;
  letter-spacing: -0.022em;
  line-height: 1.12;
  text-wrap: balance;
`

export const WritingContinuationsUnavailable = styled(ContinuationFrame)`
  p {
    color: ${({ theme }) => theme.color.muted};
  }
`

export const WritingContinuations = ({ items }: WritingContinuationsProps) => {
  if (items.length === 0) return null

  return (
    <Continuations className="writing-continuations" aria-labelledby="writing-continuations-title">
      <ContinuationHeading id="writing-continuations-title">Continue reading</ContinuationHeading>
      <ContinuationList>
        {items.map((item) => (
          <ContinuationItem key={item.slug}>
            <ContinuationLink to={item.href}>
              <ContinuationTaxonomy data-eyebrow>{item.eyebrow}</ContinuationTaxonomy>
              <ContinuationTitle>{item.title}</ContinuationTitle>
            </ContinuationLink>
          </ContinuationItem>
        ))}
      </ContinuationList>
    </Continuations>
  )
}
