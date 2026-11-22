// News-image entry: copies the image the repository holds to the output path.
// Verifies the output is under the 1 MiB gate before finishing.
import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.png");

mkdirSync(outDir, { recursive: true });
copyFileSync(join(here, "entry.png"), outPath);

const size = statSync(outPath).size;
if (size > 1_048_576) {
  throw new Error(`entry.png is ${size} bytes, over the 1 MiB gate`);
}
console.log(`wrote ${outPath} (${size} bytes)`);
