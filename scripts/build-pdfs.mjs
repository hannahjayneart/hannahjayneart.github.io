// scripts/build-pdfs.mjs
//
// Render the two resume source HTML files to PDF using headless Chromium.
// Also generate favicon-32.png from favicon.svg.
// Output files land at the repo root so GitHub Pages serves them directly.
// Run via: npm run build:pdfs

import { chromium } from 'playwright';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';
import { stat } from 'node:fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = resolve(__dirname, '..');

const pdfTargets = [
  { src: 'src/resume-color.html', out: 'resume.pdf' },
  { src: 'src/resume-bw.html',    out: 'resume-print.pdf' },
];

const browser = await chromium.launch();
try {
  // Generate the two resume PDFs.
  for (const { src, out } of pdfTargets) {
    const srcPath = resolve(repoRoot, src);
    const outPath = resolve(repoRoot, out);
    const page = await browser.newPage();

    console.log(`→ Rendering ${src}`);
    await page.goto(pathToFileURL(srcPath).href);
    await page.evaluate(() => document.fonts.ready);

    await page.pdf({
      path: outPath,
      format: 'Letter',
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      printBackground: true,
      preferCSSPageSize: true,
    });

    const { size } = await stat(outPath);
    console.log(`  ✓ ${out} (${(size / 1024).toFixed(1)} KB)`);

    await page.close();
  }

  // Generate favicon-32.png from favicon.svg by screenshotting the SVG
  // at 32x32 in headless Chromium.
  const faviconSrc = resolve(repoRoot, 'favicon.svg');
  const faviconOut = resolve(repoRoot, 'favicon-32.png');
  const page = await browser.newPage({ viewport: { width: 32, height: 32 } });

  console.log(`→ Rendering favicon.svg`);
  await page.goto(pathToFileURL(faviconSrc).href);
  await page.screenshot({ path: faviconOut, omitBackground: false, type: 'png', clip: { x: 0, y: 0, width: 32, height: 32 } });

  const { size: faviconSize } = await stat(faviconOut);
  console.log(`  ✓ favicon-32.png (${faviconSize} bytes)`);

  await page.close();
} finally {
  await browser.close();
}

console.log('\nDone. Verify the PDFs and PNG visually before committing.');
