import { useState } from "react";
import { NavLink } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../styles/variables.css";
import "../styles/shared.css";
import "./Classes.css";

const PRICING = [
  {
    key: "chinese", zh: "中文", name: "Mandarin Chinese", price: "$180", was: "$200", best: false,
    desc: "Live small-group Mandarin instruction from first words to real conversation. Students progress through three levels — beginner, intermediate, and advanced — building speaking confidence first, then layering in reading, writing, and characters.",
    features: ["3 levels: beginner → advanced", "6-student class cap", "Weekly parent updates"],
  },
  {
    key: "combo", zh: "套餐", name: "Math + Chinese", price: "$300", was: "$340", best: true,
    desc: "Both programs on one simple monthly plan — 8 live lessons total each month. Our best value for families enrolling in both subjects, saving $40/month versus booking separately.",
    features: ["8 live lessons / month", "Save $40/mo vs. separate", "6-student class cap"],
  },
  {
    key: "math", zh: "数学", name: "Math", price: "$160", was: "$180", best: false,
    desc: "Grade-aligned math taught in the same small-group, confidence-first style — from K–2 foundations through pre-algebra. We build real number sense and problem-solving, not just answers.",
    features: ["K–2 through pre-algebra", "6-student class cap", "Weekly parent updates"],
  },
];

function Classes() {
  const [selected, setSelected] = useState(null);
  const selectedPlan = PRICING.find((p) => p.key === selected) || null;

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
            Live, small-group classes in Mandarin and Math — or both. Every class caps at 6 students and includes weekly parent updates.
          </p>
        </div>
      </section>

      {/* MANDARIN + MATH */}
      <section className="classes-programs">
        <div className="classes-programs__container">
          <div className="classes-programs__grid">
            <div className="program-card">
              <div className="program-card__photo"><span className="photo-placeholder__tag">◈ PHOTO — Mandarin class in session</span></div>
              <div className="program-card__body">
                <div className="program-card__zh">中文</div>
                <h2 className="program-card__title">Mandarin Chinese</h2>
                <p className="program-card__desc">
                  From first words to real conversation. Students build speaking confidence early, then layer in reading, writing, and characters as they progress through three levels — beginner to advanced.
                </p>
                <div className="program-card__foot">
                  <div><span className="program-card__price">$180</span><span className="program-card__per"> / month</span></div>
                  <NavLink to="/Book" className="program-card__btn">Book this class</NavLink>
                </div>
              </div>
            </div>

            <div className="program-card">
              <div className="program-card__photo program-card__photo--math"><span className="photo-placeholder__tag">◈ PHOTO — Math class in session</span></div>
              <div className="program-card__body">
                <div className="program-card__zh">数学</div>
                <h2 className="program-card__title">Math</h2>
                <p className="program-card__desc">
                  Grade-aligned math taught in the same small-group, confidence-first style — from K–2 foundations through pre-algebra. We build real number sense and problem-solving, not just answers.
                </p>
                <div className="program-card__foot">
                  <div><span className="program-card__price">$160</span><span className="program-card__per"> / month</span></div>
                  <NavLink to="/Book" className="program-card__btn">Book this class</NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMBO */}
      <section className="classes-combo">
        <div className="classes-combo__watermark">套餐</div>
        <div className="classes-combo__inner">
          <div className="classes-combo__zh">套餐</div>
          <h2 className="classes-combo__title">Math + Chinese Combo</h2>
          <p className="classes-combo__desc">Both programs, one simple monthly plan, 8 live lessons total — our best value for families doing both.</p>
          <div className="classes-combo__save">Save $40/month vs. booking separately</div>
          <NavLink to="/Book" className="btn-red">Book the combo →</NavLink>
        </div>
      </section>

      {/* PRICING RECAP */}
      <section className="classes-pricing">
        <div className="classes-pricing__container">
          <div className="classes-pricing__head">
            <div className="eyebrow">Pricing</div>
            <h2 className="section-title section-title--sm">Simple monthly plans</h2>
            <p className="classes-pricing__hint">Tap a plan for details</p>
          </div>
          <div className="classes-pricing__grid">
            {PRICING.map((p) => (
              <div
                key={p.key}
                className={"price-card" + (p.best ? " best" : "") + (selected === p.key ? " selected" : "")}
                onClick={() => setSelected(selected === p.key ? null : p.key)}
              >
                {p.best && <div className="price-card__ribbon">Best value</div>}
                <div className="price-card__zh">{p.zh}</div>
                <h3 className="price-card__name">{p.name}</h3>
                <div className="price-card__price-row">
                  {p.was && <span className="price-card__was">{p.was}</span>}
                  <div className="price-card__price">{p.price}<span className="price-card__per"> / month</span></div>
                </div>
                <div className="price-card__toggle">{selected === p.key ? "Hide details ▲" : "View details ▾"}</div>
              </div>
            ))}
          </div>

          {selectedPlan && (
            <div className="price-detail">
              <div className="price-detail__head">
                <span className="price-detail__zh">{selectedPlan.zh}</span>
                <h3 className="price-detail__name">{selectedPlan.name}</h3>
              </div>
              <p className="price-detail__desc">{selectedPlan.desc}</p>
              <div className="price-detail__features">
                {selectedPlan.features.map((f) => (
                  <span className="price-detail__feature" key={f}>✓ {f}</span>
                ))}
              </div>
            </div>
          )}

          <p className="classes-pricing__foot">
            Sibling discount 10% · No contracts, cancel anytime · <NavLink to="/Book">Book a free trial →</NavLink>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Classes;
