import type { ReactNode } from 'react'
import styled from 'styled-components'

const Decision = styled.div`
  min-width: 0;

  h3 {
    margin-top: 0;
  }
`

export function CaseStudyDecision({ decision, reason, consequence }: { decision: string; reason: ReactNode; consequence: ReactNode }) {
  return <Decision data-case-study-decision><h3>{decision}</h3><p><strong>Reason:</strong> {reason}</p><p><strong>Consequence:</strong> {consequence}</p></Decision>
}
