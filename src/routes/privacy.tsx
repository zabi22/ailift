import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Integritetspolicy — AiLift" },
      { name: "description", content: "Hur AiLift samlar in, använder och skyddar personuppgifter." },
      { property: "og:title", content: "Integritetspolicy — AiLift" },
      { property: "og:description", content: "Hur AiLift hanterar personuppgifter." },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  const { t } = useLang();
  const sections = [
    [t("Vilka uppgifter vi samlar in", "What data we collect"), t("När du skickar en bokningsförfrågan eller ett meddelande sparar vi de uppgifter du anger: namn, e-post, eventuellt telefonnummer och organisation, samt information om ditt önskemål.", "When you send a booking request or message we store the details you provide: name, email, optional phone number and organisation, and information about your request.")],
    [t("Varför", "Why"), t("Uppgifterna används enbart för att hantera din förfrågan, kontakta dig och genomföra en eventuell bokning. Vi säljer eller delar aldrig uppgifterna med tredje part i marknadsföringssyfte.", "The data is only used to handle your request, contact you and deliver any booking. We never sell or share your data with third parties for marketing.")],
    [t("Lagring och säkerhet", "Storage and security"), t("Uppgifterna lagras i en skyddad databas som endast administratören har åtkomst till.", "Data is stored in a protected database that only the administrator can access.")],
    [t("Hur länge", "How long"), t("Vi sparar uppgifterna så länge det behövs för att hantera förfrågan och eventuell uppföljning, därefter raderas de.", "We keep the data as long as needed to handle the request and any follow-up, after which it is deleted.")],
    [t("Dina rättigheter", "Your rights"), t("Du har rätt att begära utdrag, rättelse eller radering av dina uppgifter enligt GDPR. Kontakta oss via kontaktformuläret.", "You have the right to request access, correction or deletion of your data under GDPR. Contact us via the contact form.")],
  ];
  return (
    <>
      <PageHeader eyebrow={t("Integritet", "Privacy")} title={t("Integritetspolicy.", "Privacy policy.")} />
      <section className="container-page max-w-3xl space-y-10">
        {sections.map(([h, p]) => (
          <div key={h}>
            <h2 className="text-2xl">{h}</h2>
            <p className="mt-3 text-muted-foreground">{p}</p>
          </div>
        ))}
      </section>
    </>
  );
}
