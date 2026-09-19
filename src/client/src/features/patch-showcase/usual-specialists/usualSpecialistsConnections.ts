export type ConnectionInlineAnchor = {
  edge: 'left' | 'right'
  offset: string
}

export type CrossingLockupPlacement = {
  inlineAnchor: ConnectionInlineAnchor
  yOffsetPx: number
  rotationDeg: number
  scale: number
}

export type IndexSilkConnectionPlacement = CrossingLockupPlacement

export type IndexSilkConnection = {
  narrow: IndexSilkConnectionPlacement
  compactLandscape: IndexSilkConnectionPlacement
  mid: IndexSilkConnectionPlacement
  default: IndexSilkConnectionPlacement
  wide: IndexSilkConnectionPlacement
}

export type OpeningIndexConnectionPlacement = {
  startPort: {
    inlineAnchor: ConnectionInlineAnchor
    yPx: number
  }
  startAnchor: {
    rotationDeg: number
    scale: number
  }
  crossing: CrossingLockupPlacement
}

export type OpeningIndexConnection = {
  narrow: OpeningIndexConnectionPlacement
  compactLandscape: OpeningIndexConnectionPlacement
  mid: OpeningIndexConnectionPlacement
  default: OpeningIndexConnectionPlacement
  wide: OpeningIndexConnectionPlacement
}

export const SPECIALISTS_CROSSING_LOCKUP_SCALE = 0.725

export const OPENING_INDEX_CONNECTION: OpeningIndexConnection = {
  narrow: {
    startPort: { inlineAnchor: { edge: 'left', offset: '8cqi' }, yPx: 49 },
    startAnchor: { rotationDeg: 5.5, scale: 0.5 },
    crossing: {
      inlineAnchor: { edge: 'left', offset: 'calc(8cqi + 5px)' },
      yOffsetPx: 2.1,
      rotationDeg: 10,
      scale: SPECIALISTS_CROSSING_LOCKUP_SCALE,
    },
  },
  compactLandscape: {
    startPort: { inlineAnchor: { edge: 'left', offset: '8cqi' }, yPx: 54 },
    startAnchor: { rotationDeg: 5.5, scale: 0.55 },
    crossing: {
      inlineAnchor: { edge: 'left', offset: 'calc(8cqi + 5px)' },
      yOffsetPx: 2.1,
      rotationDeg: 10,
      scale: SPECIALISTS_CROSSING_LOCKUP_SCALE,
    },
  },
  mid: {
    startPort: { inlineAnchor: { edge: 'left', offset: '11cqi' }, yPx: 54 },
    startAnchor: { rotationDeg: 5.5, scale: 0.55 },
    crossing: {
      inlineAnchor: { edge: 'left', offset: 'calc(11cqi + 6px)' },
      yOffsetPx: 2.1,
      rotationDeg: 8,
      scale: SPECIALISTS_CROSSING_LOCKUP_SCALE,
    },
  },
  default: {
    startPort: { inlineAnchor: { edge: 'left', offset: '11cqi' }, yPx: 62 },
    startAnchor: { rotationDeg: 5.5, scale: 0.65 },
    crossing: {
      inlineAnchor: { edge: 'left', offset: 'calc(11cqi + 6px)' },
      yOffsetPx: 2.1,
      rotationDeg: 8,
      scale: SPECIALISTS_CROSSING_LOCKUP_SCALE,
    },
  },
  wide: {
    startPort: { inlineAnchor: { edge: 'left', offset: '159px' }, yPx: 62 },
    startAnchor: { rotationDeg: 5.5, scale: 0.65 },
    crossing: {
      inlineAnchor: { edge: 'left', offset: '170px' },
      yOffsetPx: 2.1,
      rotationDeg: 4,
      scale: SPECIALISTS_CROSSING_LOCKUP_SCALE,
    },
  },
}

export const INDEX_SILK_CONNECTION: IndexSilkConnection = {
  narrow: {
    inlineAnchor: { edge: 'left', offset: 'calc(4.516cqi + 11.65px)' },
    yOffsetPx: 2.44,
    rotationDeg: 3,
    scale: SPECIALISTS_CROSSING_LOCKUP_SCALE,
  },
  compactLandscape: {
    inlineAnchor: { edge: 'left', offset: 'calc(4.7144cqi + 9px)' },
    yOffsetPx: 2.43,
    rotationDeg: 6,
    scale: SPECIALISTS_CROSSING_LOCKUP_SCALE,
  },
  mid: {
    inlineAnchor: { edge: 'left', offset: 'calc(20.9075cqi + 11.72px)' },
    yOffsetPx: 2.38,
    rotationDeg: 1,
    scale: SPECIALISTS_CROSSING_LOCKUP_SCALE,
  },
  default: {
    inlineAnchor: { edge: 'left', offset: 'calc(22.1358cqi + 11.77px)' },
    yOffsetPx: 2.35,
    rotationDeg: -1,
    scale: SPECIALISTS_CROSSING_LOCKUP_SCALE,
  },
  wide: {
    inlineAnchor: { edge: 'left', offset: '329px' },
    yOffsetPx: 0,
    rotationDeg: 2.5,
    scale: SPECIALISTS_CROSSING_LOCKUP_SCALE,
  },
}
