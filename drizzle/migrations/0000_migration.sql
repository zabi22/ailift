
CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "own roles readable" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());

-- One-time bootstrap: first signed-in caller becomes admin only if no admin exists.
CREATE OR REPLACE FUNCTION public.claim_first_admin()
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF auth.uid() IS NULL THEN RETURN false; END IF;
  LOCK TABLE public.user_roles IN EXCLUSIVE MODE;
  IF EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN RETURN false; END IF;
  INSERT INTO public.user_roles(user_id, role) VALUES (auth.uid(), 'admin');
  RETURN true;
END $$;
CREATE OR REPLACE FUNCTION public.admin_exists()
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin')
$$;
REVOKE EXECUTE ON FUNCTION public.claim_first_admin() FROM anon, public;
GRANT EXECUTE ON FUNCTION public.claim_first_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_exists() TO anon, authenticated;

-- Services
CREATE TABLE public.services (
  slug text PRIMARY KEY,
  sort int NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  price_sv text,
  price_en text,
  duration_sv text,
  duration_en text,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.services TO anon, authenticated;
GRANT UPDATE ON public.services TO authenticated;
GRANT ALL ON public.services TO service_role;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read services" ON public.services FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "admin update services" ON public.services FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

INSERT INTO public.services(slug, sort) VALUES
 ('company-workshops',1),('talks',2),('implementation',3),('schools',4),('coaching',5),('custom',6);

-- Availability
CREATE TABLE public.availability_rules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  weekday int NOT NULL CHECK (weekday BETWEEN 0 AND 6),
  start_time time NOT NULL,
  end_time time NOT NULL,
  CHECK (end_time > start_time)
);
GRANT SELECT ON public.availability_rules TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.availability_rules TO authenticated;
GRANT ALL ON public.availability_rules TO service_role;
ALTER TABLE public.availability_rules ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read rules" ON public.availability_rules FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "admin manage rules" ON public.availability_rules FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
INSERT INTO public.availability_rules(weekday,start_time,end_time) VALUES (1,'09:00','17:00'),(2,'09:00','17:00'),(3,'09:00','17:00'),(4,'09:00','17:00'),(5,'09:00','15:00');

CREATE TABLE public.blocked_dates (
  date date PRIMARY KEY,
  reason text
);
GRANT SELECT ON public.blocked_dates TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.blocked_dates TO authenticated;
GRANT ALL ON public.blocked_dates TO service_role;
ALTER TABLE public.blocked_dates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read blocked" ON public.blocked_dates FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "admin manage blocked" ON public.blocked_dates FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- Bookings
CREATE TABLE public.bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference text NOT NULL UNIQUE,
  service_slug text NOT NULL REFERENCES public.services(slug),
  audience text NOT NULL,
  format text NOT NULL,
  participants int,
  preferred_date date NOT NULL,
  preferred_time text NOT NULL,
  alternative_date date,
  goals text NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  organization text,
  language text NOT NULL DEFAULT 'sv',
  consent boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','confirmed','declined','cancelled','completed')),
  agreed_date date,
  agreed_duration text,
  agreed_price text,
  admin_notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, UPDATE, DELETE ON public.bookings TO authenticated;
GRANT ALL ON public.bookings TO service_role;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admin read bookings" ON public.bookings FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin update bookings" ON public.bookings FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin delete bookings" ON public.bookings FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

-- Validated public submission; always pending; checks availability and double-booking.
CREATE OR REPLACE FUNCTION public.submit_booking(
  _service text, _audience text, _format text, _participants int,
  _date date, _time text, _alt_date date, _goals text,
  _name text, _email text, _phone text, _organization text, _language text, _consent boolean
) RETURNS text LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE ref text; wd int;
BEGIN
  IF NOT _consent THEN RAISE EXCEPTION 'consent_required'; END IF;
  IF length(coalesce(trim(_name),'')) < 2 OR length(_name) > 120 THEN RAISE EXCEPTION 'invalid_name'; END IF;
  IF _email !~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' OR length(_email) > 255 THEN RAISE EXCEPTION 'invalid_email'; END IF;
  IF length(coalesce(trim(_goals),'')) < 10 OR length(_goals) > 3000 THEN RAISE EXCEPTION 'invalid_goals'; END IF;
  IF _format NOT IN ('onsite','online','either') THEN RAISE EXCEPTION 'invalid_format'; END IF;
  IF _time NOT IN ('morning','afternoon','full_day') THEN RAISE EXCEPTION 'invalid_time'; END IF;
  IF length(coalesce(_phone,'')) > 40 OR length(coalesce(_organization,'')) > 200 OR length(coalesce(_audience,'')) > 40 THEN RAISE EXCEPTION 'invalid_input'; END IF;
  IF _participants IS NOT NULL AND (_participants < 1 OR _participants > 2000) THEN RAISE EXCEPTION 'invalid_participants'; END IF;
  IF NOT EXISTS (SELECT 1 FROM services WHERE slug=_service AND active) THEN RAISE EXCEPTION 'invalid_service'; END IF;
  IF _date <= current_date THEN RAISE EXCEPTION 'date_unavailable'; END IF;
  wd := extract(dow FROM _date);
  IF NOT EXISTS (SELECT 1 FROM availability_rules WHERE weekday=wd) OR EXISTS (SELECT 1 FROM blocked_dates WHERE date=_date) THEN
    RAISE EXCEPTION 'date_unavailable';
  END IF;
  PERFORM pg_advisory_xact_lock(hashtext(_date::text));
  IF EXISTS (SELECT 1 FROM bookings WHERE status='confirmed' AND coalesce(agreed_date, preferred_date)=_date) THEN
    RAISE EXCEPTION 'date_unavailable';
  END IF;
  ref := 'AL-' || to_char(now(),'YYMMDD') || '-' || upper(substr(md5(gen_random_uuid()::text),1,5));
  INSERT INTO bookings(reference,service_slug,audience,format,participants,preferred_date,preferred_time,alternative_date,goals,name,email,phone,organization,language,consent)
  VALUES (ref,_service,_audience,_format,_participants,_date,_time,_alt_date,trim(_goals),trim(_name),lower(trim(_email)),nullif(trim(_phone),''),nullif(trim(_organization),''),coalesce(_language,'sv'),true);
  RETURN ref;
END $$;
GRANT EXECUTE ON FUNCTION public.submit_booking(text,text,text,int,date,text,date,text,text,text,text,text,text,boolean) TO anon, authenticated;

-- Dates already confirmed (no personal data), for the public calendar
CREATE OR REPLACE FUNCTION public.taken_dates()
RETURNS SETOF date LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT DISTINCT coalesce(agreed_date, preferred_date) FROM bookings WHERE status='confirmed' AND coalesce(agreed_date, preferred_date) >= current_date
$$;
GRANT EXECUTE ON FUNCTION public.taken_dates() TO anon, authenticated;

-- Contact messages
CREATE TABLE public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (length(name) BETWEEN 2 AND 120),
  email text NOT NULL CHECK (length(email) <= 255),
  organization text CHECK (length(organization) <= 200),
  message text NOT NULL CHECK (length(message) BETWEEN 10 AND 3000),
  handled boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contact_messages TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.contact_messages TO authenticated;
GRANT ALL ON public.contact_messages TO service_role;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can send" ON public.contact_messages FOR INSERT TO anon, authenticated WITH CHECK (handled = false);
CREATE POLICY "admin read messages" ON public.contact_messages FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin update messages" ON public.contact_messages FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin delete messages" ON public.contact_messages FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));
