import { dictionaries } from "@/content/dictionaries";
import { projects } from "@/content/projects";
import type { Lang } from "@/lib/routes";
import ProjectCard from "@/components/ProjectCard";
import ContactCta from "@/components/ContactCta";

export default function ProjectsView({ lang }: { lang: Lang }) {
  const dict = dictionaries[lang];
  return (
    <>
      <section className="section page-head">
        <div className="wrap">
          <h1>{dict.projects.title}</h1>
          <p className="lead">{dict.projects.intro}</p>
          <div className="card-grid">
            {projects.map((p) => (
              <ProjectCard key={p.slug} project={p} lang={lang} viewLabel={dict.projects.viewProject} headingLevel={2} />
            ))}
          </div>
        </div>
      </section>
      <ContactCta lang={lang} />
    </>
  );
}
