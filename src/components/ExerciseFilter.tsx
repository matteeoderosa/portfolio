"use client";

import { useState } from "react";
import { dictionaries } from "@/content/dictionaries";
import type { Exercise } from "@/content/exercises";
import { withBase } from "@/lib/site";

const a = dictionaries.it.archive;

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

const GROUPS: Exercise["group"][] = ["HTML", "JavaScript"];

export default function ExerciseFilter({ exercises }: { exercises: Exercise[] }) {
  const [value, setValue] = useState("");
  const query = normalize(value.trim());
  const visible = query
    ? exercises.filter((e) => normalize(`${e.label} ${e.title}`).includes(query))
    : exercises;

  let status = "";
  if (query) {
    if (visible.length === 0) status = a.none;
    else if (visible.length === 1) status = a.foundOne;
    else status = a.found.replace("{n}", String(visible.length));
  }

  return (
    <>
      <div className="filter">
        <label htmlFor="filtro">{a.filterLabel}</label>
        <input
          id="filtro"
          type="search"
          placeholder={a.placeholder}
          autoComplete="off"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <p className="filter-status" role="status" aria-live="polite">
          {status}
        </p>
      </div>

      {GROUPS.map((group) => {
        const items = visible.filter((e) => e.group === group);
        if (items.length === 0) return null;
        const id = `titolo-${group.toLowerCase()}`;
        return (
          <section key={group} className="exercise-group" aria-labelledby={id} data-group={group}>
            <h2 id={id}>
              {group} <span className="group-count">{a.groupCount.replace("{n}", String(items.length))}</span>
            </h2>
            <ul className="exercise-list">
              {items.map((e) => (
                <li key={e.n} className="exercise" data-exercise>
                  <span className="ex-num">{e.label}</span>
                  <a className="ex-title" href={withBase(e.href)}>
                    {e.title}
                  </a>
                  <a
                    className="ex-code"
                    data-code
                    href={e.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={a.codeAria.replace("{title}", e.title)}
                  >
                    {a.code}{" "}
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                      <path d="M7 17 17 7M8 7h9v9" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </>
  );
}
