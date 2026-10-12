import { useState } from "react";
import { Copy, Mail, Send } from "lucide-react";
import { sendRequest } from "@/lib/send-request.functions";
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
  const [sendState, setSendState] = useState<"" | "sending" | "sent" | "failed">("");

  async function onSend() {
    if (!validate()) return;
    setSendState("sending");
    const message = getMessage();
    const replyTo = message.match(/[^\s@:]+@[^\s@]+\.[^\s@]+/g)?.find((m) => m !== email) ?? undefined;
    try {
      const r = await sendRequest({ data: { subject, message, replyTo } });
      setSendState(r.ok ? "sent" : "failed");
    } catch {
      setSendState("failed");
    }
  }

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
        <Button type="button" variant="ghost" size="xl" onClick={onCopy}>
          {copyLabel} <Copy />
        </Button>
        <Button type="button" variant="lime" size="xl" onClick={onSend} disabled={sendState === "sending" || sendState === "sent"}>
          {sendState === "sending" ? t("Skickar…", "Sending…") : t("Skicka till AiLift", "Send to AiLift")} <Send />
        </Button>
        {email && (
          <Button asChild variant="pillOutline" size="xl">
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
        {sendState === "sent" && (
          <p className="rounded-lg border border-border bg-card p-4 text-sm">
            {t("Skickat till AiLift. Du får svar via e-post. Bokningen är inte bekräftad förrän AiLift har svarat.", "Sent to AiLift. You'll get a reply by email. The booking isn't confirmed until AiLift replies.")}
          </p>
        )}
        {sendState === "failed" && (
          <p className="rounded-lg bg-muted p-4 text-sm">
            {t("Det gick inte att skicka just nu. Använd e-postutkastet eller kopiera meddelandet istället.", "Couldn't send right now. Please use the email draft or copy the message instead.")}
          </p>
        )}
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
