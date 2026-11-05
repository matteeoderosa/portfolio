/** Turns a mailto: link into a link that opens Gmail, for the platforms where we want that. */
export type Platform = "android" | "ios" | "mac" | "other";

export function detectPlatform(ua: string, maxTouchPoints = 0): Platform {
  if (/android/i.test(ua)) return "android";
  // iPadOS reports itself as a Mac, but has a touch screen.
  if (/iphone|ipad|ipod/i.test(ua) || (/macintosh/i.test(ua) && maxTouchPoints > 1)) return "ios";
  if (/macintosh|mac os x/i.test(ua)) return "mac";
  return "other"; // Windows, Linux
}

/** Returns null when the plain mailto: should be used (iOS and Mac keep their default mail app). */
export function gmailDeepLink(mailto: string, platform: Platform): string | null {
  if (platform === "ios" || platform === "mac" || !mailto.startsWith("mailto:")) return null;

  if (platform === "android") {
    // The intent targets the Gmail package; if it is not installed Android opens the mailto: fallback.
    return `intent:${mailto}#Intent;action=android.intent.action.SENDTO;package=com.google.android.gm;S.browser_fallback_url=${encodeURIComponent(mailto)};end`;
  }

  // Windows and Linux: the browser cannot tell whether Gmail is in use, so this opens Gmail on the web.
  return gmailWebLink(mailto);
}

export function gmailWebLink(mailto: string): string {
  const url = new URL(mailto);
  const params = new URLSearchParams({ view: "cm", fs: "1", to: decodeURIComponent(url.pathname) });
  const subject = url.searchParams.get("subject");
  const body = url.searchParams.get("body");
  if (subject) params.set("su", subject);
  if (body) params.set("body", body);
  return `https://mail.google.com/mail/?${params.toString().replace(/\+/g, "%20")}`;
}
