import type { Metadata } from "next";
import Shell from "@/components/Shell";
import { sans, serif } from "@/lib/fonts";
import { THEME_SCRIPT } from "@/lib/themeScript";
import "@/styles/globals.css";

export const metadata: Metadata = { title: "Matteo De Rosa" };

// Temporary labels: Task 3 replaces them with the dictionaries.
const header = {
  nav: [],
  write: "Write me",
  skip: "Skip to content",
  navAria: "Main",
  theme: { dark: "Dark theme", light: "Light theme" },
};
const footer = { copyright: "All rights reserved.", github: "GitHub" };

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <Shell lang="en" currentPath="/en/" header={header} footer={footer}>
          {children}
        </Shell>
      </body>
    </html>
  );
}
