import { site } from "@/content/site";

export type FooterProps = {
  lang: "it" | "en";
  labels: { copyright: string; github: string };
};

export default function Footer({ lang, labels }: FooterProps) {
  return (
    <footer className="site-footer" lang={lang}>
      <div className="footer-line">
        <p>
          &copy; {new Date().getFullYear()} Matteo De Rosa. {labels.copyright}
        </p>
        <a href={site.github} rel="noopener noreferrer">
          {labels.github}
        </a>
        <a href={`mailto:${site.email}`}>{site.email}</a>
      </div>
    </footer>
  );
}
