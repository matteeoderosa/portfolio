"use client";

import { useEffect, useRef } from "react";

type Labels = { open: string; close: string; prev: string; next: string; zoom: string; unzoom: string; of: string };

/** Le immagini che si possono aprire: i tasselli dei mosaici e le immagini del nastro. */
const SELECTOR = ".photo-mosaic img, .photo-marquee img";
const GROUP = ".photo-mosaic, .photo-marquee";
const NAME = "lb";

type VT = { ready: Promise<void>; finished: Promise<void> };
type Doc = Document & { startViewTransition?: (update: () => void) => VT };

/**
 * Lightbox per le foto: la foto si allarga dal suo riquadro fino a mostrarsi intera e torna
 * al riquadro quando si chiude (View Transitions API). Frecce, swipe, Esc e zoom al 100%.
 * Senza l'API, o con il movimento ridotto, si apre e si chiude senza animazione.
 * Usa un <dialog> nativo: focus e Tab restano nella finestra, e al termine il focus torna alla foto.
 */
export default function Lightbox({ labels }: { labels: Labels }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const caption = useRef<HTMLParagraphElement>(null);
  const zoomBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dlg = dialog.current;
    const stg = stage.current;
    const big = img.current;
    if (!dlg || !stg || !big) return;

    let items: HTMLImageElement[] = [];
    let index = 0;
    let busy = false;

    const doc = document as Doc;
    const reduced = () => !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const animated = () => !!doc.startViewTransition && !reduced();
    const visible = (el: HTMLElement) => el.isConnected && el.getClientRects().length > 0;
    const setName = (el: HTMLElement, on: boolean) => {
      el.style.viewTransitionName = on ? NAME : "";
    };

    // le foto diventano pulsanti: si raggiungono da tastiera e si leggono come "Ingrandisci: ..."
    const enhance = () => {
      document.querySelectorAll<HTMLImageElement>(SELECTOR).forEach((el) => {
        if (el.dataset.lb !== undefined) return;
        el.dataset.lb = "";
        // la seconda copia del nastro si clicca ma non si legge né si raggiunge da tastiera
        if (el.hasAttribute("data-dup")) return;
        el.tabIndex = 0;
        el.setAttribute("role", "button");
        el.setAttribute("aria-haspopup", "dialog");
        el.setAttribute("aria-label", `${labels.open}: ${el.alt}`);
      });
    };
    let queued = 0;
    const observer = new MutationObserver(() => {
      cancelAnimationFrame(queued);
      queued = requestAnimationFrame(enhance);
    });
    observer.observe(document.body, { childList: true, subtree: true });
    enhance();

    const zoomed = () => stg.classList.contains("is-zoomed");
    const setZoom = (on: boolean) => {
      stg.classList.toggle("is-zoomed", on);
      const btn = zoomBtn.current;
      if (btn) {
        btn.setAttribute("aria-pressed", String(on));
        btn.setAttribute("aria-label", on ? labels.unzoom : labels.zoom);
      }
      if (on) {
        stg.scrollLeft = (stg.scrollWidth - stg.clientWidth) / 2;
        stg.scrollTop = (stg.scrollHeight - stg.clientHeight) / 2;
      }
    };

    const show = (i: number) => {
      index = (i + items.length) % items.length;
      const el = items[index];
      big.src = el.currentSrc || el.src;
      big.alt = el.alt;
      // la didascalia c'è solo per gli screenshot dei progetti, non per le foto personali
      const shot = !!el.closest(".photo-marquee");
      if (caption.current) caption.current.textContent = shot ? el.alt : "";
      dlg.toggleAttribute("data-no-caption", !shot);
      if (count.current) count.current.textContent = `${index + 1} ${labels.of} ${items.length}`;
      dlg.toggleAttribute("data-single", items.length < 2);
      setZoom(false);
    };

    const open = (el: HTMLImageElement) => {
      if (dlg.open || busy) return;
      const group = el.closest(GROUP);
      // solo le foto che si vedono: su telefono alcuni tasselli della hero sono nascosti
      items = group ? Array.from(group.querySelectorAll<HTMLImageElement>("img")).filter((i) => !i.hasAttribute("data-dup") && getComputedStyle(i).display !== "none") : [el];
      // una foto della seconda copia vale quanto la sua gemella nella prima
      const same = el.hasAttribute("data-dup") ? items.find((i) => i.src === el.src) : el;
      show(Math.max(0, items.indexOf(same ?? el)));
      const reveal = () => {
        setName(el, false);
        setName(big, true);
        if (typeof dlg.showModal === "function") dlg.showModal();
        else dlg.setAttribute("open", "");
      };
      if (animated() && visible(el)) {
        busy = true;
        setName(el, true);
        const vt = doc.startViewTransition!(reveal);
        vt.finished.finally(() => {
          setName(big, false);
          busy = false;
        });
      } else {
        reveal();
      }
    };

    const close = () => {
      if (!dlg.open || busy) return;
      const target = items[index];
      const hide = () => {
        setName(big, false);
        if (target && visible(target)) setName(target, true);
        if (typeof dlg.close === "function") dlg.close();
        else dlg.removeAttribute("open");
      };
      if (animated() && target && visible(target)) {
        busy = true;
        setName(big, true); // la foto grande è il punto di partenza del ritorno al riquadro
        const vt = doc.startViewTransition!(hide);
        vt.finished.finally(() => {
          setName(target, false);
          busy = false;
          if (target.isConnected) target.focus({ preventScroll: true });
        });
      } else {
        hide();
        if (target?.isConnected) target.focus({ preventScroll: true });
      }
    };

    const step = (d: number) => {
      if (items.length < 2 || busy) return;
      show(index + d);
      if (!reduced() && typeof big.animate === "function") big.animate({ opacity: [0, 1] }, { duration: 220, easing: "ease-out" });
    };

    const photoOf = (e: Event) => (e.target as HTMLElement | null)?.closest?.(SELECTOR) as HTMLImageElement | null;
    const onClick = (e: Event) => {
      const el = photoOf(e);
      if (el && !dlg.contains(el)) {
        e.preventDefault();
        open(el);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      const el = photoOf(e);
      if (el && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        open(el);
      }
    };
    const onDialogKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "ArrowRight") step(1);
    };
    const onCancel = (e: Event) => {
      e.preventDefault();
      close();
    };
    const onBackdrop = (e: MouseEvent) => {
      if (e.target === dlg || e.target === stg) close();
    };
    const onPhoto = () => setZoom(!zoomed());

    // swipe orizzontale per passare alla foto successiva o precedente
    let startX: number | null = null;
    const onDown = (e: PointerEvent) => {
      startX = e.clientX;
    };
    const onUp = (e: PointerEvent) => {
      if (startX === null || zoomed()) return;
      const dx = e.clientX - startX;
      startX = null;
      if (Math.abs(dx) > 60) step(dx < 0 ? 1 : -1);
    };

    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    dlg.addEventListener("keydown", onDialogKey);
    dlg.addEventListener("cancel", onCancel);
    dlg.addEventListener("click", onBackdrop);
    big.addEventListener("click", onPhoto);
    stg.addEventListener("pointerdown", onDown);
    stg.addEventListener("pointerup", onUp);
    const btn = (sel: string, fn: () => void) => {
      const el = dlg.querySelector(sel);
      el?.addEventListener("click", fn);
      return () => el?.removeEventListener("click", fn);
    };
    const offs = [btn(".lb-close", close), btn(".lb-prev", () => step(-1)), btn(".lb-next", () => step(1)), btn(".lb-zoom", onPhoto)];

    return () => {
      observer.disconnect();
      cancelAnimationFrame(queued);
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
      dlg.removeEventListener("keydown", onDialogKey);
      dlg.removeEventListener("cancel", onCancel);
      dlg.removeEventListener("click", onBackdrop);
      big.removeEventListener("click", onPhoto);
      stg.removeEventListener("pointerdown", onDown);
      stg.removeEventListener("pointerup", onUp);
      offs.forEach((off) => off());
    };
  }, [labels]);

  const icon = (d: string) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={d} />
    </svg>
  );

  return (
    <dialog ref={dialog} className="lightbox" aria-label={labels.open}>
      <div className="lb-bar">
        <span ref={count} className="lb-count" aria-live="polite" />
        <button type="button" className="lb-btn lb-zoom" ref={zoomBtn} aria-pressed="false" aria-label={labels.zoom}>
          {icon("M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-4.3-4.3M11 8v6M8 11h6")}
        </button>
        <button type="button" className="lb-btn lb-close" aria-label={labels.close}>
          {icon("M6 6l12 12M18 6L6 18")}
        </button>
      </div>
      <div ref={stage} className="lb-stage">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img ref={img} alt="" />
      </div>
      <button type="button" className="lb-btn lb-nav lb-prev" aria-label={labels.prev}>
        {icon("M15 5l-7 7 7 7")}
      </button>
      <button type="button" className="lb-btn lb-nav lb-next" aria-label={labels.next}>
        {icon("M9 5l7 7-7 7")}
      </button>
      <p ref={caption} className="lb-caption" />
    </dialog>
  );
}
