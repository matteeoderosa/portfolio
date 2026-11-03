import localFont from "next/font/local";

/** Testo: Jost, un geometrico leggero. */
export const sans = localFont({
  src: [{ path: "../fonts/jost-latin-400-500.woff2", weight: "400 500", style: "normal" }],
  variable: "--font-jost",
  display: "swap",
});

/** Titoli: Bodoni Moda (didone con contrasto alto, asse ottico incluso). */
export const serif = localFont({
  src: [{ path: "../fonts/bodoni-moda-latin-500.woff2", weight: "500", style: "normal" }],
  variable: "--font-bodoni",
  display: "swap",
});
