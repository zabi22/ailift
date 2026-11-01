import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { PROJECTS } from "@/lib/projects";
import { PageHeader } from "@/components/site/PageHeader";
import { StatusBadge } from "@/components/site/StatusBadge";
import type { Project } from "@/lib/projects";

export const Route = createFileRoute("/work/")({
  head: () => ({
    meta: [
      { title: "Projekt och portfolio — AiLift" },
      { name: "description", content: "Webbutveckling, AI-automation, AI-assistenter och forskning – med tydlig status för varje projekt." },
      { property: "og:title", content: "Projekt och portfolio — AiLift" },
      { property: "og:description", content: "Verkliga projekt från AiLift, ärligt märkta: live, prototyp eller under utveckling." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Work,
});

function Work() {
  const { lang, t } = useLang();
  const clients = PROJECTS.filter((p) => p.kind === "client");
  const labs = PROJECTS.filter((p) => p.kind === "lab");
  return (
    <>
      <PageHeader
        eyebrow={t("Portfolio", "Portfolio")}
        title={t("Vårt arbete.", "Our work.")}
        intro={t("Varje projekt visar sin status. Vi visar bara resultat som det finns belägg för.", "Every project shows its status. We only show results there is evidence for.")}
      />
      <section className="container-page" aria-labelledby="client-work">
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-border pb-4">
          <h2 id="client-work" className="text-3xl md:text-4xl">{t("Kunduppdrag", "Client work")}</h2>
          <p className="text-sm text-muted-foreground">{t("Levererat för riktiga organisationer", "Delivered for real organisations")}</p>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {clients.map((p, i) => <Card key={p.slug} p={p} wide={i === 0} />)}
        </div>
      </section>
      <section className="container-page py-24" aria-labelledby="labs">
        <div className="grid gap-6 border-b border-border pb-4 md:grid-cols-12">
          <h2 id="labs" className="text-3xl md:col-span-5 md:text-4xl">{t("Labb & experiment", "Labs & experiments")}</h2>
          <p className="text-sm text-muted-foreground md:col-span-7">{t("Egna prototyper, verktyg och forskning. Inte kunduppdrag – och märkta med var de faktiskt står.", "Our own prototypes, tools and research. Not client deliveries – and labelled with where they actually stand.")}</p>
        </div>
        <ul className="mt-2">
          {labs.map((p) => (
            <li key={p.slug} className="border-b border-border">
              <Link to="/work/$slug" params={{ slug: p.slug }} className="group grid items-baseline gap-3 py-8 transition-colors md:grid-cols-12">
                <p className="eyebrow md:col-span-3">{p.category[lang]}</p>
                <div className="md:col-span-7">
                  <h3 className="text-2xl transition-transform duration-300 group-hover:translate-x-1">{p.title}</h3>
                  <p className="mt-2 text-muted-foreground">{p.summary[lang]}</p>
                </div>
                <div className="flex items-center gap-3 md:col-span-2 md:justify-end"><StatusBadge status={p.status} /><ArrowUpRight className="size-4" /></div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

function Card({ p, wide }: { p: Project; wide: boolean }) {
  const { lang, t } = useLang();
  const shot = p.screenshots?.[0];
  return (
    <Link to={(p.caseStudy ?? "/work/$slug") as "/work/$slug"} params={{ slug: p.slug }} className={`group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${wide ? "md:col-span-2" : ""}`}>
      {shot && <div className="overflow-hidden bg-secondary"><img src={shot.src} alt={shot.alt[lang]} loading={wide ? "eager" : "lazy"} className={`w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02] ${wide ? "aspect-[16/8]" : "aspect-[16/10]"}`} /></div>}
      <div className="flex flex-1 flex-col p-8">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="eyebrow">{p.category[lang]}</p>
          <StatusBadge status={p.status} />
        </div>
        <h3 className="mt-3 text-3xl">{p.title}</h3>
        {(p.industry || p.year) && <p className="mt-2 text-sm text-muted-foreground">{[p.industry?.[lang], p.year].filter(Boolean).join(" · ")}</p>}
        <p className="mt-3 flex-1 text-muted-foreground">{p.summary[lang]}</p>
        <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold">{p.caseStudy ? t("Se fallstudien", "View case study") : t("Läs mer", "Read more")} <ArrowUpRight className="size-4" /></span>
      </div>
    </Link>
  );
}
