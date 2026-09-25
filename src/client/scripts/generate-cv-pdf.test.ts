import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { PDFDocument, PDFName } from 'pdf-lib'
// @ts-expect-error The production build utility is intentionally plain ESM for direct Node execution.
import {
  assertCvPdf,
  assertCvPdfHasNoLinkAnnotations,
  assertCvPdfPageCount,
  generateCvPdf,
  removePdfLinkTargets,
} from './generate-cv-pdf.mjs'

const temporaryRoots: string[] = []

afterEach(async () => {
  await Promise.all(temporaryRoots.splice(0).map((root) => rm(root, { recursive: true, force: true })))
  document.head.innerHTML = ''
  document.body.innerHTML = ''
})

async function temporaryPdf(contents: Uint8Array): Promise<string> {
  const root = await mkdtemp(path.join(tmpdir(), 'portfolio-cv-pdf-'))
  temporaryRoots.push(root)
  const pdfPath = path.join(root, 'harley-bartles-cv.pdf')
  await writeFile(pdfPath, contents)
  return pdfPath
}

function browserFixture(pageRegions: string[]) {
  const page = {
    close: vi.fn(async () => {}),
    emulateMedia: vi.fn(async () => {}),
    evaluate: vi.fn(async () => pageRegions),
    goto: vi.fn(async () => {}),
    pdf: vi.fn(async ({ path: pdfPath }: { path: string }) => writeFile(pdfPath, '%PDF generated CV')),
  }
  const browser = {
    close: vi.fn(async () => {}),
    newPage: vi.fn(async () => page),
  }
  return { browser, page }
}

describe('assertCvPdf', () => {
  test('accepts a non-empty PDF at the 512 KiB boundary', async () => {
    const pdfPath = await temporaryPdf(Buffer.concat([Buffer.from('%PDF'), Buffer.alloc((512 * 1024) - 4)]))

    expect(assertCvPdf(pdfPath)).toBe(512 * 1024)
  })

  test('rejects an invalid PDF signature', async () => {
    const pdfPath = await temporaryPdf(Buffer.from('not a PDF'))

    expect(() => assertCvPdf(pdfPath)).toThrow('CV PDF does not start with %PDF')
  })

  test('rejects a PDF over 512 KiB', async () => {
    const pdfPath = await temporaryPdf(Buffer.concat([Buffer.from('%PDF'), Buffer.alloc((512 * 1024) - 3)]))

    expect(() => assertCvPdf(pdfPath)).toThrow('CV PDF is 524289 bytes; budget is 524288 bytes')
  })

  test('accepts the composed two-page CV', async () => {
    const document = await PDFDocument.create()
    document.addPage()
    document.addPage()
    const pdfPath = await temporaryPdf(await document.save())

    await expect(assertCvPdfPageCount(pdfPath)).resolves.toBe(2)
  })

  test('rejects a CV whose content creates an unapproved extra page', async () => {
    const document = await PDFDocument.create()
    document.addPage()
    document.addPage()
    document.addPage()
    const pdfPath = await temporaryPdf(await document.save())

    await expect(assertCvPdfPageCount(pdfPath)).rejects.toThrow('CV PDF must have exactly 2 pages, received 3')
  })

  test('rejects a generated PDF containing a clickable link annotation', async () => {
    const document = await PDFDocument.create()
    const page = document.addPage()
    page.node.set(PDFName.of('Annots'), document.context.obj([
      { Type: 'Annot', Subtype: 'Link', Rect: [0, 0, 1, 1] },
    ]))
    const pdfPath = await temporaryPdf(await document.save())

    await expect(assertCvPdfHasNoLinkAnnotations(pdfPath)).rejects.toThrow(
      'CV PDF contains 1 link annotation(s)',
    )
  })
})

