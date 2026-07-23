import { useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../styles/variables.css";
import "../styles/shared.css";
import "./HelloJourney.css";

function HelloJourney() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="journey">
      <NavBar />

      <section className="journey-header">
        <div className="journey-header__watermark">旅程</div>
        <div className="journey-header__inner">
          <div className="journey-header__badge"><span>Coming soon</span></div>
          <div className="eyebrow eyebrow--light">Hello Journey</div>
          <h1 className="journey-header__title">A future study tour to China.</h1>
          <p className="journey-header__desc">Hello Journey is our vision for an immersive China study tour and youth exchange for older students — connecting years of Mandarin study to a real, guided experience abroad.</p>
        </div>
      </section>

      <section className="journey-concept">
        <div className="journey-concept__container">
          <div className="eyebrow">The concept</div>
          <h2 className="journey-concept__title">From the classroom to the country.</h2>
          <p className="journey-concept__p">Hello Journey is our long-term vision for a supervised study-abroad experience in China, built for students who've grown up with us — pairing structured Mandarin practice with cultural immersion, homestays, and guided travel.</p>
          <p className="journey-concept__p">We're planning this initiative for our older students, roughly ages 12–18, as a natural next step after years in our core programs. It is not yet an active or purchasable program — dates, partners, pricing, and safeguarding plans are still being finalized.</p>
          <div className="journey-concept__facts">
            {["Ages 12–18", "Guided, chaperoned travel", "Dates & partners TBD"].map((t) => (
              <div key={t} className="journey-concept__fact">
                <span className="journey-concept__fact-dot" />
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="journey-safeguard-section">
        <div className="journey-safeguard-section__container">
          <div className="journey-safeguard">
            <h3 className="journey-safeguard__title">A note on safety and readiness</h3>
            <p className="journey-safeguard__body">Any future travel program will only launch with a completed safeguarding plan, verified partners on the ground, clear supervision ratios, and full transparency with parents before a single family is asked to commit. We'll share details here as they're confirmed.</p>
          </div>
        </div>
      </section>

      <section className="journey-interest">
        <div className="journey-interest__watermark">旅</div>
        <div className="journey-interest__inner">
          <h2 className="journey-interest__title">Join the interest list</h2>
          <p className="journey-interest__desc">We'll let you know as soon as dates, pricing, and details are confirmed — no commitment.</p>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="journey-interest__form">
              <input required type="email" placeholder="parent@email.com" className="journey-interest__input" />
              <button type="submit" className="journey-interest__submit">Notify me</button>
            </form>
          ) : (
            <div className="journey-interest__success">
              <span className="journey-interest__success-check">✓</span>
              <span>You're on the list — we'll be in touch.</span>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default HelloJourney;
