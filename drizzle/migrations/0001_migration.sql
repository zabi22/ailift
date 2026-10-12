
-- Owner bootstrap config: only reachable by service role / security-definer functions.
CREATE TABLE public.admin_bootstrap (
  id boolean PRIMARY KEY DEFAULT true CHECK (id),
  owner_email text,
  consumed_at timestamptz,
  consumed_by uuid
);
GRANT ALL ON public.admin_bootstrap TO service_role;
REVOKE ALL ON public.admin_bootstrap FROM anon, authenticated;
ALTER TABLE public.admin_bootstrap ENABLE ROW LEVEL SECURITY;
INSERT INTO public.admin_bootstrap(id) VALUES (true);

-- If an admin already exists, the bootstrap is closed.
UPDATE public.admin_bootstrap SET consumed_at = now()
WHERE EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin');

CREATE OR REPLACE FUNCTION public.claim_first_admin()
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE cfg public.admin_bootstrap; u record;
BEGIN
  IF auth.uid() IS NULL THEN RETURN false; END IF;
  -- Row lock serialises concurrent claims.
  SELECT * INTO cfg FROM public.admin_bootstrap WHERE id FOR UPDATE;
  IF cfg.consumed_at IS NOT NULL OR cfg.owner_email IS NULL THEN RETURN false; END IF;
  IF EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    UPDATE public.admin_bootstrap SET consumed_at = now() WHERE id;
    RETURN false;
  END IF;
  SELECT email, email_confirmed_at INTO u FROM auth.users WHERE id = auth.uid();
  IF u.email_confirmed_at IS NULL OR lower(u.email) <> lower(trim(cfg.owner_email)) THEN RETURN false; END IF;
  INSERT INTO public.user_roles(user_id, role) VALUES (auth.uid(), 'admin');
  UPDATE public.admin_bootstrap SET consumed_at = now(), consumed_by = auth.uid() WHERE id;
  RETURN true;
END $$;
REVOKE EXECUTE ON FUNCTION public.claim_first_admin() FROM anon, public;
GRANT EXECUTE ON FUNCTION public.claim_first_admin() TO authenticated;

-- Can the signed-in user still claim? (no email revealed)
CREATE OR REPLACE FUNCTION public.can_claim_admin()
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_bootstrap b JOIN auth.users u ON u.id = auth.uid()
    WHERE b.consumed_at IS NULL AND b.owner_email IS NOT NULL
      AND u.email_confirmed_at IS NOT NULL AND lower(u.email) = lower(trim(b.owner_email))
      AND NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin'))
$$;
REVOKE EXECUTE ON FUNCTION public.can_claim_admin() FROM anon, public;
GRANT EXECUTE ON FUNCTION public.can_claim_admin() TO authenticated;

-- Lock down helpers: no anon access to role probes.
REVOKE EXECUTE ON FUNCTION public.admin_exists() FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon, public;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;
