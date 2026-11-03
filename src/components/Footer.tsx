import { site } from "@/content/site";

export type FooterProps = {
  lang: "it" | "en";
  labels: { copyright: string; github: string };
};

export default function Footer({ lang, labels }: FooterProps) {
  return (
    <footer className="site-footer" lang={lang}>
      <div className="wrap footer-inner">
        <p>
          &copy; {new Date().getFullYear()} Matteo De Rosa. {labels.copyright}
        </p>
        <a href={site.github} rel="noopener noreferrer">
          {labels.github}
        </a>
      </div>
    </footer>
  );
}
