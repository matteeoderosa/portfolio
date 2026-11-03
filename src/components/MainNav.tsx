"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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

  return (
    <nav className="main-nav" aria-label={ariaLabel}>
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
    </nav>
  );
}
