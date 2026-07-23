import { NavLink } from "react-router-dom";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import Faq from "../components/Faq";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { useLanguage } from "../i18n/LanguageContext";
import "../styles/variables.css";
import "../styles/shared.css";
import "./Home.css";

import rocket from "../assets/Icons/Home/rocket.png";
import idea from "../assets/Icons/Home/idea.png";
import id from "../assets/Icons/Home/id.png";
import award from "../assets/Icons/Home/award.png";

const PILLARS = [
  { icon: rocket, t: "Speak from day one", d: "Students hear and use real Mandarin in every lesson, so confidence comes before rules." },
  { icon: idea, t: "Language + culture", d: "Stories, festivals and everyday life make the language meaningful, not memorized." },
  { icon: id, t: "Small groups", d: "Six students max means every child is seen, heard, and gently pushed forward." },
  { icon: award, t: "Visible progress", d: "Clear levels, weekly practice and parent updates so you always know how it’s going." },
];

const OFFERS = [
  { name: "Step-In", zh: "启蒙", price: "$40", per: "/ session", blurb: "Ages 3–6 — playful entry to Mandarin listening, speaking, and everyday communication.", save: "10 for $360", popular: false,
    features: ["Sunday 9:00–10:00 AM", "Ages 3–6", "Max 10 students, 2 teachers", "Weekly parent updates"] },
  { name: "Step-Up", zh: "进阶", price: "$40", per: "/ session", blurb: "Ages 6–10 — confident literacy and communication in meaningful contexts.", save: "10 for $360", popular: false,
    features: ["Sunday 10:00–11:00 AM", "Ages 6–10", "Max 10 students, 2 teachers", "Weekly parent updates"] },
  { name: "Step-Beyond", zh: "精进", price: "$40", per: "/ session", blurb: "Ages 10+ — structured expression, critical thinking, and collaborative learning.", save: "10 for $360", popular: false,
    features: ["Sunday 11:00 AM–12:00 PM", "Ages 10+", "Max 10 students, 2 teachers", "Weekly parent updates"] },
  { name: "Tutoring", zh: "辅导", price: "$20", per: "/ hour", blurb: "Individualized support before or after the student's main class.", save: "10 hrs $160 · 20 hrs $300", popular: false,
    features: ["Sunday 9:00 AM–12:00 PM", "Per hour", "10 hrs $160 · 20 hrs $300", "Homework help & review"] },
  { name: "Math Enrichment", zh: "数学", price: "$40", per: "/ session", blurb: "Number sense, structured strategies, problem solving, and confidence.", save: "10 for $360", popular: true,
    features: ["Sunday 11:00 AM–12:00 PM", "Public-school teachers, 3+ yrs exp.", "Max 10 students, 2 teachers", "Weekly parent updates"] },
  { name: "Private Chinese Lessons", zh: "私教", price: "$40–$70", per: "/ session", blurb: "Flexible personalized instruction, online or in person, after consultation.", save: "", popular: false,
    features: ["Online or in-home", "Priced by duration & format", "Individual requirements", "1-on-1 instruction"] },
];

const STATS = [["10", "statMaxStudents"], ["2", "statTeachers"], ["3-5+ yrs", "statExperience"], ["Sundays", "statSchedule"]];

const GLANCE = [
  ["glanceWho", "glanceWhoVal"],
  ["glanceWhat", "glanceWhatVal"],
  ["glanceSchedule", "glanceScheduleVal"],
  ["glancePricing", "glancePricingVal"],
];

