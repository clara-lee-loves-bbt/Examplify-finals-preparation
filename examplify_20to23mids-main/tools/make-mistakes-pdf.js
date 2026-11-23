#!/usr/bin/env node
/* Prints mistakes.html to mistakes.pdf with headless Chrome or Edge, using the
   page's own print layout (every answer shown, grouped by lecture, A4).
   Run `node build.js` first so mistakes.html is current.

   Usage:  node tools/make-mistakes-pdf.js            */
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { pathToFileURL } = require('url');

const root = path.join(__dirname, '..');
const page = path.join(root, 'mistakes.html');
const out = path.join(root, 'mistakes.pdf');

const candidates = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'
].filter(Boolean);
const browser = candidates.find((p) => fs.existsSync(p));
if (!browser) { console.error('No Chrome or Edge found; set CHROME_PATH.'); process.exit(1); }
if (!fs.existsSync(page)) { console.error('mistakes.html not found; run node build.js first.'); process.exit(1); }

const url = pathToFileURL(page).href + '?print';
const res = spawnSync(browser, [
  '--headless=new', '--disable-gpu', '--no-pdf-header-footer', '--print-to-pdf-no-header',
  '--virtual-time-budget=4000', '--print-to-pdf=' + out, url
], { encoding: 'utf8', timeout: 120000 });

if (!fs.existsSync(out)) {
  console.error('PDF was not produced.', res.stderr || res.error || '');
  process.exit(1);
}
const kb = (fs.statSync(out).size / 1024).toFixed(0);
console.log('Wrote mistakes.pdf (' + kb + ' KB) with ' + path.basename(browser));
