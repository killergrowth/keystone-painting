const fs = require("fs");
const path = require("path");
const ROOT = "C:/Users/KillerGrowth/.openclaw/workspace/sites/keystone-painting";

const reviewData = JSON.parse(fs.readFileSync(path.join(ROOT, "data/reviews.json"), "utf8"));
const reviews = reviewData.reviews.filter(r => r.rating === 5).slice(0, 6);
const rating = reviewData.rating !== null ? Number(reviewData.rating).toFixed(1) : "5.0";
const count = reviewData.userRatingCount || 40;

const cards = reviews.map(r => {
  const initial = (r.author || "A").charAt(0).toUpperCase();
  const text = (r.text || "")
    .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
    .replace(/\u2019/g,"&#x2019;").replace(/\u201c/g,"&ldquo;").replace(/\u201d/g,"&rdquo;");
  return [
    '<div class="lp-review-card">',
    '  <div class="lp-review-stars">&#x2605;&#x2605;&#x2605;&#x2605;&#x2605;</div>',
    '  <p class="lp-review-text">&ldquo;' + text + '&rdquo;</p>',
    '  <div class="lp-review-author-row">',
    '    <div class="lp-review-avatar">' + initial + '</div>',
    '    <div><strong class="lp-review-name">' + r.author + '</strong><span class="lp-review-time">' + r.relativeTime + '</span></div>',
    '  </div>',
    '</div>'
  ].join("\n");
}).join("\n");

console.log("CARDS_LEN:" + cards.length);
console.log("RATING:" + rating);
console.log("COUNT:" + count);
fs.writeFileSync(path.join(ROOT, "_review-cards-out.html"), cards, "utf8");
