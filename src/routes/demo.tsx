import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, X, ShieldAlert, Play, RotateCcw } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { SCENARIOS } from "@/lib/demo";
import { PageHeader } from "@/components/site/PageHeader";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/demo")({
  head: () => ({
    meta: [
      { title: "AI-automation sandlåda — AiLift" },
      { name: "description", content: "Se hur en AI-agent planerar en uppgift, föreslår åtgärder och väntar på ditt godkännande. Sandlåda med exempeldata." },
      { property: "og:title", content: "AI-automation sandlåda — AiLift" },
      { property: "og:description", content: "Interaktiv demonstration av ett AI-arbetsflöde med mänskligt godkännande." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Demo,
});

type Decision = "approved" | "rejected";

function Demo() {
  const { lang, t } = useLang();
  const [id, setId] = useState(SCENARIOS[0]!.id);
  const sc = SCENARIOS.find((s) => s.id === id)!;
  const [task, setTask] = useState("");
  const [stage, setStage] = useState<"task" | "plan" | "done">("task");
  const [dec, setDec] = useState<Record<string, Decision>>({});

  const pick = (newId: string) => { setId(newId); setTask(""); setStage("task"); setDec({}); };
  const allDecided = sc.actions.every((a) => dec[a.id]);
  const taskText = task || sc.task[lang];

  return (
    <>
      <PageHeader
        eyebrow={t("Sandlåda", "Sandbox")}
        title={t("Så fungerar en AI-agent med godkännande.", "How an AI agent with approval works.")}
        intro={t("Välj ett scenario, granska planen och godkänn eller avvisa varje åtgärd.", "Pick a scenario, review the plan, and approve or reject each action.")}
      />
      <section className="container-page max-w-4xl">
        <p role="note" className="mb-10 flex gap-3 rounded-xl border border-warning/50 bg-warning/10 p-4 text-sm">
          <ShieldAlert className="mt-0.5 size-4 shrink-0" />
          {t("Exempelflöde med exempeldata. Ingen AI körs här, inga e-postmeddelanden skickas och inga riktiga konton används. Planerna är förberedda i förväg för att visa principen.", "Sample workflow with sample data. No AI runs here, no emails are sent and no real accounts are touched. The plans are prepared in advance to show the principle.")}
        </p>

        <h2 className="font-display text-2xl">1. {t("Välj scenario", "Choose a scenario")}</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3" role="radiogroup">
          {SCENARIOS.map((s) => (
            <button key={s.id} type="button" role="radio" aria-checked={id === s.id} onClick={() => pick(s.id)}
              className={`rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-colors ${id === s.id ? "border-foreground bg-foreground text-background" : "border-border bg-card hover:border-foreground/50"}`}>
              {s.title[lang]}
            </button>
          ))}
        </div>

        <h2 className="mt-10 font-display text-2xl">2. {t("Uppgift", "Task")}</h2>
        <Textarea className="mt-4" rows={3} value={taskText} onChange={(e) => setTask(e.target.value)} disabled={stage !== "task"} aria-label={t("Uppgift", "Task")} />
        <p className="mt-2 text-xs text-muted-foreground">{t("I sandlådan följer planen alltid det valda scenariot, även om du ändrar texten.", "In the sandbox the plan always follows the chosen scenario, even if you edit the text.")}</p>
        {stage === "task" && <Button variant="pill" size="xl" className="mt-4" onClick={() => setStage("plan")}><Play /> {t("Skicka uppgift", "Submit task")}</Button>}

        {stage !== "task" && (
          <>
            <h2 className="mt-10 font-display text-2xl">3. {t("Plan", "Workflow plan")}</h2>
            <ol className="mt-4 space-y-2">
              {sc.plan.map((p, i) => <li key={i} className="flex gap-3 rounded-lg border border-border bg-card p-3 text-sm"><span className="font-semibold text-muted-foreground">{i + 1}</span>{p[lang]}</li>)}
            </ol>

            <h2 className="mt-10 font-display text-2xl">4. {t("Föreslagna åtgärder", "Proposed actions")}</h2>
            <ul className="mt-4 space-y-3">
              {sc.actions.map((a) => (
                <li key={a.id} className="rounded-xl border border-border bg-card p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold">{a.label[lang]}</p>
                      <p className="mt-1 font-mono text-xs text-muted-foreground">{a.tool}{a.sensitive && <span className="ml-2 rounded bg-warning/20 px-1.5 py-0.5 font-sans font-semibold text-foreground">{t("Känslig", "Sensitive")}</span>}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant={dec[a.id] === "approved" ? "default" : "outline"} disabled={stage === "done"} onClick={() => setDec((d) => ({ ...d, [a.id]: "approved" }))} aria-pressed={dec[a.id] === "approved"}><Check /> {t("Godkänn", "Approve")}</Button>
                      <Button size="sm" variant={dec[a.id] === "rejected" ? "destructive" : "outline"} disabled={stage === "done"} onClick={() => setDec((d) => ({ ...d, [a.id]: "rejected" }))} aria-pressed={dec[a.id] === "rejected"}><X /> {t("Avvisa", "Reject")}</Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            {stage === "plan" && (
              <Button variant="lime" size="xl" className="mt-6" disabled={!allDecided} onClick={() => setStage("done")}>
                {allDecided ? t("Kör simuleringen", "Run simulation") : t("Ta ställning till alla åtgärder", "Decide on every action")}
              </Button>
            )}
          </>
        )}

        {stage === "done" && (
          <div aria-live="polite">
            <h2 className="mt-10 font-display text-2xl">5. {t("Resultat och logg", "Output and log")}</h2>
            <div className="mt-4 rounded-xl border border-border bg-secondary/60 p-5">
              <p className="eyebrow">{t("Simulerat resultat", "Simulated output")}</p>
              <p className="mt-2">{sc.actions.some((a) => dec[a.id] === "rejected") ? t("Delvis genomfört – avvisade åtgärder hoppades över.", "Partly completed – rejected actions were skipped.") : sc.output[lang]}</p>
            </div>
            <pre className="mt-4 overflow-x-auto rounded-xl bg-ink p-5 text-xs leading-relaxed text-ink-foreground">
              {[`> task: ${taskText}`, ...sc.actions.map((a, i) => `[${String(i + 1).padStart(2, "0")}] ${a.tool.padEnd(15)} ${dec[a.id] === "approved" ? `OK      ${a.result[lang]}` : `SKIPPED ${t("avvisad av människa", "rejected by human")}`}`), `> ${t("klart – ingen riktig åtgärd utfördes", "done – no real action was performed")}`].join("\n")}
            </pre>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="pillOutline" size="xl" onClick={() => pick(id)}><RotateCcw /> {t("Börja om", "Start over")}</Button>
              <Button asChild variant="pill" size="xl"><Link to="/contact" search={{ service: "ai-automation" }}>{t("Diskutera en automatisering", "Discuss an automation")}</Link></Button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
