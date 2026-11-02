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
    const link = screen.getByRole("link", { name: "Passa all'inglese" });
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
  it("renders a non-link when there is no alternate", () => {
    render(<LangSwitch lang="it" currentPath="/archivio/" label="Passa all'inglese" unavailable="Non disponibile in inglese" />);
    expect(screen.queryByRole("link")).toBeNull();
    expect(screen.getByTitle("Non disponibile in inglese")).toBeTruthy();
  });
});
