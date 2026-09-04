import type { ReactNode } from 'react'
import styled, { css } from 'styled-components'

const Quote = styled.blockquote<{ $typeRegister: 'article-serif' | 'site-sans' }>`
  /* Keep the portfolio's established writing pull-quote grammar intact. */
  margin: ${({ theme }) => theme.space.xl} 0 var(--space-7);
  border-inline-start: 0.3rem solid ${({ theme }) => theme.color.accent};
  background: color-mix(in srgb, ${({ theme }) => theme.color.accentSoft} 36%, transparent);
  padding: var(--space-5) ${({ theme }) => theme.space.lg};

  p {
    margin: 0;
    color: ${({ theme }) => theme.color.ink};
    font-family: ${({ $typeRegister, theme }) => $typeRegister === 'article-serif' ? theme.font.display : theme.font.siteSans};
    font-size: clamp(1.65rem, 3.2vw, 2.7rem);
    font-style: italic;
    font-weight: 600;
    letter-spacing: -0.025em;
    line-height: 1.06;
  }

  cite {
    display: block;
    margin-top: ${({ theme }) => theme.space.md};
    font-family: ${({ theme }) => theme.font.code};
    font-size: 0.72rem;
    font-style: normal;
    font-weight: 500;
    letter-spacing: 0.035em;
    line-height: 1.45;
    text-transform: uppercase;
  }

  ${({ $typeRegister, theme }) => $typeRegister === 'site-sans' ? css`
    margin-block: var(--space-8);
    border: 0;
    background: transparent;
    padding: 0;

    p {
      font-family: ${theme.font.siteSans};
      font-size: clamp(1.35rem, 2.4vw, 1.8rem);
      font-style: normal;
      font-weight: 650;
      letter-spacing: -.015em;
      line-height: 1.18;
    }

    cite {
      font-family: ${theme.font.siteSans};
      font-size: ${theme.type.metadataSize};
      letter-spacing: 0;
      text-transform: none;
    }
  ` : ''}
`

type EditorialPullQuoteProps = {
  children: ReactNode
  attribution?: string
  typeRegister?: 'article-serif' | 'site-sans'
}

export const EditorialPullQuote = ({ children, attribution, typeRegister = 'article-serif' }: EditorialPullQuoteProps) => {
  return (
    <Quote data-type-register={typeRegister} $typeRegister={typeRegister}>
      <p>{children}</p>
      {attribution === undefined ? null : <cite>{attribution}</cite>}
    </Quote>
  )
}
