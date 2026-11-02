import type { Metadata } from "next";
import Shell from "@/components/Shell";
import { dictionaries } from "@/content/dictionaries";
import { routePath } from "@/lib/routes";
import { sans, serif } from "@/lib/fonts";
import { THEME_SCRIPT } from "@/lib/themeScript";
import "@/styles/globals.css";

export const metadata: Metadata = { title: "Matteo De Rosa" };

const dict = dictionaries["it"];
const nav = [
  { label: dict.nav.home, href: routePath("home", "it") },
  { label: dict.nav.projects, href: routePath("projects", "it") },
  { label: dict.nav.about, href: routePath("about", "it") },
  { label: dict.nav.contact, href: routePath("contact", "it") },
  ...("it" === "it" ? [{ label: dict.nav.archive, href: routePath("archive", "it") }] : []),
];
const header = {
  nav,
  write: dict.nav.write,
  skip: dict.a11y.skip,
  navAria: dict.a11y.navAria,
  theme: { dark: dict.a11y.themeDark, light: dict.a11y.themeLight },
  langSwitch: { label: dict.a11y.switchLang, unavailable: dict.a11y.langUnavailable },
};
const footer = dict.footer;

export default function ItLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${sans.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <Shell lang="it" header={header} footer={footer}>
          {children}
        </Shell>
      </body>
    </html>
  );
}
