"use client";

import { useEffect, useState } from "react";

/* Selettore colore dell'anteprima /stile: colore principale + secondo colore (bianco o nero).
   Il tema chiaro/scuro resta quello del sito (pulsante in alto). */

const SWATCHES = ["#ff5fa2", "#c8ff2e", "#ffd60a", "#ff8a1f", "#ff3d2e", "#19d3c5", "#00c27a", "#1b3bff", "#8a5cff", "#111111", "#ffffff"];
const SEC = { white: "#ffffff", black: "#111111" } as const;
type Sec = keyof typeof SEC;
const KEY = "stile-colore-v1";
const VARS = ["--accent", "--accent-ink", "--accent-hover", "--field", "--field-ink", "--band-accent", "--band-accent-ink", "--band-accent-hover", "--band-surface"];

function lum(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function ratio(a: string, b: string) {
  const x = lum(a),
    y = lum(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}

/** Legge la scelta salvata o quella nel link. Sul server resta vuota: il pannello è chiuso, quindi l'HTML non cambia. */
function initial(): { color: string | null; sec: Sec } {
  let color: string | null = null;
  let sec: Sec = "black";
  if (typeof window === "undefined") return { color, sec };
  try {
    const s = JSON.parse(localStorage.getItem(KEY) || "{}");
    if (/^#[0-9a-f]{6}$/i.test(s.color)) color = s.color;
    if (s.sec === "white" || s.sec === "black") sec = s.sec;
  } catch {}
  const h = new URLSearchParams(location.hash.slice(1));
  const c = h.get("c");
  if (c && /^[0-9a-f]{6}$/i.test(c)) color = "#" + c;
  const s2 = h.get("s");
  if (s2 === "white" || s2 === "black") sec = s2;
  return { color, sec };
}

export default function StileLab() {
  const [open, setOpen] = useState(false);
  const [init] = useState(initial);
  const [color, setColor] = useState<string | null>(init.color);
  const [sec, setSec] = useState<Sec>(init.sec);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (!color) {
      VARS.forEach((v) => root.style.removeProperty(v));
      try {
        localStorage.removeItem(KEY);
      } catch {}
      return;
    }
    const ink = SEC[sec];
    const set = (k: string, v: string) => root.style.setProperty(k, v);
    set("--accent", color);
    set("--accent-ink", ink);
    set("--accent-hover", color);
    set("--field", color);
    set("--field-ink", ink);
    set("--band-accent", ink);
    set("--band-accent-ink", color);
    set("--band-accent-hover", ink);
    set("--band-surface", "color-mix(in srgb, " + color + " 80%, var(--bg))");
    try {
      localStorage.setItem(KEY, JSON.stringify({ color, sec }));
    } catch {}
  }, [color, sec]);

  const cur = color ?? "#1f3a52";
  const other: Sec = sec === "black" ? "white" : "black";
  const otherName = other === "white" ? "il bianco" : "il nero";
  const r = ratio(cur, SEC[sec]);
  let note = "Si legge bene.";
  let warn = false;
  if (r < 3) {
    note = "Si legge male su questo colore: prova " + otherName + ".";
    warn = true;
  } else if (ratio(cur, SEC[other]) > r + 3) note = "Si legge, ma " + otherName + " sarebbe più chiaro.";

  const share = () => location.origin + location.pathname + "#c=" + cur.slice(1) + "&s=" + sec;
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(share());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copia il link:", share());
    }
  };

  return (
    <div className="lab">
      {open && (
        <div className="lab-panel">
          <p className="lab-h">Colore principale</p>
          <div className="lab-pick">
            <input type="color" value={cur} aria-label="Colore principale" onChange={(e) => setColor(e.target.value)} />
            <code>{cur.toUpperCase()}</code>
          </div>
          <div className="lab-swatches">
            {SWATCHES.map((c) => (
              <button key={c} type="button" className="lab-sw" aria-label={"Colore " + c} aria-pressed={color === c} style={{ background: c }} onClick={() => setColor(c)} />
            ))}
          </div>
          <p className="lab-h">Secondo colore (scritte sopra il principale)</p>
          <div className="lab-seg">
            <button type="button" aria-pressed={sec === "white"} onClick={() => setSec("white")}>
              <i className="lab-dot" style={{ background: "#fff" }} />
              Bianco
            </button>
            <button type="button" aria-pressed={sec === "black"} onClick={() => setSec("black")}>
              <i className="lab-dot" style={{ background: "#111" }} />
              Nero
            </button>
          </div>
          <p className={"lab-note" + (warn ? " warn" : "")}>{note}</p>
          <div className="lab-out">
            <p>
              {cur.toUpperCase()} · {sec === "white" ? "Bianco" : "Nero"}
            </p>
            <button type="button" onClick={copy}>
              {copied ? "Link copiato ✓" : "Copia il link a questa scelta"}
            </button>
          </div>
          {color && (
            <button type="button" className="lab-reset" onClick={() => setColor(null)}>
              Torna ai colori attuali del sito
            </button>
          )}
        </div>
      )}
      <button type="button" className="lab-toggle" aria-expanded={open} onClick={() => setOpen(!open)}>
        {open ? "Chiudi" : "Colore ✦"}
      </button>
    </div>
  );
}
