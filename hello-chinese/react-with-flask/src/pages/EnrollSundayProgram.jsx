import { NavLink, useSearchParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useLanguage } from "../i18n/LanguageContext";
import "../styles/variables.css";
import "./EnrollOverview.css";
import "./EnrollSaturday.css";
import { LEVEL_ICONS, MathIcon, PathwayIcon } from "../components/EnrollIcons";
import "./EnrollSundayProgram.css";

// Copy lives in i18n/translations.js under enrollSundayProgram — this array
// carries only the route, the colour tone, the icon key and the key prefix.
const LEVELS = [
  { key: "stepIn", iconKey: "stepin", tone: "green", to: "/Enroll/Step-In" },
  { key: "stepUp", iconKey: "stepup", tone: "blue", to: "/Enroll/Step-Up" },
  { key: "stepBeyond", iconKey: "stepbeyond", tone: "purple", to: "/Enroll/Step-Beyond" },
];

// Support layers onto any level; math is an independent course, so it never
// uses the Step-In / Step-Up / Step-Beyond names.
const SUPPORT_FEATURES = ["supportFeature1", "supportFeature2", "supportFeature3"];

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

function EnrollSundayProgram() {
  const [search] = useSearchParams();
  const { t, tList } = useLanguage();
  const childNo = Number(search.get("child")) || 1;
  const childQuery = childNo > 1 ? `?child=${childNo}` : "";

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
          {childNo > 1 && (
            <div className="enroll-childbanner">
              <span className="enroll-childnum">{childNo}</span>
              {t("enrollSundayProgram.childBanner", { n: childNo })}
            </div>
          )}
          <h1 className="enroll-header__title">{t("enrollSunday.title")}</h1>
          <p className="enroll-header__desc">{t("enrollSunday.desc")}</p>
        </div>
      </section>

      <section className="sun-detail">
        <div className="sun-detail__container">
          <div className="sun-detail__head">
            <span className="sun-detail__icon" aria-hidden="true"><PathwayIcon /></span>
            <h2 className="sun-detail__title">{t("enrollSundayProgram.pathwayTitle")}</h2>
          </div>
          <p className="sun-detail__intro">{t("enrollSundayProgram.pathwayIntro")}</p>

          <div className="sun-rows">
            {/* LEVEL ROWS */}
            {LEVELS.map((lvl) => (
              <div key={lvl.key} className={`sun-row sun-row--${lvl.tone}`}>
                <div className={`sun-row__badge sun-row__badge--${lvl.tone}`}>
                  {(() => { const Icon = LEVEL_ICONS[lvl.iconKey]; return Icon ? <Icon /> : null; })()}
                </div>
                <div>
                  <div className={`sun-row__title sun-row__title--${lvl.tone}`}>
                    {t(`enrollSundayProgram.${lvl.key}Title`)}
                  </div>
                  <div className={`sun-row__subtitle sun-row__subtitle--${lvl.tone}`}>
                    {t(`enrollSundayProgram.${lvl.key}Subtitle`)}
                  </div>
                  <div className="sun-row__age">{t(`enrollSundayProgram.${lvl.key}Age`)}</div>
                </div>
                <div className="sun-row__time">
                  <CalendarIcon />{t(`enrollSundayProgram.${lvl.key}Time`)}
                </div>
                <p className="sun-row__desc">{t(`enrollSundayProgram.${lvl.key}Desc`)}</p>
                <NavLink to={lvl.to + childQuery} className="sun-row__cta">
                  {t("enrollSundayProgram.choosePlan")}
                </NavLink>
              </div>
            ))}

            {/* LEARNING SUPPORT — subordinate to the pathway */}
            <div className="sun-row sun-row--support">
              <div className="sun-row__badge sun-row__badge--icon"><PeopleIcon /></div>
              <div>
                <div className="sun-row__eyebrow sun-row__eyebrow--brand">
                  {t("enrollSundayProgram.supportEyebrow")}
                </div>
                <div className="sun-row__title">{t("enrollSundayProgram.supportTitle")}</div>
                <div className="sun-row__subtitle sun-row__subtitle--amber">
                  {t("enrollSundayProgram.supportSubtitle")}
                </div>
                <div className="sun-row__age">{t("enrollSundayProgram.supportDesc")}</div>
              </div>
              <div className="sun-row__features">
                {SUPPORT_FEATURES.map((f) => (
                  <div key={f} className="sun-feature">
                    <span className="sun-feature__tick sun-feature__tick--amber" aria-hidden="true">✓</span>
                    <span>
                      <span className="sun-feature__title">{t(`enrollSundayProgram.${f}Title`)}</span>
                      <span className="sun-feature__desc">{t(`enrollSundayProgram.${f}Desc`)}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* MATH ENRICHMENT — independent */}
            <div className="sun-row sun-row--math">
              <div className="sun-row__badge sun-row__badge--blue"><MathIcon /></div>
              <div>
                <div className="sun-row__title sun-row__title--blue">{t("enrollSundayProgram.mathTitle")}</div>
                <div className="sun-row__subtitle sun-row__subtitle--blue">
                  {t("enrollSundayProgram.mathSubtitle")}
                </div>
                <div className="sun-row__age">{t("enrollSundayProgram.mathAge")}</div>
              </div>
              <div className="sun-row__time"><CalendarIcon />{t("enrollSundayProgram.mathTime")}</div>
              <div>
                <p className="sun-row__desc sun-row__desc--tight">{t("enrollSundayProgram.mathDesc")}</p>
                <div className="sun-row__ticks">
                  {tList("enrollSundayProgram.mathTicks").map((tick) => (
                    <div key={tick} className="sun-tick">
                      <span className="sun-tick__mark" aria-hidden="true">✓</span><span>{tick}</span>
                    </div>
                  ))}
                </div>
              </div>
              <NavLink to={"/enroll/math" + childQuery} className="sun-row__cta sun-row__cta--ghost">
                {t("enrollSundayProgram.choosePlan")}
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

export default EnrollSundayProgram;
