import { createFileRoute, Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { PageHeader } from "@/components/site/PageHeader";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Vanliga frågor — AiLift" },
      { name: "description", content: "Svar på vanliga frågor om AiLifts workshops, bokningar, priser och upplägg." },
      { property: "og:title", content: "Vanliga frågor — AiLift" },
      { property: "og:description", content: "Svar på vanliga frågor om bokningar, priser och upplägg." },
    ],
  }),
  component: Faq,
});

function Faq() {
  const { t } = useLang();
  const items = [
    [t("Behöver deltagarna några förkunskaper?", "Do participants need any prior knowledge?"), t("Nej. Alla upplägg anpassas efter gruppens nivå — från helt nybörjare till de som redan använder AI dagligen.", "No. Every format is adapted to the group's level — from complete beginners to daily AI users.")],
    [t("Vad kostar det?", "What does it cost?"), t("Priset beror på upplägg, längd och antal deltagare. Skicka en förfrågan så får du en offert efter en kort avstämning.", "Price depends on format, length and number of participants. Send a request and you'll receive a quote after a short conversation.")],
    [t("Är min bokning bekräftad när jag skickat förfrågan?", "Is my booking confirmed when I send the request?"), t("Nej. En förfrågan är inte en bekräftad bokning. Zabihullah går igenom den, kontaktar dig och bekräftar när detaljerna är överenskomna.", "No. A request is not a confirmed booking. Zabihullah reviews it, contacts you and confirms once the details are agreed.")],
    [t("Håller ni workshops online?", "Do you run workshops online?"), t("Ja, de flesta tjänster kan genomföras både på plats och online.", "Yes, most services can be delivered both on site and online.")],
    [t("På vilka språk?", "In which languages?"), t("Svenska och engelska.", "Swedish and English.")],
    [t("Vilka AI-verktyg använder ni?", "Which AI tools do you use?"), t("Vi utgår från de verktyg ni har tillgång till och som passar er verksamhet, till exempel vanliga AI-assistenter.", "We start from the tools you have access to and that suit your organisation, such as common AI assistants.")],
    [t("Hur hanteras mina uppgifter?", "How is my data handled?"), t("Uppgifterna används endast för att hantera din förfrågan. Läs mer i vår integritetspolicy.", "Your data is only used to handle your request. Read more in our privacy policy.")],
  ];
  return (
    <>
      <PageHeader eyebrow="FAQ" title={t("Vanliga frågor.", "Frequently asked questions.")} />
      <section className="container-page max-w-3xl">
        <Accordion type="single" collapsible className="border-t border-border">
          {items.map(([q, a], i) => (
            <AccordionItem key={i} value={`q${i}`}>
              <AccordionTrigger className="py-6 text-left font-display text-xl hover:no-underline">{q}</AccordionTrigger>
              <AccordionContent className="pb-6 text-base text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <p className="mt-10 text-muted-foreground">
          {t("Hittar du inte svaret? ", "Can't find the answer? ")}
          <Link to="/contact" className="font-semibold text-foreground underline underline-offset-4">{t("Kontakta oss", "Contact us")}</Link>
        </p>
      </section>
    </>
  );
}
