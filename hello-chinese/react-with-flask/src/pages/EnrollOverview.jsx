import { NavLink } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../styles/variables.css";
import "./EnrollOverview.css";

// Mobile priority: the free trial comes first for new families, then Sunday
// (enrolling now), Saturday (interest list), and Private lessons.
const PROGRAMS = [
  {
    key: "sunday",
    to: "/Enroll/Sunday",
    variant: "live",
    badge: "Now Enrolling",
    title: "Sunday Programs",
    bullets: ["Chinese Learning Pathway", "Chinese Learning Support", "Math Enrichment"],
    cta: "View Sunday Programs",
  },
  {
    key: "saturday",
    to: "/Enroll/Saturday",
    variant: "soon",
    badge: "Coming Soon",
    title: "Saturday Programs",
    bullets: ["English Language Learning", "English Teacher-Led Math Enrichment"],
    cta: "Join the Interest List",
  },
  {
    key: "private",
    to: "/Enroll/Private",
    variant: "private",
    badge: "Flexible Schedule",
    title: "Private Lessons",
    bullets: ["One-on-One Chinese", "Monday–Sunday", "Online or In Person"],
    cta: "Learn More",
  },
];

function EnrollOverview() {
  return (
    <div className="enroll-overview">
      <NavBar />

      {/* Part 1 — warm, brand-led hero (replaces the old dark header band) */}
      <section className="enroll-hero">
        <div className="enroll-hero__art" aria-hidden="true" />
        <div className="enroll-hero__scrim" aria-hidden="true" />
        <div className="enroll-hero__inner">
          <div className="enroll-hero__copy">
            <div className="enroll-hero__eyebrow">Fall Enrollment</div>
            <h1 className="enroll-hero__title">
              Find the Right<br />
              <span className="enroll-hero__title-accent">Program</span> for Your Child
            </h1>
            <p className="enroll-hero__desc">
              Explore our Sunday Chinese programs, free trial options, and flexible learning
              opportunities for Fall 2026.
            </p>
            <div className="enroll-hero__actions">
              <NavLink to="/Enroll/Sunday" className="enroll-hero__cta enroll-hero__cta--primary">
                View Sunday Programs <span aria-hidden="true">→</span>
              </NavLink>
              <NavLink to="/FreeTrial" className="enroll-hero__cta enroll-hero__cta--secondary">
                Book a Free Trial <span aria-hidden="true">→</span>
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      <section className="enroll-programs">
        <div className="enroll-programs__container">
          <div className="trial">
            <div className="trial__watermark" aria-hidden="true">试</div>
            <div className="trial__inner">
              <h2 className="trial__title">New to Hello Chinese?</h2>
              <p className="trial__desc">
                Experience a class, meet our teachers, and find the right level for your child.
              </p>
              <NavLink to="/Book" className="trial__cta">Book a Free Trial Class</NavLink>
            </div>
          </div>

          <div className="enroll-divider">
            <span className="enroll-divider__rule" aria-hidden="true" />
            <span className="enroll-divider__text">Already learning with us? Explore our fall programs below.</span>
            <span className="enroll-divider__rule" aria-hidden="true" />
          </div>

          <div className="enroll-programs__grid">
            {PROGRAMS.map((p) => (
              <NavLink key={p.key} to={p.to} className={`program-card program-card--${p.variant}`}>
                <span className={`program-card__badge program-card__badge--${p.variant}`}>{p.badge}</span>
                <h2 className="program-card__title">{p.title}</h2>
                <ul className="program-card__list">
                  {p.bullets.map((b) => (
                    <li key={b} className="program-card__item">
                      <span className="program-card__check" aria-hidden="true">✓</span>
                      {b}
                    </li>
                  ))}
                </ul>
                <span className={`program-card__cta program-card__cta--${p.variant}`}>
                  {p.cta} <span aria-hidden="true">→</span>
                </span>
              </NavLink>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default EnrollOverview;
