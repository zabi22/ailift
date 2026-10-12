import { useState } from "react";
import { Copy, Mail } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { buildMailto, copyText, resolveContactEmail } from "@/lib/contact";
import { Button } from "@/components/ui/button";

/**
 * Copy / email-draft actions. `validate` runs first; `getMessage` builds the text.
 * Never claims anything was sent — copying and opening a draft both leave sending to the visitor.
 */
export function SendActions({
  kind,
  subject,
  getMessage,
  validate,
  onClear,
}: {
  kind: "booking" | "contact";
  subject: string;
  getMessage: () => string;
  validate: () => boolean;
  onClear: () => void;
}) {
  const { t } = useLang();
  const email = resolveContactEmail();
  const [status, setStatus] = useState<"" | "copied" | "copyFailed">("");
  const [fallbackText, setFallbackText] = useState("");

  async function onCopy() {
    if (!validate()) return;
    const text = getMessage();
    const ok = await copyText(text);
    setStatus(ok ? "copied" : "copyFailed");
    setFallbackText(ok ? "" : text);
  }

  const copyLabel = kind === "booking" ? t("Kopiera bokningsförfrågan", "Copy booking request") : t("Kopiera meddelande", "Copy contact message");

  return (
    <div className="space-y-4">
      {!email && (
        <p className="rounded-lg bg-muted p-4 text-sm" role="note">
          {t(
            "AiLift har ännu ingen publicerad e-postadress här. Kopiera meddelandet och skicka det själv via en kontaktkanal som AiLift har gett dig. Att kopiera skickar inte in någon förfrågan.",
            "AiLift hasn't published an email address here yet. Copy the message and send it yourself through a contact channel AiLift has given you. Copying does not submit a request.",
          )}
        </p>
      )}
      <div className="flex flex-wrap justify-end gap-3">
        <Button type="button" variant="ghost" onClick={() => { onClear(); setStatus(""); setFallbackText(""); }}>
          {t("Rensa formuläret", "Clear form")}
        </Button>
        <Button type="button" variant={email ? "pillOutline" : "lime"} size="xl" onClick={onCopy}>
          {copyLabel} <Copy />
        </Button>
        {email && (
          <Button asChild variant="lime" size="xl">
            <a href={buildMailto(email, subject, getMessage())} onClick={(e) => { if (!validate()) e.preventDefault(); }}>
              {t("Öppna e-postutkast", "Open email draft")} <Mail />
            </a>
          </Button>
        )}
      </div>
      {email && (
        <p className="text-right text-xs text-muted-foreground">
          {t("Utkastet öppnas i ditt e-postprogram. Inget skickas förrän du själv trycker på skicka.", "The draft opens in your email app. Nothing is sent until you press send yourself.")}
        </p>
      )}
      <div aria-live="polite">
        {status === "copied" && (
          <p className="rounded-lg border border-border bg-card p-4 text-sm">
            {t("Kopierat till urklipp. Observera: inget har skickats ännu — klistra in och skicka meddelandet själv.", "Copied to clipboard. Note: nothing has been sent yet — paste and send the message yourself.")}
          </p>
        )}
        {status === "copyFailed" && (
          <div className="space-y-2 text-sm">
            <p>{t("Webbläsaren tillät inte kopiering. Markera och kopiera texten nedan:", "Your browser blocked copying. Select and copy the text below:")}</p>
            <textarea readOnly value={fallbackText} rows={8} className="w-full rounded-md border border-input bg-background p-3" />
          </div>
        )}
      </div>
    </div>
  );
}
