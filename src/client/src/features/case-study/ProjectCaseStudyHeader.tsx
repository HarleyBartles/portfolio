import type { ReactNode } from 'react'
import { Suspense } from 'react'
import styled, { css } from 'styled-components'
import { Eyebrow, PageLead, PageTitle, ProjectStatus } from '../../components'

export type ProjectCaseStudyHeaderLayout = 'standard' | 'learning-lab' | 'wild-bunch' | 'patch'

export type ProjectCaseStudyHeaderProps = {
  eyebrow: string
  title: string
  summary: string
  status: string
  layout: ProjectCaseStudyHeaderLayout
  visualContract: string
  visual?: ReactNode
  visualFallback?: ReactNode
}

const Header = styled.header<{ $layout: ProjectCaseStudyHeaderLayout; $hasVisual: boolean }>`
  position: relative;
  margin-bottom: ${({ theme }) => theme.space.xxl};

  ${({ $hasVisual, theme }) => $hasVisual ? css`
    display: grid;
    grid-template-columns: minmax(0, 5fr) minmax(20rem, 7fr);
    gap: clamp(${theme.space.xl}, 6vw, ${theme.space.xxxl});
    align-items: center;
    border-bottom: 1px solid ${theme.color.border};
    padding-bottom: clamp(var(--space-10), 7vw, ${theme.space.xxxl});
  ` : css`
    max-width: ${theme.layout.readingMeasure};
  `}

  ${({ $layout, theme }) => $layout === 'learning-lab' ? css`
    grid-template-columns: minmax(18rem, 0.8fr) minmax(0, 1.2fr);
    gap: clamp(var(--space-8), 5vw, var(--space-16));
    align-items: stretch;
    padding: clamp(var(--space-8), 6vw, var(--space-16));
    background: ${theme.color.interiorCanvas};
    border: 1px solid ${theme.color.border};

    [data-project-case-study-intro] {
      align-self: center;
    }

    [data-project-case-study-visual] {
      min-width: 0;
    }

    [data-project-case-study-intro] h1 {
      max-width: 8ch;
    }
  ` : ''}

  ${({ $layout }) => $layout === 'wild-bunch' ? css`
    --wild-bunch-field-color: #d4cbc0;
    --wild-bunch-field-width: 55%;
    --wild-bunch-intro-width: 43%;
    --wild-bunch-image-width: 64%;

    isolation: isolate;
    display: block;
    margin-bottom: clamp(var(--space-20), 10vw, 7rem);
    padding-bottom: 0;
    border-bottom: 0;
    background: transparent;

    &::before {
      position: absolute;
      z-index: -1;
      inset: 0 auto 0 0;
      width: var(--wild-bunch-field-width);
      background: var(--wild-bunch-field-color);
      content: '';
    }

    [data-project-case-study-intro] {
      position: absolute;
      z-index: 2;
      top: var(--space-10);
      left: var(--space-5);
      display: flex;
      flex-direction: column;
      justify-content: center;
      box-sizing: border-box;
      width: calc(var(--wild-bunch-intro-width) + var(--space-8));
      min-width: 20rem;
      background: transparent;
      padding: var(--space-6);
    }

    [data-project-case-study-status] {
      position: absolute;
      z-index: 3;
      bottom: var(--space-4);
      left: calc(100% - var(--wild-bunch-image-width));
    }

    [data-project-case-study-status] .content-status {
      width: max-content;
      max-width: 100%;
      margin: 0;
      background: var(--color-surface);
    }

    [data-project-case-study-visual] {
      width: var(--wild-bunch-image-width);
      margin-left: auto;
    }

    [data-project-case-study-intro] h1 {
      max-width: 8ch;
    }
  ` : ''}

  ${({ $layout }) => $layout === 'patch' ? css`
    isolation: isolate;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 0;
    align-items: stretch;
    min-height: clamp(32rem, 52vw, 43rem);
    padding: 0;
    overflow: hidden;
    background: var(--color-interior-canvas);
    border: 1px solid var(--color-border);

    [data-project-case-study-visual],
    [data-project-case-study-intro] {
      grid-area: 1 / 1;
    }

    [data-project-case-study-visual] {
      min-width: 0;
    }

    [data-project-case-study-intro] {
      z-index: 1;
      align-self: center;
      justify-self: end;
      width: min(46%, 35rem);
      margin-right: clamp(var(--space-6), 6vw, var(--space-20));
      padding: var(--space-8) 0;
    }

    [data-project-case-study-intro] h1 {
      max-width: 10ch;
      color: #18252a;
    }

    [data-project-case-study-intro] [data-type-register] + p {
      max-width: 32rem;
      color: #344247;
      font-size: clamp(1.05rem, 1.6vw, 1.28rem);
    }
  ` : ''}

  @media (max-width: 64rem) {
    ${({ $hasVisual }) => $hasVisual ? 'grid-template-columns: minmax(0, 1fr) minmax(18rem, 1fr);' : ''}

    ${({ $layout }) => $layout === 'learning-lab' ? css`
      grid-template-columns: 1fr;
      padding: var(--space-7);
    ` : ''}

    ${({ $layout }) => $layout === 'wild-bunch' ? css`
      --wild-bunch-field-width: 100%;
      --wild-bunch-intro-width: 100%;
      --wild-bunch-image-width: 100%;

      display: grid;
      grid-template-columns: 1fr;
      gap: 0;
      margin-bottom: var(--space-12);
      padding: var(--space-7);
      background: #ded7cc;

      &::before {
        display: none;
      }

      [data-project-case-study-intro] {
        position: static;
        min-width: 0;
        width: auto;
        background: transparent;
        padding: var(--space-6);
      }

      [data-project-case-study-status] {
        position: static;
        order: 2;
        margin: 0;
      }

      [data-project-case-study-status] .content-status {
        margin-top: 0;
      }

      [data-project-case-study-visual] {
        order: 3;
        width: calc(100% + (2 * var(--space-7)));
        margin-inline: calc(var(--space-7) * -1);
        margin-bottom: calc(var(--space-7) * -1);
      }

      [data-project-case-study-intro] h1 {
        max-width: none;
      }
    ` : ''}
  }

  @media (max-width: 56rem) {
    ${({ $layout }) => $layout === 'learning-lab' ? css`
      [data-project-case-study-intro] h1 {
        max-width: none;
      }
    ` : ''}
  }

  @media (max-width: 44rem) {
    ${({ $hasVisual, $layout, theme }) => $hasVisual && $layout !== 'patch' ? css`
      grid-template-columns: 1fr;
      gap: ${theme.space.xl};
    ` : ''}

    ${({ $layout }) => $layout === 'patch' ? css`
      display: flex;
      flex-direction: column;
      min-height: 0;
      padding: var(--space-8) var(--space-6) 0;

      [data-project-case-study-intro] {
        min-width: 0;
        width: auto;
        margin: 0 0 var(--space-6);
        padding: 0;
      }

      [data-project-case-study-intro] h1 {
        max-width: none;
      }

      [data-project-case-study-visual] {
        width: calc(100% + (2 * var(--space-6)));
        margin-inline: calc(var(--space-6) * -1);
      }

      [data-project-case-study-visual-fallback] {
        min-height: 0;
        aspect-ratio: 16 / 9;
      }
    ` : ''}
  }
`

