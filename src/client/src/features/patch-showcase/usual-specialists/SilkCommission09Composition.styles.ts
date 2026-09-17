import styled from 'styled-components'

const FRAME_WIDTH = 1672
const FRAME_HEIGHT = 941
const VIEWPORT_LEFT = 120
const VIEWPORT_TOP = 90
const VIEWPORT_WIDTH = 1420
const VIEWPORT_HEIGHT = 770
const WORLD_OVERSCAN = 32
const PORTRAIT_FRAME_WIDTH = 941
const PORTRAIT_FRAME_HEIGHT = 1672
const PORTRAIT_VIEWPORT_LEFT = 99
const PORTRAIT_VIEWPORT_TOP = 129
const PORTRAIT_VIEWPORT_WIDTH = 752
const PORTRAIT_VIEWPORT_HEIGHT = 1402
const PORTRAIT_WORLD_OVERSCAN = 40
const COMMISSION_09_COMPACT_LANDSCAPE_MEDIA = '(min-width: 390px) and (max-width: 719px)'
const COMMISSION_09_PORTRAIT_MEDIA = '(max-width: 389px)'

const percentage = (value: number, total: number): string => `${(value / total) * 100}%`

export const Composition = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: ${FRAME_WIDTH} / ${FRAME_HEIGHT};
  isolation: isolate;

  @media ${COMMISSION_09_COMPACT_LANDSCAPE_MEDIA} {
    overflow: clip;
  }

  @media ${COMMISSION_09_PORTRAIT_MEDIA} {
    aspect-ratio: ${PORTRAIT_FRAME_WIDTH} / ${PORTRAIT_FRAME_HEIGHT};
  }
`

export const WorldViewport = styled.div`
  position: absolute;
  z-index: 1;
  top: ${percentage(VIEWPORT_TOP, FRAME_HEIGHT)};
  left: ${percentage(VIEWPORT_LEFT, FRAME_WIDTH)};
  width: ${percentage(VIEWPORT_WIDTH, FRAME_WIDTH)};
  height: ${percentage(VIEWPORT_HEIGHT, FRAME_HEIGHT)};
  overflow: hidden;

  @media ${COMMISSION_09_PORTRAIT_MEDIA} {
    top: ${percentage(PORTRAIT_VIEWPORT_TOP, PORTRAIT_FRAME_HEIGHT)};
    left: ${percentage(PORTRAIT_VIEWPORT_LEFT, PORTRAIT_FRAME_WIDTH)};
    width: ${percentage(PORTRAIT_VIEWPORT_WIDTH, PORTRAIT_FRAME_WIDTH)};
    height: ${percentage(PORTRAIT_VIEWPORT_HEIGHT, PORTRAIT_FRAME_HEIGHT)};
  }
`

export const StandinWorld = styled.div`
  position: absolute;
  top: -${WORLD_OVERSCAN}px;
  right: 0;
  left: 0;
  height: calc(100% + ${WORLD_OVERSCAN * 2}px);
  background:
    repeating-linear-gradient(
      135deg,
      rgb(48 57 61) 0 24px,
      rgb(192 201 204) 24px 48px
    );
  will-change: transform;

  @media ${COMMISSION_09_PORTRAIT_MEDIA} {
    top: -${PORTRAIT_WORLD_OVERSCAN}px;
    right: -4%;
    left: -4%;
    height: calc(100% + ${PORTRAIT_WORLD_OVERSCAN * 2}px);
  }

  &::after {
    position: absolute;
    top: ${WORLD_OVERSCAN}px;
    right: 0;
    bottom: ${WORLD_OVERSCAN}px;
    left: 0;
    box-sizing: border-box;
    border: 2px solid #00ffff;
    content: '';
    pointer-events: none;

    @media ${COMMISSION_09_PORTRAIT_MEDIA} {
      top: ${PORTRAIT_WORLD_OVERSCAN}px;
      right: 4%;
      bottom: ${PORTRAIT_WORLD_OVERSCAN}px;
      left: 4%;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    transform: none !important;
  }
`

export const FrameImage = styled.img`
  position: absolute;
  z-index: 2;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  pointer-events: none;
`
