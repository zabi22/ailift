import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { getService } from "@/lib/services";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { slug: service.slug, seo: service.seo.sv, short: service.short.sv };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.seo} — AiLift` },
          { name: "description", content: loaderData.short },
          { property: "og:title", content: `${loaderData.seo} — AiLift` },
          { property: "og:description", content: loaderData.short },
          { property: "og:type", content: "website" },
          { name: "twitter:card", content: "summary" },
        ]
      : [{ title: "Tjänst — AiLift" }, { name: "robots", content: "noindex" }],
  }),
  component: ServiceDetail,
});

function List({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((o) => <li key={o} className="flex gap-3"><Check className="mt-1 size-4 shrink-0" />{o}</li>)}
    </ul>
  );
}

function ServiceDetail() {
  const { slug } = Route.useLoaderData();
  const s = getService(slug)!;
  const { lang, t } = useLang();
  const isConsulting = s.slug === "ai-consulting";
  const steps = [t("Förstå problemet", "Discover"), t("Utforma lösningen", "Design"), t("Bygga och testa", "Build & test"), t("Driftsätta och förbättra", "Deploy & improve")];

  return (
    <>
      <section className="container-page pt-10">
        <Link to="/services" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> {t("Alla tjänster", "All services")}
        </Link>
      </section>
      <section className="container-page grid gap-12 pb-16 pt-8 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="eyebrow">{s.seo[lang]}</p>
          <h1 className="mt-4 text-5xl md:text-7xl">{s.title[lang]}</h1>
          <p className="mt-8 text-xl text-muted-foreground">{s.intro[lang]}</p>
        </div>
        <aside className="md:col-span-5">
          <div className="sticky top-24 rounded-2xl border border-border bg-card p-8">
            <p className="eyebrow">{t("Pris", "Price")}</p>
            <p className="mt-1 font-display text-2xl">{t("Offert efter behov", "Tailored quote")}</p>
            <p className="mt-3 text-sm text-muted-foreground">{t("Inga fasta paket eller garantier. Du får ett förslag med omfattning och pris innan du bestämmer dig.", "No fixed packages or guarantees. You get a proposal with scope and price before you decide.")}</p>
            <Button asChild variant="lime" size="xl" className="mt-8 w-full">
              {isConsulting
                ? <Link to="/book">{t("Boka workshop eller föreläsning", "Book a workshop or talk")} <ArrowRight /></Link>
                : <Link to="/contact" search={{ service: s.slug }}>{t("Begär offert", "Request a quote")} <ArrowRight /></Link>}
            </Button>
          </div>
        </aside>
      </section>
      <section className="container-page grid gap-12 border-t border-border py-20 md:grid-cols-2">
        <div><h2 className="text-3xl">{t("För vem?", "Who is it for?")}</h2><p className="mt-4 text-muted-foreground">{s.forWho[lang]}</p></div>
        <div><h2 className="text-3xl">{t("Problem vi löser", "Problems we solve")}</h2><List items={s.problems[lang]} /></div>
        <div><h2 className="text-3xl">{t("Det här får du", "Deliverables")}</h2><List items={s.deliverables[lang]} /></div>
        <div><h2 className="text-3xl">{t("Exempel på uppdrag", "Example engagements")}</h2><List items={s.examples[lang]} /><p className="mt-3 text-xs text-muted-foreground">{t("Exempel på vad vi kan göra – inte kundreferenser.", "Examples of what we can do – not client references.")}</p></div>
      </section>
      <section className="container-page">
        <h2 className="text-3xl">{t("Process", "Process")}</h2>
        <ol className="mt-6 grid gap-4 md:grid-cols-4">
          {steps.map((x, i) => <li key={x} className="rounded-2xl border border-border p-5"><span className="font-display text-2xl text-muted-foreground">0{i + 1}</span><p className="mt-2 font-semibold">{x}</p></li>)}
        </ol>
      </section>
    </>
  );
}