const Intro = styled.div`
  min-width: 0;
`

const HeaderEyebrow = styled(Eyebrow)`
  margin-bottom: ${({ theme }) => theme.space.sm};
`

const Summary = styled(PageLead)`
  margin: ${({ theme }) => theme.space.lg} 0 0;
`

const Visual = styled.div`
  min-width: 0;
`

const StatusAnchor = styled.div`
  min-width: 0;
`

const VisualFallback = styled.div<{ $layout: ProjectCaseStudyHeaderLayout }>`
  width: 100%;
  height: auto;
  aspect-ratio: 5 / 3;
  background: ${({ $layout }) => $layout === 'wild-bunch' ? 'var(--wild-bunch-field-color, #d4cbc0)' : $layout === 'learning-lab' ? '#163f42' : 'var(--color-interior-canvas)'};

  ${({ $layout }) => $layout === 'learning-lab' ? 'min-height: clamp(20rem, 32vw, 30rem);' : ''}
  ${({ $layout }) => $layout === 'patch' ? 'min-height: clamp(18rem, 32vw, 28rem);' : ''}
`

export function ProjectCaseStudyHeader({
  eyebrow,
  title,
  summary,
  status,
  layout,
  visualContract,
  visual,
  visualFallback,
}: ProjectCaseStudyHeaderProps) {
  const hasVisual = visual !== undefined || visualFallback !== undefined
  const renderedVisual = visual === undefined
    ? visualFallback === undefined ? <VisualFallback $layout={layout} data-project-case-study-visual-fallback data-loading="project-visual" /> : visualFallback
    : <Suspense fallback={visualFallback ?? <VisualFallback $layout={layout} data-project-case-study-visual-fallback data-loading="project-visual" />}>
      {visual}
    </Suspense>

  return (
    <Header
      data-project-case-study-layout={layout}
      data-visual-contract={visualContract}
      $layout={layout}
      $hasVisual={hasVisual}
    >
      <Intro data-project-case-study-intro>
        <HeaderEyebrow>{eyebrow}</HeaderEyebrow>
        <PageTitle id="content-page-title" register="site-sans">{title}</PageTitle>
        <Summary>{summary}</Summary>
        {layout === 'wild-bunch' ? null : <ProjectStatus status={status} />}
      </Intro>
      {layout === 'wild-bunch' ? <StatusAnchor data-project-case-study-status><ProjectStatus status={status} /></StatusAnchor> : null}
      {hasVisual ? <Visual data-project-case-study-visual>{renderedVisual}</Visual> : null}
    </Header>
  )
}
