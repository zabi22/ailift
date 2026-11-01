import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, BarChart3, BookOpen, Database, Layers, LayoutGrid, Megaphone, MonitorSmartphone, Palette, Search, Sparkles, Users, Workflow, FileText, GraduationCap, Activity, Scale } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/site/StatusBadge";
import { AzureScreen, BrowserFrame, PhoneFrame, Reveal } from "@/components/site/AzureVisual";

const TITLE = "Azure Analytics for Public Opinion — AiLift fallstudie";
const DESC = "Hur AiLift designade och utvecklade en modern, responsiv forskningsplattform för Azure Analytics for Public Opinion.";

export const Route = createFileRoute("/projects/azure-analytics")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/projects/azure-analytics" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/projects/azure-analytics" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "CreativeWork", name: "Azure Analytics for Public Opinion", dateCreated: "2026", creator: { "@type": "Organization", name: "AiLift" } }) }],
  }),
  component: AzureCase,
});

type T = (sv: string, en: string) => string;
const features = (t: T) => [
  { icon: Palette, h: t("Modern visuell identitet", "Modern visual identity"), p: t("Ett professionellt designsystem byggt kring azurblått, förfinad typografi och luftiga redaktionella layouter.", "A professional design system built around Azure blue, refined typography and spacious editorial layouts.") },
  { icon: LayoutGrid, h: t("Interaktiv tjänsteutforskare", "Interactive service explorer"), p: t("Sju forskningsområden presenterade med egna illustrationer och interaktiv navigering.", "Seven research service areas presented through custom illustrations and interactive navigation.") },
  { icon: Sparkles, h: t("Animerade visuella upplevelser", "Animated visual experiences"), p: t("Egna SVG-grafiker och diskret rörelse som förklarar forsknings- och analysprocesser.", "Original SVG graphics and subtle motion explaining research and analytical processes.") },
  { icon: Workflow, h: t("Visualiserad forskningsprocess", "Research process visualisation"), p: t("En interaktiv presentation i sex steg som visar hur organisationen arbetar.", "An interactive six-stage presentation explaining how the organisation works.") },
  { icon: FileText, h: t("Innehållshantering", "Content management"), p: t("Ett administrativt gränssnitt för att organisera forskningspublikationer, nyheter och insikter.", "An administrative interface designed to organise research publications, news and insights.") },
  { icon: GraduationCap, h: "Azure Academy", p: t("Egna sektioner för forskarutbildning, utbildningsprogram och kapacitetsuppbyggnad.", "Dedicated sections for research training, educational programmes and capacity building.") },
  { icon: MonitorSmartphone, h: t("Responsiv utveckling", "Responsive development"), p: t("Layouter utformade för dator, surfplatta och mobil.", "Layouts designed for desktop, tablet and mobile devices.") },
  { icon: Layers, h: t("Tydlig informationsarkitektur", "Clear information architecture"), p: t("Strukturerade tjänstesidor, organisationsinformation, forskningsinnehåll och kontaktvägar.", "Structured service pages, organisational information, research content and contact pathways.") },
];
const services = (t: T) => [
  { icon: Database, l: t("Datainsamling & analys", "Data Collection & Analysis") },
  { icon: Megaphone, l: t("Medie- & sociala medier-analys", "Media & Social Media Analysis") },
  { icon: BarChart3, l: t("Programutvärdering", "Program Evaluation") },
  { icon: Scale, l: t("Policyanalys", "Policy Analysis") },
  { icon: Users, l: t("Intressentdialog", "Stakeholder Engagement") },
  { icon: Activity, l: t("Uppföljning & lärande", "Monitoring & Learning") },
  { icon: BookOpen, l: t("Utbildning & kapacitetsuppbyggnad", "Training & Capacity Building") },
];

