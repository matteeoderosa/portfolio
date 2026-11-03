import { describe, it, expect, afterEach, vi } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { dictionaries } from "@/content/dictionaries";
import { projects } from "@/content/projects";
import HomeView from "@/views/HomeView";
import ProjectView from "@/views/ProjectView";
import ContactView from "@/views/ContactView";

afterEach(() => {
  cleanup();
  vi.resetModules();
  vi.doUnmock("@/content/site");
  vi.doUnmock("@/content/projects");
});

describe("HomeView", () => {
  it("IT shows the dictionary title and 3-4 featured project cards", () => {
    const { container, getByRole } = render(<HomeView lang="it" />);
    expect(getByRole("heading", { level: 1 }).textContent).toBe(dictionaries.it.home.title);
    const cards = container.querySelectorAll("[data-project-card]");
    expect(cards.length).toBeGreaterThanOrEqual(3);
    expect(cards.length).toBeLessThanOrEqual(4);
  });
});

describe("ContactView", () => {
  it("renders no tel:, LinkedIn or CV when undefined", () => {
    const { container } = render(<ContactView lang="it" />);
    expect(container.querySelector('a[href^="tel:"]')).toBeNull();
    expect(container.querySelector('a[href*="linkedin"]')).toBeNull();
    expect(container.querySelector("[data-cv]")).toBeNull();
    expect(container.querySelector("img[data-portrait]")).toBeNull();
    expect(container.querySelector('a[href^="mailto:"]')).not.toBeNull();
  });

  it("renders phone, LinkedIn and CV when set", async () => {
    vi.resetModules();
    vi.doMock("@/content/site", () => ({
      site: {
        email: "a@b.it",
        github: "https://github.com/x",
        phone: "+39 333 1234567",
        linkedin: "https://www.linkedin.com/in/x",
        cvUrl: "/cv.pdf",
      },
    }));
    const Mod = (await import("@/views/ContactView")).default;
    const { container } = render(<Mod lang="it" />);
    expect(container.querySelector('a[href^="tel:"]')).not.toBeNull();
    expect(container.querySelector('a[href*="linkedin"]')).not.toBeNull();
    expect(container.querySelector("[data-cv]")).not.toBeNull();
  });
});

describe("ProjectView", () => {
  it("EN renders the English summary and purpose", () => {
    const p = projects[0];
    const { container } = render(<ProjectView lang="en" slug={p.slug} />);
    expect(container.textContent).toContain(p.text.en.purpose);
    expect(container.textContent).toContain(p.text.en.whatIDid);
  });

  it("renders the demo link only when demoUrl is defined; repo link always", async () => {
    const base = projects.find((p) => p.repoUrl && !p.siteUrl)!;
    const hrefs = async (demoUrl?: string) => {
      vi.resetModules();
      vi.doMock("@/content/projects", () => ({
        projects: [{ ...base, slug: "demo-test", demoUrl }],
      }));
      const Mod = (await import("@/views/ProjectView")).default;
      const { container } = render(Mod({ lang: "en", slug: "demo-test" }));
      return Array.from(container.querySelectorAll("article .cta-actions a")).map((a) => a.getAttribute("href"));
    };
    expect(await hrefs(undefined)).toEqual([base.repoUrl]);
    cleanup();
    expect(await hrefs("https://demo.example.com")).toEqual(["https://demo.example.com", base.repoUrl]);
  });

  it("shows the live-site link first for a project with a siteUrl", () => {
    const p = projects.find((x) => x.siteUrl)!;
    const { container } = render(<ProjectView lang="it" slug={p.slug} />);
    const hrefs = Array.from(container.querySelectorAll("article .cta-actions a")).map((a) => a.getAttribute("href"));
    expect(hrefs[0]).toBe(p.siteUrl);
  });

  it("throws for an unknown slug", () => {
    expect(() => ProjectView({ lang: "it", slug: "nope" })).toThrow();
  });

  it("throws when text.en is missing, without falling back", async () => {
    vi.resetModules();
    const base = projects[0];
    vi.doMock("@/content/projects", () => ({
      projects: [{ ...base, slug: "broken", text: { it: base.text.it } }],
    }));
    const Mod = (await import("@/views/ProjectView")).default;
    expect(() => Mod({ lang: "en", slug: "broken" })).toThrow();
  });

  it("throws when one of the four strings is empty", async () => {
    vi.resetModules();
    const base = projects[0];
    vi.doMock("@/content/projects", () => ({
      projects: [{ ...base, slug: "broken", text: { ...base.text, en: { ...base.text.en, purpose: "" } } }],
    }));
    const Mod = (await import("@/views/ProjectView")).default;
    expect(() => Mod({ lang: "en", slug: "broken" })).toThrow();
  });
});

describe("assetHref / base path", () => {
  it("assetHref prefixes root-relative paths only", async () => {
    const { assetHref } = await import("@/lib/site");
    const env = { NEXT_PUBLIC_BASE_PATH: "/portfolio" };
    expect(assetHref("/cv.pdf", env)).toBe("/portfolio/cv.pdf");
    expect(assetHref("https://x.it/cv.pdf", env)).toBe("https://x.it/cv.pdf");
  });

  it("ContactView applies the base path to a root-relative cvUrl, not to https", async () => {
    process.env.NEXT_PUBLIC_BASE_PATH = "/portfolio";
    try {
      for (const [cv, expected] of [
        ["/cv.pdf", "/portfolio/cv.pdf"],
        ["https://x.it/cv.pdf", "https://x.it/cv.pdf"],
      ]) {
        vi.resetModules();
        vi.doMock("@/content/site", () => ({
          site: { email: "a@b.it", github: "https://github.com/x", cvUrl: cv },
        }));
        const Mod = (await import("@/views/ContactView")).default;
        const { container, unmount } = render(<Mod lang="it" />);
        expect(container.querySelector("[data-cv]")?.getAttribute("href")).toBe(expected);
        unmount();
      }
    } finally {
      delete process.env.NEXT_PUBLIC_BASE_PATH;
    }
  });
});
