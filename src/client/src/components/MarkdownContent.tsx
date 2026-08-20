import type { ComponentPropsWithoutRef, ReactElement } from 'react'
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

type MarkdownContentProps = {
  markdown: string
}

function isExternalHttpLink(href: string | undefined): boolean {
  return href !== undefined && /^https?:\/\//i.test(href)
}

function MarkdownLink(props: ComponentPropsWithoutRef<'a'>): ReactElement {
  const href = props.href ?? ''

  if (href.startsWith('/')) {
    return <Link to={href}>{props.children}</Link>
  }

  if (isExternalHttpLink(href)) {
    return (
      <a href={href} rel="noreferrer noopener" target="_blank">
        {props.children}
      </a>
    )
  }

  return <a href={href}>{props.children}</a>
}

function MarkdownImage(props: ComponentPropsWithoutRef<'img'>): ReactElement {
  const base = import.meta.env.BASE_URL
  const src =
    props.src !== undefined && props.src.startsWith('/') && !props.src.startsWith(base)
      ? `${base}${props.src.slice(1)}`
      : props.src

  return <img {...props} src={src} />
}

export function MarkdownContent({ markdown }: MarkdownContentProps): ReactElement {
  return (
    <div className="markdown-content">
      <ReactMarkdown
        components={{
          a: MarkdownLink,
          img: MarkdownImage,
        }}
        skipHtml
      >
        {markdown}
      </ReactMarkdown>
    </div>
  )
}
