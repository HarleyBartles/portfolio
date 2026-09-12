import type { CSSProperties, ReactElement } from 'react'
import { SilkWallAperture } from './SilkWallAperture'
import { usualSpecialistsAssetPath } from './usualSpecialistsAssets'
import {
  BreachAperturePlacement,
  BreachWorld,
  Chapter,
  ChapterNumber,
  CorridorAperturePlacement,
  CorridorWorld,
  Eyebrow,
  HandoffBeat,
  NameMark,
  ReactionAperturePlacement,
  ReactionImage,
  ReceiptPeekthrough,
  Role,
  Stage,
  StoryCard,
  Traversal,
} from './SilkChapter.styles'

type SilkChapterProps = {
  style?: CSSProperties
}

export const SilkChapter = ({ style }: SilkChapterProps): ReactElement => {
  const traversal = (
    <Traversal data-silk-commission="06">
      Commission 06 / threshold-crossing Silk traversal
    </Traversal>
  )

  return (
    <Chapter aria-labelledby="specialists-silk-title" data-specialist-chapter="silk" style={style}>
      <h2 className="visually-hidden" id="specialists-silk-title">Silk</h2>
      <ChapterNumber aria-hidden="true" data-silk-chapter-number>02</ChapterNumber>
      <Stage data-silk-stage>
        <NameMark
          src={usualSpecialistsAssetPath('silk-wordmark.svg')}
          width="419"
          height="112"
          alt=""
          aria-hidden="true"
          data-silk-name-mark
        />

        <CorridorAperturePlacement data-silk-aperture-owner="05" data-silk-commission="05">
          <SilkWallAperture variant="corridor" maxParallaxTravel={32} crossing={traversal}>
            <CorridorWorld>
              Corridor world behind mineral page / pressure test already underway
            </CorridorWorld>
          </SilkWallAperture>
        </CorridorAperturePlacement>

        <StoryCard data-silk-story-card>
          <Eyebrow>02 / Pressure test</Eyebrow>
          <Role>Try to break the route</Role>
          <p>Silk sees Index’s route and launches before Patch can properly begin. Floorboards, service voids, conduit, cheap doors and improvised anchors turn the apartment corridor into a hostile test harness.</p>
        </StoryCard>

        <BreachAperturePlacement data-silk-aperture-owner="07" data-silk-commission="07">
          <SilkWallAperture variant="breach" maxParallaxTravel={12}>
            <BreachWorld>
              Service-void world behind mineral page / tested boundary becomes route
            </BreachWorld>
          </SilkWallAperture>
        </BreachAperturePlacement>

        <ReceiptPeekthrough data-silk-receipt-peekthrough>
          Receipt peek-through / fused smashed aperture
        </ReceiptPeekthrough>

        <ReactionAperturePlacement data-silk-aperture-owner="08" data-silk-commission="08">
          <SilkWallAperture variant="slit">
            <ReactionImage
              src={`${import.meta.env.BASE_URL}media/homepage/specialists-silk.webp`}
              width="1983"
              height="793"
              loading="lazy"
              decoding="async"
              alt="Silk's eyes open in restrained surprise when the route survives her pressure test."
            />
          </SilkWallAperture>
        </ReactionAperturePlacement>

        <HandoffBeat data-silk-commission="09">
          Commission 09 / marker-toss handoff / composition reopened
          <span>Separate follow-through beat. Final page/world geometry will decide the commissioned two-shot rather than restoring the old rectangular cell.</span>
        </HandoffBeat>
      </Stage>
    </Chapter>
  )
}
