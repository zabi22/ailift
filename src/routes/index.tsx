import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Bot, GraduationCap, Globe, Boxes } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { SERVICES } from "@/lib/services";
import { PROJECTS } from "@/lib/projects";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/site/StatusBadge";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AiLift — Praktisk AI, smartare företag" },
      { name: "description", content: "AiLift hjälper småföretag att automatisera repetitivt arbete med AI, bygga webbplatser och skräddarsydd mjukvara, och komma igång med AI genom workshops." },
      { property: "og:title", content: "AiLift — Praktisk AI, smartare företag" },
      { property: "og:description", content: "AI-automation, AI-rådgivning, webbutveckling och skräddarsydd affärsmjukvara för små och medelstora företag." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const ICONS = [Bot, GraduationCap, Globe, Boxes];

function Home() {
  const { lang, t } = useLang();
  const featured = PROJECTS.slice(0, 3);
  const steps = [
    [t("Förstå problemet", "Discover the problem"), t("Vi går igenom hur ni arbetar idag och var tiden går åt.", "We look at how you work today and where time is lost.")],
    [t("Utforma lösningen", "Design the solution"), t("Ett konkret förslag med omfattning och pris innan något byggs.", "A concrete proposal with scope and price before anything is built.")],
    [t("Bygga och testa", "Build and test"), t("Vi bygger i små steg och testar med riktiga uppgifter.", "We build in small steps and test with real tasks.")],
    [t("Driftsätta och förbättra", "Deploy and improve"), t("Lösningen tas i bruk och justeras efter hur den används.", "The solution goes live and is adjusted based on how it's used.")],
  ];

  return (
    <>
      <section className="container-page pb-24 pt-16 md:pt-28">
        <p className="eyebrow fade-up">{t("AI · Automation · Webb · Mjukvara", "AI · Automation · Web · Software")}</p>
        <h1 className="fade-up mt-6 max-w-5xl text-6xl md:text-8xl">
          {lang === "sv" ? <>Praktisk AI. <span className="lime-mark italic">Smartare</span> företag.</> : <>Practical AI. <span className="lime-mark italic">Smarter</span> business.</>}
        </h1>
        <p className="fade-up mt-8 max-w-2xl text-xl text-muted-foreground">
          {t("Vi hjälper företag att automatisera repetitivt arbete, bygga bättre digitala produkter och göra AI till praktisk affärsnytta.", "We help businesses automate repetitive work, build better digital products, and turn AI into practical business value.")}
        </p>
        <div className="fade-up mt-10 flex flex-wrap gap-3">
          <Button asChild variant="lime" size="xl"><Link to="/contact">{t("Diskutera ett projekt", "Discuss a project")} <ArrowRight /></Link></Button>
          <Button asChild variant="pillOutline" size="xl"><Link to="/work">{t("Se vårt arbete", "Explore our work")}</Link></Button>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/60 py-24">
        <div className="container-page">
          <p className="eyebrow">{t("Tjänster", "Services")}</p>
          <h2 className="mt-4 max-w-2xl text-4xl md:text-5xl">{t("Fyra sätt vi kan hjälpa till.", "Four ways we can help.")}</h2>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2">
            {SERVICES.map((s, i) => {
              const Icon = ICONS[i]!;
              return (
                <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="group flex flex-col bg-background p-8 transition-colors hover:bg-card md:p-10">
                  <Icon className="size-6" strokeWidth={1.5} />
                  <h3 className="mt-8 text-3xl">{s.title[lang]}</h3>
                  <p className="mt-3 text-muted-foreground">{s.short[lang]}</p>
                  <ul className="mt-6 flex-1 space-y-1 text-sm">
                    {s.deliverables[lang].slice(0, 3).map((d) => <li key={d}>— {d}</li>)}
                  </ul>
                  <span className="mt-8 inline-flex items-center gap-1 text-sm font-semibold">
                    {t("Läs mer", "Learn more")} <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container-page py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">{t("Utvalt arbete", "Selected work")}</p>
            <h2 className="mt-4 text-4xl md:text-5xl">{t("Verkliga projekt, ärligt märkta.", "Real projects, honestly labelled.")}</h2>
          </div>
          <Link to="/work" className="text-sm font-semibold underline underline-offset-4">{t("Alla projekt", "All projects")}</Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {featured.map((p) => (
            <Link key={p.slug} to="/work/$slug" params={{ slug: p.slug }} className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-xl">
              {p.screenshots?.[0] ? (
                <img src={p.screenshots[0].src} alt={p.screenshots[0].alt[lang]} loading="lazy" className="aspect-[16/10] w-full object-cover object-top" />
              ) : (
                <div className="flex aspect-[16/10] items-end bg-ink p-6 text-ink-foreground">
                  <p className="font-display text-2xl">{p.title}</p>
                </div>
              )}
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between gap-2">
                  <p className="eyebrow">{p.category[lang]}</p>
                  <StatusBadge status={p.status} />
                </div>
                <h3 className="mt-3 text-2xl">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.summary[lang]}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-ink py-24 text-ink-foreground">
        <div className="container-page">
          <p className="text-xs font-semibold uppercase tracking-widest opacity-60">{t("Så arbetar vi", "How we work")}</p>
          <h2 className="mt-4 text-4xl md:text-5xl">{t("Från problem till fungerande lösning.", "From problem to working solution.")}</h2>
          <ol className="mt-12 grid gap-10 md:grid-cols-4">
            {steps.map(([h, p], i) => (
              <li key={h} className="border-t border-ink-foreground/20 pt-6">
                <p className="font-display text-4xl text-lime">0{i + 1}</p>
                <h3 className="mt-4 text-2xl">{h}</h3>
                <p className="mt-3 opacity-70">{p}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-page pt-24">
        <div className="rounded-3xl bg-lime px-8 py-16 text-lime-foreground md:px-16">
          <h2 className="max-w-3xl text-4xl md:text-6xl">{t("Vilket problem vill du lösa?", "What problem do you want to solve?")}</h2>
          <p className="mt-6 max-w-xl text-lg">{t("Beskriv det med några meningar. Vi återkommer med frågor och ett förslag – utan förpliktelser.", "Describe it in a few sentences. We'll come back with questions and a proposal – no obligation.")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="pill" size="xl"><Link to="/contact">{t("Diskutera ett projekt", "Discuss a project")} <ArrowRight /></Link></Button>
            <Button asChild variant="pillOutline" size="xl"><Link to="/demo">{t("Prova AI-sandlådan", "Try the AI sandbox")}</Link></Button>
          </div>
        </div>
      </section>
    </>
  );
}
