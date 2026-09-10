import { readFileSync, writeFileSync } from 'fs';

// Fix _build-data.js commercial whyUs (multiline)
{
  const filePath = 'C:\\Users\\KillerGrowth\\.openclaw\\workspace\\sites\\timnath-painting\\_build-data.js';
  let content = readFileSync(filePath, 'utf8');
  
  const oldText = `    whyUs: \`Commercial painting bids are easy to get. Reliable execution is harder to find. Most commercial painting contractors in Northern Colorado use subcontractors, which means the crew on day one may not be the crew on day five. Quality variation and scheduling gaps are the result.\n\nTimnath Painting brings an owned crew to every commercial project. The same people who assess the job are the ones who do the work. We do not pass commercial projects off to subs when we get busy.`;
  const newText = `    whyUs: \`Commercial painting bids are easy to get. Reliable execution is harder to find. The crew that assesses your project is the crew that does the work. The same people show up on day one and day five \u2014 no quality variation, no scheduling gaps.`;
  
  if (content.includes(oldText)) {
    content = content.replace(oldText, newText);
    writeFileSync(filePath, content, 'utf8');
    console.log('_build-data.js commercial whyUs: fixed');
  } else {
    // Try to find what's actually there
    const idx = content.indexOf('Commercial painting bids are easy to get');
    if (idx !== -1) {
      console.log('Found at idx ' + idx + ':');
      console.log(JSON.stringify(content.substring(idx - 15, idx + 300)));
    }
  }
  
  // Verify
  const remaining = content.split('\n').filter(l => l.toLowerCase().includes('subcontract'));
  if (remaining.length === 0) {
    console.log('_build-data.js: clean');
  } else {
    console.log('_build-data.js still has ' + remaining.length + ' line(s)');
    remaining.forEach(l => console.log('  ' + l.trim().substring(0, 120)));
  }
}

// Fix patch-exterior-content.js
{
  const filePath = 'C:\\Users\\KillerGrowth\\.openclaw\\workspace\\sites\\timnath-painting\\patch-exterior-content.js';
  let content = readFileSync(filePath, 'utf8');
  
  // Line 38: has \r\n and escaped backtick
  content = content.replace(
    'No subcontractors. No volume rushing.\\`,',
    'No volume rushing.\\`,'
  );
  
  // Line 46: escaped backtick and \u2014 literal
  // Check what's actually there
  const idx = content.indexOf('Our crew is owned, not subcontracted');
  if (idx !== -1) {
    const snippet = content.substring(idx - 20, idx + 200);
    console.log('patch-exterior whyUs snippet:', JSON.stringify(snippet));
    
    // The file has escaped backtick \` and literal \u2014
    content = content.replace(
      /whyUs: \\`Our crew is owned, not subcontracted\. That matters more than most homeowners realize [^\n]+No phone-tag with subs, no quality drop-off when we get busy and send whoever is available\./,
      'whyUs: \\`The same crew that shows up on day one is there on day five. No quality drop-off when we get busy, no sending whoever is available.'
    );
  }
  
  writeFileSync(filePath, content, 'utf8');
  
  // Verify
  const remaining = content.split('\n').filter(l => l.toLowerCase().includes('subcontract'));
  if (remaining.length === 0) {
    console.log('patch-exterior-content.js: clean');
  } else {
    console.log('patch-exterior-content.js still has ' + remaining.length + ' line(s)');
    remaining.forEach(l => console.log('  ' + l.trim().substring(0, 120)));
  }
}
