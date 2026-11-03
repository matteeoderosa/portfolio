import { dictionaries } from "@/content/dictionaries";
import { site } from "@/content/site";
import { assetHref } from "@/lib/site";
import type { Lang } from "@/lib/routes";
import ProjectStage from "@/components/ProjectStage";
import PhotoMosaic from "@/components/PhotoMosaic";
import { aboutMosaics } from "@/content/photos";
import ContactCta from "@/components/ContactCta";

export default function AboutView({ lang }: { lang: Lang }) {
  const dict = dictionaries[lang];
  return (
    <>
      <div className="split page-split">
        <ProjectStage
          shots={[]}
          mosaics={aboutMosaics.map((m) => ({ id: m.id, node: <PhotoMosaic lang={lang} tree={m.tree} /> }))}
        />
        <div className="col page-col">
          <h1 className="rise">{dict.about.title}</h1>
          <div data-stage-me="volti">
            <p className="lead rise" style={{ "--i": 1 } as React.CSSProperties}>
              {dict.about.intro}
            </p>
            {site.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img className="portrait" data-portrait src={assetHref(site.photo)} alt={dict.contact.photoAlt} />
            ) : null}
            {dict.about.paragraphs.slice(0, 1).map((p) => (
              <p key={p} data-reveal>
                {p}
              </p>
            ))}
          </div>
          <div data-stage-me="giro">
            {dict.about.paragraphs.slice(1).map((p, i) => (
              <p key={p} data-reveal style={{ "--i": i } as React.CSSProperties}>
                {p}
              </p>
            ))}
          </div>
          <div data-stage-me="ciclismo">
            <h2 data-reveal>{dict.about.interestsTitle}</h2>
            <ul className="interests" data-reveal>
              {dict.about.interests.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <ContactCta lang={lang} />
    </>
  );
}
