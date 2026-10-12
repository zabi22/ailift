# AiLift — launch-ready build plan

Bilingual (Swedish default, English toggle) service website with real booking requests saved to Lovable Cloud and an owner-only admin dashboard. No Resend, email keys, custom domain, payments or external calendar.

## Design
- Scandinavian editorial: warm white, deep navy text, one restrained lime accent.
- Editorial serif headlines + clean sans body; large type, whitespace, subtle animation.
- Generated photography of workshops/people collaborating (no robots, no heavy gradients).
- No invented testimonials, logos, clients, stats, prices or durations — services show "Begär offert / Request a quote" until the owner sets pricing.

## Public pages (each its own URL, SV/EN everywhere incl. form errors)
- Home: hero "Gör AI användbart i verkligheten", audiences, services, outcomes, process, founder intro (Zabihullah Ahmadzai), CTA.
- Services catalogue + detail page per service (6 services).
- Booking: 3-step request (service & format → preferences/goals/preferred dates from availability → contact incl. optional phone, review). Success page shows reference number and "Pending — the owner will confirm". Never shown as confirmed before the owner confirms.
- About, Contact (saved form), FAQ, Privacy.

## Admin (login + admin role, checked on the server)
- Overview: counts of new/pending bookings and unread messages.
- Bookings: filter by service, date, status; change status (pending, confirmed, declined, cancelled, completed); record agreed date, duration, price; private notes.
- Contact messages: read/mark handled.
- Simple availability: weekly bookable days/hours and blocked dates.
- Service pricing/duration configuration.

## Security
- Roles in a separate table; nobody can self-assign admin.
- One-time owner setup: you sign up, then I assign the admin role with a single backend step (bootstrap disabled afterwards).
- Public can only create requests via validated server functions; only admin reads/updates.

## Build order
1. Design system, nav, language toggle, public pages.
2. Enable Cloud, schema + security rules, seed services.
3. Booking flow + contact form.
4. Admin dashboard + availability.
5. SEO metadata, accessibility, full workflow test (submit → appears in admin → status change → non-admin blocked).

## Technical notes
- TanStack Start routes per page, createServerFn for submissions/admin actions with requireSupabaseAuth + has_role check, RLS on all tables, booking status defaults to pending.
