import { existsSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { chromium } from '@playwright/test'
import { PDFDict, PDFDocument, PDFName } from 'pdf-lib'
import { closeOwnedPreview, startOwnedPreview } from './owned-preview.mjs'

export const MAX_CV_PDF_BYTES = 512 * 1024

const EXPECTED_PAGE_REGIONS = ['1', '2']
const scriptDirectory = path.dirname(fileURLToPath(import.meta.url))
const siteConfig = JSON.parse(readFileSync(path.join(scriptDirectory, '..', 'site.config.json'), 'utf8'))
const activeBasePath = siteConfig.profiles[siteConfig.activeProfile].basePath

function formatPageRegions(pageRegions) {
  return `[${pageRegions.map((pageRegion) => JSON.stringify(pageRegion)).join(', ')}]`
}

export function assertCvPdf(pdfPath, maxBytes = MAX_CV_PDF_BYTES) {
  if (!existsSync(pdfPath)) {
    throw new Error(`CV PDF is missing: ${pdfPath}`)
  }

  const pdfBytes = statSync(pdfPath).size
  if (pdfBytes === 0) {
    throw new Error('CV PDF is empty')
  }
  const pdfContents = readFileSync(pdfPath)
  if (!pdfContents.subarray(0, 4).equals(Buffer.from('%PDF'))) {
    throw new Error('CV PDF does not start with %PDF')
  }
  if (pdfBytes > maxBytes) {
    throw new Error(`CV PDF is ${pdfBytes} bytes; budget is ${maxBytes} bytes`)
  }

  return pdfBytes
}

export async function assertCvPdfPageCount(pdfPath) {
  const pdf = await PDFDocument.load(readFileSync(pdfPath).toString('base64'))
  const pageCount = pdf.getPageCount()
  if (pageCount !== 2) {
    throw new Error(`CV PDF must have exactly 2 pages, received ${pageCount}`)
  }
  return pageCount
}

export async function assertCvPdfHasNoLinkAnnotations(pdfPath) {
  const pdf = await PDFDocument.load(readFileSync(pdfPath).toString('base64'))
  const linkAnnotations = pdf.getPages().flatMap((page) => {
    const annotations = page.node.Annots()
    if (annotations === undefined) return []
    return Array.from({ length: annotations.size() }, (_, index) =>
      annotations.lookup(index, PDFDict),
    ).filter((annotation) => annotation.get(PDFName.of('Subtype'))?.toString() === '/Link')
  })
  if (linkAnnotations.length > 0) {
    throw new Error(`CV PDF contains ${linkAnnotations.length} link annotation(s)`)
  }
}

export async function removePdfLinkTargets(page) {
  await page.evaluate(() => {
    for (const link of document.querySelectorAll('a[href]')) link.removeAttribute('href')
  })
}

async function assertCvSheetsFit(page) {
  const layout = await page.evaluate(() => {
    const sheets = Array.from(document.querySelectorAll('[data-cv-page]'), (sheet) => {
      const rect = sheet.getBoundingClientRect()
      const style = getComputedStyle(sheet)
      const contentBottom = Math.max(...Array.from(sheet.children, (child) => child.getBoundingClientRect().bottom))
      const usableBottom = rect.bottom - Number.parseFloat(style.paddingBottom)
      return {
        page: sheet.getAttribute('data-cv-page'),
        height: rect.height,
        overflow: contentBottom > usableBottom + 1,
      }
    })
    return { sheets, documentHeight: document.documentElement.scrollHeight }
  })
  const expectedSheetHeight = 297 * 96 / 25.4
  if (
    layout.sheets.length !== 2 ||
    layout.sheets.some((sheet) => sheet.overflow || Math.abs(sheet.height - expectedSheetHeight) > 1) ||
    layout.documentHeight > expectedSheetHeight * 2 + 4
  ) {
    throw new Error(`CV print sheets do not fit the two-page A4 layout: ${JSON.stringify(layout)}`)
  }
}

export async function generateCvPdf({
  clientRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'),
  pdfPath = path.join(clientRoot, 'dist', 'harley-bartles-cv.pdf'),
  startOwnedPreview: openPreview = startOwnedPreview,
  closeOwnedPreview: closePreview = closeOwnedPreview,
  launchBrowser = () => chromium.launch(),
  assertPdfPageCount = assertCvPdfPageCount,
  assertNoLinkAnnotations = assertCvPdfHasNoLinkAnnotations,
  assertSheetsFit = assertCvSheetsFit,
} = {}) {
  let preview
  let browser
  let page

  let result
  let primaryError
  try {
    preview = await openPreview(clientRoot)
    browser = await launchBrowser()
    page = await browser.newPage()

    await page.goto(`${preview.origin}${activeBasePath === '/' ? '' : activeBasePath.slice(0, -1)}/cv/`, { waitUntil: 'networkidle' })
    const pageRegions = await page.evaluate(async () => {
      await document.fonts.ready
      return Array.from(document.querySelectorAll('[data-cv-page]')).map((element) => element.getAttribute('data-cv-page'))
    })

    if (JSON.stringify(pageRegions) !== JSON.stringify(EXPECTED_PAGE_REGIONS)) {
      throw new Error(
        `expected CV page regions ${formatPageRegions(EXPECTED_PAGE_REGIONS)}, received ${formatPageRegions(pageRegions)}`,
      )
    }

    await page.emulateMedia({ media: 'print' })
    await removePdfLinkTargets(page)
    await assertSheetsFit(page)
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      preferCSSPageSize: true,
      printBackground: true,
      tagged: true,
      outline: true,
    })

    const pdfBytes = assertCvPdf(pdfPath)
    const pdfPages = await assertPdfPageCount(pdfPath)
    await assertNoLinkAnnotations(pdfPath)
    result = { pdfPath, pdfBytes, pdfPages }
  } catch (error) {
    primaryError = error
  }

  const cleanupErrors = []
  for (const cleanup of [() => page?.close(), () => browser?.close(), () => closePreview(preview?.server)]) {
    try { await cleanup() } catch (error) { cleanupErrors.push(error) }
  }
  if (primaryError !== undefined && cleanupErrors.length > 0) {
    throw new AggregateError([primaryError, ...cleanupErrors], 'CV PDF generation and cleanup failed')
  }
  if (primaryError !== undefined) throw primaryError
  if (cleanupErrors.length > 0) throw new AggregateError(cleanupErrors, 'CV PDF cleanup failed')
  return result
}

const scriptPath = process.argv[1] === undefined ? '' : pathToFileURL(path.resolve(process.argv[1])).href

if (scriptPath === import.meta.url) {
  const result = await generateCvPdf()
  console.log(`[generate-cv-pdf] wrote ${result.pdfPath} (${result.pdfBytes} bytes, ${result.pdfPages} pages)`)
}
