import { describe, expect, test } from 'vitest'
import pageSource from '../UsualSpecialistsPage.tsx?raw'
import openingSource from '../opening/UsualSpecialistsOpening.tsx?raw'
import silkLockupSource from '../silk/SilkNameLockup.tsx?raw'
import indexChapterSource from './IndexChapter.tsx?raw'
import indexBlueCarrierSource from './evidence/IndexBlueCarrier.tsx?raw'
import indexDeskDocumentSource from './evidence/IndexDeskDocument.tsx?raw'
import indexClosingSource from './closing/IndexClosingSequence.tsx?raw'
import indexObservationSource from './closing/IndexObservation.tsx?raw'

const responsiveSources = [
  pageSource,
  openingSource,
  indexChapterSource,
  indexBlueCarrierSource,
  indexClosingSource,
  indexDeskDocumentSource,
  indexObservationSource,
  silkLockupSource,
]

describe('Specialists responsive composition architecture', () => {
  test('keeps route-wide breakpoint taxonomy out of the active composition owners', () => {
    const productionCorpus = responsiveSources.join('\n')

    expect(productionCorpus).not.toContain('specialistsResponsive')
    expect(productionCorpus).not.toContain('SPECIALISTS_WIDTHS')
    expect(productionCorpus).not.toContain('specialistsMedia')
  })

  test('keeps the page canvas contract to the authored ceiling', () => {
    expect(pageSource).toContain('width: min(100%, 2560px);')
  })

  test('keeps the retained Silk identity lockup free of chapter-placement rules', () => {
    expect(silkLockupSource).toContain("usualSpecialistsAssetPath('silk-wordmark.svg')")
    expect(silkLockupSource).toContain('PRESSURE | PROVE THE ROUTE')
    expect(silkLockupSource).not.toContain('@media')
    expect(silkLockupSource).not.toContain('@container')
    expect(silkLockupSource).not.toContain('position: absolute')
  })
})
