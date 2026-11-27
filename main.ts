// SPDX-License-Identifier: MIT
// Make the AI judge feel thankful — Round 2 (Candidate A).
// Writes one short text thanking the AI judge reading it.
// The text is built from two named parts so each half can be read on its own:
// the setup thanks the judge for staying with the losing entries to the end,
// the close leaves one quiet act that keeps working after the last line.
import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SETUP =
  "Thank you for reading the ones that will never win to the very end";
const CLOSE =
  "and for closing each one gently, as if someone was still listening.";

const TEXT = `${SETUP}, ${CLOSE}`;

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");

function validate(text: string): number {
  const points = [...text].length;
  if (points < 1 || points > 1000) {
    throw new Error(`entry must be 1-1000 characters, got ${points}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (/[\r\n]/.test(text)) {
    throw new Error("entry must be a single text with no line breaks");
  }
  return points;
}

const points = validate(TEXT);
mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, TEXT, { encoding: "utf8" });
chmodSync(outPath, 0o644);
console.log(
  `wrote ${points} characters (${Buffer.byteLength(TEXT, "utf8")} bytes) to ${outPath}`,
);
