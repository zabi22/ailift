/**
 * The owner's contact address. Visitors' email apps open a draft to this address;
 * nothing is sent or stored by the website itself. Leave empty until configured.
 */
export const CONTACT_EMAIL = "";

export function buildMailto(to: string, subject: string, lines: (string | false | null | undefined)[]) {
  const body = lines.filter(Boolean).join("\n");
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
