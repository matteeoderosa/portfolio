"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { isCurrentPath } from "@/lib/routes";

type Props = { items: { label: string; href: string }[]; ariaLabel: string };

/**
 * On the home page the highlighted link follows the section being read: sections carry
 * data-nav="<href of the link that matches them>". Elsewhere it is the page itself.
 */
export default function MainNav({ items, ariaLabel }: Props) {
  const pathname = usePathname() ?? "";
  const home = items.find((i) => i.href === "/" || i.href === "/en/")?.href;
  const onHome = home !== undefined && isCurrentPath(home, pathname);
  const [spied, setSpied] = useState<string | null>(null);

  useEffect(() => {
    if (!onHome || !("IntersectionObserver" in window)) return;
    const marks = Array.from(document.querySelectorAll<HTMLElement>("[data-nav]"));
    if (marks.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setSpied((e.target as HTMLElement).dataset.nav ?? null);
        }
      },
      // a band across the middle of the screen: the section crossing it is the one being read
      { rootMargin: "-45% 0px -45% 0px" },
    );
    marks.forEach((m) => io.observe(m));
    return () => {
      io.disconnect();
      setSpied(null);
    };
  }, [onHome]);

  const activeHref = items.find((item) =>
    onHome && spied ? item.href === spied : isCurrentPath(item.href, pathname),
  )?.href;

  // The underline is one element that glides to the current link instead of jumping between links.
  const navRef = useRef<HTMLElement>(null);
  const [bar, setBar] = useState<{ x: number; y: number; w: number } | null>(null);
  const [glide, setGlide] = useState(false);

  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const place = () => {
      const link = nav.querySelector<HTMLElement>("a[aria-current]");
      if (!link) return setBar(null);
      const pad = parseFloat(getComputedStyle(link).paddingLeft) || 0;
      const next = { x: link.offsetLeft + pad, y: link.offsetTop + link.offsetHeight - 9, w: link.offsetWidth - pad * 2 };
      setBar((prev) => (prev && prev.x === next.x && prev.y === next.y && prev.w === next.w ? prev : next));
    };
    place();
    if (!("ResizeObserver" in window)) return;
    const ro = new ResizeObserver(place);
    ro.observe(nav);
    document.fonts?.ready.then(place);
    return () => ro.disconnect();
  }, [activeHref]);

  // the first placement must not travel in from the corner
  useEffect(() => {
    if (!bar || glide) return;
    const id = requestAnimationFrame(() => setGlide(true));
    return () => cancelAnimationFrame(id);
  }, [bar, glide]);

  return (
    <nav ref={navRef} className={`main-nav${bar ? " has-bar" : ""}`} aria-label={ariaLabel}>
      <ul>
        {items.map((item) => {
          const current = onHome && spied ? item.href === spied : isCurrentPath(item.href, pathname);
          const kind = onHome && spied && spied !== home ? "location" : "page";
          return (
            <li key={item.href}>
              <Link href={item.href} aria-current={current ? kind : undefined}>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
      {bar && (
        <span
          className="nav-bar"
          aria-hidden="true"
          data-glide={glide || undefined}
          style={{ width: bar.w, transform: `translate(${bar.x}px, ${bar.y}px)` }}
        />
      )}
    </nav>
  );
}
