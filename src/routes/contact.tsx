import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { formatMessage, resolveContactEmail } from "@/lib/contact";
import { PageHeader } from "@/components/site/PageHeader";
import { Field } from "@/components/site/Field";
import { SendActions } from "@/components/site/SendActions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Kontakt — AiLift" },
      { name: "description", content: "Har du frågor om AI-workshops, föreläsningar eller coachning? Så kontaktar du AiLift." },
      { property: "og:title", content: "Kontakt — AiLift" },
      { property: "og:description", content: "Så kontaktar du AiLift." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { t } = useLang();
  const email = resolveContactEmail();
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const validate = () => {
    if (message.trim().length < 10) {
      setError(t("Skriv minst 10 tecken", "Write at least 10 characters"));
      return false;
    }
    setError("");
    return true;
  };
  const getMessage = () =>
    formatMessage([
      message.trim(),
      "",
      name.trim() && `${t("Namn", "Name")}: ${name.trim()}`,
      organization.trim() && `${t("Organisation", "Organisation")}: ${organization.trim()}`,
    ]);

  return (
    <>
      <PageHeader
        eyebrow={t("Kontakt", "Contact")}
        title={t("Hör av dig.", "Get in touch.")}
        intro={t("Skriv ditt meddelande här så formuleras det färdigt åt dig. Du skickar det själv — webbplatsen skickar eller sparar ingenting.", "Write your message here and it's formatted for you. You send it yourself — the website sends and stores nothing.")}
      />
      <section className="container-page max-w-2xl">
        {email && (
          <p className="mb-8 text-muted-foreground">
            {t("E-post: ", "Email: ")}
            <a className="font-semibold text-foreground underline" href={`mailto:${email}`}>{email}</a>
          </p>
        )}
        <div className="space-y-6">
          <Field id="name" label={t("Namn (valfritt)", "Name (optional)")}><Input id="name" value={name} onChange={(e) => setName(e.target.value)} /></Field>
          <Field id="organization" label={t("Organisation (valfritt)", "Organisation (optional)")}><Input id="organization" value={organization} onChange={(e) => setOrganization(e.target.value)} /></Field>
          <Field id="message" label={t("Meddelande", "Message")} error={error}><Textarea id="message" rows={6} maxLength={3000} value={message} onChange={(e) => setMessage(e.target.value)} /></Field>
          <SendActions
            kind="contact"
            subject={t("Fråga till AiLift", "Question for AiLift")}
            getMessage={getMessage}
            validate={validate}
            onClear={() => { setName(""); setOrganization(""); setMessage(""); setError(""); }}
          />
        </div>
      </section>
    </>
  );
}
