import { describe, it, expect, afterEach, vi } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { site } from "@/content/site";
import { dictionaries } from "@/content/dictionaries";
import ProjectsView from "@/views/ProjectsView";
import HomeView from "@/views/HomeView";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

afterEach(cleanup);

function levels(container: HTMLElement): number[] {
  return [...container.querySelectorAll("h1, h2, h3, h4, h5, h6")].map((h) => Number(h.tagName[1]));
}

function skipsLevel(ls: number[]): boolean {
  return ls.some((l, i) => i > 0 && l > ls[i - 1] + 1);
}

describe("heading outline", () => {
  for (const lang of ["it", "en"] as const) {
    it(`Projects page (${lang}) does not skip heading levels`, () => {
      const { container } = render(<ProjectsView lang={lang} />);
      const ls = levels(container);
      expect(ls[0]).toBe(1);
      expect(skipsLevel(ls)).toBe(false);
      expect(container.querySelectorAll("[data-project-card] h3").length).toBeGreaterThan(0);
    });
    it(`Home page (${lang}) keeps card titles at h3 under section h2s`, () => {
      const { container } = render(<HomeView lang={lang} />);
      expect(skipsLevel(levels(container))).toBe(false);
      expect(container.querySelectorAll("[data-project-card] h3").length).toBeGreaterThan(0);
    });
  }
});

describe("contact details come from site.ts", () => {
  const labels = {
    nav: [{ label: "Home", href: "/" }],
    write: "Scrivimi",
    skip: "Salta",
    theme: { dark: "Scuro", light: "Chiaro" },
    langSwitch: { label: "Passa all'inglese", unavailable: "n/a" },
  };
  it("Header mailto uses site.email", () => {
    const { container } = render(<Header lang="it" labels={labels} />);
    expect(container.querySelector(`a[href="mailto:${site.email}"]`)).not.toBeNull();
  });
  it("Footer GitHub link uses site.github", () => {
    const { container } = render(<Footer lang="it" labels={dictionaries.it.footer} />);
    expect(container.querySelector(`a[href="${site.github}"]`)).not.toBeNull();
  });
});

describe("copy", () => {
  it("IT about intro says 'sviluppatore web'", () => {
    expect(dictionaries.it.about.intro).toContain("sviluppatore web");
    expect(dictionaries.it.about.intro).not.toContain("sviluppo web di");
  });
});
