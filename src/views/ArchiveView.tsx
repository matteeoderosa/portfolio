import ExerciseFilter from "@/components/ExerciseFilter";
import { dictionaries } from "@/content/dictionaries";
import { exercises } from "@/content/exercises";
import type { Lang } from "@/lib/routes";

export default function ArchiveView({ lang }: { lang: Lang }) {
  const a = dictionaries[lang].archive;
  return (
    <section className="section page-head">
      <div className="wrap">
        <h1>{a.title}</h1>
        <p className="lead">{a.lead}</p>
        <ExerciseFilter exercises={exercises} />
      </div>
    </section>
  );
}
