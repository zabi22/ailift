# AiLift — full build plan

Build the complete AiLift site from the brief: bilingual (Swedish/English) public website, real booking requests saved to Lovable Cloud, availability management, and a private admin dashboard. No email provider (no Resend/SMTP).

## Design
- Scandinavian editorial look: warm white backgrounds, deep navy text, one lime accent.
- Editorial serif headlines + clean sans body (not Inter/Poppins). Large type, generous whitespace.
- No fake testimonials, logos, stats or certifications.

## Pages (each its own URL, SV/EN toggle remembered)
- Home: hero "Make AI useful in real life", audience selection, services overview, outcomes, 3-step process, founder intro (Zabihullah Ahmadzai), booking CTA, footer.
- Services catalogue + a detail page for each of the 6 services.
- Booking: 6-step request form (service, type, preferences, date from real availability, contact, review). Ends with a "request received — pending confirmation" page with a reference number. Never shown as confirmed until the owner confirms.
- Contact form (saved to database).
- AI Learning Hub (resource articles), FAQ, About, Privacy.
- Admin (login required, owner only): overview, booking list with status changes (pending / confirmed / declined / cancelled / completed) and notes, availability calendar (weekly hours + blocked dates), contact messages, service and site text editing.

## Backend (Lovable Cloud)
- Tables: services, bookings, availability rules, blocked dates, contact messages, resources, site content, user roles.
- Public visitors can only create bookings/messages; only admin can read/manage them.
- Server-side check prevents double-booking a slot.
- Owner account: you sign up once, then I grant it the admin role.

## Build order
1. Design system, navigation, language switch.
2. Public pages and service pages.
3. Enable Cloud, schema + security rules, seed services.
4. Booking flow with availability checks.
5. Admin dashboard.
6. Contact, Learning Hub, FAQ, Privacy, SEO metadata, accessibility polish, end-to-end test.

## Technical notes
- TanStack Start routes per page, server functions for booking validation, roles in a separate table with a security-definer check, RLS on all tables.
