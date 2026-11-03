import { aboutMosaics } from "@/content/photos";
import type { Lang } from "@/lib/routes";
import PhotoMosaic from "./PhotoMosaic";

/** Il mosaico di Chi sono dentro il testo: serve su schermi stretti, dove lo stage laterale non c'è. */
export default function InlineMosaic({ lang, id }: { lang: Lang; id: string }) {
  const m = aboutMosaics.find((x) => x.id === id);
  return m ? <PhotoMosaic lang={lang} tree={m.tree} inline /> : null;
}
