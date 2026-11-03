import { dictionaries } from "@/content/dictionaries";
import { site } from "@/content/site";
import type { Lang } from "@/lib/routes";

export default function ContactCta({ lang }: { lang: Lang }) {
  const dict = dictionaries[lang];
  return (
    <section className="contact-cta">
      <div className="wrap contact-cta-inner">
        <p>{dict.cta.text}</p>
        <div className="cta-actions">
          <a className="btn btn-primary" href={`mailto:${site.email}`}>
            {dict.nav.write}
          </a>
          <a className="btn btn-ghost" href={site.github} target="_blank" rel="noopener noreferrer">
            {dict.footer.github}
          </a>
        </div>
      </div>
    </section>
  );
}