describe('generateCvPdf', () => {
  test('removes PDF link targets while preserving the printed link labels', async () => {
    document.body.innerHTML = [
      '<a href="https://harleybartles.com/projects">Agent Asset Marketplace</a>',
      '<a href="/contact">Contact</a>',
    ].join('')
    const page = {
      evaluate: vi.fn(async (callback: () => void) => callback()),
    }

    await removePdfLinkTargets(page)

    expect(document.body.textContent).toBe('Agent Asset MarketplaceContact')
    expect(document.querySelectorAll('a[href]')).toHaveLength(0)
    expect(document.querySelectorAll('a')).toHaveLength(2)
  })

  test('uses and closes the same owned preview server when generation fails', async () => {
    const preview = { origin: 'http://127.0.0.1:43125', server: { name: 'preview' } }
    const closeOwnedPreview = vi.fn(async () => {})
    const { browser } = browserFixture(['2', '1'])

    await expect(generateCvPdf({
      pdfPath: await temporaryPdf(Buffer.alloc(0)),
      startOwnedPreview: vi.fn(async () => preview),
      closeOwnedPreview,
      launchBrowser: vi.fn(async () => browser),
    })).rejects.toThrow('expected CV page regions')

    expect(closeOwnedPreview).toHaveBeenCalledWith(preview.server)
  })

  test('preserves both the primary generation failure and cleanup failure', async () => {
    const preview = { origin: 'http://127.0.0.1:43125', server: { name: 'preview' } }
    const { browser } = browserFixture(['2', '1'])

    const failure = await generateCvPdf({
      pdfPath: await temporaryPdf(Buffer.alloc(0)),
      startOwnedPreview: vi.fn(async () => preview),
      closeOwnedPreview: vi.fn(async () => { throw new Error('preview cleanup failed') }),
      launchBrowser: vi.fn(async () => browser),
    }).catch((error: unknown) => error)

    expect(failure).toBeInstanceOf(AggregateError)
    expect((failure as AggregateError).errors.map((error) => (error as Error).message)).toEqual([
      'expected CV page regions ["1", "2"], received ["2", "1"]',
      'preview cleanup failed',
    ])
  })

  test('requires two ordered CV pages and closes every resource after success', async () => {
    const pdfPath = await temporaryPdf(Buffer.alloc(0))
    const preview = { origin: 'http://127.0.0.1:4175', server: { name: 'preview' } }
    const startOwnedPreview = vi.fn(async () => preview)
    const closeOwnedPreview = vi.fn(async () => {})
    const assertNoLinkAnnotations = vi.fn(async () => {})
    const assertPdfPageCount = vi.fn(async () => 2)
    const assertSheetsFit = vi.fn(async () => {})
    const { browser, page } = browserFixture(['1', '2'])

    await generateCvPdf({
      pdfPath,
      startOwnedPreview,
      launchBrowser: vi.fn(async () => browser),
      closeOwnedPreview,
      assertPdfPageCount,
      assertNoLinkAnnotations,
      assertSheetsFit,
    })

    expect(page.goto).toHaveBeenCalledWith('http://127.0.0.1:4175/cv/', { waitUntil: 'networkidle' })
    expect(page.evaluate).toHaveBeenCalledTimes(2)
    expect(page.emulateMedia).toHaveBeenCalledWith({ media: 'print' })
    expect(assertNoLinkAnnotations).toHaveBeenCalledWith(pdfPath)
    expect(assertSheetsFit).toHaveBeenCalledWith(page)
    expect(page.pdf).toHaveBeenCalledWith(expect.objectContaining({
      format: 'A4',
      outline: true,
      path: pdfPath,
      preferCSSPageSize: true,
      printBackground: true,
      tagged: true,
    }))
    expect(await readFile(pdfPath, 'utf8')).toContain('%PDF')
    expect(page.close).toHaveBeenCalledOnce()
    expect(browser.close).toHaveBeenCalledOnce()
    expect(closeOwnedPreview).toHaveBeenCalledWith(preview.server)
  })

  test('closes every resource when CV page regions are invalid', async () => {
    const pdfPath = await temporaryPdf(Buffer.alloc(0))
    const preview = { origin: 'http://127.0.0.1:4175', server: { name: 'preview' } }
    const closeOwnedPreview = vi.fn(async () => {})
    const { browser, page } = browserFixture(['2', '1'])

    await expect(generateCvPdf({
      pdfPath,
      startOwnedPreview: vi.fn(async () => preview),
      launchBrowser: vi.fn(async () => browser),
      closeOwnedPreview,
    })).rejects.toThrow('expected CV page regions ["1", "2"], received ["2", "1"]')

    expect(page.pdf).not.toHaveBeenCalled()
    expect(page.close).toHaveBeenCalledOnce()
    expect(browser.close).toHaveBeenCalledOnce()
    expect(closeOwnedPreview).toHaveBeenCalledWith(preview.server)
  })

})
