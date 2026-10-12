/**
 * PUBLIC_CONTACT_EMAIL — the one public contact setting for AiLift.
 *
 * Leave empty ("") until the owner chooses an address. While empty, the booking and
 * contact forms offer "copy message" only. When set to a valid address, an
 * "Open email draft" button opens the visitor's own email app (mailto:) with the
 * message prefilled. The website never sends or stores anything itself.
 */
export const PUBLIC_CONTACT_EMAIL = "ailift.contact@gmail.com";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Returns the address only when it looks like a valid email, otherwise null. */
export function resolveContactEmail(value: string = PUBLIC_CONTACT_EMAIL): string | null {
  const v = value.trim();
  return EMAIL_RE.test(v) ? v : null;
}

type Line = string | false | null | undefined | 0;

/** Joins lines into a readable message, dropping empty optional lines. */
export function formatMessage(lines: Line[]) {
  return lines
    .filter((l): l is string => typeof l === "string")
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function buildMailto(to: string, subject: string, body: string) {
  return `mailto:${encodeURIComponent(to).replace(/%40/g, "@")}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** Copies text to the clipboard; returns false if the browser refused. Nothing is stored. */
export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      ta.remove();
      return ok;
    } catch {
      return false;
    }
  }
}
