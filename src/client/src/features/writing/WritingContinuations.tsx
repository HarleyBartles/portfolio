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

const Continuations = styled.nav`
  margin-top: ${({ theme }) => theme.space.xxxl};

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

  .writing-continuations__eyebrow {
    color: ${({ theme }) => theme.color.accent};
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
              <span className="writing-continuations__eyebrow">{item.eyebrow}</span>
              <strong>{item.title}</strong>
            </Link>
          </li>
        ))}
      </ul>
    </Continuations>
  )
}
