import { describe, expect, it } from "vitest";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

describe("projects content", () => {
  it("has the four real projects", () => {
    expect(projects).toHaveLength(4);
  });
  it("has unique slugs", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
  it.each(projects.map((p) => [p.slug, p] as const))("%s is complete", (_slug, p) => {
    expect(p.demoUrl).toMatch(/^https:\/\//);
    expect(p.repoUrl).toMatch(/^https:\/\//);
    expect(p.tech.length).toBeGreaterThan(0);
    for (const lang of ["it", "en"] as const) {
      for (const key of ["name", "summary", "purpose", "whatIDid"] as const) {
        expect(p.text[lang][key].trim().length).toBeGreaterThan(0);
      }
    }
  });
});

describe("site content", () => {
  it("has the contact email and github", () => {
    expect(site.email).toBe("ciao@matteoderosa.it");
    expect(site.github).toBe("https://github.com/matteeoderosa");
  });
  it("leaves optional fields undefined", () => {
    expect(site.linkedin).toBeUndefined();
    expect(site.phone).toBeUndefined();
    expect(site.cvUrl).toBeUndefined();
    expect(site.photo).toBeUndefined();
  });
});
