import { CaseStudyBody } from '../CaseStudyBody'
import { CaseStudyEvidence } from '../CaseStudyEvidence'
import { CaseStudySection } from '../CaseStudySection'
import { PatchEvidenceGallery } from './PatchEvidenceGallery'
import { PatchProductionFlow } from './PatchProductionFlow'
import { PatchStoryLab } from './PatchStoryLab'
import { getPatchRepositoryEvidence } from './patchEvidence'
import { PatchWorkLedger } from './PatchWorkLedger'

export function PatchPipelineCaseStudy() {
  const repositoryEvidence = getPatchRepositoryEvidence()

  return (
    <CaseStudyBody>
      <section aria-label="Adventures of Patch case study">
        <p>The first deck explains why Patch exists. The production system and the adventures moving through it show what the project has become.</p>
        <CaseStudySection title="An accountable origin">
          <p>Patch began after I created an environment in which an agent could delete a development database. The agent followed the authority and affordances I had engineered, so I treated the incident as a systems-design failure.</p>
        </CaseStudySection>
        <CaseStudySection title="The first deck">
          <p>I made the first Club DB deck in one day to explain the failure and the layered enforcement that changed the available actions. It is an origin artefact, not today&apos;s quality bar: its legibility, continuity, and generated-image weaknesses motivated the controls used now.</p>
        </CaseStudySection>
        <CaseStudySection title="The frame gate">
          <p>A story enters production only when it can make the task, failure, Patch action, changed outcome, and audience practice concrete.</p>
        </CaseStudySection>
        <PatchProductionFlow />
        <PatchWorkLedger><PatchEvidenceGallery /></PatchWorkLedger>
        <PatchStoryLab />
        <CaseStudySection title="Public proof, private workshop">
          <p>The public repository shows what has earned a durable artefact. Earlier planning and future directions do not all begin or remain in public.</p>
          <CaseStudyEvidence auditDate="24 August 2026" href={repositoryEvidence.repositoryUrl} label="Adventures of Patch source snapshot" />
        </CaseStudySection>
        <CaseStudySection title="Controlled production">
          <p>Story framing, visual direction, acceptance, and publication remain deliberate human decisions. The record keeps those decisions inspectable.</p>
        </CaseStudySection>
      </section>
    </CaseStudyBody>
  )
}
