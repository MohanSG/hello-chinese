import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LegalContent from "./LegalContent";
import { LEGAL_EFFECTIVE_DATE, LEGAL_CONTACT } from "../data/legal";
import { useLanguage } from "../i18n/LanguageContext";
import "./LegalModal.css";

// initialTab decides which document opens; the parent passes "terms" or
// "privacy" depending on which link was clicked. onAgree is optional: when
// present, the primary button ticks the caller's checkbox and closes.
export default function LegalModal({ initialTab = "terms", onClose, onAgree }) {
  const { t } = useLanguage();
  const [tab, setTab] = useState(initialTab);

  useEffect(() => setTab(initialTab), [initialTab]);

  // Escape closes, and the page behind cannot scroll while the modal is up.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  return (
    <div className="legalmodal" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="legalmodal__panel" onClick={(e) => e.stopPropagation()}>
        <div className="legalmodal__head">
          <div>
            <h2 className="legalmodal__title">{t("legal.title")}</h2>
            <div className="legalmodal__date">
              {t("legal.effective", { date: LEGAL_EFFECTIVE_DATE })}
            </div>
          </div>
          <button
            type="button"
            className="legalmodal__close"
            aria-label={t("legal.close")}
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="legalmodal__tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={tab === "terms"}
            className={
              "legalmodal__tab" + (tab === "terms" ? " legalmodal__tab--on" : "")
            }
            onClick={() => setTab("terms")}
          >
            {t("legal.termsTab")}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "privacy"}
            className={
              "legalmodal__tab" + (tab === "privacy" ? " legalmodal__tab--on" : "")
            }
            onClick={() => setTab("privacy")}
          >
            {t("legal.privacyTab")}
          </button>
        </div>

        <div className="legalmodal__body">
          {tab === "terms" && (
            <p className="legalmodal__lede">{t("legal.agreement")}</p>
          )}
          <LegalContent part={tab} headingLevel="h3" />
          {tab === "privacy" && (
            <p className="legalmodal__contact">
              {t("legal.contactLine")}{" "}
              <a href={"mailto:" + LEGAL_CONTACT.email}>{LEGAL_CONTACT.email}</a>
            </p>
          )}
        </div>

        <div className="legalmodal__foot">
          <Link className="legalmodal__fulllink" to="/Terms" target="_blank">
            {t("legal.openFull")}
          </Link>
          <div className="legalmodal__actions">
            <button type="button" className="legalmodal__ghost" onClick={onClose}>
              {t("legal.close")}
            </button>
            {onAgree && (
              <button type="button" className="legalmodal__primary" onClick={onAgree}>
                {t("legal.agree")}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
