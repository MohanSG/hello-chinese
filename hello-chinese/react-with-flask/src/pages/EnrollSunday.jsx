import { NavLink } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../styles/variables.css";
import "./EnrollOverview.css";
import "./EnrollSaturday.css";
import "./EnrollSunday.css";

const LEVELS = [
  {
    key: "stepin", tone: "green", zh: "启蒙", title: "Step-In (Level 1)", age: "Ages 3–6", time: "9:00 – 10:00 AM",
    desc: "Build a strong foundation in Chinese through stories, songs, games, and vocabulary.",
    to: "/Enroll/Step-In",
  },
  {
    key: "stepup", tone: "blue", zh: "进阶", title: "Step-Up (Level 2)", age: "Ages 6–10", time: "10:00 – 11:00 AM",
    desc: "Expand vocabulary and sentence patterns through interactive lessons and reading.",
    to: "/Enroll/Step-Up",
  },
  {
    key: "stepbeyond", tone: "purple", zh: "精进", title: "Step-Beyond (Level 3)", age: "Ages 10+", time: "11:00 AM – 12:00 PM",
    desc: "Strengthen reading, writing, speaking, and advanced language skills.",
    to: "/Enroll/Step-Beyond",
  },
];

const SUPPORT_BULLETS = [
  "Review & reinforce key concepts",
  "Homework help",
  "Extra practice & personalized support",
];

function PeopleIcon() {
  return (
    <svg width="25" height="25" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="9" cy="8.5" r="3.2" stroke="#d98b25" strokeWidth="1.7" />
      <circle cx="16.5" cy="9.5" r="2.4" stroke="#d98b25" strokeWidth="1.7" />
      <path d="M3.5 19c0-2.9 2.5-4.6 5.5-4.6s5.5 1.7 5.5 4.6" stroke="#d98b25" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M16.5 14.6c2.3.2 4 1.7 4 4.4" stroke="#d98b25" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" stroke="#a72620" strokeWidth="1.6" />
      <path d="M3.5 9.5h17M8 3.5v3M16 3.5v3" stroke="#a72620" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function EnrollSunday() {
  return (
    <div className="enroll-overview">
      <NavBar />

      {/* HEADER */}
      <section className="enroll-header">
        <div className="enroll-header__inner">
          <div className="enroll-back">
            <NavLink to="/" className="enroll-back__link">← Back to Programs</NavLink>
          </div>
          <span className="enroll-badge enroll-badge--live">Now Enrolling</span>
          <h1 className="enroll-header__title">Sunday Programs</h1>
          <p className="enroll-header__desc">
            Chinese language classes, learning support, and math enrichment on Sunday mornings.
          </p>
        </div>
      </section>

      <section className="sun-detail">
        <div className="sun-detail__container">
          <div className="sun-detail__head">
            <span className="sun-detail__zh">课程</span>
            <h2 className="sun-detail__title">Chinese Learning Pathway (3 Levels)</h2>
          </div>

          <div className="sun-rows">
            {/* LEVEL ROWS */}
            {LEVELS.map((lvl) => (
              <div key={lvl.key} className={`sun-row sun-row--${lvl.tone}`}>
                <div className={`sun-row__badge sun-row__badge--${lvl.tone}`}>{lvl.zh}</div>
                <div>
                  <div className={`sun-row__title sun-row__title--${lvl.tone}`}>{lvl.title}</div>
                  <div className="sun-row__age">{lvl.age}</div>
                </div>
                <div className="sun-row__time"><CalendarIcon />{lvl.time}</div>
                <p className="sun-row__desc">{lvl.desc}</p>
                <NavLink to={lvl.to} className="sun-row__cta">View Plans →</NavLink>
              </div>
            ))}

            {/* LEARNING SUPPORT — subordinate to the pathway */}
            <div className="sun-row sun-row--support">
              <div className="sun-row__badge sun-row__badge--icon"><PeopleIcon /></div>
              <div>
                <div className="sun-row__eyebrow sun-row__eyebrow--brand">Supports all three levels above</div>
                <div className="sun-row__title">Chinese Learning Support (Before- &amp; After-Class Tutoring)</div>
                <div className="sun-row__age">
                  Personalized support for all three Chinese levels — added to a level plan, not a separate level.
                </div>
              </div>
              <div className="sun-row__checks">
                {SUPPORT_BULLETS.map((b) => (
                  <span key={b} className="sun-row__check"><span className="sun-row__tick">✓</span>{b}</span>
                ))}
              </div>
            </div>

            {/* MATH ENRICHMENT — independent */}
            <div className="sun-row sun-row--math">
              <div className="sun-row__badge sun-row__badge--blue">数学</div>
              <div>
                <div className="sun-row__eyebrow">Independent Sunday course</div>
                <div className="sun-row__title sun-row__title--blue">Math Enrichment</div>
                <div className="sun-row__age">Chinese Teacher-Led</div>
              </div>
              <div className="sun-row__time"><CalendarIcon />11:00 AM – 12:00 PM</div>
              <p className="sun-row__desc">
                Strengthen math foundations, build problem-solving skills, and boost confidence. Available with Step-In and Step-Up plans.
              </p>
              <NavLink to="/Enroll/Step-In" className="sun-row__cta sun-row__cta--ghost">View Plans →</NavLink>
            </div>

            {/* NEXT STEP */}
            <div className="sun-next">
              <span><strong>Next step:</strong> choose your child's level to view available Sunday plans.</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default EnrollSunday;
