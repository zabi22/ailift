import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const toISODate = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/** A date is bookable when it is after today, on an open weekday, not blocked and not already confirmed. */
export function isDateAvailable(
  date: Date,
  opts: { weekdays: number[]; blocked: string[]; taken: string[]; today?: Date },
) {
  const today = opts.today ?? new Date();
  const iso = toISODate(date);
  if (iso <= toISODate(today)) return false;
  if (!opts.weekdays.includes(date.getDay())) return false;
  if (opts.blocked.includes(iso) || opts.taken.includes(iso)) return false;
  return true;
}

export const availabilityQuery = queryOptions({
  queryKey: ["availability"],
  queryFn: async () => {
    const [rules, blocked, taken] = await Promise.all([
      supabase.from("availability_rules").select("weekday"),
      supabase.from("blocked_dates").select("date"),
      supabase.rpc("taken_dates"),
    ]);
    return {
      weekdays: Array.from(new Set((rules.data ?? []).map((r) => r.weekday))),
      blocked: (blocked.data ?? []).map((b) => b.date),
      taken: ((taken.data as string[] | null) ?? []).map(String),
    };
  },
});
