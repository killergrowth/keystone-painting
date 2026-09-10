const sharp = require("sharp");
const path = require("path");

const stock = String.raw`C:\Users\KillerGrowth\.openclaw\workspace\sites\keystone-painting\assets\stock`;
const imgDir = String.raw`C:\Users\KillerGrowth\.openclaw\workspace\sites\keystone-painting\static-html\assets\images`;

const jobs = [
  ["house-luxury.jpg",            "backgrounds/slider-3-1.jpg",  1920, 900, "cover"],
  ["house-painting-2.jpg",        "backgrounds/slider-2-1.jpg",  1920, 900, "cover"],
  ["house-mediterranean.jpg",     "backgrounds/slider-3-2.jpg",  1920, 900, "cover"],
  ["house-painting-1.jpg",        "backgrounds/page-header-bg-1-1.jpg", 1920, 400, "cover"],
  ["building-wall-blue-sky.jpg",  "backgrounds/service-4-1.jpg", 1920, 700, "cover"],
  ["house-painting-2.jpg",        "backgrounds/testi-bg.jpg",    1920, 700, "cover"],
  ["painter-primer-outdoor.jpg",  "about/about-1-1.jpg",         800, 700, "cover"],
  ["workers-stripping-paint.jpg", "about/about-2-1.jpg",         800, 600, "cover"],
  ["painter-portrait-roller.jpg", "resources/why-choose-1-1.jpg", 600, 700, "cover"],
  ["painter-primer-indoor.jpg",   "resources/why-choose-1-2.jpg", 500, 400, "cover"],
  ["house-painting-3.jpg",        "service/service-4-1.jpg",     600, 400, "cover"],
  ["house-painting-1.jpg",        "service/service-4-2.jpg",     600, 400, "cover"],
  ["house-luxury.jpg",            "service/service-4-3.jpg",     600, 400, "cover"],
  ["building-colorful-exterior.jpg", "service/service-4-4.jpg",  600, 400, "cover"],
  ["fence-white-picket.jpg",      "service/service-4-5.jpg",     600, 400, "cover"],
];

(async () => {
  for (const [src, dest, w, h, fit] of jobs) {
    try {
      await sharp(path.join(stock, src))
        .resize(w, h, { fit, position: "center" })
        .jpeg({ quality: 82 })
        .toFile(path.join(imgDir, dest));
      console.log("OK:", dest);
    } catch(e) { console.log("ERR:", dest, e.message); }
  }
  console.log("Done.");
})();
