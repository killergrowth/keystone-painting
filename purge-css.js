'use strict';
/**
 * purge-css.js
 * Runs PurgeCSS against built HTML to strip unused rules from wallox.css and keystone-custom.css.
 * Backs up originals before overwriting.
 */
const { PurgeCSS } = require('purgecss');
const fs = require('fs');
const path = require('path');

const DIST = path.join(__dirname, 'dist');

const targets = [
  { src: path.join(DIST, 'assets/css/wallox.css'),        out: path.join(DIST, 'assets/css/wallox.css') },
  { src: path.join(DIST, 'assets/css/keystone-custom.css'),out: path.join(DIST, 'assets/css/keystone-custom.css') },
];

const BACKUP_DIR = path.join(DIST, 'assets/css/_backups');
if (!fs.existsSync(BACKUP_DIR)) fs.mkdirSync(BACKUP_DIR);

// Safelist: classes added dynamically by JS (Owl, WOW, wallox theme, etc.)
// These patterns prevent PurgeCSS from stripping rules needed at runtime
const safelist = {
  standard: [
    'show', 'active', 'in', 'out', 'fade', 'collapse', 'collapsed',
    'animated', 'wow', 'open', 'disabled', 'loading', 'loaded',
  ],
  deep: [/^owl-/, /^wallox-/, /^wow/, /^animated/, /^slick-/, /^jarallax/,
         /^magnific-/, /^mfp-/, /^select2/, /^bootstrap-select/, /^dropdown/,
         /^modal/, /^tooltip/, /^popover/, /^carousel/, /^tab-/, /^nav-/,
         /^sticky/, /^mobile-nav/, /^main-menu/, /^preloader/, /^progress-/,
         /^counter-/, /^odometer/, /^circle-progress/, /^nouislider/,
  ],
  greedy: [/data-wow/, /.*--\w+/],
};

async function run() {
  // Collect all HTML content files
  const htmlFiles = [];
  function walk(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, e.name);
      if (e.isDirectory() && e.name !== 'assets') walk(full);
      else if (e.isFile() && e.name.endsWith('.html')) htmlFiles.push(full);
    }
  }
  walk(DIST);

  for (const t of targets) {
    const before = Math.round(fs.statSync(t.src).size / 1024);
    const backup = path.join(BACKUP_DIR, path.basename(t.src));
    if (!fs.existsSync(backup)) fs.copyFileSync(t.src, backup);

    const result = await new PurgeCSS().purge({
      content: htmlFiles.map(f => ({ raw: fs.readFileSync(f, 'utf8'), extension: 'html' })),
      css: [{ raw: fs.readFileSync(t.src, 'utf8') }],
      safelist,
      variables: true,
    });

    fs.writeFileSync(t.out, result[0].css, 'utf8');
    const after = Math.round(fs.statSync(t.out).size / 1024);
    console.log(`${path.basename(t.src)}: ${before}KB → ${after}KB (removed ${before - after}KB)`);
  }
  console.log('\n✅ PurgeCSS complete.');
}

run().catch(console.error);
