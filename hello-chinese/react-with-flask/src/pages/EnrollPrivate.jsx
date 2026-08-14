import { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useLanguage } from "../i18n/LanguageContext";
import "../styles/variables.css";
import "./EnrollOverview.css";
import "./EnrollSaturday.css";
import "./EnrollPrivate.css";

const EMPTY_FORM = {
  parentName: "",
  email: "",
  phone: "",
  childName: "",
  dob: "",
  enrolled: "",
  currentClass: "",
  lessonType: "",
  lessonLength: "",
  format: "",
  preferredTime: "",
  specificTimes: "",
  experience: "",
  goals: "",
};

// `value` is what gets submitted — English on purpose, so the inquiry your team
// reads is identical whichever language the parent used. `key` points at the
// visible label in i18n/translations.js under enrollPrivate.
// Day order is column-interleaved for the two-column grid.
const DAYS = [
  { value: "Monday", key: "dayMonday" },
  { value: "Friday", key: "dayFriday" },
  { value: "Tuesday", key: "dayTuesday" },
  { value: "Saturday", key: "daySaturday" },
  { value: "Wednesday", key: "dayWednesday" },
  { value: "Sunday", key: "daySunday" },
  { value: "Thursday", key: "dayThursday" },
  { value: "Flexible", key: "dayFlexible" },
];

const EXPERIENCE = [
  { value: "No prior Chinese learning experience", key: "expNone" },
  { value: "Less than 1 year", key: "expUnder1" },
  { value: "1–2 years", key: "exp1to2" },
  { value: "3+ years", key: "exp3plus" },
];

const CURRENT_CLASSES = [
  { value: "Step-In Chinese (Ages 3-6+)", key: "classStepIn" },
  { value: "Step-Up Chinese (Ages 7-10)", key: "classStepUp" },
  { value: "Step-Beyond Chinese (Ages 10-12+)", key: "classStepBeyond" },
  { value: "Other / Not Sure", key: "classOther" },
];

const LENGTHS = [
  { value: "30 Minutes", key: "length30" },
  { value: "60 Minutes", key: "length60" },
  { value: "Not Sure - Please Recommend", key: "lengthUnsure" },
];

function ageFrom(dob) {
  if (!dob) return null;
  const b = new Date(`${dob}T00:00:00`);
  if (Number.isNaN(b.getTime())) return null;
  const now = new Date();
  let a = now.getFullYear() - b.getFullYear();
  const m = now.getMonth() - b.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < b.getDate())) a -= 1;
  return a >= 0 && a < 100 ? a : null;
}

function Step({ n, children }) {
  return (
    <div className="pstep">
      <span className="pstep__num">{n}</span>
      <h3 className="pstep__title">{children}</h3>
    </div>
  );
}

