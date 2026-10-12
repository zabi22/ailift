import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { LogOut, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SERVICES } from "@/lib/services";
import { useLang } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin — AiLift" },
      { name: "description", content: "AiLifts administrationspanel." },
      { property: "og:title", content: "Admin — AiLift" },
      { property: "og:description", content: "Administrationspanel." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Admin,
});

const STATUSES = ["pending", "confirmed", "declined", "cancelled", "completed"] as const;
const STATUS_LABEL: Record<string, [string, string]> = {
  pending: ["Väntar", "Pending"],
  confirmed: ["Bekräftad", "Confirmed"],
  declined: ["Avböjd", "Declined"],
  cancelled: ["Avbokad", "Cancelled"],
  completed: ["Genomförd", "Completed"],
};
const WEEKDAYS: [string, string][] = [["Sön", "Sun"], ["Mån", "Mon"], ["Tis", "Tue"], ["Ons", "Wed"], ["Tor", "Thu"], ["Fre", "Fri"], ["Lör", "Sat"]];

function Admin() {
  const { user } = Route.useRouteContext();
  const { t } = useLang();
  const qc = useQueryClient();
  const navigate = useNavigate();

  const role = useQuery({
    queryKey: ["admin-role", user.id],
    queryFn: async () => {
      const { data: isAdmin } = await supabase.rpc("has_role", { _user_id: user.id, _role: "admin" });
      const { data: exists } = await supabase.rpc("admin_exists");
      return { isAdmin: !!isAdmin, adminExists: !!exists };
    },
  });

  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  async function claim() {
    const { data, error } = await supabase.rpc("claim_first_admin");
    if (error || !data) toast.error(t("Kunde inte aktivera administratör.", "Could not activate administrator."));
    else role.refetch();
  }

  if (role.isLoading) return <div className="container-page py-24">…</div>;

  if (!role.data?.isAdmin) {
    return (
      <section className="container-page max-w-lg py-24">
        <h1 className="text-4xl">{t("Ingen åtkomst", "No access")}</h1>
        {!role.data?.adminExists ? (
          <>
            <p className="mt-4 text-muted-foreground">{t("Ingen administratör finns ännu. Som ägare kan du aktivera administratörsrollen för ditt konto en gång. Därefter stängs funktionen automatiskt.", "No administrator exists yet. As the owner you can activate the administrator role for your account once. After that this option closes automatically.")}</p>
            <Button variant="lime" size="xl" className="mt-6" onClick={claim}>{t("Gör mig till administratör", "Make me administrator")}</Button>
          </>
        ) : (
          <p className="mt-4 text-muted-foreground">{t("Det här kontot har inte administratörsbehörighet.", "This account does not have administrator access.")}</p>
        )}
        <Button variant="pillOutline" className="mt-6 ml-2" onClick={signOut}><LogOut /> {t("Logga ut", "Sign out")}</Button>
      </section>
    );
  }

  return (
    <section className="container-page py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="eyebrow">AiLift</p>
          <h1 className="mt-2 text-5xl">{t("Administration", "Administration")}</h1>
        </div>
        <Button variant="pillOutline" onClick={signOut}><LogOut /> {t("Logga ut", "Sign out")}</Button>
      </div>
      <Tabs defaultValue="bookings" className="mt-10">
        <TabsList className="flex-wrap">
          <TabsTrigger value="bookings">{t("Bokningar", "Bookings")}</TabsTrigger>
          <TabsTrigger value="messages">{t("Meddelanden", "Messages")}</TabsTrigger>
          <TabsTrigger value="availability">{t("Tillgänglighet", "Availability")}</TabsTrigger>
          <TabsTrigger value="services">{t("Tjänster", "Services")}</TabsTrigger>
        </TabsList>
        <TabsContent value="bookings"><Bookings /></TabsContent>
        <TabsContent value="messages"><Messages /></TabsContent>
        <TabsContent value="availability"><Availability /></TabsContent>
        <TabsContent value="services"><ServicesAdmin /></TabsContent>
      </Tabs>
    </section>
  );
}

