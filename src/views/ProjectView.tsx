import Link from "next/link";
import { dictionaries } from "@/content/dictionaries";
import { projects } from "@/content/projects";
import { routePath, type Lang } from "@/lib/routes";
import { assetHref } from "@/lib/site";
import Stage from "@/components/Stage";
import TagList from "@/components/TagList";
import ContactCta from "@/components/ContactCta";

const TEXT_KEYS = ["name", "summary", "purpose", "whatIDid"] as const;

export default function ProjectView({ lang, slug }: { lang: Lang; slug: string }) {
  const project = projects.find((p) => p.slug === slug);
  if (!project) throw new Error(`Unknown project "${slug}"`);
  const text = project.text?.[lang];
  if (!text) throw new Error(`Project "${slug}" has no "${lang}" text`);
  for (const k of TEXT_KEYS) {
    if (typeof text[k] !== "string" || text[k].trim() === "") {
      throw new Error(`Project "${slug}" is missing "${k}" for "${lang}"`);
    }
  }
  const dict = dictionaries[lang];
  const shot = project.screenshot;
  return (
    <>
      <div className="split page-split">
        <Stage />
        <article className="col page-col project-detail">
          <h1 className="rise">{text.name}</h1>
          <p className="lead rise" style={{ "--i": 1 } as React.CSSProperties}>
            {text.summary}
          </p>
          {shot ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="shot" src={assetHref(shot)} alt={text.name} />
          ) : null}
          <h2 data-reveal>{dict.projects.purposeTitle}</h2>
          <p data-reveal>{text.purpose}</p>
          <h2 data-reveal>{dict.projects.whatIDidTitle}</h2>
          <p data-reveal>{text.whatIDid}</p>
          <div className="cta-actions" data-reveal>
            {project.demoUrl ? (
              <a className="btn btn-primary" href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                {dict.projects.demo}
              </a>
            ) : null}
            <a className="btn btn-quiet" href={project.repoUrl} target="_blank" rel="noopener noreferrer">
              {dict.projects.repo}
            </a>
          </div>
          <TagList tags={project.tech} label={dict.projects.techTitle} />
          <p className="back-link" data-reveal>
            <Link href={routePath("projects", lang)}>
              <span aria-hidden="true">&larr; </span>
              {dict.projects.back}
            </Link>
          </p>
        </article>
      </div>
      <ContactCta lang={lang} />
    </>
  );
}
