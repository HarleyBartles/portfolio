import type { ReactNode } from 'react'

export function CaseStudyDecision({ decision, reason, consequence }: { decision: string; reason: ReactNode; consequence: ReactNode }) {
  return <div><h3>{decision}</h3><p><strong>Reason:</strong> {reason}</p><p><strong>Consequence:</strong> {consequence}</p></div>
}
