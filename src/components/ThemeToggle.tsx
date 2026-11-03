"use client";

import { useSyncExternalStore } from "react";

type Props = { labels: { dark: string; light: string } };

const listeners = new Set<() => void>();

function query(): MediaQueryList | null {
  return typeof window !== "undefined" && window.matchMedia
    ? window.matchMedia("(prefers-color-scheme: dark)")
    : null;
}

function isDark(): boolean {
  const chosen = document.documentElement.getAttribute("data-theme");
  if (chosen) return chosen === "dark";
  return query()?.matches ?? false;
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  const mq = query();
  mq?.addEventListener?.("change", onChange);
  return () => {
    listeners.delete(onChange);
    mq?.removeEventListener?.("change", onChange);
  };
}

export default function ThemeToggle({ labels }: Props) {
  const dark = useSyncExternalStore(subscribe, isDark, () => false);

  function toggle() {
    const next = isDark() ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage non disponibile */
    }
    listeners.forEach((l) => l());
  }

  return (
    <button
      className="theme-toggle"
      type="button"
      aria-pressed={dark}
      aria-label={labels.dark}
      title={dark ? labels.light : labels.dark}
      onClick={toggle}
    >
      <svg className="i-moon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
      <svg className="i-sun" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    </button>
  );
}
