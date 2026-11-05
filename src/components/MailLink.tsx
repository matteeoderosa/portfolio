"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { detectPlatform, gmailDeepLink } from "@/lib/gmail";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string };

/**
 * A mailto: link that opens Gmail on Android (app) and on Windows/Linux (web).
 * On iOS and Mac, and without script, it is a normal mailto: link (default mail app).
 */
export default function MailLink({ href, onClick, children, ...rest }: Props) {
  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e);
    if (e.defaultPrevented) return;

    const platform = detectPlatform(navigator.userAgent, navigator.maxTouchPoints);
    const deep = gmailDeepLink(href, platform);
    if (!deep) return;

    // Let ctrl/cmd/shift/middle clicks behave as the browser normally would.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

    e.preventDefault();
    if (platform === "other") {
      window.open(deep, "_blank", "noopener,noreferrer");
      return;
    }
    window.location.href = deep; // Android: Gmail app, or the default mail app if Gmail is missing
  }

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
