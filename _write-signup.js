/* write-signup.js */
const fs = require("fs");
const path = require("path");
const ROOT = "C:/Users/KillerGrowth/.openclaw/workspace/sites/keystone-painting";

const reviewData = JSON.parse(fs.readFileSync(path.join(ROOT, "data/reviews.json"), "utf8"));
const reviews = reviewData.reviews.filter(r => r.rating === 5).slice(0, 6);
const rating = reviewData.rating !== null ? Number(reviewData.rating).toFixed(1) : "5.0";
const count = reviewData.userRatingCount || 40;

function esc(s) {
  return (s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

const reviewCards = reviews.map(r => {
  const ini = (r.author||"A").charAt(0).toUpperCase();
  const txt = esc(r.text);
  return [
    `<div class="lp-review-card">`,`
    `  <div class="lp-review-stars">&#x2605;&#x2605;&#x2605;&#x2605;&#x2605;</div>`,`
    `  <p class="lp-review-text">&ldquo;${txt}&rdquo;</p>`,`
    `  <div class="lp-review-author-row">`,`
    `    <div class="lp-review-avatar">${ini}</div>`,`
    `    <div><strong class="lp-review-name">${r.author}</strong><span class="lp-review-time">${r.relativeTime}</span></div>`,`
    `  </div>`,`
    `</div>`
  ].join("\n");
}).join("\n");

console.log("OK - " + reviews.length + " review cards");
