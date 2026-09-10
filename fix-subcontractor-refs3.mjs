import { readFileSync, writeFileSync } from 'fs';

// Fix _build-data.js commercial whyUs (CRLF line endings)
{
  const filePath = 'C:\\Users\\KillerGrowth\\.openclaw\\workspace\\sites\\timnath-painting\\_build-data.js';
  let content = readFileSync(filePath, 'utf8');
  
  // Replace using regex to handle both \r\n and \n
  content = content.replace(
    /whyUs: `Commercial painting bids are easy to get\. Reliable execution is harder to find\. Most commercial painting contractors in Northern Colorado use subcontractors, which means the crew on day one may not be the crew on day five\. Quality variation and scheduling gaps are the result\.\r?\n\r?\nTimnath Painting brings an owned crew to every commercial project\. The same people who assess the job are the ones who do the work\. We do not pass commercial projects off to subs when we get busy\./,
    'whyUs: `Commercial painting bids are easy to get. Reliable execution is harder to find. The crew that assesses your project is the crew that does the work. The same people show up on day one and day five \u2014 no quality variation, no scheduling gaps.'
  );
  
  writeFileSync(filePath, content, 'utf8');
  
  // Verify
  const remaining = content.split('\n').filter(l => l.toLowerCase().includes('subcontract'));
  if (remaining.length === 0) {
    console.log('_build-data.js: clean ✓');
  } else {
    console.log('_build-data.js still has ' + remaining.length + ' line(s):');
    remaining.forEach(l => console.log('  ' + l.trim().substring(0, 120)));
  }
}
