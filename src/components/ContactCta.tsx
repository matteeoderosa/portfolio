import { dictionaries } from "@/content/dictionaries";
import { site } from "@/content/site";
import { routePath, type Lang } from "@/lib/routes";
import NeedPicker from "./NeedPicker";

/** "photo": the closing block of the home page, with the live picker beside it. "band": the short close of the other pages. */
export default function ContactCta({ lang, variant = "band" }: { lang: Lang; variant?: "photo" | "band" }) {
  const dict = dictionaries[lang];

  if (variant === "photo") {
    const choices = [...dict.home.services.map((s) => s.title), dict.cta.other];
    return (
      <section className="cta-close" data-nav={routePath("contact", lang)} aria-labelledby="cta-title">
        <div className="cta-close-text">
          <h2 id="cta-title" data-reveal>
            {dict.cta.title}
          </h2>
          <p data-reveal style={{ "--i": 1 } as React.CSSProperties}>
            {dict.cta.lead}
          </p>
          <div data-reveal style={{ "--i": 2 } as React.CSSProperties}>
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
      </section>
    );
  }

  return (
    <section className="cta-band" aria-labelledby="cta-band-title">
      <h2 id="cta-band-title" data-reveal>
        {dict.cta.title}
      </h2>
      <div className="cta-band-side" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
        <p>{dict.cta.text}</p>
        <div className="cta-actions">
          <a className="btn btn-primary" href={`mailto:${site.email}`}>
            {dict.nav.write}
          </a>
          <a className="btn btn-quiet" href={site.github} target="_blank" rel="noopener noreferrer">
            {dict.footer.github}
          </a>
        </div>
      </div>
    </section>
  );
}
