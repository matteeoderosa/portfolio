"use client";

import { useEffect, useRef } from "react";
import { photos } from "@/content/photos";
import { assetHref } from "@/lib/site";
import type { Lang } from "@/lib/routes";

/** Velocità dello scorrimento, in pixel al secondo: un po' più lenta in verticale, dove le immagini sono più grandi. */
const SPEED = { x: 125, y: 90 };

/**
 * Le immagini scorrono senza fine: in verticale accanto al testo, in orizzontale su telefono.
 * Il percorso è scritto due volte di fila e ogni immagine scivola di una copia intera: al giro dopo
 * riparte da dove era, senza stacco. La seconda copia non si legge e non si raggiunge da tastiera.
 * Si anima ogni immagine e non il nastro intero: su Safari (iPhone) un unico strato di migliaia di
 * pixel supera i limiti della memoria grafica e a metà scorrimento si svuota. Il passaggio del mouse
 * ferma lo scorrimento; con il movimento ridotto non si muove e si scorre a mano.
 */
export default function PhotoMarquee({ lang, keys }: { lang: Lang; keys: readonly string[] }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || typeof el.animate !== "function") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let anims: Animation[] = [];
    const stop = () => {
      anims.forEach((a) => a.cancel());
      anims = [];
    };
    const start = () => {
      stop();
      const track = el.querySelector<HTMLElement>(".marquee-track");
      if (!track) return;
      const horizontal = getComputedStyle(el).flexDirection === "row";
      const length = horizontal ? track.offsetWidth : track.offsetHeight;
      if (!length) return;
      const axis = horizontal ? "X" : "Y";
      const duration = (length / (horizontal ? SPEED.x : SPEED.y)) * 1000;
      el.querySelectorAll("img").forEach((img) => {
        anims.push(
          img.animate(
            [{ transform: `translate${axis}(0)` }, { transform: `translate${axis}(${-length}px)` }],
            { duration, iterations: Infinity, easing: "linear" },
          ),
        );
      });
    };

    const hold = (e: PointerEvent) => {
      if (e.pointerType === "mouse") anims.forEach((a) => a.pause());
    };
    const release = (e: PointerEvent) => {
      if (e.pointerType === "mouse") anims.forEach((a) => a.play());
    };
    el.addEventListener("pointerenter", hold);
    el.addEventListener("pointerleave", release);

    start();
    // le misure cambiano quando arrivano le immagini o la finestra cambia forma
    const ro = new ResizeObserver(start);
    ro.observe(el);
    el.querySelectorAll("img").forEach((img) => img.addEventListener("load", start, { once: true }));

    return () => {
      ro.disconnect();
      el.removeEventListener("pointerenter", hold);
      el.removeEventListener("pointerleave", release);
      stop();
    };
  }, []);

  const track = (copy: boolean) => (
    <div className="marquee-track" aria-hidden={copy || undefined}>
      {keys.map((k) => {
        const p = photos[k];
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={k}
            src={assetHref(p.src)}
            alt={p.alt[lang]}
            data-dup={copy || undefined}
            // tutte subito: un'immagine "lazy" che entra scorrendo resterebbe un riquadro vuoto finché non arriva
            loading="eager"
            decoding="async"
            style={{ aspectRatio: p.ratio ?? 0.75 }}
          />
        );
      })}
    </div>
  );
  return (
    <div className="photo-marquee" ref={root}>
      {track(false)}
      {track(true)}
    </div>
  );
}
