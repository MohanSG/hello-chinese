import { useState } from "react";
import { NavLink } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../styles/variables.css";
import "../styles/shared.css";
import "./Classes.css";

const PATHWAY = [
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
];

const SATURDAY_PROGRAMS = [
  { key: "english", name: "English Language Learning", desc: "Saturday English classes for children and young learners." },
  { key: "englishmath", name: "English Teacher-Led Math Enrichment", desc: "Math enrichment taught in English by English-speaking educators." },
];

function Classes() {
  const [selected, setSelected] = useState(null);
  const toggle = (key) => setSelected((s) => (s === key ? null : key));
  const pathwaySelected = PATHWAY.find((p) => p.key === selected) || null;
  const supportSelected = selected === "tutoring";
  const mathSelected = selected === "mathenrichment";

  return (
    <div className="classes">
      <NavBar />

      {/* HEADER */}
      <section className="classes-header">
        <div className="classes-header__watermark">课程</div>
        <div className="classes-header__inner">
          <div className="eyebrow eyebrow--light">Weekend program guide</div>
          <h1 className="classes-header__title">Find the right class.</h1>
          <p className="classes-header__desc">
            Sunday programs — Chinese learning, tutoring, and math enrichment — are open now. Saturday English programs are launching soon. Every group caps at 10 students with 2 teachers.
          </p>
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="classes-pricing">
        <div className="classes-pricing__container">
          <div className="classes-pricing__head">
            <div className="eyebrow">Weekend Language Tutoring &amp; Enrichment Program</div>
            <h2 className="section-title section-title--sm">Weekend Language Learning &amp; Enrichment</h2>
            <p className="classes-pricing__hint">Structured Saturday and Sunday programs built around language, learning, and individual growth.</p>
          </div>

          {/* Schedule overview */}
          <div className="schedule-overview">
            <a href="#saturday-programs" className="overview-card overview-card--sat">
              <div className="overview-card__title">Saturday</div>
              <div className="overview-card__desc">English Learning &amp; English-Led Enrichment</div>
              <span className="overview-card__badge overview-card__badge--soon">Coming Soon</span>
            </a>
            <a href="#sunday-programs" className="overview-card overview-card--sun">
              <div className="overview-card__title">Sunday</div>
              <div className="overview-card__desc">Chinese Learning, Tutoring &amp; Enrichment</div>
              <span className="overview-card__badge overview-card__badge--live">Now Enrolling</span>
            </a>
          </div>

          {/* Saturday programs */}
          <div id="saturday-programs" className="programs-block programs-block--sat">
            <div className="programs-block__head">
              <h3 className="programs-block__title">Saturday Programs</h3>
              <span className="programs-block__badge programs-block__badge--soon">Launching Soon</span>
            </div>
            <div className="sat-grid">
              {SATURDAY_PROGRAMS.map((s) => (
                <div className="sat-card" key={s.key}>
                  <h4 className="sat-card__name">{s.name}</h4>
                  <p className="sat-card__desc">{s.desc}</p>
                </div>
              ))}
            </div>
            <p className="programs-block__note">Schedule, pricing, and teacher details are still being finalized. Join the list to be notified when enrollment opens.</p>
            <a href="#" className="btn-interest">Join the Interest List</a>
          </div>

          {/* Sunday programs */}
          <div id="sunday-programs" className="programs-block programs-block--sun">
            <div className="programs-block__head">
              <h3 className="programs-block__title">Sunday Programs</h3>
              <span className="programs-block__badge programs-block__badge--live">Now Enrolling</span>
            </div>
            <div className="sun-grid">
              <div className="pathway-col">
                <div className="pathway-label">Chinese Learning Pathway</div>
                <div className="pathway-sub">Step-In → Step-Up → Step-Beyond</div>
                <div className="pathway-grid">
                  {PATHWAY.map((p) => (
                    <div
                      key={p.key}
                      className={"pathway-card" + (selected === p.key ? " selected" : "")}
                      onClick={() => toggle(p.key)}
                    >
                      <div className="pathway-card__zh">{p.zh}</div>
                      <h4 className="pathway-card__name">{p.name}</h4>
                      <div className="pathway-card__meta">{p.age} · {p.schedule}</div>
                      <div className="pathway-card__price-row">
                        <span className="pathway-card__price">{p.price}</span>
                        <span className="pathway-card__per">{p.per}</span>
                      </div>
                      <div className="pathway-card__toggle">{selected === p.key ? "Hide details ▲" : "View details ▾"}</div>
                    </div>
                  ))}
                </div>

                {pathwaySelected && (
                  <div className="pathway-detail">
                    <div className="pathway-detail__head">
                      <span className="pathway-detail__zh">{pathwaySelected.zh}</span>
                      <h4 className="pathway-detail__name">{pathwaySelected.name}</h4>
                    </div>
                    <p className="pathway-detail__desc">{pathwaySelected.desc}</p>
                    <div className="pathway-detail__features">
                      {pathwaySelected.features.map((f) => (
                        <span className="pathway-detail__feature" key={f}>✓ {f}</span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pathway-arrow">↓</div>

                <div
                  className={"support-card" + (supportSelected ? " selected" : "")}
                  onClick={() => toggle("tutoring")}
                >
                  <div className="support-card__label">Chinese Learning Support</div>
                  <h4 className="support-card__name">Before- &amp; After-Class Tutoring</h4>
                  <p className="support-card__desc">Support for students in Step-In, Step-Up, and Step-Beyond.</p>
                  <div className="support-card__toggle">{supportSelected ? "Hide details ▲" : "View details ▾"}</div>
                </div>

                {supportSelected && (
                  <div className="support-detail">
                    <div className="support-detail__head">
                      <h4 className="support-detail__name">Tutoring</h4>
                      <span className="support-detail__meta">Sun 9:00 AM–12:00 PM · $20 / hour</span>
                    </div>
                    <p className="support-detail__desc">Individualized support before or after the student's main class — homework help, reading, and reinforcement.</p>
                    <div className="support-detail__features">
                      <span className="support-detail__feature">✓ 10 hrs: $160</span>
                      <span className="support-detail__feature">✓ 20 hrs: $300</span>
                      <span className="support-detail__feature">✓ Optional, TA-led</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="sun-divider"></div>

              <div className="math-col">
                <div
                  className={"math-card" + (mathSelected ? " selected" : "")}
                  onClick={() => toggle("mathenrichment")}
                >
                  <div className="math-card__badge">数学</div>
                  <h4 className="math-card__name">Math Enrichment</h4>
                  <div className="math-card__rule"></div>
                  <div className="math-card__label">Independent Sunday course</div>
                  <div className="math-card__meta">Sun 11:00 AM–12:00 PM</div>
                  <div className="math-card__price-row">
                    <span className="math-card__price">$40</span>
                    <span className="math-card__per">/ session</span>
                  </div>
                  <div className="math-card__toggle">{mathSelected ? "Hide details ▲" : "View details ▾"}</div>
                </div>
                {mathSelected && (
                  <div className="math-detail">
                    <p className="math-detail__desc">Number sense, structured strategies, problem solving, and confidence — taught by public-school teachers with 3+ years of experience.</p>
                    <div className="math-detail__features">
                      <span className="math-detail__feature">✓ 10 sessions: $360</span>
                      <span className="math-detail__feature">✓ Max 10 students, 2 teachers</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Private lessons */}
          <div className="private-banner">
            <div className="private-banner__copy">
              <h3 className="private-banner__title">Private Chinese Lessons</h3>
              <p className="private-banner__desc">Flexible, personalized one-on-one instruction — Monday through Sunday, online or in person.</p>
            </div>
            <div className="private-banner__tags">
              <span className="private-banner__tag">Mon–Sun</span>
              <span className="private-banner__tag">Online or in person</span>
              <span className="private-banner__tag">$40–$70 / session</span>
              <span className="private-banner__tag">Flexible schedule</span>
            </div>
            <NavLink to="/Book" className="private-banner__btn">Book a Private Lesson</NavLink>
          </div>

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
