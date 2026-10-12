
DROP FUNCTION IF EXISTS public.submit_booking(text,text,text,int,date,text,date,text,text,text,text,text,text,boolean);
DROP FUNCTION IF EXISTS public.claim_first_admin();
DROP FUNCTION IF EXISTS public.can_claim_admin();
DROP FUNCTION IF EXISTS public.admin_exists();
DROP FUNCTION IF EXISTS public.taken_dates();
REVOKE ALL ON public.bookings, public.contact_messages, public.user_roles, public.admin_bootstrap,
  public.services, public.availability_rules, public.blocked_dates FROM anon, authenticated;
COMMENT ON TABLE public.bookings IS 'DEPRECATED: site no longer stores booking requests';
COMMENT ON TABLE public.contact_messages IS 'DEPRECATED: site no longer stores contact messages';
COMMENT ON TABLE public.user_roles IS 'DEPRECATED: no admin accounts';
COMMENT ON TABLE public.admin_bootstrap IS 'DEPRECATED: no admin accounts';
COMMENT ON TABLE public.services IS 'DEPRECATED: service info lives in code';
COMMENT ON TABLE public.availability_rules IS 'DEPRECATED: no online availability';
COMMENT ON TABLE public.blocked_dates IS 'DEPRECATED: no online availability';
