"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isCurrentPath } from "@/lib/routes";

type Props = { items: { label: string; href: string }[]; ariaLabel: string };

export default function MainNav({ items, ariaLabel }: Props) {
  const pathname = usePathname() ?? "";
  return (
    <nav className="main-nav" aria-label={ariaLabel}>
      <ul>
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={isCurrentPath(item.href, pathname) ? "page" : undefined}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
