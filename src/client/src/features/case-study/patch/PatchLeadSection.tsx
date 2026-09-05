import type { ReactNode } from 'react'
import styled from 'styled-components'

type PatchLeadSectionProps = {
  children: ReactNode
  className: string
  title: string
  titleId: string
}

const LeadSection = styled.section`
  min-width: 0;

  && [data-patch-lead-copy] {
    max-width: none;
  }

  [data-patch-lead-composition] {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: clamp(var(--space-8), 5vw, var(--space-16));
    align-items: start;
    max-width: none;
  }

  [data-patch-lead-heading],
  [data-patch-lead-body] {
    min-width: 0;
  }

  [data-patch-lead-heading] > h2 {
    max-width: none;
    margin-top: 0;
    font-size: clamp(2rem, 4vw, 3.5rem);
    line-height: 0.98;
    text-wrap: balance;
  }

  [data-patch-lead-body] > :first-child {
    margin-top: 0;
  }

  [data-patch-lead-body] > :last-child {
    margin-bottom: 0;
  }

  @media (min-width: 44.01rem) {
    [data-patch-lead-body] {
      padding-top: var(--space-8);
    }
  }

  @media (max-width: 44rem) {
    [data-patch-lead-composition] {
      grid-template-columns: 1fr;
      gap: var(--space-5);
    }

    [data-patch-lead-heading] > h2 {
      margin-bottom: 0;
    }
  }
`

export function PatchLeadSection({ children, className, title, titleId }: PatchLeadSectionProps) {
  return (
    <LeadSection className={className} aria-labelledby={titleId}>
      <div data-patch-lead-copy className="patch-movement__copy">
        <div data-patch-lead-composition>
          <div data-patch-lead-heading>
            <h2 id={titleId}>{title}</h2>
          </div>
          <div data-patch-lead-body>{children}</div>
        </div>
      </div>
    </LeadSection>
  )
}
