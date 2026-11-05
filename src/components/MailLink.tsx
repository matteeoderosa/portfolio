"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { detectPlatform, gmailDeepLink, gmailWebLink } from "@/lib/gmail";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string };

/**
 * A mailto: link that opens Gmail on Android (app) and on Windows/Linux (web).
 * On Mac it tries the default mail app and falls back to Gmail web if nothing opens.
 * On iOS, and without script, it is a normal mailto: link (default mail app).
 */
export default function MailLink({ href, onClick, children, ...rest }: Props) {
  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e);
    if (e.defaultPrevented) return;

    const platform = detectPlatform(navigator.userAgent, navigator.maxTouchPoints);
    // Let ctrl/cmd/shift/middle clicks behave as the browser normally would.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

    if (platform === "mac" && href.startsWith("mailto:")) {
      // The mailto: goes ahead. If no mail app takes over (the window keeps focus), open Gmail on the web instead.
      let left = false;
      const markLeft = () => {
        left = true;
      };
      window.addEventListener("blur", markLeft, { once: true });
      document.addEventListener("visibilitychange", markLeft, { once: true });
      window.setTimeout(() => {
        window.removeEventListener("blur", markLeft);
        document.removeEventListener("visibilitychange", markLeft);
        if (left || document.hidden || !document.hasFocus()) return;
        const url = gmailWebLink(href);
        if (!window.open(url, "_blank", "noopener,noreferrer")) window.location.href = url;
      }, 1500);
      return;
    }

    const deep = gmailDeepLink(href, platform);
    if (!deep) return;

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
