import { NavLink } from "react-router-dom";
import logo from "../assets/logo-panda.png";
import { useLanguage } from "../i18n/LanguageContext";
import "../styles/variables.css";
import "./NavBar.css";

function navLinkClass({ isActive }) {
  return "navbar__link" + (isActive ? " active" : "");
}

function NavBar() {
  const { lang, toggleLang, t } = useLanguage();

  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar__brand">
        <img className="navbar__logo" src={logo} alt="HelloChinese panda logo" />
        <span className="navbar__brand-text">
          <span className="navbar__brand-name">Hello Chinese</span>
          <span className="navbar__brand-sub">{t("nav.brandSub")}</span>
        </span>
      </NavLink>

      <div className="navbar__links">
        {/* <NavLink to="/" end className={navLinkClass}>{t("nav.home")}</NavLink>
        <NavLink to="/About" className={navLinkClass}>About Us</NavLink>
        <NavLink to="/Classes" className={navLinkClass}>{t("nav.classes")}</NavLink>
        <NavLink to="/Calendar" className={navLinkClass}>{t("nav.calendar")}</NavLink> */}
        <NavLink to="/Enroll" className={navLinkClass}>Enroll</NavLink>
        <button type="button" className="navbar__lang" onClick={toggleLang} aria-label="Switch language">
          {lang === "en" ? "中文" : "EN"}
        </button>
        {/* <NavLink to="/Book" className="navbar__cta">{t("nav.bookCta")}</NavLink> */}
      </div>
    </nav>
  );
}

export default NavBar;
