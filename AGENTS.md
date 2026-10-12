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
- Public booking submissions go through the `submit_booking` security-definer SQL function (validation, availability, double-booking lock) — keeps anon users from writing booking rows directly.
- Admin access = `admin` row in `user_roles`, checked via `has_role` in RLS; first admin is self-claimed once via `claim_first_admin`, which refuses once any admin exists.
- Bilingual copy is inline via `useLang().t(sv, en)`; service content lives in `src/lib/services.ts`, owner-editable price/duration in the `services` table.
