import PhotoGrid from "./PhotoGrid";
import type { Lang } from "@/lib/routes";

/** Lo stage fermo riempito dal mosaico di foto. */
export default function PhotoStage({ lang, keys, layout }: { lang: Lang; keys: readonly string[]; layout?: string }) {
  return (
    <div className="stage stage-photos">
      <PhotoGrid lang={lang} keys={keys} layout={layout} />
    </div>
  );
}
