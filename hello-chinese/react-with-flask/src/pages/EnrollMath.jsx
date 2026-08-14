import { Link, useSearchParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { LEVELS, PLANS } from "../data/enrollment";
import { money } from "../data/enrollmentDraft";
import { useLanguage } from "../i18n/LanguageContext";
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

// Math Enrichment is an independent Sunday course with a single plan (Plan 6),
// so it gets its own page rather than the shared PlanSelection grid.
export default function EnrollMath() {
  const [search] = useSearchParams();
  const { t, tList } = useLanguage();
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
          <Link className="math__back" to={backHref}>{t("enrollMath.back")}</Link>
          {childNo > 1 && (
            <div className="math__childbanner">
              <span className="math__childnum">{childNo}</span>
              {t("enrollMath.childBanner", { n: childNo })}
            </div>
          )}
          <h1 className="math__title">{t("enrollData.levelName.math")}</h1>
          <p className="math__subtitle">
            <strong>{t("enrollData.levelLabel.math")}</strong> ·{" "}
            {t("enrollMath.subtitle", { time: level.math, ages: t("enrollData.levelAges.math") })}
          </p>
        </header>

        <section className="math__strip" aria-label={t("enrollMath.scheduleAria")}>
          <div className="math__striptitle">{t("enrollMath.scheduleTitle")}</div>
          <div className="math__slot">
            <span className="math__sloticon" aria-hidden="true"><MathIcon /></span>
            <span>
              <span className="math__slottime">{level.math}</span>
              <span className="math__slotlabel">{t("enrollMath.slotLabel")}</span>
            </span>
          </div>
          <p className="math__stripnote">{t("enrollMath.stripNote")}</p>
        </section>

        <div className="math__benefits">
          {tList("enrollMath.benefits").map((b) => (
            <div className="math__benefit" key={b}>{b}</div>
          ))}
        </div>

        <section className="math__pricing">
          <div className="math__pricingtitle">{t("enrollMath.pricingTitle")}</div>
          <ul className="math__pricinglist">
            <li>
              <strong>{t("enrollMath.pricingFlexibleLabel")}</strong> — {t("enrollMath.pricingFlexible")}
            </li>
            <li>
              <strong>{t("enrollMath.pricingPerStudentLabel")}</strong> — {t("enrollMath.pricingPerStudent")}
            </li>
            <li>
              <strong>{t("enrollMath.pricingSavingsLabel")}</strong> — {t("enrollMath.pricingSavings")}
            </li>
          </ul>
        </section>

        <div className="math__sectionhead">
          <h2>{t("enrollMath.yourPlan")}</h2>
          <span>{t("enrollMath.onePlan")}</span>
        </div>

        <article className="mathplan">
          <div className="mathplan__body">
            <div className="mathplan__main">
              <span className="mathplan__icon" aria-hidden="true"><MathIcon /></span>
              <div>
                <h3 className="mathplan__name">{t("enrollData.planName.6")}</h3>
                <ul className="mathplan__blocks">
                  <li>
                    <span className="mathplan__check" aria-hidden="true">✓</span>
                    <span className="mathplan__time">{level.math}</span>
                    <span>· {t("enrollMath.slotLabel")}</span>
                  </li>
                </ul>
                <div className="mathplan__deal">
                  <span className="mathplan__dealsave">
                    {t("enrollMath.save", { amount: money(plan.save) })}
                  </span>
                  <span className="mathplan__dealline">
                    <s>{money(plan.regular)}</s> {money(plan.total)} &mdash; {t("enrollMath.packageLine")}
                  </span>
                </div>
              </div>
            </div>
            <div className="mathplan__price">
              <div className="mathplan__rate">
                <span className="mathplan__rateamount">{money(plan.perSunday)}</span>
                <span className="mathplan__rateunit">{t("enrollMath.perSession")}</span>
              </div>
              <div className="mathplan__ratelabel">{t("enrollMath.rateLabel")}</div>
              <Link
                className="mathplan__cta"
                to={`/Enroll/Sundays?level=math&plan=${plan.id}${childQuery}`}
              >
                {t("enrollMath.selectPlan")}
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
          {t("enrollMath.noCommitment")}
        </p>

        <p className="math__foot">
          {t("enrollMath.footPre")}{" "}
          <Link to="/Enroll/Sunday">{t("enrollMath.footLink")}</Link>
        </p>
      </main>

      <Footer />
    </>
  );
}
