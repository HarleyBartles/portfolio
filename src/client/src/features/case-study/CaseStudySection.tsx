import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import styled from 'styled-components'

export type CaseStudySectionLayout = 'flow' | 'lead' | 'lead-prose'

type CaseStudySectionProps = Omit<ComponentPropsWithoutRef<'section'>, 'title'> & {
  title: string
  headingId?: string
  layout?: CaseStudySectionLayout
  children: ReactNode
}

const Section = styled.section<{ $layout: CaseStudySectionLayout }>`
  ${({ $layout }) => $layout === 'lead' || $layout === 'lead-prose' ? `
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: clamp(var(--space-6), 5vw, var(--space-16));
    align-items: start;
    max-width: none;
  ` : ''}

  ${({ $layout }) => $layout === 'lead-prose' ? `
    grid-template-columns: minmax(0, 0.6fr) minmax(0, 1.4fr);
  ` : ''}

  > [data-case-study-section-heading],
  > [data-case-study-section-body] {
    min-width: 0;
  }

  > [data-case-study-section-heading] > h2 {
    max-width: none;
    margin-top: 0;
    font-family: var(--font-display);
    font-size: clamp(2rem, 4vw, 3.5rem);
    line-height: 0.98;
    text-wrap: balance;
  }

  > [data-case-study-section-body] > :first-child {
    margin-top: 0;
  }

  > [data-case-study-section-body] > :last-child {
    margin-bottom: 0;
  }

  > [data-case-study-section-body] p {
    max-width: none;
  }

  @media (max-width: 44rem) {
    ${({ $layout }) => $layout === 'lead' || $layout === 'lead-prose' ? `
      grid-template-columns: 1fr;
      gap: var(--space-5);
    ` : ''}

    > [data-case-study-section-heading] > h2 {
      margin-bottom: 0;
    }
  }
`

export function CaseStudySection({ title, headingId, children, layout = 'flow', ...props }: CaseStudySectionProps) {
  const id = headingId ?? `case-study-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

  if (layout === 'lead' || layout === 'lead-prose') {
    return <Section {...props} $layout={layout} aria-labelledby={id} data-case-study-section-layout={layout}>
      <div data-case-study-section-heading><h2 id={id}>{title}</h2></div>
      <div data-case-study-section-body>{children}</div>
    </Section>
  }

  return <Section {...props} $layout={layout} aria-labelledby={id} data-case-study-section-layout={layout}><h2 id={id}>{title}</h2>{children}</Section>
}
