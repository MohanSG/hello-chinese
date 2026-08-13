import { Link, useSearchParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { LEVELS, PLANS } from "../data/enrollment";
import { money } from "../data/enrollmentDraft";
import "./EnrollMath.css";

const MathIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <rect x="4.5" y="3" width="15" height="18" rx="2.5" />
    <rect x="7" y="5.6" width="10" height="3.4" rx="1" />
    <circle cx="9" cy="13" r="1" fill="currentColor" stroke="none" />
    <circle cx="12" cy="13" r="1" fill="currentColor" stroke="none" />
    <circle cx="15" cy="13" r="1" fill="currentColor" stroke="none" />
    <circle cx="9" cy="17" r="1" fill="currentColor" stroke="none" />
    <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
    <circle cx="15" cy="17" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const BENEFITS = [
  "Strengthen Mathematical Foundations",
  "Cultivate Mathematical Thinking",
  "Support Academic Growth",
];

// Math Enrichment is an independent Sunday course with a single plan (Plan 6),
// so it gets its own page rather than the shared PlanSelection grid.
export default function EnrollMath() {
  const [search] = useSearchParams();
  const childNo = Number(search.get("child")) || 1;
  const level = LEVELS["math"];
  const plan = PLANS[6];

  const childQuery = childNo > 1 ? `&child=${childNo}` : "";
  const backHref = childNo > 1 ? `/Enroll/Sunday?child=${childNo}` : "/Enroll/Sunday";

  return (
    <>
      <NavBar />

      <main className="math">
        <header className="math__header">
          <Link className="math__back" to={backHref}>← Back to Sunday Programs</Link>
          {childNo > 1 && (
            <div className="math__childbanner">
              <span className="math__childnum">{childNo}</span>
              You are enrolling Child {childNo}. This child can choose a different level, plan, and
              Sundays — parent information is already saved.
            </div>
          )}
          <h1 className="math__title">{level.name}</h1>
          <p className="math__subtitle">
            <strong>{level.levelLabel}</strong> · Sunday {level.math} · {level.ages}
          </p>
        </header>

        <section className="math__strip" aria-label="Sunday morning schedule">
          <div className="math__striptitle">Sunday Morning Schedule</div>
          <div className="math__slot">
            <span className="math__sloticon" aria-hidden="true"><MathIcon /></span>
            <span>
              <span className="math__slottime">{level.math}</span>
              <span className="math__slotlabel">Math Enrichment</span>
            </span>
          </div>
          <p className="math__stripnote">
            An independent Sunday course — no Chinese class required. Students are grouped by both
            grade level and mathematical ability.
          </p>
        </section>

        <div className="math__benefits">
          {BENEFITS.map((b) => (
            <div className="math__benefit" key={b}>{b}</div>
          ))}
        </div>

        <section className="math__pricing">
          <div className="math__pricingtitle">How Pricing Works</div>
          <ul className="math__pricinglist">
            <li><strong>Flexible dates</strong> — choose the Sundays that work for your family.</li>
            <li><strong>Per student</strong> — the standard weekly rate shown below is per student.</li>
            <li><strong>Automatic savings</strong> — package savings are applied automatically when eligible.</li>
          </ul>
        </section>

        <div className="math__sectionhead">
          <h2>Your Plan</h2>
          <span>One plan — math only</span>
        </div>

        <article className="mathplan">
          <div className="mathplan__body">
            <div className="mathplan__main">
              <span className="mathplan__icon" aria-hidden="true"><MathIcon /></span>
              <div>
                <h3 className="mathplan__name">{plan.name}</h3>
                <ul className="mathplan__blocks">
                  <li>
                    <span className="mathplan__check" aria-hidden="true">✓</span>
                    <span className="mathplan__time">{level.math}</span>
                    <span>· Math Enrichment</span>
                  </li>
                </ul>
                <div className="mathplan__deal">
                  <span className="mathplan__dealsave">Save {money(plan.save)}</span>
                  <span className="mathplan__dealline">
                    <s>{money(plan.regular)}</s> {money(plan.total)} &mdash; 10 math classes
                  </span>
                </div>
              </div>
            </div>
            <div className="mathplan__price">
              <div className="mathplan__rate">
                <span className="mathplan__rateamount">{money(plan.perSunday)}</span>
                <span className="mathplan__rateunit">/ session</span>
              </div>
              <div className="mathplan__ratelabel">Standard weekly rate</div>
              <Link
                className="mathplan__cta"
                to={`/Enroll/Sundays?level=math&plan=${plan.id}${childQuery}`}
              >
                Select Plan
              </Link>
            </div>
          </div>
        </article>

        <p className="math__note">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
            <path d="M12 10.6V17" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            <circle cx="12" cy="7.6" r="1.1" fill="currentColor" />
          </svg>
          No long-term commitment. Join for the Sundays that work for you.
        </p>

        <p className="math__foot">
          Looking for Chinese classes too? <Link to="/Enroll/Sunday">See the Chinese pathway plans</Link>
        </p>
      </main>

      <Footer />
    </>
  );
}
