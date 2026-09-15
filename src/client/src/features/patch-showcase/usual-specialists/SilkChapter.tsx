import type { CSSProperties, ReactElement } from 'react'
import { SilkApertureComposition } from './SilkApertureComposition'
import { SilkReactionFrameComposition } from './SilkReactionFrameComposition'
import { SilkTraversalComposition } from './SilkTraversalComposition'
import { usualSpecialistsAssetPath } from './usualSpecialistsAssets'
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
} from './SilkChapter.styles'

type SilkChapterProps = {
  style?: CSSProperties
}

export const SilkChapter = ({ style }: SilkChapterProps): ReactElement => {
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

        <SilkTraversalComposition />

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
          Receipt peek-through / fused smashed aperture
        </ReceiptPeekthrough>

        <ReactionAperturePlacement data-silk-aperture-owner="08" data-silk-commission="08">
          <SilkReactionFrameComposition />
        </ReactionAperturePlacement>

        <HandoffCell data-silk-commission="09" data-silk-scene-cell="09">
          Commission 09 / assent-marker toss handoff
          <span>Scene pending</span>
        </HandoffCell>
      </Stage>
    </Chapter>
  )
}
