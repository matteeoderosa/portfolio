import { dictionaries } from "@/content/dictionaries";
import { site } from "@/content/site";
import { assetHref } from "@/lib/site";
import type { Lang } from "@/lib/routes";
import Stage from "@/components/Stage";
import NeedPicker from "@/components/NeedPicker";

export default function ContactView({ lang }: { lang: Lang }) {
  const dict = dictionaries[lang];
  const c = dict.contact;
  const choices = [...dict.home.services.map((s) => s.title), dict.cta.other];
  return (
    <div className="split page-split">
      <Stage />
      <div className="col page-col">
        <h1 className="rise">{c.title}</h1>
        <p className="lead rise" style={{ "--i": 1 } as React.CSSProperties}>
          {c.intro}
        </p>
        <ul className="contact-list">
          <li data-reveal>
            <span className="label">{c.emailLabel}</span>
            <a className="contact-big" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </li>
          <li data-reveal>
            <span className="label">{dict.footer.github}</span>
            <a href={site.github} target="_blank" rel="noopener noreferrer">
              {site.github.replace(/^https?:\/\//, "")}
            </a>
          </li>
          {site.phone ? (
            <li data-reveal>
              <span className="label">{c.phoneLabel}</span>
              <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}>{site.phone}</a>
            </li>
          ) : null}
          {site.linkedin ? (
            <li data-reveal>
              <span className="label">{c.linkedinLabel}</span>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
                {c.linkedinLabel}
              </a>
            </li>
          ) : null}
        </ul>
        {site.cvUrl ? (
          <p>
            <a className="btn btn-quiet" data-cv href={assetHref(site.cvUrl)} target="_blank" rel="noopener noreferrer">
              {c.cvLabel}
            </a>
          </p>
        ) : null}
        <h2 data-reveal>{dict.cta.title}</h2>
        <p data-reveal>{c.invite}</p>
        <div data-reveal>
          <NeedPicker
            email={site.email}
            legend={dict.cta.legend}
            choices={choices}
            send={dict.cta.send}
            mailSubject={dict.cta.mailSubject}
            mailBody={dict.cta.mailBody}
          />
        </div>
      </div>
    </div>
  );
}
