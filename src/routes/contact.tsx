import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { supabase } from "@/integrations/supabase/client";
import { PageHeader } from "@/components/site/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field } from "@/components/site/Field";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Kontakt — AiLift" },
      { name: "description", content: "Har du frågor om AI-workshops, föreläsningar eller coachning? Skicka ett meddelande till AiLift." },
      { property: "og:title", content: "Kontakt — AiLift" },
      { property: "og:description", content: "Skicka ett meddelande till AiLift." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { t } = useLang();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [serverError, setServerError] = useState("");

  const schema = z.object({
    name: z.string().trim().min(2, t("Ange ditt namn", "Enter your name")).max(120),
    email: z.string().trim().email(t("Ange en giltig e-postadress", "Enter a valid email address")).max(255),
    organization: z.string().trim().max(200).optional(),
    message: z.string().trim().min(10, t("Skriv minst 10 tecken", "Write at least 10 characters")).max(3000),
  });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = Object.fromEntries(new FormData(e.currentTarget));
    if (fd.website) return; // honeypot
    const parsed = schema.safeParse(fd);
    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.issues.map((i) => [i.path[0], i.message])));
      return;
    }
    setErrors({});
    setBusy(true);
    setServerError("");
    const { error } = await supabase.from("contact_messages").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      organization: parsed.data.organization || null,
      message: parsed.data.message,
    });
    setBusy(false);
    if (error) setServerError(t("Något gick fel. Försök igen.", "Something went wrong. Please try again."));
    else setSent(true);
  }

  return (
    <>
      <PageHeader eyebrow={t("Kontakt", "Contact")} title={t("Hör av dig.", "Get in touch.")} intro={t("Har du en fråga eller vill diskutera en idé? Skicka ett meddelande så återkommer vi.", "Have a question or want to discuss an idea? Send a message and we'll get back to you.")} />
      <section className="container-page max-w-2xl">
        {sent ? (
          <div className="rounded-2xl border border-border bg-card p-10 text-center" role="status">
            <CheckCircle2 className="mx-auto size-10" />
            <h2 className="mt-4 text-3xl">{t("Tack för ditt meddelande!", "Thanks for your message!")}</h2>
            <p className="mt-3 text-muted-foreground">{t("Meddelandet är mottaget och vi återkommer så snart vi kan.", "Your message has been received and we'll get back to you as soon as we can.")}</p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-6" noValidate>
            <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
            <Field id="name" label={t("Namn", "Name")} error={errors.name}><Input id="name" name="name" autoComplete="name" /></Field>
            <Field id="email" label={t("E-post", "Email")} error={errors.email}><Input id="email" name="email" type="email" autoComplete="email" /></Field>
            <Field id="organization" label={t("Organisation (valfritt)", "Organisation (optional)")}><Input id="organization" name="organization" /></Field>
            <Field id="message" label={t("Meddelande", "Message")} error={errors.message}><Textarea id="message" name="message" rows={6} /></Field>
            {serverError && <p className="text-sm text-destructive" role="alert">{serverError}</p>}
            <Button type="submit" variant="pill" size="xl" disabled={busy}>{busy ? t("Skickar…", "Sending…") : t("Skicka meddelande", "Send message")}</Button>
          </form>
        )}
      </section>
    </>
  );
}
