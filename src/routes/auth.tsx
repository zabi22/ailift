import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { supabase } from "@/integrations/supabase/client";
import { Field } from "@/components/site/Field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Logga in — AiLift" },
      { name: "description", content: "Inloggning för AiLifts administratör." },
      { property: "og:title", content: "Logga in — AiLift" },
      { property: "og:description", content: "Inloggning för administratör." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Auth,
});

function Auth() {
  const { t } = useLang();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setMsg("");
    if (password.length < 8) return setErr(t("Lösenordet måste ha minst 8 tecken.", "Password must be at least 8 characters."));
    setBusy(true);
    if (mode === "in") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setBusy(false);
      if (error) return setErr(t("Fel e-post eller lösenord, eller så är e-postadressen inte bekräftad.", "Wrong email or password, or the email is not confirmed yet."));
      navigate({ to: "/admin" });
    } else {
      const { data, error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/admin` } });
      setBusy(false);
      if (error) return setErr(error.message);
      if (data.session) navigate({ to: "/admin" });
      else setMsg(t("Kontot är skapat. Bekräfta din e-postadress via länken vi skickade och logga sedan in.", "Account created. Confirm your email via the link we sent, then sign in."));
    }
  }

  return (
    <section className="container-page max-w-md py-24">
      <p className="eyebrow">{t("Administration", "Administration")}</p>
      <h1 className="mt-4 text-5xl">{mode === "in" ? t("Logga in", "Sign in") : t("Skapa konto", "Create account")}</h1>
      <form onSubmit={submit} className="mt-10 space-y-5">
        <Field id="email" label={t("E-post", "Email")}><Input id="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></Field>
        <Field id="password" label={t("Lösenord", "Password")}><Input id="password" type="password" autoComplete={mode === "in" ? "current-password" : "new-password"} required value={password} onChange={(e) => setPassword(e.target.value)} /></Field>
        {err && <p className="text-sm text-destructive" role="alert">{err}</p>}
        {msg && <p className="text-sm" role="status">{msg}</p>}
        <Button type="submit" variant="pill" size="xl" className="w-full" disabled={busy}>{mode === "in" ? t("Logga in", "Sign in") : t("Skapa konto", "Create account")}</Button>
      </form>
      <button className="mt-6 text-sm text-muted-foreground underline" onClick={() => setMode(mode === "in" ? "up" : "in")}>
        {mode === "in" ? t("Första gången? Skapa ägarkonto", "First time? Create owner account") : t("Har du redan ett konto? Logga in", "Already have an account? Sign in")}
      </button>
    </section>
  );
}
