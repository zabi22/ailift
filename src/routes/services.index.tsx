import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { SERVICES } from "@/lib/services";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Tjänster — AI-automation, rådgivning, webb och mjukvara | AiLift" },
      { name: "description", content: "AI-automation och AI-agenter, AI-rådgivning och workshops, webbutveckling och skräddarsydd affärsmjukvara för små och medelstora företag." },
      { property: "og:title", content: "Tjänster — AiLift" },
      { property: "og:description", content: "AI-automation, AI-rådgivning, webbplatser och skräddarsydd mjukvara." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
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
        title={t("Det vi bygger och lär ut.", "What we build and teach.")}
        intro={t("Varje uppdrag börjar med ert problem. Pris och omfattning tas fram efter en första genomgång – inga fasta paket.", "Every engagement starts with your problem. Price and scope are agreed after a first review – no fixed packages.")}
      />
      <section className="container-page">
        <ul className="divide-y divide-border border-y border-border">
          {SERVICES.map((s, i) => (
            <li key={s.slug}>
              <Link to="/services/$slug" params={{ slug: s.slug }} className="group grid items-baseline gap-3 py-10 md:grid-cols-12">
                <span className="text-sm text-muted-foreground md:col-span-1">0{i + 1}</span>
                <span className="font-display text-3xl transition-transform group-hover:translate-x-1 md:col-span-5 md:text-4xl">{s.title[lang]}</span>
                <span className="text-muted-foreground md:col-span-5">{s.short[lang]}</span>
                <ArrowUpRight className="hidden justify-self-end md:col-span-1 md:block" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
