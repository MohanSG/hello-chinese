import { NavLink } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../styles/hello-home.css";

const eyebrow = { fontSize: "12.5px", fontWeight: 700, letterSpacing: "2.4px", color: "#c23a2b", textTransform: "uppercase", marginBottom: "16px" };
const zhLarge = { fontFamily: "'Noto Serif SC', serif", fontSize: "30px", color: "#c23a2b", fontWeight: 600, marginBottom: "16px" };

const VALUES = [
  { zh: "用心", t: "Taught with heart", d: "Every teacher knows their students by name. Warmth and patience come before pressure and grades." },
  { zh: "耐心", t: "Confidence first", d: "We meet children where they are and let small wins build. A confident learner is an unstoppable one." },
  { zh: "文化", t: "Language + culture", d: "Festivals, stories and everyday life make the language stick — and connect kids to a living culture." },
];

const TEACHERS = [
  { name: "Mei Lin", role: "Founder · Mandarin", bio: "Certified teacher and the voice behind those first kitchen-table lessons." },
  { name: "David Chen", role: "Mandarin · Teens", bio: "Makes grammar feel like a game and loves prepping students for AP Chinese." },
  { name: "Grace Wu", role: "Math · K–8", bio: "Turns word problems into stories kids actually want to solve." },
  { name: "Alan Zhao", role: "Mandarin · Beginners", bio: "Patient, playful, and fluent in the art of the encouraging high-five." },
];

const STATS = [
  ["1,200+", "students taught"],
  ["10 yrs", "teaching experience"],
  ["14", "certified teachers"],
  ["4.9★", "average parent rating"],
];

