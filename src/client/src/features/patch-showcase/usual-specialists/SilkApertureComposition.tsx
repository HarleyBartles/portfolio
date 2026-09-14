import { useRef, type CSSProperties, type ReactElement } from 'react'
import {
  SILK_COMMISSION_05_PARALLAX_SAFETY_MARGIN,
  SILK_COMMISSION_05_PARALLAX_TRAVEL,
} from './silkCommission05Geometry'
import {
  SILK_COMMISSION_07_REVIEW_PARALLAX_SAFETY_MARGIN,
  SILK_COMMISSION_07_REVIEW_PARALLAX_TRAVEL,
} from './silkCommission07ReviewGeometry'
import {
  Composition,
  FrameImage,
  ReviewWorld,
  SceneImage,
  ViewportDiagnostic,
  WorldViewport,
  type SilkApertureCompositionVariant,
} from './SilkApertureComposition.styles'
import { useSilkApertureParallax } from './useSilkApertureParallax'
import { usualSpecialistsAssetPath } from './usualSpecialistsAssets'

type SilkApertureCompositionProps = {
  style?: CSSProperties
  variant: SilkApertureCompositionVariant
}

export type { SilkApertureCompositionVariant } from './SilkApertureComposition.styles'

export const SilkApertureComposition = ({
  style,
  variant,
}: SilkApertureCompositionProps): ReactElement => {
  const rootRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const worldRef = useRef<HTMLElement | null>(null)
  const isCommission05 = variant === 'commission-05'

  useSilkApertureParallax({
    maxTravel: isCommission05 ? SILK_COMMISSION_05_PARALLAX_TRAVEL : SILK_COMMISSION_07_REVIEW_PARALLAX_TRAVEL,
    rootRef,
    safetyMargin: isCommission05
      ? SILK_COMMISSION_05_PARALLAX_SAFETY_MARGIN
      : SILK_COMMISSION_07_REVIEW_PARALLAX_SAFETY_MARGIN,
    viewportRef,
    worldRef,
  })

  return (
    <Composition
      $variant={variant}
      data-silk-aperture-composition
      data-silk-aperture-composition-variant={variant}
      ref={rootRef}
      style={style}
    >
      <WorldViewport
        $variant={variant}
        data-silk-aperture-world-viewport
        data-silk-commission-05-world-viewport={isCommission05 ? '' : undefined}
        data-silk-commission-07-review-viewport={isCommission05 ? undefined : ''}
        ref={viewportRef}
      >
        {isCommission05 ? (
          <SceneImage
            src={usualSpecialistsAssetPath('silk-commission-05-corridor.webp')}
            width="1086"
            height="1448"
            alt=""
            aria-hidden="true"
            data-silk-commission-05-scene
            ref={(node) => { worldRef.current = node }}
          />
        ) : (
          <ReviewWorld
            aria-hidden="true"
            data-silk-commission-07-review-world
            ref={(node) => { worldRef.current = node }}
          />
        )}
        {isCommission05 ? null : (
          <ViewportDiagnostic aria-hidden="true" data-silk-aperture-viewport-diagnostic />
        )}
      </WorldViewport>

      {isCommission05 ? (
        <>
          <FrameImage
            $role="landscape"
            src={usualSpecialistsAssetPath('silk-commission-05-aperture-rim-heavy.webp')}
            width="1672"
            height="941"
            alt=""
            aria-hidden="true"
            data-silk-commission-05-frame
          />
          <FrameImage
            $role="portrait"
            src={usualSpecialistsAssetPath('silk-commission-05-aperture-rim-heavy-portrait.webp')}
            width="1024"
            height="1536"
            alt=""
            aria-hidden="true"
            data-silk-commission-05-portrait-frame
          />
        </>
      ) : (
        <FrameImage
          $role="review"
          src={usualSpecialistsAssetPath('silk-commission-07-frame-review.webp')}
          width="1671"
          height="941"
          alt=""
          aria-hidden="true"
          data-silk-commission-07-review-frame
        />
      )}

    </Composition>
  )
}
