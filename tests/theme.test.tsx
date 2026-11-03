import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import ThemeToggle from "@/components/ThemeToggle";

const labels = { dark: "Tema scuro", light: "Tema chiaro" };

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  document.documentElement.removeAttribute("data-theme");
});

describe("ThemeToggle", () => {
  it("sets data-theme on <html> when clicked", () => {
    render(<ThemeToggle labels={labels} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    const first = document.documentElement.getAttribute("data-theme");
    expect(["light", "dark"]).toContain(first);
    expect(button.getAttribute("aria-pressed")).toBe(String(first === "dark"));
    fireEvent.click(button);
    expect(document.documentElement.getAttribute("data-theme")).not.toBe(first);
  });

  it("still toggles when localStorage.setItem throws", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("denied");
    });
    render(<ThemeToggle labels={labels} />);
    fireEvent.click(screen.getByRole("button"));
    expect(document.documentElement.getAttribute("data-theme")).toMatch(/^(light|dark)$/);
  });

  it("stores the choice in localStorage", () => {
    const spy = vi.spyOn(Storage.prototype, "setItem");
    render(<ThemeToggle labels={labels} />);
    fireEvent.click(screen.getByRole("button"));
    expect(spy).toHaveBeenCalledWith("theme", document.documentElement.getAttribute("data-theme"));
  });
});
