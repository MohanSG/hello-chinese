import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../styles/variables.css";
import "./Hero.css";

const SLIDES = [
  { c1: "var(--tan-1)", c2: "var(--tan-2)", caption: "◈ PHOTO — teacher & engaged students in class" },
  { c1: "var(--rose-1)", c2: "var(--rose-2)", caption: "◈ PHOTO — student writing Chinese characters, close-up" },
  { c1: "var(--sage-1)", c2: "var(--sage-2)", caption: "◈ PHOTO — happy group of kids after class" },
];

function Hero() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 5500);
    return () => clearInterval(t);
  }, [slide]);

  return (
    <section className="hero">
      {/* slides (swap the striped divs for <img> when you have photos) */}
      {SLIDES.map((s, i) => (
        <div
          key={i}
          className={"hero__slide" + (i === slide ? " active" : "")}
          style={{ backgroundImage: `repeating-linear-gradient(135deg, ${s.c1} 0 20px, ${s.c2} 20px 40px)` }}
        >
          <div className="hero__slide-caption">{s.caption}</div>
        </div>
      ))}

      <div className="hero__scrim" />

      <div className="hero__content">
        <div className="hero__copy">
          <div className="hero__badge">
            <span className="hero__badge-zh">你好</span>
            <span className="hero__badge-text">Bilingual classes for ages 5–17</span>
          </div>
          <h1 className="hero__title">
            Speak Chinese.
            <br />
            <span className="hero__title-accent">Understand more.</span>
            <br />
            Connect deeply.
          </h1>
          <p className="hero__desc">
            Warm, small-group Mandarin — and math — for American kids and teens. Taught by educators who make every lesson feel like a real conversation.
          </p>
          <div className="hero__actions">
            <NavLink to="/Book" className="hero__btn-primary">Book a free trial →</NavLink>
            <NavLink to="/Classes" className="hero__btn-outline">See our classes</NavLink>
          </div>
        </div>
      </div>

      <div className="hero__dots">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setSlide(i)}
            aria-label={`Slide ${i + 1}`}
            className={"hero__dot" + (i === slide ? " active" : "")}
          />
        ))}
      </div>
    </section>
  );
}

export default Hero;
