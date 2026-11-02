import type { ReactNode } from "react";
import Header, { type HeaderProps } from "./Header";
import Footer, { type FooterProps } from "./Footer";

type Props = {
  lang: "it" | "en";
  currentPath: string;
  header: HeaderProps["labels"];
  footer: FooterProps["labels"];
  children: ReactNode;
};

export default function Shell({ lang, currentPath, header, footer, children }: Props) {
  return (
    <>
      <Header lang={lang} currentPath={currentPath} labels={header} />
      <main id="contenuto" tabIndex={-1}>
        {children}
      </main>
      <Footer lang={lang} labels={footer} />
    </>
  );
}
