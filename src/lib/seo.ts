import type { Metadata } from "next";
import { dictionaries } from "@/content/dictionaries";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { projectPath, routePath, type Lang, type RouteKey } from "@/lib/routes";
import { absoluteUrl, isNoindex, withBase, type SiteEnv } from "@/lib/site";

export const OWNER = "Matteo De Rosa";

export type PageKey = RouteKey | { project: string };

const LOCALE: Record<Lang, string> = { it: "it_IT", en: "en_US" };
const OG_ALT: Record<Lang, string> = {
  it: "Matteo De Rosa, sviluppatore web: portfolio",
  en: "Matteo De Rosa, web developer: portfolio",
};
const JOB_TITLE: Record<Lang, string> = { it: "Sviluppatore web", en: "Web developer" };

function pathFor(key: PageKey, lang: Lang): string | null {
  if (typeof key === "object") return projectPath(key.project, lang);
  try {
    return routePath(key, lang);
  } catch {
    return null;
  }
}

function textFor(key: PageKey, lang: Lang): { title: string; description: string } {
  const d = dictionaries[lang];
  if (typeof key === "object") {
    const p = projects.find((x) => x.slug === key.project);
    if (!p) throw new Error(`Unknown project "${key.project}"`);
    const t = p.text[lang];
    return { title: `${t.name} · ${OWNER}`, description: t.summary };
  }
  switch (key) {
    case "home":
      return { title: `${OWNER} · ${d.home.title}`, description: d.home.intro };
    case "projects":
      return { title: `${d.projects.title} · ${OWNER}`, description: d.projects.intro };
    case "about":
      return { title: `${d.about.title} · ${OWNER}`, description: d.about.intro };
    case "contact":
      return { title: `${d.contact.title} · ${OWNER}`, description: d.contact.intro };
  }
}

export function pageMetadata(key: PageKey, lang: Lang, env?: SiteEnv): Metadata {
  const path = pathFor(key, lang);
  if (!path) throw new Error(`No route for ${JSON.stringify(key)} in "${lang}"`);
  const { title, description } = textFor(key, lang);
  const url = absoluteUrl(path, env);

  const languages: Record<string, string> = {};
  const itPath = pathFor(key, "it");
  const enPath = pathFor(key, "en");
  if (itPath) languages.it = absoluteUrl(itPath, env);
  if (enPath) languages.en = absoluteUrl(enPath, env);
  if (itPath) languages["x-default"] = absoluteUrl(itPath, env);

  const meta: Metadata = {
    title,
    description,
    alternates: { canonical: url, languages },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: OWNER,
      locale: LOCALE[lang],
      images: [{ url: absoluteUrl("/og-image.png", env), width: 1200, height: 630, alt: OG_ALT[lang] }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl("/og-image.png", env)],
    },
    icons: {
      // Google vuole un'icona quadrata di almeno 48px, multipla di 48: per questo i PNG da 48 e 96
      icon: [
        { url: withBase("/favicon.ico", env), sizes: "any" },
        { url: withBase("/favicon-48x48.png", env), sizes: "48x48", type: "image/png" },
        { url: withBase("/favicon-96x96.png", env), sizes: "96x96", type: "image/png" },
        { url: withBase("/favicon.svg", env), type: "image/svg+xml" },
      ],
      apple: [{ url: withBase("/apple-touch-icon.png", env) }],
    },
  };
  if (env === undefined ? isNoindex() : isNoindex(env)) meta.robots = { index: false, follow: false };
  return meta;
}

/** Il nome del sito per i risultati di ricerca: Google lo legge dalla home e lo mostra sopra l'indirizzo. */
export function websiteJsonLd(env?: SiteEnv): object {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: OWNER,
    alternateName: new URL(absoluteUrl("/", env)).hostname,
    url: absoluteUrl(routePath("home", "it"), env),
  };
}

export function personJsonLd(lang: Lang, env?: SiteEnv): object {
  const sameAs = [site.github, site.linkedin].filter((u): u is string => Boolean(u));
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: OWNER,
    url: absoluteUrl(routePath("home", lang), env),
    jobTitle: JOB_TITLE[lang],
    ...(sameAs.length ? { sameAs } : {}),
  };
}
