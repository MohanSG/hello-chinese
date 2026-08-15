import { NavLink } from "react-router-dom";
import logo from "../assets/logo-panda.png";
import { useLanguage } from "../i18n/LanguageContext";
import "../styles/variables.css";
import "./Footer.css";

const YOUTUBE_URL = "https://www.youtube.com/@HelloChinese-ow3dw";

function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="footer__grid">
        <div className="footer__brandblock">
          <div className="footer__brand">
            <img className="footer__logo" src={logo} alt="Hello Chinese panda logo" />
            <span className="footer__brand-text">
              <span className="footer__brand-name">Hello Chinese</span>
              <span className="footer__descriptor">{t("nav.brandSub")}</span>
            </span>
          </div>
          <p className="footer__tagline">{t("footer.tagline")}</p>
          <a className="footer__youtube" href={YOUTUBE_URL} target="_blank" rel="noreferrer">
            <span className="footer__youtube-icon" aria-hidden="true">
              <svg width="20" height="14" viewBox="0 0 24 17" fill="none">
                <path d="M23.5 2.7A3 3 0 0 0 21.4.6C19.6 0 12 0 12 0S4.4 0 2.6.6A3 3 0 0 0 .5 2.7 31 31 0 0 0 0 8.5c0 2 .2 3.9.5 5.8a3 3 0 0 0 2.1 2.1C4.4 17 12 17 12 17s7.6 0 9.4-.6a3 3 0 0 0 2.1-2.1c.3-1.9.5-3.8.5-5.8s-.2-3.9-.5-5.8Z" fill="currentColor" />
                <path d="M9.6 12.1 15.9 8.5 9.6 4.9v7.2Z" fill="#fff" />
              </svg>
            </span>
            {t("footer.youtube")}
            <span className="footer__youtube-caret" aria-hidden="true">›</span>
          </a>
        </div>

        <div className="footer__col">
          <div className="footer__col-head">{t("footer.exploreHead")}</div>
          <NavLink to="/" className="footer__link">{t("footer.linkPrograms")}</NavLink>
          <NavLink to="/FreeTrial" className="footer__link">{t("footer.linkTrial")}</NavLink>
          <a href="mailto:hello.nihao.chinese@gmail.com" className="footer__link">{t("footer.linkContact")}</a>
          <NavLink to="/Terms" className="footer__link">{t("footer.linkTerms")}</NavLink>
        </div>

        <div className="footer__col">
          <div className="footer__col-head">{t("footer.programsHead")}</div>
          <NavLink to="/Enroll/Sunday" className="footer__link">{t("footer.linkSunday")}</NavLink>
          <NavLink to="/Enroll/Saturday" className="footer__link">{t("footer.linkSaturday")}</NavLink>
          <NavLink to="/Enroll/Private" className="footer__link">{t("footer.linkPrivate")}</NavLink>
        </div>

        <div className="footer__col">
          <div className="footer__col-head">{t("footer.contactHead")}</div>
          <a href="mailto:hello.nihao.chinese@gmail.com" className="footer__contact">
            <span className="footer__contact-icon" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
                <path d="m3 6 9 6.5L21 6" />
              </svg>
            </span>
            hello.nihao.chinese@gmail.com
          </a>
          <a href="tel:3019195863" className="footer__contact">
            <span className="footer__contact-icon" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6 6L16.5 12l4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 3.5 5.2 2 2 0 0 1 5.5 3h1Z" />
              </svg>
            </span>
            301-919-5863
          </a>
          <span className="footer__contact footer__contact--static">
            <span className="footer__contact-icon" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11Z" />
                <circle cx="12" cy="10" r="2.6" />
              </svg>
            </span>
            <span>
              The Yard<br />700 Pennsylvania Ave. SE<br />Washington, DC 20003
            </span>
          </span>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer__bottom-inner">
          <span>{t("footer.rights")}</span>
          <span className="footer__bottom-right">
            <span className="footer__zh">从你好开始，与世界相见</span>
            <span className="footer__bottom-divider" aria-hidden="true">|</span>
            <span className="footer__bottom-en">Meet the World Through Chinese.</span>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
