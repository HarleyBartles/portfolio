import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Eyebrow } from '../../components'

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
  gap: ${({ theme }) => theme.space.sm};
  max-width: ${({ theme }) => theme.layout.readingMeasure};
  margin-top: ${({ theme }) => theme.space.xxxl};
  padding-top: ${({ theme }) => theme.space.xl};
  border-top: 1px solid ${({ theme }) => theme.color.border};
`

export const ContinuationHeading = styled.h2`
  margin: 0 0 ${({ theme }) => theme.space.xs};
  color: ${({ theme }) => theme.color.muted};
  font-family: ${({ theme }) => theme.font.code};
  font-size: 0.72rem;
  font-weight: 400;
  letter-spacing: 0.035em;
  line-height: 1.62;
  text-transform: uppercase;
`

const Continuations = styled(ContinuationFrame).attrs({ as: 'nav' })`
  ul {
    display: grid;
    gap: ${({ theme }) => theme.space.sm};
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li + li {
    border-top: 1px solid ${({ theme }) => theme.color.border};
  }

  a {
    display: grid;
    gap: ${({ theme }) => theme.space.one};
    padding: ${({ theme }) => theme.space.md} 0;
    color: inherit;
    text-decoration: none;
  }

  a:hover strong {
    color: ${({ theme }) => theme.color.accent};
  }

  strong {
    font-family: ${({ theme }) => theme.font.display};
    font-size: clamp(1.25rem, 2.5vw, 1.5rem);
    line-height: 1.1;
  }

`

export const WritingContinuationsUnavailable = styled(ContinuationFrame)`
  p {
    color: ${({ theme }) => theme.color.muted};
  }
`

export const WritingContinuations = ({ items }: WritingContinuationsProps) => {
  if (items.length === 0) return null

  return (
    <Continuations className="writing-continuations" aria-label="Continue reading">
      <ContinuationHeading>Continue reading</ContinuationHeading>
      <ul>
        {items.map((item) => (
          <li key={item.slug}>
            <Link to={item.href}>
              <Eyebrow as="span" variant="utility">{item.eyebrow}</Eyebrow>
              <strong>{item.title}</strong>
            </Link>
          </li>
        ))}
      </ul>
    </Continuations>
  )
}
