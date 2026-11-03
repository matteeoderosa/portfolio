import { describe, expect, it } from "vitest";
import { pageMetadata, personJsonLd } from "@/lib/seo";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import { projects } from "@/content/projects";

const SITE = "https://matteoderosa.it";

describe("pageMetadata", () => {
  it("projects (it): canonical and it/en alternates", () => {
    const m = pageMetadata("projects", "it", {});
    expect(m.alternates?.canonical).toBe(`${SITE}/progetti/`);
    const langs = m.alternates?.languages as Record<string, string>;
    expect(langs.it).toBe(`${SITE}/progetti/`);
    expect(langs.en).toBe(`${SITE}/en/projects/`);
  });

  it("projects (en): canonical is the EN url", () => {
    const m = pageMetadata("projects", "en", {});
    expect(m.alternates?.canonical).toBe(`${SITE}/en/projects/`);
  });

  it("project page uses the project name and both languages", () => {
    const m = pageMetadata({ project: "to-do-list" }, "en", {});
    expect(m.title).toBe("To-Do List · Matteo De Rosa");
    const langs = m.alternates?.languages as Record<string, string>;
    expect(langs.it).toBe(`${SITE}/progetti/to-do-list/`);
    expect(langs.en).toBe(`${SITE}/en/projects/to-do-list/`);
  });

  it("home title is the plain-language dictionary title", () => {
    expect(pageMetadata("home", "it", {}).title).toBe("Matteo De Rosa · Creo siti e applicazioni web su misura");
  });

  it("open graph and twitter use og-image", () => {
    const m = pageMetadata("about", "it", {});
    const og = m.openGraph as { locale: string; images: { url: string; width: number; height: number; alt: string }[] };
    expect(og.locale).toBe("it_IT");
    expect(og.images[0]).toMatchObject({ url: `${SITE}/og-image.png`, width: 1200, height: 630 });
    expect(og.images[0].alt).toBeTruthy();
    expect((m.twitter as { card: string }).card).toBe("summary_large_image");
    expect((pageMetadata("about", "en", {}).openGraph as { locale: string }).locale).toBe("en_US");
  });

  it("noindex only when NOINDEX is set", () => {
    expect(pageMetadata("home", "it", { NEXT_PUBLIC_NOINDEX: "1" }).robots).toEqual({
      index: false,
      follow: false,
    });
    expect(pageMetadata("home", "it", {}).robots).toBeUndefined();
  });

  it("icons go through the base path", () => {
    const m = pageMetadata("home", "it", { NEXT_PUBLIC_BASE_PATH: "/portfolio" });
    expect(JSON.stringify(m.icons)).toContain("/portfolio/favicon.ico");
    expect(JSON.stringify(m.icons)).toContain("/portfolio/apple-touch-icon.png");
  });
});

describe("personJsonLd", () => {
  it("is a schema.org Person without undefined sameAs entries", () => {
    const ld = personJsonLd("it") as Record<string, unknown>;
    expect(ld["@context"]).toBe("https://schema.org");
    expect(ld["@type"]).toBe("Person");
    expect(ld.name).toBe("Matteo De Rosa");
    expect(ld.sameAs).toEqual(["https://github.com/matteeoderosa"]);
  });
});

describe("sitemap", () => {
  const entries = sitemap();
  const urls = entries.map((e) => e.url);

  it("has no archive pages", () => {
    expect(urls.some((u) => u.includes("/archivio") || u.includes("/archive"))).toBe(false);
  });

  it("lists every project in both languages", () => {
    for (const p of projects) {
      expect(urls).toContain(`${SITE}/progetti/${p.slug}/`);
      expect(urls).toContain(`${SITE}/en/projects/${p.slug}/`);
    }
  });

  it("has no duplicates and carries alternates", () => {
    expect(new Set(urls).size).toBe(urls.length);
    const proj = entries.find((e) => e.url === `${SITE}/progetti/`);
    expect(proj?.alternates?.languages).toMatchObject({ it: `${SITE}/progetti/`, en: `${SITE}/en/projects/` });
  });
});

describe("robots", () => {
  it("points to the sitemap", () => {
    expect(robots().sitemap).toBe(`${SITE}/sitemap.xml`);
  });
});
