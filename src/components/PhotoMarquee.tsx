"use client";

import { useEffect, useRef } from "react";
import { photos } from "@/content/photos";
import { assetHref } from "@/lib/site";
import type { Lang } from "@/lib/routes";

/** Velocità dello scorrimento, in pixel al secondo: un po' più lenta in verticale, dove le immagini sono più grandi. */
const SPEED = { x: 125, y: 90 };

/**
 * Le immagini scorrono senza fine: in verticale accanto al testo, in orizzontale su telefono.
 * Il percorso è scritto due volte di fila: arrivati alla fine della prima copia si riparte da capo
 * senza stacco. La seconda copia non si legge e non si raggiunge da tastiera.
 *
 * Desktop: ogni immagine scivola con una Web Animation (animare tutto il nastro in un solo strato
 * enorme su Safari lo svuota). Telefono: il nastro è un'area che scorre davvero e si fa avanzare
 * `scrollLeft`: Safari la gestisce a tasselli, nessun limite di memoria, e si può anche sfogliare
 * con il dito (lo scorrimento si ferma al tocco e riparte poco dopo). Il passaggio del mouse ferma
 * lo scorrimento; con il movimento ridotto non si muove da solo.
 */
export default function PhotoMarquee({ lang, keys }: { lang: Lang; keys: readonly string[] }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (reduced?.matches) return;
    if (!window.matchMedia) return;
    const narrow = window.matchMedia("(max-width: 999px)");
    const trackOf = () => el.querySelector<HTMLElement>(".marquee-track");

    // telefono: scrollLeft avanza a ogni fotogramma
    const scrolling = () => {
      let pos = el.scrollLeft;
      let last = 0;
      let raf = 0;
      let held = false;
      let timer: ReturnType<typeof setTimeout> | undefined;
      const tick = (now: number) => {
        const dt = last ? Math.min(now - last, 64) : 0;
        last = now;
        const length = trackOf()?.offsetWidth ?? 0;
        if (!held && length) {
          pos += (dt * SPEED.x) / 1000;
          if (pos >= length) pos -= length;
          el.scrollLeft = pos;
        }
        raf = requestAnimationFrame(tick);
      };
      const hold = () => {
        held = true;
        clearTimeout(timer);
      };
      const release = (delay: number) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          pos = el.scrollLeft;
          held = false;
        }, delay);
      };
      // dito: ferma al tocco; finita la spinta riparte da dove si è lasciato
      const onTouchEnd = () => release(1500);
      const onScroll = () => {
        if (held) release(1200);
      };
      const onEnter = (e: PointerEvent) => e.pointerType === "mouse" && hold();
      const onLeave = (e: PointerEvent) => e.pointerType === "mouse" && release(0);
      el.addEventListener("touchstart", hold, { passive: true });
      el.addEventListener("touchend", onTouchEnd, { passive: true });
      el.addEventListener("touchcancel", onTouchEnd, { passive: true });
      el.addEventListener("scroll", onScroll, { passive: true });
      el.addEventListener("pointerenter", onEnter);
      el.addEventListener("pointerleave", onLeave);
      raf = requestAnimationFrame(tick);
      return () => {
        cancelAnimationFrame(raf);
        clearTimeout(timer);
        el.removeEventListener("touchstart", hold);
        el.removeEventListener("touchend", onTouchEnd);
        el.removeEventListener("touchcancel", onTouchEnd);
        el.removeEventListener("scroll", onScroll);
        el.removeEventListener("pointerenter", onEnter);
        el.removeEventListener("pointerleave", onLeave);
      };
    };

    // desktop: ogni immagine scivola della lunghezza di una copia
    const sliding = () => {
      if (typeof el.animate !== "function") return () => {};
      let anims: Animation[] = [];
      const stop = () => {
        anims.forEach((a) => a.cancel());
        anims = [];
      };
      const start = () => {
        stop();
        const length = trackOf()?.offsetHeight ?? 0;
        if (!length) return;
        const duration = (length / SPEED.y) * 1000;
        el.querySelectorAll("img").forEach((img) => {
          anims.push(
            img.animate([{ transform: "translateY(0)" }, { transform: `translateY(${-length}px)` }], {
              duration,
              iterations: Infinity,
              easing: "linear",
            }),
          );
        });
      };
      const hold = (e: PointerEvent) => e.pointerType === "mouse" && anims.forEach((a) => a.pause());
      const release = (e: PointerEvent) => e.pointerType === "mouse" && anims.forEach((a) => a.play());
      el.addEventListener("pointerenter", hold);
      el.addEventListener("pointerleave", release);
      start();
      // le misure cambiano quando arrivano le immagini o la finestra cambia forma
      const ro = new ResizeObserver(start);
      ro.observe(el);
      const track = trackOf();
      if (track) ro.observe(track);
      return () => {
        ro.disconnect();
        el.removeEventListener("pointerenter", hold);
        el.removeEventListener("pointerleave", release);
        stop();
      };
    };

    let teardown = narrow.matches ? scrolling() : sliding();
    const onChange = () => {
      teardown();
      el.scrollLeft = 0;
      teardown = narrow.matches ? scrolling() : sliding();
    };
    narrow.addEventListener("change", onChange);
    return () => {
      narrow.removeEventListener("change", onChange);
      teardown();
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
