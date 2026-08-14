import { NavLink } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useLanguage } from "../i18n/LanguageContext";
import "../styles/variables.css";
import "./EnrollOverview.css";
import "./EnrollSaturday.css";
import "./EnrollSunday.css";

// Copy lives in i18n/translations.js under enrollSunday — this array carries
// only the route, the colour tone, and the key prefix.
const LEVELS = [
  { key: "stepIn", tone: "green", to: "/Enroll/Step-In" },
  { key: "stepUp", tone: "blue", to: "/Enroll/Step-Up" },
  { key: "stepBeyond", tone: "purple", to: "/Enroll/Step-Beyond" },
];

function PeopleIcon() {
  return (
    <svg width="25" height="25" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="9" cy="8.5" r="3.2" stroke="#d98b25" strokeWidth="1.7" />
      <circle cx="16.5" cy="9.5" r="2.4" stroke="#d98b25" strokeWidth="1.7" />
      <path d="M3.5 19c0-2.9 2.5-4.6 5.5-4.6s5.5 1.7 5.5 4.6" stroke="#d98b25" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M16.5 14.6c2.3.2 4 1.7 4 4.4" stroke="#d98b25" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" stroke="#a72620" strokeWidth="1.6" />
      <path d="M3.5 9.5h17M8 3.5v3M16 3.5v3" stroke="#a72620" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function EnrollSunday() {
  const { t, tList } = useLanguage();

  return (
    <div className="enroll-overview">
      <NavBar />

      {/* HEADER */}
      <section className="enroll-header">
        <div className="enroll-header__inner">
          <div className="enroll-back">
            <NavLink to="/" className="enroll-back__link">{t("enrollCommon.backToPrograms")}</NavLink>
          </div>
          <span className="enroll-badge enroll-badge--live">{t("enrollCommon.nowEnrolling")}</span>
          <h1 className="enroll-header__title">{t("enrollSunday.title")}</h1>
          <p className="enroll-header__desc">{t("enrollSunday.desc")}</p>
        </div>
      </section>

      <section className="sun-detail">
        <div className="sun-detail__container">
          <div className="sun-detail__head">
            <span className="sun-detail__zh">{t("enrollSunday.pathwayEyebrow")}</span>
            <h2 className="sun-detail__title">{t("enrollSunday.pathwayTitle")}</h2>
          </div>

          <div className="sun-rows">
            {/* LEVEL ROWS */}
            {LEVELS.map((lvl) => (
              <div key={lvl.key} className={`sun-row sun-row--${lvl.tone}`}>
                <div className={`sun-row__badge sun-row__badge--${lvl.tone}`}>
                  {t(`enrollSunday.${lvl.key}Badge`)}
                </div>
                <div>
                  <div className={`sun-row__title sun-row__title--${lvl.tone}`}>
                    {t(`enrollSunday.${lvl.key}Title`)}
                  </div>
                  <div className="sun-row__age">{t(`enrollSunday.${lvl.key}Age`)}</div>
                </div>
                <div className="sun-row__time"><CalendarIcon />{t(`enrollSunday.${lvl.key}Time`)}</div>
                <p className="sun-row__desc">{t(`enrollSunday.${lvl.key}Desc`)}</p>
                <NavLink to={lvl.to} className="sun-row__cta">{t("enrollCommon.viewPlans")}</NavLink>
              </div>
            ))}

            {/* LEARNING SUPPORT — subordinate to the pathway */}
            <div className="sun-row sun-row--support">
              <div className="sun-row__badge sun-row__badge--icon"><PeopleIcon /></div>
              <div>
                <div className="sun-row__eyebrow sun-row__eyebrow--brand">
                  {t("enrollSunday.supportEyebrow")}
                </div>
                <div className="sun-row__title">{t("enrollSunday.supportTitle")}</div>
                <div className="sun-row__age">{t("enrollSunday.supportDesc")}</div>
              </div>
              <div className="sun-row__checks">
                {tList("enrollSunday.supportBullets").map((b) => (
                  <span key={b} className="sun-row__check"><span className="sun-row__tick">✓</span>{b}</span>
                ))}
              </div>
            </div>

            {/* MATH ENRICHMENT — independent */}
            <div className="sun-row sun-row--math">
              <div className="sun-row__badge sun-row__badge--blue">{t("enrollSunday.mathBadge")}</div>
              <div>
                <div className="sun-row__eyebrow">{t("enrollSunday.mathEyebrow")}</div>
                <div className="sun-row__title sun-row__title--blue">{t("enrollSunday.mathTitle")}</div>
                <div className="sun-row__age">{t("enrollSunday.mathTeacher")}</div>
              </div>
              <div className="sun-row__time"><CalendarIcon />{t("enrollSunday.mathTime")}</div>
              <p className="sun-row__desc">{t("enrollSunday.mathDesc")}</p>
              <NavLink to="/Enroll/Step-In" className="sun-row__cta sun-row__cta--ghost">
                {t("enrollCommon.viewPlans")}
              </NavLink>
            </div>

            {/* NEXT STEP */}
            <div className="sun-next">
              <span>
                <strong>{t("enrollCommon.nextStepLabel")}</strong> {t("enrollSunday.nextStep")}
              </span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default EnrollSunday;
