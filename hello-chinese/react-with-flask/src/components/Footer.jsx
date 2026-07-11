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
            <span className="footer__brand-name">Hello Chinese</span>
          </div>
          <p className="footer__blurb">Helping American kids and teens build confidence and a lifelong love of Mandarin.</p>
        </div>

        <div className="footer__col">
          <div className="footer__col-head">Explore</div>
          <NavLink to="/About" className="footer__link">About Us</NavLink>
          <NavLink to="/Classes" className="footer__link">Class Introductions</NavLink>
          <NavLink to="/Calendar" className="footer__link">Calendar</NavLink>
          <NavLink to="/Book" className="footer__link">Book Class</NavLink>
        </div>

        <div className="footer__col">
          <div className="footer__col-head">Programs</div>
          <NavLink to="/Classes" className="footer__link">Mandarin Chinese</NavLink>
          <NavLink to="/Classes" className="footer__link">Math</NavLink>
          <NavLink to="/Classes" className="footer__link">Math + Chinese</NavLink>
        </div>

        <div className="footer__col">
          <div className="footer__col-head">Contact</div>
          <span className="footer__text">hello@hellochinese.com</span>
          <span className="footer__text">(800) 555-1234</span>
          <span className="footer__text">Mon–Sat · 9am–7pm</span>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer__bottom-inner">
          <span>© 2026 Hello Chinese Mandarin Academy. All rights reserved.</span>
          <span className="footer__zh">学而不厌 · 诲人不倦</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
