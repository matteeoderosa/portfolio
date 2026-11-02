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
    expect(container.querySelector("img")).toBeNull();
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
