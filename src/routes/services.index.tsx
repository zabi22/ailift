import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { SERVICES } from "@/lib/services";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Tjänster — AiLift" },
      { name: "description", content: "AI-workshops för företag, föreläsningar, implementeringsworkshops, AI för skolor, personlig coachning och skräddarsydda upplägg." },
      { property: "og:title", content: "Tjänster — AiLift" },
      { property: "og:description", content: "Workshops, föreläsningar och coachning som gör AI användbart i verkligheten." },
    ],
  }),
  component: Services,
});

function Services() {
  const { lang, t } = useLang();
  return (
    <>
      <PageHeader
        eyebrow={t("Tjänster", "Services")}
        title={t("Välj det upplägg som passar er.", "Choose the format that fits you.")}
        intro={t("Alla tjänster anpassas efter er grupp och era mål. Pris och upplägg tas fram efter en kort avstämning.", "Every service is adapted to your group and goals. Price and format are agreed after a short conversation.")}
      />
      <section className="container-page grid gap-6 md:grid-cols-2">
        {SERVICES.map((s, i) => (
          <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className={`group overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-xl ${i % 3 === 0 ? "md:col-span-2 md:grid md:grid-cols-2" : ""}`}>
            <img src={s.image} alt="" loading="lazy" className={`w-full object-cover ${i % 3 === 0 ? "aspect-[4/3] md:h-full" : "aspect-[16/9]"}`} />
            <div className="flex flex-col p-8">
              <p className="eyebrow">{s.formats[lang]}</p>
              <h2 className="mt-3 text-3xl">{s.title[lang]}</h2>
              <p className="mt-3 flex-1 text-muted-foreground">{s.short[lang]}</p>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold">
                {t("Läs mer", "Learn more")} <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
