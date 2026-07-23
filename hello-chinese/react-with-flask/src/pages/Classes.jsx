import { useState } from "react";
import { NavLink } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../styles/variables.css";
import "../styles/shared.css";
import "./Classes.css";

const PROGRAMS = [
  {
    key: "stepin", zh: "启蒙", name: "Step-In", age: "Ages 3–6", schedule: "Sun 9:00–10:00 AM", price: "$40", per: "/ session",
    desc: "A playful entry to Mandarin listening, speaking, and everyday communication — built for our youngest learners.",
    features: ["10 sessions: $360", "Max 10 students, 2 teachers", "Weekly parent updates"],
  },
  {
    key: "stepup", zh: "进阶", name: "Step-Up", age: "Ages 6–10", schedule: "Sun 10:00–11:00 AM", price: "$40", per: "/ session",
    desc: "Confident literacy and communication in meaningful, real-life contexts.",
    features: ["10 sessions: $360", "Max 10 students, 2 teachers", "Weekly parent updates"],
  },
  {
    key: "stepbeyond", zh: "精进", name: "Step-Beyond", age: "Ages 10+", schedule: "Sun 11:00 AM–12:00 PM", price: "$40", per: "/ session",
    desc: "Structured expression, critical thinking, and collaborative learning for advanced students.",
    features: ["10 sessions: $360", "Max 10 students, 2 teachers", "Weekly parent updates"],
  },
  {
    key: "tutoring", zh: "辅导", name: "Tutoring", age: "Companion support", schedule: "Sun 9:00 AM–12:00 PM", price: "$20", per: "/ hour",
    desc: "Individualized support before or after the student's main class — homework help, reading, and reinforcement.",
    features: ["10 hrs: $160", "20 hrs: $300", "Optional, TA-led"],
  },
  {
    key: "mathenrichment", zh: "数学", name: "Math Enrichment", age: "All ages", schedule: "Sun 11:00 AM–12:00 PM", price: "$40", per: "/ session",
    desc: "Number sense, structured strategies, problem solving, and confidence — taught by public-school teachers with 3+ years of experience.",
    features: ["10 sessions: $360", "Max 10 students, 2 teachers", "Weekly parent updates"],
  },
  {
    key: "privatechinese", zh: "私教", name: "Private Chinese Lessons", age: "All ages", schedule: "Online or in person", price: "$40–$70", per: "/ session",
    desc: "Flexible, personalized instruction after a short consultation — online, in-home, or in person.",
    features: ["Priced by duration & format", "Individual requirements", "1-on-1 instruction"],
  },
];

function Classes() {
  const [selected, setSelected] = useState(null);
  const selectedProgram = PROGRAMS.find((p) => p.key === selected) || null;

  return (
    <div className="classes">
      <NavBar />

      {/* HEADER */}
      <section className="classes-header">
        <div className="classes-header__watermark">课程</div>
        <div className="classes-header__inner">
          <div className="eyebrow eyebrow--light">Class introductions</div>
          <h1 className="classes-header__title">Find the right class.</h1>
          <p className="classes-header__desc">
            Six programs across Mandarin, math, and personalized tutoring. Every group caps at 10 students with 2 teachers, and every class includes weekly parent updates.
          </p>
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="classes-pricing">
        <div className="classes-pricing__container">
          <div className="classes-pricing__head">
            <div className="eyebrow">Programs</div>
            <h2 className="section-title section-title--sm">Six ways to grow with Mandarin</h2>
            <p className="classes-pricing__hint">Every group caps at 10 students with 2 teachers. Tap a program for details.</p>
          </div>
          <div className="classes-pricing__grid">
            {PROGRAMS.map((p) => (
              <div
                key={p.key}
                className={"price-card" + (selected === p.key ? " selected" : "")}
                onClick={() => setSelected(selected === p.key ? null : p.key)}
              >
                <div className="price-card__zh">{p.zh}</div>
                <h3 className="price-card__name">{p.name}</h3>
                <div className="price-card__meta">{p.age} · {p.schedule}</div>
                <div className="price-card__price-row">
                  <div className="price-card__price">{p.price}<span className="price-card__per"> {p.per}</span></div>
                </div>
                <div className="price-card__toggle">{selected === p.key ? "Hide details ▲" : "View details ▾"}</div>
              </div>
            ))}
          </div>

          {selectedProgram && (
            <div className="price-detail">
              <div className="price-detail__head">
                <span className="price-detail__zh">{selectedProgram.zh}</span>
                <h3 className="price-detail__name">{selectedProgram.name}</h3>
              </div>
              <p className="price-detail__desc">{selectedProgram.desc}</p>
              <div className="price-detail__features">
                {selectedProgram.features.map((f) => (
                  <span className="price-detail__feature" key={f}>✓ {f}</span>
                ))}
              </div>
              <NavLink to="/Book" className="btn-dark">Book this program</NavLink>
            </div>
          )}

          <p className="classes-pricing__foot">
            Sibling discount available · No contracts, cancel anytime · <NavLink to="/Book">Book a free trial →</NavLink>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Classes;
