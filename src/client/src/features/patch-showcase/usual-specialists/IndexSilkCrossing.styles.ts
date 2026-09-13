import styled from 'styled-components'
import { specialistsMedia } from './specialistsResponsive'

export type AuthoredX =
  | { kind: 'absolute-px'; value: number }
  | { kind: 'percent-plus-px'; percent: number; offsetPx: number }

export type LockPlacement = {
  x: AuthoredX
  yOffsetPx: number
  rotationDeg: number
  scale: number
}

export type LockPlacementState = 'narrow' | 'compactLandscape' | 'mid' | 'default' | 'wide'

type IndexSilkLockPlacementProps = {
  $defaultPlacement: LockPlacement
  $widePlacement: LockPlacement
  $midPlacement: LockPlacement
  $compactPlacement: LockPlacement
  $narrowPlacement: LockPlacement
}

const authoredXCss = (x: AuthoredX): string => (
  x.kind === 'absolute-px'
    ? `${x.value}px`
    : `calc(${x.percent}% + ${x.offsetPx}px)`
)

const placementTransform = (placement: LockPlacement): string => (
  `translate(-50%, -50%) rotate(${placement.rotationDeg}deg) scale(${placement.scale})`
)

export const IndexSilkLockPlacement = styled.span<IndexSilkLockPlacementProps>`
  position: absolute;
  z-index: 60;
  top: calc(100% + ${({ $defaultPlacement }) => $defaultPlacement.yOffsetPx}px);
  left: ${({ $defaultPlacement }) => authoredXCss($defaultPlacement.x)};
  width: 176px;
  height: 154px;
  pointer-events: none;
  transform: ${({ $defaultPlacement }) => placementTransform($defaultPlacement)};

  @media ${specialistsMedia.atLeastWide} {
    top: calc(100% + ${({ $widePlacement }) => $widePlacement.yOffsetPx}px);
    left: ${({ $widePlacement }) => authoredXCss($widePlacement.x)};
    transform: ${({ $widePlacement }) => placementTransform($widePlacement)};
  }

  @media ${specialistsMedia.atMostMid} {
    top: calc(100% + ${({ $midPlacement }) => $midPlacement.yOffsetPx}px);
    left: ${({ $midPlacement }) => authoredXCss($midPlacement.x)};
    transform: ${({ $midPlacement }) => placementTransform($midPlacement)};
  }

  @media ${specialistsMedia.compactLandscape} {
    top: calc(100% + ${({ $compactPlacement }) => $compactPlacement.yOffsetPx}px);
    left: ${({ $compactPlacement }) => authoredXCss($compactPlacement.x)};
    transform: ${({ $compactPlacement }) => placementTransform($compactPlacement)};
  }

  @media ${specialistsMedia.atMostNarrow} {
    top: calc(100% + ${({ $narrowPlacement }) => $narrowPlacement.yOffsetPx}px);
    left: ${({ $narrowPlacement }) => authoredXCss($narrowPlacement.x)};
    transform: ${({ $narrowPlacement }) => placementTransform($narrowPlacement)};
  }
`
