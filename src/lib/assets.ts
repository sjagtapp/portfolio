/** Server-only checks for files in /public, so optional assets can switch on by just adding the file. */
import "server-only";
import { existsSync } from "node:fs";
import { join } from "node:path";

const publicPath = (p: string) => join(process.cwd(), "public", p.replace(/^\//, ""));

const IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "webp"];

/**
 * Finds an image in /public by base path, trying common extensions.
 * `findImage("/images/profile")` → "/images/profile.jpg" if that file exists.
 * Checked on the server so a missing file never reaches the browser as a broken image.
 */
export function findImage(basePath: string): string | undefined {
  for (const ext of IMAGE_EXTENSIONS) {
    const candidate = `${basePath}.${ext}`;
    try {
      if (existsSync(publicPath(candidate))) return candidate;
    } catch {
      /* fall through to the next extension */
    }
  }
  return undefined;
}
