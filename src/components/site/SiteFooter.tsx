import { Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { SERVICES } from "@/lib/services";

export function SiteFooter() {
  const { lang, t } = useLang();
  return (
    <footer className="mt-24 bg-ink text-ink-foreground">
      <div className="container-page grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-4xl">AiLift<span className="text-lime">.</span></p>
          <p className="mt-4 max-w-sm text-sm opacity-70">
            {t("Gör AI användbart i verkligheten. Workshops, föreläsningar och vägledning av Zabihullah Ahmadzai.", "Make AI useful in real life. Workshops, talks and guidance by Zabihullah Ahmadzai.")}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest opacity-60">{t("Tjänster", "Services")}</p>
          <ul className="mt-4 space-y-2 text-sm">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link to="/services/$slug" params={{ slug: s.slug }} className="opacity-80 hover:opacity-100">{s.title[lang]}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest opacity-60">AiLift</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/about" className="opacity-80 hover:opacity-100">{t("Om AiLift", "About")}</Link></li>
            <li><Link to="/book" className="opacity-80 hover:opacity-100">{t("Boka", "Book")}</Link></li>
            <li><Link to="/faq" className="opacity-80 hover:opacity-100">FAQ</Link></li>
            <li><Link to="/contact" className="opacity-80 hover:opacity-100">{t("Kontakt", "Contact")}</Link></li>
            <li><Link to="/privacy" className="opacity-80 hover:opacity-100">{t("Integritet", "Privacy")}</Link></li>
          </ul>
        </div>
      </div>
      <div className="container-page flex flex-wrap justify-between gap-4 border-t border-ink-foreground/10 py-6 text-xs opacity-60">
        <p>© {new Date().getFullYear()} AiLift</p>
      </div>
    </footer>
  );
}
