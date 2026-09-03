import type { ComponentPropsWithoutRef } from 'react'
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { ExternalLink } from './ExternalLink'
import styled from 'styled-components'

type MarkdownContentProps = {
  markdown: string
}

const MarkdownRoot = styled.div`
  font-family: ${({ theme }) => theme.font.articleSerif};
  font-size: ${({ theme }) => theme.type.articleBodySize};
  line-height: ${({ theme }) => theme.type.articleBodyLeading};

  h2 {
    margin: ${({ theme }) => theme.space.xxl} 0 ${({ theme }) => theme.space.md};
    font-family: ${({ theme }) => theme.font.display};
    font-size: clamp(1.9rem, 4vw, 2.8rem);
    line-height: 1.03;
    letter-spacing: -0.035em;
  }

  h3 {
    margin: ${({ theme }) => theme.space.xl} 0 ${({ theme }) => theme.space.sm};
    font-family: ${({ theme }) => theme.font.display};
    font-size: clamp(1.35rem, 3vw, 1.8rem);
    line-height: 1.15;
  }

  p,
  li {
    color: ${({ theme }) => theme.color.ink};
  }

  p {
    margin: ${({ theme }) => theme.space.m} 0 0;
  }

  img {
    width: 100%;
    height: auto;
    margin-block: var(--space-10);
    background: ${({ theme }) => theme.color.surface};
  }

  .fairytale-page {
    display: block;
    margin-block: clamp(var(--space-10), 7vw, ${({ theme }) => theme.space.xxxl});
    border: 1px solid ${({ theme }) => theme.color.border};
    background: ${({ theme }) => theme.color.surface};
    box-shadow: 1.25rem 1.25rem 0 rgb(23 60 63 / 8%);
  }

  .fairytale-page img {
    display: block;
    margin: 0;
  }
`

function isExternalHttpLink(href: string | undefined): boolean {
  return href !== undefined && /^https?:\/\//i.test(href)
}

const MarkdownLink = (props: ComponentPropsWithoutRef<'a'>) => {
  const href = props.href ?? ''

  if (href.startsWith('/')) {
    return <Link to={href}>{props.children}</Link>
  }

  if (isExternalHttpLink(href)) {
    return <ExternalLink href={href}>{props.children}</ExternalLink>
  }

  return <a href={href}>{props.children}</a>
}

const MarkdownImage = (props: ComponentPropsWithoutRef<'img'>) => {
  const base = import.meta.env.BASE_URL
  const src =
    props.src !== undefined && props.src.startsWith('/') && !props.src.startsWith(base)
      ? `${base}${props.src.slice(1)}`
      : props.src

  const fairytaleMatch = src?.match(/\/fairytales\/(goldilocks|sorcerers-apprentice)\/page-1200\.webp$/)

  if (fairytaleMatch !== null && fairytaleMatch !== undefined) {
    const source640 = src?.replace('page-1200.webp', 'page-640.webp')
    return (
      <picture className="fairytale-page">
        <source media="(max-width: 44rem)" srcSet={source640} />
        <img {...props} src={src} width="1200" height="675" decoding="async" />
      </picture>
    )
  }

  return <img {...props} src={src} loading="lazy" decoding="async" />
}

export const MarkdownContent = ({ markdown }: MarkdownContentProps) => {
  return (
    <MarkdownRoot className="markdown-content" data-type-register="article-serif">
      <ReactMarkdown
        components={{
          a: MarkdownLink,
          img: MarkdownImage,
        }}
        skipHtml
      >
        {markdown}
      </ReactMarkdown>
    </MarkdownRoot>
  )
}
