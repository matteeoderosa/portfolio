import Link from "next/link";
import { site } from "@/content/site";
import { routePath } from "@/lib/routes";

export type FooterProps = {
  lang: "it" | "en";
  labels: { copyright: string; github: string };
};

export default function Footer({ lang, labels }: FooterProps) {
  return (
    <footer className="site-footer" lang={lang}>
      <Link className="footer-name" href={routePath("home", lang)} aria-label="Matteo De Rosa">
        matteo de rosa
      </Link>
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
