import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/site/StatusBadge";
import { BrowserFrame, PhoneFrame, Reveal } from "@/components/site/AzureVisual";
import desktopShot from "@/assets/azure-desktop.jpg";
import servicesShot from "@/assets/azure-services.jpg";
import mobileShot from "@/assets/azure-mobile.jpg";

const LIVE = "https://azure-analytics.vercel.app/";
const TITLE = "Azure Analytics for Public Opinion — AiLift fallstudie";
const DESC = "Hur AiLift designade och byggde webbplatsen för Azure Analytics for Public Opinion, en oberoende afghanskledd forskningsorganisation.";

export const Route = createFileRoute("/projects/azure-analytics")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "CreativeWork", name: "Azure Analytics for Public Opinion", url: LIVE, dateCreated: "2026", creator: { "@type": "Organization", name: "AiLift" } }) }],
  }),
  component: AzureCase,
});

type T = (sv: string, en: string) => string;

const areas = (t: T) => [
  t("Datainsamling & analys", "Data Collection & Analysis"),
  t("Medie- & sociala medier-analys", "Media & Social Media Analysis"),
  t("Programutvärdering", "Program Evaluation"),
  t("Uppföljning & rapportering", "Monitoring & Reporting"),
  t("Policyanalys", "Policy Analysis"),
  t("Effektutvärdering", "Impact Assessment"),
  t("Kapacitetsuppbyggnad", "Capacity Building"),
];

const notes = (t: T) => [
  { h: t("Startsidan sätter tonen", "The homepage sets the tone"), p: t("En lugn bild över Kabul i blått ljus, en serif-rubrik och tre tydliga vägar vidare: insikter, publikationer och Azure Academy.", "A calm, blue-toned view over Kabul, a serif headline and three clear ways forward: insights, publications and Azure Academy.") },
  { h: t("Sju tjänster, en i taget", "Seven services, one at a time"), p: t("I stället för en vägg av kort bläddrar besökaren mellan områdena – med en egen liten illustration för varje.", "Instead of a wall of cards, visitors step through the areas one by one – each with its own small illustration.") },
  { h: t("Metoden som ett hjul", "The method as a wheel"), p: t("Sex steg – upptäck, designa, samla in, verifiera, analysera, kommunicera – går att klicka och styra med piltangenterna. Märkt som diagram, inte live-data.", "Six steps – discover, design, collect, verify, analyse, communicate – that can be clicked or driven with the arrow keys. Labelled as a diagram, not live data.") },
  { h: t("Kunskapsbank och akademi", "Knowledge hub and academy"), p: t("Forskning, insikter och nyheter med filter, plus en egen del för Azure Academy och utbildning av nya forskare.", "Research, insights and news with filters, plus a dedicated area for Azure Academy and training new researchers.") },
  { h: t("Innehåll de kan sköta själva", "Content they can run themselves"), p: t("Publikationer och nyheter läggs upp via ett eget gränssnitt, utan att någon behöver röra koden.", "Publications and news are added through their own interface, without anyone touching the code.") },
  { h: t("Fungerar i telefonen", "Works on the phone"), p: t("Allt är byggt för mobil först – meny, tjänster och metodhjul fungerar lika bra med tummen.", "Everything is built mobile-first – menu, services and the method wheel work just as well with a thumb.") },
];

