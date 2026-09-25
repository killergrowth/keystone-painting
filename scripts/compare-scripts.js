'use strict';
const fs = require('fs');
const home = fs.readFileSync(__dirname + '/../dist/index.html', 'utf8');
const proj = fs.readFileSync(__dirname + '/../dist/projects/index.html', 'utf8');

const getSrcs = h => [...h.matchAll(/<script[^>]*src="([^"]+)"/g)].map(m => m[1]);
console.log('HOME scripts:', getSrcs(home));
console.log('\nPROJ scripts:', getSrcs(proj));
