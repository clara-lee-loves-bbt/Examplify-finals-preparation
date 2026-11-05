#!/usr/bin/env node
/* Bundles each multi-file app into a single self-contained HTML file that
   runs straight from the filesystem (or any static host):

     index.html          + styles.css + data/*.js + app.js  -> examplify.html
     practice/index.html + practice.css + questions/*.js + practice.js
                                                           -> practice.html

   Usage:  node build.js                                                     */

const fs = require('fs');
const path = require('path');

const root = __dirname;

function bundle(srcHtml, outName) {
  const base = path.dirname(path.join(root, srcHtml));
  const read = (p) => fs.readFileSync(path.join(base, p), 'utf8');
  let html = read(path.basename(srcHtml));

  // Inline the stylesheet.
  html = html.replace(
    /<link rel="stylesheet" href="([^"]+)">/g,
    (_, href) => '<style>\n' + read(href).trimEnd() + '\n</style>'
  );

  // Inline every script, preserving order. A function replacement keeps any
  // `$` sequences in the source from being treated as replacement patterns.
  const scriptTags = [];
  html = html.replace(
    /<script src="([^"]+)"><\/script>/g,
    (_, src) => {
      scriptTags.push(src);
      const banner = '/* ===== ' + src + ' ===== */';
      return '<script>\n' + banner + '\n' + read(src).trimEnd().replace(/<\/script/gi, '<\\/script') + '\n</script>';
    }
  );

  const out = path.join(root, outName);
  fs.writeFileSync(out, html);
  const kb = (fs.statSync(out).size / 1024).toFixed(0);
  console.log('Built ' + outName + ' (' + kb + ' KB), inlined ' + scriptTags.length + ' scripts:');
  scriptTags.forEach((s) => console.log('  · ' + s));
}

bundle('index.html', 'examplify.html');
bundle('practice/index.html', 'practice.html');
