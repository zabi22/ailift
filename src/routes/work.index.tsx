import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { PROJECTS } from "@/lib/projects";
import { PageHeader } from "@/components/site/PageHeader";
import { StatusBadge } from "@/components/site/StatusBadge";
import { AzureCover } from "@/components/site/AzureVisual";

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
  return (
    <>
      <PageHeader
        eyebrow={t("Portfolio", "Portfolio")}
        title={t("Vårt arbete.", "Our work.")}
        intro={t("Varje projekt visar sin status. Vi visar bara resultat som det finns belägg för.", "Every project shows its status. We only show results there is evidence for.")}
      />
      <section className="container-page grid gap-6 md:grid-cols-2">
        {PROJECTS.map((p, i) => (
          <Link key={p.slug} to={(p.caseStudy ?? "/work/$slug") as "/work/$slug"} params={{ slug: p.slug }} className={`group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${i === 0 ? "md:col-span-2" : ""}`}>
            {p.screenshots?.[0] ? (
              <img src={p.screenshots[0].src} alt={p.screenshots[0].alt[lang]} loading={i === 0 ? "eager" : "lazy"} className={`w-full object-cover object-top ${i === 0 ? "aspect-[16/8]" : "aspect-[16/10]"}`} />
            ) : p.caseStudy ? (
              <AzureCover />
            ) : (
              <div className="flex aspect-[16/7] items-end bg-ink p-8 text-ink-foreground">
                <p className="font-display text-3xl">{p.title}</p>
              </div>
            )}
            <div className="flex flex-1 flex-col p-8">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="eyebrow">{p.category[lang]}</p>
                <StatusBadge status={p.status} />
              </div>
              <h2 className="mt-3 text-3xl">{p.title}</h2>
              {(p.industry || p.year) && <p className="mt-2 text-sm text-muted-foreground">{[p.industry?.[lang], p.year].filter(Boolean).join(" · ")}</p>}
              {p.tags && <div className="mt-3 flex flex-wrap gap-2">{p.tags.map((x) => <span key={x} className="rounded-full border border-border px-2.5 py-0.5 text-xs">{x}</span>)}</div>}
              <p className="mt-3 flex-1 text-muted-foreground">{p.summary[lang]}</p>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold">{p.caseStudy ? t("Se fallstudien", "View case study") : t("Läs mer", "Read more")} <ArrowUpRight className="size-4" /></span>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
