import { NavLink } from "react-router-dom";
import logo from "../assets/logo-panda.png";
import "../styles/variables.css";
import "./NavBar.css";

function navLinkClass({ isActive }) {
  return "navbar__link" + (isActive ? " active" : "");
}

function NavBar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar__brand">
        <img className="navbar__logo" src={logo} alt="HelloChinese panda logo" />
        <span className="navbar__brand-text">
          <span className="navbar__brand-name">Hello Chinese</span>
          <span className="navbar__brand-sub">Mandarin Academy</span>
        </span>
      </NavLink>

      <div className="navbar__links">
        <NavLink to="/" end className={navLinkClass}>Home</NavLink>
        <NavLink to="/About" className={navLinkClass}>About Us</NavLink>
        <NavLink to="/Classes" className={navLinkClass}>Class Introductions</NavLink>
        <NavLink to="/Calendar" className={navLinkClass}>Calendar</NavLink>
        <NavLink to="/Book" className="navbar__cta">Book Class</NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
