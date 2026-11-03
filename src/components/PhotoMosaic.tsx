import { photos, type MosaicNode } from "@/content/photos";
import { assetHref } from "@/lib/site";
import type { Lang } from "@/lib/routes";

const ratioOf = (n: MosaicNode): number => {
  if (typeof n === "string") return photos[n].ratio ?? 0.75;
  const rs = n.items.map(ratioOf);
  return n.dir === "row" ? rs.reduce((a, b) => a + b, 0) : 1 / rs.reduce((a, b) => a + 1 / b, 0);
};

/** Le foto del mosaico nell'ordine di lettura: serve a scaglionare l'entrata. */
const leavesOf = (n: MosaicNode): string[] => (typeof n === "string" ? [n] : n.items.flatMap(leavesOf));

function Node({
  n,
  parent,
  lang,
  leaves,
  root,
}: {
  n: MosaicNode;
  parent?: "row" | "col";
  lang: Lang;
  leaves: string[];
  root?: boolean;
}) {
  const a = ratioOf(n);
  // le larghezze (in riga) o le altezze (in colonna) sono proporzionali alla forma delle foto
  // (fattori scalati: con una somma sotto 1 CSS non distribuirebbe tutto lo spazio libero)
  const flex = parent === "row" ? `${a * 1000} 1 0` : parent === "col" ? `${(1 / a) * 1000} 1 0` : undefined;
  if (typeof n === "string") {
    const p = photos[n];
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        className={root ? "mosaic-root" : undefined}
        src={assetHref(p.src)}
        alt={p.alt[lang]}
        style={{ flex, aspectRatio: a, "--i": leaves.indexOf(n) } as React.CSSProperties}
      />
    );
  }
  return (
    <div
      className={root ? "mosaic-root mosaic-box" : "mosaic-box"}
      style={{ flex, flexDirection: n.dir === "row" ? "row" : "column", aspectRatio: a }}
    >
      {n.items.map((c, i) => (
        <Node key={typeof c === "string" ? c : i} n={c} parent={n.dir} lang={lang} leaves={leaves} />
      ))}
    </div>
  );
}

/** Mosaico di foto intere, ognuna nel riquadro della sua forma, centrato nello stage. */
export default function PhotoMosaic({ lang, tree }: { lang: Lang; tree: MosaicNode }) {
  const a = ratioOf(tree);
  return (
    <div className="photo-mosaic" style={{ "--a": a } as React.CSSProperties}>
      <Node n={tree} lang={lang} leaves={leavesOf(tree)} root />
    </div>
  );
}
