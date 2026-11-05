import { dictionaries } from "@/content/dictionaries";
import { site } from "@/content/site";
import { assetHref } from "@/lib/site";
import type { Lang } from "@/lib/routes";
import PhotoStage from "@/components/PhotoStage";
import { contactMosaic } from "@/content/photos";
import NeedPicker from "@/components/NeedPicker";
import MailLink from "@/components/MailLink";

export default function ContactView({ lang }: { lang: Lang }) {
  const dict = dictionaries[lang];
  const c = dict.contact;
  const choices = [...dict.home.services.map((s) => s.title), dict.cta.other];
  return (
    <div className="split page-split">
      <PhotoStage lang={lang} tree={contactMosaic} />
      <div className="col page-col">
        <h1 className="rise">{c.title}</h1>
        <p className="lead rise" style={{ "--i": 1 } as React.CSSProperties}>
          {c.intro}
        </p>
        <ul className="contact-list">
          <li data-reveal>
            <span className="label">{c.emailLabel}</span>
            <MailLink className="contact-big" href={`mailto:${site.email}`}>
              {site.email}
            </MailLink>
          </li>
          <li data-reveal>
            <span className="label">{dict.footer.github}</span>
            <span className="link-stack">
              {[site.github, site.githubAlt].filter((u): u is string => Boolean(u)).map((u) => (
                <a key={u} href={u} target="_blank" rel="noopener noreferrer">
                  {u.replace(/^https?:\/\//, "")}
                </a>
              ))}
            </span>
          </li>
          {site.instagram ? (
            <li data-reveal>
              <span className="label">{c.instagramLabel}</span>
              <a href={site.instagram} target="_blank" rel="noopener noreferrer">
                {site.instagram.replace(/^https?:\/\/(www\.)?/, "")}
              </a>
            </li>
          ) : null}
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
