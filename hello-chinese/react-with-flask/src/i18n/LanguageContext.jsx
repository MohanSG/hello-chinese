import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { translations } from "./translations";

const LanguageContext = createContext(null);

const DEV =
  typeof import.meta !== "undefined" && import.meta.env
    ? import.meta.env.DEV
    : false;

/* Keys that resolved to nothing. Inspect with __hcMissingKeys() in the console
   to find untranslated copy without clicking through every page. */
const missing = new Set();
if (typeof window !== "undefined") {
  window.__hcMissingKeys = () => Array.from(missing).sort();
}

function reportMissing(path) {
  if (!missing.has(path)) {
    missing.add(path);
    if (DEV) console.warn(`[i18n] missing key: ${path}`);
  }
  // In dev the marker makes the gap visible on screen; in prod fall back to the
  // key itself rather than showing brackets to a parent mid-enrollment.
  return DEV ? `⟦${path}⟧` : path;
}

/* "Due {date} — {amount}" + { date: "Sep 6", amount: "$120" } */
function fill(str, vars) {
  if (!vars || typeof str !== "string") return str;
  return str.replace(/\{(\w+)\}/g, (whole, key) =>
    vars[key] == null ? whole : String(vars[key]),
  );
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem("hc-lang") || "en");

  useEffect(() => {
    localStorage.setItem("hc-lang", lang);
    // Drives the Chinese type stack in variables.css (Part 4).
    document.documentElement.lang = lang === "zh" ? "zh" : "en";
  }, [lang]);

  const api = useMemo(() => {
    const lookup = (path) => {
      let node = translations;
      for (const p of path.split(".")) {
        node = node?.[p];
        if (node == null) return null;
      }
      return node;
    };

    /* t("enroll.hero.title")
       t("plan.dueLine", { date: "Sep 6", amount: "$120" })
       Arrays come back as arrays — see tList. */
    const t = (path, vars) => {
      const node = lookup(path);
      if (node == null) return reportMissing(path);
      const val = node[lang] ?? node.en;
      if (val == null) return reportMissing(path);
      if (Array.isArray(val)) return val.map((v) => fill(v, vars));
      return fill(val, vars);
    };

    /* Always an array — for bullet lists, so .map() never sees a bare string. */
    const tList = (path, vars) => {
      const val = t(path, vars);
      return Array.isArray(val) ? val : [val];
    };

    /* Locale-aware dates and money, so "Sep 6" reads as 9月6日 in Chinese.
       Pass a Date or an ISO string. */
    const locale = lang === "zh" ? "zh-CN" : "en-US";
    const tDate = (value, opts = { month: "short", day: "numeric" }) => {
      const d = value instanceof Date ? value : new Date(value);
      if (Number.isNaN(d.getTime())) return String(value);
      return new Intl.DateTimeFormat(locale, opts).format(d);
    };
    const tMoney = (amount, currency = "USD") =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        maximumFractionDigits: Number.isInteger(amount) ? 0 : 2,
      }).format(amount);

    const toggleLang = () => setLang((l) => (l === "en" ? "zh" : "en"));

    return { lang, locale, setLang, toggleLang, t, tList, tDate, tMoney };
  }, [lang]);

  return (
    <LanguageContext.Provider value={api}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
