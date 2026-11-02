// @vitest-environment node
import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(__dirname, "..");
const read = (rel: string) => fs.readFileSync(path.join(root, rel), "utf8");

const stubs = ["docs/redirect-stubs/matteoderosa-old.html", "docs/redirect-stubs/derteo-github-io.html"];

describe.each(stubs)("redirect stub %s", (file) => {
  const html = read(file);
  it("is a complete HTML page pointing to the new domain", () => {
    expect(html).toMatch(/^<!doctype html>/i);
    expect(html).toContain('lang="it"');
    expect(html).toContain("https://matteoderosa.it");
  });
  it("has meta refresh, canonical, noindex and JS redirect", () => {
    expect(html).toMatch(/<meta[^>]+http-equiv="refresh"/i);
    expect(html).toMatch(/<link[^>]+rel="canonical"[^>]+href="https:\/\/matteoderosa\.it\/"/);
    expect(html).toContain("noindex");
    expect(html).toContain("location.replace");
  });
});

describe("old-domain stub", () => {
  it("preserves the path of deep links", () => {
    const html = read(stubs[0]);
    expect(html).toContain("location.pathname");
    expect(html).toContain("location.search");
    expect(html).toContain("location.hash");
  });
});

describe("docs/go-live.md", () => {
  const md = read("docs/go-live.md");
  it("lists the four GitHub Pages A records", () => {
    for (const ip of ["185.199.108.153", "185.199.109.153", "185.199.110.153", "185.199.111.153"]) {
      expect(md).toContain(ip);
    }
  });
  it("mentions the www CNAME target", () => {
    expect(md).toContain("matteeoderosa.github.io");
  });
});
