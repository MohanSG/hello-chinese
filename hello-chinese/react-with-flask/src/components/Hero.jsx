import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const SLIDES = [
  { c1: "#efe3d0", c2: "#e7d9c2", caption: "◈ PHOTO — teacher & engaged students in class" },
  { c1: "#efdcd4", c2: "#e6cec4", caption: "◈ PHOTO — student writing Chinese characters, close-up" },
  { c1: "#e2e6db", c2: "#d7ddce", caption: "◈ PHOTO — happy group of kids after class" },
];

function Hero() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 5500);
    return () => clearInterval(t);
  }, [slide]);

  return (
    <section
      style={{
        position: "relative",
        minHeight: "640px",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        fontFamily: "'Hanken Grotesk', system-ui, sans-serif",
      }}
    >
      {/* slides (swap the striped divs for <img> when you have photos) */}
      {SLIDES.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `repeating-linear-gradient(135deg, ${s.c1} 0 20px, ${s.c2} 20px 40px)`,
            opacity: i === slide ? 1 : 0,
            zIndex: i === slide ? 2 : 1,
            transition: "opacity 1.1s ease",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "50%",
              bottom: "26px",
              transform: "translateX(-50%)",
              fontFamily: "ui-monospace, Menlo, monospace",
              fontSize: "11px",
              letterSpacing: ".5px",
              color: "rgba(42,35,27,.42)",
              background: "rgba(255,253,248,.7)",
              padding: "6px 12px",
              borderRadius: "20px",
              whiteSpace: "nowrap",
            }}
          >
            {s.caption}
          </div>
        </div>
      ))}

      {/* readability scrim */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 5,
          background:
            "linear-gradient(100deg,rgba(246,241,232,.96) 0%,rgba(246,241,232,.86) 38%,rgba(246,241,232,.35) 66%,rgba(246,241,232,0) 100%)",
        }}
      />

      {/* copy */}
      <div style={{ position: "relative", zIndex: 10, maxWidth: "1180px", margin: "0 auto", padding: "64px clamp(20px,5vw,56px)", width: "100%" }}>
        <div style={{ maxWidth: "660px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "9px",
              padding: "7px 15px",
              borderRadius: "999px",
              background: "rgba(255,253,248,.75)",
              border: "1px solid rgba(194,58,43,.2)",
              marginBottom: "26px",
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ fontFamily: "'Noto Serif SC', serif", fontSize: "15px", color: "#c23a2b", fontWeight: 600 }}>你好</span>
            <span style={{ fontSize: "12.5px", fontWeight: 600, letterSpacing: ".4px", color: "#6b6154" }}>Bilingual classes for ages 5–17</span>
          </div>
          <h1 style={{ fontFamily: "'Newsreader', serif", fontWeight: 600, fontSize: "clamp(42px,6vw,72px)", lineHeight: 1.02, letterSpacing: "-1.2px", margin: "0 0 22px", color: "#2a231b" }}>
            Speak Chinese.
            <br />
            <span style={{ color: "#c23a2b" }}>Understand more.</span>
            <br />
            Connect deeply.
          </h1>
          <p style={{ fontSize: "clamp(17px,2vw,19.5px)", lineHeight: 1.6, color: "#5b5348", margin: "0 0 34px", maxWidth: "520px" }}>
            Warm, small-group Mandarin — and math — for American kids and teens. Taught by educators who make every lesson feel like a real conversation.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "14px" }}>
            <NavLink
              to="/Book"
              className="hc-btn-red"
              style={{ padding: "15px 28px", borderRadius: "12px", background: "#c23a2b", color: "#fff", fontSize: "16px", fontWeight: 600, textDecoration: "none", boxShadow: "0 8px 22px rgba(194,58,43,.3)" }}
            >
              Book a free trial →
            </NavLink>
            <NavLink
              to="/Classes"
              className="hc-btn-outline"
              style={{ padding: "15px 28px", borderRadius: "12px", background: "rgba(255,253,248,.8)", color: "#2a231b", fontSize: "16px", fontWeight: 600, textDecoration: "none", border: "1.5px solid rgba(42,35,27,.14)" }}
            >
              See our classes
            </NavLink>
          </div>
        </div>
      </div>

      {/* dots */}
      <div style={{ position: "absolute", zIndex: 12, bottom: "26px", right: "clamp(20px,5vw,56px)", display: "flex", alignItems: "center", gap: "9px" }}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setSlide(i)}
            aria-label={`Slide ${i + 1}`}
            style={{
              height: "9px",
              width: i === slide ? "30px" : "9px",
              borderRadius: "999px",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "all .4s ease",
              background: i === slide ? "#c23a2b" : "rgba(42,35,27,.28)",
            }}
          />
        ))}
      </div>
    </section>
  );
}

export default Hero;
