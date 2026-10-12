import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type ServiceConfig = {
  slug: string;
  active: boolean;
  price_sv: string | null;
  price_en: string | null;
  duration_sv: string | null;
  duration_en: string | null;
};

export const serviceConfigQuery = queryOptions({
  queryKey: ["service-config"],
  queryFn: async (): Promise<ServiceConfig[]> => {
    const { data, error } = await supabase.from("services").select("slug, active, price_sv, price_en, duration_sv, duration_en").order("sort");
    if (error) throw error;
    return data ?? [];
  },
  staleTime: 60_000,
});
