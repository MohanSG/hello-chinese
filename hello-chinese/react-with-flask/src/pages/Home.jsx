import { NavLink } from "react-router-dom";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import Faq from "../components/Faq";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import "../styles/hello-home.css";

import rocket from "../assets/Icons/Home/rocket.png";
import idea from "../assets/Icons/Home/idea.png";
import id from "../assets/Icons/Home/id.png";
import award from "../assets/Icons/Home/award.png";

const eyebrow = { fontSize: "12.5px", fontWeight: 700, letterSpacing: "2.4px", color: "#c23a2b", textTransform: "uppercase", marginBottom: "16px" };
const h2 = { fontFamily: "'Newsreader', serif", fontWeight: 600, fontSize: "clamp(30px,4vw,44px)", lineHeight: 1.12, letterSpacing: "-.6px", color: "#2a231b" };

const PILLARS = [
  { icon: rocket, t: "Speak from day one", d: "Students hear and use real Mandarin in every lesson, so confidence comes before rules." },
  { icon: idea, t: "Language + culture", d: "Stories, festivals and everyday life make the language meaningful, not memorized." },
  { icon: id, t: "Small groups", d: "Six students max means every child is seen, heard, and gently pushed forward." },
  { icon: award, t: "Visible progress", d: "Clear levels, weekly practice and parent updates so you always know how it’s going." },
];

const OFFERS = [
  { name: "Mandarin Chinese", zh: "中文", price: "$180", blurb: "Speaking, listening, characters & pinyin for beginners to advanced.", save: "", popular: false,
    features: ["4 live small-group lessons / month", "Max 6 students per class", "Speaking, pinyin & character writing", "Weekly practice + parent updates"] },
  { name: "Math", zh: "数学", price: "$160", blurb: "Grade-aligned math that builds real problem-solving confidence.", save: "", popular: false,
    features: ["4 live small-group lessons / month", "Max 6 students per class", "Grade-aligned K–8 curriculum", "Homework help & progress reports"] },
  { name: "Math + Chinese", zh: "套餐", price: "$300", blurb: "Our best value — both programs, one simple monthly plan.", save: "Save $40 / month", popular: true,
    features: ["Everything in both programs", "8 live lessons / month total", "Priority scheduling", "Termly progress conference"] },
];

