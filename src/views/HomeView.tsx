import Link from "next/link";
import { dictionaries } from "@/content/dictionaries";
import { projects } from "@/content/projects";
import { projectPath, routePath, type Lang } from "@/lib/routes";
import ProjectStage from "@/components/ProjectStage";
import PhotoGrid from "@/components/PhotoGrid";
import PhotoStage from "@/components/PhotoStage";
import { aboutMosaics, heroLayout, heroPhotos } from "@/content/photos";
import { stageShots } from "@/lib/shots";
import ProjectCard from "@/components/ProjectCard";
import ContactCta from "@/components/ContactCta";

const delay = (i: number) => ({ "--i": i }) as React.CSSProperties;

export default function HomeView({ lang }: { lang: Lang }) {
  const dict = dictionaries[lang];
  const featured = projects.filter((p) => p.featured).slice(0, 4);
  return (
    <>
      <div className="split split-hero" data-nav={routePath("home", lang)}>
        <PhotoStage lang={lang} keys={heroPhotos} layout={heroLayout} />
        <div className="col hero-col">
          <h1 className="rise" style={delay(0)}>
            {dict.home.title}
          </h1>
          <p className="lead rise" style={delay(1)}>
            {dict.home.intro}
          </p>
          <div className="rise" style={delay(2)}>
            <Link className="btn btn-primary" href={routePath("projects", lang)}>
              {dict.home.ctaProjects}
            </Link>
          </div>
        </div>
      </div>

      <section className="services" data-nav={routePath("home", lang)} aria-labelledby="services-title">
        <h2 id="services-title" data-reveal>
          {dict.home.servicesTitle}
        </h2>
        <div className="svc-list">
          {dict.home.services.map((s) => (
            <article key={s.title} className="svc">
              <h3 data-reveal>{s.title}</h3>
              <div className="svc-row">
                <div data-reveal style={delay(1)}>
                  <p>{s.text}</p>
                  <ul>
                    {s.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="svc-proof" data-reveal>
          {dict.home.servicesProof}{" "}
          <Link className="text-link" href={projectPath("pisa-running-club", lang)}>
            {dict.home.servicesProofLink}
          </Link>
        </p>
      </section>

      <div className="split split-story">
        <ProjectStage
          shots={stageShots(lang)}
          mosaics={aboutMosaics.map((m) => ({ id: m.id, node: <PhotoGrid lang={lang} keys={m.keys} /> }))}
        />
        <div className="col story-col">
          <section className="story-section" data-nav={routePath("projects", lang)} aria-labelledby="featured-title">
            <h2 id="featured-title" data-reveal>
              {dict.home.featuredTitle}
            </h2>
            <div className="ledger">
              {featured.map((p, i) => (
                <ProjectCard key={p.slug} project={p} lang={lang} viewLabel={dict.projects.viewProject} visitLabel={dict.projects.visit} index={i} />
              ))}
            </div>
            <p data-reveal>
              <Link className="text-link" href={routePath("projects", lang)}>
                {dict.home.allProjects}
              </Link>
            </p>
          </section>

          <section className="story-section" data-nav={routePath("about", lang)} aria-labelledby="about-title">
            <div data-stage-me="volti">
              <h2 id="about-title" data-reveal>
                {dict.about.title}
              </h2>
              <p className="lead" data-reveal style={delay(1)}>
                {dict.about.intro}
              </p>
              <p data-reveal style={delay(2)}>
                {dict.about.paragraphs[0]}
              </p>
            </div>
            <div data-stage-me="giro">
              {dict.about.paragraphs.slice(1).map((p, i) => (
                <p key={p} data-reveal style={delay(i + 3)}>
                  {p}
                </p>
              ))}
            </div>
          </section>

          <section className="story-section" data-stage-me="ciclismo" data-nav={routePath("about", lang)} aria-labelledby="outside-title">
            <h2 id="outside-title" data-reveal>
              {dict.about.interestsTitle}
            </h2>
            <ul className="interests" data-reveal>
              {dict.about.interests.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
            <p data-reveal>
              <Link className="text-link" href={routePath("about", lang)}>
                {dict.home.aboutLink}
              </Link>
            </p>
          </section>
        </div>
      </div>

      <ContactCta lang={lang} variant="photo" />
    </>
  );
}
