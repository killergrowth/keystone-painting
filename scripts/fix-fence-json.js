'use strict';
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'content', 'projects', 'generated', 'josh-new-video.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Article is wrapped in ```json { "content": "..." } ``` — unwrap it
if (typeof data.article === 'string' && data.article.trim().startsWith('```')) {
  const match = data.article.match(/```json\s*([\s\S]*?)```/);
  if (match) {
    const inner = JSON.parse(match[1].trim());
    data.article = inner.content || inner.article || inner;
    console.log('Unwrapped article from code block.');
  }
}

// Rename file to proper slug
const outPath = path.join(__dirname, '..', 'content', 'projects', 'generated', data.slug + '.json');
fs.writeFileSync(outPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Saved:', outPath);

// Remove old file if different name
if (outPath !== filePath) {
  fs.unlinkSync(filePath);
  console.log('Removed old:', filePath);
}
