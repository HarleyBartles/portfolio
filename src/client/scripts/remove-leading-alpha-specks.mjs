import fs from "node:fs/promises";

import sharp from "sharp";

const [, , inputPath, outputPath] = process.argv;

if (!inputPath || !outputPath) {
  throw new Error("Usage: node scripts/remove-leading-alpha-specks.mjs <input.png> <output.png>");
}

const { data, info } = await sharp(inputPath)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const substantialCoverage = Math.ceil(info.width * 0.2);
let firstSubstantialRow = 0;

for (let y = 0; y < info.height; y += 1) {
  let opaquePixels = 0;
  for (let x = 0; x < info.width; x += 1) {
    if (data[((y * info.width) + x) * info.channels + 3] > 8) opaquePixels += 1;
  }
  if (opaquePixels >= substantialCoverage) {
    firstSubstantialRow = y;
    break;
  }
}

for (let y = 0; y < firstSubstantialRow; y += 1) {
  for (let x = 0; x < info.width; x += 1) {
    data[((y * info.width) + x) * info.channels + 3] = 0;
  }
}

await sharp(data, {
  raw: {
    width: info.width,
    height: info.height,
    channels: info.channels,
  },
})
  .png({ compressionLevel: 9, adaptiveFiltering: true })
  .toFile(outputPath);
