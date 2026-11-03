import type { ReactNode } from "react";
import Header, { type HeaderProps } from "./Header";
import Footer, { type FooterProps } from "./Footer";
import MotionInit from "./MotionInit";
import Lightbox from "./Lightbox";
import { dictionaries } from "@/content/dictionaries";

type Props = {
  lang: "it" | "en";
  header: HeaderProps["labels"];
  footer: FooterProps["labels"];
  children: ReactNode;
};

export default function Shell({ lang, header, footer, children }: Props) {
  return (
    <>
      <Header lang={lang} labels={header} />
      <main id="contenuto" tabIndex={-1}>
        {children}
      </main>
      <Footer lang={lang} labels={footer} />
      <MotionInit />
      <Lightbox labels={dictionaries[lang].a11y.lightbox} />
    </>
  );
}
