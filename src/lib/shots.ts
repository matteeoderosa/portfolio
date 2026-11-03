import { projects } from "@/content/projects";
import { assetHref } from "@/lib/site";
import type { StageShot } from "@/components/ProjectStage";
import type { Lang } from "@/lib/routes";

/** Screenshot dei progetti nell'ordine in cui compaiono negli elenchi (principali per primi). */
export function stageShots(lang: Lang, only?: string[]): StageShot[] {
  const ordered = [...projects.filter((p) => p.main), ...projects.filter((p) => !p.main)];
  return ordered
    .filter((p) => p.screenshot && (!only || only.includes(p.slug)))
    .map((p) => ({ slug: p.slug, src: assetHref(p.screenshot as string), alt: p.text[lang].name }));
}
