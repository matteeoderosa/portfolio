import { describe, it, expect, afterEach, vi } from "vitest";
import { render, cleanup } from "@testing-library/react";

let mockPath = "/";
vi.mock("next/navigation", () => ({ usePathname: () => mockPath }));

import MainNav from "@/components/MainNav";

const itNav = [
  { label: "Home", href: "/" },
  { label: "Progetti", href: "/progetti/" },
  { label: "Chi sono", href: "/chi-sono/" },
  { label: "Contatti", href: "/contatti/" },
];
const enNav = [
  { label: "Home", href: "/en/" },
  { label: "Projects", href: "/en/projects/" },
  { label: "About", href: "/en/about/" },
  { label: "Contact", href: "/en/contact/" },
];

afterEach(cleanup);

function current(nav: typeof itNav, path: string) {
  mockPath = path;
  const { container } = render(<MainNav items={nav} ariaLabel="Menu" />);
  return Array.from(container.querySelectorAll('[aria-current="page"]')).map((a) =>
    a.getAttribute("href"),
  );
}

describe("MainNav", () => {
  it.each([
    [itNav, "/", ["/"]],
    [itNav, "/progetti/", ["/progetti/"]],
    [itNav, "/progetti/to-do/", ["/progetti/"]],
    [itNav, "/chi-sono/", ["/chi-sono/"]],
    [enNav, "/en/", ["/en/"]],
    [enNav, "/en/about/", ["/en/about/"]],
    [enNav, "/en/projects/to-do/", ["/en/projects/"]],
  ])("marks exactly the right item for %#", (nav, path, expected) => {
    const got = current(nav, path).map((h) => h && h.replace(/([^/])$/, "$1/"));
    expect(got).toEqual(expected);
  });
});
