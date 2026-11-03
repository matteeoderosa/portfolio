import ExerciseFilter from "@/components/ExerciseFilter";
import Stage from "@/components/Stage";
import { dictionaries } from "@/content/dictionaries";
import { exercises } from "@/content/exercises";
import type { Lang } from "@/lib/routes";

export default function ArchiveView({ lang }: { lang: Lang }) {
  const dict = dictionaries[lang];
  const a = dict.archive;
  return (
    <div className="split page-split">
      <Stage />
      <div className="col page-col">
        <h1 className="rise">{a.title}</h1>
        <p className="lead rise" style={{ "--i": 1 } as React.CSSProperties}>
          {a.lead}
        </p>
        <ExerciseFilter exercises={exercises} />
      </div>
    </div>
  );
}
