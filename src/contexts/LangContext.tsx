"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { type Lang, t, detectLang, LANGS } from "@/i18n/translations";

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  tr: typeof t[Lang];
  dir: "ltr" | "rtl";
}

const LangContext = createContext<LangCtx>({
  lang: "es",
  setLang: () => {},
  tr: t["es"],
  dir: "ltr",
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    const detected = detectLang();
    setLangState(detected);
  }, []);

  useEffect(() => {
    const info = LANGS.find(l => l.code === lang);
    const dir = info?.dir === "rtl" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("nebbuler_lang", l);
  };

  const info = LANGS.find(l => l.code === lang);
  const dir = info?.dir === "rtl" ? "rtl" : "ltr";

  return (
    <LangContext.Provider value={{ lang, setLang, tr: t[lang], dir }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
