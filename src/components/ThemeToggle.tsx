"use client";

import { flushSync } from "react-dom";
import { useSyncExternalStore, type MouseEvent } from "react";

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

  function toggle(e: MouseEvent<HTMLButtonElement>) {
    const next = isDark() ? "light" : "dark";
    const apply = () => {
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem("theme", next);
      } catch {
        /* storage non disponibile */
      }
      listeners.forEach((l) => l());
    };

    // Il nuovo tema si apre come un cerchio che parte dal pulsante (View Transitions API).
    // Senza l'API, o con il movimento ridotto, il tema cambia subito, come prima.
    const doc = document as Document & {
      startViewTransition?: (update: () => void) => { ready: Promise<void>; finished: Promise<void> };
    };
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (!doc.startViewTransition || reduce) {
      apply();
      return;
    }
    const box = e.currentTarget.getBoundingClientRect();
    const x = box.left + box.width / 2;
    const y = box.top + box.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const root = document.documentElement;
    root.classList.add("vt-theme");
    const transition = doc.startViewTransition(() => flushSync(apply));
    transition.ready
      .then(() =>
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 650, easing: "cubic-bezier(0.4, 0, 0.2, 1)", pseudoElement: "::view-transition-new(root)" },
        ),
      )
      .catch(() => {});
    transition.finished.finally(() => root.classList.remove("vt-theme"));
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