function EnrollPrivate() {
  const { t } = useLanguage();
  const [form, setForm] = useState(EMPTY_FORM);
  const [days, setDays] = useState([]);
  // Held as a key so the message follows a language switch.
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

  const age = useMemo(() => ageFrom(form.dob), [form.dob]);

  const onField = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]: value,
      // Leaving the group class clears the class pick that only applies to "Yes".
      ...(name === "enrolled" && value === "no" ? { currentClass: "" } : null),
    }));
    setError(null);
  };

  const onDayToggle = (e) => {
    const { value, checked } = e.target;
    setDays((d) => (checked ? [...d, value] : d.filter((x) => x !== value)));
    setError(null);
  };

  const submitInquiry = async (e) => {
    e.preventDefault();
    if (!form.parentName || !form.email || !form.phone || !form.childName || !form.dob) {
      setError("warnRequired");
      return;
    }
    if (!form.lessonType) {
      setError("warnLessonType");
      return;
    }
    if (!form.lessonLength) {
      setError("warnLessonLength");
      return;
    }
    const payload = {
      page: "private-lessons-inquiry",
      parentName: form.parentName,
      email: form.email,
      phone: form.phone,
      childName: form.childName,
      dob: form.dob,
      age,
      currentlyEnrolled: form.enrolled || null,
      currentClass: form.enrolled === "yes" ? form.currentClass || null : null,
      lessonType: form.lessonType,
      lessonLength: form.lessonLength,
      format: form.format || null,
      preferredDays: days,
      preferredTime: form.preferredTime || null,
      specificTimes: form.specificTimes || null,
      experience: form.experience || null,
      goals: form.goals || null,
      submittedAt: new Date().toISOString(),
    };
    // TODO: POST payload to the existing Hello Chinese enrollment/contact endpoint.
    console.log("Private lesson inquiry", payload);
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
            <div className="enroll-header__eyebrow">{t("enrollPrivate.doneEyebrow")}</div>
            <h1 className="enroll-header__title">{t("enrollPrivate.doneTitle", { name: submittedName })}</h1>
            <p className="enroll-header__desc enroll-confirm__desc">{t("enrollPrivate.doneDesc")}</p>
            <NavLink to="/" className="btn-primary">{t("enrollPrivate.doneCta")}</NavLink>
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
            <NavLink to="/" className="enroll-back__link">{t("enrollPrivate.back")}</NavLink>
          </div>
          <span className="enroll-badge enroll-badge--private">{t("enrollPrivate.badge")}</span>
          <h1 className="enroll-header__title">{t("enrollPrivate.title")}</h1>
          <p className="enroll-header__desc private-header__desc">{t("enrollPrivate.desc")}</p>
          <div className="private-tags">
            <span className="private-tag">{t("enrollPrivate.tagDays")}</span>
            <span className="private-tag">{t("enrollPrivate.tagFormat")}</span>
            <span className="private-tag">{t("enrollPrivate.tagOneOnOne")}</span>
          </div>
        </div>
      </section>

      <div className="sat-interest">
        <form className="sat-form pform" onSubmit={submitInquiry}>
          <div className="pform__head">
            <span className="pform__icon" aria-hidden="true">
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="8" r="3" />
                <path d="M3.5 19v-1.2A4.3 4.3 0 0 1 7.8 13.5h2.4A4.3 4.3 0 0 1 14.5 17.8V19" />
                <circle cx="17" cy="8.5" r="2.4" />
                <path d="M16 13.6h1.2A3.8 3.8 0 0 1 21 17.4V19" />
              </svg>
            </span>
            <h2 className="pform__title">{t("enrollPrivate.formTitle")}</h2>
          </div>
          <p className="pform__sub">{t("enrollPrivate.formSub")}</p>

          <aside className="pintro">
            <span className="pintro__icon" aria-hidden="true">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 6.5S10 4.8 6.2 4.8c-1 0-1.7.1-1.7.1v12.7s.7-.1 1.7-.1C10 17.5 12 19.2 12 19.2s2-1.7 5.8-1.7c1 0 1.7.1 1.7.1V4.9s-.7-.1-1.7-.1C14 4.8 12 6.5 12 6.5Z" />
                <path d="M12 6.5v12.7" />
              </svg>
            </span>
            <p>{t("enrollPrivate.intro")}</p>
          </aside>

          {/* 1 — PARENT & CHILD */}
          <Step n="1">{t("enrollPrivate.step1")}</Step>
          <div className="sat-form__grid pgrid">
            <label className="field">
              <span className="field__label">{t("enrollPrivate.parentName")} <b className="req">*</b></span>
              <input type="text" name="parentName" value={form.parentName} onChange={onField} className="field__input" />
            </label>
            <label className="field">
              <span className="field__label">{t("enrollPrivate.email")} <b className="req">*</b></span>
              <input type="email" name="email" placeholder={t("enrollPrivate.emailPlaceholder")} value={form.email} onChange={onField} className="field__input" />
            </label>
            <label className="field">
              <span className="field__label">{t("enrollPrivate.phone")} <b className="req">*</b></span>
              <input type="tel" name="phone" value={form.phone} onChange={onField} className="field__input" />
            </label>
            <label className="field">
              <span className="field__label">{t("enrollPrivate.childName")} <b className="req">*</b></span>
              <input type="text" name="childName" value={form.childName} onChange={onField} className="field__input" />
            </label>
            <label className="field">
              <span className="field__label">{t("enrollPrivate.dob")} <b className="req">*</b></span>
              <input type="date" name="dob" value={form.dob} onChange={onField} className="field__input" />
            </label>
            <div className="pdob">
              <span className="pdob__icon" aria-hidden="true">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <circle cx="12" cy="12" r="8.5" />
                  <path d="M9 10.5h.01M15 10.5h.01M9.2 15a3.6 3.6 0 0 0 5.6 0" />
                </svg>
              </span>
              <span>
                {age === null
                  ? t("enrollPrivate.dobHint")
                  : t("enrollPrivate.dobAge", { age })}
              </span>
            </div>
          </div>

          {/* 2 — CURRENTLY ENROLLED */}
          <Step n="2">{t("enrollPrivate.step2")}</Step>
          <div className="sat-form__grid pgrid">
            <div className="pradios">
              <label className="pradio">
                <input type="radio" name="enrolled" value="yes" checked={form.enrolled === "yes"} onChange={onField} />
                <span>
                  <span className="pradio__label">{t("enrollPrivate.enrolledYes")}</span>
                  <span className="pradio__desc">{t("enrollPrivate.enrolledYesDesc")}</span>
                </span>
              </label>
              <label className="pradio">
                <input type="radio" name="enrolled" value="no" checked={form.enrolled === "no"} onChange={onField} />
                <span>
                  <span className="pradio__label">{t("enrollPrivate.enrolledNo")}</span>
                  <span className="pradio__desc">{t("enrollPrivate.enrolledNoDesc")}</span>
                </span>
              </label>
            </div>
            {form.enrolled === "yes" && (
              <div className="ppanel">
                <div className="ppanel__title">{t("enrollPrivate.whichClass")}</div>
                <div className="ppanel__list">
                  {CURRENT_CLASSES.map((c) => (
                    <label className="prow" key={c.value}>
                      <input type="radio" name="currentClass" value={c.value} checked={form.currentClass === c.value} onChange={onField} />
                      {t(`enrollPrivate.${c.key}`)}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 3 — WHAT ARE YOU LOOKING FOR */}
          <Step n="3">{t("enrollPrivate.step3")} <b className="req">*</b></Step>
          <div className="sat-form__grid pgrid">
            <label className="pcard pcard--a">
              <input type="radio" name="lessonType" value="Group Class Reinforcement" checked={form.lessonType === "Group Class Reinforcement"} onChange={onField} />
              <span>
                <span className="pcard__head">
                  <span className="pcard__icon" aria-hidden="true">
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3.5l1.9 3.9 4.3.6-3.1 3 .8 4.3L12 13.3l-3.9 2 .8-4.3-3.1-3 4.3-.6L12 3.5Z" />
                    </svg>
                  </span>
                  <span className="pcard__title">{t("enrollPrivate.optionATitle")}</span>
                </span>
                <span className="pcard__desc">{t("enrollPrivate.optionADesc")}</span>
              </span>
            </label>
            <label className="pcard pcard--b">
              <input type="radio" name="lessonType" value="Standalone One-on-One Chinese" checked={form.lessonType === "Standalone One-on-One Chinese"} onChange={onField} />
              <span>
                <span className="pcard__head">
                  <span className="pcard__icon" aria-hidden="true">
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 14.5a2.5 2.5 0 0 1-2.5 2.5H9l-4 3V6.5A2.5 2.5 0 0 1 7.5 4h10A2.5 2.5 0 0 1 20 6.5v8Z" />
                    </svg>
                  </span>
                  <span className="pcard__title">{t("enrollPrivate.optionBTitle")}</span>
                </span>
                <span className="pcard__desc">{t("enrollPrivate.optionBDesc")}</span>
              </span>
            </label>
          </div>

          {/* 4 + 5 */}
          <div className="pcols">
            <div>
              <Step n="4">{t("enrollPrivate.step4")}</Step>
              <div className="field__label pblocklabel">
                {t("enrollPrivate.lessonLength")} <b className="req">*</b>
              </div>
              <div className="pchips">
                {LENGTHS.map((l) => (
                  <label className="pchip" key={l.value}>
                    <input type="radio" name="lessonLength" value={l.value} checked={form.lessonLength === l.value} onChange={onField} />
                    {t(`enrollPrivate.${l.key}`)}
                  </label>
                ))}
              </div>
              <label className="field">
                <span className="field__label field__label--split">
                  <span>{t("enrollPrivate.format")}</span>
                  <span className="field__optional">{t("enrollPrivate.optional")}</span>
                </span>
                <select name="format" value={form.format} onChange={onField} className="field__input">
                  <option value="">{t("enrollPrivate.formatNone")}</option>
                  <option value="Online">{t("enrollPrivate.formatOnline")}</option>
                  <option value="In person">{t("enrollPrivate.formatInPerson")}</option>
                </select>
              </label>
            </div>

            <div>
              <Step n="5">{t("enrollPrivate.step5")}</Step>
              <div className="field__label pblocklabel">
                {t("enrollPrivate.preferredDays")}{" "}
                <span className="field__optional">{t("enrollPrivate.selectAllApply")}</span>
              </div>
              <div className="pdays">
                {DAYS.map((d) => (
                  <label className="prow" key={d.value}>
                    <input type="checkbox" value={d.value} checked={days.includes(d.value)} onChange={onDayToggle} />
                    {t(`enrollPrivate.${d.key}`)}
                  </label>
                ))}
              </div>
              <label className="field">
                <span className="field__label field__label--split">
                  <span>{t("enrollPrivate.preferredTime")}</span>
                  <span className="field__optional">{t("enrollPrivate.optional")}</span>
                </span>
                <select name="preferredTime" value={form.preferredTime} onChange={onField} className="field__input">
                  <option value="">{t("enrollPrivate.formatNone")}</option>
                  <option value="Morning (before 12 PM)">{t("enrollPrivate.timeMorning")}</option>
                  <option value="Early afternoon (12-3 PM)">{t("enrollPrivate.timeEarlyAfternoon")}</option>
                  <option value="Late afternoon (3-6 PM)">{t("enrollPrivate.timeLateAfternoon")}</option>
                  <option value="Evening (after 6 PM)">{t("enrollPrivate.timeEvening")}</option>
                </select>
              </label>
              <label className="field">
                <span className="field__label field__label--split">
                  <span>{t("enrollPrivate.specificTimes")}</span>
                  <span className="field__optional">{t("enrollPrivate.optional")}</span>
                </span>
                <input
                  type="text"
                  name="specificTimes"
                  placeholder={t("enrollPrivate.specificTimesPlaceholder")}
                  value={form.specificTimes}
                  onChange={onField}
                  className="field__input"
                />
              </label>
            </div>
          </div>

          {/* 6 + 7 */}
          <div className="pcols">
            <div>
              <Step n="6">{t("enrollPrivate.step6")}</Step>
              <div className="ppanel__list">
                {EXPERIENCE.map((x) => (
                  <label className="prow" key={x.value}>
                    <input type="radio" name="experience" value={x.value} checked={form.experience === x.value} onChange={onField} />
                    {t(`enrollPrivate.${x.key}`)}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <Step n="7">
                {t("enrollPrivate.step7")} <span className="field__optional">{t("enrollPrivate.optional")}</span>
              </Step>
              <textarea
                name="goals"
                rows="5"
                placeholder={t("enrollPrivate.goalsPlaceholder")}
                value={form.goals}
                onChange={onField}
                className="field__input field__input--area pgoals"
              />
            </div>
          </div>

          {error && <p className="sat-form__error">{t(`enrollPrivate.${error}`)}</p>}

          <button type="submit" className="psubmit">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 3 10.5 13.5" />
              <path d="M21 3l-6.8 18-3.7-7.5L3 9.8 21 3Z" />
            </svg>
            {t("enrollPrivate.submit")}
          </button>

          <div className="pfoot">
            <p className="pfoot__note">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <rect x="4.5" y="10.5" width="15" height="10" rx="2.2" />
                <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
              </svg>
              {t("enrollPrivate.footNote")}
            </p>
            <div className="pfoot__brand">
              <img src="/assets/logo-panda.png" alt="Hello Chinese" />
              <span>
                <span className="pfoot__name">Hello Chinese</span>
                <span className="pfoot__tag">{t("enrollPrivate.brandTag")}</span>
              </span>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default EnrollPrivate;
