import { useRef, type CSSProperties, type ReactElement } from 'react'
import {
  Composition,
  FrameImage,
  StandinWorld,
  WorldViewport,
} from './SilkCommission09Composition.styles'
import { useSilkApertureParallax } from './useSilkApertureParallax'
import { usualSpecialistsAssetPath } from './usualSpecialistsAssets'

const COMMISSION_09_PARALLAX_TRAVEL = 32
const COMMISSION_09_PARALLAX_SAFETY_MARGIN = 8

type SilkCommission09CompositionProps = {
  style?: CSSProperties
}

export const SilkCommission09Composition = ({
  style,
}: SilkCommission09CompositionProps): ReactElement => {
  const rootRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const worldRef = useRef<HTMLDivElement | null>(null)

  useSilkApertureParallax({
    maxTravel: COMMISSION_09_PARALLAX_TRAVEL,
    rootRef,
    safetyMargin: COMMISSION_09_PARALLAX_SAFETY_MARGIN,
    viewportRef,
    worldRef,
  })

  return (
    <Composition data-silk-commission-09-composition ref={rootRef} style={style}>
      <WorldViewport data-silk-commission-09-viewport ref={viewportRef}>
        <StandinWorld
          aria-hidden="true"
          data-silk-commission-09-standin-world
          ref={(node) => { worldRef.current = node }}
        />
      </WorldViewport>
      <picture>
        <source
          data-silk-commission-09-frame-review-portrait-source
          media="(max-width: 389px)"
          srcSet={usualSpecialistsAssetPath('silk-commission-09-knockthrough-frame-review-portrait.webp')}
          width="941"
          height="1672"
        />
        <FrameImage
          src={usualSpecialistsAssetPath('silk-commission-09-knockthrough-frame-review.webp')}
          width="1672"
          height="941"
          alt=""
          aria-hidden="true"
          decoding="async"
          loading="lazy"
          data-silk-commission-09-frame-review
        />
      </picture>
    </Composition>
  )
}
