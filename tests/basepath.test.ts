// @vitest-environment node
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const SITE = "https://matteeoderosa.github.io/portfolio";
const BASE = "/portfolio";
const root = path.resolve(__dirname, "..");
const out = path.join(root, "out");
const backup = path.join(root, "out.basepath-backup");

// Set SKIP_BUILD_TESTS=1 to skip this (slow) full build in quick local runs.
const skip = process.env.SKIP_BUILD_TESTS === "1";

function walk(dir: string, acc: string[] = []): string[] {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else acc.push(p);
  }
  return acc;
}

const EXCLUDED = ["frontend/", "pages/", "404.html"];
function isChecked(file: string): boolean {
  const rel = path.relative(out, file).split(path.sep).join("/");
  return !EXCLUDED.some((x) => rel === x || rel.startsWith(x));
}

describe.skipIf(skip)("provisional build (base path /portfolio)", () => {
  beforeAll(() => {
    // Keep any existing out/ intact: move it aside, build, restore afterwards.
    if (fs.existsSync(backup)) fs.rmSync(backup, { recursive: true, force: true });
    if (fs.existsSync(out)) fs.renameSync(out, backup);
    execSync("npm run build", {
      cwd: root,
      stdio: "pipe",
      env: {
        ...process.env,
        NEXT_PUBLIC_BASE_PATH: BASE,
        NEXT_PUBLIC_SITE_URL: SITE,
        NEXT_PUBLIC_NOINDEX: "1",
      },
    });
  }, 600_000);

  afterAll(() => {
    fs.rmSync(out, { recursive: true, force: true });
    if (fs.existsSync(backup)) fs.renameSync(backup, out);
  });

  const attrs = (html: string) =>
    [...html.matchAll(/\b(?:href|src)="(\/[^"]*)"/g)].map((m) => m[1]);

  it("every root-absolute href/src starts with /portfolio/", () => {
    const bad: string[] = [];
    let seen = 0;
    for (const f of walk(out).filter((f) => f.endsWith(".html") && isChecked(f))) {
      for (const v of attrs(fs.readFileSync(f, "utf8"))) {
        if (v.startsWith("//")) continue;
        seen++;
        if (!v.startsWith(BASE + "/")) bad.push(`${path.relative(out, f)}: ${v}`);
      }
    }
    expect(seen).toBeGreaterThan(50);
    expect(bad).toEqual([]);
  });

  it("built CSS references (fonts, images) carry the base path", () => {
    const bad: string[] = [];
    for (const f of walk(out).filter((f) => f.endsWith(".css") && isChecked(f))) {
      for (const m of fs.readFileSync(f, "utf8").matchAll(/url\(\s*["']?(\/[^)"']*)/g)) {
        if (!m[1].startsWith("//") && !m[1].startsWith(BASE + "/")) bad.push(`${path.basename(f)}: ${m[1]}`);
      }
    }
    expect(bad).toEqual([]);
  });

  it("robots.txt disallows all and index.html is noindex", () => {
    expect(fs.readFileSync(path.join(out, "robots.txt"), "utf8")).toContain("Disallow: /");
    const html = fs.readFileSync(path.join(out, "index.html"), "utf8");
    expect(html).toMatch(/<meta[^>]+name="robots"[^>]+content="[^"]*noindex/);
  });

  it("canonical URLs use the provisional site URL", () => {
    const canon: string[] = [];
    for (const f of walk(out).filter((f) => f.endsWith(".html") && isChecked(f))) {
      for (const m of fs.readFileSync(f, "utf8").matchAll(/<link[^>]+rel="canonical"[^>]*>/g)) {
        const h = m[0].match(/href="([^"]*)"/);
        if (h) canon.push(h[1]);
      }
    }
    expect(canon.length).toBeGreaterThan(5);
    expect(canon.filter((c) => !c.startsWith(SITE))).toEqual([]);
  });
});
