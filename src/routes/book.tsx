import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { SERVICES } from "@/lib/services";
import { formatMessage } from "@/lib/contact";
import { SendActions } from "@/components/site/SendActions";
import { PageHeader } from "@/components/site/PageHeader";
import { Field } from "@/components/site/Field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/book")({
  validateSearch: z.object({ service: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "Skicka bokningsförfrågan — AiLift" },
      { name: "description", content: "Skicka en kostnadsfri bokningsförfrågan för en AI-workshop, föreläsning eller coachning." },
      { property: "og:title", content: "Skicka bokningsförfrågan — AiLift" },
      { property: "og:description", content: "Boka en AI-workshop, föreläsning eller coachning med AiLift." },
    ],
  }),
  component: Book,
});

type Errs = Partial<Record<"service" | "audience" | "format" | "date" | "time" | "participants" | "goals" | "name" | "email" | "phone", string>>;

type Form = {
  service: string;
  audience: string;
  format: string;
  participants: string;
  date: string;
  time: string;
  goals: string;
  name: string;
  email: string;
  phone: string;
  organization: string;
};


function Book() {
  const { lang, t } = useLang();
  const search = Route.useSearch();
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Errs>({});
  const empty = (): Form => ({
    service: SERVICES.some((s) => s.slug === search.service) ? (search.service as string) : "",
    audience: "",
    format: "",
    participants: "",
    date: "",
    time: "",
    goals: "",
    name: "",
    email: "",
    phone: "",
    organization: "",
  });
  const [f, setF] = useState<Form>(empty);
  const set = <K extends keyof Form>(k: K, v: Form[K]) => setF((p) => ({ ...p, [k]: v }));

  const audiences = [
    ["company", t("Företag", "Company")],
    ["school", t("Skola", "School")],
    ["organization", t("Organisation / förening", "Organisation / association")],
    ["individual", t("Privatperson", "Individual")],
  ] as [string, string][];
  const formats = [
    ["onsite", t("På plats", "On site")],
    ["online", "Online"],
    ["either", t("Spelar ingen roll", "Either")],
  ] as [string, string][];
  const times = [
    ["morning", t("Förmiddag", "Morning")],
    ["afternoon", t("Eftermiddag", "Afternoon")],
    ["full_day", t("Heldag", "Full day")],
  ] as [string, string][];

  function validate(s: number) {
    const e: Errs = {};
    if (s === 0) {
      if (!f.service) e.service = t("Välj en tjänst", "Choose a service");
      if (!f.audience) e.audience = t("Välj vem bokningen gäller", "Choose who the booking is for");
      if (!f.format) e.format = t("Välj format", "Choose a format");
    }
    if (s === 1) {
      if (!f.date) e.date = t("Välj ett önskat datum", "Choose a preferred date");
      if (!f.time) e.time = t("Välj tid på dagen", "Choose a time of day");
      if (f.participants && (!/^\d+$/.test(f.participants) || +f.participants < 1 || +f.participants > 2000)) e.participants = t("Ange ett antal mellan 1 och 2000", "Enter a number between 1 and 2000");
      if (f.goals.trim().length < 10) e.goals = t("Beskriv era mål med minst 10 tecken", "Describe your goals in at least 10 characters");
    }
    if (s === 2) {
      if (f.name.trim().length < 2) e.name = t("Ange ditt namn", "Enter your name");
      if (!z.string().email().safeParse(f.email.trim()).success) e.email = t("Ange en giltig e-postadress", "Enter a valid email address");
      if (f.phone && !/^[+\d\s()-]{6,40}$/.test(f.phone)) e.phone = t("Ange ett giltigt telefonnummer", "Enter a valid phone number");
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  const svcTitle = (l: "sv" | "en") => SERVICES.find((x) => x.slug === f.service)?.title[l] ?? "";
  function getMessage() {
    const label = (list: [string, string][], v: string) => list.find((x) => x[0] === v)?.[1] ?? v;
    return formatMessage([
      `${t("Bokningsförfrågan till AiLift", "Booking request for AiLift")}`,
      "",
      `${t("Tjänst", "Service")}: ${svcTitle(lang)}`,
      `${t("Gäller", "For")}: ${label(audiences, f.audience)}`,
      `${t("Format", "Format")}: ${label(formats, f.format)}`,
      `${t("Önskat datum", "Preferred date")}: ${f.date} (${label(times, f.time)})`,
      f.participants && `${t("Antal deltagare", "Participants")}: ${f.participants}`,
      "",
      `${t("Mål och ämnen", "Goals and topics")}:`,
      f.goals.trim(),
      "",
      `${t("Namn", "Name")}: ${f.name.trim()}`,
      `${t("E-post", "Email")}: ${f.email.trim()}`,
      f.phone.trim() && `${t("Telefon", "Phone")}: ${f.phone.trim()}`,
      f.organization.trim() && `${t("Organisation", "Organisation")}: ${f.organization.trim()}`,
    ]);
  }

  const stepLabels = [t("Tjänst", "Service"), t("Önskemål", "Preferences"), t("Kontakt", "Contact")];
  const svc = SERVICES.find((s) => s.slug === f.service);

  const Choice = ({ value, current, onPick, children }: { value: string; current: string; onPick: (v: string) => void; children: React.ReactNode }) => (
    <button
      type="button"
      onClick={() => onPick(value)}
      aria-pressed={current === value}
      className={`rounded-xl border px-4 py-3 text-left text-sm transition-colors ${current === value ? "border-foreground bg-foreground text-background" : "border-border bg-card hover:border-foreground/50"}`}
    >
      {children}
    </button>
  );

  return (
    <>
      <PageHeader
        eyebrow={t("Bokningsförfrågan", "Booking request")}
        title={t("Berätta vad ni behöver.", "Tell us what you need.")}
        intro={t("Fyll i dina önskemål så formuleras ett färdigt meddelande som du själv skickar till AiLift. Inget skickas eller sparas av webbplatsen.", "Fill in your preferences and we format a ready-made message that you send to AiLift yourself. Nothing is sent or stored by the website.")}
      />
      <section className="container-page max-w-3xl">
        <ol className="mb-10 flex gap-2" aria-label={t("Steg", "Steps")}>
          {stepLabels.map((l, i) => (
            <li key={l} className="flex-1">
              <div className={`h-1 rounded-full ${i <= step ? "bg-foreground" : "bg-border"}`} />
              <p className={`mt-2 text-xs font-semibold ${i === step ? "text-foreground" : "text-muted-foreground"}`} aria-current={i === step ? "step" : undefined}>
                {i + 1}. {l}
              </p>
            </li>
          ))}
        </ol>

        {step === 0 && (
          <div className="space-y-10">
            <fieldset>
              <legend className="font-display text-2xl">{t("Vilken tjänst?", "Which service?")}</legend>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {SERVICES.map((s) => (
                  <Choice key={s.slug} value={s.slug} current={f.service} onPick={(v) => set("service", v)}>
                    <span className="font-semibold">{s.title[lang]}</span>
                  </Choice>
                ))}
              </div>
              {errors.service && <p className="mt-2 text-sm text-destructive" role="alert">{errors.service}</p>}
            </fieldset>
            <fieldset>
              <legend className="font-display text-2xl">{t("Vem gäller det?", "Who is it for?")}</legend>
              <div className="mt-4 grid gap-3 sm:grid-cols-4">
                {audiences.map(([v, l]) => <Choice key={v} value={v} current={f.audience} onPick={(x) => set("audience", x)}>{l}</Choice>)}
              </div>
              {errors.audience && <p className="mt-2 text-sm text-destructive" role="alert">{errors.audience}</p>}
            </fieldset>
            <fieldset>
              <legend className="font-display text-2xl">{t("Format", "Format")}</legend>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {formats.map(([v, l]) => <Choice key={v} value={v} current={f.format} onPick={(x) => set("format", x)}>{l}</Choice>)}
              </div>
              {errors.format && <p className="mt-2 text-sm text-destructive" role="alert">{errors.format}</p>}
            </fieldset>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-8">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <p className="font-display text-2xl">{t("Önskat datum", "Preferred date")}</p>
                <p className="mt-1 text-sm text-muted-foreground">{t("Datumet är ett önskemål och bekräftas i efterhand.", "The date is a preference and will be confirmed afterwards.")}</p>
                <Input id="date" type="date" className="mt-3 w-56" value={f.date} min={new Date(Date.now() + 864e5).toISOString().slice(0, 10)} onChange={(e) => set("date", e.target.value)} aria-label={t("Önskat datum", "Preferred date")} />
                {errors.date && <p className="mt-2 text-sm text-destructive" role="alert">{errors.date}</p>}
              </div>
              <div className="space-y-6">
                <fieldset>
                  <legend className="font-display text-2xl">{t("Tid på dagen", "Time of day")}</legend>
                  <div className="mt-3 grid gap-2">
                    {times.map(([v, l]) => <Choice key={v} value={v} current={f.time} onPick={(x) => set("time", x)}>{l}</Choice>)}
                  </div>
                  {errors.time && <p className="mt-2 text-sm text-destructive" role="alert">{errors.time}</p>}
                </fieldset>
                <Field id="participants" label={t("Antal deltagare (ungefär, valfritt)", "Number of participants (approx., optional)")} error={errors.participants}>
                  <Input id="participants" inputMode="numeric" value={f.participants} onChange={(e) => set("participants", e.target.value)} />
                </Field>
              </div>
            </div>
            <Field id="goals" label={t("Mål och önskade ämnen", "Goals and desired topics")} error={errors.goals}>
              <Textarea id="goals" rows={5} maxLength={3000} value={f.goals} onChange={(e) => set("goals", e.target.value)} placeholder={t("Vad vill ni uppnå? Vilken nivå har deltagarna?", "What do you want to achieve? What level are the participants?")} />
            </Field>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Field id="name" label={t("Namn", "Name")} error={errors.name}><Input id="name" autoComplete="name" value={f.name} onChange={(e) => set("name", e.target.value)} /></Field>
              <Field id="email" label={t("E-post", "Email")} error={errors.email}><Input id="email" type="email" autoComplete="email" value={f.email} onChange={(e) => set("email", e.target.value)} /></Field>
              <Field id="phone" label={t("Telefon (valfritt)", "Phone (optional)")} error={errors.phone}><Input id="phone" type="tel" autoComplete="tel" value={f.phone} onChange={(e) => set("phone", e.target.value)} /></Field>
              <Field id="organization" label={t("Organisation (valfritt)", "Organisation (optional)")}><Input id="organization" value={f.organization} onChange={(e) => set("organization", e.target.value)} /></Field>
            </div>
            <div className="rounded-2xl border border-border bg-secondary/60 p-6">
              <p className="eyebrow">{t("Sammanfattning", "Summary")}</p>
              <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <div><dt className="text-muted-foreground">{t("Tjänst", "Service")}</dt><dd className="font-semibold">{svc?.title[lang]}</dd></div>
                <div><dt className="text-muted-foreground">{t("Datum", "Date")}</dt><dd className="font-semibold">{f.date} · {times.find((x) => x[0] === f.time)?.[1]}</dd></div>
                <div><dt className="text-muted-foreground">{t("Format", "Format")}</dt><dd className="font-semibold">{formats.find((x) => x[0] === f.format)?.[1]}</dd></div>
                <div><dt className="text-muted-foreground">{t("Deltagare", "Participants")}</dt><dd className="font-semibold">{f.participants || "—"}</dd></div>
              </dl>
            </div>
            <p className="text-sm text-muted-foreground">{t("Dina uppgifter stannar i den här webbläsarfliken och sparas inte av webbplatsen.", "Your details stay in this browser tab and are not stored by the website.")}</p>
          </div>
        )}


        <div className="mt-10 flex justify-between gap-4 border-t border-border pt-6">
          {step > 0 ? (
            <Button variant="pillOutline" size="xl" onClick={() => setStep(step - 1)}><ArrowLeft /> {t("Tillbaka", "Back")}</Button>
          ) : <span />}
          {step < 2 ? (
            <Button variant="pill" size="xl" onClick={() => validate(step) && setStep(step + 1)}>{t("Fortsätt", "Continue")} <ArrowRight /></Button>
          ) : <span />}
        </div>
        {step === 2 && (
          <div className="mt-6">
            <SendActions
              kind="booking"
              subject={`${t("Bokningsförfrågan", "Booking request")}: ${svcTitle(lang)}`}
              getMessage={getMessage}
              validate={() => validate(2)}
              onClear={() => { setF(empty()); setErrors({}); setStep(0); }}
            />
          </div>
        )}
      </section>
    </>
  );
}
