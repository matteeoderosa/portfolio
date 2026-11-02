import localFont from "next/font/local";

export const sans = localFont({
  src: [
    { path: "../fonts/instrument-sans-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/instrument-sans-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/instrument-sans-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-instrument-sans",
  display: "swap",
});

export const serif = localFont({
  src: [{ path: "../fonts/instrument-serif-latin-400-normal.woff2", weight: "400", style: "normal" }],
  variable: "--font-instrument-serif",
  display: "swap",
});
