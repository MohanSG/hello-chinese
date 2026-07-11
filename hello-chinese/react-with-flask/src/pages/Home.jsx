import { NavLink } from "react-router-dom";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import Faq from "../components/Faq";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
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
  { name: "Mandarin Chinese", zh: "中文", price: "$180", blurb: "Speaking, listening, characters & pinyin for beginners to advanced.", save: "", popular: false,
    features: ["4 live small-group lessons / month", "Max 6 students per class", "Speaking, pinyin & character writing", "Weekly practice + parent updates"] },
  { name: "Math", zh: "数学", price: "$160", blurb: "Grade-aligned math that builds real problem-solving confidence.", save: "", popular: false,
    features: ["4 live small-group lessons / month", "Max 6 students per class", "Grade-aligned K–8 curriculum", "Homework help & progress reports"] },
  { name: "Math + Chinese", zh: "套餐", price: "$300", blurb: "Our best value — both programs, one simple monthly plan.", save: "Save $40 / month", popular: true,
    features: ["Everything in both programs", "8 live lessons / month total", "Priority scheduling", "Termly progress conference"] },
];

const STATS = [["1,200+", "students taught"], ["6", "max per class"], ["4.9★", "average parent rating"], ["98%", "renew each term"]];

function Home() {
  return (
    <div className="home">
      <NavBar />
      <Hero />

      {/* TRUST STRIP */}
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
            <div className="eyebrow">Who we are</div>
            <h2 className="home-about__title">A neighborhood language school — with a global classroom.</h2>
            <p className="home-about__p">
              Hello Chinese started with a simple belief: American kids can grow up genuinely bilingual when Mandarin is taught with warmth, patience, and real conversation — not flashcards and pressure.
            </p>
            <p className="home-about__p">
              Today our certified teachers guide students from their very first <span className="home-about__zh-inline">你好</span> to confident, everyday fluency — online and in-person, in classes small enough to know every child by name.
            </p>
            <div className="home-about__facts">
              {["Certified native teachers", "Ages 5 to 17", "Online & in-person"].map((t) => (
                <div key={t} className="home-about__fact">
                  <span className="home-about__fact-dot" />
                  <span className="home-about__fact-text">{t}</span>
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
                  <span className="offer-card__per">/ month</span>
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
            Sibling discount 10% · Financial aid available · <NavLink to="/Contact">Ask about custom 1-on-1 tutoring →</NavLink>
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
