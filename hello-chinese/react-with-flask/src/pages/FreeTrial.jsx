import { useState } from "react";
import { NavLink } from "react-router-dom";
import { apiRequest } from "../api/client";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useLanguage } from "../i18n/LanguageContext";
import "../styles/variables.css";
import "./FreeTrial.css";

/* Fall 2026 trial schedule — one Sunday per family.
   `blocked` marks a date that stays visible but is not selectable; `blockedKey`
   is its translation key. `month` and `label` are kept as English fallbacks —
   the page itself renders localized labels via tDate(). */
export const TRIAL_DATES = [
  {
    month: "September 2026",
    days: [
      { key: "2026-09-06", label: "Sep 6" },
      { key: "2026-09-13", label: "Sep 13" },
      { key: "2026-09-20", label: "Sep 20" },
      { key: "2026-09-27", label: "Sep 27" },
    ],
  },
  {
    month: "October 2026",
    days: [
      { key: "2026-10-04", label: "Oct 4" },
      { key: "2026-10-18", label: "Oct 18" },
      { key: "2026-10-25", label: "Oct 25" },
    ],
  },
  {
    month: "November 2026",
    days: [
      { key: "2026-11-08", label: "Nov 8" },
      { key: "2026-11-15", label: "Nov 15" },
      { key: "2026-11-22", label: "Nov 22", blocked: "YCT Test", blockedKey: "dateBlockedYct" },
    ],
  },
  {
    month: "December 2026",
    days: [
      { key: "2026-12-06", label: "Dec 6" },
      { key: "2026-12-13", label: "Dec 13" },
    ],
  },
];

// `value` is submitted and stored; `key` is the visible label.
const EXPERIENCE_OPTIONS = [
  { value: "none", key: "expNone" },
  { value: "lt1", key: "expUnder1" },
  { value: "1-2", key: "exp1to2" },
  { value: "3+", key: "exp3plus" },
];

// English labels go into the payload so your inbox reads the same either way.
const PREF_LABELS = {
  chinese: "Chinese Class Trial",
  tutoring: "Chinese Class + Tutoring Trial",
};

const PREF_KEYS = {
  chinese: "prefChinese",
  tutoring: "prefTutoring",
};

const EMPTY = {
  parentName: "", parentPhone: "", parentEmail: "",
  childName: "", childAge: "", experience: "",
  preference: "chinese", math: "", date: "", notes: "",
};

