import styled, { css } from 'styled-components'

export type SilkWallApertureVariant = 'breach' | 'corridor' | 'slit'

const apertureShape = {
  breach: css`
    clip-path: polygon(2% 9%, 10% 3%, 28% 5%, 45% 1%, 66% 6%, 83% 2%, 97% 11%, 99% 31%, 95% 54%, 99% 77%, 90% 96%, 70% 92%, 53% 99%, 31% 94%, 14% 98%, 1% 87%, 4% 63%, 0 40%);
  `,
  corridor: css`
    clip-path: polygon(1% 13%, 8% 4%, 25% 6%, 42% 2%, 62% 5%, 78% 1%, 96% 9%, 99% 26%, 97% 49%, 100% 73%, 93% 93%, 74% 96%, 56% 91%, 39% 98%, 20% 94%, 4% 98%, 0 78%, 3% 54%, 0 34%);
  `,
  slit: css`
    clip-path: polygon(2% 30%, 11% 17%, 28% 21%, 43% 11%, 61% 19%, 79% 12%, 97% 25%, 99% 54%, 91% 72%, 72% 68%, 57% 80%, 37% 70%, 19% 78%, 1% 62%);
  `,
} as const

export const ApertureRoot = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: visible;
  isolation: isolate;
`

export const ApertureSubstrate = styled.div<{ $variant: SilkWallApertureVariant }>`
  position: absolute;
  z-index: 0;
  inset: 0;
  background:
    radial-gradient(circle at 18% 32%, rgb(107 83 63 / 38%) 0 1.2%, transparent 1.5%),
    radial-gradient(circle at 82% 68%, rgb(112 84 63 / 30%) 0 1.1%, transparent 1.4%),
    repeating-linear-gradient(0deg, #865d45 0 17px, #a47759 17px 20px, #684735 20px 36px);
  ${({ $variant }) => apertureShape[$variant]}
`

export const WorldClip = styled.div<{ $variant: SilkWallApertureVariant }>`
  position: absolute;
  z-index: 1;
  overflow: hidden;
  background: #6c6259;
  ${({ $variant }) => apertureShape[$variant]}

  ${({ $variant }) => $variant === 'slit' ? css`
    inset: 12% 2.2%;
  ` : css`
    inset: 2.2% 1.4%;
  `}

  box-shadow: inset 0 0 22px rgb(12 14 13 / 38%);
`

export const WorldLayer = styled.div`
  position: absolute;
  inset: -12%;
  will-change: transform;

  @media (prefers-reduced-motion: reduce) {
    transform: none !important;
  }
`

export const CrossingLayer = styled.div`
  position: absolute;
  z-index: 2;
  inset: 0;
  overflow: visible;
  pointer-events: none;
`

export const ForegroundRim = styled.div<{ $variant: SilkWallApertureVariant }>`
  position: absolute;
  z-index: 3;
  pointer-events: none;

  ${({ $variant }) => $variant === 'corridor' && css`
    right: 1.5%;
    bottom: 3%;
    left: 10%;
    height: 12%;
    background: linear-gradient(174deg, transparent 0 30%, #d9dcda 31% 58%, #9b7257 59% 68%, transparent 69%);
    clip-path: polygon(0 45%, 12% 37%, 24% 49%, 38% 30%, 50% 42%, 64% 25%, 79% 41%, 100% 18%, 99% 78%, 82% 70%, 65% 84%, 47% 72%, 29% 89%, 12% 76%, 0 90%);
  `}

  ${({ $variant }) => $variant === 'breach' && css`
    top: 2%;
    right: 4%;
    bottom: 6%;
    width: 14%;
    background: linear-gradient(92deg, transparent 0 18%, #744a34 20% 38%, #b58b6c 39% 53%, #d9dcda 54% 100%);
    clip-path: polygon(20% 0, 100% 6%, 91% 20%, 100% 35%, 86% 49%, 97% 64%, 80% 79%, 94% 100%, 28% 94%, 37% 80%, 20% 67%, 36% 51%, 17% 35%, 32% 19%);
  `}

  ${({ $variant }) => $variant === 'slit' && css`
    inset: 8% 1.5%;
    border-top: 7px solid #d9dcda;
    border-bottom: 7px solid #d9dcda;
    clip-path: polygon(0 18%, 14% 7%, 30% 13%, 45% 2%, 59% 11%, 76% 4%, 100% 16%, 98% 84%, 80% 91%, 64% 83%, 47% 97%, 29% 86%, 12% 94%, 1% 80%);
  `}
`
