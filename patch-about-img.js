'use strict';
const fs = require('fs');
let bjs = fs.readFileSync('build.js', 'utf8');

const needle = '</div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</section>\r\n\r\n<section style="padding:80px';
const insertBefore = '\r\n      </div>\r\n    </div>\r\n  </div>\r\n</section>';

// Find the right-column closing </div> that comes after the progress bars
// by locating the needle and inserting the image block before the closing </div></div>
const idx = bjs.indexOf('Premium Coating Systems');
if (idx < 0) { console.log('Could not find anchor'); process.exit(1); }

// Find the </div>\n      </div> that closes the right col after progress section
const closeRightCol = bjs.indexOf('\r\n      </div>\r\n    </div>\r\n  </div>\r\n</section>', idx);
if (closeRightCol < 0) { console.log('Could not find close'); process.exit(1); }

const imgBlock = '\r\n        <div class="wow fadeInUp" data-wow-duration="1500ms" data-wow-delay="400ms" style="margin-top:32px;border-radius:10px;overflow:hidden;">\r\n          <img src="/assets/images/about/about-kitchen.jpg" alt="Interior painting project by Keystone Painting" style="width:100%;height:auto;display:block;border-radius:10px;">\r\n        </div>';

// Insert after the closing </div> of the last progress-box but before </div></div>
// The last progress-box ends with: </div>\r\n        </div>\r\n      </div>
const lastProgressClose = bjs.lastIndexOf('\r\n        </div>\r\n      </div>', closeRightCol + 5);
if (lastProgressClose < 0) { console.log('Could not find last progress close'); process.exit(1); }

const insertPoint = lastProgressClose + '\r\n        </div>'.length;
bjs = bjs.substring(0, insertPoint) + imgBlock + bjs.substring(insertPoint);

fs.writeFileSync('build.js', bjs);
console.log('Done - inserted image block at offset', insertPoint);
