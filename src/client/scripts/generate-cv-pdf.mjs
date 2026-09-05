import { spawn } from 'node:child_process'
import { once } from 'node:events'
import { existsSync, readFileSync, statSync } from 'node:fs'
import { createServer } from 'node:net'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { chromium } from '@playwright/test'
import { PDFDocument } from 'pdf-lib'

export const MAX_CV_PDF_BYTES = 512 * 1024

const DEFAULT_PREVIEW_URL = 'http://127.0.0.1:4175'
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

export function startPreviewProcess(
  clientRoot,
  { platform = process.platform, spawnProcess = spawn } = {},
) {
  const command = platform === 'win32' ? (process.env.ComSpec ?? 'cmd.exe') : 'npm'
  const previewArguments = platform === 'win32'
    ? ['/d', '/s', '/c', 'npm.cmd run preview:pdf']
    : ['run', 'preview:pdf']

  return spawnProcess(command, previewArguments, {
    cwd: clientRoot,
    detached: platform !== 'win32',
    stdio: 'inherit',
  })
}

export async function assertPreviewPortAvailable(previewUrl) {
  const url = new URL(previewUrl)
  const host = url.hostname
  const port = Number(url.port || (url.protocol === 'https:' ? 443 : 80))

  await new Promise((resolve, reject) => {
    const server = createServer()

    server.once('error', () => {
      reject(new Error(`CV PDF preview port is already in use: ${host}:${port}`))
    })
    server.listen(port, host, () => {
      server.close((error) => {
        if (error === undefined) {
          resolve()
          return
        }
        reject(error)
      })
    })
  })
}

async function waitForPreviewServer(previewUrl, previewProcess, timeoutMs = 30_000) {
  const deadline = Date.now() + timeoutMs

  while (Date.now() < deadline) {
    if (previewProcess.exitCode !== null) {
      throw new Error(`CV PDF preview exited before it was ready (exit code ${previewProcess.exitCode})`)
    }

    try {
      const response = await fetch(previewUrl)
      if (response.ok) {
        return
      }
    } catch {
      // The polling loop owns readiness; the preview process may still be starting.
    }

    await new Promise((resolve) => setTimeout(resolve, 100))
  }

  throw new Error(`CV PDF preview did not become ready within ${timeoutMs}ms`)
}

export async function stopPreviewProcess(
  previewProcess,
  { platform = process.platform, spawnProcess = spawn, terminateProcess = process.kill } = {},
) {
  if (previewProcess === undefined || previewProcess.exitCode !== null) {
    return
  }

  if (platform === 'win32' && previewProcess.pid !== undefined) {
    const cleanup = spawnProcess('taskkill.exe', ['/pid', String(previewProcess.pid), '/t', '/f'], { stdio: 'ignore' })
    await once(cleanup, 'exit')
    return
  }

  const exited = once(previewProcess, 'exit')
  if (previewProcess.pid !== undefined) {
    terminateProcess(-previewProcess.pid, 'SIGTERM')
  } else {
    previewProcess.kill('SIGTERM')
  }
  await exited
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
  previewUrl = DEFAULT_PREVIEW_URL,
  assertPreviewPort = assertPreviewPortAvailable,
  startPreview = startPreviewProcess,
  waitForPreview = waitForPreviewServer,
  launchBrowser = () => chromium.launch(),
  stopPreview = stopPreviewProcess,
  rewriteLinksForPdf = rewritePreviewLinksForPdf,
  assertPdfPageCount = assertCvPdfPageCount,
} = {}) {
  let previewProcess
  let browser
  let page

  try {
    await assertPreviewPort(previewUrl)
    previewProcess = await startPreview(clientRoot)
    await waitForPreview(previewUrl, previewProcess)
    browser = await launchBrowser()
    page = await browser.newPage()

    await page.goto(`${previewUrl}${activeBasePath === '/' ? '' : activeBasePath.slice(0, -1)}/cv/`, { waitUntil: 'networkidle' })
    const pageRegions = await page.evaluate(async () => {
      await document.fonts.ready
      return Array.from(document.querySelectorAll('[data-cv-page]')).map((element) => element.getAttribute('data-cv-page'))
    })

    if (JSON.stringify(pageRegions) !== JSON.stringify(EXPECTED_PAGE_REGIONS)) {
      throw new Error(
        `expected CV page regions ${formatPageRegions(EXPECTED_PAGE_REGIONS)}, received ${formatPageRegions(pageRegions)}`,
      )
    }

    await rewriteLinksForPdf(page, previewUrl)
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
    return { pdfPath, pdfBytes, pdfPages }
  } finally {
    try {
      await page?.close()
    } finally {
      try {
        await browser?.close()
      } finally {
        await stopPreview(previewProcess)
      }
    }
  }
}

const scriptPath = process.argv[1] === undefined ? '' : pathToFileURL(path.resolve(process.argv[1])).href

if (scriptPath === import.meta.url) {
  const result = await generateCvPdf()
  console.log(`[generate-cv-pdf] wrote ${result.pdfPath} (${result.pdfBytes} bytes, ${result.pdfPages} pages)`)
}
