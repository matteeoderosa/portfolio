import { describe, it, expect } from "vitest";
import { dictionaries } from "@/content/dictionaries";

function keyPaths(obj: unknown, prefix = ""): string[] {
  if (Array.isArray(obj)) {
    return obj.flatMap((v, i) => keyPaths(v, `${prefix}[${i}]`));
  }
  if (obj && typeof obj === "object") {
    return Object.entries(obj).flatMap(([k, v]) => keyPaths(v, prefix ? `${prefix}.${k}` : k));
  }
  return [prefix];
}

function strings(obj: unknown): string[] {
  if (typeof obj === "string") return [obj];
  if (Array.isArray(obj)) return obj.flatMap(strings);
  if (obj && typeof obj === "object") return Object.values(obj).flatMap(strings);
  return [];
}

describe("dictionaries", () => {
  it("IT and EN have the identical key set", () => {
    expect(keyPaths(dictionaries.en)).toEqual(keyPaths(dictionaries.it));
  });
  it("has no empty strings", () => {
    for (const lang of ["it", "en"] as const) {
      for (const s of strings(dictionaries[lang])) expect(s.trim()).not.toBe("");
    }
  });
  it("has the required top-level keys", () => {
    for (const lang of ["it", "en"] as const) {
      for (const k of ["nav", "home", "projects", "about", "contact", "footer", "a11y"]) {
        expect(dictionaries[lang]).toHaveProperty(k);
      }
      expect(dictionaries[lang].home.services.length).toBe(3);
    }
  });
});
