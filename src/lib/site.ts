export type SiteEnv = Partial<
  Record<
    "NEXT_PUBLIC_BASE_PATH" | "NEXT_PUBLIC_SITE_URL" | "NEXT_PUBLIC_NOINDEX",
    string | undefined
  >
>;

const DEFAULT_SITE_URL = "https://matteoderosa.it";

// Next inlines NEXT_PUBLIC_* only for static `process.env.X` accesses.
function currentEnv(): SiteEnv {
  return {
    NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_NOINDEX: process.env.NEXT_PUBLIC_NOINDEX,
  };
}

export function getBasePath(env: SiteEnv = currentEnv()): string {
  return (env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/+$/, "");
}

export function getSiteUrl(env: SiteEnv = currentEnv()): string {
  return (env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, "");
}

export function isNoindex(env: SiteEnv = currentEnv()): boolean {
  return env.NEXT_PUBLIC_NOINDEX === "1";
}

/** Prefix the base path to a root-absolute path. */
export function withBase(path: string, env: SiteEnv = currentEnv()): string {
  return getBasePath(env) + path;
}

/** SITE_URL + path. SITE_URL already includes any base path, so none is added. */
export function absoluteUrl(path: string, env: SiteEnv = currentEnv()): string {
  return getSiteUrl(env) + path;
}

export const SITE_URL: string = getSiteUrl();
export const BASE_PATH: string = getBasePath();
export const NOINDEX: boolean = isNoindex();
