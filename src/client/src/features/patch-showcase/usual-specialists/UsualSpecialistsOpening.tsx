import type { ReactElement } from 'react'
import { SpecialistsJourneyRope } from './SpecialistsJourneyRope'
import { usualSpecialistsAssetPath } from './usualSpecialistsAssets'
import {
  Opening,
  OpeningLockup,
  OpeningPrecis,
  OpeningTitle,
  SeriesLockupField,
  SeriesMark,
  SpecialistsMark,
  SpecialistsWordmarkField,
  Threshold,
  ThresholdArt,
  ThresholdCopy,
  ThresholdEyebrow,
} from './UsualSpecialistsOpening.styles'

export function UsualSpecialistsOpening(): ReactElement {
  return (
    <Opening>
      <OpeningLockup>
        <SeriesLockupField data-patch-series-lockup>
          <SeriesMark decorative />
        </SeriesLockupField>
        <OpeningTitle id="content-page-title">
          <span className="visually-hidden">The Usual Specialists</span>
          <SpecialistsWordmarkField data-specialists-wordmark aria-hidden="true">
            <SpecialistsMark decorative />
          </SpecialistsWordmarkField>
        </OpeningTitle>
        <OpeningPrecis>Patch has a route-shaped problem. Six people make it legitimate, testable, lawful, decidable, recoverable and reviewable - mostly by carrying on with their actual jobs while he talks.</OpeningPrecis>
      </OpeningLockup>
      <Threshold>
        <ThresholdArt
          src={usualSpecialistsAssetPath('safehouse-threshold.webp')}
          width="1672"
          height="941"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          alt="An ordinary apartment safehouse threshold repurposed room by room for the Specialists."
        />
        <SpecialistsJourneyRope />
        <ThresholdCopy>
          <ThresholdEyebrow>The adventure / recruitment pass</ThresholdEyebrow>
          <h2>One ordinary apartment. Six rooms bent to purpose.</h2>
          <p>Patch moves through the safehouse with a folder and an unheard pitch. Each Specialist exposes the missing layer by doing the work they already do. The assent marker lands when the role makes itself unavoidable.</p>
        </ThresholdCopy>
      </Threshold>
    </Opening>
  )
}
