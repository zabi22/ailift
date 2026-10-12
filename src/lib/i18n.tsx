import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "sv" | "en";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (sv: string, en: string) => string };

const LangContext = createContext<Ctx>({ lang: "sv", setLang: () => {}, t: (sv) => sv });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("sv");

  useEffect(() => {
    const stored = window.localStorage.getItem("ailift-lang");
    if (stored === "en" || stored === "sv") setLangState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    window.localStorage.setItem("ailift-lang", l);
  }, []);

  const t = useCallback((sv: string, en: string) => (lang === "sv" ? sv : en), [lang]);

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
