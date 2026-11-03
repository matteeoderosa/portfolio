import Link from "next/link";
import type { Project } from "@/content/projects";
import { projectPath, type Lang } from "@/lib/routes";
import TagList from "./TagList";

type Props = {
  project: Project;
  lang: Lang;
  viewLabel: string;
  /** Label of the direct link to the live site, shown when the project has one. */
  visitLabel?: string;
  /** Heading level for the card title: 3 under a section h2, 2 directly under the page h1. */
  headingLevel?: 2 | 3;
  /** Position in the list, used to stagger the entrance. */
  index?: number;
};

/** One row of the ledger of work. */
export default function ProjectCard({ project, lang, viewLabel, visitLabel, headingLevel = 3, index = 0 }: Props) {
  const text = project.text[lang];
  if (!text) throw new Error(`Project "${project.slug}" has no "${lang}" text`);
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <article
      className="ledger-row"
      data-project-card
      data-slug={project.slug}
      data-reveal
      style={{ "--i": index } as React.CSSProperties}
    >
      <Heading className="ledger-name">
        <Link href={projectPath(project.slug, lang)}>{text.name}</Link>
      </Heading>
      <div className="ledger-body">
        <p>{text.summary}</p>
        <TagList tags={project.tech} />
        {project.siteUrl && visitLabel ? (
          <a
            className="ledger-link ledger-link-main"
            href={project.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${visitLabel}: ${text.name}`}
          >
            {visitLabel}
          </a>
        ) : null}
        <Link
          className="ledger-link ledger-link-quiet"
          href={projectPath(project.slug, lang)}
          aria-label={`${viewLabel}: ${text.name}`}
        >
          {viewLabel}
        </Link>
      </div>
    </article>
  );
}
