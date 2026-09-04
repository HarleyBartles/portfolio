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

const Continuations = styled(ContinuationFrame).attrs({ as: 'nav' })`

  h2 {
    margin: 0 0 ${({ theme }) => theme.space.xs};
    font-family: ${({ theme }) => theme.font.display};
  }

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
    padding: ${({ theme }) => theme.space.sm} 0;
    color: inherit;
    text-decoration: none;
  }

  a:hover strong {
    color: ${({ theme }) => theme.color.accent};
  }

  strong {
    font-family: ${({ theme }) => theme.font.display};
    font-size: 1.2rem;
  }

`

export const WritingContinuationsUnavailable = styled(ContinuationFrame)`
  h2 {
    margin: 0 0 ${({ theme }) => theme.space.sm};
    font-family: ${({ theme }) => theme.font.display};
  }

  p {
    color: ${({ theme }) => theme.color.muted};
  }
`

export const WritingContinuations = ({ items }: WritingContinuationsProps) => {
  if (items.length === 0) return null

  return (
    <Continuations className="writing-continuations" aria-label="Continue reading">
      <h2>Continue reading</h2>
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
