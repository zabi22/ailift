import { createServerFn } from "@tanstack/react-start";
import { PUBLIC_CONTACT_EMAIL } from "@/lib/contact";

/**
 * Sends a booking/contact request straight to the owner's inbox via Resend.
 * Nothing is stored by the website. RESEND_FROM can be set to e.g.
 * "AiLift <bokning@ailift.se>" once the domain is verified in Resend.
 */
export const sendRequest = createServerFn({ method: "POST" })
  .inputValidator((d: { subject: string; message: string; replyTo?: string }) => {
    const subject = String(d?.subject ?? "").slice(0, 200).trim();
    const message = String(d?.message ?? "").slice(0, 10000).trim();
    if (!subject || message.length < 10) throw new Error("Invalid request");
    const replyTo = d?.replyTo && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.replyTo) ? d.replyTo : undefined;
    return { subject, message, replyTo };
  })
  .handler(async ({ data }) => {
    const key = process.env.RESEND_API_KEY;
    if (!key) return { ok: false as const, error: "not_configured" };
    const from = process.env.RESEND_FROM || "AiLift <onboarding@resend.dev>";
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [PUBLIC_CONTACT_EMAIL],
        subject: data.subject,
        text: data.message,
        ...(data.replyTo ? { reply_to: data.replyTo } : {}),
      }),
    });
    if (!res.ok) {
      console.error(`Resend failed [${res.status}]: ${await res.text()}`);
      return { ok: false as const, error: "send_failed" };
    }
    return { ok: true as const };
  });
