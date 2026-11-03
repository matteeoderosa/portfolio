import Link from "next/link";
import type { Project } from "@/content/projects";
import { projectPath, type Lang } from "@/lib/routes";
import TagList from "./TagList";

type Props = {
  project: Project;
  lang: Lang;
  viewLabel: string;
  /** Heading level for the card title: 3 under a section h2, 2 directly under the page h1. */
  headingLevel?: 2 | 3;
};

export default function ProjectCard({ project, lang, viewLabel, headingLevel = 3 }: Props) {
  const text = project.text[lang];
  if (!text) throw new Error(`Project "${project.slug}" has no "${lang}" text`);
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className="project-card" data-project-card>
      <Heading className="card-title">
        <Link href={projectPath(project.slug, lang)}>{text.name}</Link>
      </Heading>
      <p>{text.summary}</p>
      <TagList tags={project.tech} />
      <Link className="card-link" href={projectPath(project.slug, lang)} aria-label={`${viewLabel}: ${text.name}`}>
        {viewLabel}
      </Link>
    </article>
  );
}
