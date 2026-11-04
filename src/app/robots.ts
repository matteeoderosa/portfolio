import type { MetadataRoute } from "next";
import { NOINDEX, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: NOINDEX ? { userAgent: "*", disallow: "/" } : { userAgent: "*", allow: "/", disallow: "/stile/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
