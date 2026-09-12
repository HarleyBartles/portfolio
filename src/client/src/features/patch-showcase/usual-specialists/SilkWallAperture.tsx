import { useRef, type CSSProperties, type ReactElement, type ReactNode } from 'react'
import {
  ApertureRoot,
  ApertureSubstrate,
  CrossingLayer,
  ForegroundRim,
  WorldClip,
  WorldLayer,
  type SilkWallApertureVariant,
} from './SilkWallAperture.styles'
import { useSilkApertureParallax } from './useSilkApertureParallax'

type SilkWallApertureProps = {
  children: ReactNode
  crossing?: ReactNode
  maxParallaxTravel?: number
  style?: CSSProperties
  variant: SilkWallApertureVariant
}

export const SilkWallAperture = ({
  children,
  crossing,
  maxParallaxTravel = 0,
  style,
  variant,
}: SilkWallApertureProps): ReactElement => {
  const rootRef = useRef<HTMLDivElement>(null)
  const worldRef = useRef<HTMLDivElement>(null)

  useSilkApertureParallax({
    maxTravel: maxParallaxTravel,
    rootRef,
    worldRef,
  })

  return (
    <ApertureRoot
      data-silk-aperture
      data-silk-aperture-variant={variant}
      ref={rootRef}
      style={style}
    >
      <ApertureSubstrate $variant={variant} aria-hidden="true" />
      <WorldClip $variant={variant}>
        <WorldLayer data-silk-aperture-world ref={worldRef}>
          {children}
        </WorldLayer>
      </WorldClip>
      {crossing === undefined ? null : (
        <CrossingLayer data-silk-aperture-crossing>
          {crossing}
        </CrossingLayer>
      )}
      <ForegroundRim $variant={variant} aria-hidden="true" data-silk-aperture-rim />
    </ApertureRoot>
  )
}
