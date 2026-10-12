import { createFileRoute, Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { PageHeader } from "@/components/site/PageHeader";
import { Button } from "@/components/ui/button";
import portraitImg from "@/assets/zabi-portrait.jpg.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Om AiLift — Zabihullah Ahmadzai" },
      { name: "description", content: "AiLift grundades av Zabihullah Ahmadzai för att göra AI begripligt och användbart för alla." },
      { property: "og:title", content: "Om AiLift — Zabihullah Ahmadzai" },
      { property: "og:description", content: "Varför AiLift finns och hur vi arbetar." },
    ],
  }),
  component: About,
});

function About() {
  const { t } = useLang();
  const values = [
    { title: t("Praktiskt", "Practical"), text: t("Vi arbetar med verkliga uppgifter, inte abstrakta exempel.", "We work with real tasks, not abstract examples.") },
    { title: t("Ärligt", "Honest"), text: t("Vi är tydliga med vad AI kan — och vad det inte kan.", "We are clear about what AI can — and cannot — do.") },
    { title: t("Ansvarsfullt", "Responsible"), text: t("Säkerhet, integritet och etik är en del av allt vi lär ut.", "Security, privacy and ethics are part of everything we teach.") },
    { title: t("Tillgängligt", "Approachable"), text: t("Inga förkunskaper krävs. Alla ska kunna hänga med.", "No prior knowledge needed. Everyone should be able to follow.") },
  ];
  return (
    <>
      <PageHeader
        eyebrow={t("Om AiLift", "About AiLift")}
        title={t("AI ska vara till för alla.", "AI should be for everyone.")}
        intro={t("AiLift är ett ungt företag med ett tydligt fokus: att hjälpa människor och organisationer att förstå AI och använda det på riktigt.", "AiLift is a young company with a clear focus: helping people and organisations understand AI and use it for real.")}
      />
      <section className="container-page grid gap-12 md:grid-cols-2">
        <img src={portraitImg.url} alt={t("Zabihullah Ahmadzai, grundare av AiLift", "Zabihullah Ahmadzai, founder of AiLift")} loading="lazy" width={403} height={504} className="aspect-[4/5] w-full rounded-2xl object-cover" />
        <div className="space-y-6 text-lg text-muted-foreground">
          <h2 className="text-4xl text-foreground">Zabihullah Ahmadzai</h2>
          <p>{t("Jag startade AiLift för att jag ser hur stort avståndet är mellan vad AI kan göra och hur de flesta faktiskt använder det. Många är nyfikna men osäkra på var de ska börja.", "I started AiLift because I see how big the gap is between what AI can do and how most people actually use it. Many are curious but unsure where to start.")}</p>
          <p>{t("Mitt mål är att göra AI konkret: att visa hur det kan spara tid, förbättra kvalitet och ge nya möjligheter — samtidigt som vi pratar ärligt om risker och begränsningar.", "My goal is to make AI concrete: to show how it can save time, improve quality and open new possibilities — while talking honestly about risks and limitations.")}</p>
          <p>{t("Jag arbetar med företag, skolor, organisationer och privatpersoner, på svenska och engelska.", "I work with companies, schools, organisations and individuals, in Swedish and English.")}</p>
        </div>
      </section>
      <section className="container-page py-24">
        <h2 className="text-4xl md:text-5xl">{t("Så arbetar vi", "How we work")}</h2>
        <div className="mt-12 grid gap-10 md:grid-cols-4">
          {values.map((v) => (
            <div key={v.title} className="border-t-2 border-foreground pt-6">
              <h3 className="text-2xl">{v.title}</h3>
              <p className="mt-3 text-muted-foreground">{v.text}</p>
            </div>
          ))}
        </div>
        <Button asChild variant="lime" size="xl" className="mt-16">
          <Link to="/book">{t("Skicka en förfrågan", "Send a request")}</Link>
        </Button>
      </section>
    </>
  );
}
