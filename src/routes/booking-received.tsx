import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { Clock } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/booking-received")({
  validateSearch: z.object({ ref: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "Förfrågan mottagen — AiLift" },
      { name: "description", content: "Din bokningsförfrågan är mottagen och väntar på bekräftelse." },
      { property: "og:title", content: "Förfrågan mottagen — AiLift" },
      { property: "og:description", content: "Din bokningsförfrågan väntar på bekräftelse." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Received,
});

function Received() {
  const { ref } = Route.useSearch();
  const { t } = useLang();
  return (
    <section className="container-page max-w-2xl py-24 text-center">
      <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-accent"><Clock /></div>
      <p className="eyebrow mt-8">{t("Status: väntar på bekräftelse", "Status: pending confirmation")}</p>
      <h1 className="mt-4 text-5xl md:text-6xl">{t("Tack — din förfrågan är mottagen.", "Thank you — your request has been received.")}</h1>
      <p className="mt-6 text-lg text-muted-foreground">
        {t("Det här är ännu inte en bekräftad bokning. Zabihullah går igenom förfrågan och kontaktar dig för att stämma av detaljerna innan bokningen bekräftas.", "This is not yet a confirmed booking. Zabihullah will review your request and contact you to agree on the details before the booking is confirmed.")}
      </p>
      {ref && (
        <div className="mx-auto mt-10 inline-block rounded-2xl border border-border bg-card px-8 py-5">
          <p className="eyebrow">{t("Referensnummer", "Reference number")}</p>
          <p className="mt-1 font-display text-3xl tracking-wide">{ref}</p>
          <p className="mt-2 text-xs text-muted-foreground">{t("Spara numret om du vill höra av dig om förfrågan.", "Save this number if you want to follow up on your request.")}</p>
        </div>
      )}
      <div className="mt-10">
        <Button asChild variant="pillOutline" size="xl"><Link to="/">{t("Till startsidan", "Back to home")}</Link></Button>
      </div>
    </section>
  );
}
