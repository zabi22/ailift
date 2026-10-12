import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { useLang } from "@/lib/i18n";
import { formatMessage, resolveContactEmail } from "@/lib/contact";
import { SERVICES } from "@/lib/services";
import { PageHeader } from "@/components/site/PageHeader";
import { Field } from "@/components/site/Field";
import { SendActions } from "@/components/site/SendActions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contact")({
  validateSearch: z.object({ service: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "Diskutera ett projekt — AiLift" },
      { name: "description", content: "Berätta om problemet du vill lösa – AI-automation, rådgivning, webbplats eller skräddarsydd mjukvara." },
      { property: "og:title", content: "Diskutera ett projekt — AiLift" },
      { property: "og:description", content: "Kontakta AiLift om AI-automation, rådgivning, webb eller mjukvara." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Contact,
});

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
type F = { name: string; email: string; company: string; service: string; budget: string; description: string };
type E = Partial<Record<keyof F, string>>;

function Contact() {
  const { lang, t } = useLang();
  const search = Route.useSearch();
  const email = resolveContactEmail();
  const empty = (): F => ({ name: "", email: "", company: "", service: SERVICES.some((s) => s.slug === search.service) ? search.service! : "", budget: "", description: "" });
  const [f, setF] = useState<F>(empty);
  const [err, setErr] = useState<E>({});
  const set = (k: keyof F, v: string) => setF((p) => ({ ...p, [k]: v }));

  const budgets: [string, string][] = [
    ["", t("Vill inte ange", "Prefer not to say")],
    ["<25k", t("Under 25 000 kr", "Under SEK 25,000")],
    ["25-75k", "25 000 – 75 000 kr"],
    ["75-200k", "75 000 – 200 000 kr"],
    [">200k", t("Över 200 000 kr", "Over SEK 200,000")],
    ["unsure", t("Vet inte än", "Not sure yet")],
  ];

  const validate = () => {
    const e: E = {};
    if (f.name.trim().length < 2) e.name = t("Ange ditt namn", "Enter your name");
    if (!EMAIL_RE.test(f.email.trim())) e.email = t("Ange en giltig e-postadress, t.ex. namn@foretag.se", "Enter a valid email address, e.g. name@company.com");
    if (!f.service) e.service = t("Välj vad du är intresserad av", "Choose what you're interested in");
    if (f.description.trim().length < 20) e.description = t("Beskriv projektet med minst 20 tecken", "Describe the project in at least 20 characters");
    setErr(e);
    return Object.keys(e).length === 0;
  };
  const svcTitle = SERVICES.find((s) => s.slug === f.service)?.title[lang] ?? t("Övrigt", "Other");
  const getMessage = () =>
    formatMessage([
      t("Hej AiLift!", "Hi AiLift!"),
      "",
      `${t("Intresserad av", "Interested in")}: ${svcTitle}`,
      f.budget && `${t("Budget", "Budget")}: ${budgets.find((b) => b[0] === f.budget)?.[1]}`,
      "",
      `${t("Projektbeskrivning", "Project description")}:`,
      f.description.trim(),
      "",
      `${t("Namn", "Name")}: ${f.name.trim()}`,
      `${t("E-post", "Email")}: ${f.email.trim()}`,
      f.company.trim() && `${t("Företag", "Company")}: ${f.company.trim()}`,
    ]);

  return (
    <>
      <PageHeader
        eyebrow={t("Kontakt", "Contact")}
        title={t("Diskutera ett projekt.", "Discuss a project.")}
        intro={t("Beskriv problemet du vill lösa. Formuläret skapar ett e-postutkast som du granskar och skickar från din egen e-post – webbplatsen skickar eller sparar ingenting.", "Describe the problem you want to solve. The form creates an email draft that you review and send from your own email – the website sends and stores nothing.")}
      />
      <section className="container-page grid max-w-5xl gap-12 md:grid-cols-12">
        <div className="space-y-6 md:col-span-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <Field id="name" label={t("Namn", "Name")} error={err.name}><Input id="name" autoComplete="name" maxLength={100} value={f.name} onChange={(e) => set("name", e.target.value)} /></Field>
            <Field id="email" label={t("Jobbmejl", "Business email")} error={err.email}><Input id="email" type="email" autoComplete="email" maxLength={255} value={f.email} onChange={(e) => set("email", e.target.value)} /></Field>
            <Field id="company" label={t("Företag (valfritt)", "Company (optional)")}><Input id="company" autoComplete="organization" maxLength={150} value={f.company} onChange={(e) => set("company", e.target.value)} /></Field>
            <Field id="budget" label={t("Budget (valfritt)", "Budget (optional)")}>
              <select id="budget" value={f.budget} onChange={(e) => set("budget", e.target.value)} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                {budgets.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </Field>
          </div>
          <Field id="service" label={t("Vad är du intresserad av?", "Service of interest")} error={err.service}>
            <select id="service" value={f.service} onChange={(e) => set("service", e.target.value)} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
              <option value="">{t("Välj…", "Choose…")}</option>
              {SERVICES.map((s) => <option key={s.slug} value={s.slug}>{s.title[lang]}</option>)}
              <option value="other">{t("Övrigt", "Other")}</option>
            </select>
          </Field>
          <Field id="description" label={t("Projektbeskrivning", "Project description")} error={err.description}>
            <Textarea id="description" rows={6} maxLength={3000} value={f.description} onChange={(e) => set("description", e.target.value)} placeholder={t("Vad vill du lösa, och hur gör ni idag?", "What do you want to solve, and how do you do it today?")} />
          </Field>
          <p className="text-xs text-muted-foreground">{t("Dina uppgifter används bara i e-postmeddelandet du själv skickar. Läs mer i vår integritetspolicy.", "Your details are only used in the email you send yourself. See our privacy policy.")}</p>
          <SendActions
            kind="contact"
            subject={`${t("Projektförfrågan", "Project enquiry")}: ${svcTitle}`}
            getMessage={getMessage}
            validate={validate}
            onClear={() => { setF(empty()); setErr({}); }}
          />
        </div>
        <aside className="md:col-span-4">
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="eyebrow">{t("Mejla direkt", "Email directly")}</p>
            {email && <a className="mt-2 block break-all font-semibold underline" href={`mailto:${email}`}>{email}</a>}
            <p className="mt-3 text-sm text-muted-foreground">{t("Öppnas inget e-postprogram? Kopiera meddelandet och skicka det till adressen ovan.", "No email app opening? Copy the message and send it to the address above.")}</p>
          </div>
        </aside>
      </section>
    </>
  );
}
