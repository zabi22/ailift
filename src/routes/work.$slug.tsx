import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { getProject } from "@/lib/projects";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/site/StatusBadge";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const p = getProject(params.slug);
    if (!p) throw notFound();
    return { slug: p.slug, title: p.title, summary: p.summary.sv };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — AiLift projekt` },
          { name: "description", content: loaderData.summary },
          { property: "og:title", content: `${loaderData.title} — AiLift` },
          { property: "og:description", content: loaderData.summary },
          { property: "og:type", content: "article" },
          { name: "twitter:card", content: "summary" },
        ]
      : [{ title: "Projekt — AiLift" }, { name: "robots", content: "noindex" }],
  }),
  component: ProjectPage,
});

function ProjectPage() {
  const { slug } = Route.useLoaderData();
  const p = getProject(slug)!;
  const { lang, t } = useLang();
  const desktop = p.screenshots?.find((s) => s.kind === "desktop");
  const mobile = p.screenshots?.find((s) => s.kind === "mobile");
  const external = p.link?.href.startsWith("http");

  const Block = ({ h, children }: { h: string; children: React.ReactNode }) => (
    <div className="grid gap-3 border-t border-border py-8 md:grid-cols-12">
      <h2 className="text-2xl md:col-span-4">{h}</h2>
      <div className="text-muted-foreground md:col-span-8">{children}</div>
    </div>
  );

  return (
    <>
      <section className="container-page pt-10">
        <Link to="/work" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> {t("Alla projekt", "All projects")}
        </Link>
      </section>
      <section className="container-page pb-12 pt-8">
        <div className="flex flex-wrap items-center gap-3">
          <p className="eyebrow">{p.category[lang]}</p>
          <StatusBadge status={p.status} />
        </div>
        <h1 className="mt-4 text-5xl md:text-7xl">{p.title}</h1>
        <p className="mt-6 max-w-3xl text-xl text-muted-foreground">{p.summary[lang]}</p>
        {p.link && (
          <Button asChild variant="lime" size="xl" className="mt-8">
            {external
              ? <a href={p.link.href} target="_blank" rel="noopener noreferrer">{p.link.label[lang]} <ArrowUpRight /></a>
              : <a href={p.link.href}>{p.link.label[lang]} <ArrowUpRight /></a>}
          </Button>
        )}
      </section>

      {desktop && (
        <section className="container-page">
          <div className="relative rounded-2xl border border-border bg-secondary/60 p-4 md:p-8">
            <img src={desktop.src} alt={desktop.alt[lang]} className="w-full rounded-lg border border-border shadow-xl" width={1440} height={900} />
            {mobile && (
              <img src={mobile.src} alt={mobile.alt[lang]} loading="lazy" className="absolute -bottom-8 right-6 hidden w-40 rounded-2xl border-4 border-ink shadow-2xl md:block lg:w-52" />
            )}
          </div>
          <p className="mt-12 text-xs text-muted-foreground">{t("Skärmbild från den publicerade webbplatsen.", "Screenshot of the live website.")}</p>
        </section>
      )}

      <section className="container-page mt-12 max-w-5xl">
        <Block h={t("Översikt", "Overview")}><p>{p.overview[lang]}</p></Block>
        <Block h={t("Problemet", "The problem")}><p>{p.problem[lang]}</p></Block>
        <Block h={t("Lösningen", "The solution")}><p>{p.solution[lang]}</p></Block>
        <Block h={t("Mitt bidrag", "My contribution")}><p className="text-foreground">{p.contribution[lang]}</p></Block>
        {p.existing[lang].length > 0 && (
          <Block h={p.status === "live" ? t("Finns på webbplatsen idag", "On the live website today") : t("Finns idag", "Exists today")}>
            <ul className="list-disc space-y-1 pl-5">{p.existing[lang].map((x) => <li key={x}>{x}</li>)}</ul>
          </Block>
        )}
        {p.tech.length > 0 && (
          <Block h={t("Teknik", "Technology")}>
            <div className="flex flex-wrap gap-2">{p.tech.map((x) => <span key={x} className="rounded-full border border-border px-3 py-1 text-sm text-foreground">{x}</span>)}</div>
          </Block>
        )}
        <Block h={t("Resultat", "Outcomes")}><p>{p.outcomes[lang]}</p></Block>
        {p.planned[lang].length > 0 && (
          <Block h={t("Nästa steg", "Next steps")}>
            <ul className="list-disc space-y-1 pl-5">{p.planned[lang].map((x) => <li key={x}>{x}</li>)}</ul>
          </Block>
        )}
        {p.note && <p className="border-t border-border pt-6 text-sm text-muted-foreground">{p.note[lang]}</p>}
      </section>
    </>
  );
}
