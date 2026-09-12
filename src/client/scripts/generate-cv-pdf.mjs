import { existsSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { chromium } from '@playwright/test'
import { PDFDocument } from 'pdf-lib'
import { closeOwnedPreview, startOwnedPreview } from './owned-preview.mjs'

export const MAX_CV_PDF_BYTES = 512 * 1024

const EXPECTED_PAGE_REGIONS = ['1', '2']
const LOCALHOST_URL_PATTERN = /https?:\/\/(?:127\.0\.0\.1|localhost)(?::\d+)?(?:[/?#]|$)/i
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
  if (LOCALHOST_URL_PATTERN.test(pdfContents.toString('latin1'))) {
    throw new Error('CV PDF contains a localhost link target')
  }
  if (pdfBytes > maxBytes) {
    throw new Error(`CV PDF is ${pdfBytes} bytes; budget is ${maxBytes} bytes`)
  }

  return pdfBytes
}

export async function assertCvPdfPageCount(pdfPath, expectedPageCount = 2) {
  const pdf = await PDFDocument.load(readFileSync(pdfPath).toString('base64'))
  const pageCount = pdf.getPageCount()
  if (pageCount !== expectedPageCount) {
    throw new Error(`CV PDF has ${pageCount} pages; expected ${expectedPageCount}`)
  }
  return pageCount
}

export async function rewritePreviewLinksForPdf(page, previewUrl) {
  const previewOrigin = new URL(previewUrl).origin
  const linkTargets = await page.evaluate((localOrigin) => {
    const canonical = document.querySelector('link[rel="canonical"]')?.href
    if (canonical === undefined) {
      throw new Error('CV PDF requires a canonical URL before links can be rewritten')
    }

    const publicOrigin = new URL(canonical).origin
    for (const link of document.querySelectorAll('a[href]')) {
      const target = new URL(link.href)
      if (target.origin === localOrigin) {
        link.href = `${publicOrigin}${target.pathname}${target.search}${target.hash}`
      }
    }

    return Array.from(document.querySelectorAll('a[href]'), (link) => link.href)
  }, previewOrigin)

  if (linkTargets.some((linkTarget) => LOCALHOST_URL_PATTERN.test(linkTarget))) {
    throw new Error('CV PDF still contains a localhost link target after link rewriting')
  }
}

export async function generateCvPdf({
  clientRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'),
  pdfPath = path.join(clientRoot, 'dist', 'harley-bartles-cv.pdf'),
  startOwnedPreview: openPreview = startOwnedPreview,
  closeOwnedPreview: closePreview = closeOwnedPreview,
  launchBrowser = () => chromium.launch(),
  rewriteLinksForPdf = rewritePreviewLinksForPdf,
  assertPdfPageCount = assertCvPdfPageCount,
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

    await rewriteLinksForPdf(page, preview.origin)
    await page.emulateMedia({ media: 'print' })
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
