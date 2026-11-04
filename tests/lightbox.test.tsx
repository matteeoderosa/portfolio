import { describe, it, expect, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import Lightbox from "@/components/Lightbox";

const labels = {
  open: "Ingrandisci",
  close: "Chiudi",
  prev: "Foto precedente",
  next: "Foto successiva",
  zoom: "Ingrandisci al 100%",
  unzoom: "Adatta allo schermo",
  of: "di",
};

function mosaic(n = 3) {
  return (
    <div className="photo-mosaic">
      {Array.from({ length: n }, (_, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={i} src={`/foto-${i + 1}.jpg`} alt={`Foto ${i + 1}`} />
      ))}
    </div>
  );
}

function setup(n = 3) {
  const view = render(
    <>
      {mosaic(n)}
      <Lightbox labels={labels} />
    </>,
  );
  const dialog = view.container.ownerDocument.querySelector("dialog.lightbox") as HTMLDialogElement;
  const tiles = () => Array.from(view.container.querySelectorAll<HTMLImageElement>(".photo-mosaic img"));
  return { dialog, photo: (i: number) => tiles()[i - 1] };
}

afterEach(cleanup);

describe("Lightbox", () => {
  it("turns the photos into buttons that can be reached by keyboard", () => {
    const { photo } = setup();
    const first = photo(1);
    expect(first.getAttribute("role")).toBe("button");
    expect(first.getAttribute("tabindex")).toBe("0");
    expect(first.getAttribute("aria-label")).toBe("Ingrandisci: Foto 1");
  });

  it("opens the clicked photo whole, with a counter and no caption for personal photos", () => {
    const { dialog, photo } = setup();
    fireEvent.click(photo(2));
    expect(dialog.hasAttribute("open")).toBe(true);
    const big = dialog.querySelector(".lb-stage img") as HTMLImageElement;
    expect(big.src.endsWith("/foto-2.jpg")).toBe(true);
    expect(dialog.querySelector(".lb-count")?.textContent).toBe("2 di 3");
    expect(dialog.querySelector(".lb-caption")?.textContent).toBe("");
    expect(dialog.hasAttribute("data-no-caption")).toBe(true);
  });

  it("keeps the caption for the project screenshots", () => {
    const view = render(
      <>
        <div className="photo-marquee">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/shot-1.jpg" alt="PokèReact: la scheda di Charizard" />
        </div>
        <Lightbox labels={labels} />
      </>,
    );
    const dialog = view.container.ownerDocument.querySelector("dialog.lightbox") as HTMLDialogElement;
    fireEvent.click(view.container.querySelector(".photo-marquee img") as HTMLImageElement);
    expect(dialog.querySelector(".lb-caption")?.textContent).toBe("PokèReact: la scheda di Charizard");
    expect(dialog.hasAttribute("data-no-caption")).toBe(false);
  });

  it("opens from the keyboard with Enter", () => {
    const { dialog, photo } = setup();
    fireEvent.keyDown(photo(1), { key: "Enter" });
    expect(dialog.hasAttribute("open")).toBe(true);
  });

  it("moves between the photos of the same mosaic with the arrows and wraps around", () => {
    const { dialog, photo } = setup();
    fireEvent.click(photo(1));
    fireEvent.keyDown(dialog, { key: "ArrowRight" });
    expect(dialog.querySelector(".lb-count")?.textContent).toBe("2 di 3");
    fireEvent.keyDown(dialog, { key: "ArrowLeft" });
    fireEvent.keyDown(dialog, { key: "ArrowLeft" });
    expect(dialog.querySelector(".lb-count")?.textContent).toBe("3 di 3");
  });

  it("closes with the button and with Escape", () => {
    const { dialog, photo } = setup();
    fireEvent.click(photo(1));
    fireEvent.click(screen.getByRole("button", { name: "Chiudi", hidden: true }));
    expect(dialog.hasAttribute("open")).toBe(false);
    fireEvent.click(photo(1));
    dialog.dispatchEvent(new Event("cancel", { cancelable: true }));
    expect(dialog.hasAttribute("open")).toBe(false);
  });

  it("hides the arrows when the mosaic has a single photo", () => {
    const { dialog, photo } = setup(1);
    fireEvent.click(photo(1));
    expect(dialog.hasAttribute("data-single")).toBe(true);
  });

  it("toggles the zoom to 100% and labels the button accordingly", () => {
    const { dialog, photo } = setup();
    fireEvent.click(photo(1));
    const zoom = dialog.querySelector(".lb-zoom") as HTMLButtonElement;
    fireEvent.click(zoom);
    expect(zoom.getAttribute("aria-pressed")).toBe("true");
    expect(zoom.getAttribute("aria-label")).toBe("Adatta allo schermo");
    expect(dialog.querySelector(".lb-stage")?.classList.contains("is-zoomed")).toBe(true);
    fireEvent.click(zoom);
    expect(zoom.getAttribute("aria-pressed")).toBe("false");
  });
});
