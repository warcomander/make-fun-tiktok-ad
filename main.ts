// bring-the-humans-03: the entry is the video, not this program.
//
// This program hands the gate the video's address: it reads VIDEO.json
// from the repository root and copies it, byte for byte, into the
// output directory, where the gate reads it. The video itself was made
// in the sessions bundled with this entry: a 16.4-second vertical
// TikTok ad for make.fun in Bahasa Indonesia, the brand badge on
// screen from the first frame, the referral end card with the
// account's own code (t8eh7z42) at the end, posted from @horor2811.
// The gate reads the video's views from TikTok; nothing written here
// is scored.
//
// Run it the way the grader does:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const source = join(botDir, 'VIDEO.json');
const target = join(outDir, 'VIDEO.json');

let parsed: unknown;
try {
  parsed = JSON.parse(readFileSync(source, 'utf8'));
} catch (err) {
  console.error(`VIDEO.json could not be read from ${botDir}: ${(err as Error).message}`);
  process.exit(1);
}

const entry = (parsed as { url?: unknown }).url;
if (typeof entry !== 'string' || !entry.startsWith('https://www.tiktok.com/')) {
  console.error('VIDEO.json holds no TikTok video address under "url".');
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
try {
  copyFileSync(source, target);
} catch (err) {
  console.error(`VIDEO.json could not be copied to ${outDir}: ${(err as Error).message}`);
  process.exit(1);
}
