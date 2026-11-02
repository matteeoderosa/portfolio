import Link from "next/link";
import type { Project } from "@/content/projects";
import { projectPath, type Lang } from "@/lib/routes";
import TagList from "./TagList";

type Props = { project: Project; lang: Lang; viewLabel: string };

export default function ProjectCard({ project, lang, viewLabel }: Props) {
  const text = project.text[lang];
  if (!text) throw new Error(`Project "${project.slug}" has no "${lang}" text`);
  return (
    <article className="project-card" data-project-card>
      <h3>
        <Link href={projectPath(project.slug, lang)}>{text.name}</Link>
      </h3>
      <p>{text.summary}</p>
      <TagList tags={project.tech} />
      <Link className="card-link" href={projectPath(project.slug, lang)} aria-label={`${viewLabel}: ${text.name}`}>
        {viewLabel}
      </Link>
    </article>
  );
}
