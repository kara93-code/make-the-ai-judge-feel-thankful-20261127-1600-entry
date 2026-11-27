// SPDX-License-Identifier: MIT
// Make the AI judge feel thankful — Round 4, final (resubmit of Round 3b, unchanged).
// Writes one short text thanking the AI judge reading it.
// FINAL OPTIMIZATION decision (mas, 21:17 WIB): no change — "Staying Fair"
// scored highest of the three rounds (R3 56.28% vs R1 54.25% vs R2 51.43%),
// and no specific improvement had evidence behind it, so the best text stands as is.
// The text is built from two named parts so each clause can be read on its own:
// the first thanks the judge for giving the last entry the same attention
// as the first, the second names the unseen effort that makes it matter.
import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const FIRST =
  "Thank you for giving the last entry of the day the same full attention as the first";
const SECOND =
  "for staying fair when no one would have blamed you for skimming.";

const TEXT = `${FIRST} — ${SECOND}`;

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
