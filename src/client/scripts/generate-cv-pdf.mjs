import { spawn } from 'node:child_process'
import { once } from 'node:events'
import { existsSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { chromium } from '@playwright/test'

export const MAX_CV_PDF_BYTES = 512 * 1024

const DEFAULT_PREVIEW_URL = 'http://127.0.0.1:4173'
const EXPECTED_PAGE_REGIONS = ['1', '2']

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
  if (!readFileSync(pdfPath).subarray(0, 4).equals(Buffer.from('%PDF'))) {
    throw new Error('CV PDF does not start with %PDF')
  }
  if (pdfBytes > maxBytes) {
    throw new Error(`CV PDF is ${pdfBytes} bytes; budget is ${maxBytes} bytes`)
  }

  return pdfBytes
}

function startPreviewProcess(clientRoot) {
  const command = process.platform === 'win32' ? (process.env.ComSpec ?? 'cmd.exe') : 'npm'
  const previewArguments = process.platform === 'win32'
    ? ['/d', '/s', '/c', 'npm.cmd run preview:test']
    : ['run', 'preview:test']

  return spawn(command, previewArguments, {
    cwd: clientRoot,
    stdio: 'inherit',
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

async function stopPreviewProcess(previewProcess) {
  if (previewProcess === undefined || previewProcess.exitCode !== null) {
    return
  }

  if (process.platform === 'win32' && previewProcess.pid !== undefined) {
    const cleanup = spawn('taskkill.exe', ['/pid', String(previewProcess.pid), '/t', '/f'], { stdio: 'ignore' })
    await once(cleanup, 'exit')
    return
  }

  const exited = once(previewProcess, 'exit')
  previewProcess.kill()
  await exited
}

export async function generateCvPdf({
  clientRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'),
  pdfPath = path.join(clientRoot, 'dist', 'harley-bartles-cv.pdf'),
  previewUrl = DEFAULT_PREVIEW_URL,
  startPreview = startPreviewProcess,
  waitForPreview = waitForPreviewServer,
  launchBrowser = () => chromium.launch(),
  stopPreview = stopPreviewProcess,
} = {}) {
  let previewProcess
  let browser
  let page

  try {
    previewProcess = await startPreview(clientRoot)
    await waitForPreview(previewUrl, previewProcess)
    browser = await launchBrowser()
    page = await browser.newPage()

    await page.goto(`${previewUrl}/portfolio/cv/`, { waitUntil: 'networkidle' })
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
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      preferCSSPageSize: true,
      printBackground: true,
      tagged: true,
      outline: true,
    })

    const pdfBytes = assertCvPdf(pdfPath)
    return { pdfPath, pdfBytes }
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
  console.log(`[generate-cv-pdf] wrote ${result.pdfPath} (${result.pdfBytes} bytes)`)
}
