// Paths are base-path-free: `withBase` / `next/link` add the base path at render time.
export type Lang = "it" | "en";
export type RouteKey = "home" | "projects" | "about" | "contact" | "archive";

const ROUTES: Record<Lang, Partial<Record<RouteKey, string>>> = {
  it: {
    home: "/",
    projects: "/progetti/",
    about: "/chi-sono/",
    contact: "/contatti/",
    archive: "/archivio/",
  },
  en: {
    home: "/en/",
    projects: "/en/projects/",
    about: "/en/about/",
    contact: "/en/contact/",
  },
};

const PROJECT_PREFIX: Record<Lang, string> = { it: "/progetti/", en: "/en/projects/" };

export function routePath(key: RouteKey, lang: Lang): string {
  const path = ROUTES[lang][key];
  if (!path) throw new Error(`No "${key}" route for language "${lang}"`);
  return path;
}

export function projectPath(slug: string, lang: Lang): string {
  return `${PROJECT_PREFIX[lang]}${slug}/`;
}

function withSlash(p: string): string {
  return p.endsWith("/") ? p : `${p}/`;
}

/** Equivalent path in the other language, or null when there is none (the archive in EN). */
export function alternatePath(pathname: string, to: Lang): string | null {
  const path = withSlash(pathname);
  const from: Lang = to === "en" ? "it" : "en";

  for (const key of Object.keys(ROUTES[from]) as RouteKey[]) {
    if (ROUTES[from][key] === path) return ROUTES[to][key] ?? null;
  }

  const prefix = PROJECT_PREFIX[from];
  if (path.startsWith(prefix) && path.length > prefix.length) {
    return PROJECT_PREFIX[to] + path.slice(prefix.length);
  }
  return null;
}

/** True when `href` is the current page, or a section containing it (never for the home routes, except exact). */
export function isCurrentPath(href: string, pathname: string): boolean {
  const h = withSlash(href);
  const p = withSlash(pathname);
  if (h === "/" || h === "/en/") return p === h;
  return p === h || p.startsWith(h);
}
