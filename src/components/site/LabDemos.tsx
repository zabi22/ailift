import { useMemo, useState, type ReactNode } from "react";
import { Search, Play, Check, X, Info } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { KNOWLEDGE, DASHBOARD, searchKnowledge } from "@/lib/lab-demos";

function Frame({ n, title, label, children }: { n: string; title: string; label: string; children: ReactNode }) {
  return (
    <section className="border-t border-border py-16">
      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="font-display text-sm text-muted-foreground">{n}</p>
          <h2 className="mt-2 text-3xl">{title}</h2>
          <p className="mt-4 flex gap-2 text-sm text-muted-foreground"><Info className="mt-0.5 size-4 shrink-0" />{label}</p>
        </div>
        <div className="min-w-0 md:col-span-8">{children}</div>
      </div>
    </section>
  );
}

export function KnowledgeAssistantDemo() {
  const { lang, t } = useLang();
  const [q, setQ] = useState("");
  const [asked, setAsked] = useState("");
  const hits = useMemo(() => (asked ? searchKnowledge(asked, lang) : []), [asked, lang]);
  const suggestions = [t("Vad kostar det?", "What does it cost?"), t("Sparar ni mina uppgifter?", "Do you store my data?"), t("Hur snabbt svarar ni?", "How fast do you reply?")];
  return (
    <Frame n="02" title={t("Kunskapsassistent", "Knowledge assistant")} label={t("Fungerar på riktigt, men utan AI: den söker med nyckelord i en liten, fast kunskapsbas om AiLift och visar källan. Inget skickas någonstans.", "Genuinely works, but without AI: it keyword-searches a small, fixed knowledge base about AiLift and shows the source. Nothing is sent anywhere.")}>
      <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); setAsked(q); }}>
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("Ställ en fråga…", "Ask a question…")} aria-label={t("Fråga", "Question")} />
        <Button type="submit" variant="pill"><Search /> {t("Sök", "Ask")}</Button>
      </form>
      <div className="mt-3 flex flex-wrap gap-2">
        {suggestions.map((s) => <button key={s} type="button" onClick={() => { setQ(s); setAsked(s); }} className="rounded-full border border-border px-3 py-1 text-xs hover:border-foreground">{s}</button>)}
      </div>
      <div aria-live="polite" className="mt-6">
        {asked && (hits.length ? (
          <div className="rounded-xl border border-border bg-card p-5">
            <p>{hits[0]!.a[lang]}</p>
            <p className="mt-3 text-xs text-muted-foreground">{t("Källa", "Source")}: {hits[0]!.source[lang]}</p>
          </div>
        ) : (
          <p className="rounded-xl border border-warning/50 bg-warning/10 p-5 text-sm">{t("Jag hittar inget säkert svar. En riktig assistent skulle här lämna över frågan till en människa.", "I can't find a reliable answer. A real assistant would hand this question to a person here.")}</p>
        ))}
      </div>
      <p className="mt-4 text-xs text-muted-foreground">{t(`Kunskapsbasen har ${KNOWLEDGE.length} poster.`, `The knowledge base has ${KNOWLEDGE.length} entries.`)}</p>
    </Frame>
  );
}

