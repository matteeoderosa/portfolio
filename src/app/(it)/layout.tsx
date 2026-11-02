import type { Metadata } from "next";
import Shell from "@/components/Shell";
import { sans, serif } from "@/lib/fonts";
import { THEME_SCRIPT } from "@/lib/themeScript";
import "@/styles/globals.css";

export const metadata: Metadata = { title: "Matteo De Rosa" };

// Etichette temporanee: Task 3 le sostituisce con i dizionari.
const header = {
  nav: [],
  write: "Scrivimi",
  skip: "Vai al contenuto",
  navAria: "Principale",
  theme: { dark: "Tema scuro", light: "Tema chiaro" },
};
const footer = { copyright: "Tutti i diritti riservati.", github: "GitHub" };

export default function ItLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${sans.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <Shell lang="it" currentPath="/" header={header} footer={footer}>
          {children}
        </Shell>
      </body>
    </html>
  );
}
