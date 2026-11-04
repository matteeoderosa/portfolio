import PhotoMarquee from "./PhotoMarquee";
import PhotoMosaic from "./PhotoMosaic";
import type { MosaicNode } from "@/content/photos";
import type { Lang } from "@/lib/routes";

/** Lo stage fermo riempito da un mosaico di foto intere (`tree`) o da un nastro di immagini che scorre (`keys`). */
export default function PhotoStage({ lang, keys, tree }: { lang: Lang; keys?: readonly string[]; tree?: MosaicNode }) {
  return (
    <div className="stage stage-photos">
      {tree ? <PhotoMosaic lang={lang} tree={tree} /> : <PhotoMarquee lang={lang} keys={keys ?? []} />}
    </div>
  );
}
