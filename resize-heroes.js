const sharp = require("sharp");
const path = require("path");
const imgDir = String.raw`C:\Users\KillerGrowth\.openclaw\workspace\sites\keystone-painting\static-html\assets\images`;

const jobs = [
  // Re-process new hero images (already in backgrounds folder, just verify dimensions)
  ["backgrounds/slider-3-1.jpg", "backgrounds/slider-3-1.jpg", 1920, 900],
  ["backgrounds/slider-2-1.jpg", "backgrounds/slider-2-1.jpg", 1920, 900],
  ["backgrounds/slider-3-2.jpg", "backgrounds/slider-3-2.jpg", 1920, 900],
];

(async () => {
  for (const [src, dest, w, h] of jobs) {
    const srcPath = path.join(imgDir, src);
    const tmp = srcPath + ".tmp.jpg";
    try {
      const meta = await sharp(srcPath).metadata();
      if (meta.width !== w || meta.height !== h) {
        await sharp(srcPath).resize(w, h, { fit: "cover", position: "center" }).jpeg({ quality: 85 }).toFile(tmp);
        require("fs").renameSync(tmp, srcPath);
        console.log("Resized:", dest, w+"x"+h);
      } else {
        console.log("Already correct size:", dest);
      }
    } catch(e) { console.log("ERR:", dest, e.message); }
  }
  console.log("Done.");
})();
