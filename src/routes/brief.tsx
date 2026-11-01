import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { PageHeader } from "@/components/site/PageHeader";
import { Field } from "@/components/site/Field";
import { SendActions } from "@/components/site/SendActions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/brief")({
  head: () => ({
    meta: [
      { title: "Bygg en projektbrief — AiLift" },
      { name: "description", content: "Välj projekttyp, behov och tidsplan – få en tydlig sammanfattning som skickas till AiLift." },
      { property: "og:title", content: "Bygg en projektbrief — AiLift" },
      { property: "og:description", content: "En guidad projektbrief för webb, AI, automation och mjukvara." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Brief,
});

type L = [string, string];
const TYPES: Record<string, L> = {
  website: ["Webbplats", "Website"], webapp: ["Webbapp eller portal", "Web app or portal"], automation: ["AI & automation", "AI & automation"],
  assistant: ["AI-assistent", "AI assistant"], dashboard: ["Dashboard", "Dashboard"], testing: ["Webbtestning", "Website testing"], other: ["Annat", "Something else"],
};
const NEEDS: Record<string, L> = {
  design: ["Ny design", "New design"], content: ["Publicera innehåll själva", "Publish content ourselves"], bilingual: ["Flera språk", "Multiple languages"],
  forms: ["Formulär eller bokning", "Forms or booking"], integrations: ["Koppla ihop befintliga system", "Connect existing systems"], login: ["Inloggning för användare", "User sign-in"],
  seo: ["Synlighet i sök", "Search visibility"], maintenance: ["Underhåll efter lansering", "Maintenance after launch"],
};
const TIMES: Record<string, L> = { asap: ["Så snart som möjligt", "As soon as possible"], "1-3": ["Inom 1–3 månader", "Within 1–3 months"], "3+": ["Om mer än 3 månader", "In more than 3 months"], flex: ["Flexibelt", "Flexible"] };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Chip({ on, onClick, children, role = "checkbox" }: { on: boolean; onClick: () => void; children: string; role?: "checkbox" | "radio" }) {
  return (
    <button type="button" role={role} aria-checked={on} onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm transition-colors ${on ? "border-foreground bg-foreground text-background" : "border-border bg-card hover:border-foreground/50"}`}>
      {children}
    </button>
  );
}

function Brief() {
  const { lang, t } = useLang();
  const i = lang === "sv" ? 0 : 1;
  const [type, setType] = useState("");
  const [needs, setNeeds] = useState<string[]>([]);
  const [time, setTime] = useState("");
  const [goal, setGoal] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState("");
  const [err, setErr] = useState<Record<string, string>>({});

  const toggle = (k: string) => setNeeds((n) => (n.includes(k) ? n.filter((x) => x !== k) : [...n, k]));
  const validate = () => {
    const e: Record<string, string> = {};
    if (!type) e.type = t("Välj en projekttyp", "Choose a project type");
    if (!time) e.time = t("Välj en tidsplan", "Choose a timeline");
    if (goal.trim().length < 20) e.goal = t("Beskriv målet med minst 20 tecken", "Describe the goal in at least 20 characters");
    if (name.trim().length < 2) e.name = t("Ange ditt namn", "Enter your name");
    if (!EMAIL_RE.test(email.trim())) e.email = t("Ange en giltig e-postadress", "Enter a valid email address");
    setErr(e);
    return Object.keys(e).length === 0;
  };
  const summary = [
    `${t("Projekttyp", "Project type")}: ${type ? TYPES[type]![i] : "–"}`,
    `${t("Behov", "Requirements")}: ${needs.length ? needs.map((n) => NEEDS[n]![i]).join(", ") : "–"}`,
    `${t("Tidsplan", "Timeline")}: ${time ? TIMES[time]![i] : "–"}`,
    "",
    `${t("Mål", "Goal")}:`,
    goal.trim() || "–",
  ].join("\n");
  const getMessage = () => [`${t("Projektbrief", "Project brief")}`, "", summary, "", `${t("Namn", "Name")}: ${name.trim()}`, `${t("E-post", "Email")}: ${email.trim()}`, `${t("Organisation", "Organisation")}: ${org.trim() || "–"}`].join("\n");
  const clear = () => { setType(""); setNeeds([]); setTime(""); setGoal(""); setName(""); setEmail(""); setOrg(""); setErr({}); };

  const process: [string, string, string, string][] = [
    ["Samtal", "Conversation", "Vi går igenom problemet och vad som redan finns.", "We go through the problem and what already exists."],
    ["Förslag", "Proposal", "Du får omfattning, leveranser, tidsplan och pris skriftligt.", "You get scope, deliverables, timeline and price in writing."],
    ["Bygge", "Build", "Vi bygger i korta steg och visar fungerande versioner längs vägen.", "We build in short steps and show working versions along the way."],
    ["Lansering", "Launch", "Test, publicering, överlämning och eventuellt underhåll.", "Testing, publishing, handover and optional maintenance."],
  ];

  return (
    <>
      <PageHeader eyebrow={t("Projektbrief", "Project brief")} title={t("Beskriv projektet på tre minuter.", "Describe your project in three minutes.")} intro={t("Välj det som stämmer. Du ser sammanfattningen innan den skickas, och inget sparas på webbplatsen.", "Pick what fits. You see the summary before it's sent, and nothing is stored on the website.")} />
      <section className="container-page grid gap-12 pb-24 md:grid-cols-12">
        <div className="space-y-10 md:col-span-7">
          <fieldset>
            <legend className="font-display text-2xl">1. {t("Vad vill du bygga?", "What do you want to build?")}</legend>
            <div role="radiogroup" className="mt-4 flex flex-wrap gap-2">{Object.entries(TYPES).map(([k, v]) => <Chip key={k} role="radio" on={type === k} onClick={() => setType(k)}>{v[i]}</Chip>)}</div>
            {err.type && <p className="mt-2 text-sm text-destructive">{err.type}</p>}
          </fieldset>
          <fieldset>
            <legend className="font-display text-2xl">2. {t("Vad behöver det kunna?", "What does it need?")} <span className="text-sm text-muted-foreground">({t("valfritt", "optional")})</span></legend>
            <div className="mt-4 flex flex-wrap gap-2">{Object.entries(NEEDS).map(([k, v]) => <Chip key={k} on={needs.includes(k)} onClick={() => toggle(k)}>{v[i]}</Chip>)}</div>
          </fieldset>
          <fieldset>
            <legend className="font-display text-2xl">3. {t("När?", "When?")}</legend>
            <div role="radiogroup" className="mt-4 flex flex-wrap gap-2">{Object.entries(TIMES).map(([k, v]) => <Chip key={k} role="radio" on={time === k} onClick={() => setTime(k)}>{v[i]}</Chip>)}</div>
            {err.time && <p className="mt-2 text-sm text-destructive">{err.time}</p>}
          </fieldset>
          <div>
            <h2 className="font-display text-2xl">4. {t("Mål och kontakt", "Goal and contact")}</h2>
            <div className="mt-4 space-y-4">
              <Field id="goal" label={t("Vad ska projektet åstadkomma?", "What should the project achieve?")} error={err.goal}><Textarea id="goal" rows={4} value={goal} onChange={(e) => setGoal(e.target.value)} /></Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="name" label={t("Namn", "Name")} error={err.name}><Input id="name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" /></Field>
                <Field id="email" label={t("E-post", "Email")} error={err.email}><Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" /></Field>
              </div>
              <Field id="org" label={t("Organisation (valfritt)", "Organisation (optional)")}><Input id="org" value={org} onChange={(e) => setOrg(e.target.value)} autoComplete="organization" /></Field>
            </div>
          </div>
        </div>
        <aside className="md:col-span-5">
          <div className="sticky top-24 rounded-2xl border border-border bg-card p-6">
            <p className="eyebrow">{t("Sammanfattning", "Summary")}</p>
            <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-relaxed">{summary}</pre>
            <div className="mt-6"><SendActions kind="contact" subject={`${t("Projektbrief", "Project brief")} – ${name.trim() || "AiLift"}`} getMessage={getMessage} validate={validate} onClear={clear} /></div>
          </div>
        </aside>
      </section>
      <section className="border-t border-border bg-secondary/40 py-20">
        <div className="container-page">
          <h2 className="max-w-2xl text-4xl">{t("Så går ett uppdrag till", "How an engagement works")}</h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-4">
            {process.map((p, n) => <li key={p[1]} className="border-t-2 border-foreground pt-4"><p className="font-display text-sm text-muted-foreground">0{n + 1}</p><h3 className="mt-1 text-xl">{lang === "sv" ? p[0] : p[1]}</h3><p className="mt-2 text-sm text-muted-foreground">{lang === "sv" ? p[2] : p[3]}</p></li>)}
          </ol>
          <div className="mt-14 grid gap-10 md:grid-cols-2">
            <div><h3 className="text-2xl">{t("Typiska leveranser", "Typical deliverables")}</h3><p className="mt-3 text-muted-foreground">{t("Fungerande webbplats, app eller automation, källkod och åtkomst som är er, dokumentation och en genomgång av hur ni använder det.", "A working website, app or automation, source code and access that belong to you, documentation and a walkthrough of how to use it.")}</p></div>
            <div><h3 className="text-2xl">{t("Hur priset bestäms", "How pricing is agreed")}</h3><p className="mt-3 text-muted-foreground">{t("Inga fasta paket. Efter samtalet får du ett skriftligt förslag med fast pris eller timpris för en tydlig omfattning. Inget arbete börjar innan du har godkänt det.", "No fixed packages. After the conversation you get a written proposal with a fixed or hourly price for a clear scope. No work starts until you've approved it.")}</p></div>
          </div>
        </div>
      </section>
    </>
  );
}
