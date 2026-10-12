import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import logo from "@/assets/ailift-logo.png";

export function SiteHeader() {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);
  const links = [
    { to: "/services", label: t("Tjänster", "Services") },
    { to: "/work", label: t("Projekt", "Work") },
    { to: "/demo", label: t("Sandlåda", "Sandbox") },
    { to: "/about", label: t("Om AiLift", "About") },
    { to: "/contact", label: t("Kontakt", "Contact") },
  ] as const;

  const LangToggle = (
    <div className="flex items-center rounded-full border border-border p-0.5 text-xs font-semibold" role="group" aria-label={t("Språk", "Language")}>
      {(["sv", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`rounded-full px-2.5 py-1 uppercase transition-colors ${lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
        >
          {l}
        </button>
      ))}
    </div>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-background focus:p-2">
        {t("Hoppa till innehåll", "Skip to content")}
      </a>
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <Link to="/" className="flex items-center" aria-label="AiLift" onClick={() => setOpen(false)}>
          <img src={logo} alt="AiLift" width={870} height={250} className="h-7 w-auto" />
        </Link>
        <nav className="hidden items-center gap-8 text-sm md:flex" aria-label={t("Huvudmeny", "Main menu")}>
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="text-muted-foreground transition-colors hover:text-foreground" activeProps={{ className: "text-foreground font-medium" }}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          {LangToggle}
          <Button asChild variant="pill">
            <Link to="/contact">{t("Diskutera projekt", "Discuss a project")}</Link>
          </Button>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label={t("Meny", "Menu")} aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="container-page flex flex-col gap-4 border-t border-border py-6 md:hidden">
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="font-display text-2xl">
              {l.label}
            </Link>
          ))}
          <div className="flex items-center justify-between pt-2">
            {LangToggle}
            <Button asChild variant="pill">
              <Link to="/contact" onClick={() => setOpen(false)}>{t("Diskutera projekt", "Discuss a project")}</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
