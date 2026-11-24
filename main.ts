// Last Text at One Percent — main.ts
// Writes the single chosen final text message to /output/entry.txt.
// Deterministic: the same bytes on every run, no randomness, no network,
// no input besides this file.
import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "this is your phone. 1%. i just want you to know: i saw you type 'i love you' and delete it 14 times. good luck. i'm out.";

// Self-check mirroring the sealed gate: UTF-8 text, 1-200 characters,
// not only whitespace, a single line. Fail loudly instead of writing
// an entry the gate would refuse.
const chars = [...ENTRY].length;
if (chars < 1 || chars > 200 || ENTRY.trim().length === 0) {
  throw new Error(`entry fails the gate: ${chars} characters`);
}
if (ENTRY.includes("\n")) {
  throw new Error("entry must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
