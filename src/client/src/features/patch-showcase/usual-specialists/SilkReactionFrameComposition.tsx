import type { CSSProperties, ReactElement } from 'react'
import {
  Composition,
  FrameCanvas,
  FrameImage,
  ReactionImage,
  ReactionViewport,
} from './SilkReactionFrameComposition.styles'
import { usualSpecialistsAssetPath } from './usualSpecialistsAssets'

type SilkReactionFrameCompositionProps = {
  style?: CSSProperties
}

export const SilkReactionFrameComposition = ({ style }: SilkReactionFrameCompositionProps): ReactElement => {
  return (
    <Composition data-silk-reaction-frame-composition style={style}>
      <FrameCanvas>
        <ReactionViewport data-silk-commission-08-review-viewport>
          <ReactionImage
            src={`${import.meta.env.BASE_URL}media/homepage/specialists-silk.webp`}
            width="1983"
            height="793"
            loading="lazy"
            decoding="async"
            alt="Silk's eyes open in restrained surprise when the route survives her pressure test."
          />
        </ReactionViewport>
        <FrameImage
          src={usualSpecialistsAssetPath('silk-commission-08-reaction-frame-review.webp')}
          width="1750"
          height="600"
          alt=""
          aria-hidden="true"
          data-silk-commission-08-review-frame
        />
      </FrameCanvas>
    </Composition>
  )
}
