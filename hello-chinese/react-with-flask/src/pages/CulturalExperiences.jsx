import { NavLink } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../styles/variables.css";
import "../styles/shared.css";
import "./CulturalExperiences.css";

const EXPERIENCES = [
  { zh: "茶道", name: "Tea Culture", desc: "An introduction to Chinese tea ceremony — brewing, etiquette, and the stories behind the leaves.", tags: ["Ages 6+", "Seasonal, see calendar", "Cap: 20", "$15/child"], photo: "tea ceremony with children", bg: "var(--tan-1)", bg2: "var(--tan-2)" },
  { zh: "书法", name: "Calligraphy", desc: "Brush, ink, and stroke order — students write their first characters the traditional way.", tags: ["Ages 5+", "Seasonal, see calendar", "Cap: 20", "$15/child"], photo: "kids practicing calligraphy", bg: "var(--sage-1)", bg2: "var(--sage-2)" },
  { zh: "汉服", name: "Hanfu", desc: "Try on traditional Chinese dress and learn the history and etiquette behind each style.", tags: ["Ages 4+", "Seasonal, see calendar", "Cap: 15", "$20/child"], photo: "children in hanfu", bg: "var(--rose-1)", bg2: "var(--rose-2)" },
  { zh: "节日", name: "Festivals", desc: "Mid-Autumn, Lunar New Year, and Dragon Boat — celebrated with crafts, food, and stories.", tags: ["All ages", "See calendar", "Cap: 40", "Free for families"], photo: "festival celebration", bg: "#e7d9c2", bg2: "#d9c8a8" },
];

function CulturalExperiences() {
  return (
    <div className="culture">
      <NavBar />

      <section className="culture-header">
        <div className="culture-header__watermark">文化</div>
        <div className="culture-header__inner">
          <div className="eyebrow eyebrow--light">Cultural experiences</div>
          <h1 className="culture-header__title">Language, lived.</h1>
          <p className="culture-header__desc">Tea culture, calligraphy, hanfu, and festival celebrations — hands-on experiences that make Mandarin part of a living culture, not just a subject.</p>
        </div>
      </section>

      <section className="culture-grid-section">
        <div className="culture-grid-section__container">
          <div className="culture-grid">
            {EXPERIENCES.map((e) => (
              <div className="culture-card" key={e.name}>
                <div className="culture-card__photo" style={{ backgroundImage: `repeating-linear-gradient(135deg, ${e.bg} 0 22px, ${e.bg2} 22px 44px)` }}>
                  <span className="photo-placeholder__tag">◈ PHOTO — {e.photo}</span>
                </div>
                <div className="culture-card__body">
                  <div className="culture-card__zh">{e.zh}</div>
                  <h2 className="culture-card__name">{e.name}</h2>
                  <p className="culture-card__desc">{e.desc}</p>
                  <div className="culture-card__tags">
                    {e.tags.map((t) => <span key={t} className="culture-card__tag">{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="culture-note">
            <h3 className="culture-note__title">Good to know</h3>
            <p className="culture-note__body">One caregiver must remain on-site for children under 6. Materials are provided; wear clothes that can get a little inky. Photos and video from these events may be used in HelloChinese materials — a media consent form is collected at registration.</p>
          </div>
        </div>
      </section>

      <section className="culture-cta">
        <div className="culture-cta__watermark">节</div>
        <div className="culture-cta__inner">
          <h2 className="culture-cta__title">See what's coming up</h2>
          <p className="culture-cta__desc">Check the calendar for the next tea ceremony, calligraphy workshop, or festival celebration.</p>
          <NavLink to="/Calendar" className="btn-red">View the calendar →</NavLink>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default CulturalExperiences;
