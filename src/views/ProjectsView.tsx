import { dictionaries } from "@/content/dictionaries";
import { projects } from "@/content/projects";
import type { Lang } from "@/lib/routes";
import Stage from "@/components/Stage";
import ProjectCard from "@/components/ProjectCard";
import ContactCta from "@/components/ContactCta";

export default function ProjectsView({ lang }: { lang: Lang }) {
  const dict = dictionaries[lang];
  return (
    <>
      <div className="split page-split">
        <Stage />
        <div className="col page-col">
          <h1 className="rise">{dict.projects.title}</h1>
          <p className="lead rise" style={{ "--i": 1 } as React.CSSProperties}>
            {dict.projects.intro}
          </p>
          <div className="ledger">
            {projects.map((p, i) => (
              <ProjectCard
                key={p.slug}
                project={p}
                lang={lang}
                viewLabel={dict.projects.viewProject}
                headingLevel={2}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
      <ContactCta lang={lang} />
    </>
  );
}
