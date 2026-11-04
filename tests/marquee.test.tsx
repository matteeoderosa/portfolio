import { describe, it, expect, afterEach, vi } from "vitest";
import { render, cleanup } from "@testing-library/react";
import PhotoMarquee from "@/components/PhotoMarquee";
import { heroPhotos } from "@/content/photos";

const LENGTH = 1000;

function setup(narrow: boolean) {
  const frames: FrameRequestCallback[] = [];
  vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => frames.push(cb));
  vi.stubGlobal("cancelAnimationFrame", () => {});
  vi.stubGlobal("matchMedia", (q: string) => ({
    matches: q.includes("max-width") ? narrow : false,
    addEventListener: () => {},
    removeEventListener: () => {},
  }));
  vi.spyOn(HTMLElement.prototype, "offsetWidth", "get").mockReturnValue(LENGTH);
  const view = render(<PhotoMarquee lang="it" keys={heroPhotos} />);
  const el = view.container.querySelector(".photo-marquee") as HTMLDivElement;
  // jsdom does not scroll: keep the value written to scrollLeft
  let left = 0;
  Object.defineProperty(el, "scrollLeft", { get: () => left, set: (v: number) => (left = v), configurable: true });
  const tick = (now: number) => frames.splice(0).forEach((cb) => cb(now));
  /** Runs the loop at ~60fps from `from` for `ms`. */
  const run = (from: number, ms: number) => {
    for (let t = from; t <= from + ms; t += 16) tick(t);
  };
  return { el, tick, run };
}

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("PhotoMarquee", () => {
  it("renders every photo twice, the second copy hidden from assistive tech", () => {
    const { el } = setup(true);
    expect(el.querySelectorAll(".marquee-track")).toHaveLength(2);
    expect(el.querySelectorAll("img")).toHaveLength(heroPhotos.length * 2);
    expect(el.querySelector(".marquee-track[aria-hidden]")).not.toBeNull();
  });

  it("on a phone advances scrollLeft each frame and wraps at the end of one copy", () => {
    const { el, run } = setup(true);
    run(0, 1000); // about 1s at 125px/s
    expect(el.scrollLeft).toBeGreaterThan(100);
    expect(el.scrollLeft).toBeLessThan(150);
    run(1016, 12000); // longer than a whole copy (1000px at 125px/s = 8s)
    expect(el.scrollLeft).toBeGreaterThanOrEqual(0);
    expect(el.scrollLeft).toBeLessThan(LENGTH);
  });

  it("stops while the finger is down", () => {
    const { el, run } = setup(true);
    run(0, 500);
    el.dispatchEvent(new Event("touchstart"));
    const held = el.scrollLeft;
    expect(held).toBeGreaterThan(0);
    run(516, 1000);
    expect(el.scrollLeft).toBe(held);
  });
});
