import { NavLink } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../styles/variables.css";
import "../styles/shared.css";
import "./About.css";

const VALUES = [
  { zh: "用心", t: "Taught with heart", d: "Every teacher knows their students by name. Warmth and patience come before pressure and grades." },
  { zh: "耐心", t: "Confidence first", d: "We meet children where they are and let small wins build. A confident learner is an unstoppable one." },
  { zh: "文化", t: "Language + culture", d: "Festivals, stories and everyday life make the language stick — and connect kids to a living culture." },
];

const TEACHERS = [
  { name: "Mei Lin", role: "Founder · Mandarin", bio: "Certified teacher and the voice behind those first kitchen-table lessons." },
  { name: "David Chen", role: "Mandarin · Teens", bio: "Makes grammar feel like a game and loves prepping students for AP Chinese." },
  { name: "Grace Wu", role: "Math · K–8", bio: "Turns word problems into stories kids actually want to solve." },
  { name: "Alan Zhao", role: "Mandarin · Beginners", bio: "Patient, playful, and fluent in the art of the encouraging high-five." },
];

const STATS = [["1,200+", "students taught"], ["10 yrs", "teaching experience"], ["14", "certified teachers"], ["4.9★", "average parent rating"]];

function About() {
  return (
    <div className="about">
      <NavBar />

      {/* HEADER BAND */}
      <section className="about-header">
        <div className="about-header__watermark">我们</div>
        <div className="about-header__inner">
          <div className="eyebrow eyebrow--light">Our story</div>
          <h1 className="about-header__title">About HelloChinese</h1>
          <p className="about-header__desc">
            We're a small team of teachers on a simple mission: help American kids grow up genuinely bilingual — with warmth, patience, and a lot of conversation.
          </p>
        </div>
      </section>

      {/* STORY */}
      <section className="about-story">
        <div className="about-story__grid">
          <div className="about-story__photo-wrap">
            <div className="photo-placeholder about-story__photo">
              <span className="photo-placeholder__tag">◈ PHOTO — founder teaching a class</span>
            </div>
            <div className="about-story__badge hc-float">
              <div className="about-story__badge-year">2016</div>
              <div className="about-story__badge-text">teaching since</div>
            </div>
          </div>
          <div>
            <div className="eyebrow">How we started</div>
            <h2 className="about-story__title">It began at a kitchen table.</h2>
            <p className="about-story__p">
              HelloChinese started when a handful of parents asked one teacher to help their kids learn Mandarin the way children actually learn a language — by speaking it, playing with it, and hearing it every week.
            </p>
            <p className="about-story__p">
              Those first lessons around a kitchen table grew into a school. Today we teach over a thousand students across the country, online and in person, but the philosophy hasn't changed: keep classes small, keep them warm, and let confidence lead.
            </p>
            <p className="about-story__p">
              We believe a second language is one of the most generous gifts you can give a child — a wider world, a deeper connection to family and culture, and a lifelong sense that <span className="about-story__zh-inline">我可以</span> — "I can."
            </p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="stat-strip">
        <div className="stat-strip__inner">
          {STATS.map(([n, l]) => (
            <div key={l} className="stat">
              <span className="stat__num">{n}</span>
              <span className="stat__label">{l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* VALUES */}
      <section className="about-values">
        <div className="about-values__container">
          <div className="about-values__head">
            <div className="eyebrow">What we believe</div>
            <h2 className="section-title section-title--sm">The values behind every lesson</h2>
          </div>
          <div className="about-values__grid">
            {VALUES.map((v) => (
              <div key={v.t} className="value-card">
                <div className="value-card__zh">{v.zh}</div>
                <h3 className="value-card__title">{v.t}</h3>
                <p className="value-card__desc">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEACHERS */}
      <section className="about-teachers">
        <div className="about-teachers__container">
          <div className="about-teachers__head">
            <div className="eyebrow">Meet the teachers</div>
            <h2 className="section-title section-title--sm">Certified, native, and genuinely kind</h2>
            <p className="about-teachers__lede">Every teacher is a certified educator and native speaker who loves working with kids.</p>
          </div>
          <div className="about-teachers__grid">
            {TEACHERS.map((t) => (
              <div key={t.name} className="teacher-card">
                <div className="teacher-card__photo"><span className="teacher-card__photo-tag">◈ PHOTO</span></div>
                <div className="teacher-card__body">
                  <h3 className="teacher-card__name">{t.name}</h3>
                  <div className="teacher-card__role">{t.role}</div>
                  <p className="teacher-card__bio">{t.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="about-cta">
        <div className="about-cta__watermark">你好</div>
        <div className="about-cta__inner">
          <h2 className="about-cta__title">Come say 你好.</h2>
          <p className="about-cta__desc">Book a free trial lesson and meet the team. We'd love to help your child begin.</p>
          <NavLink to="/Book" className="btn-red">Book a free trial →</NavLink>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default About;