function Home() {
  const { t } = useLanguage();
  return (
    <div className="home">
      <NavBar />
      <Hero />

      {/* AT A GLANCE */}
      <div className="glance-strip">
        <div className="glance-strip__inner">
          {GLANCE.map(([labelKey, valueKey]) => (
            <div key={labelKey} className="glance">
              <span className="glance__label">{t(`home.${labelKey}`)}</span>
              <span className="glance__value">{t(`home.${valueKey}`)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* TRUST STRIP */}
      <div className="stat-strip">
        <div className="stat-strip__inner">
          {STATS.map(([n, labelKey]) => (
            <div key={labelKey} className="stat">
              <span className="stat__num">{n}</span>
              <span className="stat__label">{t(`home.${labelKey}`)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* WHO WE ARE */}
      <section className="home-about">
        <div className="home-about__grid">
          <div className="home-about__photo-wrap">
            <div className="photo-placeholder home-about__photo">
              <span className="photo-placeholder__tag">◈ PHOTO — founder / lead teacher portrait</span>
            </div>
            <div className="home-about__badge hc-float">
              <div className="home-about__badge-zh">用心</div>
              <div className="home-about__badge-text">taught with heart</div>
            </div>
          </div>
          <div>
            <div className="eyebrow">{t("home.aboutEyebrow")}</div>
            <h2 className="home-about__title">{t("home.aboutTitle")}</h2>
            <p className="home-about__p">
              {t("home.aboutP1")}
            </p>
            <p className="home-about__p">
              {t("home.aboutP2")}
            </p>
            <p className="home-about__teacher-standard">
              {t("home.teacherStandard")}
            </p>
            <div className="home-about__facts">
              {["factCertified", "factAges", "factOnline"].map((key) => (
                <div key={key} className="home-about__fact">
                  <span className="home-about__fact-dot" />
                  <span className="home-about__fact-text">{t(`home.${key}`)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OUR PHILOSOPHY */}
      <section className="home-philosophy">
        <div className="home-philosophy__container">
          <div className="home-philosophy__head">
            <div className="eyebrow">Our philosophy</div>
            <h2 className="section-title">Fluency grows from confidence, not memorization.</h2>
            <p className="home-philosophy__lede">Four principles shape every lesson we teach — and every child who walks out of it a little bolder.</p>
          </div>
          <div className="home-philosophy__grid">
            {PILLARS.map((p) => (
              <div key={p.t} className="home-pillar">
                <div className="home-pillar__icon-wrap"><img className="home-pillar__icon" src={p.icon} alt="" /></div>
                <h3 className="home-pillar__title">{p.t}</h3>
                <p className="home-pillar__desc">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE OFFER */}
      <section className="home-offers">
        <div className="home-offers__container">
          <div className="home-offers__head">
            <div className="eyebrow">What we offer</div>
            <h2 className="section-title">Class Introductions</h2>
            <p className="home-offers__lede">Live, small-group classes billed monthly. No contracts — pause or switch programs anytime.</p>
          </div>
          <div className="home-offers__grid">
            {OFFERS.map((o) => (
              <div key={o.name} className={"offer-card" + (o.popular ? " popular" : "")}>
                {o.popular && <div className="offer-card__badge">Most popular</div>}
                <div className="offer-card__zh">{o.zh}</div>
                <h3 className="offer-card__name">{o.name}</h3>
                <p className="offer-card__blurb">{o.blurb}</p>
                <div className="offer-card__price-row">
                  <span className="offer-card__price">{o.price}</span>
                  <span className="offer-card__per">{o.per}</span>
                </div>
                <div className="offer-card__save">{o.save}</div>
                <div className="offer-card__features">
                  {o.features.map((f) => (
                    <div key={f} className="offer-card__feature">
                      <span className="offer-card__check">✓</span>
                      <span className="offer-card__feature-text">{f}</span>
                    </div>
                  ))}
                </div>
                <NavLink to="/Book" className="offer-card__btn">Book this class</NavLink>
              </div>
            ))}
          </div>
          <p className="home-offers__foot">
            Sibling discount available · Financial aid available · <NavLink to="/Contact">Ask about Private Chinese Lessons →</NavLink>
          </p>
        </div>
      </section>

      {/* FREE TRIAL BAND */}
      <section className="home-trial">
        <div className="home-trial__watermark">学</div>
        <div className="home-trial__grid">
          <div>
            <div className="eyebrow eyebrow--light">Free trial lesson</div>
            <h2 className="home-trial__title">Your child's first class is on us.</h2>
            <p className="home-trial__desc">
              Book a free 30-minute trial and watch your child speak their first Mandarin sentences. No commitment, no pressure — just a warm first lesson.
            </p>
            <div className="home-trial__pills">
              <span className="pill">✓ No commitment</span>
              <span className="pill">✓ 30 minutes</span>
              <span className="pill">✓ Online or in-person</span>
            </div>
          </div>
          <div className="home-trial__card">
            <div className="home-trial__card-title">Reserve a trial spot</div>
            <p className="home-trial__card-desc">Pick a program and we'll match you with a teacher this week.</p>
            <NavLink to="/Book" className="btn-red" style={{ display: "block" }}>Book your free trial →</NavLink>
            <div className="home-trial__card-alt">or call <a href="tel:+18005551234">(800) 555-1234</a></div>
          </div>
        </div>
      </section>

      <Faq />
      <Contact />
      <Footer />
    </div>
  );
}

export default Home;
