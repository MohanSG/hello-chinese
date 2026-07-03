import { NavLink } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../styles/hello-home.css";

const eyebrow = { fontSize: "12.5px", fontWeight: 700, letterSpacing: "2.4px", color: "#c23a2b", textTransform: "uppercase", marginBottom: "16px" };
const levelBadge = (bg, color) => ({ flex: "none", width: "30px", height: "30px", borderRadius: "9px", background: bg, color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12.5px", fontWeight: 700 });
const levelTitle = { fontSize: "15px", fontWeight: 600, color: "#2a231b" };
const levelDesc = { fontSize: "14px", color: "#6b6154" };
const bookDarkBtn = { display: "inline-block", padding: "14px 26px", borderRadius: "11px", background: "#2a231b", color: "#fff", fontSize: "15px", fontWeight: 700, textDecoration: "none" };
const placeholder = (c1, c2) => ({
  aspectRatio: "5 / 4",
  borderRadius: "20px",
  backgroundImage: `repeating-linear-gradient(135deg, ${c1} 0 22px, ${c2} 22px 44px)`,
  boxShadow: "0 24px 60px rgba(42,35,27,.12)",
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
  padding: "20px",
});
const placeholderTag = { fontFamily: "ui-monospace, Menlo, monospace", fontSize: "11px", color: "rgba(42,35,27,.42)", background: "rgba(255,253,248,.8)", padding: "6px 12px", borderRadius: "20px" };

const MANDARIN_LEVELS = [
  ["初", "Beginner", "Pinyin, greetings, everyday phrases", "#f6e7e1", "#c23a2b"],
  ["中", "Intermediate", "Conversation, core characters, short stories", "#f6e7e1", "#c23a2b"],
  ["高", "Advanced", "Fluent discussion, reading, AP/heritage prep", "#f6e7e1", "#c23a2b"],
];
const MATH_LEVELS = [
  ["K–2", "Foundations", "Number sense, addition & subtraction", "#e2e6db", "#3f7d6e"],
  ["3–5", "Building blocks", "Multiplication, fractions, word problems", "#e2e6db", "#3f7d6e"],
  ["6–8", "Pre-algebra", "Ratios, equations, early algebra concepts", "#e2e6db", "#3f7d6e"],
];

const PRICING = [
  { zh: "中文", name: "Mandarin Chinese", price: "$180", pop: false },
  { zh: "套餐", name: "Math + Chinese", price: "$300", pop: true },
  { zh: "数学", name: "Math", price: "$160", pop: false },
];

function Classes() {
  return (
    <div style={{ background: "#f6f1e8", fontFamily: "'Hanken Grotesk', system-ui, sans-serif", color: "#2a231b" }}>
      <NavBar />

      {/* HEADER */}
      <section style={{ background: "#241d16", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-90px", right: "-30px", fontFamily: "'Noto Serif SC', serif", fontSize: "330px", lineHeight: 1, color: "rgba(194,58,43,.14)", fontWeight: 700, pointerEvents: "none", userSelect: "none" }}>课程</div>
        <div style={{ position: "relative", maxWidth: "1100px", margin: "0 auto", padding: "clamp(48px,7vw,80px) clamp(20px,5vw,56px)" }}>
          <div style={{ fontSize: "12.5px", fontWeight: 700, letterSpacing: "2.4px", color: "#e08a7c", textTransform: "uppercase", marginBottom: "16px" }}>Class introductions</div>
          <h1 style={{ fontFamily: "'Newsreader', serif", fontWeight: 600, fontSize: "clamp(38px,5.5vw,60px)", lineHeight: 1.04, letterSpacing: "-1px", margin: "0 0 18px", color: "#fff" }}>Find the right class.</h1>
          <p style={{ fontSize: "17.5px", lineHeight: 1.6, color: "#c9bfb0", margin: 0, maxWidth: "600px" }}>
            Live, small-group classes in Mandarin and Math — or both. Every class caps at 6 students and includes weekly parent updates.
          </p>
        </div>
      </section>

      {/* MANDARIN */}
      <section style={{ background: "#fffdf8" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "clamp(56px,8vw,96px) clamp(20px,5vw,56px)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(40px,6vw,72px)", alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: "'Noto Serif SC', serif", fontSize: "34px", color: "#c23a2b", fontWeight: 600, marginBottom: "16px" }}>中文</div>
            <h2 style={{ fontFamily: "'Newsreader', serif", fontWeight: 600, fontSize: "clamp(28px,3.6vw,38px)", lineHeight: 1.14, letterSpacing: "-.5px", margin: "0 0 18px", color: "#2a231b" }}>Mandarin Chinese</h2>
            <p style={{ fontSize: "16.5px", lineHeight: 1.7, color: "#5b5348", margin: "0 0 22px" }}>
              From first words to real conversation. Students build speaking confidence early, then layer in reading, writing, and characters as they progress through three levels.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "26px" }}>
              {MANDARIN_LEVELS.map(([tag, title, desc, bg, color]) => (
                <div key={title} style={{ display: "flex", gap: "14px" }}>
                  <span style={levelBadge(bg, color)}>{tag}</span>
                  <div><div style={levelTitle}>{title}</div><div style={levelDesc}>{desc}</div></div>
                </div>
              ))}
            </div>
            <NavLink to="/Book" className="hc-btn-dark" style={bookDarkBtn}>Book this class</NavLink>
          </div>
          <div style={placeholder("#efe3d0", "#e7d9c2")}><span style={placeholderTag}>◈ PHOTO — Mandarin class in session</span></div>
        </div>
      </section>

      {/* MATH */}
      <section style={{ background: "#f6f1e8" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "clamp(56px,8vw,96px) clamp(20px,5vw,56px)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(40px,6vw,72px)", alignItems: "center" }}>
          <div style={{ ...placeholder("#e2e6db", "#d7ddce"), order: 2 }}><span style={placeholderTag}>◈ PHOTO — Math class in session</span></div>
          <div style={{ order: 1 }}>
            <div style={{ fontFamily: "'Noto Serif SC', serif", fontSize: "34px", color: "#c23a2b", fontWeight: 600, marginBottom: "16px" }}>数学</div>
            <h2 style={{ fontFamily: "'Newsreader', serif", fontWeight: 600, fontSize: "clamp(28px,3.6vw,38px)", lineHeight: 1.14, letterSpacing: "-.5px", margin: "0 0 18px", color: "#2a231b" }}>Math</h2>
            <p style={{ fontSize: "16.5px", lineHeight: 1.7, color: "#5b5348", margin: "0 0 22px" }}>
              Grade-aligned math taught in the same small-group, confidence-first style. We build real number sense and problem-solving — not just answers.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "26px" }}>
              {MATH_LEVELS.map(([tag, title, desc, bg, color]) => (
                <div key={title} style={{ display: "flex", gap: "14px" }}>
                  <span style={levelBadge(bg, color)}>{tag}</span>
                  <div><div style={levelTitle}>{title}</div><div style={levelDesc}>{desc}</div></div>
                </div>
              ))}
            </div>
            <NavLink to="/Book" className="hc-btn-dark" style={bookDarkBtn}>Book this class</NavLink>
          </div>
        </div>
      </section>

      {/* COMBO */}
      <section style={{ background: "#241d16", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-70px", right: "-30px", fontFamily: "'Noto Serif SC', serif", fontSize: "280px", lineHeight: 1, color: "rgba(194,58,43,.14)", fontWeight: 700, pointerEvents: "none", userSelect: "none" }}>套餐</div>
        <div style={{ position: "relative", maxWidth: "1100px", margin: "0 auto", padding: "clamp(56px,8vw,96px) clamp(20px,5vw,56px)", textAlign: "center" }}>
          <div style={{ fontFamily: "'Noto Serif SC', serif", fontSize: "30px", color: "#e08a7c", fontWeight: 600, marginBottom: "14px" }}>套餐</div>
          <h2 style={{ fontFamily: "'Newsreader', serif", fontWeight: 600, fontSize: "clamp(28px,3.8vw,42px)", lineHeight: 1.12, letterSpacing: "-.5px", margin: "0 0 16px", color: "#fff" }}>Math + Chinese Combo</h2>
          <p style={{ fontSize: "17px", lineHeight: 1.65, color: "#c9bfb0", margin: "0 auto 8px", maxWidth: "560px" }}>Both programs, one simple monthly plan, 8 live lessons total — our best value for families doing both.</p>
          <div style={{ fontSize: "15px", fontWeight: 600, color: "#e08a7c", marginBottom: "34px" }}>Save $40/month vs. booking separately</div>
          <NavLink to="/Book" className="hc-btn-red" style={{ display: "inline-block", padding: "15px 30px", borderRadius: "12px", background: "#c23a2b", color: "#fff", fontSize: "16px", fontWeight: 700, textDecoration: "none", boxShadow: "0 8px 22px rgba(194,58,43,.3)" }}>Book the combo →</NavLink>
        </div>
      </section>

      {/* PRICING RECAP */}
      <section style={{ background: "#fffdf8" }}>
        <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "clamp(56px,8vw,96px) clamp(20px,5vw,56px)" }}>
          <div style={{ maxWidth: "620px", margin: "0 auto 48px", textAlign: "center" }}>
            <div style={eyebrow}>Pricing</div>
            <h2 style={{ fontFamily: "'Newsreader', serif", fontWeight: 600, fontSize: "clamp(28px,3.8vw,42px)", lineHeight: 1.12, letterSpacing: "-.5px", margin: 0, color: "#2a231b" }}>Simple monthly plans</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "24px" }}>
            {PRICING.map((p) => (
              <div
                key={p.name}
                style={{
                  position: "relative",
                  background: p.pop ? "#241d16" : "#fffdf8",
                  border: p.pop ? "none" : "1px solid rgba(42,35,27,.1)",
                  borderRadius: "22px",
                  padding: "30px 26px",
                  boxShadow: p.pop ? "0 24px 50px rgba(36,29,22,.25)" : "none",
                }}
              >
                {p.pop && (
                  <div style={{ position: "absolute", top: "16px", right: "16px", background: "#c23a2b", color: "#fff", fontSize: "10.5px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", padding: "5px 11px", borderRadius: "999px" }}>Best value</div>
                )}
                <div style={{ fontFamily: "'Noto Serif SC', serif", fontSize: "22px", color: p.pop ? "#e08a7c" : "#c23a2b", marginBottom: "10px" }}>{p.zh}</div>
                <h3 style={{ fontFamily: "'Newsreader', serif", fontWeight: 600, fontSize: "20px", margin: "0 0 16px", color: p.pop ? "#fff" : "#2a231b" }}>{p.name}</h3>
                <div style={{ fontFamily: "'Newsreader', serif", fontSize: "38px", fontWeight: 600, color: p.pop ? "#fff" : "#2a231b" }}>
                  {p.price}<span style={{ fontSize: "14px", fontWeight: 500, color: p.pop ? "#a89c8a" : "#948977" }}> / month</span>
                </div>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", fontSize: "14px", color: "#948977", margin: "28px 0 0" }}>
            Sibling discount 10% · No contracts, cancel anytime · <NavLink to="/Book" style={{ color: "#c23a2b", fontWeight: 600, textDecoration: "none" }}>Book a free trial →</NavLink>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Classes;
