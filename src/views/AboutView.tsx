import { dictionaries } from "@/content/dictionaries";
import { site } from "@/content/site";
import { withBase } from "@/lib/site";
import type { Lang } from "@/lib/routes";
import ContactCta from "@/components/ContactCta";

export default function AboutView({ lang }: { lang: Lang }) {
  const dict = dictionaries[lang];
  return (
    <>
      <section className="section page-head">
        <div className="wrap">
          <h1>{dict.about.title}</h1>
          <p className="lead">{dict.about.intro}</p>
          {site.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              className="portrait"
              src={site.photo.startsWith("/") ? withBase(site.photo) : site.photo}
              alt={dict.contact.photoAlt}
            />
          ) : null}
          {dict.about.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <h2>{dict.about.interestsTitle}</h2>
          <ul className="interests">
            {dict.about.interests.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>
      </section>
      <ContactCta lang={lang} />
    </>
  );
}
