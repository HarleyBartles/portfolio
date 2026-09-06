import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { PortfolioThemeProvider } from '../../components'
import { CaseStudyDecision } from './CaseStudyDecision'
import { CaseStudyEvidence } from './CaseStudyEvidence'
import { CaseStudyBody } from './CaseStudyBody'
import { CaseStudyCallout } from './CaseStudyCallout'
import { CaseStudyMediaCaption } from './CaseStudyMediaCaption'
import { CaseStudySection } from './CaseStudySection'

describe('case-study primitives', () => {
  test('exposes section, evidence, and decision relationships semantically', () => {
    render(<PortfolioThemeProvider><>
      <CaseStudyBody>
        <CaseStudySection title="A useful section"><p>Reading copy</p></CaseStudySection>
        <CaseStudySection title="A lead section" layout="lead"><p>Lead copy</p></CaseStudySection>
        <CaseStudySection title="A prose lead" layout="lead-prose"><p>Prose lead copy</p></CaseStudySection>
        <CaseStudyCallout>Shared callout</CaseStudyCallout>
        <figure><img alt="Evidence" /><CaseStudyMediaCaption>Shared caption</CaseStudyMediaCaption></figure>
      </CaseStudyBody>
      <CaseStudyEvidence auditDate="21 August 2026" href="https://example.test/evidence" label="Evidence source" />
      <CaseStudyDecision decision="A decision" reason="A reason" consequence="A consequence" />
    </></PortfolioThemeProvider>)

    expect(screen.getByRole('heading', { level: 2, name: 'A useful section' })).toBeVisible()
    expect(screen.getByText('Repository audit · 21 August 2026')).toBeVisible()
    expect(screen.getByRole('link', { name: 'Evidence source (opens in a new tab)' })).toHaveAttribute('href', 'https://example.test/evidence')
    expect(document.querySelector('[data-evidence-custody="provenance"]')).toBeInTheDocument()
    expect(document.querySelector('[data-evidence-frame="universal"]')).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'A decision' })).toBeVisible()
    expect(screen.getByText('Reason:')).toBeVisible()
    expect(screen.getByText('Consequence:')).toBeVisible()
    expect(screen.getByText('Shared callout')).toBeVisible()
    expect(screen.getByText('Shared caption')).toBeVisible()
    expect(screen.getByRole('heading', { level: 2, name: 'A lead section' })).toHaveAttribute('id', expect.stringContaining('case-study-a-lead-section'))
    expect(screen.getByRole('heading', { level: 2, name: 'A prose lead' })).toHaveAttribute('id', expect.stringContaining('case-study-a-prose-lead'))
    expect(document.querySelector('.case-study-lead')).not.toBeInTheDocument()
    expect(document.querySelector('.case-study-lead__heading')).not.toBeInTheDocument()
    expect(document.querySelector('.case-study-lead__body')).not.toBeInTheDocument()
    expect(document.querySelector('.case-study-callout')).not.toBeInTheDocument()
    expect(document.querySelector('.case-study-media-caption')).not.toBeInTheDocument()
    expect(document.querySelector('.case-study-evidence')).not.toBeInTheDocument()
  })
})
