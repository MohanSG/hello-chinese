import { NavLink } from "react-router-dom";
import logo from "../assets/logo-panda.png";
import "../styles/variables.css";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__grid">
        <div>
          <div className="footer__brand">
            <img className="footer__logo" src={logo} alt="HelloChinese panda logo" />
            <span className="footer__brand-name">HelloChinese</span>
          </div>
          <p className="footer__blurb">Helping Washington, D.C.-area kids build confidence and a lifelong love of Mandarin.</p>
        </div>

        <div className="footer__col">
          <div className="footer__col-head">Explore</div>
          <NavLink to="/About" className="footer__link">About Us</NavLink>
          <NavLink to="/Classes" className="footer__link">Programs</NavLink>
          <NavLink to="/Calendar" className="footer__link">Calendar</NavLink>
          <NavLink to="/Book" className="footer__link">Book a Free Trial</NavLink>
        </div>

        <div className="footer__col">
          <div className="footer__col-head">Programs</div>
          <NavLink to="/Classes" className="footer__link">Step-In</NavLink>
          <NavLink to="/Classes" className="footer__link">Step-Up</NavLink>
          <NavLink to="/Classes" className="footer__link">Step-Beyond</NavLink>
          <NavLink to="/Classes" className="footer__link">Tutoring</NavLink>
          <NavLink to="/Classes" className="footer__link">Math Enrichment</NavLink>
          <NavLink to="/Classes" className="footer__link">Private Chinese Lessons</NavLink>
        </div>

        <div className="footer__col">
          <div className="footer__col-head">Contact</div>
          <span className="footer__text">hello@hellochinese.com</span>
          <span className="footer__text">(800) 555-1234</span>
          <span className="footer__text">The Yard (Eastern Market)<br />700 Pennsylvania Ave. SE<br />Washington, DC 20003</span>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer__bottom-inner">
          <span>© 2026 HelloChinese Mandarin Academy. All rights reserved.</span>
          <span className="footer__zh">学而不厌 · 诲人不倦</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
