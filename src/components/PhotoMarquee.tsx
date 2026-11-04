import { photos } from "@/content/photos";
import { assetHref } from "@/lib/site";
import type { Lang } from "@/lib/routes";

/**
 * Le immagini scorrono senza fine: in verticale accanto al testo, in orizzontale su telefono.
 * Il percorso è scritto due volte di fila e il tutto scivola di una copia intera: al giro dopo
 * riparte da dove era, senza stacco. La seconda copia non si legge e non si raggiunge da tastiera.
 * Il passaggio del mouse ferma lo scorrimento; con il movimento ridotto non si muove e si scorre a mano.
 */
export default function PhotoMarquee({ lang, keys }: { lang: Lang; keys: readonly string[] }) {
  const track = (copy: boolean) => (
    <div className="marquee-track" aria-hidden={copy || undefined}>
      {keys.map((k, i) => {
        const p = photos[k];
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={k}
            src={assetHref(p.src)}
            alt={p.alt[lang]}
            data-dup={copy || undefined}
            loading={i < 3 && !copy ? "eager" : "lazy"}
            style={{ aspectRatio: p.ratio ?? 0.75 }}
          />
        );
      })}
    </div>
  );
  return (
    <div className="photo-marquee">
      {track(false)}
      {track(true)}
    </div>
  );
}
