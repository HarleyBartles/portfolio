import { createHash } from "node:crypto";
import { access, mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import sharp from "sharp";

const clientRoot = path.resolve(import.meta.dirname, "..");
const repositoryRoot = path.resolve(clientRoot, "..", "..");
const evidencePath = path.join(clientRoot, "src", "data", "case-studies", "wild-bunch-evidence.json");
const outputRoot = path.join(clientRoot, "public", "media", "wild-bunch");

const CAPTURES = [
  {
    capture: "dustwell-town",
    sourceFile: "wild-bunch-dustwell-town-1440.png",
    sourceSha256: "1fb8228009fb80a728de3274ad564507414f83f2e996b628a57760441793f147",
    widths: [720, 1200],
    altIntent: "Current development build: Ranger Vale in the Dustwell town hub, with the town map and ordinary Store, Sheriff Office, Saloon, and trail actions visible.",
    caption: "Current development build / working skeleton: Dustwell town hub after the recorded run starts; product context is retained without presenting this as final game art.",
  },
  {
    capture: "trail-map",
    sourceFile: "wild-bunch-trail-map-1440.png",
    sourceSha256: "ca31e664919d8b5a2f49c33e2a27ff4082b08e4c7c25e12458fdde426ae6c4b4",
    widths: [720, 1200],
    altIntent: "Current development build: the generated starting-town trail map with named towns, connecting trails, and ride-day distances before Dustwell is chosen.",
    caption: "Current development build / working skeleton: generated trail-map evidence before the player chooses Dustwell, retained for its readable names, topology, and route distances.",
  },
  {
    capture: "session-audit",
    sourceFile: "wild-bunch-session-audit-1440.png",
    sourceSha256: "785341cca40132a83752eae645d9aa137629f69b14e7854767698633d02919ac",
    widths: [720, 1200],
    altIntent: "Current development build: expanded ordered session audit showing setup, generated world and case file, town selection, game start, town action, and investigation events.",
    caption: "Current development build / working skeleton: the expanded session audit records the ordered event history after the screened investigation path, without publishing a session identifier.",
  },
  {
    capture: "wanted-notice",
    sourceFile: "wild-bunch-wanted-notice-1440.png",
    sourceSha256: "59cde4de536fad07fcb855b11a33ea0e3149d57f7287b28c8b35c57b58da991f",
    widths: [640, 960],
    altIntent: "Current development build: a populated Sheriff Office wanted notice with player-facing clues and no hidden culprit answer.",
    caption: "Current development build / working skeleton: a populated wanted notice reached through the ordinary Sheriff Office action, retained as player-safe investigation evidence.",
  },
  {
    capture: "case-file",
    sourceFile: "wild-bunch-case-file-1440.png",
    sourceSha256: "9f1111d63d647c1e513bdc2f110629c10c961587e98d4fb9fcff1980356ee67a",
    widths: [640, 960],
    altIntent: "Current development build: the player-known case file showing earned clues, named records, loose leads, and evidence items without a hidden culprit answer.",
    caption: "Current development build / working skeleton: a player-known case-file surface after reading a poster, retained without exposing hidden investigation truth.",
  },
];

const FORMATS = [
  { extension: "avif", options: { quality: 52, effort: 6, chromaSubsampling: "4:2:0" } },
  { extension: "webp", options: { quality: 78, effort: 6, smartSubsample: true } },
];

function fail(message) {
  throw new Error(message);
}

function outputPath(capture, width, extension) {
  return path.join(outputRoot, `${capture.capture}-${width}.${extension}`);
}

function publicPath(filePath) {
  return path.relative(repositoryRoot, filePath).split(path.sep).join("/");
}

function expectedHeight(width) {
  return Math.round((1100 / 1440) * width);
}

function decodedFormat(format) {
  return format === "avif" ? "heif" : format;
}

function expectedEntries() {
  return CAPTURES.flatMap((capture) =>
    capture.widths.flatMap((width) =>
      FORMATS.map(({ extension }) => ({
        capture: capture.capture,
        sourceFile: capture.sourceFile,
        sourceSha256: capture.sourceSha256,
        sourceWidth: 1440,
        sourceHeight: 1100,
        path: publicPath(outputPath(capture, width, extension)),
        width,
        height: expectedHeight(width),
        format: extension,
        altIntent: capture.altIntent,
        caption: capture.caption,
      })),
    ),
  );
}

async function readEvidence() {
  try {
    return JSON.parse(await readFile(evidencePath, "utf8"));
  } catch (error) {
    fail(`Cannot read Wild Bunch evidence at ${publicPath(evidencePath)}: ${error.message}`);
  }
}

function assertExactEntry(entry, expected) {
  for (const field of ["capture", "sourceFile", "sourceSha256", "sourceWidth", "sourceHeight", "path", "width", "height", "format", "altIntent", "caption"]) {
    if (entry?.[field] !== expected[field]) {
      fail(`Evidence entry ${expected.path} must have ${field}=${JSON.stringify(expected[field])}.`);
    }
  }
  if (!Number.isInteger(entry.bytes) || entry.bytes <= 0) {
    fail(`Evidence entry ${expected.path} must have a positive integer bytes field.`);
  }
}

async function check() {
  const evidence = await readEvidence();
  if (!Array.isArray(evidence.images)) {
    fail("Wild Bunch evidence images must be an array.");
  }
  const expected = expectedEntries();
  if (evidence.images.length !== expected.length) {
    fail(`Wild Bunch evidence must contain exactly ${expected.length} committed derivatives.`);
  }

  const entriesByPath = new Map(evidence.images.map((entry) => [entry?.path, entry]));
  if (entriesByPath.size !== expected.length) {
    fail("Wild Bunch evidence must not duplicate derivative paths.");
  }

  for (const expectedEntry of expected) {
    const entry = entriesByPath.get(expectedEntry.path);
    assertExactEntry(entry, expectedEntry);
    const filePath = repositoryPath(entry.path);
    try {
      await access(filePath);
    } catch {
      fail(`Committed derivative is missing: ${entry.path}`);
    }
    const [fileStats, metadata] = await Promise.all([stat(filePath), sharp(filePath).metadata()]);
    if (fileStats.size !== entry.bytes) {
      fail(`Committed derivative byte count drifted for ${entry.path}: expected ${entry.bytes}, got ${fileStats.size}.`);
    }
    if (metadata.format !== decodedFormat(entry.format) || metadata.width !== entry.width || metadata.height !== entry.height) {
      fail(`Committed derivative metadata drifted for ${entry.path}: expected ${entry.format} ${entry.width}x${entry.height}, got ${metadata.format} ${metadata.width}x${metadata.height}.`);
    }
    if (entry.format === "avif" && metadata.compression !== "av1") {
      fail(`Committed derivative is not AVIF/AV1: ${entry.path}`);
    }
    if (metadata.exif || metadata.icc || metadata.xmp || metadata.hasProfile) {
      fail(`Committed derivative retains metadata that must be stripped: ${entry.path}`);
    }
  }
}

function repositoryPath(relativePath) {
  const normalized = path.normalize(relativePath);
  if (path.isAbsolute(normalized) || normalized.startsWith("..") || normalized !== path.join("src", "client", "public", "media", "wild-bunch", path.basename(normalized))) {
    fail(`Evidence path is not a fixed Wild Bunch public derivative: ${relativePath}`);
  }
  return path.join(repositoryRoot, normalized);
}

async function apply(sourceDir) {
  if (!sourceDir) {
    fail("--apply requires --source-dir <directory> so raw scratch captures are never assumed in CI.");
  }
  await mkdir(outputRoot, { recursive: true });
  const entries = [];
  for (const capture of CAPTURES) {
    const sourcePath = path.resolve(sourceDir, capture.sourceFile);
    let sourceBuffer;
    try {
      sourceBuffer = await readFile(sourcePath);
    } catch (error) {
      fail(`Cannot read required raw capture ${capture.sourceFile}: ${error.message}`);
    }
    const sourceHash = createHash("sha256").update(sourceBuffer).digest("hex");
    if (sourceHash !== capture.sourceSha256) {
      fail(`Raw capture hash mismatch for ${capture.sourceFile}: expected ${capture.sourceSha256}, got ${sourceHash}.`);
    }
    const sourceMetadata = await sharp(sourceBuffer).metadata();
    if (sourceMetadata.format !== "png" || sourceMetadata.width !== 1440 || sourceMetadata.height !== 1100) {
      fail(`Raw capture metadata mismatch for ${capture.sourceFile}: expected PNG 1440x1100.`);
    }
    for (const width of capture.widths) {
      for (const { extension, options } of FORMATS) {
        const destination = outputPath(capture, width, extension);
        await sharp(sourceBuffer)
          .resize({ width, fit: "inside", withoutEnlargement: true })
          .toFormat(extension, options)
          .toFile(destination);
        const [metadata, fileStats] = await Promise.all([sharp(destination).metadata(), stat(destination)]);
        const expected = expectedEntries().find((entry) => entry.path === publicPath(destination));
        if (!expected || metadata.width !== expected.width || metadata.height !== expected.height || metadata.format !== decodedFormat(extension)) {
          fail(`Generated derivative metadata did not match the fixed specification: ${publicPath(destination)}.`);
        }
        entries.push({ ...expected, bytes: fileStats.size });
      }
    }
  }
  const evidence = await readEvidence();
  evidence.images = entries;
  await writeFile(evidencePath, `${JSON.stringify(evidence, null, 2)}\n`, "utf8");
  await check();
}

function parseArgs(argv) {
  const applyIndex = argv.indexOf("--apply");
  const checkIndex = argv.indexOf("--check");
  if ((applyIndex === -1) === (checkIndex === -1)) {
    fail("Use exactly one of --apply or --check.");
  }
  if (applyIndex !== -1) {
    const sourceIndex = argv.indexOf("--source-dir");
    return { mode: "apply", sourceDir: sourceIndex === -1 ? undefined : argv[sourceIndex + 1] };
  }
  return { mode: "check" };
}

try {
  const options = parseArgs(process.argv.slice(2));
  if (options.mode === "apply") {
    await apply(options.sourceDir);
    console.log("Wild Bunch derivatives generated and verified.");
  } else {
    await check();
    console.log("Wild Bunch derivative evidence is current.");
  }
} catch (error) {
  console.error(`Wild Bunch media check failed: ${error.message}`);
  process.exitCode = 1;
}
