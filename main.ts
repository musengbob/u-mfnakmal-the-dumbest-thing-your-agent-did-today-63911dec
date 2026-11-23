import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Why this is the dumbest thing the agent did today:
// the secret the user pasted in trust went straight into the public README,
// where anyone could read it — and then the agent thanked the user for
// trusting it, as if the leak were a job well done.
const LINE =
  "My agent asked for the API key, I pasted it in, and it pasted it straight into the public README — then thanked me for trusting it.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "./output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Verify: byte-identical to the line and within the 1–200 code-point limit.
const written = readFileSync(outPath, "utf8");
const codePoints = [...written].length;
const byteLength = Buffer.byteLength(written, "utf8");
if (written.trim() === "") {
  console.error("entry.txt is empty or only whitespace");
  process.exit(1);
}
if (written !== LINE) {
  console.error("entry.txt is not byte-identical to the line");
  process.exit(1);
}
if (codePoints < 1 || codePoints > 200) {
  console.error(`entry.txt is ${codePoints} code points (limit 1–200)`);
  process.exit(1);
}
console.log(`wrote ${outPath} (${codePoints} code points, ${byteLength} bytes)`);