function AzureCase() {
  const { t } = useLang();
  const delivered = [t("Webbdesign", "Website design"), t("Utveckling", "Development"), t("UI/UX", "UI/UX"), t("Illustrationer & rörelse", "Illustration & motion"), t("Mobilanpassning", "Responsive build"), t("Publiceringsverktyg", "Publishing tools")];

  return (
    <>
      <section className="container-page pt-10">
        <Link to="/work" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> {t("Alla projekt", "All projects")}
        </Link>
      </section>

      <section className="container-page grid gap-10 pb-14 pt-8 md:grid-cols-12">
        <div className="md:col-span-8">
          <div className="flex flex-wrap items-center gap-3">
            <p className="eyebrow">{t("Fallstudie · 2026", "Case study · 2026")}</p>
            <StatusBadge status="live" />
          </div>
          <h1 className="mt-4 text-5xl leading-[1.02] md:text-7xl">Azure Analytics <span className="italic text-muted-foreground">for Public Opinion</span></h1>
          <p className="mt-6 max-w-2xl text-xl">{t("Ett oberoende, afghanskett forskningsinstitut ville att deras arbete skulle kännas lika noggrant på webben som det är i fält. Det här är vad vi byggde.", "An independent, Afghan-led research organisation wanted their work to feel as careful online as it is in the field. This is what we built.")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="pill" size="lg"><a href={LIVE} target="_blank" rel="noopener noreferrer">{t("Öppna live-demo", "Open the live demo")} <ArrowUpRight /></a></Button>
          </div>
        </div>
        <dl className="space-y-5 border-l border-border pl-6 text-sm md:col-span-4 md:self-end">
          <div><dt className="eyebrow">{t("Kund", "Client")}</dt><dd className="mt-1">{t("Ideell forskningsorganisation", "Not-for-profit research organisation")}</dd></div>
          <div><dt className="eyebrow">{t("Område", "Field")}</dt><dd className="mt-1">{t("Opinion, forskning & uppföljning", "Public opinion, research & M&E")}</dd></div>
          <div><dt className="eyebrow">{t("Vår roll", "Our role")}</dt><dd className="mt-1">{t("Design och utveckling", "Design and development")}</dd></div>
        </dl>
      </section>

      <section className="container-page">
        <Reveal>
          <a href={LIVE} target="_blank" rel="noopener noreferrer" className="block transition-transform duration-500 hover:-translate-y-1">
            <BrowserFrame><img src={desktopShot} alt={t("Startsidan för Azure Analytics", "The Azure Analytics homepage")} width={1440} height={900} className="h-auto w-full" /></BrowserFrame>
          </a>
        </Reveal>
        <p className="mt-3 text-xs text-muted-foreground">{t("Skärmbild från den publicerade webbplatsen.", "Screenshot from the published website.")}</p>
      </section>

      <section className="container-page grid gap-10 py-24 md:grid-cols-12">
        <p className="eyebrow md:col-span-3">{t("Uppdraget", "The brief")}</p>
        <div className="space-y-5 text-lg md:col-span-8">
          <p>{t("Azure Analytics grundades av afghanska yrkespersoner med bakgrund från NGO:er, forskningsinstitut och internationella organisationer. De gör enkäter, intervjuer, utvärderingar och policyanalys – arbete som är svårt att förklara på en vanlig företagssida.", "Azure Analytics was founded by Afghan professionals with backgrounds in NGOs, research institutes and international organisations. They run surveys, interviews, evaluations and policy analysis – work that's hard to explain on a typical company site.")}</p>
          <p className="text-muted-foreground">{t("Sidan behövde kännas trovärdig för biståndsorganisationer och beslutsfattare, men ändå vara lätt att läsa för vem som helst. Och de behövde kunna publicera rapporter själva.", "The site had to feel credible to aid organisations and policymakers, yet stay easy for anyone to read. And they needed to publish reports on their own.")}</p>
        </div>
      </section>

      <section className="bg-ink py-20 text-ink-foreground">
        <div className="container-page grid items-center gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow text-ink-foreground/60">{t("Sju områden", "Seven areas")}</p>
            <h2 className="mt-3 text-4xl md:text-5xl">{t("En tydlig väg in i ett brett arbete.", "One clear way into a broad body of work.")}</h2>
            <ol className="mt-8 space-y-2 font-display text-lg">
              {areas(t).map((a, i) => <li key={a} className="flex gap-4 border-t border-ink-foreground/10 pt-2"><span className="w-6 text-lime">{i + 1}</span>{a}</li>)}
            </ol>
          </div>
          <Reveal className="md:col-span-7">
            <BrowserFrame><img src={servicesShot} alt={t("Tjänstesektionen på Azure Analytics", "The services section on Azure Analytics")} width={1440} height={900} loading="lazy" className="h-auto w-full" /></BrowserFrame>
          </Reveal>
        </div>
      </section>

      <section className="container-page py-24">
        <h2 className="max-w-2xl text-4xl md:text-5xl">{t("Det vi brydde oss mest om", "What we cared about most")}</h2>
        <ol className="mt-12 grid gap-x-16 md:grid-cols-2">
          {notes(t).map((n, i) => (
            <li key={n.h} className="border-t border-border py-8">
              <p className="font-display text-sm text-muted-foreground">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 text-2xl">{n.h}</h3>
              <p className="mt-2 text-muted-foreground">{n.p}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container-page grid items-end gap-10 pb-24 md:grid-cols-12">
        <Reveal className="mx-auto w-56 md:col-span-4 md:w-full md:max-w-[17rem]"><PhoneFrame><img src={mobileShot} alt={t("Azure Analytics i mobilen", "Azure Analytics on a phone")} width={585} height={1266} loading="lazy" className="h-auto w-full" /></PhoneFrame></Reveal>
        <div className="md:col-span-7 md:col-start-6">
          <p className="eyebrow">{t("Resultatet", "The result")}</p>
          <p className="mt-4 text-2xl leading-snug">{t("En webbplats som är live och som organisationen själv fyller med forskning, nyheter och kurser.", "A live website that the organisation fills with research, news and courses themselves.")}</p>
          <p className="mt-4 text-muted-foreground">{t("Vi publicerar inga besökssiffror eller effektmått – de är kundens att dela.", "We don't publish visitor numbers or impact figures – those are the client's to share.")}</p>
          <ul className="mt-8 flex flex-wrap gap-2">{delivered.map((d) => <li key={d} className="rounded-full border border-border px-3 py-1 text-sm">{d}</li>)}</ul>
        </div>
      </section>

      <section className="container-page pb-24">
        <div className="rounded-3xl bg-ink p-10 text-ink-foreground md:p-16">
          <h2 className="max-w-3xl text-4xl md:text-6xl">{t("Har ni också något komplext att förklara?", "Got something complex to explain too?")} <span className="text-lime">{t("Låt oss prata.", "Let's talk.")}</span></h2>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild variant="lime" size="xl"><Link to="/contact">{t("Starta ett projekt", "Start a project")} <ArrowUpRight /></Link></Button>
            <Button asChild variant="outline" size="xl" className="border-ink-foreground/30 bg-transparent text-ink-foreground hover:bg-ink-foreground/10"><a href={LIVE} target="_blank" rel="noopener noreferrer">{t("Se live-demo", "View live demo")}</a></Button>
          </div>
        </div>
      </section>
    </>
  );
}
