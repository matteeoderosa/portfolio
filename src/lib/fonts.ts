import localFont from "next/font/local";

/** Testo: Jost, un geometrico leggero. */
export const sans = localFont({
  src: [{ path: "../fonts/jost-latin-400-500.woff2", weight: "400 500", style: "normal" }],
  variable: "--font-jost",
  display: "swap",
});

/** Titoli: Unbounded (variabile 200–900), servita dal sito stesso. */
export const serif = localFont({
  src: [{ path: "../fonts/unbounded-latin-200-900.woff2", weight: "200 900", style: "normal" }],
  variable: "--font-unbounded",
  display: "swap",
});
