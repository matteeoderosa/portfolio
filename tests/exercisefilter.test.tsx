import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup, fireEvent } from "@testing-library/react";
import ExerciseFilter from "@/components/ExerciseFilter";
import { exercises } from "@/content/exercises";
import { dictionaries } from "@/content/dictionaries";

afterEach(cleanup);
const a = dictionaries.it.archive;

describe("ExerciseFilter", () => {
  it("lists all exercises with groups, counts and external code links", () => {
    const { container } = render(<ExerciseFilter exercises={exercises} />);
    expect(container.querySelectorAll("[data-exercise]").length).toBe(26);
    expect(container.textContent).toContain(a.groupCount.replace("{n}", "8"));
    expect(container.textContent).toContain(a.groupCount.replace("{n}", "18"));
    const code = container.querySelector("a[data-code]") as HTMLAnchorElement;
    expect(code.rel).toBe("noopener noreferrer");
    expect(code.target).toBe("_blank");
  });

  it("typing narrows the list and updates the status", () => {
    const { container, getByRole } = render(<ExerciseFilter exercises={exercises} />);
    const input = getByRole("searchbox");
    const status = getByRole("status");
    expect(status.textContent).toBe("");
    fireEvent.change(input, { target: { value: "rubrica" } });
    expect(container.querySelectorAll("[data-exercise]").length).toBe(2);
    expect(status.textContent).toBe(a.found.replace("{n}", "2"));
    fireEvent.change(input, { target: { value: "fattoriale" } });
    expect(status.textContent).toBe(a.foundOne);
    expect(container.querySelectorAll("[data-group]").length).toBe(1);
  });

  it("matches by number and ignores accents", () => {
    const { container, getByRole } = render(<ExerciseFilter exercises={exercises} />);
    fireEvent.change(getByRole("searchbox"), { target: { value: "es. 2-bis" } });
    expect(container.querySelectorAll("[data-exercise]").length).toBe(1);
    fireEvent.change(getByRole("searchbox"), { target: { value: "PIU complesse" } });
    expect(container.querySelectorAll("[data-exercise]").length).toBe(1);
  });

  it("shows an empty-result message", () => {
    const { container, getByRole } = render(<ExerciseFilter exercises={exercises} />);
    fireEvent.change(getByRole("searchbox"), { target: { value: "zzzz" } });
    expect(container.querySelectorAll("[data-exercise]").length).toBe(0);
    expect(getByRole("status").textContent).toBe(a.none);
  });
});
