import type { CSSProperties, ReactElement } from 'react'
import { SilkApertureComposition } from './SilkApertureComposition'
import { SilkCommission09Composition } from './SilkCommission09Composition'
import { SilkReactionFrameComposition } from './SilkReactionFrameComposition'
import { SilkReceiptPeekthroughComposition } from './SilkReceiptPeekthroughComposition'
import { SilkTraversalComposition } from './SilkTraversalComposition'
import { usualSpecialistsAssetPath } from './usualSpecialistsAssets'
import type { IndexSilkConnection } from './usualSpecialistsConnections'
import {
  BreachAperturePlacement,
  Chapter,
  ChapterNumber,
  CorridorAperturePlacement,
  HandoffCell,
  NameLockup,
  NameMark,
  NameStrapline,
  ReactionAperturePlacement,
  ReceiptPeekthrough,
  Stage,
  StoryCard,
  TraversalPlacement,
} from './SilkChapter.styles'

type SilkChapterProps = {
  connection: IndexSilkConnection
  style?: CSSProperties
}

export const SilkChapter = ({ connection, style }: SilkChapterProps): ReactElement => {
  return (
    <Chapter aria-labelledby="specialists-silk-title" data-specialist-chapter="silk" id="silk" style={style}>
      <h2 className="visually-hidden" id="specialists-silk-title">Silk</h2>
      <ChapterNumber aria-hidden="true" data-silk-chapter-number>02</ChapterNumber>
      <Stage data-silk-stage>
        <NameLockup data-silk-name-lockup>
          <NameMark
            src={usualSpecialistsAssetPath('silk-wordmark.svg')}
            width="419"
            height="112"
            alt=""
            aria-hidden="true"
            data-silk-name-mark
          />
          <NameStrapline data-silk-name-strapline>PRESSURE | PROVE THE ROUTE</NameStrapline>
        </NameLockup>

        <TraversalPlacement data-silk-traversal-placement>
          <SilkTraversalComposition connection={connection} />
        </TraversalPlacement>

        <CorridorAperturePlacement data-silk-aperture-owner="05" data-silk-commission="05">
          <SilkApertureComposition variant="commission-05" />
        </CorridorAperturePlacement>

        <StoryCard data-silk-story-card>
          <p>Silk sees Index’s route and launches before Patch can properly begin. Floorboards, service voids, conduit, cheap doors and improvised anchors turn the apartment corridor into a hostile test harness.</p>
        </StoryCard>

        <BreachAperturePlacement data-silk-aperture-owner="07" data-silk-commission="07">
          <SilkApertureComposition variant="commission-07-review" />
        </BreachAperturePlacement>

        <ReceiptPeekthrough data-silk-receipt-peekthrough>
          <SilkReceiptPeekthroughComposition />
        </ReceiptPeekthrough>

        <ReactionAperturePlacement data-silk-aperture-owner="08" data-silk-commission="08">
          <SilkReactionFrameComposition />
        </ReactionAperturePlacement>

        <HandoffCell
          data-silk-aperture-owner="09"
          data-silk-commission="09"
          data-silk-commission-09-placement
          data-silk-scene-cell="09"
        >
          <SilkCommission09Composition />
        </HandoffCell>
      </Stage>
    </Chapter>
  )
}
