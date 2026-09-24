import { Suspense, lazy } from 'react'
import styled from 'styled-components'
import { ContentProse } from '../../components'
import { EditorialAside, EditorialPullQuote } from '../../components/editorial'
import { parseArticleBlocks, type FigureBlock } from './articleBlocks'

const OrganisationFigure = lazy(async () => ({ default: (await import('./ContextComplexityFigure')).ContextComplexityFigure }))

const FigureSlot = styled.div<{ $wide: boolean }>`
  width: 100%;
  margin-block: var(--space-12);

  @media (min-width: 60rem) {
    width: ${({ $wide }) => $wide ? 'min(64rem, calc(100vw - var(--space-12)))' : '100%'};
  }

  figure { margin: 0; }
`

const FileFigure = styled.figure`
  img { display: block; width: 100%; height: auto; }
  figcaption {
    margin-top: var(--space-4);
    color: var(--color-muted);
    font-family: var(--font-code);
    font-size: 0.68rem;
    line-height: 1.5;
  }
`

function ArticleFigure({ figure }: { figure: FigureBlock }) {
  if (figure.visual === 'agent-organisation-overhead') {
    return (
      <FigureSlot $wide={figure.layout === 'wide'}>
        <Suspense fallback={<div aria-hidden="true" data-loading="article-figure" />}>
          <OrganisationFigure caption={figure.caption} description={figure.description} />
        </Suspense>
      </FigureSlot>
    )
  }
  if (figure.visual !== undefined) throw new Error(`Unknown article figure: ${figure.visual}`)
  const path = figure.src ?? ''
  const base = import.meta.env.BASE_URL
  const src = path.startsWith('/') && !path.startsWith(base) ? `${base}${path.slice(1)}` : path
  return (
    <FigureSlot $wide={figure.layout === 'wide'}>
      <FileFigure>
        <img src={src} alt={figure.description} loading="lazy" decoding="async" />
        <figcaption>{figure.caption}</figcaption>
      </FileFigure>
    </FigureSlot>
  )
}

export function ArticleMarkdown({ markdown }: { markdown: string }) {
  const blocks = parseArticleBlocks(markdown)
  return <>{blocks.map((block, index) => {
    if (block.kind === 'prose') return <ContentProse key={index} register="article-serif" markdown={block.markdown} />
    if (block.kind === 'aside') return (
      <EditorialAside
        key={block.id}
        title={block.title}
        eyebrow={block.eyebrow}
        precis={block.standfirst}
        disclosureLabel={block.disclosure}
      >
        <ContentProse register="article-serif" treatment="editorial-aside" markdown={block.markdown} />
      </EditorialAside>
    )
    if (block.kind === 'figure') return <ArticleFigure key={block.id} figure={block} />
    return <EditorialPullQuote key={index}>{block.text}</EditorialPullQuote>
  })}</>
}
