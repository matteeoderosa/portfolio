import { describe, it, expect } from "vitest";
import { alternatePath, routePath, projectPath } from "@/lib/routes";

describe("routes", () => {
  it("builds route paths", () => {
    expect(routePath("home", "it")).toBe("/");
    expect(routePath("projects", "it")).toBe("/progetti/");
    expect(routePath("about", "it")).toBe("/chi-sono/");
    expect(routePath("contact", "it")).toBe("/contatti/");
    expect(routePath("home", "en")).toBe("/en/");
    expect(routePath("projects", "en")).toBe("/en/projects/");
    expect(routePath("about", "en")).toBe("/en/about/");
    expect(routePath("contact", "en")).toBe("/en/contact/");
  });
  it("builds project paths", () => {
    expect(projectPath("foo", "it")).toBe("/progetti/foo/");
    expect(projectPath("foo", "en")).toBe("/en/projects/foo/");
  });
  it("maps listing pages between languages", () => {
    expect(alternatePath("/progetti/", "en")).toBe("/en/projects/");
    expect(alternatePath("/en/projects/", "it")).toBe("/progetti/");
    expect(alternatePath("/", "en")).toBe("/en/");
    expect(alternatePath("/en/", "it")).toBe("/");
    expect(alternatePath("/chi-sono/", "en")).toBe("/en/about/");
    expect(alternatePath("/en/contact/", "it")).toBe("/contatti/");
  });
  it("maps project detail pages by prefix swap", () => {
    expect(alternatePath("/progetti/my-app/", "en")).toBe("/en/projects/my-app/");
    expect(alternatePath("/en/projects/my-app/", "it")).toBe("/progetti/my-app/");
  });
  it("has no alternate for an unknown page", () => {
    expect(alternatePath("/pagina-che-non-esiste/", "en")).toBeNull();
  });
  it("tolerates a missing trailing slash", () => {
    expect(alternatePath("/progetti", "en")).toBe("/en/projects/");
  });
});
