import type { Metadata } from "next";
import Shell from "@/components/Shell";
import StileLab from "@/components/StileLab";
import { dictionaries } from "@/content/dictionaries";
import { routePath } from "@/lib/routes";
import { sans, serif, unbounded } from "@/lib/fonts";
import { THEME_SCRIPT } from "@/lib/themeScript";
import "@/styles/globals.css";
import "@/styles/stile.css";

/** Anteprima riservata: il sito con Unbounded e la scelta del colore. Non indicizzata. */
export const metadata: Metadata = {
  title: "Anteprima stile · Matteo De Rosa",
  robots: { index: false, follow: false },
};

const dict = dictionaries["it"];
const nav = [
  { label: dict.nav.home, href: routePath("home", "it") },
  { label: dict.nav.projects, href: routePath("projects", "it") },
  { label: dict.nav.about, href: routePath("about", "it") },
  { label: dict.nav.contact, href: routePath("contact", "it") },
];
const header = {
  nav,
  write: dict.nav.write,
  skip: dict.a11y.skip,
  navAria: dict.a11y.navAria,
  theme: { dark: dict.a11y.themeDark, light: dict.a11y.themeLight },
  langSwitch: { label: dict.a11y.switchLang, unavailable: dict.a11y.langUnavailable },
};

export default function StileLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${sans.variable} ${serif.variable} ${unbounded.variable}`} data-stile="" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <Shell lang="it" header={header} footer={dict.footer}>
          {children}
        </Shell>
        <StileLab />
      </body>
    </html>
  );
}
