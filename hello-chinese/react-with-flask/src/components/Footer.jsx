import { NavLink } from "react-router-dom";
import logo from "../assets/logo-panda.png";

const footLink = { fontSize: "14.5px", color: "#c9bfb0", textDecoration: "none" };
const colHead = { fontSize: "13px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "#7d7263", marginBottom: "4px" };
const col = { display: "flex", flexDirection: "column", gap: "11px" };

function Footer() {
  return (
    <footer style={{ background: "#1c1710", color: "#c9bfb0", fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }}>
      <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "60px clamp(20px,5vw,56px) 30px", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "40px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "11px", marginBottom: "16px" }}>
            <img src={logo} alt="HelloChinese panda logo" style={{ width: "44px", height: "44px", borderRadius: "999px", objectFit: "cover" }} />
            <span style={{ fontFamily: "'Newsreader', serif", fontSize: "20px", fontWeight: 600, color: "#fff" }}>HelloChinese</span>
          </div>
          <p style={{ fontSize: "14.5px", lineHeight: 1.6, color: "#a89c8a", margin: 0, maxWidth: "320px" }}>
            Helping American kids and teens build confidence and a lifelong love of Mandarin.
          </p>
        </div>

        <div style={col}>
          <div style={colHead}>Explore</div>
          <NavLink to="/About" className="hc-foot" style={footLink}>About Us</NavLink>
          <NavLink to="/Classes" className="hc-foot" style={footLink}>Class Introductions</NavLink>
          <NavLink to="/Calendar" className="hc-foot" style={footLink}>Calendar</NavLink>
          <NavLink to="/Book" className="hc-foot" style={footLink}>Book Class</NavLink>
        </div>

        <div style={col}>
          <div style={colHead}>Programs</div>
          <NavLink to="/Classes" className="hc-foot" style={footLink}>Mandarin Chinese</NavLink>
          <NavLink to="/Classes" className="hc-foot" style={footLink}>Math</NavLink>
          <NavLink to="/Classes" className="hc-foot" style={footLink}>Math + Chinese</NavLink>
        </div>

        <div style={col}>
          <div style={colHead}>Contact</div>
          <span style={{ fontSize: "14.5px", color: "#a89c8a" }}>hello@hellochinese.com</span>
          <span style={{ fontSize: "14.5px", color: "#a89c8a" }}>(800) 555-1234</span>
          <span style={{ fontSize: "14.5px", color: "#a89c8a" }}>Mon–Sat · 9am–7pm</span>
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,.1)" }}>
        <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "20px clamp(20px,5vw,56px)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "12px", fontSize: "13px", color: "#7d7263" }}>
          <span>© 2026 HelloChinese Mandarin Academy. All rights reserved.</span>
          <span style={{ fontFamily: "'Noto Serif SC', serif" }}>学而不厌 · 诲人不倦</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
