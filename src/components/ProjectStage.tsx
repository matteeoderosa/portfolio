"use client";

import { useEffect, useState, type ReactNode } from "react";

export type StageShot = { slug: string; src: string; alt: string };
export type StageMosaic = { id: string; node: ReactNode };

/**
 * Lo stage che cambia mentre si scorre. Mostra lo screenshot della riga progetto
 * (`[data-project-card]`) oppure il mosaico di foto del blocco di testo
 * (`[data-stage-me="<id>"]`) che sta al centro dello schermo, e dissolve da uno
 * all'altro. Senza script resta visibile il primo.
 */
export default function ProjectStage({
  shots,
  activeSlug,
  mosaics,
}: {
  shots: StageShot[];
  activeSlug?: string;
  mosaics?: StageMosaic[];
}) {
  const [active, setActive] = useState(activeSlug ?? shots[0]?.slug ?? mosaics?.[0]?.id);

  useEffect(() => {
    if (activeSlug) return;
    const cards = Array.from(document.querySelectorAll<HTMLElement>("[data-project-card]"));
    const blocks = Array.from(document.querySelectorAll<HTMLElement>("[data-stage-me]"));
    if ((cards.length === 0 && blocks.length === 0) || typeof IntersectionObserver === "undefined") return;
    const pick = (el: HTMLElement) => {
      const id = el.dataset.stageMe || el.dataset.slug;
      if (id) setActive(id);
    };
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) pick(e.target as HTMLElement);
      },
      { rootMargin: "-40% 0px -40% 0px" },
    );
    blocks.forEach((b) => io.observe(b));
    const onEnter = (e: Event) => pick(e.currentTarget as HTMLElement);
    cards.forEach((c) => {
      io.observe(c);
      c.addEventListener("mouseenter", onEnter);
      c.addEventListener("focusin", onEnter);
    });
    return () => {
      io.disconnect();
      cards.forEach((c) => {
        c.removeEventListener("mouseenter", onEnter);
        c.removeEventListener("focusin", onEnter);
      });
    };
  }, [activeSlug]);

  return (
    <div className="stage stage-shots">
      {shots.map((s) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={s.slug} className="stage-img" data-on={s.slug === active ? "" : undefined} src={s.src} alt="" loading="eager" />
      ))}
      {mosaics?.map((m) => (
        <div key={m.id} className="stage-me" data-on={m.id === active ? "" : undefined}>
          {m.node}
        </div>
      ))}
    </div>
  );
}
