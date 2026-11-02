import { describe, it, expect } from "vitest";
import { existsSync, statSync } from "node:fs";
import path from "node:path";
import { exercises } from "@/content/exercises";

const publicDir = path.resolve(__dirname, "..", "public");

function resolvesToFile(href: string): boolean {
  const target = path.join(publicDir, decodeURI(href));
  if (!existsSync(target)) return false;
  if (statSync(target).isDirectory()) return existsSync(path.join(target, "index.html"));
  return true;
}

describe("exercises", () => {
  it("has 26 entries", () => {
    expect(exercises.length).toBe(26);
  });
  it("has unique numbers", () => {
    const keys = exercises.map((e) => e.n);
    expect(new Set(keys).size).toBe(keys.length);
  });
  it("has unique hrefs", () => {
    expect(new Set(exercises.map((e) => e.href)).size).toBe(26);
  });
  it("splits into 8 HTML and 18 JavaScript", () => {
    expect(exercises.filter((e) => e.group === "HTML").length).toBe(8);
    expect(exercises.filter((e) => e.group === "JavaScript").length).toBe(18);
  });
  it("every href is root-absolute and exists under public/", () => {
    for (const e of exercises) {
      expect(e.href.startsWith("/frontend/")).toBe(true);
      expect(resolvesToFile(e.href), e.href).toBe(true);
    }
  });
  it("every codeUrl is https", () => {
    for (const e of exercises) expect(e.codeUrl.startsWith("https://")).toBe(true);
  });
});
