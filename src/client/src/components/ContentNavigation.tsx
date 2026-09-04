import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { getContentPath, type ContentSummary } from '../types'

type ContentNavigationProps = {
  items: readonly ContentSummary[]
  currentSlug: string
}

const Navigation = styled.nav`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-top: ${({ theme }) => theme.space.xxxl};
  border-top: 1px solid ${({ theme }) => theme.color.ink};
  border-bottom: 1px solid ${({ theme }) => theme.color.ink};

  a {
    display: flex;
    min-height: 9rem;
    flex-direction: column;
    justify-content: space-between;
    padding: ${({ theme }) => theme.space.lg};
    color: ${({ theme }) => theme.color.ink};
    text-decoration: none;
  }

  a + a,
  > span + a {
    border-left: 1px solid ${({ theme }) => theme.color.ink};
  }

  a:hover {
    background: ${({ theme }) => theme.color.accentSoft};
  }

  a:last-child {
    text-align: right;
  }

  a span {
    color: ${({ theme }) => theme.color.muted};
    font-family: ${({ theme }) => theme.font.code};
    font-size: 0.74rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  a strong {
    font-family: ${({ theme }) => theme.font.display};
    font-size: clamp(1.25rem, 2.5vw, 2rem);
    line-height: 1.05;
  }

  @media (max-width: 30rem) {
    grid-template-columns: 1fr;

    a,
    a:last-child {
      min-height: 7rem;
      text-align: left;
    }

    a + a,
    > span + a {
      border-top: 1px solid ${({ theme }) => theme.color.ink};
      border-left: 0;
    }

    > span:empty {
      display: none;
    }
  }
`

export const ContentNavigation = ({ items, currentSlug }: ContentNavigationProps) => {
  const currentIndex = items.findIndex((item) => item.slug === currentSlug)

  if (currentIndex < 0) return null

  const previous = items[currentIndex - 1]
  const next = items[currentIndex + 1]

  if (previous === undefined && next === undefined) return null

  const kindLabel = items[currentIndex].kind === 'patch' ? 'Patch stories' : items[currentIndex].kind

  return (
    <Navigation className="content-navigation" aria-label={`More ${kindLabel}`}>
      {previous === undefined ? <span /> : (
        <Link to={getContentPath(previous)} aria-label={`Previous: ${previous.title}`}>
          <span>Previous</span>
          <strong>{previous.title}</strong>
        </Link>
      )}
      {next === undefined ? <span /> : (
        <Link to={getContentPath(next)} aria-label={`Next: ${next.title}`}>
          <span>Next</span>
          <strong>{next.title}</strong>
        </Link>
      )}
    </Navigation>
  )
}
