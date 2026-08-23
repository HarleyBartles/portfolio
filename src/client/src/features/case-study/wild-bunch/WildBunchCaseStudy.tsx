import type { ReactElement } from 'react'
import { CaseStudyBody } from '../CaseStudyBody'

export function WildBunchCaseStudy(): ReactElement {
  return (
    <CaseStudyBody>
      <section className="case-study wild-bunch-case-study" aria-label="Wild Bunch case study">
        <p className="case-study-thesis">Every complexity pays rent.</p>
        <p>Source-backed Wild Bunch case-study evidence is being assembled from the dated pre-alpha snapshot.</p>
      </section>
    </CaseStudyBody>
  )
}
