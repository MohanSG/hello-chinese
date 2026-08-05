import { NavLink } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../styles/variables.css";
import "./EnrollOverview.css";

const PROGRAMS = [
  {
    key: "saturday",
    to: "/Enroll/Saturday",
    variant: "soon",
    badge: "Coming Soon",
    title: "Saturday Programs",
    bullets: ["English + English-led Math", "Interest List only"],
    cta: "Join Interest List",
  },
  {
    key: "sunday",
    to: "/Enroll/Sunday",
    variant: "live",
    badge: "Now Enrolling",
    title: "Sunday Programs",
    bullets: ["3 Chinese Levels", "Tutoring Support + Math"],
    cta: "View Sunday Programs",
  },
  {
    key: "private",
    to: "/Enroll/Private",
    variant: "private",
    badge: "Flexible Schedule",
    title: "Private Lessons",
    bullets: ["Flexible 1-on-1 Chinese", "Monday–Sunday", "Inquiry form"],
    cta: "Contact Us",
  },
];

function EnrollOverview() {
  return (
    <div className="enroll-overview">
      <NavBar />

      {/* HEADER */}
      <section className="enroll-header">
        <div className="enroll-header__watermark">报名</div>
        <div className="enroll-header__inner">
          <div className="enroll-header__eyebrow">Fall Enrollment</div>
          <h1 className="enroll-header__title">Which program is your family enrolling in?</h1>
          <p className="enroll-header__desc">
            Choose a schedule to see programs, levels, and packages built for that day.
          </p>
        </div>
      </section>

      {/* PROGRAM CARDS */}
      <section className="enroll-programs">
        <div className="enroll-programs__container">
          <div className="enroll-programs__grid">
            {PROGRAMS.map((p) => (
              <NavLink key={p.key} to={p.to} className={`program-card program-card--${p.variant}`}>
                <span className={`program-card__badge program-card__badge--${p.variant}`}>{p.badge}</span>
                <h2 className="program-card__title">{p.title}</h2>
                <ul className="program-card__list">
                  {p.bullets.map((b) => (
                    <li key={b} className="program-card__item">{b}</li>
                  ))}
                </ul>
                <span className={`program-card__cta program-card__cta--${p.variant}`}>{p.cta}</span>
              </NavLink>
            ))}
          </div>

          <div className="enroll-programs__secondary">
            <NavLink to="/Book" className="btn-trial">Book a Free Trial</NavLink>
            <p className="enroll-programs__note">Not ready to enroll? A free trial is always available.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default EnrollOverview;
