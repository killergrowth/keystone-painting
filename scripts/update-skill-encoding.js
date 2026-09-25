'use strict';
const fs = require('fs');
const path = require('path');

const skillPath = path.join('C:\\Users\\KillerGrowth\\.openclaw\\workspace\\skills\\media-to-web-content\\SKILL.md');
let content = fs.readFileSync(skillPath, 'utf8');

const oldText = '### Build template rules';
const newText = `### Encoding rules (CRITICAL -- do this every time)

Claude returns smart quotes and em-dashes as Unicode. PowerShell mangles them into mojibake when writing files. Fix at two points:

**1. In generate-project-content.js -- sanitize on write before saving JSON:**
\`\`\`js
const cleanJson = JSON.stringify(output, null, 2)
  .replace(/[\\u2018\\u2019]/g, "'")
  .replace(/[\\u201C\\u201D]/g, '"')
  .replace(/\\u2013/g, '-')
  .replace(/\\u2014/g, '--')
  .replace(/\\u2026/g, '...')
  .replace(/\\u00A0/g, ' ');
fs.writeFileSync(outputPath, cleanJson, 'utf8');
\`\`\`

**2. In build-projects.js -- sanitize at build time (catches anything that slipped through):**
\`\`\`js
function sanitize(str) {
  if (!str) return str;
  return str
    .replace(/[\\u2018\\u2019]/g, '&rsquo;')
    .replace(/[\\u201C\\u201D]/g, '&rdquo;')
    .replace(/\\u2013/g, '&ndash;')
    .replace(/\\u2014/g, '&mdash;')
    .replace(/\\u2026/g, '&hellip;')
    .replace(/\\u00A0/g, '&nbsp;')
    .replace(/[^\\x00-\\x7F]/g, c => '&#' + c.charCodeAt(0) + ';');
}
\`\`\`
Run sanitize() on p.article and all FAQ strings before rendering. Run on excerpt text before stripping tags for index cards too.

**If existing JSONs are already corrupted:** run scripts/fix-json-encoding.js -- fixes three-byte UTF-8 sequences misread as Latin-1.

### Build template rules`;

if (content.includes(oldText)) {
  content = content.replace(oldText, newText);
  fs.writeFileSync(skillPath, content, 'utf8');
  console.log('Skill updated.');
} else {
  console.log('ERROR: anchor text not found.');
}