export function DashboardDemo() {
  const { lang, t } = useLang();
  const [range, setRange] = useState<"6" | "12">("6");
  const rows = DASHBOARD.slice(-Number(range));
  const max = Math.max(...rows.map((r) => r.enquiries));
  const total = rows.reduce((a, r) => a + r.enquiries, 0);
  const handled = rows.reduce((a, r) => a + r.handled, 0);
  return (
    <Frame n="03" title={t("Exempel-dashboard", "Example dashboard")} label={t("Påhittade exempelsiffror för ett fiktivt företag – inte AiLifts eller någon kunds data.", "Made-up sample figures for a fictional business – not AiLift's or any client's data.")}>
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="eyebrow">{t("Förfrågningar per månad (exempel)", "Enquiries per month (sample)")}</p>
          <div role="group" aria-label={t("Period", "Period")} className="flex rounded-full border border-border p-0.5 text-xs font-semibold">
            {(["6", "12"] as const).map((r) => <button key={r} type="button" aria-pressed={range === r} onClick={() => setRange(r)} className={`rounded-full px-3 py-1 ${range === r ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>{r} {t("mån", "mo")}</button>)}
          </div>
        </div>
        <dl className="mt-6 grid grid-cols-2 gap-4">
          <div><dt className="text-xs text-muted-foreground">{t("Totalt", "Total")}</dt><dd className="font-display text-3xl">{total}</dd></div>
          <div><dt className="text-xs text-muted-foreground">{t("Besvarade", "Answered")}</dt><dd className="font-display text-3xl">{Math.round((handled / total) * 100)}%</dd></div>
        </dl>
        <div className="mt-6 flex h-40 items-end gap-2" role="img" aria-label={t("Stapeldiagram med exempeldata", "Bar chart with sample data")}>
          {rows.map((r) => (
            <div key={r.m.en} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
              <div className="w-full flex-none rounded-t bg-primary transition-all duration-500" style={{ height: `${Math.round((r.enquiries / max) * 130)}px` }} title={`${r.enquiries}`} />
              <span className="text-[10px] text-muted-foreground">{r.m[lang]}</span>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

type CheckResult = { label: string; ok: boolean; detail: string };

export function QaDemo() {
  const { t } = useLang();
  const [results, setResults] = useState<CheckResult[] | null>(null);
  const run = () => {
    const imgs = [...document.querySelectorAll("img")];
    const noAlt = imgs.filter((i) => !i.hasAttribute("alt")).length;
    const h1 = document.querySelectorAll("h1").length;
    const links = [...document.querySelectorAll("a[href]")];
    const emptyLinks = links.filter((a) => !(a.textContent?.trim() || a.getAttribute("aria-label"))).length;
    const desc = document.querySelector('meta[name="description"]')?.getAttribute("content") ?? "";
    const btns = [...document.querySelectorAll("button")].filter((b) => !(b.textContent?.trim() || b.getAttribute("aria-label"))).length;
    setResults([
      { label: t("Sidan har exakt en H1", "Page has exactly one H1"), ok: h1 === 1, detail: `${h1}` },
      { label: t("Alla bilder har alt-text", "All images have alt text"), ok: noAlt === 0, detail: `${imgs.length - noAlt}/${imgs.length}` },
      { label: t("Alla länkar har namn", "All links have a name"), ok: emptyLinks === 0, detail: `${links.length - emptyLinks}/${links.length}` },
      { label: t("Alla knappar har namn", "All buttons have a name"), ok: btns === 0, detail: btns ? `${btns} ${t("saknar", "missing")}` : "OK" },
      { label: t("Metabeskrivning finns", "Meta description present"), ok: desc.length > 30, detail: `${desc.length} ${t("tecken", "chars")}` },
      { label: t("Språk angivet på sidan", "Page language set"), ok: !!document.documentElement.lang, detail: document.documentElement.lang || "–" },
    ]);
  };
  return (
    <Frame n="04" title={t("Webbläsartest", "Browser QA test")} label={t("Körs på riktigt, i din webbläsare, mot just den här sidan. Ett riktigt uppdrag täcker mycket mer: mobil, formulär, hastighet och skärmläsare.", "Runs for real, in your browser, against this very page. A real engagement covers far more: mobile, forms, speed and screen readers.")}>
      <Button variant="pill" size="lg" onClick={run}><Play /> {t("Kör test på den här sidan", "Run test on this page")}</Button>
      {results && (
        <ul className="mt-6 divide-y divide-border rounded-xl border border-border bg-card" aria-live="polite">
          {results.map((r) => (
            <li key={r.label} className="flex items-center justify-between gap-4 p-4 text-sm">
              <span className="flex items-center gap-3">{r.ok ? <Check className="size-4 text-success" /> : <X className="size-4 text-destructive" />}{r.label}</span>
              <span className="font-mono text-xs text-muted-foreground">{r.detail}</span>
            </li>
          ))}
        </ul>
      )}
    </Frame>
  );
}