function FreeTrial() {
  const { t, tDate } = useLanguage();
  const [form, setForm] = useState(EMPTY);
  // Warnings are held as keys so they re-render in the active language.
  const [error, setError] = useState(null);
  const [sending, setSending] = useState(false);
  const [confirmation, setConfirmation] = useState(null);

  const set = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setError(null);
  };
  const pick = (field, value) => () => {
    setForm((f) => ({ ...f, [field]: value }));
    setError(null);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isPast = (key) => new Date(key + "T00:00:00") < today;

  const monthLabel = (m) => tDate(m.days[0].key, { year: "numeric", month: "long" });
  const dayLabel = (d) => tDate(d.key, { month: "short", day: "numeric" });

  // English label for the payload — your team reads this, so it stays fixed.
  const dateLabelEn = (() => {
    for (const m of TRIAL_DATES) {
      const hit = m.days.find((d) => d.key === form.date);
      if (hit) return `${hit.label}, ${m.month.split(" ")[1]}`;
    }
    return "";
  })();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.parentName.trim() || !form.parentPhone.trim() || !form.parentEmail.trim())
      return setError("warnParent");
    if (!form.childName.trim() || !form.childAge.trim() || !form.experience)
      return setError("warnChild");
    if (!form.date) return setError("warnDate");

    const payload = {
      type: "free-trial",
      parent: { name: form.parentName, phone: form.parentPhone, email: form.parentEmail },
      child: { name: form.childName, age: form.childAge, experience: form.experience },
      trialPreference: PREF_LABELS[form.preference],
      mathInterest: form.math === "yes" ? "Yes" : form.math === "no" ? "No" : "Not answered",
      trialDate: form.date,
      trialDateLabel: dateLabelEn,
      notes: form.notes,
    };

    setSending(true);
    try {
      await apiRequest("/trial-email", {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(payload),
      });
      // Stored as raw values, not finished sentences, so the confirmation screen
      // also follows a language switch.
      setConfirmation({
        name: form.parentName.trim().split(" ")[0] || t("freeTrial.confirmThere"),
        dateIso: form.date,
        childName: form.childName,
        childAge: form.childAge,
        preference: form.preference,
        math: form.math,
      });
      setError(null);
    } catch (err) {
      setError("warnSend");
    } finally {
      setSending(false);
    }
  };

  const startOver = () => {
    setForm(EMPTY);
    setConfirmation(null);
    setError(null);
  };

  return (
    <div className="trial-page">
      <NavBar />

      <div className="trial-shell">
          <div className="trial-back">
            <NavLink to="/" className="trial-back__link">
              <span aria-hidden="true">←</span> {t("freeTrial.back")}
            </NavLink>
          </div>

          <div className="trial-banner">
            <div className="trial-banner__watermark" aria-hidden="true">试</div>
            <div className="trial-banner__inner">
              <h1 className="trial-banner__title">{t("freeTrial.bannerTitle")}</h1>
              <p className="trial-banner__desc">
                {t("freeTrial.bannerDescLine1")}<br />{t("freeTrial.bannerDescLine2")}
              </p>
            </div>
          </div>

          {confirmation ? (
            <div className="trial-confirm">
              <div className="trial-confirm__check" aria-hidden="true">✓</div>
              <h2 className="trial-confirm__title">
                {t("freeTrial.confirmTitle", { name: confirmation.name })}
              </h2>
              <p className="trial-confirm__desc">
                {t("freeTrial.confirmDescPre")}{" "}
                <strong>{tDate(confirmation.dateIso, { year: "numeric", month: "long", day: "numeric" })}</strong>.
              </p>
              <div className="trial-confirm__summary">
                <div>
                  <strong>{t("freeTrial.confirmChild")}</strong>{" "}
                  {confirmation.childAge
                    ? t("freeTrial.confirmChildAge", { name: confirmation.childName, age: confirmation.childAge })
                    : confirmation.childName}
                </div>
                <div>
                  <strong>{t("freeTrial.confirmTrial")}</strong>{" "}
                  {t(`freeTrial.${PREF_KEYS[confirmation.preference]}`)}
                </div>
                <div>
                  <strong>{t("freeTrial.confirmMath")}</strong>{" "}
                  {confirmation.math === "yes"
                    ? t("freeTrial.yes")
                    : confirmation.math === "no"
                      ? t("freeTrial.no")
                      : t("freeTrial.mathNotAnswered")}
                </div>
              </div>
              <div className="trial-confirm__actions">
                <button type="button" className="trial-ghost-btn" onClick={startOver}>
                  {t("freeTrial.submitAnother")}
                </button>
                <NavLink to="/" className="trial-ghost-btn">{t("freeTrial.returnHome")}</NavLink>
              </div>
            </div>
          ) : (
            <form className="trial-form" onSubmit={handleSubmit} noValidate>
              {/* 1 — PARENT */}
              <section className="trial-section">
                <header className="trial-section__head">
                  <span className="trial-section__num">1</span>
                  <h2 className="trial-section__title">{t("freeTrial.step1")}</h2>
                </header>
                <div className="trial-grid trial-grid--3">
                  <label className="trial-field">
                    <span>{t("freeTrial.parentName")} <em>*</em></span>
                    <input value={form.parentName} onChange={set("parentName")} placeholder={t("freeTrial.parentNamePlaceholder")} />
                  </label>
                  <label className="trial-field">
                    <span>{t("freeTrial.phone")} <em>*</em></span>
                    <input value={form.parentPhone} onChange={set("parentPhone")} placeholder={t("freeTrial.phonePlaceholder")} />
                  </label>
                  <label className="trial-field">
                    <span>{t("freeTrial.email")} <em>*</em></span>
                    <input type="email" value={form.parentEmail} onChange={set("parentEmail")} placeholder={t("freeTrial.emailPlaceholder")} />
                  </label>
                </div>
              </section>

              <div className="trial-cols">
                <div className="trial-cols__left">
                  {/* 2 — CHILD */}
                  <section className="trial-section">
                    <header className="trial-section__head">
                      <span className="trial-section__num">2</span>
                      <h2 className="trial-section__title">{t("freeTrial.step2")}</h2>
                    </header>
                    <div className="trial-grid trial-grid--child">
                      <label className="trial-field">
                        <span>{t("freeTrial.childName")} <em>*</em></span>
                        <input value={form.childName} onChange={set("childName")} placeholder={t("freeTrial.childNamePlaceholder")} />
                      </label>
                      <label className="trial-field">
                        <span>{t("freeTrial.childAge")} <em>*</em></span>
                        <input value={form.childAge} onChange={set("childAge")} placeholder={t("freeTrial.childAgePlaceholder")} />
                      </label>
                    </div>
                    <label className="trial-field">
                      <span>{t("freeTrial.experience")} <em>*</em></span>
                      <select value={form.experience} onChange={set("experience")}>
                        <option value="">{t("freeTrial.experienceSelect")}</option>
                        {EXPERIENCE_OPTIONS.map((o) => (
                          <option key={o.value} value={o.value}>{t(`freeTrial.${o.key}`)}</option>
                        ))}
                      </select>
                    </label>
                  </section>

                  {/* 3 — TRIAL PREFERENCE */}
                  <section className="trial-section">
                    <header className="trial-section__head">
                      <span className="trial-section__num">3</span>
                      <h2 className="trial-section__title">{t("freeTrial.step3")}</h2>
                    </header>
                    <div className="trial-question">{t("freeTrial.step3Question")} <em>*</em></div>
                    <div className="trial-grid trial-grid--2">
                      {Object.keys(PREF_LABELS).map((value) => (
                        <button
                          key={value}
                          type="button"
                          className={`trial-option ${form.preference === value ? "is-active" : ""}`}
                          onClick={pick("preference", value)}
                          aria-pressed={form.preference === value}
                        >
                          <span className="trial-option__dot" aria-hidden="true" />
                          {t(`freeTrial.${PREF_KEYS[value]}`)}
                        </button>
                      ))}
                    </div>
                  </section>

                  {/* 4 — MATH INTEREST */}
                  <section className="trial-section">
                    <header className="trial-section__head">
                      <span className="trial-section__num">4</span>
                      <h2 className="trial-section__title">{t("freeTrial.step4")}</h2>
                    </header>
                    <div className="trial-question">{t("freeTrial.step4Question")}</div>
                    <div className="trial-grid trial-grid--2">
                      {["yes", "no"].map((v) => (
                        <button
                          key={v}
                          type="button"
                          className={`trial-option ${form.math === v ? "is-active" : ""}`}
                          onClick={pick("math", v)}
                          aria-pressed={form.math === v}
                        >
                          <span className="trial-option__dot" aria-hidden="true" />
                          {t(v === "yes" ? "freeTrial.yes" : "freeTrial.no")}
                        </button>
                      ))}
                    </div>
                    <p className="trial-note">{t("freeTrial.mathNote")}</p>
                  </section>
                </div>

                {/* 5 — TRIAL DATE */}
                <section className="trial-section trial-section--dates">
                  <header className="trial-section__head trial-section__head--split">
                    <div className="trial-section__head-left">
                      <span className="trial-section__num">5</span>
                      <h2 className="trial-section__title">{t("freeTrial.step5")}</h2>
                    </div>
                    <span className="trial-datecount">
                      {t("freeTrial.dateCount", { n: form.date ? 1 : 0 })}
                    </span>
                  </header>
                  <p className="trial-note trial-note--top">{t("freeTrial.dateHint")}</p>

                  {TRIAL_DATES.map((m) => (
                    <div className="trial-month" key={m.month}>
                      <div className="trial-month__label">{monthLabel(m)}</div>
                      <div className="trial-month__grid">
                        {m.days.map((d) => {
                          const past = isPast(d.key);
                          const disabled = !!d.blocked || past;
                          const selected = form.date === d.key;
                          const noteText = d.blockedKey
                            ? t(`freeTrial.${d.blockedKey}`)
                            : past
                              ? t("freeTrial.dateUnavailable")
                              : null;
                          return (
                            <button
                              key={d.key}
                              type="button"
                              disabled={disabled}
                              onClick={pick("date", d.key)}
                              className={`trial-date ${selected ? "is-selected" : ""} ${disabled ? "is-disabled" : ""}`}
                              aria-pressed={selected}
                            >
                              <span className="trial-date__dot" aria-hidden="true" />
                              <span className="trial-date__text">
                                <span className="trial-date__label">{dayLabel(d)}</span>
                                {noteText && <span className="trial-date__note">{noteText}</span>}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}

                  <p className="trial-legend">{t("freeTrial.dateLegend")}</p>
                </section>
              </div>

              {/* 6 — NOTES */}
              <section className="trial-section">
                <header className="trial-section__head">
                  <span className="trial-section__num">6</span>
                  <h2 className="trial-section__title">{t("freeTrial.step6")}</h2>
                </header>
                <div className="trial-question">{t("freeTrial.step6Question")}</div>
                <textarea
                  className="trial-textarea"
                  rows={3}
                  maxLength={500}
                  value={form.notes}
                  onChange={set("notes")}
                  placeholder={t("freeTrial.notesPlaceholder")}
                />
                <div className="trial-counter">{form.notes.length}/500</div>
              </section>

              <div className="trial-callout">
                <span className="trial-callout__icon" aria-hidden="true">🗓</span>
                <p>{t("freeTrial.callout")}</p>
              </div>

              {error && <div className="trial-error">{t(`freeTrial.${error}`)}</div>}

              <button type="submit" className="trial-submit" disabled={sending}>
                {sending ? t("freeTrial.sending") : t("freeTrial.submit")}
              </button>
            </form>
          )}
      </div>

      <Footer />
    </div>
  );
}

export default FreeTrial;
