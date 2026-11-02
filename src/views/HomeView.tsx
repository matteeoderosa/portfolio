import Link from "next/link";
import { dictionaries } from "@/content/dictionaries";
import { projects } from "@/content/projects";
import { routePath, type Lang } from "@/lib/routes";
import ProjectCard from "@/components/ProjectCard";
import ContactCta from "@/components/ContactCta";

export default function HomeView({ lang }: { lang: Lang }) {
  const dict = dictionaries[lang];
  const featured = projects.filter((p) => p.featured).slice(0, 4);
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <p className="eyebrow mono">{dict.home.eyebrow}</p>
          <h1>{dict.home.title}</h1>
          <p className="lead">{dict.home.intro}</p>
          <Link className="btn btn-primary" href={routePath("projects", lang)}>
            {dict.home.ctaProjects}
          </Link>
        </div>
      </section>
      <section className="section" aria-labelledby="services-title">
        <div className="wrap">
          <h2 id="services-title">{dict.home.servicesTitle}</h2>
          <ul className="services">
            {dict.home.services.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section" aria-labelledby="featured-title">
        <div className="wrap">
          <h2 id="featured-title">{dict.home.featuredTitle}</h2>
          <div className="card-grid">
            {featured.map((p) => (
              <ProjectCard key={p.slug} project={p} lang={lang} viewLabel={dict.projects.viewProject} />
            ))}
          </div>
        </div>
      </section>
      <ContactCta lang={lang} />
    </>
  );
}
