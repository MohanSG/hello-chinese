import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "./translations";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem("hc-lang") || "en");

  useEffect(() => {
    localStorage.setItem("hc-lang", lang);
    // Drives the Chinese type stack in variables.css (Part 4).
    document.documentElement.lang = lang === "zh" ? "zh" : "en";
  }, [lang]);

  const t = (path) => {
    const parts = path.split(".");
    let node = translations;
    for (const p of parts) {
      node = node?.[p];
      if (node == null) return path;
    }
    return node[lang] ?? node.en ?? path;
  };

  const toggleLang = () => setLang((l) => (l === "en" ? "zh" : "en"));

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
