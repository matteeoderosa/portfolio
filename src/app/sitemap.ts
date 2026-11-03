import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { projectPath, routePath, type RouteKey } from "@/lib/routes";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

const KEYS: RouteKey[] = ["home", "projects", "about", "contact"];

function entry(itPath: string, enPath: string | null): MetadataRoute.Sitemap {
  const it = absoluteUrl(itPath);
  const en = enPath ? absoluteUrl(enPath) : null;
  const languages = en ? { it, en } : { it };
  const out: MetadataRoute.Sitemap = [{ url: it, alternates: { languages } }];
  if (en) out.push({ url: en, alternates: { languages } });
  return out;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = KEYS.flatMap((key) => {
    let en: string | null = null;
    try {
      en = routePath(key, "en");
    } catch {
      en = null;
    }
    return entry(routePath(key, "it"), en);
  });
  const projectPages = projects.flatMap((p) => entry(projectPath(p.slug, "it"), projectPath(p.slug, "en")));
  return [...pages, ...projectPages];
}
