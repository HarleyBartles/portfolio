import { describe, expect, test } from 'vitest'
import pageSource from '../UsualSpecialistsPage.tsx?raw'
import indexBlueCarrierSource from './IndexBlueCarrier.tsx?raw'
import indexChapterStyles from './IndexChapter.styles.ts?raw'
import indexClosingStyles from './IndexClosingSequence.styles.ts?raw'
import indexDeskDocumentSource from './IndexDeskDocument.tsx?raw'
import indexObservationSource from './IndexObservation.tsx?raw'
import openingStyles from './UsualSpecialistsOpening.styles.ts?raw'
import pageStyles from './UsualSpecialistsPage.styles.ts?raw'
import silkLockupStyles from './SilkNameLockup.styles.ts?raw'
import silkLockupSource from './SilkNameLockup.tsx?raw'

const responsiveSources = [
  pageSource,
  pageStyles,
  openingStyles,
  indexChapterStyles,
  indexBlueCarrierSource,
  indexClosingStyles,
  indexDeskDocumentSource,
  indexObservationSource,
  silkLockupSource,
  silkLockupStyles,
]

describe('Specialists responsive composition architecture', () => {
  test('keeps route-wide breakpoint taxonomy out of the active composition owners', () => {
    const productionCorpus = responsiveSources.join('\n')

    expect(productionCorpus).not.toContain('specialistsResponsive')
    expect(productionCorpus).not.toContain('SPECIALISTS_WIDTHS')
    expect(productionCorpus).not.toContain('specialistsMedia')
  })

  test('keeps the page canvas contract to the authored ceiling', () => {
    expect(pageStyles).toContain('width: min(100%, 2560px);')
  })

  test('keeps the retained Silk identity lockup free of chapter-placement rules', () => {
    expect(silkLockupSource).toContain("usualSpecialistsAssetPath('silk-wordmark.svg')")
    expect(silkLockupSource).toContain('PRESSURE | PROVE THE ROUTE')
    expect(silkLockupStyles).not.toContain('@media')
    expect(silkLockupStyles).not.toContain('@container')
    expect(silkLockupStyles).not.toContain('position: absolute')
  })
})
