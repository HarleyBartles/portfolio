import { useRef, type CSSProperties, type ReactElement } from 'react'
import {
  Composition,
  FrameCanvas,
  FrameImage,
  PeekCutoutImage,
  PeekCutoutLayer,
  ReceiptAnchor,
  ReceiptPlane,
  WorldImage,
  WorldViewport,
} from './SilkReceiptPeekthroughComposition.styles'
import { useSilkApertureParallax } from './useSilkApertureParallax'
import { usualSpecialistsAssetPath } from './usualSpecialistsAssets'

const RECEIPT_REVIEW_PARALLAX_TRAVEL = 32
const RECEIPT_REVIEW_PARALLAX_SAFETY_MARGIN = 8

type SilkReceiptPeekthroughCompositionProps = {
  style?: CSSProperties
}

export const SilkReceiptPeekthroughComposition = ({
  style,
}: SilkReceiptPeekthroughCompositionProps): ReactElement => {
  const rootRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const worldRef = useRef<HTMLElement | null>(null)

  useSilkApertureParallax({
    maxTravel: RECEIPT_REVIEW_PARALLAX_TRAVEL,
    rootRef,
    safetyMargin: RECEIPT_REVIEW_PARALLAX_SAFETY_MARGIN,
    viewportRef,
    worldRef,
  })

  return (
    <Composition data-silk-receipt-peekthrough-composition ref={rootRef} style={style}>
      <ReceiptAnchor data-silk-receipt-anchor>
        <FrameCanvas data-silk-receipt-frame-canvas>
          <ReceiptPlane data-silk-receipt-plane>
            <WorldViewport data-silk-receipt-world-viewport ref={viewportRef}>
              <WorldImage
                src={usualSpecialistsAssetPath('silk-receipt-alcove-world-review.webp')}
                width="1254"
                height="1254"
                aria-hidden="true"
                alt=""
                data-silk-receipt-world-image
                ref={(node) => { worldRef.current = node }}
              />
            </WorldViewport>
            <FrameImage
              src={usualSpecialistsAssetPath('silk-receipt-peekthrough-frame-review.webp')}
              width="1254"
              height="1254"
              alt=""
              aria-hidden="true"
              data-silk-receipt-frame-review
            />
          </ReceiptPlane>
        </FrameCanvas>
        <PeekCutoutLayer data-silk-receipt-peek-cutout-layer>
          <PeekCutoutImage
            src={usualSpecialistsAssetPath('silk-receipt-hole-peek-cutout-review.webp')}
            width="720"
            height="900"
            alt=""
            aria-hidden="true"
            data-silk-receipt-peek-cutout
          />
        </PeekCutoutLayer>
      </ReceiptAnchor>
    </Composition>
  )
}