function AzureCase() {
  const { t } = useLang();
  const delivered = [t("Webbdesign", "Website Design"), t("Webbutveckling", "Web Development"), t("UI/UX-design", "UI/UX Design"), t("Egna animationer", "Custom Animations"), t("Responsiv utveckling", "Responsive Development"), t("Innehållshantering", "Content Management")];

  return (
    <>
      <section className="container-page pt-10">
        <Link to="/work" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> {t("Alla projekt", "All projects")}
        </Link>
      </section>

      <section className="container-page pb-12 pt-8">
        <div className="fade-up flex flex-wrap items-center gap-3">
          <p className="eyebrow">{t("Fallstudie · 2026", "Case study · 2026")}</p>
          <StatusBadge status="delivered" />
        </div>
        <h1 className="fade-up mt-4 max-w-5xl text-5xl md:text-7xl">Azure Analytics for Public Opinion</h1>
        <p className="fade-up mt-6 max-w-3xl text-xl text-muted-foreground">{t("Komplex forskning omvandlad till en tydlig digital upplevelse.", "Turning complex research into a clear digital experience.")}</p>
        <dl className="fade-up mt-10 grid gap-6 border-t border-border pt-6 text-sm sm:grid-cols-3">
          <div><dt className="eyebrow">{t("Bransch", "Industry")}</dt><dd className="mt-2">{t("Forskning, opinion & dataanalys", "Research, public opinion & data analytics")}</dd></div>
          <div><dt className="eyebrow">{t("Kategori", "Category")}</dt><dd className="mt-2">{t("Webbdesign & utveckling, UI/UX, interaktiva upplevelser", "Website design & development, UI/UX, interactive experiences")}</dd></div>
          <div><dt className="eyebrow">{t("År", "Year")}</dt><dd className="mt-2">2026</dd></div>
        </dl>
      </section>

      <section className="bg-ink py-16 md:py-24">
        <div className="container-page">
          <Reveal className="relative mx-auto max-w-5xl">
            <BrowserFrame><AzureScreen /></BrowserFrame>
            <div className="absolute -bottom-10 right-4 hidden w-36 md:block lg:w-44"><PhoneFrame><AzureScreen variant="mobile" /></PhoneFrame></div>
          </Reveal>
          <p className="mx-auto mt-14 max-w-5xl text-xs text-ink-foreground/70">{t("Illustration av webbplatsens layout – inte en skärmbild.", "Illustration of the website layout – not a screenshot.")}</p>
        </div>
      </section>

      <section className="container-page grid gap-10 py-20 md:grid-cols-12">
        <Reveal className="md:col-span-4"><h2 className="text-3xl md:text-4xl">{t("Översikt", "Overview")}</h2></Reveal>
        <Reveal className="space-y-4 text-lg text-muted-foreground md:col-span-8" delay={100}>
          <p>{t("AiLift utvecklade en modern, professionell digital plattform för Azure Analytics for Public Opinion – en oberoende, afghanskledd ideell forskningsorganisation specialiserad på opinionsundersökningar, dataanalys, uppföljning, utvärdering och forskningskapacitet.", "AiLift developed a modern, professional digital platform for Azure Analytics for Public Opinion – an independent, Afghan-led, not-for-profit research organisation specialising in public opinion, data analysis, monitoring, evaluation and research capacity building.")}</p>
          <p>{t("Målet var en trovärdig och visuellt distinkt webbplats som gör komplexa forskningstjänster tillgängliga för organisationer, beslutsfattare, forskare och allmänheten.", "The goal was a credible, visually distinctive website that makes complex research services accessible to organisations, policymakers, researchers and the public.")}</p>
        </Reveal>
      </section>

      <section className="container-page grid gap-6 pb-20 md:grid-cols-2">
        <Reveal className="rounded-2xl border border-border bg-card p-8 md:p-10">
          <p className="eyebrow">{t("Utmaningen", "The challenge")}</p>
          <p className="mt-4 text-lg">{t("Azure Analytics behövde en digital närvaro som kunde kommunicera forskningsexpertis, presentera flera tjänster tydligt och stödja publicering av forskningsinnehåll.", "Azure Analytics needed a digital presence capable of communicating its research expertise, presenting multiple services clearly and supporting the publication of research content.")}</p>
          <p className="mt-4 text-muted-foreground">{t("Webbplatsen behövde förena institutionell trovärdighet med modern interaktionsdesign, intuitiv navigering och en enhetlig visuell identitet.", "The website needed to combine institutional credibility with modern interaction design, intuitive navigation and a consistent visual identity.")}</p>
        </Reveal>
        <Reveal className="rounded-2xl bg-azure p-8 text-ink-foreground md:p-10" delay={120}>
          <p className="eyebrow text-ink-foreground/80">{t("Vår lösning", "Our solution")}</p>
          <p className="mt-4 text-lg">{t("Vi designade och utvecklade en responsiv, forskningsfokuserad webbplats som kombinerar rena redaktionella layouter, egna illustrationer, genomtänkta animationer och strukturerat innehåll.", "We designed and developed a responsive, research-focused website combining clean editorial layouts, custom illustrations, thoughtful animations and structured content.")}</p>
        </Reveal>
      </section>

      <section className="border-y border-border bg-secondary/50 py-20">
        <div className="container-page">
          <Reveal><p className="eyebrow">{t("Tjänster som presenteras", "Services presented")}</p><h2 className="mt-3 max-w-2xl text-3xl md:text-5xl">{t("Sju forskningsområden, en tydlig väg in.", "Seven research areas, one clear way in.")}</h2></Reveal>
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services(t).map((s, i) => (
              <Reveal key={s.l} delay={i * 60}>
                <li className="group flex h-full flex-col gap-6 rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-azure hover:shadow-lg">
                  <div className="flex items-center justify-between">
                    <span className="grid size-11 place-items-center rounded-full bg-azure/10 text-azure transition-colors group-hover:bg-azure group-hover:text-ink-foreground"><s.icon className="size-5" aria-hidden /></span>
                    <span className="font-display text-sm text-muted-foreground">0{i + 1}</span>
                  </div>
                  <p className="font-semibold">{s.l}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-page py-20">
        <Reveal><p className="eyebrow">{t("Nyckelfunktioner", "Key features")}</p><h2 className="mt-3 max-w-2xl text-3xl md:text-5xl">{t("Byggt för trovärdighet och tydlighet.", "Built for credibility and clarity.")}</h2></Reveal>
        <div className="mt-12 grid gap-x-10 gap-y-2 md:grid-cols-2">
          {features(t).map((f, i) => (
            <Reveal key={f.h} delay={(i % 2) * 100}>
              <div className="flex gap-5 border-t border-border py-7">
                <f.icon className="mt-1 size-6 shrink-0 text-azure" aria-hidden />
                <div><h3 className="text-xl">{f.h}</h3><p className="mt-2 text-muted-foreground">{f.p}</p></div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-page grid items-center gap-10 pb-20 md:grid-cols-12">
        <Reveal className="md:col-span-7"><BrowserFrame><AzureScreen /></BrowserFrame></Reveal>
        <Reveal className="mx-auto w-48 md:col-span-2 md:w-full" delay={120}><PhoneFrame><AzureScreen variant="mobile" /></PhoneFrame></Reveal>
        <Reveal className="md:col-span-3" delay={200}>
          <Search className="size-6 text-azure" aria-hidden />
          <h2 className="mt-4 text-2xl">{t("Samma upplevelse på alla skärmar", "The same experience on every screen")}</h2>
          <p className="mt-3 text-muted-foreground">{t("Dator, surfplatta och mobil.", "Desktop, tablet and mobile.")}</p>
        </Reveal>
      </section>

      <section className="container-page grid gap-10 border-t border-border py-20 md:grid-cols-12">
        <Reveal className="md:col-span-4"><h2 className="text-3xl md:text-4xl">{t("Resultatet", "The outcome")}</h2></Reveal>
        <Reveal className="md:col-span-8" delay={100}>
          <p className="text-lg text-muted-foreground">{t("En distinkt digital plattform som stärker Azure Analytics närvaro online, förenklar tillgången till forskningstjänsterna och ger en skalbar grund för att publicera organisationens innehåll.", "A distinctive digital platform designed to strengthen Azure Analytics' online presence, simplify access to its research services and provide a scalable foundation for publishing organisational content.")}</p>
          <p className="eyebrow mt-10">{t("Levererat av AiLift", "Delivered by AiLift")}</p>
          <ul className="mt-4 flex flex-wrap gap-2">{delivered.map((d) => <li key={d} className="rounded-full border border-border px-3 py-1 text-sm">{d}</li>)}</ul>
        </Reveal>
      </section>

      <section className="container-page pb-24">
        <Reveal className="rounded-3xl bg-ink p-10 text-ink-foreground md:p-16">
          <h2 className="max-w-3xl text-4xl md:text-6xl">{t("Behöver du en digital upplevelse som den här?", "Need a digital experience like this?")} <span className="text-lime">{t("Låt oss bygga något exceptionellt.", "Let's build something exceptional.")}</span></h2>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild variant="lime" size="xl"><Link to="/contact">{t("Starta ett projekt", "Start a project")} <ArrowUpRight /></Link></Button>
            <Button asChild variant="outline" size="xl" className="border-ink-foreground/30 bg-transparent text-ink-foreground hover:bg-ink-foreground/10"><Link to="/work">{t("Fler projekt", "More work")}</Link></Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
