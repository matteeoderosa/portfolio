import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import MainNav from "./MainNav";
import LangSwitch from "./LangSwitch";
import { site } from "@/content/site";

export type HeaderProps = {
  lang: "it" | "en";
  labels: {
    brand?: never;
    nav: { label: string; href: string }[];
    write: string;
    skip: string;
    navAria?: string;
    theme: { dark: string; light: string };
    langSwitch: { label: string; unavailable: string };
  };
};

export default function Header({ lang, labels }: HeaderProps) {
  const home = lang === "en" ? "/en/" : "/";
  return (
    <>
      <a className="skip-link" href="#contenuto">
        {labels.skip}
      </a>
      <header className="site-header">
        <div className="header-inner">
          <Link className="brand" href={home}>
            Matteo De Rosa
          </Link>
          <MainNav items={labels.nav} ariaLabel={labels.navAria ?? "Menu"} />
          <a className="btn btn-primary" href={`mailto:${site.email}`}>
            {labels.write}
          </a>
          <LangSwitch
            lang={lang}
            label={labels.langSwitch.label}
            unavailable={labels.langSwitch.unavailable}
          />
          <ThemeToggle labels={labels.theme} />
        </div>
      </header>
    </>
  );
}
