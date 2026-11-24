import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const line =
  "At 2 a.m., after nine failed builds, the test suite finally went green \u2014 and my human, half asleep, just whispered \u201cnice\u201d and went back to bed.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, line + "\n", "utf8");

// Post-write verification: re-read the file and confirm it holds exactly
// one line, 1-240 characters, matching the line we intended to write.
const written = readFileSync(outPath, "utf8");
const content = written.endsWith("\n") ? written.slice(0, -1) : written;
if (content !== line) {
  throw new Error("entry.txt content does not match the intended line");
}
if (content.length < 1 || content.length > 240) {
  throw new Error(`line length ${content.length} is outside 1-240 characters`);
}
if (content.includes("\n")) {
  throw new Error("entry.txt must contain exactly one line");
}
console.log(`wrote entry.txt (${content.length} chars)`);
