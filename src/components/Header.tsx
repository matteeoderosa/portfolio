import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import LangSwitch from "./LangSwitch";

export type HeaderProps = {
  lang: "it" | "en";
  currentPath: string;
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

export default function Header({ lang, currentPath, labels }: HeaderProps) {
  const home = lang === "en" ? "/en/" : "/";
  const norm = (p: string) => p.replace(/\/+$/, "") || "/";
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
          <nav className="main-nav" aria-label={labels.navAria ?? "Menu"}>
            <ul>
              {labels.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={norm(item.href) === norm(currentPath) ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
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