function Bookings() {
  const { lang, t } = useLang();
  const [status, setStatus] = useState("all");
  const [service, setService] = useState("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const q = useQuery({
    queryKey: ["admin-bookings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("bookings").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
  const rows = (q.data ?? []).filter((b) => (status === "all" || b.status === status) && (service === "all" || b.service_slug === service));
  const counts = Object.fromEntries(STATUSES.map((s) => [s, (q.data ?? []).filter((b) => b.status === s).length]));

  return (
    <div className="mt-6 space-y-6">
      <div className="grid gap-3 sm:grid-cols-5">
        {STATUSES.map((s) => (
          <div key={s} className="rounded-xl border border-border bg-card p-4">
            <p className="eyebrow">{STATUS_LABEL[s][lang === "sv" ? 0 : 1]}</p>
            <p className="mt-1 font-display text-3xl">{counts[s]}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        <select className="h-9 rounded-md border border-input bg-background px-3 text-sm" value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Status">
          <option value="all">{t("Alla statusar", "All statuses")}</option>
          {STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABEL[s][lang === "sv" ? 0 : 1]}</option>)}
        </select>
        <select className="h-9 rounded-md border border-input bg-background px-3 text-sm" value={service} onChange={(e) => setService(e.target.value)} aria-label={t("Tjänst", "Service")}>
          <option value="all">{t("Alla tjänster", "All services")}</option>
          {SERVICES.map((s) => <option key={s.slug} value={s.slug}>{s.title[lang]}</option>)}
        </select>
      </div>
      {rows.length === 0 && <p className="text-muted-foreground">{t("Inga bokningsförfrågningar ännu.", "No booking requests yet.")}</p>}
      <ul className="divide-y divide-border rounded-2xl border border-border bg-card">
        {rows.map((b) => (
          <li key={b.id} className="p-5">
            <button className="flex w-full flex-wrap items-center justify-between gap-3 text-left" onClick={() => setOpenId(openId === b.id ? null : b.id)} aria-expanded={openId === b.id}>
              <div>
                <p className="font-semibold">{b.name} <span className="font-normal text-muted-foreground">· {b.organization || b.email}</span></p>
                <p className="text-sm text-muted-foreground">{b.reference} · {SERVICES.find((s) => s.slug === b.service_slug)?.title[lang]} · {b.preferred_date}</p>
              </div>
              <Badge variant={b.status === "pending" ? "default" : "secondary"}>{STATUS_LABEL[b.status][lang === "sv" ? 0 : 1]}</Badge>
            </button>
            {openId === b.id && <BookingEditor booking={b} />}
          </li>
        ))}
      </ul>
    </div>
  );
}

type BookingRow = NonNullable<Awaited<ReturnType<typeof fetchOne>>>;
async function fetchOne() {
  const { data } = await supabase.from("bookings").select("*").limit(1).single();
  return data;
}

function BookingEditor({ booking: b }: { booking: BookingRow }) {
  const { lang, t } = useLang();
  const qc = useQueryClient();
  const [form, setForm] = useState({
    status: b.status,
    agreed_date: b.agreed_date ?? "",
    agreed_duration: b.agreed_duration ?? "",
    agreed_price: b.agreed_price ?? "",
    admin_notes: b.admin_notes ?? "",
  });
  async function save() {
    const { error } = await supabase.from("bookings").update({
      status: form.status,
      agreed_date: form.agreed_date || null,
      agreed_duration: form.agreed_duration || null,
      agreed_price: form.agreed_price || null,
      admin_notes: form.admin_notes || null,
      updated_at: new Date().toISOString(),
    }).eq("id", b.id);
    if (error) toast.error(error.message);
    else {
      toast.success(t("Sparat", "Saved"));
      qc.invalidateQueries({ queryKey: ["admin-bookings"] });
      qc.invalidateQueries({ queryKey: ["availability"] });
    }
  }
  const info: [string, string | number | null][] = [
    [t("E-post", "Email"), b.email],
    [t("Telefon", "Phone"), b.phone],
    [t("Målgrupp", "Audience"), b.audience],
    ["Format", b.format],
    [t("Deltagare", "Participants"), b.participants],
    [t("Tid", "Time"), b.preferred_time],
    [t("Språk", "Language"), b.language],
    [t("Inkom", "Received"), new Date(b.created_at).toLocaleString(lang === "sv" ? "sv-SE" : "en-GB")],
  ];
  return (
    <div className="mt-5 grid gap-6 border-t border-border pt-5 md:grid-cols-2">
      <div className="space-y-3 text-sm">
        <dl className="grid grid-cols-2 gap-2">
          {info.map(([k, v]) => <div key={k}><dt className="text-muted-foreground">{k}</dt><dd className="break-words">{v ?? "—"}</dd></div>)}
        </dl>
        <div><p className="text-muted-foreground">{t("Mål", "Goals")}</p><p className="whitespace-pre-wrap">{b.goals}</p></div>
        <a className="inline-block font-semibold underline" href={`mailto:${b.email}?subject=AiLift ${b.reference}`}>{t("Svara via e-post", "Reply by email")}</a>
      </div>
      <div className="space-y-3">
        <label className="block text-sm">Status
          <select className="mt-1 h-9 w-full rounded-md border border-input bg-background px-3" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
            {STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABEL[s][lang === "sv" ? 0 : 1]}</option>)}
          </select>
        </label>
        <label className="block text-sm">{t("Överenskommet datum", "Agreed date")}<Input type="date" className="mt-1" value={form.agreed_date} onChange={(e) => setForm({ ...form, agreed_date: e.target.value })} /></label>
        <div className="grid grid-cols-2 gap-3">
          <label className="block text-sm">{t("Längd", "Duration")}<Input className="mt-1" value={form.agreed_duration} onChange={(e) => setForm({ ...form, agreed_duration: e.target.value })} /></label>
          <label className="block text-sm">{t("Pris", "Price")}<Input className="mt-1" value={form.agreed_price} onChange={(e) => setForm({ ...form, agreed_price: e.target.value })} /></label>
        </div>
        <label className="block text-sm">{t("Privata anteckningar", "Private notes")}<Textarea className="mt-1" rows={3} value={form.admin_notes} onChange={(e) => setForm({ ...form, admin_notes: e.target.value })} /></label>
        <Button variant="pill" onClick={save}>{t("Spara", "Save")}</Button>
      </div>
    </div>
  );
}

function Messages() {
  const { lang, t } = useLang();
  const qc = useQueryClient();
  const q = useQuery({
    queryKey: ["admin-messages"],
    queryFn: async () => {
      const { data, error } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
  async function toggle(id: string, handled: boolean) {
    await supabase.from("contact_messages").update({ handled }).eq("id", id);
    qc.invalidateQueries({ queryKey: ["admin-messages"] });
  }
  if (!q.data?.length) return <p className="mt-6 text-muted-foreground">{t("Inga meddelanden ännu.", "No messages yet.")}</p>;
  return (
    <ul className="mt-6 divide-y divide-border rounded-2xl border border-border bg-card">
      {q.data.map((m) => (
        <li key={m.id} className={`p-5 ${m.handled ? "opacity-60" : ""}`}>
          <div className="flex flex-wrap justify-between gap-2">
            <p className="font-semibold">{m.name} <a className="font-normal underline" href={`mailto:${m.email}`}>{m.email}</a> {m.organization && <span className="font-normal text-muted-foreground">· {m.organization}</span>}</p>
            <p className="text-sm text-muted-foreground">{new Date(m.created_at).toLocaleString(lang === "sv" ? "sv-SE" : "en-GB")}</p>
          </div>
          <p className="mt-2 whitespace-pre-wrap">{m.message}</p>
          <Button size="sm" variant="outline" className="mt-3" onClick={() => toggle(m.id, !m.handled)}>{m.handled ? t("Markera som ohanterad", "Mark as unhandled") : t("Markera som hanterad", "Mark as handled")}</Button>
        </li>
      ))}
    </ul>
  );
}

function Availability() {
  const { lang, t } = useLang();
  const qc = useQueryClient();
  const [newDate, setNewDate] = useState("");
  const [reason, setReason] = useState("");
  const rules = useQuery({ queryKey: ["admin-rules"], queryFn: async () => (await supabase.from("availability_rules").select("*").order("weekday")).data ?? [] });
  const blocked = useQuery({ queryKey: ["admin-blocked"], queryFn: async () => (await supabase.from("blocked_dates").select("*").order("date")).data ?? [] });
  const refresh = () => { qc.invalidateQueries({ queryKey: ["admin-rules"] }); qc.invalidateQueries({ queryKey: ["admin-blocked"] }); qc.invalidateQueries({ queryKey: ["availability"] }); };

  async function toggleDay(wd: number) {
    const existing = rules.data?.find((r) => r.weekday === wd);
    const { error } = existing
      ? await supabase.from("availability_rules").delete().eq("id", existing.id)
      : await supabase.from("availability_rules").insert({ weekday: wd, start_time: "09:00", end_time: "17:00" });
    if (error) toast.error(error.message);
    refresh();
  }
  async function updateRule(id: string, field: "start_time" | "end_time", value: string) {
    const { error } = await supabase.from("availability_rules").update({ [field]: value }).eq("id", id);
    if (error) toast.error(t("Sluttiden måste vara efter starttiden.", "End time must be after start time."));
    refresh();
  }
  async function addBlocked() {
    if (!newDate) return;
    const { error } = await supabase.from("blocked_dates").upsert({ date: newDate, reason: reason || null });
    if (error) toast.error(error.message);
    setNewDate(""); setReason(""); refresh();
  }
  async function removeBlocked(date: string) {
    await supabase.from("blocked_dates").delete().eq("date", date);
    refresh();
  }

  return (
    <div className="mt-6 grid gap-10 md:grid-cols-2">
      <div>
        <h2 className="text-2xl">{t("Bokningsbara veckodagar", "Bookable weekdays")}</h2>
        <ul className="mt-4 space-y-2">
          {[1, 2, 3, 4, 5, 6, 0].map((wd) => {
            const r = rules.data?.find((x) => x.weekday === wd);
            return (
              <li key={wd} className="flex items-center gap-3 rounded-xl border border-border bg-card p-3">
                <label className="flex w-24 items-center gap-2 text-sm font-semibold">
                  <input type="checkbox" checked={!!r} onChange={() => toggleDay(wd)} /> {WEEKDAYS[wd][lang === "sv" ? 0 : 1]}
                </label>
                {r && (
                  <>
                    <Input type="time" className="w-32" defaultValue={r.start_time.slice(0, 5)} onBlur={(e) => updateRule(r.id, "start_time", e.target.value)} aria-label={t("Start", "Start")} />
                    <span>–</span>
                    <Input type="time" className="w-32" defaultValue={r.end_time.slice(0, 5)} onBlur={(e) => updateRule(r.id, "end_time", e.target.value)} aria-label={t("Slut", "End")} />
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <h2 className="text-2xl">{t("Blockerade datum", "Blocked dates")}</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          <Input type="date" className="w-44" value={newDate} onChange={(e) => setNewDate(e.target.value)} aria-label={t("Datum", "Date")} />
          <Input className="flex-1" placeholder={t("Anledning (valfritt)", "Reason (optional)")} value={reason} onChange={(e) => setReason(e.target.value)} />
          <Button variant="pill" onClick={addBlocked}>{t("Blockera", "Block")}</Button>
        </div>
        <ul className="mt-4 space-y-2">
          {blocked.data?.map((b) => (
            <li key={b.date} className="flex items-center justify-between rounded-xl border border-border bg-card p-3 text-sm">
              <span><strong>{b.date}</strong> {b.reason && <span className="text-muted-foreground">· {b.reason}</span>}</span>
              <button onClick={() => removeBlocked(b.date)} aria-label={t("Ta bort", "Remove")}><Trash2 className="size-4" /></button>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-muted-foreground">{t("Datum med en bekräftad bokning blockeras automatiskt för nya förfrågningar.", "Dates with a confirmed booking are automatically blocked for new requests.")}</p>
      </div>
    </div>
  );
}

function ServicesAdmin() {
  const { lang, t } = useLang();
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["admin-services"], queryFn: async () => (await supabase.from("services").select("*").order("sort")).data ?? [] });
  async function save(slug: string, e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const { error } = await supabase.from("services").update({
      price_sv: fd.price_sv || null, price_en: fd.price_en || null,
      duration_sv: fd.duration_sv || null, duration_en: fd.duration_en || null,
      active: fd.active === "on", updated_at: new Date().toISOString(),
    }).eq("slug", slug);
    if (error) toast.error(error.message);
    else { toast.success(t("Sparat", "Saved")); qc.invalidateQueries({ queryKey: ["admin-services"] }); qc.invalidateQueries({ queryKey: ["service-config"] }); }
  }
  return (
    <div className="mt-6 space-y-4">
      <p className="text-sm text-muted-foreground">{t("Lämna pris tomt för att visa “Begär offert”.", "Leave price empty to show “Request a quote”.")}</p>
      {q.data?.map((s) => (
        <form key={s.slug} onSubmit={(e) => save(s.slug, e)} className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-xl">{SERVICES.find((x) => x.slug === s.slug)?.title[lang]}</h3>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="active" defaultChecked={s.active} /> {t("Bokningsbar", "Bookable")}</label>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-4">
            <Input name="price_sv" placeholder="Pris (SV)" defaultValue={s.price_sv ?? ""} />
            <Input name="price_en" placeholder="Price (EN)" defaultValue={s.price_en ?? ""} />
            <Input name="duration_sv" placeholder="Längd (SV)" defaultValue={s.duration_sv ?? ""} />
            <Input name="duration_en" placeholder="Duration (EN)" defaultValue={s.duration_en ?? ""} />
          </div>
          <Button type="submit" size="sm" variant="pill" className="mt-4">{t("Spara", "Save")}</Button>
        </form>
      ))}
    </div>
  );
}
