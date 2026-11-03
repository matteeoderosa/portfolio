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
          {[
            { key: "main", title: dict.projects.mainTitle, items: projects.filter((p) => p.main) },
            { key: "other", title: dict.projects.otherTitle, items: projects.filter((p) => !p.main) },
          ]
            .filter((g) => g.items.length > 0)
            .map((g) => (
              <section key={g.key} aria-labelledby={`projects-${g.key}`}>
                <h2 id={`projects-${g.key}`} data-reveal>
                  {g.title}
                </h2>
                <div className="ledger">
                  {g.items.map((p, i) => (
                    <ProjectCard
                      key={p.slug}
                      project={p}
                      lang={lang}
                      viewLabel={dict.projects.viewProject}
                      visitLabel={dict.projects.visit}
                      index={i}
                    />
                  ))}
                </div>
              </section>
            ))}
        </div>
      </div>
      <ContactCta lang={lang} />
    </>
  );
}