function About() {
  return (
    <div style={{ background: "#f6f1e8", fontFamily: "'Hanken Grotesk', system-ui, sans-serif", color: "#2a231b" }}>
      <NavBar />

      {/* HEADER BAND */}
      <section style={{ background: "#241d16", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-90px", right: "-30px", fontFamily: "'Noto Serif SC', serif", fontSize: "330px", lineHeight: 1, color: "rgba(194,58,43,.14)", fontWeight: 700, pointerEvents: "none", userSelect: "none" }}>我们</div>
        <div style={{ position: "relative", maxWidth: "1100px", margin: "0 auto", padding: "clamp(48px,7vw,80px) clamp(20px,5vw,56px)" }}>
          <div style={{ fontSize: "12.5px", fontWeight: 700, letterSpacing: "2.4px", color: "#e08a7c", textTransform: "uppercase", marginBottom: "16px" }}>Our story</div>
          <h1 style={{ fontFamily: "'Newsreader', serif", fontWeight: 600, fontSize: "clamp(38px,5.5vw,60px)", lineHeight: 1.04, letterSpacing: "-1px", margin: "0 0 18px", color: "#fff" }}>About HelloChinese</h1>
          <p style={{ fontSize: "17.5px", lineHeight: 1.6, color: "#c9bfb0", margin: 0, maxWidth: "600px" }}>
            We're a small team of teachers on a simple mission: help American kids grow up genuinely bilingual — with warmth, patience, and a lot of conversation.
          </p>
        </div>
      </section>

      {/* STORY */}
      <section style={{ background: "#fffdf8" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "clamp(56px,8vw,100px) clamp(20px,5vw,56px)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(40px,6vw,80px)", alignItems: "center" }}>
          <div style={{ position: "relative" }}>
            <div style={{ aspectRatio: "4 / 5", borderRadius: "20px", backgroundImage: "repeating-linear-gradient(135deg,#efe3d0 0 22px,#e7d9c2 22px 44px)", boxShadow: "0 24px 60px rgba(42,35,27,.14)", display: "flex", alignItems: "flex-end", justifyContent: "center", padding: "22px" }}>
              <span style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: "11px", color: "rgba(42,35,27,.42)", background: "rgba(255,253,248,.8)", padding: "6px 12px", borderRadius: "20px", textAlign: "center" }}>◈ PHOTO — founder teaching a class</span>
            </div>
            <div className="hc-float" style={{ position: "absolute", bottom: "-26px", left: "-26px", background: "#c23a2b", color: "#fff", borderRadius: "16px", padding: "18px 22px", boxShadow: "0 14px 34px rgba(194,58,43,.32)" }}>
              <div style={{ fontFamily: "'Noto Serif SC', serif", fontSize: "24px", fontWeight: 600, lineHeight: 1 }}>2016</div>
              <div style={{ fontSize: "12px", marginTop: "4px", color: "rgba(255,255,255,.9)" }}>teaching since</div>
            </div>
          </div>
          <div>
            <div style={eyebrow}>How we started</div>
            <h2 style={{ fontFamily: "'Newsreader', serif", fontWeight: 600, fontSize: "clamp(28px,3.6vw,40px)", lineHeight: 1.14, letterSpacing: "-.5px", margin: "0 0 22px", color: "#2a231b" }}>It began at a kitchen table.</h2>
            <p style={{ fontSize: "16.5px", lineHeight: 1.7, color: "#5b5348", margin: "0 0 18px" }}>
              HelloChinese started when a handful of parents asked one teacher to help their kids learn Mandarin the way children actually learn a language — by speaking it, playing with it, and hearing it every week.
            </p>
            <p style={{ fontSize: "16.5px", lineHeight: 1.7, color: "#5b5348", margin: "0 0 18px" }}>
              Those first lessons around a kitchen table grew into a school. Today we teach over a thousand students across the country, online and in person, but the philosophy hasn't changed: keep classes small, keep them warm, and let confidence lead.
            </p>
            <p style={{ fontSize: "16.5px", lineHeight: 1.7, color: "#5b5348", margin: 0 }}>
              We believe a second language is one of the most generous gifts you can give a child — a wider world, a deeper connection to family and culture, and a lifelong sense that <span style={{ fontFamily: "'Noto Serif SC', serif", color: "#c23a2b", fontWeight: 600 }}>我可以</span> — "I can."
            </p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div style={{ background: "#241d16", color: "#e9e0d2" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px clamp(20px,5vw,56px)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "28px" }}>
          {STATS.map(([n, l]) => (
            <div key={l} style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <span style={{ fontFamily: "'Newsreader', serif", fontSize: "32px", fontWeight: 600, color: "#fff" }}>{n}</span>
              <span style={{ fontSize: "13px", color: "#b3a893" }}>{l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* VALUES */}
      <section style={{ background: "#f6f1e8" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "clamp(56px,8vw,100px) clamp(20px,5vw,56px)" }}>
          <div style={{ maxWidth: "620px", margin: "0 auto 52px", textAlign: "center" }}>
            <div style={eyebrow}>What we believe</div>
            <h2 style={{ fontFamily: "'Newsreader', serif", fontWeight: 600, fontSize: "clamp(28px,3.8vw,42px)", lineHeight: 1.12, letterSpacing: "-.5px", margin: 0, color: "#2a231b" }}>The values behind every lesson</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "22px" }}>
            {VALUES.map((v) => (
              <div key={v.t} style={{ background: "#fffdf8", border: "1px solid rgba(42,35,27,.08)", borderRadius: "18px", padding: "32px 28px" }}>
                <div style={zhLarge}>{v.zh}</div>
                <h3 style={{ fontFamily: "'Newsreader', serif", fontWeight: 600, fontSize: "21px", margin: "0 0 10px", color: "#2a231b" }}>{v.t}</h3>
                <p style={{ fontSize: "15px", lineHeight: 1.65, color: "#6b6154", margin: 0 }}>{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEACHERS */}
      <section style={{ background: "#fffdf8" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "clamp(56px,8vw,100px) clamp(20px,5vw,56px)" }}>
          <div style={{ maxWidth: "620px", margin: "0 auto 52px", textAlign: "center" }}>
            <div style={eyebrow}>Meet the teachers</div>
            <h2 style={{ fontFamily: "'Newsreader', serif", fontWeight: 600, fontSize: "clamp(28px,3.8vw,42px)", lineHeight: 1.12, letterSpacing: "-.5px", margin: "0 0 18px", color: "#2a231b" }}>Certified, native, and genuinely kind</h2>
            <p style={{ fontSize: "16.5px", lineHeight: 1.7, color: "#5b5348", margin: 0 }}>Every teacher is a certified educator and native speaker who loves working with kids.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "22px" }}>
            {TEACHERS.map((t) => (
              <div key={t.name} style={{ background: "#f6f1e8", border: "1px solid rgba(42,35,27,.08)", borderRadius: "18px", overflow: "hidden" }}>
                <div style={{ aspectRatio: "1 / 1", backgroundImage: "repeating-linear-gradient(135deg,#efe3d0 0 18px,#e7d9c2 18px 36px)", display: "flex", alignItems: "flex-end", justifyContent: "center", padding: "14px" }}>
                  <span style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: "10px", color: "rgba(42,35,27,.4)", background: "rgba(255,253,248,.8)", padding: "4px 9px", borderRadius: "20px" }}>◈ PHOTO</span>
                </div>
                <div style={{ padding: "20px" }}>
                  <h3 style={{ fontFamily: "'Newsreader', serif", fontWeight: 600, fontSize: "19px", margin: "0 0 3px", color: "#2a231b" }}>{t.name}</h3>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "#c23a2b", marginBottom: "10px" }}>{t.role}</div>
                  <p style={{ fontSize: "13.5px", lineHeight: 1.55, color: "#6b6154", margin: 0 }}>{t.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section style={{ background: "#241d16", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-80px", right: "-40px", fontFamily: "'Noto Serif SC', serif", fontSize: "320px", lineHeight: 1, color: "rgba(194,58,43,.14)", fontWeight: 700, pointerEvents: "none", userSelect: "none" }}>你好</div>
        <div style={{ position: "relative", maxWidth: "1100px", margin: "0 auto", padding: "clamp(56px,7vw,90px) clamp(20px,5vw,56px)", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Newsreader', serif", fontWeight: 600, fontSize: "clamp(30px,4vw,46px)", lineHeight: 1.1, letterSpacing: "-.6px", margin: "0 0 18px", color: "#fff" }}>Come say 你好.</h2>
          <p style={{ fontSize: "17.5px", lineHeight: 1.6, color: "#c9bfb0", margin: "0 auto 30px", maxWidth: "520px" }}>Book a free trial lesson and meet the team. We'd love to help your child begin.</p>
          <NavLink to="/Book" className="hc-btn-red" style={{ display: "inline-block", padding: "15px 30px", borderRadius: "12px", background: "#c23a2b", color: "#fff", fontSize: "16px", fontWeight: 700, textDecoration: "none", boxShadow: "0 8px 22px rgba(194,58,43,.3)" }}>Book a free trial →</NavLink>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default About;
