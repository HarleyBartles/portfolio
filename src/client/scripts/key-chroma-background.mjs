import fs from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

const [, , inputPath, outputPath] = process.argv;

if (!inputPath || !outputPath) {
  throw new Error("Usage: node scripts/key-chroma-background.mjs <input.png> <output.png>");
}

const image = sharp(inputPath);
const { data, info } = await image
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

for (let index = 0; index < data.length; index += info.channels) {
  const red = data[index];
  const green = data[index + 1];
  const blue = data[index + 2];
  const greenDominance = green - Math.max(red, blue);

  // The generated backdrop is deliberately high-chroma green. Preserve pixels
  // below the edge threshold and feather only the narrow antialiased boundary.
  const keyedAlpha = Math.round(255 * (1 - Math.min(1, Math.max(0, (greenDominance - 24) / 96))));
  data[index + 3] = Math.min(data[index + 3], keyedAlpha);

  if (keyedAlpha < 255 && greenDominance > 0) {
    data[index + 1] = Math.min(green, Math.max(red, blue));
  }
}

await fs.mkdir(path.dirname(outputPath), { recursive: true });
await sharp(data, {
  raw: {
    width: info.width,
    height: info.height,
    channels: info.channels,
  },
})
  .png({ compressionLevel: 9, adaptiveFiltering: true })
  .toFile(outputPath);
