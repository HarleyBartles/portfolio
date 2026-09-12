import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { PDFDocument } from 'pdf-lib'
// @ts-expect-error The production build utility is intentionally plain ESM for direct Node execution.
import {
  assertCvPdf,
  assertCvPdfPageCount,
  generateCvPdf,
  rewritePreviewLinksForPdf,
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

  test('rejects a PDF containing a localhost link target', async () => {
    const pdfPath = await temporaryPdf(Buffer.from('%PDF\n/URI (http://127.0.0.1:4173/portfolio/about#contact)'))

    expect(() => assertCvPdf(pdfPath)).toThrow('CV PDF contains a localhost link target')
  })

  test('rejects a generated CV that is not exactly two pages', async () => {
    const document = await PDFDocument.create()
    document.addPage()
    document.addPage()
    document.addPage()
    const pdfPath = await temporaryPdf(await document.save())

    await expect(assertCvPdfPageCount(pdfPath, 2)).rejects.toThrow(
      'CV PDF has 3 pages; expected 2',
    )
  })
})

describe('generateCvPdf', () => {
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

  test('rewrites preview-server links to the canonical public origin before printing', async () => {
    document.head.innerHTML = '<link rel="canonical" href="https://harleybartles.com/cv">'
    document.body.innerHTML = '<a href="http://127.0.0.1:4173/about#contact">Contact</a>'
    const page = {
      evaluate: vi.fn(async (callback: (origin: string) => string[], origin: string) => callback(origin)),
    }

    await rewritePreviewLinksForPdf(page, 'http://127.0.0.1:4173')

    expect(document.querySelector('a')).toHaveAttribute(
      'href',
      'https://harleybartles.com/about#contact',
    )
  })

  test('requires two ordered CV pages and closes every resource after success', async () => {
    const pdfPath = await temporaryPdf(Buffer.alloc(0))
    const preview = { origin: 'http://127.0.0.1:4175', server: { name: 'preview' } }
    const startOwnedPreview = vi.fn(async () => preview)
    const closeOwnedPreview = vi.fn(async () => {})
    const rewriteLinksForPdf = vi.fn(async () => {})
    const assertPdfPageCount = vi.fn(async () => 2)
    const { browser, page } = browserFixture(['1', '2'])

    await generateCvPdf({
      pdfPath,
      startOwnedPreview,
      launchBrowser: vi.fn(async () => browser),
      closeOwnedPreview,
      rewriteLinksForPdf,
      assertPdfPageCount,
    })

    expect(page.goto).toHaveBeenCalledWith('http://127.0.0.1:4175/cv/', { waitUntil: 'networkidle' })
    expect(page.evaluate).toHaveBeenCalledOnce()
    expect(rewriteLinksForPdf).toHaveBeenCalledWith(page, 'http://127.0.0.1:4175')
    expect(page.emulateMedia).toHaveBeenCalledWith({ media: 'print' })
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
