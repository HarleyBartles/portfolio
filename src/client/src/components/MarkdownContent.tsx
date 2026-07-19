import type { ComponentPropsWithoutRef, ReactElement } from 'react'
import ReactMarkdown from 'react-markdown'

type MarkdownContentProps = {
  markdown: string
}

function isExternalHttpLink(href: string | undefined): boolean {
  return href !== undefined && /^https?:\/\//i.test(href)
}

function MarkdownLink(props: ComponentPropsWithoutRef<'a'>): ReactElement {
  const external = isExternalHttpLink(props.href)

  return (
    <a
      href={props.href}
      rel={external ? 'noreferrer noopener' : undefined}
      target={external ? '_blank' : undefined}
    >
      {props.children}
    </a>
  )
}

export function MarkdownContent({ markdown }: MarkdownContentProps): ReactElement {
  return (
    <div className="markdown-content">
      <ReactMarkdown
        components={{
          a: MarkdownLink,
        }}
        skipHtml
      >
        {markdown}
      </ReactMarkdown>
    </div>
  )
}