function Home() {
  return (
    <div style={{ background: "#f6f1e8", overflowX: "hidden", fontFamily: "'Hanken Grotesk', system-ui, sans-serif", color: "#2a231b" }}>
      <NavBar />
      <Hero />

      {/* TRUST STRIP */}
      <div style={{ background: "#241d16", color: "#e9e0d2" }}>
        <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "26px clamp(20px,5vw,56px)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "28px" }}>
          {[["1,200+", "students taught"], ["6", "max per class"], ["4.9★", "average parent rating"], ["98%", "renew each term"]].map(([n, l]) => (
            <div key={l} style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <span style={{ fontFamily: "'Newsreader', serif", fontSize: "30px", fontWeight: 600, color: "#fff" }}>{n}</span>
              <span style={{ fontSize: "13px", color: "#b3a893" }}>{l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* WHO WE ARE */}
      <section style={{ background: "#fffdf8" }}>
        <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "clamp(64px,9vw,110px) clamp(20px,5vw,56px)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(40px,6vw,80px)", alignItems: "center" }}>
          <div style={{ position: "relative" }}>
            <div style={{ aspectRatio: "4 / 5", borderRadius: "20px", backgroundImage: "repeating-linear-gradient(135deg,#efe3d0 0 22px,#e7d9c2 22px 44px)", boxShadow: "0 24px 60px rgba(42,35,27,.14)", display: "flex", alignItems: "flex-end", justifyContent: "center", padding: "22px" }}>
              <span style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: "11px", color: "rgba(42,35,27,.42)", background: "rgba(255,253,248,.8)", padding: "6px 12px", borderRadius: "20px", textAlign: "center" }}>◈ PHOTO — founder / lead teacher portrait</span>
            </div>
            <div className="hc-float" style={{ position: "absolute", bottom: "-26px", left: "-26px", background: "#c23a2b", color: "#fff", borderRadius: "16px", padding: "18px 22px", boxShadow: "0 14px 34px rgba(194,58,43,.32)" }}>
              <div style={{ fontFamily: "'Noto Serif SC', serif", fontSize: "24px", fontWeight: 600, lineHeight: 1 }}>用心</div>
              <div style={{ fontSize: "12px", marginTop: "4px", color: "rgba(255,255,255,.9)" }}>taught with heart</div>
            </div>
          </div>
          <div>
            <div style={eyebrow}>Who we are</div>
            <h2 style={{ ...h2, margin: "0 0 22px" }}>A neighborhood language school — with a global classroom.</h2>
            <p style={{ fontSize: "17px", lineHeight: 1.7, color: "#5b5348", margin: "0 0 18px" }}>
              HelloChinese started with a simple belief: American kids can grow up genuinely bilingual when Mandarin is taught with warmth, patience, and real conversation — not flashcards and pressure.
            </p>
            <p style={{ fontSize: "17px", lineHeight: 1.7, color: "#5b5348", margin: "0 0 26px" }}>
              Today our certified teachers guide students from their very first <span style={{ fontFamily: "'Noto Serif SC', serif", color: "#c23a2b", fontWeight: 600 }}>你好</span> to confident, everyday fluency — online and in-person, in classes small enough to know every child by name.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "22px" }}>
              {["Certified native teachers", "Ages 5 to 17", "Online & in-person"].map((t) => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: "11px" }}>
                  <span style={{ width: "9px", height: "9px", borderRadius: "999px", background: "#c23a2b" }} />
                  <span style={{ fontSize: "15px", fontWeight: 600, color: "#2a231b" }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OUR PHILOSOPHY */}
      <section style={{ background: "#f6f1e8" }}>
        <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "clamp(64px,9vw,110px) clamp(20px,5vw,56px)" }}>
          <div style={{ maxWidth: "640px", margin: "0 auto 56px", textAlign: "center" }}>
            <div style={eyebrow}>Our philosophy</div>
            <h2 style={{ ...h2, margin: "0 0 18px" }}>Fluency grows from confidence, not memorization.</h2>
            <p style={{ fontSize: "17px", lineHeight: 1.7, color: "#5b5348", margin: 0 }}>Four principles shape every lesson we teach — and every child who walks out of it a little bolder.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "20px" }}>
            {PILLARS.map((p) => (
              <div key={p.t} className="hc-card" style={{ background: "#fffdf8", border: "1px solid rgba(42,35,27,.08)", borderRadius: "18px", padding: "30px 26px" }}>
                <div style={{ width: "56px", height: "56px", borderRadius: "14px", background: "#f6e7e1", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                  <img src={p.icon} alt="" style={{ width: "30px", height: "30px", objectFit: "contain" }} />
                </div>
                <h3 style={{ fontFamily: "'Newsreader', serif", fontWeight: 600, fontSize: "20px", lineHeight: 1.2, margin: "0 0 10px", color: "#2a231b" }}>{p.t}</h3>
                <p style={{ fontSize: "14.5px", lineHeight: 1.6, color: "#6b6154", margin: 0 }}>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE OFFER */}
      <section style={{ background: "#fffdf8" }}>
        <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "clamp(64px,9vw,110px) clamp(20px,5vw,56px)" }}>
          <div style={{ maxWidth: "640px", margin: "0 auto 56px", textAlign: "center" }}>
            <div style={eyebrow}>What we offer</div>
            <h2 style={{ ...h2, margin: "0 0 18px" }}>Class Introductions</h2>
            <p style={{ fontSize: "17px", lineHeight: 1.7, color: "#5b5348", margin: 0 }}>Live, small-group classes billed monthly. No contracts — pause or switch programs anytime.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "24px", alignItems: "stretch" }}>
            {OFFERS.map((o) => {
              const pop = o.popular;
              return (
                <div key={o.name} style={{ position: "relative", display: "flex", flexDirection: "column", borderRadius: "22px", padding: "34px 30px", background: pop ? "#241d16" : "#fffdf8", border: pop ? "1px solid #241d16" : "1px solid rgba(42,35,27,.1)", boxShadow: pop ? "0 30px 60px rgba(36,29,22,.28)" : "none" }}>
                  {pop && (
                    <div style={{ position: "absolute", top: "18px", right: "18px", background: "#c23a2b", color: "#fff", fontSize: "11px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", padding: "6px 12px", borderRadius: "999px" }}>Most popular</div>
                  )}
                  <div style={{ fontFamily: "'Noto Serif SC', serif", fontSize: "26px", fontWeight: 600, color: pop ? "#e08a7c" : "#c23a2b", marginBottom: "14px" }}>{o.zh}</div>
                  <h3 style={{ fontFamily: "'Newsreader', serif", fontWeight: 600, fontSize: "24px", margin: "0 0 6px", color: pop ? "#fff" : "#2a231b" }}>{o.name}</h3>
                  <p style={{ fontSize: "14px", lineHeight: 1.55, margin: "0 0 22px", color: pop ? "#c9bfb0" : "#6b6154" }}>{o.blurb}</p>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "4px" }}>
                    <span style={{ fontFamily: "'Newsreader', serif", fontSize: "44px", fontWeight: 600, color: pop ? "#fff" : "#2a231b" }}>{o.price}</span>
                    <span style={{ fontSize: "15px", fontWeight: 500, color: pop ? "#a89c8a" : "#948977" }}>/ month</span>
                  </div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: pop ? "#e08a7c" : "#3f7d6e", marginBottom: "24px", minHeight: "18px" }}>{o.save}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "13px", marginBottom: "28px" }}>
                    {o.features.map((f) => (
                      <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: "11px" }}>
                        <span style={{ flex: "none", marginTop: "2px", width: "18px", height: "18px", borderRadius: "999px", background: pop ? "#c23a2b" : "#f6e7e1", color: pop ? "#fff" : "#c23a2b", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 800 }}>✓</span>
                        <span style={{ fontSize: "14.5px", lineHeight: 1.45, color: pop ? "#e9e0d2" : "#4a4238" }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <NavLink to="/Book" className={pop ? "hc-btn-red" : "hc-btn-dark"} style={{ display: "block", textAlign: "center", marginTop: "auto", padding: "14px", borderRadius: "12px", fontSize: "15px", fontWeight: 700, textDecoration: "none", background: pop ? "#c23a2b" : "#2a231b", color: "#fff", boxShadow: pop ? "0 8px 20px rgba(194,58,43,.35)" : "none" }}>Book this class</NavLink>
                </div>
              );
            })}
          </div>
          <p style={{ textAlign: "center", fontSize: "14px", color: "#948977", margin: "30px 0 0" }}>
            Sibling discount 10% · Financial aid available · <NavLink to="/Contact" style={{ color: "#c23a2b", fontWeight: 600, textDecoration: "none" }}>Ask about custom 1-on-1 tutoring →</NavLink>
          </p>
        </div>
      </section>

      {/* FREE TRIAL BAND */}
      <section style={{ background: "#241d16", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-80px", right: "-40px", fontFamily: "'Noto Serif SC', serif", fontSize: "340px", lineHeight: 1, color: "rgba(194,58,43,.14)", fontWeight: 700, pointerEvents: "none", userSelect: "none" }}>学</div>
        <div style={{ position: "relative", maxWidth: "1180px", margin: "0 auto", padding: "clamp(60px,8vw,96px) clamp(20px,5vw,56px)", display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "56px", alignItems: "center" }}>
          <div>
            <div style={{ ...eyebrow, color: "#e08a7c" }}>Free trial lesson</div>
            <h2 style={{ fontFamily: "'Newsreader', serif", fontWeight: 600, fontSize: "clamp(32px,4.5vw,50px)", lineHeight: 1.08, letterSpacing: "-.8px", margin: "0 0 20px", color: "#fff" }}>Your child's first class is on us.</h2>
            <p style={{ fontSize: "17.5px", lineHeight: 1.65, color: "#c9bfb0", margin: "0 0 30px", maxWidth: "520px" }}>
              Book a free 30-minute trial and watch your child speak their first Mandarin sentences. No commitment, no pressure — just a warm first lesson.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              {["✓ No commitment", "✓ 30 minutes", "✓ Online or in-person"].map((c) => (
                <span key={c} style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "9px 16px", borderRadius: "999px", background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.14)", fontSize: "13.5px", fontWeight: 600, color: "#e9e0d2" }}>{c}</span>
              ))}
            </div>
          </div>
          <div style={{ background: "#fffdf8", borderRadius: "20px", padding: "32px", boxShadow: "0 30px 70px rgba(0,0,0,.4)" }}>
            <div style={{ fontFamily: "'Newsreader', serif", fontSize: "22px", fontWeight: 600, color: "#2a231b", marginBottom: "6px" }}>Reserve a trial spot</div>
            <p style={{ fontSize: "14px", color: "#6b6154", margin: "0 0 20px" }}>Pick a program and we'll match you with a teacher this week.</p>
            <NavLink to="/Book" className="hc-btn-red" style={{ display: "block", textAlign: "center", padding: "15px", borderRadius: "12px", background: "#c23a2b", color: "#fff", fontSize: "16px", fontWeight: 700, textDecoration: "none", boxShadow: "0 8px 22px rgba(194,58,43,.3)" }}>Book your free trial →</NavLink>
            <div style={{ textAlign: "center", fontSize: "13px", color: "#948977", marginTop: "16px" }}>or call <a href="tel:+18005551234" style={{ color: "#c23a2b", fontWeight: 600, textDecoration: "none" }}>(800) 555-1234</a></div>
          </div>
        </div>
      </section>

      <Faq />
      <Contact />
      <Footer />
    </div>
  );
}

export default Home;
