import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import MainNav from "./MainNav";
import LangSwitch from "./LangSwitch";

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

const EMAIL = "mailto:ciao@matteoderosa.it";

export default function Header({ lang, labels }: HeaderProps) {
  const home = lang === "en" ? "/en/" : "/";
  return (
    <>
      <a className="skip-link" href="#contenuto">
        {labels.skip}
      </a>
      <header className="site-header">
        <div className="wrap header-inner">
          <Link className="brand" href={home}>
            <span className="logo mono" aria-hidden="true">
              {"{m}"}
            </span>
            <span>Matteo De Rosa</span>
          </Link>
          <MainNav items={labels.nav} ariaLabel={labels.navAria ?? "Menu"} />
          <a className="btn btn-primary" href={EMAIL}>
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
