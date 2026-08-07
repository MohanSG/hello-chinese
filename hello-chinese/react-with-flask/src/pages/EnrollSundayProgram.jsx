import { NavLink, useSearchParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../styles/variables.css";
import "./EnrollOverview.css";
import "./EnrollSaturday.css";
import "./EnrollSundayProgram.css";

const LEVELS = [
  {
    key: "stepin", tone: "green", zh: "启蒙",
    title: "Step-In Chinese", subtitle: "Building Language Foundations",
    age: "Recommended Ages 3–6+", time: "9:00 – 10:00 AM",
    desc: "Build a strong foundation through vocabulary, sentence formation, and early literacy, while developing confidence and a natural feel for Chinese.",
    to: "/Enroll/Step-In",
  },
  {
    key: "stepup", tone: "blue", zh: "进阶",
    title: "Step-Up Chinese", subtitle: "Developing Language Skills",
    age: "Recommended Ages 7–10", time: "10:00 – 11:00 AM",
    desc: "Develop core language skills through expanded sentence patterns, structured reading and writing, and comprehension, while applying Chinese in meaningful contexts.",
    to: "/Enroll/Step-Up",
  },
  {
    key: "stepbeyond", tone: "purple", zh: "精进",
    title: "Step-Beyond Chinese", subtitle: "Advancing Language Independence",
    age: "Recommended Ages 10+", time: "11:00 AM – 12:00 PM",
    desc: "Advance toward independent language use through deeper reading, more complex writing, real-world communication, and project-based learning, while developing the confidence to express ideas with greater depth and clarity.",
    to: "/Enroll/Step-Beyond",
  },
];

const PATHWAY_INTRO =
  "A structured Mandarin pathway designed to support continuous growth from foundational language skills to increasingly independent Chinese use.";

// Support layers onto any level; math is an independent course, so it never
// uses the Step-In / Step-Up / Step-Beyond names.
const SUPPORT_FEATURES = [
  { title: "Review & Reinforce", desc: "Strengthen key learning through guided practice." },
  { title: "Speak with Confidence", desc: "Build communication skills through conversation and role-play." },
  { title: "Personalized Support", desc: "Learn at your own pace with small-group guidance." },
];

const MATH_FEATURES = [
  { title: "Strengthen Mathematical Foundations", desc: "Build accuracy, fluency, and strong core skills." },
  { title: "Cultivate Mathematical Thinking", desc: "Develop reasoning and problem-solving strategies." },
  { title: "Support Academic Growth", desc: "Build confidence and support stronger academic performance." },
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

function EnrollSundayProgram() {
  const [search] = useSearchParams();
  const childNo = Number(search.get("child")) || 1;
  const childQuery = childNo > 1 ? `?child=${childNo}` : "";
  return (
    <div className="enroll-overview">
      <NavBar />

      {/* HEADER */}
      <section className="enroll-header">
        <div className="enroll-header__watermark">周日</div>
        <div className="enroll-header__inner">
          <div className="enroll-back">
            <NavLink to="/" className="enroll-back__link">← Back to Programs</NavLink>
          </div>
          <span className="enroll-badge enroll-badge--live">Now Enrolling</span>
          {childNo > 1 && (
            <div className="enroll-childbanner">
              <span className="enroll-childnum">{childNo}</span>
              You are enrolling Child {childNo}. This child can choose a different level, plan, and
              Sundays — parent information is already saved.
            </div>
          )}
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
            <h2 className="sun-detail__title">Chinese Learning Pathway</h2>
          </div>
          <p className="sun-detail__intro">{PATHWAY_INTRO}</p>

          <div className="sun-rows">
            {/* LEVEL ROWS */}
            {LEVELS.map((lvl) => (
              <div key={lvl.key} className={`sun-row sun-row--${lvl.tone}`}>
                <div className={`sun-row__badge sun-row__badge--${lvl.tone}`}>{lvl.zh}</div>
                <div>
                  <div className={`sun-row__title sun-row__title--${lvl.tone}`}>{lvl.title}</div>
                  <div className={`sun-row__subtitle sun-row__subtitle--${lvl.tone}`}>{lvl.subtitle}</div>
                  <div className="sun-row__age">{lvl.age}</div>
                </div>
                <div className="sun-row__time"><CalendarIcon />{lvl.time}</div>
                <p className="sun-row__desc">{lvl.desc}</p>
                <NavLink to={lvl.to + childQuery} className="sun-row__cta">Choose Your Plan →</NavLink>
              </div>
            ))}

            {/* LEARNING SUPPORT — subordinate to the pathway */}
            <div className="sun-row sun-row--support">
              <div className="sun-row__badge sun-row__badge--icon"><PeopleIcon /></div>
              <div>
                <div className="sun-row__eyebrow sun-row__eyebrow--brand">Supports all three Chinese levels</div>
                <div className="sun-row__title">Chinese Learning Support</div>
                <div className="sun-row__subtitle sun-row__subtitle--amber">Optional Before- &amp; After-Class Tutoring</div>
                <div className="sun-row__age">
                  Personalized support to review class learning, strengthen communication skills, and provide homework guidance.
                </div>
              </div>
              <div className="sun-row__features">
                {SUPPORT_FEATURES.map((f) => (
                  <div key={f.title} className="sun-feature">
                    <span className="sun-feature__tick sun-feature__tick--amber" aria-hidden="true">✓</span>
                    <span>
                      <span className="sun-feature__title">{f.title}</span>
                      <span className="sun-feature__desc">{f.desc}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* MATH ENRICHMENT — independent */}
            <div className="sun-row sun-row--math">
              <div className="sun-row__badge sun-row__badge--blue">数学</div>
              <div>
                <div className="sun-row__eyebrow">Independent Sunday course</div>
                <div className="sun-row__title sun-row__title--blue">Math Enrichment</div>
                <div className="sun-row__subtitle sun-row__subtitle--blue">Grouped by Grade &amp; Skill Level</div>
                <div className="sun-row__age">Recommended Ages 7–12</div>
                <div className="sun-row__time sun-row__time--inline"><CalendarIcon />11:00 AM – 12:00 PM</div>
              </div>
              <div>
                <p className="sun-row__desc">
                  Math instruction designed to strengthen foundations, calculation skills, logical reasoning,
                  problem-solving, confidence, and academic performance.
                </p>
                <div className="sun-row__features">
                  {MATH_FEATURES.map((f) => (
                    <div key={f.title} className="sun-feature">
                      <span className="sun-feature__tick sun-feature__tick--blue" aria-hidden="true">✓</span>
                      <span>
                        <span className="sun-feature__title">{f.title}</span>
                        <span className="sun-feature__desc">{f.desc}</span>
                      </span>
                    </div>
                  ))}
                </div>
                <p className="sun-row__grouping">
                  Students are grouped based on both grade level and mathematical ability.
                </p>
              </div>
              <NavLink to={"/Enroll/Step-In" + childQuery} className="sun-row__cta sun-row__cta--ghost">Choose Your Plan →</NavLink>
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

export default EnrollSundayProgram;
