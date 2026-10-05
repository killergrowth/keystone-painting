'use strict';
const https = require('https');
const fs = require('fs');

const creds = fs.readFileSync('C:/Users/KillerGrowth/.openclaw/workspace/References/credentials.md', 'utf8');
const token = creds.match(/ey[a-zA-Z0-9._-]{20,}/)[0];

function monday(query) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ query });
    const req = https.request({
      hostname: 'api.monday.com',
      path: '/v2',
      method: 'POST',
      headers: { 'Authorization': token, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) },
    }, res => {
      let d = ''; res.on('data', c => d += c); res.on('end', () => resolve(JSON.parse(d)));
    });
    req.on('error', reject); req.write(body); req.end();
  });
}

async function main() {
  // Get Keystone subitems to find Sept
  const res = await monday(`{ items(ids: [12705492508]) { subitems { id name } } }`);
  const subitems = res.data.items[0].subitems;
  console.log('Keystone subitems:', JSON.stringify(subitems, null, 2));

  // Find Sept
  const sept = subitems.find(s => s.name.toLowerCase().includes('sept') || s.name === '9' || s.name.includes('Sep'));
  if (!sept) { console.log('No Sept subitem found — may need to create it'); return; }
  console.log('Sept subitem:', sept.id, sept.name);

  // Read existing logs
  const read = await monday(`{ items(ids: [${sept.id}]) { column_values(ids: ["text_mm5w2gq"]) { text } } }`);
  const existing = read.data.items[0].column_values[0].text || '';
  console.log('Existing logs:', existing || '(empty)');

  const entry = `2026-09-24 - Brickley Jr: Major updates to Keystone Painting website. Built and deployed Project Highlights system: 3 individual project pages (exterior vinyl flip, fence staining, whole home interior repaint) + /projects/ index landing page with cards. Fixed encoding issues (garbled em-dashes) in project content. Added header nav dropdown under About with About Us, Project Highlights, and How It Works. Fixed page load animation on Gallery and Blog pages to match rest of site. Updated pre-footer CTA section on all pages - replaced email button with Get A Free Quote button linking to quote page.`;

  const combined = existing ? existing + '\n' + entry : entry;
  const escaped = combined.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');

  const mut = await monday(`mutation { change_simple_column_value(item_id: ${sept.id}, board_id: 18424933530, column_id: "text_mm5w2gq", value: "${escaped}") { id } }`);
  console.log('Log result:', JSON.stringify(mut));
}
main().catch(console.error);
