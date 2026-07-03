import { NavLink } from "react-router-dom";
import logo from "../assets/logo-panda.png";

const linkStyle = {
  padding: "9px 13px",
  borderRadius: "9px",
  fontSize: "14.5px",
  fontWeight: 500,
  color: "#4a4238",
  textDecoration: "none",
};

function NavBar() {
  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "24px",
        padding: "14px clamp(20px,5vw,56px)",
        background: "rgba(246,241,232,.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(42,35,27,.09)",
        fontFamily: "'Hanken Grotesk', system-ui, sans-serif",
      }}
    >
      <NavLink to="/" style={{ display: "flex", alignItems: "center", gap: "11px", textDecoration: "none" }}>
        <img
          src={logo}
          alt="HelloChinese panda logo"
          style={{ width: "48px", height: "48px", borderRadius: "999px", objectFit: "cover", boxShadow: "0 4px 14px rgba(194,58,43,.24)" }}
        />
        <span style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
          <span style={{ fontFamily: "'Newsreader', serif", fontSize: "21px", fontWeight: 600, color: "#2a231b", letterSpacing: "-.2px" }}>
            HelloChinese
          </span>
          <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "2.4px", color: "#a02f22", textTransform: "uppercase", marginTop: "3px" }}>
            Mandarin Academy
          </span>
        </span>
      </NavLink>

      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <NavLink to="/" className="hc-navlink" style={linkStyle}>Home</NavLink>
        <NavLink to="/About" className="hc-navlink" style={linkStyle}>About Us</NavLink>
        <NavLink to="/Classes" className="hc-navlink" style={linkStyle}>Class Introductions</NavLink>
        <NavLink to="/Calendar" className="hc-navlink" style={linkStyle}>Calendar</NavLink>
        <NavLink
          to="/Book"
          className="hc-btn-red"
          style={{
            marginLeft: "8px",
            padding: "11px 20px",
            borderRadius: "10px",
            background: "#c23a2b",
            color: "#fff",
            fontSize: "14.5px",
            fontWeight: 600,
            textDecoration: "none",
            boxShadow: "0 4px 14px rgba(194,58,43,.28)",
          }}
        >
          Book Class
        </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
