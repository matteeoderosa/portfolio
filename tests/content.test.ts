import { describe, expect, it } from "vitest";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

describe("projects content", () => {
  it("has the real projects, the two Pisa Running Club sites first", () => {
    expect(projects).toHaveLength(5);
    expect(projects.slice(0, 2).every((p) => p.main && p.siteUrl)).toBe(true);
  });
  it("has unique slugs", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
  it.each(projects.map((p) => [p.slug, p] as const))("%s is complete", (_slug, p) => {
    for (const url of [p.siteUrl, p.demoUrl, p.repoUrl]) if (url) expect(url).toMatch(/^https:\/\//);
    expect(Boolean(p.siteUrl || p.demoUrl || p.repoUrl)).toBe(true);
    for (const lang of ["it", "en"] as const) {
      for (const key of ["name", "summary", "purpose", "whatIDid"] as const) {
        expect(p.text[lang][key].trim().length).toBeGreaterThan(0);
      }
    }
  });
});

describe("site content", () => {
  it("has the contact email and github", () => {
    expect(site.email).toBe("info@matteoderosa.it");
    expect(site.github).toBe("https://github.com/matteeoderosa");
  });
  it("leaves optional fields undefined", () => {
    expect(site.linkedin).toBeUndefined();
    expect(site.phone).toBeUndefined();
    expect(site.cvUrl).toBeUndefined();
    expect(site.photo).toBeUndefined();
  });
});
