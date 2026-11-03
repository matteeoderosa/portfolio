import type { Lang } from "@/lib/routes";

export type Photo = {
  /** Percorso root-relativo (il base path viene aggiunto da assetHref). */
  src: string;
  /** Punto della foto da tenere al centro del ritaglio (object-position). */
  pos: string;
  alt: Record<Lang, string>;
};

/** Foto di Matteo (già ritagliate con il volto al centro, quindi pos 50% 50%) in `public/me/web/` e screenshot dei progetti in `public/work/mosaico/`. */
export const photos: Record<string, Photo> = {
  casco: { src: "/me/web/casco.jpg", pos: "50% 50%", alt: { it: "Matteo in bici con il casco", en: "Matteo cycling with a helmet" } },
  sorpresa: { src: "/me/web/sorpresa.jpg", pos: "50% 50%", alt: { it: "Matteo, autoscatto a bocca aperta", en: "Matteo, a surprised selfie" } },
  bici: { src: "/me/web/bici.jpg", pos: "50% 50%", alt: { it: "Matteo in sella, ripreso dall'alto", en: "Matteo riding, seen from above" } },
  strada: { src: "/me/web/strada.jpg", pos: "50% 50%", alt: { it: "Matteo che cammina per strada", en: "Matteo walking down a street" } },
  maglia: { src: "/me/web/maglia.jpg", pos: "50% 50%", alt: { it: "Matteo con la maglia rossa", en: "Matteo in a red T-shirt" } },
  sole: { src: "/me/web/sole.jpg", pos: "50% 50%", alt: { it: "Matteo con gli occhiali sulla fronte", en: "Matteo with sunglasses on his forehead" } },
  bosco: { src: "/me/web/bosco.jpg", pos: "50% 50%", alt: { it: "Matteo in bici su una strada nel verde", en: "Matteo cycling on a road among the trees" } },
  manubrio: { src: "/me/web/manubrio.jpg", pos: "50% 50%", alt: { it: "Il manubrio della bici visto dalla sella", en: "The bike handlebar seen from the saddle" } },
  "primo-piano": { src: "/me/web/primo-piano.jpg", pos: "50% 50%", alt: { it: "Matteo, primo piano", en: "Matteo, close-up" } },
  notte: { src: "/me/web/notte.jpg", pos: "50% 50%", alt: { it: "Matteo che corre di notte", en: "Matteo running at night" } },
  "s-todo": { src: "/work/mosaico/todo-estratto.jpg", pos: "50% 50%", alt: { it: "To-Do List: le liste e le note", en: "To-Do List: lists and notes" } },
  "s-poke": { src: "/work/mosaico/h-poke.jpg", pos: "50% 0%", alt: { it: "PokèReact: la scheda di Charizard", en: "PokèReact: Charizard's card" } },
  "s-gare": { src: "/work/mosaico/h-gare.jpg", pos: "50% 0%", alt: { it: "Gare del Pisa Running Club: l'accesso", en: "Pisa Running Club races: sign-in" } },
  "s-corsette": { src: "/work/mosaico/h-corsette.jpg", pos: "50% 0%", alt: { it: "Pisa Running Club: le prossime corse", en: "Pisa Running Club: the upcoming runs" } },
  "s-stats": { src: "/work/mosaico/h-stats.jpg", pos: "50% 0%", alt: { it: "GitHub Stats: il profilo di un utente", en: "GitHub Stats: a user profile" } },
  "s-poke-elenco": { src: "/work/mosaico/h-poke-elenco.jpg", pos: "50% 0%", alt: { it: "PokèReact: l'elenco dei Pokémon", en: "PokèReact: the list of Pokémon" } },
  "s-stats-repo": { src: "/work/mosaico/h-stats-repo.jpg", pos: "50% 0%", alt: { it: "GitHub Stats: i repository di un profilo", en: "GitHub Stats: a profile's repositories" } },
  "s-footer": { src: "/work/mosaico/prc-footer-estratto.jpg", pos: "50% 50%", alt: { it: "Pisa Running Club: il piè di pagina del sito", en: "Pisa Running Club: the site footer" } },
};

/** Mosaico della prima schermata: screenshot dei lavori. */
export const heroPhotos = ["s-todo", "s-poke", "s-gare", "s-corsette", "s-stats", "s-poke-elenco", "s-stats-repo", "s-footer"] as const;
/** Disposizione degli 8 screenshot: due strisce larghe (todo e footer) e sei tasselli. */
export const heroLayout = "shots8";
/**
 * I tre mosaici di foto di Chi sono (pagina e sezione della home): cambiano mentre si scorre
 * e ognuno accompagna una parte del testo. Le 10 foto sono divise senza ripetizioni.
 */
export const aboutMosaics = [
  { id: "volti", keys: ["sorpresa", "sole", "primo-piano"] },
  { id: "giro", keys: ["strada", "notte", "maglia"] },
  { id: "ciclismo", keys: ["bosco", "manubrio", "casco", "bici"] },
] as const;
export const contactPhotos = ["sorpresa", "bici", "maglia", "casco"] as const;
