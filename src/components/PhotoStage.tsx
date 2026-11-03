import PhotoGrid from "./PhotoGrid";
import PhotoMosaic from "./PhotoMosaic";
import type { MosaicNode } from "@/content/photos";
import type { Lang } from "@/lib/routes";

/** Lo stage fermo riempito da un mosaico: di foto intere (`tree`) o di immagini ritagliate (`keys`). */
export default function PhotoStage({
  lang,
  keys,
  layout,
  tree,
}: {
  lang: Lang;
  keys?: readonly string[];
  layout?: string;
  tree?: MosaicNode;
}) {
  return (
    <div className="stage stage-photos">
      {tree ? <PhotoMosaic lang={lang} tree={tree} /> : <PhotoGrid lang={lang} keys={keys ?? []} layout={layout} />}
    </div>
  );
}
