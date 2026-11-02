"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { alternatePath, type Lang } from "@/lib/routes";

type Props = {
  lang: Lang;
  /** Base-path-free current path; defaults to the router pathname. */
  currentPath?: string;
  /** aria-label describing the target language. */
  label: string;
  /** Tooltip shown when the page has no translation. */
  unavailable: string;
};

const FLAGS: Record<Lang, React.ReactNode> = {
  it: (
    <svg viewBox="0 0 3 2" width="18" height="12" aria-hidden="true" focusable="false">
      <rect width="1" height="2" fill="#009246" />
      <rect x="1" width="1" height="2" fill="#fff" />
      <rect x="2" width="1" height="2" fill="#ce2b37" />
    </svg>
  ),
  en: (
    <svg viewBox="0 0 60 30" width="24" height="12" aria-hidden="true" focusable="false">
      <rect width="60" height="30" fill="#012169" />
      <path d="M0 0l60 30M60 0L0 30" stroke="#fff" strokeWidth="6" />
      <path d="M0 0l60 30M60 0L0 30" stroke="#c8102e" strokeWidth="3" />
      <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
      <path d="M30 0v30M0 15h60" stroke="#c8102e" strokeWidth="6" />
    </svg>
  ),
};

export default function LangSwitch({ lang, currentPath, label, unavailable }: Props) {
  const routerPath = usePathname();
  const path = currentPath ?? routerPath ?? (lang === "en" ? "/en/" : "/");
  const target: Lang = lang === "it" ? "en" : "it";
  const href = alternatePath(path, target);
  const text = target.toUpperCase();

  const content = (
    <>
      {FLAGS[target]}
      <span>{text}</span>
    </>
  );

  if (href === null) {
    return (
      <span className="lang-switch is-disabled" title={unavailable} aria-disabled="true">
        {content}
      </span>
    );
  }

  return (
    <Link
      className="lang-switch"
      href={href}
      hrefLang={target}
      lang={target}
      aria-label={label}
      onClick={() => {
        try {
          localStorage.setItem("lang", target);
        } catch {
          /* storage non disponibile */
        }
      }}
    >
      {content}
    </Link>
  );
}
