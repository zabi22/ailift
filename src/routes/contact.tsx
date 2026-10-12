import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { CONTACT_EMAIL, buildMailto } from "@/lib/contact";
import { PageHeader } from "@/components/site/PageHeader";
import { Field } from "@/components/site/Field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Kontakt — AiLift" },
      { name: "description", content: "Har du frågor om AI-workshops, föreläsningar eller coachning? Kontakta AiLift via e-post." },
      { property: "og:title", content: "Kontakt — AiLift" },
      { property: "og:description", content: "Kontakta AiLift via e-post." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { t } = useLang();
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const href = buildMailto(CONTACT_EMAIL, t("Fråga till AiLift", "Question for AiLift"), [message.trim(), "", name.trim(), organization.trim()]);

  return (
    <>
      <PageHeader eyebrow={t("Kontakt", "Contact")} title={t("Hör av dig.", "Get in touch.")} intro={t("Skriv ditt meddelande här så öppnas ett färdigt e-postutkast i ditt eget e-postprogram. Du granskar och skickar det själv — webbplatsen sparar ingenting.", "Write your message here and a ready-made email draft opens in your own email app. You review and send it yourself — the website stores nothing.")} />
      <section className="container-page max-w-2xl">
        {CONTACT_EMAIL ? (
          <p className="mb-8 text-muted-foreground">{t("E-post: ", "Email: ")}<a className="font-semibold text-foreground underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
        ) : (
          <p className="mb-8 rounded-lg bg-muted p-4 text-sm" role="status">{t("Kontaktadressen är inte konfigurerad ännu, så meddelanden kan inte skickas just nu.", "The contact address isn't configured yet, so messages can't be sent right now.")}</p>
        )}
        <div className="space-y-6">
          <Field id="name" label={t("Namn (valfritt)", "Name (optional)")}><Input id="name" value={name} onChange={(e) => setName(e.target.value)} /></Field>
          <Field id="organization" label={t("Organisation (valfritt)", "Organisation (optional)")}><Input id="organization" value={organization} onChange={(e) => setOrganization(e.target.value)} /></Field>
          <Field id="message" label={t("Meddelande", "Message")} error={error}><Textarea id="message" rows={6} value={message} onChange={(e) => setMessage(e.target.value)} /></Field>
          {CONTACT_EMAIL ? (
            <Button asChild variant="pill" size="xl">
              <a href={href} onClick={(e) => { if (message.trim().length < 10) { e.preventDefault(); setError(t("Skriv minst 10 tecken", "Write at least 10 characters")); } else setError(""); }}>
                {t("Öppna e-postutkast", "Open email draft")} <Mail />
              </a>
            </Button>
          ) : (
            <Button variant="pill" size="xl" disabled>{t("Öppna e-postutkast", "Open email draft")} <Mail /></Button>
          )}
        </div>
      </section>
    </>
  );
}
