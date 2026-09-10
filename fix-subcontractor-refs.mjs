import { readFileSync, writeFileSync } from 'fs';

function fixFile(filePath, label) {
  let content = readFileSync(filePath, 'utf8');
  const before = content;

  // 1. Commercial service tagline
  content = content.replace(
    "tagline: 'Minimal disruption scheduling. Crew-owned, not subcontracted.'",
    "tagline: 'Minimal disruption scheduling. After-hours and weekend availability.'"
  );

  // 2. Project mgmt blurb 'No subcontractors. No volume rushing.'
  content = content.replace('No subcontractors. No volume rushing.`', 'No volume rushing.`');

  // 3. whyUs opening for exterior painting
  content = content.replace(
    'whyUs: `Our crew is owned, not subcontracted. That matters more than most homeowners realize &mdash; it means the same people who show up day one are there day five. No phone-tag with subs, no quality drop-off when we get busy and send whoever is available.',
    'whyUs: `The same crew that shows up on day one is there on day five. No quality drop-off when we get busy, no sending whoever is available.'
  );

  // 4. All 'owned crew — not subcontractors.' in related services descs (em dash unicode)
  content = content.replaceAll(
    'owned crew \u2014 not subcontractors.',
    'same-day response.'
  );

  // 5. Multi-family commercial desc
  content = content.replace(
    'We bring owned crews &mdash; not subs &mdash; to every phase of a multi-family project.',
    'We bring the same crew to every phase of a multi-family project, so color consistency and quality standards hold across every building.'
  );

  // 6. Commercial whyUs paragraph
  content = content.replace(
    'whyUs: `Commercial painting bids are easy to get. Reliable execution is harder to find. Most commercial painting contractors in Northern Colorado use subcontractors, which means the crew on day one may not be the crew on day five. Quality variation and scheduling gaps are the result.\n\nTimnath Painting brings an owned crew to every commercial project. The same people who assess the job are the ones who do the work. We do not pass commercial projects off to subs when we get busy.',
    'whyUs: `Commercial painting bids are easy to get. Reliable execution is harder to find. The crew that assesses your project is the crew that does the work. The same people show up on day one and day five \u2014 no quality variation, no scheduling gaps.'
  );

  // 7. Commercial FAQ multi-building
  content = content.replace(
    'We bring owned crews to every phase &mdash; not subcontractors &mdash; so color consistency and quality standards hold across every building.',
    'We bring the same crew to every phase so color consistency and quality standards hold across every building.'
  );

  // 8. Windsor intro
  content = content.replace(
    'that we bring to every project. No subcontractors. No volume rushing. Premium Sherwin-Williams',
    'that we bring to every project. No volume rushing. Premium Sherwin-Williams'
  );

  // 9. Fort Collins intro
  content = content.replace(
    '$1M general liability. No subcontractors.`',
    '$1M general liability.`'
  );

  // 10. patch-exterior-content specific: project mgmt blurb variant
  content = content.replace('No subcontractors. No volume rushing.`,', 'No volume rushing.`,');
  
  // 11. patch-exterior-content whyUs (same text as _build-data but may vary slightly)
  content = content.replace(
    `whyUs: \`Our crew is owned, not subcontracted. That matters more than most homeowners realize \u2014 it means the same people who show up day one are there day five. No phone-tag with subs, no quality drop-off when we get busy and send whoever is available.`,
    `whyUs: \`The same crew that shows up on day one is there on day five. No quality drop-off when we get busy, no sending whoever is available.`
  );

  writeFileSync(filePath, content, 'utf8');

  // Verify
  const remaining = content.split('\n').filter(l => l.toLowerCase().includes('subcontract'));
  if (remaining.length === 0) {
    console.log(`[${label}] ✓ All subcontractor references removed`);
  } else {
    console.log(`[${label}] ⚠ Still found ${remaining.length} line(s):`);
    remaining.forEach(l => console.log('  ' + l.trim().substring(0, 120)));
  }
}

fixFile('C:\\Users\\KillerGrowth\\.openclaw\\workspace\\sites\\timnath-painting\\_build-data.js', '_build-data.js');
fixFile('C:\\Users\\KillerGrowth\\.openclaw\\workspace\\sites\\timnath-painting\\patch-exterior-content.js', 'patch-exterior-content.js');

console.log('Done.');
