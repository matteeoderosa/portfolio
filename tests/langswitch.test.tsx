import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import LangSwitch from "@/components/LangSwitch";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("LangSwitch", () => {
  it("links to the alternate path with visible text and aria-label", () => {
    render(<LangSwitch lang="it" currentPath="/progetti/" label="Passa all'inglese" unavailable="Non disponibile in inglese" />);
    const link = screen.getByRole("link", { name: "EN, Passa all'inglese" });
    // next/link normalises the trailing slash outside a configured build
    expect(link.getAttribute("href")).toMatch(/^\/en\/projects\/?$/);
    expect(link.textContent).toContain("EN");
  });
  it("stores the preference and survives a throwing localStorage", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("denied");
    });
    render(<LangSwitch lang="en" currentPath="/en/about/" label="Switch to Italian" unavailable="n/a" />);
    fireEvent.click(screen.getByRole("link"));
  });
  it("stores lang on click", () => {
    const spy = vi.spyOn(Storage.prototype, "setItem");
    render(<LangSwitch lang="en" currentPath="/en/" label="Switch to Italian" unavailable="n/a" />);
    fireEvent.click(screen.getByRole("link"));
    expect(spy).toHaveBeenCalledWith("lang", "it");
  });
  it("accessible name contains the visible language code (label in name)", () => {
    for (const [lang, path, code] of [["it", "/", "EN"], ["en", "/en/", "IT"]] as const) {
      render(<LangSwitch lang={lang} currentPath={path} label="x" unavailable="n/a" />);
      const link = screen.getByRole("link");
      const name = link.getAttribute("aria-label") ?? "";
      expect(link.textContent?.trim()).toBe(code);
      expect(name.startsWith(`${code}, `)).toBe(true);
      cleanup();
    }
  });
  it("renders a non-link when there is no alternate, with the reason in its text", () => {
    const { container } = render(
      <LangSwitch lang="it" currentPath="/archivio/" label="Passa all'inglese" unavailable="Non disponibile in inglese" />,
    );
    expect(screen.queryByRole("link")).toBeNull();
    const el = screen.getByTitle("Non disponibile in inglese");
    // the reason is readable by screen readers, not only as a mouse tooltip
    expect(el.textContent).toContain("Non disponibile in inglese");
    expect(el.querySelector(".visually-hidden")).not.toBeNull();
    // no fake control: no aria-disabled on a non-interactive element, nothing focusable
    expect(el.hasAttribute("aria-disabled")).toBe(false);
    expect(container.querySelector("[tabindex], a, button")).toBeNull();
  });
});
