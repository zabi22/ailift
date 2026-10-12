import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Building2, GraduationCap, User } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { SERVICES } from "@/lib/services";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-workshop.jpg";
import coachingImg from "@/assets/coaching.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AiLift — Gör AI användbart i verkligheten" },
      { name: "description", content: "Praktiska AI-workshops, föreläsningar och personlig coachning för företag, skolor och privatpersoner. Grundat av Zabihullah Ahmadzai." },
      { property: "og:title", content: "AiLift — Gör AI användbart i verkligheten" },
      { property: "og:description", content: "Praktiska AI-workshops, föreläsningar och personlig coachning för företag, skolor och privatpersoner." },
    ],
  }),
  component: Home,
});

function Home() {
  const { lang, t } = useLang();

  const audiences = [
    { icon: Building2, title: t("Företag och team", "Companies and teams"), text: t("Få hela teamet att använda AI tryggt och effektivt i det dagliga arbetet.", "Get the whole team using AI safely and effectively in daily work."), slug: "company-workshops" },
    { icon: GraduationCap, title: t("Skolor och organisationer", "Schools and organisations"), text: t("Pedagogiska workshops för lärare, elever, föreningar och ideella organisationer.", "Educational workshops for teachers, students, clubs and non-profits."), slug: "schools" },
    { icon: User, title: t("Privatpersoner", "Individuals"), text: t("Personlig coachning i din egen takt — i jobbet, studierna eller vardagen.", "Personal coaching at your own pace — at work, in studies or everyday life."), slug: "coaching" },
  ];

  const outcomes = [
    t("Förstå vad AI faktiskt kan — och var gränserna går", "Understand what AI can actually do — and where the limits are"),
    t("Spara tid på återkommande uppgifter", "Save time on recurring tasks"),
    t("Använda AI ansvarsfullt och säkert", "Use AI responsibly and securely"),
    t("Bygga egna arbetssätt som håller över tid", "Build your own ways of working that last"),
  ];

  const steps = [
    { n: "01", title: t("Berätta vad ni vill uppnå", "Tell us what you want to achieve"), text: t("Välj en tjänst och beskriv era mål och önskade datum.", "Pick a service and describe your goals and preferred dates.") },
    { n: "02", title: t("Skicka ett e-postmeddelande", "Send an email"), text: t("Formuläret skapar ett färdigt e-postutkast som du granskar och skickar själv.", "The form creates a ready-made email draft that you review and send yourself.") },
    { n: "03", title: t("Vi stämmer av och bekräftar", "We agree on details and confirm"), text: t("Zabihullah kontaktar dig, går igenom upplägget och bekräftar bokningen.", "Zabihullah contacts you, goes through the details and confirms the booking.") },
  ];

  return (
    <>
      {/* Hero */}
      <section className="container-page grid items-center gap-12 pb-20 pt-12 md:grid-cols-12 md:pt-20">
        <div className="md:col-span-6">
          <p className="eyebrow fade-up">{t("AI-workshops · Föreläsningar · Coachning", "AI workshops · Talks · Coaching")}</p>
          <h1 className="fade-up mt-6 text-6xl md:text-8xl">
            {lang === "sv" ? (
              <>Gör AI <span className="lime-mark italic">användbart</span> i verkligheten.</>
            ) : (
              <>Make AI <span className="lime-mark italic">useful</span> in real life.</>
            )}
          </h1>
          <p className="fade-up mt-8 max-w-lg text-lg text-muted-foreground">
            {t("Praktisk AI-utbildning, workshops och vägledning som hjälper människor att förstå AI och använda det effektivt i arbete, utbildning och vardag.", "Practical AI education, workshops and guidance that help people understand AI and use it effectively in work, education and everyday life.")}
          </p>
          <div className="fade-up mt-10 flex flex-wrap gap-3">
            <Button asChild variant="lime" size="xl">
              <Link to="/book">{t("Skicka bokningsförfrågan", "Request a booking")} <ArrowRight /></Link>
            </Button>
            <Button asChild variant="pillOutline" size="xl">
              <Link to="/services">{t("Se tjänsterna", "View services")}</Link>
            </Button>
          </div>
        </div>
        <div className="md:col-span-6">
          <div className="relative">
            <img src={heroImg} alt={t("Workshop där en grupp diskuterar AI runt ett bord", "Workshop where a group discusses AI around a table")} width={1600} height={1104} className="aspect-[4/3] w-full rounded-2xl object-cover" />
            <div className="absolute -bottom-6 left-6 rounded-xl bg-lime px-5 py-4 text-lime-foreground shadow-lg">
              <p className="text-xs font-semibold uppercase tracking-widest">{t("Svenska & engelska", "Swedish & English")}</p>
              <p className="font-display text-xl">{t("På plats eller online", "On site or online")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Audiences */}
      <section className="border-y border-border bg-secondary/60 py-20">
        <div className="container-page">
          <p className="eyebrow">{t("Vem är du?", "Who are you?")}</p>
          <h2 className="mt-4 max-w-2xl text-4xl md:text-5xl">{t("AI-kunskap anpassad efter var du står.", "AI knowledge tailored to where you are.")}</h2>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
            {audiences.map((a) => (
              <Link key={a.title} to="/services/$slug" params={{ slug: a.slug }} className="group flex flex-col bg-background p-8 transition-colors hover:bg-card">
                <a.icon className="size-6" strokeWidth={1.5} />
                <h3 className="mt-8 text-2xl">{a.title}</h3>
                <p className="mt-3 flex-1 text-muted-foreground">{a.text}</p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold">
                  {t("Läs mer", "Learn more")} <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services list */}
      <section className="container-page py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">{t("Tjänster", "Services")}</p>
            <h2 className="mt-4 text-4xl md:text-5xl">{t("Sex sätt att komma igång.", "Six ways to get started.")}</h2>
          </div>
          <Link to="/services" className="text-sm font-semibold underline underline-offset-4">{t("Alla tjänster", "All services")}</Link>
        </div>
        <ul className="mt-12 divide-y divide-border border-y border-border">
          {SERVICES.map((s, i) => (
            <li key={s.slug}>
              <Link to="/services/$slug" params={{ slug: s.slug }} className="group grid items-baseline gap-2 py-7 md:grid-cols-12">
                <span className="text-sm text-muted-foreground md:col-span-1">0{i + 1}</span>
                <span className="font-display text-2xl transition-transform group-hover:translate-x-1 md:col-span-5 md:text-3xl">{s.title[lang]}</span>
                <span className="text-muted-foreground md:col-span-5">{s.short[lang]}</span>
                <ArrowUpRight className="hidden justify-self-end md:col-span-1 md:block" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Outcomes */}
      <section className="bg-ink py-24 text-ink-foreground">
        <div className="container-page grid gap-12 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest opacity-60">{t("Vad du får", "What you get")}</p>
            <h2 className="mt-4 text-4xl md:text-5xl">{t("Mindre hype. Mer nytta.", "Less hype. More value.")}</h2>
            <p className="mt-6 max-w-md opacity-70">{t("Fokus ligger på det som fungerar i praktiken — med era egna uppgifter, i er egen vardag.", "The focus is on what works in practice — with your own tasks, in your own reality.")}</p>
          </div>
          <ul className="space-y-6">
            {outcomes.map((o) => (
              <li key={o} className="flex gap-4 border-b border-ink-foreground/10 pb-6 text-lg">
                <span className="mt-2 size-2 shrink-0 rounded-full bg-lime" aria-hidden />
                {o}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section className="container-page py-24">
        <p className="eyebrow">{t("Så går det till", "How it works")}</p>
        <h2 className="mt-4 text-4xl md:text-5xl">{t("Tre enkla steg.", "Three simple steps.")}</h2>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="border-t-2 border-foreground pt-6">
              <p className="font-display text-5xl text-muted-foreground">{s.n}</p>
              <h3 className="mt-4 text-2xl">{s.title}</h3>
              <p className="mt-3 text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Founder */}
      <section className="container-page grid items-center gap-12 py-12 md:grid-cols-2">
        <img src={coachingImg} alt={t("Personlig AI-vägledning vid en laptop", "Personal AI guidance at a laptop")} loading="lazy" width={1408} height={1008} className="aspect-[4/3] w-full rounded-2xl object-cover" />
        <div>
          <p className="eyebrow">{t("Grundare", "Founder")}</p>
          <h2 className="mt-4 text-4xl md:text-5xl">Zabihullah Ahmadzai</h2>
          <p className="mt-6 text-lg text-muted-foreground">
            {t("AiLift startades med en enkel idé: AI ska vara begripligt och användbart för alla — inte bara för tekniker. Genom workshops, föreläsningar och personlig vägledning hjälper Zabihullah människor och organisationer att ta de första stegen och bygga verkliga arbetssätt.", "AiLift started with a simple idea: AI should be understandable and useful for everyone — not just technologists. Through workshops, talks and personal guidance, Zabihullah helps people and organisations take the first steps and build real ways of working.")}
          </p>
          <Button asChild variant="pillOutline" size="xl" className="mt-8">
            <Link to="/about">{t("Mer om AiLift", "More about AiLift")}</Link>
          </Button>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page pt-24">
        <div className="rounded-3xl bg-lime px-8 py-16 text-lime-foreground md:px-16">
          <h2 className="max-w-3xl text-4xl md:text-6xl">{t("Redo att göra AI användbart för er?", "Ready to make AI useful for you?")}</h2>
          <p className="mt-6 max-w-xl text-lg">{t("Skicka en bokningsförfrågan — det är kostnadsfritt och helt utan förpliktelser.", "Send a booking request — it's free and without obligation.")}</p>
          <Button asChild variant="pill" size="xl" className="mt-8">
            <Link to="/book">{t("Skicka förfrågan", "Send request")} <ArrowRight /></Link>
          </Button>
        </div>
      </section>
    </>
  );
}
