<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## AiLift architecture
- Booking and contact forms send directly to the owner via a Resend server function (`src/lib/send-request.functions.ts`, key `RESEND_API_KEY`, optional `RESEND_FROM`); mailto draft and copy remain as fallbacks. Nothing is persisted.
- Legacy Cloud tables (bookings, contact_messages, user_roles, admin_bootstrap, services, availability_rules, blocked_dates) are deprecated with all anon/authenticated grants revoked; do not wire them back in.
- Bilingual copy is inline via `useLang().t(sv, en)`; service content lives in `src/lib/services.ts`, portfolio in `src/lib/projects.ts` (every project carries an explicit status), booking session types in `src/lib/booking.ts`.
- The /demo sandbox is deterministic sample data in `src/lib/demo.ts`; it must stay labelled as non-live and never call external services.
- Images are bundled files in src/assets (not CDN pointers) so the site also works when hosted outside Lovable, e.g. Vercel.
