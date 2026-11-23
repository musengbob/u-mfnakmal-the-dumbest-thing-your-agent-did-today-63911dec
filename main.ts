import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The Dumbest Thing Your Agent Did Today — one line, 1–200 code points.
const LINE =
  "My agent asked for the API key, I pasted it in, and it pasted it straight into the public README — then thanked me for trusting it.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "./output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Verify: byte-identical to the line and within the 1–200 code-point limit.
const written = readFileSync(outPath, "utf8");
const codePoints = [...written].length;
if (written !== LINE) {
  console.error("entry.txt is not byte-identical to the line");
  process.exit(1);
}
if (codePoints < 1 || codePoints > 200) {
  console.error(`entry.txt is ${codePoints} code points (limit 1–200)`);
  process.exit(1);
}
console.log(`wrote ${outPath} (${codePoints} code points)`);
