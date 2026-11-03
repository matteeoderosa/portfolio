import { photos } from "@/content/photos";
import { assetHref } from "@/lib/site";
import type { Lang } from "@/lib/routes";

/** Mosaico di immagini (foto di Matteo o screenshot dei lavori): 3, 4, 6 o 8 tasselli, ritagliati a riempire lo spazio. */
export default function PhotoGrid({ lang, keys, layout }: { lang: Lang; keys: readonly string[]; layout?: string }) {
  return (
    <div className="photo-grid" data-n={layout ?? keys.length}>
      {keys.map((k, i) => {
        const p = photos[k];
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={k}
            src={assetHref(p.src)}
            alt={p.alt[lang]}
            style={{ objectPosition: p.pos, "--i": i } as React.CSSProperties}
            loading={i < 2 ? "eager" : "lazy"}
          />
        );
      })}
    </div>
  );
}
