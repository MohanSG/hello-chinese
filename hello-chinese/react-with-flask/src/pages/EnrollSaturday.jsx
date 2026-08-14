import { useState } from "react";
import { NavLink } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useLanguage } from "../i18n/LanguageContext";
import "../styles/variables.css";
import "./EnrollOverview.css";
import "./EnrollSaturday.css";

// `value` is what gets submitted and stored — it stays English on purpose, so
// the interest list reads the same whichever language the parent used.
// Display copy comes from i18n/translations.js under enrollSat.
const PROGRAM_CARDS = [
  { key: "english", value: "English Language Learning", icon: "book" },
  { key: "math", value: "English-Led Math Enrichment", icon: "calculator" },
];

const EMPTY_FORM = {
  parentName: "",
  email: "",
  childAgeGrade: "",
  programInterest: "",
  preferredTime: "",
  comments: "",
};

function BookIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 5.5C6 4.5 9 4.5 11 5.5V19C9 18 6 18 4 19V5.5Z" stroke="#2f8a4e" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M20 5.5C18 4.5 15 4.5 13 5.5V19C15 18 18 18 20 19V5.5Z" stroke="#2f8a4e" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function CalculatorIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="2.5" width="16" height="19" rx="2.5" stroke="#2f5fc4" strokeWidth="1.6" />
      <rect x="6.5" y="5" width="11" height="4" rx="1" fill="#2f5fc4" />
      <path d="M7.5 12.5H10.5M9 11V14" stroke="#2f5fc4" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M13.5 12.5H16.5" stroke="#2f5fc4" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M7.5 16.5H10.5" stroke="#2f5fc4" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M13.5 16.5H16.5M15 15V18" stroke="#2f5fc4" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function EnrollSaturday() {
  const { t, tList } = useLanguage();
  const [form, setForm] = useState(EMPTY_FORM);
  // Held as a code so the message follows a language switch.
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

  const onField = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setError(null);
  };

  const pickProgram = (value) => {
    setForm((f) => ({ ...f, programInterest: value }));
    setError(null);
  };

  const submitInterest = async (e) => {
    e.preventDefault();
    if (!form.parentName || !form.email || !form.programInterest) {
      setError("warnFields");
      return;
    }
    const payload = {
      page: "saturday-interest-list",
      parentName: form.parentName,
      email: form.email,
      childAgeGrade: form.childAgeGrade,
      programInterest: form.programInterest,
      preferredTime: form.preferredTime || null,
      comments: form.comments || null,
      submittedAt: new Date().toISOString(),
    };
    // TODO: POST payload to the existing Hello Chinese enrollment/contact endpoint.
    // await fetch("/api/enroll", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    console.log("Saturday interest list submission", payload);
    setSubmittedName(form.parentName);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="enroll-overview">
        <NavBar />
        <section className="enroll-header">
          <div className="enroll-header__inner enroll-confirm">
            <div className="enroll-confirm__check">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 12.5L9.5 18L20 6" stroke="#e08a7c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="enroll-header__eyebrow">{t("enrollSat.doneEyebrow")}</div>
            <h1 className="enroll-header__title">{t("enrollSat.doneTitle", { name: submittedName })}</h1>
            <p className="enroll-header__desc enroll-confirm__desc">{t("enrollSat.doneDesc")}</p>
            <NavLink to="/" className="btn-primary">{t("enrollSat.doneCta")}</NavLink>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="enroll-overview">
      <NavBar />

      {/* HEADER */}
      <section className="enroll-header">
        <div className="enroll-header__inner">
          <div className="enroll-back">
            <NavLink to="/" className="enroll-back__link">{t("enrollSat.back")}</NavLink>
          </div>
          <span className="enroll-badge enroll-badge--soon">{t("enrollCommon.comingSoon")}</span>
          <h1 className="enroll-header__title">{t("enrollSat.title")}</h1>
          <p className="enroll-header__desc">{t("enrollSat.desc")}</p>
        </div>
      </section>

      <div className="sat-interest">
        {/* PROGRAM CARDS */}
        <div className="sat-interest__cards">
          {PROGRAM_CARDS.map((c) => (
            <button
              type="button"
              key={c.key}
              onClick={() => pickProgram(c.value)}
              className={`sat-program${form.programInterest === c.value ? " sat-program--active" : ""}`}
            >
              <div className="sat-program__head">
                <div className={`sat-program__icon sat-program__icon--${c.icon}`}>
                  {c.icon === "book" ? <BookIcon /> : <CalculatorIcon />}
                </div>
                <div>
                  <h3 className="sat-program__title">{t(`enrollSat.${c.key}Title`)}</h3>
                  <p className="sat-program__desc">{t(`enrollSat.${c.key}Desc`)}</p>
                </div>
              </div>
              <div className="sat-program__list">
                {tList(`enrollSat.${c.key}Bullets`).map((b) => (
                  <span key={b} className="sat-program__item"><span className="sat-program__check">✓</span>{b}</span>
                ))}
              </div>
            </button>
          ))}
        </div>

        {/* INTEREST FORM */}
        <form className="sat-form" onSubmit={submitInterest}>
          <div className="sat-form__grid">
            <label className="field field--full">
              <span className="field__label">{t("enrollSat.parentName")}</span>
              <input type="text" name="parentName" value={form.parentName ?? ""} onChange={onField} className="field__input" />
            </label>
            <label className="field">
              <span className="field__label">{t("enrollSat.email")}</span>
              <input type="email" name="email" placeholder={t("enrollSat.emailPlaceholder")} value={form.email ?? ""} onChange={onField} className="field__input" />
            </label>
            <label className="field">
              <span className="field__label">{t("enrollSat.childAgeGrade")}</span>
              <input type="text" name="childAgeGrade" placeholder={t("enrollSat.childAgeGradePlaceholder")} value={form.childAgeGrade ?? ""} onChange={onField} className="field__input" />
            </label>
            <label className="field field--full">
              <span className="field__label">{t("enrollSat.programInterest")}</span>
              <select name="programInterest" value={form.programInterest ?? ""} onChange={onField} className="field__input">
                <option value="">{t("enrollSat.programSelect")}</option>
                <option value="English Language Learning">{t("enrollSat.englishTitle")}</option>
                <option value="English-Led Math Enrichment">{t("enrollSat.mathTitle")}</option>
                <option value="Both">{t("enrollSat.programBoth")}</option>
              </select>
            </label>
            <label className="field field--full">
              <span className="field__label">
                {t("enrollSat.preferredTime")} <span className="field__optional">{t("enrollSat.optional")}</span>
              </span>
              <input type="text" name="preferredTime" placeholder={t("enrollSat.preferredTimePlaceholder")} value={form.preferredTime ?? ""} onChange={onField} className="field__input" />
            </label>
            <label className="field field--full">
              <span className="field__label">
                {t("enrollSat.comments")} <span className="field__optional">{t("enrollSat.optional")}</span>
              </span>
              <textarea name="comments" rows="4" value={form.comments ?? ""} onChange={onField} className="field__input field__input--area" />
            </label>
          </div>

          {error && <p className="sat-form__error">{t(`enrollSat.${error}`)}</p>}

          <button type="submit" className="btn-primary btn-primary--block">{t("enrollSat.submit")}</button>
          <p className="sat-form__note">{t("enrollSat.note")}</p>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default EnrollSaturday;
