import { dictionaries } from "@/content/dictionaries";
import { site } from "@/content/site";
import { assetHref } from "@/lib/site";
import type { Lang } from "@/lib/routes";
import Stage from "@/components/Stage";
import ContactCta from "@/components/ContactCta";

export default function AboutView({ lang }: { lang: Lang }) {
  const dict = dictionaries[lang];
  return (
    <>
      <div className="split page-split">
        <Stage />
        <div className="col page-col">
          <h1 className="rise">{dict.about.title}</h1>
          <p className="lead rise" style={{ "--i": 1 } as React.CSSProperties}>
            {dict.about.intro}
          </p>
          {site.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="portrait" data-portrait src={assetHref(site.photo)} alt={dict.contact.photoAlt} />
          ) : null}
          {dict.about.paragraphs.map((p, i) => (
            <p key={p} data-reveal style={{ "--i": i } as React.CSSProperties}>
              {p}
            </p>
          ))}
          <h2 data-reveal>{dict.about.interestsTitle}</h2>
          <ul className="interests" data-reveal>
            {dict.about.interests.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>
      </div>
      <ContactCta lang={lang} />
    </>
  );
}
