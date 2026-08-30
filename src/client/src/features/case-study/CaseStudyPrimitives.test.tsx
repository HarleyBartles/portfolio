import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { CaseStudyDecision } from './CaseStudyDecision'
import { CaseStudyEvidence } from './CaseStudyEvidence'
import { CaseStudySection } from './CaseStudySection'

describe('case-study primitives', () => {
  test('exposes section, evidence, and decision relationships semantically', () => {
    render(<>
      <CaseStudySection title="A useful section"><p>Reading copy</p></CaseStudySection>
      <CaseStudyEvidence auditDate="21 August 2026" href="https://example.test/evidence" label="Evidence source" />
      <CaseStudyDecision decision="A decision" reason="A reason" consequence="A consequence" />
    </>)

    expect(screen.getByRole('heading', { level: 2, name: 'A useful section' })).toBeVisible()
    expect(screen.getByText('Repository audit · 21 August 2026')).toBeVisible()
    expect(screen.getByRole('link', { name: 'Evidence source (opens in a new tab)' })).toHaveAttribute('href', 'https://example.test/evidence')
    expect(document.querySelector('[data-evidence-custody="provenance"]')).toBeInTheDocument()
    expect(document.querySelector('[data-evidence-frame="universal"]')).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'A decision' })).toBeVisible()
    expect(screen.getByText('Reason:')).toBeVisible()
    expect(screen.getByText('Consequence:')).toBeVisible()
  })
})
