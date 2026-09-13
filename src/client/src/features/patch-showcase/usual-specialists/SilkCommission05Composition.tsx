import { useRef, type CSSProperties, type ReactElement } from 'react'
import {
  SILK_COMMISSION_05_PARALLAX_SAFETY_MARGIN,
  SILK_COMMISSION_05_PARALLAX_TRAVEL,
} from './silkCommission05Geometry'
import {
  Composition,
  Frame,
  SceneImage,
  WorldViewport,
} from './SilkCommission05Composition.styles'
import { useSilkApertureParallax } from './useSilkApertureParallax'
import { usualSpecialistsAssetPath } from './usualSpecialistsAssets'

type SilkCommission05CompositionProps = {
  style?: CSSProperties
}

export const SilkCommission05Composition = ({ style }: SilkCommission05CompositionProps): ReactElement => {
  const rootRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLImageElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)

  useSilkApertureParallax({
    maxTravel: SILK_COMMISSION_05_PARALLAX_TRAVEL,
    rootRef,
    safetyMargin: SILK_COMMISSION_05_PARALLAX_SAFETY_MARGIN,
    viewportRef,
    worldRef: sceneRef,
  })

  return (
    <Composition data-silk-commission-05-composition ref={rootRef} style={style}>
      <WorldViewport data-silk-commission-05-world-viewport ref={viewportRef}>
        <SceneImage
          src={usualSpecialistsAssetPath('silk-commission-05-corridor.webp')}
          width="1086"
          height="1448"
          alt=""
          aria-hidden="true"
          data-silk-commission-05-scene
          ref={sceneRef}
        />
      </WorldViewport>
      <Frame
        src={usualSpecialistsAssetPath('silk-commission-05-aperture-rim-heavy.webp')}
        width="1672"
        height="941"
        alt=""
        aria-hidden="true"
        data-silk-commission-05-frame
      />
    </Composition>
  )
}
