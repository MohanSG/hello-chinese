import { NavLink } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useLanguage } from "../i18n/LanguageContext";
import "../styles/variables.css";
import "./EnrollOverview.css";

// Mobile priority: the free trial comes first for new families, then Sunday
// (enrolling now), Saturday (interest list), and Private lessons.
// Copy lives in i18n/translations.js under enrollOverview — this array carries
// only the route, the visual variant, and the key prefix.
const PROGRAMS = [
  { key: "sunday", to: "/Enroll/Sunday", variant: "live", badgeKey: "nowEnrolling" },
  { key: "saturday", to: "/Enroll/Saturday", variant: "soon", badgeKey: "comingSoon" },
  { key: "private", to: "/Enroll/Private", variant: "private", badgeKey: "flexibleSchedule" },
];

function EnrollOverview() {
  const { t, tList } = useLanguage();

  return (
    <div className="enroll-overview">
      <NavBar />

      {/* Part 1 — warm, brand-led hero (replaces the old dark header band) */}
      <section className="enroll-hero">
        <div className="enroll-hero__art" aria-hidden="true" />
        <div className="enroll-hero__scrim" aria-hidden="true" />
        <div className="enroll-hero__inner">
          <div className="enroll-hero__copy">
            <div className="enroll-hero__eyebrow">{t("enrollOverview.eyebrow")}</div>
            <h1 className="enroll-hero__title">
              {t("enrollOverview.titleLine1")}<br />
              <span className="enroll-hero__title-accent">{t("enrollOverview.titleAccent")}</span>{" "}
              {t("enrollOverview.titleLine2")}
            </h1>
            <p className="enroll-hero__desc">{t("enrollOverview.desc")}</p>
            <div className="enroll-hero__actions">
              <NavLink to="/Enroll/Sunday" className="enroll-hero__cta enroll-hero__cta--primary">
                {t("enrollOverview.ctaSunday")} <span aria-hidden="true">→</span>
              </NavLink>
              <NavLink to="/FreeTrial" className="enroll-hero__cta enroll-hero__cta--secondary">
                {t("enrollOverview.ctaTrial")} <span aria-hidden="true">→</span>
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      <section className="enroll-programs">
        <div className="enroll-programs__container">
          <div className="trial">
            <div className="trial__watermark" aria-hidden="true">试</div>
            <div className="trial__inner">
              <h2 className="trial__title">{t("enrollOverview.trialTitle")}</h2>
              <p className="trial__desc">{t("enrollOverview.trialDesc")}</p>
              <NavLink to="/FreeTrial" className="trial__cta">
                {t("enrollOverview.trialCta")}
              </NavLink>
            </div>
          </div>

          <div className="enroll-divider">
            <span className="enroll-divider__rule" aria-hidden="true" />
            <span className="enroll-divider__text">{t("enrollOverview.divider")}</span>
            <span className="enroll-divider__rule" aria-hidden="true" />
          </div>

          <div className="enroll-programs__grid">
            {PROGRAMS.map((p) => (
              <NavLink key={p.key} to={p.to} className={`program-card program-card--${p.variant}`}>
                <span className={`program-card__badge program-card__badge--${p.variant}`}>
                  {t(`enrollCommon.${p.badgeKey}`)}
                </span>
                <h2 className="program-card__title">{t(`enrollOverview.${p.key}Title`)}</h2>
                <ul className="program-card__list">
                  {tList(`enrollOverview.${p.key}Bullets`).map((b) => (
                    <li key={b} className="program-card__item">
                      <span className="program-card__check" aria-hidden="true">✓</span>
                      {b}
                    </li>
                  ))}
                </ul>
                <span className={`program-card__cta program-card__cta--${p.variant}`}>
                  {t(`enrollOverview.${p.key}Cta`)} <span aria-hidden="true">→</span>
                </span>
              </NavLink>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default EnrollOverview;
