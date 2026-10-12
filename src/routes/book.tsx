import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { z } from "zod";
import { ArrowLeft, ArrowRight, Pencil } from "lucide-react";
import { useLang } from "@/lib/i18n";

import {
  SESSION_TYPES, OPTIONS, bookingMessage, bookingSubject, emptyBooking, groupFor, reviewRows, usesParticipants, validateStep,
  type BookingForm, type Errors,
} from "@/lib/booking";
import { SendActions } from "@/components/site/SendActions";
import { PageHeader } from "@/components/site/PageHeader";
import { Field } from "@/components/site/Field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/book")({
  validateSearch: z.object({ service: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "Skicka bokningsförfrågan — AiLift" },
      { name: "description", content: "Skicka en kostnadsfri bokningsförfrågan för en AI-workshop, föreläsning eller coachning. Pris diskuteras efter att vi gått igenom dina behov." },
      { property: "og:title", content: "Skicka bokningsförfrågan — AiLift" },
      { property: "og:description", content: "Boka en AI-workshop, föreläsning eller coachning med AiLift." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Book,
});

function Choice({ selected, onPick, children }: { selected: boolean; onPick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onPick}
      aria-pressed={selected}
      className={`rounded-xl border px-4 py-3 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${selected ? "border-foreground bg-foreground text-background" : "border-border bg-card hover:border-foreground/50"}`}
    >
      {children}
    </button>
  );
}

function Book() {
  const { lang, t } = useLang();
  const search = Route.useSearch();
  const initial = () => emptyBooking(SESSION_TYPES.some((s) => s.slug === search.service) ? (search.service as string) : "");
  const [f, setF] = useState<BookingForm>(initial);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const set = <K extends keyof BookingForm>(k: K, v: BookingForm[K]) => setF((p) => ({ ...p, [k]: v }));
  const g = groupFor(f.service);
  const svcTitle = SESSION_TYPES.find((s) => s.slug === f.service)?.title[lang] ?? "";
  const tomorrow = new Date(Date.now() + 864e5).toISOString().slice(0, 10);
  const opt = (sv: string, en: string) => `${t(sv, en)} ${t("(valfritt)", "(optional)")}`;

  function check(s: number) {
    const e = validateStep(f, s, lang);
    setErrors(e);
    return Object.keys(e).length === 0;
  }
  function checkAll() {
    for (const s of [0, 1, 2]) {
      if (!check(s)) { setStep(s); return false; }
    }
    return true;
  }
  function go(s: number) {
    setStep(s);
    document.getElementById("booking-form")?.scrollIntoView({ block: "start" });
  }

  const choices = ({ k, label, cols = "sm:grid-cols-3" }: { k: keyof BookingForm & keyof typeof OPTIONS; label: string; cols?: string }) => (
    <fieldset>
      <legend className="text-sm font-semibold">{label}</legend>
      <div className={`mt-2 grid gap-2 ${cols}`}>
        {(OPTIONS[k] ?? []).map(([v, sv, en]) => (
          <Choice key={v} selected={f[k] === v} onPick={() => set(k, v)}>{t(sv, en)}</Choice>
        ))}
      </div>
      {errors[k] && <p className="mt-2 text-sm text-destructive" role="alert">{errors[k]}</p>}
    </fieldset>
  );
  const text = ({ k, label, area, hint }: { k: keyof BookingForm; label: string; area?: boolean; hint?: string }) => (
    <Field id={k} label={label} error={errors[k]}>
      {area ? (
        <Textarea id={k} rows={4} maxLength={3000} value={f[k]} placeholder={hint} onChange={(e) => set(k, e.target.value)} />
      ) : (
        <Input id={k} maxLength={200} value={f[k]} placeholder={hint} onChange={(e) => set(k, e.target.value)} />
      )}
    </Field>
  );
  const datein = ({ k, label }: { k: "date" | "alt1" | "alt2"; label: string }) => (
    <Field id={k} label={label} error={errors[k]}>
      <Input id={k} type="date" min={tomorrow} value={f[k]} onChange={(e) => set(k, e.target.value)} />
    </Field>
  );

  const stepLabels = [t("Tjänst", "Service"), t("Upplägg", "Session"), t("Kontakt & granska", "Contact & review")];
  const rows = reviewRows(f, lang, svcTitle);

  const nextSteps = [
    [t("Skicka förfrågan", "Send your request"), t("Öppna e-postutkastet och skicka det från din egen e-post. Att öppna utkastet skickar ingenting – AiLift får förfrågan först när du har skickat mejlet.", "Open the email draft and send it from your own email. Opening the draft sends nothing – AiLift only receives your request once you send the email.")],
    [t("Vi stämmer av", "We discuss"), t("Vi går igenom behoven och kommer överens om ett passande upplägg och pris.", "We go through your needs and agree on a suitable scope and price.")],
    [t("Bekräfta", "Confirm"), t("Sessionen bekräftas först när vi båda är överens om detaljerna.", "The session is confirmed only once we both agree on the details.")],
  ];

  const faqs: [string, string, string, string][] = [
    ["Vad kostar en session?", "Priset beror på behov, längd, antal deltagare och hur mycket upplägget anpassas. Du får ett prisförslag efter att vi gått igenom din förfrågan.", "How much does a session cost?", "The price depends on your needs, length, number of participants and level of customization. You'll get a price proposal after we've reviewed your request."],
    ["Vad händer när jag har skickat en förfrågan?", "AiLift läser förfrågan och hör av sig för att stämma av omfattning, datum och pris.", "What happens after I submit a request?", "AiLift reads your request and gets in touch to discuss scope, dates and price."],
    ["Blir mitt önskade datum automatiskt bekräftat?", "Nej. Datumet är ett önskemål och kan inte garanteras. Inget är bekräftat förrän vi båda är överens.", "Is the requested date automatically confirmed?", "No. The date is a preference and can't be guaranteed. Nothing is confirmed until we both agree."],
    ["Kan workshopen anpassas för vår organisation?", "Ja, innehållet anpassas efter er verksamhet, era uppgifter och deltagarnas nivå.", "Can a workshop be customized for my organization?", "Yes, the content is adapted to your organization, tasks and participants' level."],
    ["Kan jag önska en session online?", "Ja, välj online som format i formuläret.", "Can I request an online session?", "Yes, choose online as the format in the form."],
    ["Kan jag föreslå alternativa datum?", "Ja, du kan ange upp till två alternativa datum och om du är flexibel.", "Can I suggest alternative dates?", "Yes, you can add up to two alternative dates and say whether you're flexible."],
    ["Behöver deltagarna förkunskaper om AI?", "Nej. Upplägget anpassas efter deltagarnas nivå, från nybörjare till vana användare.", "Do participants need prior AI knowledge?", "No. The session is adapted to the participants' level, from beginners to regular users."],
    ["Måste jag betala när jag skickar en förfrågan?", "Nej. Det kostar ingenting att skicka en förfrågan.", "Do I have to pay when I send a request?", "No. Sending a request costs nothing."],
  ];

  return (
    <>
      <PageHeader
        eyebrow={t("Bokningsförfrågan", "Booking request")}
        title={t("Berätta vad ni behöver.", "Tell us what you need.")}
        intro={t("Fyll i dina önskemål så formuleras ett färdigt mejl som du själv skickar till AiLift. Inget skickas eller sparas av webbplatsen.", "Fill in your preferences and we format a ready-made email that you send to AiLift yourself. Nothing is sent or stored by the website.")}
      />

      <section className="container-page max-w-3xl">
        <div className="rounded-2xl border border-border bg-secondary/60 p-6 sm:p-8">
          <p className="eyebrow">{t("Pris", "Pricing")}</p>
          <h2 className="mt-2 font-display text-2xl sm:text-3xl">{t("Vi hittar rätt upplägg för dig.", "Let's find the right solution for you.")}</h2>
          <p className="mt-3 text-muted-foreground">{t("Priset beror på dina behov, sessionens längd, antalet deltagare och hur mycket upplägget behöver anpassas. När vi har gått igenom din förfrågan diskuterar vi omfattningen och lämnar ett prisförslag innan du bestämmer dig.", "The price depends on your needs, session length, number of participants and the level of customization required. After reviewing your request, we'll discuss the scope and provide a price proposal before you decide whether to proceed.")}</p>
          <p className="mt-3 font-semibold">{t("Du betalar ingenting när du skickar en förfrågan, och ingen bokning är bekräftad förrän vi har kommit överens om detaljerna.", "There is no payment when you submit a request, and no booking is confirmed until we have agreed on the details.")}</p>
        </div>

        <h2 className="mt-12 font-display text-2xl">{t("Så går det till", "What happens next")}</h2>
        <ol className="mt-4 grid gap-4 sm:grid-cols-3">
          {nextSteps.map(([h, p], i) => (
            <li key={h} className="rounded-2xl border border-border bg-card p-5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-sm font-semibold text-background">{i + 1}</span>
              <p className="mt-3 font-semibold">{h}</p>
              <p className="mt-1 text-sm text-muted-foreground">{p}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="booking-form" className="container-page mt-16 max-w-3xl scroll-mt-24">
        <ol className="mb-10 flex gap-2" aria-label={t("Steg", "Steps")}>
          {stepLabels.map((l, i) => (
            <li key={l} className="flex-1" aria-current={i === step ? "step" : undefined}>
              <div className={`h-1 rounded-full ${i <= step ? "bg-foreground" : "bg-border"}`} />
              <p className={`mt-2 text-xs font-semibold ${i === step ? "text-foreground" : "text-muted-foreground"}`}>{i + 1}. {l}</p>
            </li>
          ))}
        </ol>

        {step === 0 && (
          <fieldset>
            <legend className="font-display text-2xl">{t("Vilken tjänst?", "Which service?")}</legend>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {SESSION_TYPES.map((s) => (
                <Choice key={s.slug} selected={f.service === s.slug} onPick={() => set("service", s.slug)}>
                  <span className="font-semibold">{s.title[lang]}</span>
                </Choice>
              ))}
            </div>
            {errors.service && <p className="mt-2 text-sm text-destructive" role="alert">{errors.service}</p>}
          </fieldset>
        )}

        {step === 1 && (
          <div className="space-y-8">
            <p className="text-sm text-muted-foreground">{t("Frågor för", "Questions for")}: <span className="font-semibold text-foreground">{svcTitle}</span></p>
            {choices({ k: "language", label: t("Önskat språk", "Preferred language") })}
            {choices({ k: "format", label: t("Format", "Format") })}
            {choices({ k: "duration", label: g === "talk" ? t("Föreläsningens längd", "Presentation length") : t("Önskad längd", "Desired duration") })}
            {usesParticipants(g) && (
              <Field id="participants" label={g === "talk" ? opt("Publikens storlek, ungefär", "Approximate audience size") : opt("Antal deltagare, ungefär", "Approximate number of participants")} error={errors.participants}>
                <Input id="participants" inputMode="numeric" className="w-40" value={f.participants} onChange={(e) => set("participants", e.target.value)} />
              </Field>
            )}

            {g === "corporate" && (
              <div className="space-y-6">
                {text({ k: "industry", label: opt("Organisationstyp eller bransch", "Organisation type or industry") })}
                {choices({ k: "aiLevel", label: opt("Deltagarnas nuvarande AI-kunskap", "Participants' current AI knowledge"), cols: "sm:grid-cols-4" })}
                {text({ k: "challenges", area: true, label: opt("Vilka uppgifter eller utmaningar vill ni ta upp?", "Which tasks or challenges do you want to address?") })}
                {text({ k: "outcomes", area: true, label: opt("Vilket praktiskt resultat vill ni ha?", "What practical outcomes do you want?") })}
              </div>
            )}
            {g === "talk" && (
              <div className="space-y-6">
                {text({ k: "occasion", label: t("Evenemang eller tillfälle", "Event or occasion"), hint: t("T.ex. kickoff, konferens, personaldag", "E.g. kickoff, conference, staff day") })}
                {text({ k: "audienceType", label: opt("Typ av publik", "Audience type") })}
                {text({ k: "topics", area: true, label: opt("Huvudtema eller ämnen", "Main theme or topics") })}
                {choices({ k: "qa", label: opt("Önskas en frågestund?", "Would you like a Q&A session?") })}
              </div>
            )}
            {g === "coaching" && (
              <div className="space-y-6">
                {choices({ k: "experience", label: opt("Din nuvarande erfarenhet av AI", "Your current experience with AI") })}
                {text({ k: "topics", area: true, label: opt("Vilka ämnen vill du helst ha hjälp med?", "Which topics do you most want help with?") })}
              </div>
            )}
            {g === "custom" && (
              text({ k: "requirements", area: true, label: t("Beskriv era behov och krav", "Describe your needs and requirements"), hint: t("Målgrupp, ämnen, upplägg – allt som hjälper oss förstå.", "Audience, topics, format – anything that helps us understand.") })
            )}

            <div>
              <p className="text-sm font-semibold">{t("Datum", "Dates")}</p>
              <p className="mt-1 text-sm text-muted-foreground">{t("Datumen är önskemål och garanteras inte.", "Dates are preferences and not guaranteed.")}</p>
              <div className="mt-3 grid gap-4 sm:grid-cols-3">
                {datein({ k: "date", label: t("Önskat datum", "Preferred date") })}
                {datein({ k: "alt1", label: opt("Alternativ 1", "Alternative 1") })}
                {datein({ k: "alt2", label: opt("Alternativ 2", "Alternative 2") })}
              </div>
            </div>
            {choices({ k: "flexible", label: t("Är datumen flexibla?", "Are the dates flexible?"), cols: "sm:grid-cols-2" })}
            {text({ k: "goals", area: true, label: g === "coaching" ? t("Dina viktigaste lärandemål", "Your main learning goals") : t("Huvudsakliga mål", "Main goals"), hint: t("Vad vill ni uppnå?", "What do you want to achieve?") })}
            {text({ k: "notes", area: true, label: opt("Övrig information", "Additional information") })}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2">
              <Field id="name" label={t("Fullständigt namn", "Full name")} error={errors.name}><Input id="name" autoComplete="name" value={f.name} onChange={(e) => set("name", e.target.value)} /></Field>
              <Field id="email" label={t("E-post", "Email")} error={errors.email}><Input id="email" type="email" autoComplete="email" value={f.email} onChange={(e) => set("email", e.target.value)} /></Field>
              {g !== "coaching" && (
                <Field id="organization" label={opt("Organisation", "Organisation")}><Input id="organization" autoComplete="organization" value={f.organization} onChange={(e) => set("organization", e.target.value)} /></Field>
              )}
              <Field id="phone" label={opt("Telefon", "Phone")} error={errors.phone}><Input id="phone" type="tel" autoComplete="tel" value={f.phone} onChange={(e) => set("phone", e.target.value)} /></Field>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="eyebrow">{t("Granska din förfrågan", "Review your request")}</p>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => go(0)}><Pencil /> {t("Ändra tjänst", "Edit service")}</Button>
                  <Button variant="ghost" size="sm" onClick={() => go(1)}><Pencil /> {t("Ändra upplägg", "Edit session")}</Button>
                </div>
              </div>
              <dl className="mt-4 divide-y divide-border text-sm">
                {rows.map((r) => (
                  <div key={r.label} className="grid gap-1 py-2 sm:grid-cols-3">
                    <dt className="text-muted-foreground">{r.label}</dt>
                    <dd className="whitespace-pre-wrap break-words font-medium sm:col-span-2">{r.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <p className="rounded-lg bg-secondary/60 p-4 text-sm">
              {t("Kom ihåg: priset diskuteras efter att vi gått igenom din förfrågan. Du betalar ingenting nu, och inget är bokat förrän vi är överens.", "Remember: the price is discussed after we've reviewed your request. You pay nothing now, and nothing is booked until we agree.")}
            </p>
          </div>
        )}

        <div className="mt-10 flex justify-between gap-4 border-t border-border pt-6">
          {step > 0 ? <Button variant="pillOutline" size="xl" onClick={() => go(step - 1)}><ArrowLeft /> {t("Tillbaka", "Back")}</Button> : <span />}
          {step < 2 && <Button variant="pill" size="xl" onClick={() => check(step) && go(step + 1)}>{t("Fortsätt", "Continue")} <ArrowRight /></Button>}
        </div>
        {step === 2 && (
          <div className="mt-6">
            <SendActions
              kind="booking"
              subject={bookingSubject(lang, svcTitle)}
              getMessage={() => bookingMessage(f, lang, svcTitle)}
              validate={checkAll}
              onClear={() => { setF(emptyBooking()); setErrors({}); go(0); }}
            />
          </div>
        )}
      </section>

      <section className="container-page mt-20 max-w-3xl">
        <h2 className="font-display text-2xl">{t("Vanliga frågor om bokning", "Booking FAQ")}</h2>
        <Accordion type="single" collapsible className="mt-4">
          {faqs.map(([qs, as, qe, ae]) => (
            <AccordionItem key={qe} value={qe}>
              <AccordionTrigger className="text-left">{t(qs, qe)}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{t(as, ae)}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </>
  );
}
