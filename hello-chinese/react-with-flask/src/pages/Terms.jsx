import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import LegalContent from "../components/LegalContent";
import {
  LEGAL_EFFECTIVE_DATE,
  LEGAL_SCOPE,
  LEGAL_AGREEMENT,
  LEGAL_CONTACT,
  pick,
} from "../data/legal";
import { NavLink } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext";
import "./Terms.css";

export default function Terms() {
  const { t, lang } = useLanguage();

  return (
    <>
      <NavBar />
      <main className="legal">
        <header className="legal__hero">
          <div className="legal__hero-inner">
            <div className="enroll-back">
              <NavLink to="/" className="enroll-back__link">
                {t("enrollCommon.backToPrograms")}
              </NavLink>
            </div>
            <div className="legal__eyebrow">{t("legal.eyebrow")}</div>
            <h1 className="legal__title">{t("legal.title")}</h1>
            <p className="legal__scope">{pick(LEGAL_SCOPE, lang)}</p>
            <div className="legal__badge">
              <span className="legal__badge-dot" aria-hidden="true" />
              {t("legal.effective", { date: LEGAL_EFFECTIVE_DATE })}
            </div>
          </div>
        </header>

        <div className="legal__grid">
          <nav className="legal__toc" aria-label={t("legal.tocHead")}>
            <div className="legal__toc-head">{t("legal.tocHead")}</div>
            <a className="legal__toc-link" href="#terms">{t("legal.partOne")}</a>
            <a className="legal__toc-link" href="#privacy">{t("legal.partTwo")}</a>
            <a className="legal__toc-link" href="#contact">{t("legal.contactHead")}</a>
          </nav>

          <article className="legal__body">
            <p className="legal__agreement">{pick(LEGAL_AGREEMENT, lang)}</p>

            <h2 className="legal__part" id="terms">{t("legal.partOne")}</h2>
            <div className="legal__rule" />
            <LegalContent part="terms" />

            <h2 className="legal__part" id="privacy">{t("legal.partTwo")}</h2>
            <div className="legal__rule" />
            <LegalContent part="privacy" />

            <div className="legal__contact" id="contact">
              <div className="legal__contact-head">{t("legal.contactLead")}</div>
              <div className="legal__contact-name">{LEGAL_CONTACT.name}</div>
              <div className="legal__contact-line">{pick(LEGAL_CONTACT.address, lang)}</div>
              <a
                className="legal__contact-email"
                href={"mailto:" + LEGAL_CONTACT.email}
              >
                {LEGAL_CONTACT.email}
              </a>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
