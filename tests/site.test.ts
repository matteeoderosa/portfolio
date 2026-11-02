import { describe, expect, it } from "vitest";
import { absoluteUrl, withBase } from "@/lib/site";

describe("site helpers", () => {
  it("withBase prefixes the base path", () => {
    expect(withBase("/a/", { NEXT_PUBLIC_BASE_PATH: "/portfolio" })).toBe("/portfolio/a/");
  });
  it("withBase with empty base returns the path unchanged", () => {
    expect(withBase("/a/", {})).toBe("/a/");
    expect(withBase("/a/", { NEXT_PUBLIC_BASE_PATH: "" })).toBe("/a/");
  });
  it("absoluteUrl uses the default site url", () => {
    expect(absoluteUrl("/en/", {})).toBe("https://matteoderosa.it/en/");
  });
  it("absoluteUrl does not add the base path", () => {
    expect(
      absoluteUrl("/en/", {
        NEXT_PUBLIC_SITE_URL: "https://u.github.io/portfolio",
        NEXT_PUBLIC_BASE_PATH: "/portfolio",
      }),
    ).toBe("https://u.github.io/portfolio/en/");
  });
});
