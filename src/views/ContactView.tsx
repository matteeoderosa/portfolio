import { dictionaries } from "@/content/dictionaries";
import { site } from "@/content/site";
import type { Lang } from "@/lib/routes";

export default function ContactView({ lang }: { lang: Lang }) {
  const dict = dictionaries[lang];
  const c = dict.contact;
  return (
    <section className="section page-head">
      <div className="wrap">
        <h1>{c.title}</h1>
        <p className="lead">{c.intro}</p>
        <ul className="contact-list">
          <li>
            <span className="label mono">{c.emailLabel}</span>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </li>
          <li>
            <span className="label mono">{dict.footer.github}</span>
            <a href={site.github} target="_blank" rel="noopener noreferrer">
              {site.github.replace(/^https?:\/\//, "")}
            </a>
          </li>
          {site.phone ? (
            <li>
              <span className="label mono">{c.phoneLabel}</span>
              <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}>{site.phone}</a>
            </li>
          ) : null}
          {site.linkedin ? (
            <li>
              <span className="label mono">{c.linkedinLabel}</span>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
                {c.linkedinLabel}
              </a>
            </li>
          ) : null}
        </ul>
        {site.cvUrl ? (
          <a className="btn btn-primary" data-cv href={site.cvUrl} target="_blank" rel="noopener noreferrer">
            {c.cvLabel}
          </a>
        ) : null}
        <p>{c.invite}</p>
      </div>
    </section>
  );
}
