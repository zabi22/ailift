import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Integritetspolicy — AiLift" },
      { name: "description", content: "AiLifts webbplats sparar inga personuppgifter. Så hanteras information när du kontaktar oss via e-post." },
      { property: "og:title", content: "Integritetspolicy — AiLift" },
      { property: "og:description", content: "Webbplatsen sparar inga personuppgifter." },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  const { t } = useLang();
  const sections = [
    [t("Webbplatsen sparar inga uppgifter", "The website stores no data"), t("Formulären för bokning och kontakt skickar ingenting och sparar ingenting. De skapar bara ett e-postutkast i ditt eget e-postprogram. Det finns inga användarkonton, ingen databas för kunduppgifter, inga analysverktyg och inga spårningscookies.", "The booking and contact forms send nothing and store nothing. They only create an email draft in your own email app. There are no user accounts, no customer database, no analytics tools and no tracking cookies.")],
    [t("Det enda som sparas i din webbläsare", "The only thing stored in your browser"), t("Ditt språkval (svenska eller engelska) sparas lokalt i din webbläsare så att sidan minns det. Det innehåller inga personuppgifter.", "Your language choice (Swedish or English) is saved locally in your browser so the site remembers it. It contains no personal data.")],
    [t("När du skickar e-post", "When you send an email"), t("Om du väljer att skicka e-postutkastet hanteras meddelandet av din egen e-posttjänst och av AiLifts e-postleverantör, enligt deras villkor. AiLift använder uppgifterna endast för att svara dig och hantera din förfrågan, och raderar dem när de inte längre behövs.", "If you choose to send the email draft, the message is handled by your own email provider and AiLift's email provider, under their terms. AiLift only uses the information to reply to you and handle your request, and deletes it when no longer needed.")],
    [t("Webbhotell", "Hosting"), t("Som alla webbplatser behandlar vår hostingleverantör tekniska uppgifter som IP-adress och webbläsartyp för att kunna leverera sidorna och skydda mot missbruk. Typsnitt hämtas från Google Fonts, vilket innebär att din IP-adress skickas till Google när sidan laddas.", "Like any website, our hosting provider processes technical data such as IP address and browser type to deliver pages and protect against abuse. Fonts are loaded from Google Fonts, which means your IP address is sent to Google when the page loads.")],
    [t("Dina rättigheter", "Your rights"), t("Enligt GDPR har du rätt att begära utdrag, rättelse eller radering av uppgifter du skickat till oss via e-post. Hör av dig till samma adress.", "Under GDPR you have the right to request access, correction or deletion of information you sent us by email. Contact the same address.")],
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
