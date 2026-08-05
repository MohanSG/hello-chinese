import { NavLink } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../styles/variables.css";
import "./EnrollStepIn.css";


const PLANS = [
  {
    num: "1", name: "Plan 1 — Chinese Only", wide: false,
    blocks: [{ time: "9:00–10:00", label: "Chinese Class" }],
    price: "$360", save: "Save $40", href: "/Enroll/Review?level=step-in&plan=1",
  },
  {
    num: "2", name: "Plan 2 — Chinese + 1 Tutoring", wide: false,
    blocks: [{ time: "9:00–10:00", label: "Chinese" }, { time: "10:00–11:00", label: "After-Class Tutoring" }],
    price: "$520", save: "Save $80", href: "/Enroll/Review?level=step-in&plan=2",
  },
  {
    num: "3", name: "Plan 3 — Chinese + 2 Tutoring", wide: false,
    blocks: [{ time: "9:00–10:00", label: "Chinese" }, { time: "10:00–11:00", label: "Tutoring" }, { time: "11:00–12:00", label: "Tutoring" }],
    price: "$660", save: "Save $140", href: "/Enroll/Review?level=step-in&plan=3",
  },
  {
    num: "4", name: "Plan 4 — Chinese + Math", wide: false,
    blocks: [{ time: "9:00–10:00", label: "Chinese" }, { time: "11:00–12:00", label: "Math Enrichment" }],
    price: "$720", save: "Save $80", href: "/Enroll/Review?level=step-in&plan=4",
  },
  {
    num: "5", name: "Plan 5 — Chinese + Tutoring + Math", wide: true,
    blocks: [{ time: "9:00–10:00", label: "Chinese" }, { time: "10:00–11:00", label: "After-Class Tutoring" }, { time: "11:00–12:00", label: "Math Enrichment" }],
    price: "$880", save: "Save $120", href: "/Enroll/Review?level=step-in&plan=5",
  },
];

function TutoringIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 5.5C6 4.6 9 4.6 11 5.6V19C9 18 6 18 4 19V5.5Z" stroke="#8a6d2f" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M20 5.5C18 4.6 15 4.6 13 5.6V19C15 18 18 18 20 19V5.5Z" stroke="#8a6d2f" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function MathIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4.5" y="3" width="15" height="18" rx="2.5" stroke="#8a6d2f" strokeWidth="1.6" />
      <rect x="7" y="5.6" width="10" height="3.4" rx="1" stroke="#8a6d2f" strokeWidth="1.4" />
      <circle cx="9" cy="13" r="1" fill="#8a6d2f" />
      <circle cx="12" cy="13" r="1" fill="#8a6d2f" />
      <circle cx="15" cy="13" r="1" fill="#8a6d2f" />
      <circle cx="9" cy="17" r="1" fill="#8a6d2f" />
      <circle cx="12" cy="17" r="1" fill="#8a6d2f" />
      <circle cx="15" cy="17" r="1" fill="#8a6d2f" />
    </svg>
  );
}

function EnrollStepIn() {
  return (
    <div className="step-page">
      <NavBar />

      <section className="step-head">
        <div className="step-head__inner">
          <NavLink to="/Enroll/Sunday" className="step-head__back">← Back to Sunday Programs</NavLink>
          <h1 className="step-head__title">Choose a Plan for Step-In</h1>
          <p className="step-head__desc">Chinese class time: Sunday 9:00–10:00 AM</p>
        </div>
      </section>

      <section className="step-section">
        <div className="step-container">

          <div className="step-schedule">
            <div className="step-schedule__label">Sunday Schedule Preview</div>
            <div className="step-schedule__grid">
              <div className="step-schedule__item step-schedule__item--active">
                <div className="step-schedule__icon step-schedule__icon--active">中</div>
                <div>
                  <div className="step-schedule__time step-schedule__time--active">9:00–10:00</div>
                  <div className="step-schedule__label2">Chinese</div>
                </div>
              </div>
              <div className="step-schedule__div"></div>
              <div className="step-schedule__item">
                <div className="step-schedule__icon"><TutoringIcon /></div>
                <div>
                  <div className="step-schedule__time">10:00–11:00</div>
                  <div className="step-schedule__label2 step-schedule__label2--muted">Tutoring</div>
                </div>
              </div>
              <div className="step-schedule__div"></div>
              <div className="step-schedule__item">
                <div className="step-schedule__icon"><MathIcon /></div>
                <div>
                  <div className="step-schedule__time">11:00–12:00</div>
                  <div className="step-schedule__label2 step-schedule__label2--muted">Math</div>
                </div>
              </div>
            </div>
          </div>

          <div className="step-plan-grid">
            {PLANS.map((plan) => (
              <div key={plan.num} className={"step-plan" + (plan.wide ? " step-plan--wide" : "")}>
                <div className="step-plan__inner">
                  <div className="step-plan__left">
                    <div className="step-plan__num">{plan.num}</div>
                    <div>
                      <h3 className="step-plan__name">{plan.name}</h3>
                      <div className="step-plan__blocks">
                        {plan.blocks.map((b, i) => (
                          <span key={i} className="step-plan__block">
                            <span className="step-plan__tick">✓</span>
                            <span className="step-plan__block-time">{b.time}</span>· {b.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="step-plan__price">
                    <div className="step-plan__price-label">Package price</div>
                    <div className="step-plan__price-value">{plan.price}</div>
                    <div className="step-plan__price-save">{plan.save}</div>
                    <div className="step-plan__price-term">10-session package</div>
                    <NavLink to={plan.href} className="step-plan__cta">Select Plan</NavLink>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="step-note">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="#a72620" strokeWidth="1.6" /><path d="M12 10.6V17" stroke="#a72620" strokeWidth="1.7" strokeLinecap="round" /><circle cx="12" cy="7.6" r="1.1" fill="#a72620" /></svg>
            <span className="step-note__text">
              Every plan is a 10-Session Full-Term Package. Additional siblings receive $30 off each package.
            </span>
          </p>

        </div>
      </section>

      <Footer />
    </div>
  );
}

export default EnrollStepIn;
